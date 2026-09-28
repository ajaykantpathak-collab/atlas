/**
 * codeTrace.ts — the deterministic Java-subset interpreter behind the E8
 * Code Runtime sandbox (SANDBOX_TAXONOMY.md engine type 8).
 *
 * Scope: the ICSE Computer Applications subset (classes 9-10 corpus
 * c9/c10_compapp_icse) plus the flowchart-era constructs of classes 6-8:
 *   - typed variables: int, double, boolean, char, String (+ 1-D arrays)
 *   - arithmetic with JAVA semantics: int/int truncates, char promotes to
 *     int in numeric context, String + concatenates
 *   - if / else if / else, switch (fall-through), for, while, do-while,
 *     break / continue, ternary, casts, ++/-- (pre & post), compound assign
 *   - methods-lite: user-defined static methods with parameters, return,
 *     recursion; Math.abs/max/min/pow/sqrt/ceil/floor/round/random;
 *     Integer.parseInt, Double.parseDouble; String methods (length, charAt,
 *     substring, equals, equalsIgnoreCase, toUpperCase, toLowerCase, trim,
 *     indexOf); Scanner input fed from a FIXED sample-input list
 *   - System.out.println / System.out.print with Java's toString formats
 *     (2.0 prints as "2.0", 1e7 prints as "1.0E7", division by zero throws
 *     ArithmeticException for ints but yields Infinity for doubles)
 *
 * EVERY run is deterministic — Math.random() draws from a fixed seeded LCG
 * and Scanner reads from the caller-provided input list. No LLM anywhere.
 *
 * Teaching outputs:
 *   - runJava() executes and records a TRACE ROW after every executed
 *     statement: line number + full variable state + stdout so far — the
 *     classic ICSE dry-run table.
 *   - compile-style errors (syntax, cannot find symbol, incompatible
 *     types/lossy conversion, duplicate variable) are found by a static
 *     analysis pass BEFORE execution, exactly where javac reports them.
 *   - runtime errors (ArithmeticException, ArrayIndexOutOfBoundsException,
 *     StringIndexOutOfBoundsException, NumberFormatException,
 *     NoSuchElementException, stack overflow) carry their Java exception
 *     name so the Error Clinic teaches the real taxonomy.
 *   - an infinite loop cannot hang the UI: a global step cap turns it into
 *     a "possible infinite loop" limit error.
 */

// ------------------------------------------------------------------ values

export type JType = 'int' | 'double' | 'boolean' | 'char' | 'String'

interface JArr { arr: (JVal | null)[] | null; elem: JType }
type JVal =
  | { t: 'int'; v: number }
  | { t: 'double'; v: number }
  | { t: 'boolean'; v: boolean }
  | { t: 'char'; v: number }        // char value kept as its code point
  | { t: 'String'; v: string }
  | { t: 'array'; v: JArr }
  | { t: 'scanner'; v: null }
  | { t: 'null'; v: null }

const INT = (v: number): JVal => ({ t: 'int', v: Math.trunc(v) })
const DBL = (v: number): JVal => ({ t: 'double', v })
const BOOL = (v: boolean): JVal => ({ t: 'boolean', v })
const CHR = (code: number): JVal => ({ t: 'char', v: code })
const STR = (v: string): JVal => ({ t: 'String', v })

const isNumeric = (t: string) => t === 'int' || t === 'double' || t === 'char'

/** Java's Double.toString / Integer.toString for println output. */
export function javaToString(val: JVal): string {
  switch (val.t) {
    case 'int': return String(val.v)
    case 'char': return String.fromCharCode(val.v)
    case 'boolean': return val.v ? 'true' : 'false'
    case 'String': return val.v
    case 'null': return 'null'
    case 'scanner': return 'java.util.Scanner@'
    case 'array': {
      if (val.v.arr === null) return 'null'
      const elem = val.v.elem
      const parts = (val.v.arr as (JVal | null)[]).map(e =>
        e === null ? 'null' : (elem === 'char' ? String.fromCharCode((e as { v: number }).v) : javaToString(e as JVal)))
      return elem === 'char' ? parts.join('') : '[' + parts.join(', ') + ']'
    }
    case 'double': {
      const v = val.v
      if (Number.isNaN(v)) return 'NaN'
      if (v === Infinity) return 'Infinity'
      if (v === -Infinity) return '-Infinity'
      if (v === 0) return Object.is(v, -0) ? '-0.0' : '0.0'
      const a = Math.abs(v)
      if (a >= 1e7 || a < 1e-3) {
        // Java scientific form: 1.0E7, 2.5E-8 (mantissa in [1,10))
        let exp = Math.floor(Math.log10(a))
        let mant = v / Math.pow(10, exp)
        let m = trimDouble(mant)
        if (Math.abs(m) >= 10) { m = trimDouble(m / 10); exp += 1 }
        return (Number.isInteger(m) ? m.toFixed(1) : String(m)) + 'E' + exp
      }
      if (Number.isInteger(v)) return v.toFixed(1)
      return String(v)
    }
  }
}

function trimDouble(v: number): number {
  return Math.round(v * 1e10) / 1e10
}

// ------------------------------------------------------------------- errors

export type ErrorKind = 'compile' | 'runtime' | 'limit'

export class CodeError extends Error {
  kind: ErrorKind
  line?: number
  javaName?: string
  constructor(kind: ErrorKind, message: string, line?: number, javaName?: string) {
    super(message)
    this.kind = kind
    this.line = line
    this.javaName = javaName
  }
}

// --------------------------------------------------------------- tokenizer

interface Tok { k: 'num' | 'str' | 'char' | 'id' | 'op' | 'eof'; v: string; line: number }

const KEYWORDS = new Set([
  'int', 'double', 'float', 'long', 'short', 'byte', 'boolean', 'char', 'String',
  'void', 'class', 'public', 'private', 'protected', 'static', 'final', 'new',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break',
  'continue', 'return', 'true', 'false', 'null', 'import', 'package', 'this',
])

const OPS3 = ['>>>=', '<<=', '>>>']
const OPS2 = ['++', '--', '+=', '-=', '*=', '/=', '%=', '==', '!=', '<=', '>=', '&&', '||', '<<', '>>', '->']
const OPS1 = ['+', '-', '*', '/', '%', '=', '<', '>', '!', '?', ':', '.', ',', ';', '(', ')', '{', '}', '[', ']', '&', '|', '^', '~']

const ESCAPES: Record<string, string> = {
  n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', '0': '\0', '\\': '\\', '"': '"', "'": "'", s: ' ',
}

function tokenize(src: string): Tok[] {
  const toks: Tok[] = []
  let i = 0, line = 1
  const n = src.length
  while (i < n) {
    const c = src[i]
    if (c === '\n') { line++; i++; continue }
    if (c === ' ' || c === '\t' || c === '\r') { i++; continue }
    if (c === '/' && src[i + 1] === '/') {
      while (i < n && src[i] !== '\n') i++
      continue
    }
    if (c === '/' && src[i + 1] === '*') {
      i += 2
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') line++; i++ }
      if (i >= n) throw new CodeError('compile', 'unclosed block comment', line)
      i += 2
      continue
    }
    if (c >= '0' && c <= '9') {
      let j = i
      while (j < n && src[j] >= '0' && src[j] <= '9') j++
      if (src[j] === '.' && src[j + 1] >= '0' && src[j + 1] <= '9') {
        j++
        while (j < n && src[j] >= '0' && src[j] <= '9') j++
      }
      if (/[eE]/.test(src[j] ?? '') && /[0-9+-]/.test(src[j + 1] ?? '')) {
        j += 2
        while (j < n && src[j] >= '0' && src[j] <= '9') j++
      }
      if (/[fFlLdD]/.test(src[j] ?? '')) j++
      toks.push({ k: 'num', v: src.slice(i, j), line })
      i = j
      continue
    }
    if (c === '"') {
      let j = i + 1, s = ''
      while (j < n && src[j] !== '"') {
        if (src[j] === '\n') throw new CodeError('compile', 'unclosed string literal', line)
        if (src[j] === '\\') {
          const e = ESCAPES[src[j + 1]]
          if (e === undefined) throw new CodeError('compile', `illegal escape sequence \\${src[j + 1] ?? ''}`, line)
          s += e
          j += 2
        } else s += src[j++]
      }
      if (j >= n) throw new CodeError('compile', 'unclosed string literal', line)
      toks.push({ k: 'str', v: s, line })
      i = j + 1
      continue
    }
    if (c === "'") {
      let j = i + 1, s = ''
      while (j < n && src[j] !== "'") {
        if (src[j] === '\n') throw new CodeError('compile', 'unclosed character literal', line)
        if (src[j] === '\\') {
          const e = ESCAPES[src[j + 1]]
          if (e === undefined) throw new CodeError('compile', `illegal escape sequence \\${src[j + 1] ?? ''}`, line)
          s += e
          j += 2
        } else s += src[j++]
      }
      if (j >= n) throw new CodeError('compile', 'unclosed character literal', line)
      if (s.length !== 1) throw new CodeError('compile', `invalid character literal '${s}' — exactly one character required`, line)
      toks.push({ k: 'char', v: s, line })
      i = j + 1
      continue
    }
    if (/[A-Za-z_$]/.test(c)) {
      let j = i
      while (j < n && /[A-Za-z0-9_$]/.test(src[j])) j++
      toks.push({ k: 'id', v: src.slice(i, j), line })
      i = j
      continue
    }
    const three = src.slice(i, i + 3)
    if (OPS3.includes(three)) { toks.push({ k: 'op', v: three, line }); i += 3; continue }
    const two = src.slice(i, i + 2)
    if (OPS2.includes(two)) { toks.push({ k: 'op', v: two, line }); i += 2; continue }
    if (OPS1.includes(c)) { toks.push({ k: 'op', v: c, line }); i += 1; continue }
    throw new CodeError('compile', `illegal character '${c}'`, line)
  }
  toks.push({ k: 'eof', v: '', line })
  return toks
}

// -------------------------------------------------------------------- AST

type Expr =
  | { e: 'lit'; val: JVal; line: number }
  | { e: 'name'; name: string; line: number }
  | { e: 'bin'; op: string; l: Expr; r: Expr; line: number }
  | { e: 'un'; op: string; x: Expr; line: number }
  | { e: 'assign'; op: string; target: Expr; value: Expr; line: number; postfix?: boolean }
  | { e: 'cond'; c: Expr; a: Expr; b: Expr; line: number }
  | { e: 'call'; callee: Expr; name: string; args: Expr[]; line: number } // method call on callee (or bare when callee null)
  | { e: 'field'; obj: Expr; name: string; line: number }                 // .length, System.out, Math.abs
  | { e: 'index'; arr: Expr; idx: Expr; line: number }
  | { e: 'cast'; type: JType; x: Expr; line: number }
  | { e: 'newArr'; elem: JType; size: Expr; line: number }
  | { e: 'newScanner'; line: number }
  | { e: 'arrLit'; elems: Expr[]; elem: JType; line: number }

interface VarDeclStmt { s: 'decl'; type: JType | 'scanner'; array: boolean; decls: { name: string; init: Expr | null }[]; line: number }
interface ExprStmt { s: 'expr'; expr: Expr; line: number }
interface IfStmt { s: 'if'; cond: Expr; then: Stmt; els: Stmt | null; line: number }
interface WhileStmt { s: 'while'; cond: Expr; body: Stmt; line: number }
interface DoStmt { s: 'do'; cond: Expr; body: Stmt; line: number }
interface ForStmt { s: 'for'; init: Stmt | null; cond: Expr | null; update: Expr[]; body: Stmt; line: number }
interface BlockStmt { s: 'block'; body: Stmt[]; line: number }
interface ReturnStmt { s: 'return'; expr: Expr | null; line: number }
interface BreakStmt { s: 'break'; line: number }
interface ContinueStmt { s: 'continue'; line: number }
interface SwitchStmt { s: 'switch'; disc: Expr; sections: { labels: { lit: JVal | 'default'; line: number }[]; body: Stmt[] }[]; line: number }
type Stmt = VarDeclStmt | ExprStmt | IfStmt | WhileStmt | DoStmt | ForStmt | BlockStmt | ReturnStmt | BreakStmt | ContinueStmt | SwitchStmt

interface MethodDef {
  name: string
  ret: JType | 'void'
  params: { name: string; type: JType | { array: true; elem: JType } }[]
  body: Stmt[]
  line: number
}

interface Program {
  methods: MethodDef[]
  mainBody: Stmt[]          // statements when no class wrapper was written
  className: string | null
}

// ------------------------------------------------------------------ parser

class Parser {
  toks: Tok[]
  pos = 0
  constructor(src: string) { this.toks = tokenize(src) }

  peek(o = 0): Tok { return this.toks[Math.min(this.pos + o, this.toks.length - 1)] }
  next(): Tok { return this.toks[this.pos++] }
  at(v: string): boolean { const t = this.peek(); return t.k === 'op' && t.v === v }
  atId(v: string): boolean { const t = this.peek(); return t.k === 'id' && t.v === v }
  eat(v: string): boolean { if (this.at(v)) { this.pos++; return true } return false }
  eatId(v: string): boolean { const t = this.peek(); if (t.k === 'id' && t.v === v) { this.pos++; return true } return false }
  expect(v: string): Tok {
    const t = this.peek()
    if (!(t.k === 'op' && t.v === v)) {
      throw new CodeError('compile', this.hintFor(v, t), t.line)
    }
    this.pos++
    return t
  }
  expectId(what = 'identifier'): string {
    const t = this.peek()
    if (t.k !== 'id' || KEYWORDS.has(t.v)) {
      throw new CodeError('compile',
        t.k === 'eof' ? `reached end of file while looking for ${what}` : `'${t.v}' is a keyword — ${what} expected`, t.line)
    }
    this.pos++
    return t.v
  }
  hintFor(v: string, t: Tok): string {
    if (t.k === 'eof') return `reached end of file — '${v}' expected`
    if (v === ';') return `';' expected — every statement must end with a semicolon (found '${t.v || 'end of file'}' on line ${t.line})`
    return `'${v}' expected (found '${t.v}')`
  }

  parseProgram(): Program {
    const methods: MethodDef[] = []
    let className: string | null = null
    // skip package / import lines
    while (this.atId('import') || this.atId('package')) {
      while (!this.at(';') && this.peek().k !== 'eof') this.pos++
      this.eat(';')
    }
    const save = this.pos
    // optional class wrapper: [public] [final] class Name { ... }
    let p = this.pos
    const isClassStart = (): boolean => {
      let q = p
      while (q < this.toks.length && (this.toks[q].k === 'id' &&
        ['public', 'final', 'abstract'].includes(this.toks[q].v))) q++
      return !!(this.toks[q] && this.toks[q].k === 'id' && this.toks[q].v === 'class')
    }
    if (isClassStart()) {
      while (['public', 'final', 'abstract'].includes(this.peek().v)) this.pos++
      if (!this.eatId('class')) {
        throw new CodeError('compile', "'class' expected", this.peek().line)
      }
      className = this.expectId('class name')
      this.expect('{')
      while (!this.at('}') && this.peek().k !== 'eof') {
        methods.push(this.parseMethod())
      }
      this.expect('}')
      if (this.peek().k !== 'eof') {
        throw new CodeError('compile', `unexpected text after the class body — one public class per run, please`, this.peek().line)
      }
      return { methods, mainBody: [], className }
    }
    this.pos = save
    // bare statements → implicit main body (flowchart-era friendly)
    const mainBody: Stmt[] = []
    while (this.peek().k !== 'eof') {
      if (this.atId('public') || this.atId('static') || this.atId('private') || this.atId('void')) {
        // allow method definitions mixed in (methods-lite)
        const m = this.parseMethod()
        methods.push(m)
        if (m.name === 'main') mainBody.push(...m.body)
        continue
      }
      mainBody.push(this.parseStatement())
    }
    return { methods, mainBody, className }
  }

  parseType(): JType {
    const t = this.peek()
    if (t.k === 'id' && ['int', 'double', 'float', 'long', 'short', 'byte'].includes(t.v)) {
      this.pos++
      if (t.v === 'int' || t.v === 'short' || t.v === 'byte' || t.v === 'long') return 'int'
      return 'double'
    }
    if (t.k === 'id' && t.v === 'boolean') { this.pos++; return 'boolean' }
    if (t.k === 'id' && t.v === 'char') { this.pos++; return 'char' }
    if (t.k === 'id' && t.v === 'String') { this.pos++; return 'String' }
    throw new CodeError('compile',
      `a type (int, double, boolean, char or String) was expected — found '${t.v || 'end of file'}'`, t.line)
  }

  skipModifiers(): void {
    while (this.atId('public') || this.atId('private') || this.atId('protected') ||
      this.atId('static') || this.atId('final')) this.pos++
  }

  parseMethod(): MethodDef {
    const line = this.peek().line
    this.skipModifiers()
    // return type: void or a type (possibly array)
    let ret: JType | 'void'
    if (this.atId('void')) { this.pos++; ret = 'void' }
    else ret = this.parseType()
    if (this.at('[')) { this.expect('['); this.expect(']'); /* array return treated as its element type for display */ }
    const name = this.expectId('method name')
    this.expect('(')
    const params: MethodDef['params'] = []
    if (!this.at(')')) {
      do {
        let ty = this.parseType()
        let isArray = false
        if (this.at('[')) { this.expect('['); this.expect(']'); isArray = true }
        if (!isArray && this.at('.')) {
          throw new CodeError('compile', 'class-typed parameters other than String / Scanner are outside this sandbox', this.peek().line)
        }
        const pn = this.expectId('parameter name')
        params.push({ name: pn, type: isArray ? { array: true, elem: ty } : ty })
      } while (this.eat(','))
    }
    this.expect(')')
    const body = this.parseBlock()
    return { name, ret, params, body: (body as BlockStmt).body, line }
  }

  parseBlock(): Stmt {
    const line = this.peek().line
    this.expect('{')
    const body: Stmt[] = []
    while (!this.at('}') && this.peek().k !== 'eof') body.push(this.parseStatement())
    this.expect('}')
    return { s: 'block', body, line }
  }

  parseStatement(): Stmt {
    const t = this.peek()
    if (t.k === 'op' && t.v === '{') return this.parseBlock()
    if (t.k === 'op' && t.v === ';') { this.pos++; return { s: 'block', body: [], line: t.line } }
    if (t.k === 'id') {
      switch (t.v) {
        case 'if': return this.parseIf()
        case 'while': {
          this.pos++
          this.expect('(')
          const cond = this.parseExpr()
          this.expect(')')
          return { s: 'while', cond, body: this.parseStatement(), line: t.line }
        }
        case 'do': {
          this.pos++
          const body = this.parseStatement()
          const w = this.peek()
          if (!(w.k === 'id' && w.v === 'while')) throw new CodeError('compile', "'while' expected after do-block", w.line)
          this.pos++
          this.expect('(')
          const cond = this.parseExpr()
          this.expect(')')
          this.expect(';')
          return { s: 'do', cond, body, line: t.line }
        }
        case 'for': return this.parseFor()
        case 'switch': return this.parseSwitch()
        case 'return': {
          this.pos++
          if (this.at(';')) { this.pos++; return { s: 'return', expr: null, line: t.line } }
          const e = this.parseExpr()
          this.expect(';')
          return { s: 'return', expr: e, line: t.line }
        }
        case 'break': {
          this.pos++; this.expect(';')
          return { s: 'break', line: t.line }
        }
        case 'continue': {
          this.pos++; this.expect(';')
          return { s: 'continue', line: t.line }
        }
      }
      // declaration? type followed by identifier then '=', ',', ';', '[' —
      // supports both `int[] a = …` and the textbook `int a[] = …` forms,
      // plus Scanner declarations (bare or dotted java.util.Scanner)
      if (this.isTypeStart() || this.isScannerDeclStart()) {
        const save = this.pos
        let scannerDecl = false
        if (!this.isTypeStart()) {
          // consume exactly `Scanner` or the dotted `java.util.Scanner`
          // (five tokens) — never the variable name that follows
          if (this.peek().v === 'java') this.pos += 5
          else this.pos += 1
          scannerDecl = true
        }
        const ty: JType | 'scanner' = scannerDecl ? 'scanner' : this.parseType()
        let isArray = false
        if (this.at('[')) { this.expect('['); this.expect(']'); isArray = true }
        const afterType = this.peek()
        const afterType2 = this.peek(1)
        const looksDecl = afterType.k === 'id' && (
          afterType2.k === 'op' && ['=', ',', ';', '['].includes(afterType2.v))
        if (looksDecl) {
          const decls: { name: string; init: Expr | null }[] = []
          do {
            const nm = this.expectId('variable name')
            if (!isArray && !scannerDecl && this.at('[')) { // `int a[] = …` bracket-after-name form
              this.expect('[')
              this.expect(']')
              isArray = true
            }
            let init: Expr | null = null
            if (this.eat('=')) {
              init = (isArray && !scannerDecl) ? this.parseArrayLiteral(ty as JType) : this.parseExpr()
            }
            decls.push({ name: nm, init })
          } while (this.eat(','))
          this.expect(';')
          return { s: 'decl', type: ty, array: isArray && !scannerDecl, decls, line: t.line }
        }
        this.pos = save
      }
    }
    // expression statement
    const e = this.parseExpr()
    this.expect(';')
    return { s: 'expr', expr: e, line: t.line }
  }

  isTypeStart(): boolean {
    const t = this.peek()
    return t.k === 'id' && ['int', 'double', 'float', 'long', 'short', 'byte', 'boolean', 'char', 'String'].includes(t.v)
  }

  /** `Scanner sc = …` or `java.util.Scanner sc = …` */
  isScannerDeclStart(): boolean {
    const t = this.peek()
    if (t.k !== 'id') return false
    if (t.v === 'Scanner') return this.peek(1).k === 'id'
    if (t.v === 'java') {
      return this.peek(1).k === 'op' && this.peek(1).v === '.' &&
        this.peek(2).k === 'id' && this.peek(2).v === 'util' &&
        this.peek(3).k === 'op' && this.peek(3).v === '.' &&
        this.peek(4).k === 'id' && this.peek(4).v === 'Scanner' &&
        this.peek(5).k === 'id'
    }
    return false
  }

  parseArrayLiteral(elem: JType): Expr {
    const line = this.peek().line
    if (this.at('{')) {
      this.expect('{')
      const elems: Expr[] = []
      if (!this.at('}')) {
        do { elems.push(this.parseExpr()) } while (this.eat(','))
      }
      this.expect('}')
      return { e: 'arrLit', elems, elem, line }
    }
    // new int[5] handled by primary; here a bare expression (e.g. another array) is fine
    return this.parseExpr()
  }

  parseIf(): Stmt {
    const t = this.next()
    this.expect('(')
    const cond = this.parseExpr()
    this.expect(')')
    const then = this.parseStatement()
    let els: Stmt | null = null
    if (this.atId('else')) {
      this.pos++
      els = this.parseStatement()
    }
    return { s: 'if', cond, then, els, line: t.line }
  }

  parseFor(): Stmt {
    const t = this.next()
    this.expect('(')
    let init: Stmt | null = null
    if (!this.at(';')) {
      if (this.isTypeStart()) {
        const line = this.peek().line
        const ty = this.parseType()
        const decls: { name: string; init: Expr | null }[] = []
        do {
          const nm = this.expectId('variable name')
          let ie: Expr | null = null
          if (this.eat('=')) ie = this.parseExpr()
          decls.push({ name: nm, init: ie })
        } while (this.eat(','))
        this.expect(';')
        init = { s: 'decl', type: ty, array: false, decls, line }
      } else {
        init = { s: 'expr', expr: this.parseExpr(), line: this.peek().line }
        this.expect(';')
      }
    } else this.expect(';')
    let cond: Expr | null = null
    if (!this.at(';')) cond = this.parseExpr()
    this.expect(';')
    const update: Expr[] = []
    if (!this.at(')')) {
      do { update.push(this.parseExpr()) } while (this.eat(','))
    }
    this.expect(')')
    const body = this.parseStatement()
    return { s: 'for', init, cond, update, body, line: t.line }
  }

  parseSwitch(): Stmt {
    const t = this.next()
    this.expect('(')
    const disc = this.parseExpr()
    this.expect(')')
    this.expect('{')
    const sections: SwitchStmt['sections'] = []
    while (!this.at('}') && this.peek().k !== 'eof') {
      const labels: { lit: JVal | 'default'; line: number }[] = []
      if (this.atId('case') || this.atId('default')) {
        while (this.atId('case') || this.atId('default')) {
          const lt = this.next()
          if (lt.v === 'default') {
            labels.push({ lit: 'default', line: lt.line })
          } else {
            labels.push({ lit: this.parseCaseLabel(), line: lt.line })
          }
          this.expect(':')
        }
      } else {
        // statements before any label → syntax error in Java
        throw new CodeError('compile', "'case' or 'default' expected inside switch", this.peek().line)
      }
      const body: Stmt[] = []
      while (!this.at('}') && !this.atId('case') && !this.atId('default') && this.peek().k !== 'eof') {
        body.push(this.parseStatement())
      }
      sections.push({ labels, body })
    }
    this.expect('}')
    return { s: 'switch', disc, sections, line: t.line }
  }

  parseCaseLabel(): JVal {
    const t = this.peek()
    if (t.k === 'num') {
      this.pos++
      const isDouble = /[.eE]/.test(t.v)
      return isDouble ? DBL(Number(t.v)) : INT(Number(t.v))
    }
    if (t.k === 'char') { this.pos++; return CHR(t.v.charCodeAt(0)) }
    if (t.k === 'str') { this.pos++; return STR(t.v) }
    if (t.k === 'id' && (t.v === 'true' || t.v === 'false')) { this.pos++; return BOOL(t.v === 'true') }
    throw new CodeError('compile', 'case labels must be constant literals (number, char, String, true/false) in this sandbox', t.line)
  }

  // ---- expressions (precedence climbing) ----

  parseExpr(): Expr { return this.parseAssign() }

  parseAssign(): Expr {
    const left = this.parseTernary()
    const t = this.peek()
    if (t.k === 'op' && ['=', '+=', '-=', '*=', '/=', '%='].includes(t.v)) {
      this.pos++
      const value = this.parseAssign()
      if (left.e !== 'name' && left.e !== 'index' && left.e !== 'field') {
        throw new CodeError('compile', 'invalid assignment target — assign to a variable or array element', t.line)
      }
      return { e: 'assign', op: t.v, target: left, value, line: t.line }
    }
    return left
  }

  parseTernary(): Expr {
    const c = this.parseOr()
    if (this.at('?')) {
      const line = this.next().line
      const a = this.parseAssign()
      this.expect(':')
      const b = this.parseAssign()
      return { e: 'cond', c, a, b, line }
    }
    return c
  }
  parseOr(): Expr {
    let l = this.parseAnd()
    while (this.at('||')) { const line = this.next().line; l = { e: 'bin', op: '||', l, r: this.parseAnd(), line } }
    return l
  }
  parseAnd(): Expr {
    let l = this.parseEq()
    while (this.at('&&')) { const line = this.next().line; l = { e: 'bin', op: '&&', l, r: this.parseEq(), line } }
    return l
  }
  parseEq(): Expr {
    let l = this.parseRel()
    while (this.at('==') || this.at('!=')) {
      const t = this.next()
      l = { e: 'bin', op: t.v, l, r: this.parseRel(), line: t.line }
    }
    return l
  }
  parseRel(): Expr {
    let l = this.parseAdd()
    while (this.at('<') || this.at('>') || this.at('<=') || this.at('>=')) {
      const t = this.next()
      l = { e: 'bin', op: t.v, l, r: this.parseAdd(), line: t.line }
    }
    return l
  }
  parseAdd(): Expr {
    let l = this.parseMul()
    while (this.at('+') || this.at('-')) {
      const t = this.next()
      l = { e: 'bin', op: t.v, l, r: this.parseMul(), line: t.line }
    }
    return l
  }
  parseMul(): Expr {
    let l = this.parseUnary()
    while (this.at('*') || this.at('/') || this.at('%')) {
      const t = this.next()
      l = { e: 'bin', op: t.v, l, r: this.parseUnary(), line: t.line }
    }
    return l
  }
  parseUnary(): Expr {
    const t = this.peek()
    if (t.k === 'op') {
      if (t.v === '!') { this.pos++; return { e: 'un', op: '!', x: this.parseUnary(), line: t.line } }
      if (t.v === '-') { this.pos++; return { e: 'un', op: '-', x: this.parseUnary(), line: t.line } }
      if (t.v === '+') { this.pos++; return this.parseUnary() }
      if (t.v === '++' || t.v === '--') {
        this.pos++
        const x = this.parseUnary()
        if (x.e !== 'name' && x.e !== 'index') {
          throw new CodeError('compile', `'${t.v}' needs a variable operand`, t.line)
        }
        return { e: 'assign', op: t.v, target: x, value: { e: 'lit', val: INT(1), line: t.line }, line: t.line }
      }
      // cast: (int) / (double) / (char)
      if (t.v === '(') {
        const save = this.pos
        this.pos++
        if (this.isTypeStart()) {
          const ty = this.parseType()
          if (this.at(')')) {
            this.pos++
            const nx = this.peek()
            if ((nx.k === 'id' && !KEYWORDS.has(nx.v)) || nx.k === 'num' || nx.k === 'char' ||
              nx.k === 'str' || (nx.k === 'op' && (nx.v === '(' || nx.v === '!')) ||
              (nx.k === 'id' && nx.v === 'String')) {
              return { e: 'cast', type: ty, x: this.parseUnary(), line: t.line }
            }
          }
        }
        this.pos = save
      }
    }
    return this.parsePostfix()
  }

  parsePostfix(): Expr {
    let x = this.parsePrimary()
    for (; ;) {
      const t = this.peek()
      if (t.k === 'op' && (t.v === '++' || t.v === '--')) {
        this.pos++
        if (x.e !== 'name' && x.e !== 'index') throw new CodeError('compile', `'${t.v}' needs a variable operand`, t.line)
        x = { e: 'assign', op: t.v, target: x, value: { e: 'lit', val: INT(1), line: t.line }, line: t.line, postfix: true }
        continue
      }
      if (t.k === 'op' && t.v === '.') {
        this.pos++
        const name = this.expectId('member name')
        if (this.at('(')) {
          const args = this.parseArgs()
          x = { e: 'call', callee: x, name, args, line: t.line }
        } else {
          x = { e: 'field', obj: x, name, line: t.line }
        }
        continue
      }
      if (t.k === 'op' && t.v === '[') {
        this.pos++
        const idx = this.parseExpr()
        this.expect(']')
        x = { e: 'index', arr: x, idx, line: t.line }
        continue
      }
      break
    }
    return x
  }

  parseArgs(): Expr[] {
    this.expect('(')
    const args: Expr[] = []
    if (!this.at(')')) {
      do { args.push(this.parseExpr()) } while (this.eat(','))
    }
    this.expect(')')
    return args
  }

  parsePrimary(): Expr {
    const t = this.peek()
    if (t.k === 'num') {
      this.pos++
      const isDouble = /[.eE]/.test(t.v) || /[fFdD]$/.test(t.v)
      const v = Number(t.v)
      if (Number.isNaN(v)) throw new CodeError('compile', `malformed number '${t.v}'`, t.line)
      return { e: 'lit', val: isDouble ? DBL(v) : INT(v), line: t.line }
    }
    if (t.k === 'char') { this.pos++; return { e: 'lit', val: CHR(t.v.charCodeAt(0)), line: t.line } }
    if (t.k === 'str') { this.pos++; return { e: 'lit', val: STR(t.v), line: t.line } }
    if (t.k === 'op' && t.v === '(') {
      this.pos++
      const e = this.parseExpr()
      this.expect(')')
      return e
    }
    if (t.k === 'id') {
      if (t.v === 'true') { this.pos++; return { e: 'lit', val: BOOL(true), line: t.line } }
      if (t.v === 'false') { this.pos++; return { e: 'lit', val: BOOL(false), line: t.line } }
      if (t.v === 'null') { this.pos++; return { e: 'lit', val: { t: 'null', v: null }, line: t.line } }
      if (t.v === 'new') {
        this.pos++
        // new Scanner(System.in) — bare or dotted java.util.Scanner
        if (this.peek().k === 'id' && (this.peek().v === 'Scanner' || this.peek().v === 'java')) {
          if (this.peek().v === 'java') this.pos += 5
          else this.pos += 1
          this.expect('(')
          if (!this.at(')')) this.parseExpr() // System.in — accepted, discarded
          this.expect(')')
          return { e: 'newScanner', line: t.line }
        }
        const ty = this.parseType()
        if (this.at('[')) {
          this.expect('[')
          if (this.at(']')) {
            throw new CodeError('compile', '2-D arrays are outside this sandbox — one dimension only', this.peek().line)
          }
          const size = this.parseExpr()
          this.expect(']')
          return { e: 'newArr', elem: ty, size, line: t.line }
        }
        if (this.at('(')) {
          // new Scanner(System.in) — the only constructor this sandbox knows
          this.expect('(')
          if (!this.at(')')) this.parseExpr()
          this.expect(')')
          return { e: 'newScanner', line: t.line }
        }
        throw new CodeError('compile', `'new' here can only create an array (new int[n]) or a Scanner`, t.line)
      }
      // bare call: name(...)
      if (this.peek(1).k === 'op' && this.peek(1).v === '(') {
        const name = this.next().v
        const args = this.parseArgs()
        return { e: 'call', callee: null, name, args, line: t.line }
      }
      // dotted path: System.out.println handled via postfix on name
      this.pos++
      return { e: 'name', name: t.v, line: t.line }
    }
    throw new CodeError('compile',
      t.k === 'eof' ? 'unexpected end of file — the program looks incomplete'
        : `unexpected '${t.v}' — a value, variable or '(' was expected here`, t.line)
  }
}

// ------------------------------------------------------- static analysis —

type SType = JType | 'void' | 'unknown' | 'nullType' | 'array' | 'scanner'

interface AScope { names: Map<string, JType | 'array' | 'scanner'>; parent: AScope | null }
function scopeFind(sc: AScope, name: string): JType | 'array' | 'scanner' | null {
  let s: AScope | null = sc
  while (s) { const t = s.names.get(name); if (t) return t; s = s.parent }
  return null
}

const MATH_RET_INT = new Set(['abs', 'max', 'min', 'round'])

function inferType(e: Expr, sc: AScope, methods: Map<string, MethodDef>): SType {
  switch (e.e) {
    case 'lit':
      return e.val.t === 'null' ? 'nullType' : (e.val.t as JType)
    case 'name': {
      const t = scopeFind(sc, e.name)
      return t ?? 'unknown'
    }
    case 'cast': return e.type
    case 'newArr': case 'arrLit': return 'array'
    case 'newScanner': return 'scanner'
    case 'index': return 'unknown'
    case 'field': {
      if (e.name === 'length') return 'int'
      if (e.name === 'out' || e.name === 'in' || e.name === 'err') return 'unknown'
      return 'unknown'
    }
    case 'un': {
      if (e.op === '!') return 'boolean'
      const t = inferType(e.x, sc, methods)
      if (t === 'int' || t === 'char') return 'int'
      if (t === 'double') return 'double'
      return 'unknown'
    }
    case 'cond': {
      const a = inferType(e.a, sc, methods), b = inferType(e.b, sc, methods)
      if (a === b) return a
      if ((a === 'int' && b === 'double') || (a === 'double' && b === 'int')) return 'double'
      return 'unknown'
    }
    case 'assign': {
      const t = scopeFind(sc, (e.target as { name?: string }).name ?? '')
      if (t) return t
      return inferType(e.value, sc, methods) === 'double' ? 'double' : 'unknown'
    }
    case 'bin': {
      const op = e.op
      if (op === '&&' || op === '||') return 'boolean'
      if (['==', '!=', '<', '>', '<=', '>='].includes(op)) return 'boolean'
      const lt = inferType(e.l, sc, methods), rt = inferType(e.r, sc, methods)
      if (op === '+' && (lt === 'String' || rt === 'String')) return 'String'
      if (lt === 'double' || rt === 'double') return 'double'
      if (lt === 'unknown' || rt === 'unknown') return 'unknown'
      if (isNumeric(lt) && isNumeric(rt)) return op === '/' || op === '%' ? 'int' : 'int'
      return 'unknown'
    }
    case 'call': {
      if (e.callee === null) {
        const m = methods.get(e.name)
        if (m) return m.ret === 'void' ? 'void' : m.ret
        return 'unknown'
      }
      const calleeT = inferType(e.callee, sc, methods)
      const nm = e.name
      if (calleeT === 'unknown' && e.callee.e === 'field' && e.callee.name === 'out' &&
        e.callee.obj.e === 'name' && e.callee.obj.name === 'System') return 'void' // System.out.*
      if (calleeT === 'String') {
        if (nm === 'length' || nm === 'indexOf') return 'int'
        if (nm === 'charAt') return 'char'
        if (nm === 'equals' || nm === 'equalsIgnoreCase' || nm === 'contains') return 'boolean'
        if (['substring', 'toUpperCase', 'toLowerCase', 'trim', 'replace'].includes(nm)) return 'String'
        return 'unknown'
      }
      if (calleeT === 'scanner') {
        if (nm === 'nextInt') return 'int'
        if (nm === 'nextDouble') return 'double'
        if (nm === 'next' || nm === 'nextLine') return 'String'
        return 'unknown'
      }
      // static calls: Math.*, Integer.*, Double.*
      const root = rootName(e.callee)
      if (root === 'Math') {
        if (MATH_RET_INT.has(nm)) return 'int'
        if (['pow', 'sqrt', 'ceil', 'floor', 'random', 'sin', 'cos', 'tan', 'log', 'exp', 'cbrt', 'hypot'].includes(nm)) return 'double'
        return 'unknown'
      }
      if (root === 'Integer' && (nm === 'parseInt' || nm === 'valueOf')) return 'int'
      if (root === 'Double' && (nm === 'parseDouble' || nm === 'valueOf')) return 'double'
      if (root === 'Boolean' && nm === 'parseBoolean') return 'boolean'
      return 'unknown'
    }
  }
}

function rootName(e: Expr): string | null {
  if (e.e === 'name') return e.name
  if (e.e === 'field') return rootName(e.obj)
  return null
}

/** System.out / System.err — callee shape `System.out` (both plain names). */
function isSysOutCallee(callee: Expr): boolean {
  return callee.e === 'field' && (callee.name === 'out' || callee.name === 'err') &&
    callee.obj.e === 'name' && callee.obj.name === 'System'
}

function describeCallee(callee: Expr): string {
  if (callee.e === 'name') return callee.name
  if (callee.e === 'field') return `${describeCallee(callee.obj)}.${callee.name}`
  return 'expression'
}

function checkCompat(decl: JType, init: SType, line: number): void {
  if (init === 'unknown' || init === 'nullType') return
  if (decl === init) return
  if (decl === 'double' && (init === 'int' || init === 'char')) return // widening
  if (decl === 'int' && init === 'char') return
  if (decl === 'char' && init === 'int') {
    throw new CodeError('compile',
      "incompatible types: possible lossy conversion from int to char — use a cast: (char)('A' + 1)", line)
  }
  if (decl === 'int' && init === 'double') {
    throw new CodeError('compile',
      'incompatible types: possible lossy conversion from double to int — decimal fractions cannot sit in an int container (cast, or declare a double)', line)
  }
  throw new CodeError('compile',
    `incompatible types: a ${init} value cannot initialise a ${decl} variable`, line)
}

class Analyzer {
  methods: Map<string, MethodDef>
  errors: CodeError[] = []
  constructor(program: Program) {
    this.methods = new Map()
    for (const m of program.methods) this.methods.set(m.name, m)
  }
  checkProgram(program: Program): void {
    if (program.mainBody.length) this.checkBody(program.mainBody, { names: new Map(), parent: null }, 'unknown')
    for (const m of this.methods.values()) {
      const sc: AScope = { names: new Map(), parent: null }
      for (const p of m.params) {
        if (sc.names.has(p.name)) this.errors.push(new CodeError('compile', `parameter '${p.name}' is already defined`, m.line))
        sc.names.set(p.name, (typeof p.type === 'string') ? p.type : 'array')
      }
      this.checkBody(m.body, sc, m.ret)
    }
  }
  checkBody(body: Stmt[], parent: AScope, ret: JType | 'void' | 'unknown'): void {
    const sc: AScope = { names: new Map(), parent }
    this.checkStmts(body, sc, ret)
  }
  checkStmts(stmts: Stmt[], sc: AScope, ret: JType | 'void' | 'unknown'): void {
    for (const st of stmts) this.checkStmt(st, sc, ret)
  }
  checkStmt(st: Stmt, sc: AScope, ret: JType | 'void' | 'unknown'): void {
    switch (st.s) {
      case 'decl': {
        for (const d of st.decls) {
          if (sc.names.has(d.name)) {
            this.errors.push(new CodeError('compile', `variable '${d.name}' is already defined in this scope`, st.line))
          }
          sc.names.set(d.name, st.array ? 'array' : (st.type as JType | 'scanner'))
          if (d.init && !st.array && st.type !== 'scanner') {
            const it = inferType(d.init, sc, this.methods)
            if (st.array) {
              if (d.init.e === 'arrLit') {
                for (const el of d.init.elems) {
                  const et = inferType(el, sc, this.methods)
                  if (et === 'unknown' || et === 'nullType') continue
                  try { checkCompat(st.type, et, st.line) } catch (err) { this.errors.push(err as CodeError) }
                }
              } else if (it !== 'array' && it !== 'nullType' && it !== 'unknown') {
                this.errors.push(new CodeError('compile', `incompatible types: ${it} cannot initialise ${st.type}[]`, st.line))
              }
            } else {
              try { checkCompat(st.type, it, st.line) } catch (err) { this.errors.push(err as CodeError) }
            }
          }
        }
        break
      }
      case 'expr': this.checkExpr(st.expr, sc); break
      case 'if':
        this.checkCond(st.cond, sc)
        this.checkStmt(st.then, { names: new Map(), parent: sc }, ret)
        if (st.els) this.checkStmt(st.els, { names: new Map(), parent: sc }, ret)
        break
      case 'while':
        this.checkCond(st.cond, sc)
        this.checkStmt(st.body, { names: new Map(), parent: sc }, ret)
        break
      case 'do':
        this.checkStmt(st.body, { names: new Map(), parent: sc }, ret)
        this.checkCond(st.cond, sc)
        break
      case 'for': {
        const fsc: AScope = { names: new Map(), parent: sc }
        if (st.init) this.checkStmt(st.init, fsc, ret)
        if (st.cond) this.checkCond(st.cond, fsc)
        for (const u of st.update) this.checkExpr(u, fsc)
        this.checkStmt(st.body, { names: new Map(), parent: fsc }, ret)
        break
      }
      case 'block': this.checkBody(st.body, sc, ret); break
      case 'return':
        if (st.expr) {
          const t = inferType(st.expr, sc, this.methods)
          if (ret === 'void') this.errors.push(new CodeError('compile', 'cannot return a value from a void method', st.line))
          else if (ret !== 'unknown') {
            try { checkCompat(ret as JType, t, st.line) } catch (err) { this.errors.push(err as CodeError) }
          }
        } else if (ret !== 'void' && ret !== 'unknown') {
          this.errors.push(new CodeError('compile', `missing return value — method returns ${ret}`, st.line))
        }
        break
      case 'switch':
        this.checkExpr(st.disc, sc) // discriminant may be int/char/String — not boolean-checked
        for (const sec of st.sections) {
          const ssc: AScope = { names: new Map(), parent: sc }
          this.checkStmts(sec.body, ssc, ret)
        }
        break
      case 'break': case 'continue': break
    }
  }
  checkCond(e: Expr, sc: AScope): void {
    this.checkExpr(e, sc)
    const t = inferType(e, sc, this.methods)
    if (t !== 'unknown' && t !== 'boolean') {
      this.errors.push(new CodeError('compile', `incompatible types: ${t} cannot be converted to boolean — conditions must be true/false expressions (use == for comparison, never =)`, e.line))
    }
  }
  checkExpr(e: Expr, sc: AScope): void {
    switch (e.e) {
      case 'lit': case 'newArr': case 'newScanner': case 'arrLit': return
      case 'name': {
        // library roots are names, not program variables
        if (['System', 'Math', 'Integer', 'Double', 'Boolean', 'String', 'Character'].includes(e.name)) return
        if (!scopeFind(sc, e.name)) {
          this.errors.push(new CodeError('compile',
            `cannot find symbol: variable '${e.name}' — declare it before use (Java is statically typed)`, e.line))
        }
        return
      }
      case 'un': this.checkExpr(e.x, sc); return
      case 'cast': this.checkExpr(e.x, sc); return
      case 'cond': this.checkCond(e.c, sc); this.checkExpr(e.a, sc); this.checkExpr(e.b, sc); return
      case 'bin': this.checkExpr(e.l, sc); this.checkExpr(e.r, sc); return
      case 'index':
        this.checkExpr(e.arr, sc)
        this.checkExpr(e.idx, sc)
        return
      case 'field': this.checkExpr(e.obj, sc); return
      case 'assign': {
        if (e.target.e === 'name' && !scopeFind(sc, e.target.name)) {
          this.errors.push(new CodeError('compile',
            `cannot find symbol: variable '${e.target.name}' — declare it before assigning (Java is statically typed)`, e.line))
          return
        }
        this.checkExpr(e.target, sc)
        this.checkExpr(e.value, sc)
        const tt = e.target.e === 'name' ? scopeFind(sc, e.target.name) : null
        if (tt && (tt === 'int' || tt === 'double' || tt === 'boolean' || tt === 'char' || tt === 'String') && e.op === '=') {
          const vt = inferType(e.value, sc, this.methods)
          try { checkCompat(tt, vt, e.line) } catch (err) { this.errors.push(err as CodeError) }
        }
        return
      }
      case 'call': {
        if (e.callee === null) {
          const m = this.methods.get(e.name)
          if (!m) {
            this.errors.push(new CodeError('compile',
              `cannot find symbol: method '${e.name}' — define it as a static method in the class`, e.line))
            return
          }
          if (e.args.length !== m.params.length) {
            this.errors.push(new CodeError('compile',
              `method '${e.name}' expects ${m.params.length} argument(s), got ${e.args.length}`, e.line))
          }
          for (const a of e.args) this.checkExpr(a, sc)
          return
        }
        // member calls — spot-check the well-known library families
        const root = rootName(e.callee)
        if (root === 'Math') {
          const need = { abs: 1, max: 2, min: 2, pow: 2, sqrt: 1, cbrt: 1, ceil: 1, floor: 1, round: 1, hypot: 2, sin: 1, cos: 1, tan: 1, log: 1, exp: 1, random: 0 }[e.name]
          if (need === undefined) {
            this.errors.push(new CodeError('compile', `cannot find symbol: Math.${e.name} — outside this sandbox's Math library`, e.line))
          } else if (e.args.length !== need) {
            this.errors.push(new CodeError('compile', `Math.${e.name} expects ${need} argument(s), got ${e.args.length}`, e.line))
          }
          for (const a of e.args) this.checkExpr(a, sc)
          return
        }
        if (root === 'Integer' && e.name === 'parseInt' && e.args.length !== 1) {
          this.errors.push(new CodeError('compile', 'Integer.parseInt expects 1 argument', e.line))
        }
        if (e.callee.e === 'name' && !['System', 'Math', 'Integer', 'Double', 'Boolean', 'String', 'scannerVar'].includes(e.callee.name) && !scopeFind(sc, e.callee.name)) {
          this.errors.push(new CodeError('compile', `cannot find symbol: variable '${e.callee.name}'`, e.callee.line))
          return
        }
        this.checkExpr(e.callee, sc)
        for (const a of e.args) this.checkExpr(a, sc)
        return
      }
    }
  }
}

// -------------------------------------------------------------- evaluator

interface Cell { type: JType | 'array' | 'scanner'; val: JVal }
type Env = Map<string, Cell>

interface Frame { ret: JVal | null; returned: boolean }

const MAX_STEPS = 400_000
const MAX_TRACE_ROWS = 400
const MAX_CALL_DEPTH = 120
const MAX_OUTPUT = 20_000

interface Signals { brk: boolean; cont: boolean }

class Interpreter {
  out: string = ''
  steps = 0
  trace: TraceRow[] = []
  inputs: string[]
  inputPos = 0
  lineBuf: string = ''
  methods: Map<string, MethodDef>
  traceOn: boolean
  randomState = 0x2f6e2b1
  depth = 0
  truncateNote = false

  constructor(program: Program, inputs: string[], traceOn: boolean) {
    this.methods = new Map()
    for (const m of program.methods) this.methods.set(m.name, m)
    this.inputs = inputs
    this.traceOn = traceOn
  }

  tick(line?: number): void {
    this.steps++
    if (this.steps > MAX_STEPS) {
      throw new CodeError('limit',
        'possible infinite loop — the run was stopped after the step limit. Check the loop\'s update and its condition: does anything move it toward false?',
        line)
    }
  }

  // --- input stream (tokens across the provided lines) ---
  nextToken(line: number): string {
    for (; ;) {
      const rest = this.lineBuf.trimStart()
      if (rest.length) {
        const m = rest.match(/^\S+/)
        const tok = m![0]
        this.lineBuf = rest.slice(tok.length)
        return tok
      }
      if (this.inputPos >= this.inputs.length) {
        throw new CodeError('runtime',
          'NoSuchElementException: the program asked for more input than the sample inputs provide — add another line to the inputs pane',
          line, 'NoSuchElementException')
      }
      this.lineBuf = this.inputs[this.inputPos++]
    }
  }
  nextLine(line: number): string {
    if (this.lineBuf.trim().length) {
      const v = this.lineBuf
      this.lineBuf = ''
      return v
    }
    if (this.inputPos >= this.inputs.length) {
      throw new CodeError('runtime',
        'NoSuchElementException: the program asked for more input than the sample inputs provide',
        line, 'NoSuchElementException')
    }
    return this.inputs[this.inputPos++]
  }

  print(s: string): void {
    if (this.out.length + s.length > MAX_OUTPUT) {
      throw new CodeError('limit', 'output limit exceeded — a loop is probably printing forever', undefined)
    }
    this.out += s
  }

  write(rowLine: number, env: Env): void {
    if (!this.traceOn) return
    if (this.trace.length >= MAX_TRACE_ROWS) { this.truncateNote = true; return }
    const vars: TraceVar[] = []
    for (const [name, cell] of env) {
      vars.push({ name, type: cell.type, value: javaToString(cell.val) })
    }
    this.trace.push({ line: rowLine, vars, output: this.out })
  }

  defaultFor(t: JType): JVal {
    switch (t) {
      case 'int': return INT(0)
      case 'double': return DBL(0.0)
      case 'boolean': return BOOL(false)
      case 'char': return CHR(0)
      case 'String': return { t: 'null', v: null }
    }
  }

  coerceTo(t: JType, v: JVal, line: number): JVal {
    if (t === 'double' && (v.t === 'int' || v.t === 'char')) return DBL(v.t === 'char' ? v.v : v.v)
    if (t === 'int' && v.t === 'char') return INT(v.v)
    if (t === 'char' && v.t === 'int') {
      if (v.v < 0 || v.v > 65535) {
        throw new CodeError('runtime', `cannot cast ${v.v} to char — outside 0..65535`, line)
      }
      return CHR(v.v)
    }
    if (t === v.t) return v
    if (t === 'int' && v.t === 'double') {
      throw new CodeError('compile', 'incompatible types: possible lossy conversion from double to int (use an explicit cast (int))', line)
    }
    if (t === 'String' && v.t === 'null') return v
    throw new CodeError('compile', `incompatible types: ${v.t} cannot be stored in a ${t} variable`, line)
  }

  store(cell: Cell, v: JVal, line: number): void {
    if (cell.type === 'array' || cell.type === 'scanner') { cell.val = v; return }
    cell.val = this.coerceTo(cell.type, v, line)
  }

  execBody(body: Stmt[], env: Env, frame: Frame, sig: Signals): void {
    for (const st of body) {
      if (frame.returned || sig.brk || sig.cont) return
      this.execStmt(st, env, frame, sig)
    }
  }

  execStmt(st: Stmt, env: Env, frame: Frame, sig: Signals): void {
    this.tick(st.line)
    switch (st.s) {
      case 'decl': {
        for (const d of st.decls) {
          let val: JVal
          if (st.array) {
            if (d.init && d.init.e === 'arrLit') {
              const elems = d.init.elems.map(el => this.coerceTo(st.type as JType, this.eval(el, env), st.line))
              val = { t: 'array', v: { arr: elems, elem: st.type as JType } }
            } else if (d.init) {
              val = this.eval(d.init, env)
            } else {
              val = { t: 'array', v: { arr: null, elem: st.type as JType } }
            }
          } else if (st.type === 'scanner') {
            val = d.init ? this.eval(d.init, env) : { t: 'scanner', v: null }
          } else {
            val = d.init ? this.coerceTo(st.type as JType, this.eval(d.init, env), st.line) : this.defaultFor(st.type as JType)
          }
          env.set(d.name, { type: (st.array ? 'array' : st.type) as JType | 'array' | 'scanner', val })
        }
        this.write(st.line, env)
        return
      }
      case 'expr':
        this.eval(st.expr, env)
        this.write(st.line, env)
        return
      case 'if': {
        const c = this.eval(st.cond, env)
        if (c.t !== 'boolean') {
          throw new CodeError('compile', `condition is ${c.t}, not boolean (use == to compare; = assigns)`, st.line)
        }
        if (c.v) this.execStmt(st.then, env, frame, sig)
        else if (st.els) this.execStmt(st.els, env, frame, sig)
        return
      }
      case 'while': {
        for (; ;) {
          this.tick(st.line)
          const c = this.eval(st.cond, env)
          if (c.t !== 'boolean') throw new CodeError('compile', 'while condition must be boolean', st.line)
          if (!c.v) break
          this.execStmt(st.body, env, frame, sig)
          if (frame.returned) return
          if (sig.brk) { sig.brk = false; break }
          if (sig.cont) sig.cont = false
        }
        return
      }
      case 'do': {
        for (; ;) {
          this.execStmt(st.body, env, frame, sig)
          if (frame.returned) return
          if (sig.brk) { sig.brk = false; break }
          if (sig.cont) sig.cont = false
          this.tick(st.line)
          const c = this.eval(st.cond, env)
          if (c.t !== 'boolean') throw new CodeError('compile', 'do-while condition must be boolean', st.line)
          if (!c.v) break
        }
        return
      }
      case 'for': {
        const fenv: Env = new Map(env)
        if (st.init) this.execStmt(st.init, fenv, frame, sig)
        for (; ;) {
          this.tick(st.line)
          if (st.cond) {
            const c = this.eval(st.cond, fenv)
            if (c.t !== 'boolean') throw new CodeError('compile', 'for condition must be boolean', st.line)
            if (!c.v) break
          }
          this.execStmt(st.body, fenv, frame, sig)
          if (frame.returned) return
          if (sig.brk) { sig.brk = false; break }
          if (sig.cont) sig.cont = false
          for (const u of st.update) this.eval(u, fenv)
        }
        return
      }
      case 'block': {
        const benv: Env = new Map(env)
        this.execBody(st.body, benv, frame, sig)
        return
      }
      case 'return':
        frame.ret = st.expr ? this.eval(st.expr, env) : null
        frame.returned = true
        this.write(st.line, env)
        return
      case 'break': sig.brk = true; return
      case 'continue': sig.cont = true; return
      case 'switch': {
        const disc = this.eval(st.disc, env)
        const senv: Env = new Map(env)
        const start = st.sections.findIndex(sec =>
          sec.labels.some(l => l.lit !== 'default' && this.labelEquals(l.lit as JVal, disc)))
        let from = start
        if (from < 0) from = st.sections.findIndex(sec => sec.labels.some(l => l.lit === 'default'))
        if (from < 0) return
        const ssig: Signals = { brk: false, cont: false }
        for (let i = from; i < st.sections.length; i++) {
          this.execBody(st.sections[i].body, senv, frame, ssig)
          if (frame.returned) return
          if (ssig.brk) { ssig.brk = false; break }
          if (ssig.cont) { sig.cont = true; return } // continue propagates to the loop
        }
        this.write(st.line, env)
        return
      }
    }
  }

  labelEquals(l: JVal, disc: JVal): boolean {
    if (l.t !== disc.t) {
      // int case label vs char discriminant (and vice versa) match by code
      if (l.t === 'int' && disc.t === 'char') return l.v === disc.v
      if (l.t === 'char' && disc.t === 'int') return l.v === disc.v
      return false
    }
    return l.v === disc.v
  }

  lookup(env: Env, name: string, line: number): Cell {
    const c = env.get(name)
    if (!c) {
      throw new CodeError('runtime', `variable '${name}' vanished — internal scope bug`, line)
    }
    return c
  }

  eval(e: Expr, env: Env): JVal {
    this.tick(e.line)
    switch (e.e) {
      case 'lit': return e.val
      case 'name': return this.lookup(env, e.name, e.line).val
      case 'un': {
        if (e.op === '!') {
          const v = this.eval(e.x, env)
          if (v.t !== 'boolean') throw new CodeError('compile', "'!' needs a boolean operand", e.line)
          return BOOL(!v.v)
        }
        const v = this.eval(e.x, env)
        if (v.t === 'int' || v.t === 'double') return v.t === 'int' ? INT(-v.v) : DBL(-v.v)
        if (v.t === 'char') return INT(-v.v)
        throw new CodeError('compile', `'-' needs a numeric operand, got ${v.t}`, e.line)
      }
      case 'cast': {
        const v = this.eval(e.x, env)
        if (e.type === 'int') {
          if (v.t === 'double') return INT(Math.trunc(v.v))
          if (v.t === 'char') return INT(v.v)
          if (v.t === 'int') return v
          throw new CodeError('compile', `cannot cast ${v.t} to int`, e.line)
        }
        if (e.type === 'double') {
          if (v.t === 'int' || v.t === 'char') return DBL(v.v)
          if (v.t === 'double') return v
          throw new CodeError('compile', `cannot cast ${v.t} to double`, e.line)
        }
        if (e.type === 'char') {
          if (v.t === 'int') return CHR(v.v)
          if (v.t === 'char') return v
          throw new CodeError('compile', `cannot cast ${v.t} to char`, e.line)
        }
        throw new CodeError('compile', `cast to ${e.type} is not needed/supported here`, e.line)
      }
      case 'cond': {
        const c = this.eval(e.c, env)
        if (c.t !== 'boolean') throw new CodeError('compile', 'ternary ? condition must be boolean', e.line)
        return c.v ? this.eval(e.a, env) : this.eval(e.b, env)
      }
      case 'bin': return this.evalBin(e, env)
      case 'assign': return this.evalAssign(e, env)
      case 'index': {
        const a = this.eval(e.arr, env)
        const i = this.eval(e.idx, env)
        if (a.t !== 'array') throw new CodeError('runtime', `indexed value is ${a.t}, not an array`, e.line, 'NullPointerException')
        if (a.v.arr === null) throw new CodeError('runtime', 'the array is null — create it with new type[size] before use', e.line, 'NullPointerException')
        if (i.t !== 'int') throw new CodeError('compile', 'array index must be an int', e.line)
        if (i.v < 0 || i.v >= a.v.arr.length) {
          throw new CodeError('runtime',
            `ArrayIndexOutOfBoundsException: index ${i.v} is outside 0..${a.v.arr.length - 1} (length ${a.v.arr.length})`,
            e.line, 'ArrayIndexOutOfBoundsException')
        }
        const el = a.v.arr[i.v]
        if (el === null) return this.defaultFor(a.v.elem)
        return el
      }
      case 'field': {
        if (e.name === 'length') {
          const a = this.eval(e.obj, env)
          if (a.t !== 'array') throw new CodeError('compile', '.length works on arrays (and String uses length())', e.line)
          if (a.v.arr === null) throw new CodeError('runtime', 'the array is null', e.line, 'NullPointerException')
          return INT(a.v.arr.length)
        }
        if (e.name === 'out' || e.name === 'err' || e.name === 'in') return { t: 'null', v: null }
        throw new CodeError('compile', `unknown member '${e.name}'`, e.line)
      }
      case 'newArr': {
        const n = this.eval(e.size, env)
        if (n.t !== 'int') throw new CodeError('compile', 'array size must be an int', e.line)
        if (n.v < 0) throw new CodeError('runtime', `NegativeArraySizeException: size ${n.v}`, e.line, 'NegativeArraySizeException')
        const n2 = Math.min(n.v, 10_000)
        return { t: 'array', v: { arr: new Array(n2).fill(null), elem: e.elem } }
      }
      case 'arrLit': {
        const elems = e.elems.map(el => this.coerceTo(e.elem, this.eval(el, env), e.line))
        return { t: 'array', v: { arr: elems, elem: e.elem } }
      }
      case 'newScanner': return { t: 'scanner', v: null }
      case 'call': return this.evalCall(e, env)
    }
  }

  evalAssign(e: Expr & { e: 'assign' }, env: Env): JVal {
    // target: name | index (postfix/prefix ++/-- reduce to op '+='/'-=' with value 1, flagged)
    if (e.target.e === 'name') {
      const cell = this.lookup(env, e.target.name, e.line)
      if (cell.type === 'array') {
        const rv = this.eval(e.value, env)
        if (rv.t !== 'array' && rv.t !== 'null') {
          throw new CodeError('compile', `cannot assign ${rv.t} to ${e.target.name} (an array)`, e.line)
        }
        cell.val = rv
        return rv
      }
      const rv = this.eval(e.value, env)
      if (e.op === '=') {
        this.store(cell, rv, e.line)
        return cell.val
      }
      if (e.op === '++' || e.op === '--') {
        const cur = cell.val
        if (cur.t !== 'int' && cur.t !== 'double' && cur.t !== 'char') {
          throw new CodeError('compile', `'${e.op}' needs a numeric variable, got ${cur.t}`, e.line)
        }
        const old = cur.t === 'char' ? CHR(cur.v) : cur.t === 'double' ? DBL(cur.v) : INT(cur.v)
        const res = this.arith(cur, INT(1), e.op === '++' ? '+' : '-', e.line)
        this.store(cell, res, e.line) // char wraps back to char like Java's hidden cast
        return e.postfix ? old : cell.val // x++ yields the OLD value, ++x the new
      }
      const binop = e.op[0] as '+' | '-' | '*' | '/' | '%'
      const rhs = this.eval(e.value, env)
      // Java compound assignment casts back to the variable's type
      const cv = cell.val
      const widened = cv.t === 'int' && cell.type === 'double' ? DBL(cv.v) : cv
      const res = this.arith(widened, rhs, binop, e.line)
      cell.val = cell.type === 'scanner' ? res : this.compoundCoerce(cell.type, res)
      return cell.val
    }
    if (e.target.e === 'index') {
      const a = this.eval(e.target.arr, env)
      const i = this.eval(e.target.idx, env)
      if (a.t !== 'array' || a.v.arr === null) throw new CodeError('runtime', 'not a usable array', e.line, 'NullPointerException')
      if (i.t !== 'int') throw new CodeError('compile', 'array index must be an int', e.line)
      if (i.v < 0 || i.v >= a.v.arr.length) {
        throw new CodeError('runtime',
          `ArrayIndexOutOfBoundsException: index ${i.v} is outside 0..${a.v.arr.length - 1} (length ${a.v.arr.length})`,
          e.line, 'ArrayIndexOutOfBoundsException')
      }
      const rv = this.eval(e.value, env)
      const stored = this.coerceTo(a.v.elem, rv, e.line)
      a.v.arr[i.v] = stored
      return stored
    }
    throw new CodeError('compile', 'invalid assignment target', e.line)
  }

  compoundCoerce(t: JType, v: JVal): JVal {
    if (t === 'int' && v.t === 'double') return INT(Math.trunc(v.v))
    if (t === 'char' && v.t === 'int') return CHR(v.v)
    if (t === 'double' && v.t === 'int') return DBL(v.v)
    return v
  }

  evalBin(e: Expr & { e: 'bin' }, env: Env): JVal {
    if (e.op === '&&') {
      const l = this.eval(e.l, env)
      if (l.t !== 'boolean') throw new CodeError('compile', "'&&' needs boolean operands", e.line)
      if (!l.v) return BOOL(false)
      const r = this.eval(e.r, env)
      if (r.t !== 'boolean') throw new CodeError('compile', "'&&' needs boolean operands", e.line)
      return BOOL(r.v)
    }
    if (e.op === '||') {
      const l = this.eval(e.l, env)
      if (l.t !== 'boolean') throw new CodeError('compile', "'||' needs boolean operands", e.line)
      if (l.v) return BOOL(true)
      const r = this.eval(e.r, env)
      if (r.t !== 'boolean') throw new CodeError('compile', "'||' needs boolean operands", e.line)
      return BOOL(r.v)
    }
    if (['==', '!=', '<', '>', '<=', '>='].includes(e.op)) {
      const l = this.eval(e.l, env)
      const r = this.eval(e.r, env)
      return this.compare(e.op, l, r, e.line)
    }
    const l = this.eval(e.l, env)
    const r = this.eval(e.r, env)
    if (e.op === '+') {
      if (l.t === 'String' || r.t === 'String') {
        const ls = l.t === 'String' ? l.v : javaToString(l)
        const rs = r.t === 'String' ? r.v : javaToString(r)
        return STR(ls + rs)
      }
    }
    return this.arith(l, r, e.op as '+' | '-' | '*' | '/' | '%', e.line)
  }

  compare(op: string, l: JVal, r: JVal, line: number): JVal {
    if (op === '==' || op === '!=') {
      if (l.t === 'String' && r.t === 'String') {
        // reference equality on two literals is interned equality; teach via equals
        return BOOL(op === '==' ? l.v === r.v : l.v !== r.v)
      }
      const eq = l.t === r.t ? l.v === r.v : this.numericPair(l, r) ? this.num(l) === this.num(r) : (l.t === 'null' || r.t === 'null') ? l.t === r.t : false
      return BOOL(op === '==' ? eq : !eq)
    }
    if (!this.numericPair(l, r)) {
      throw new CodeError('compile', `'${op}' needs numeric operands (got ${l.t} and ${r.t}) — relational operators don't apply to text or true/false`, line)
    }
    const a = this.num(l), b = this.num(r)
    switch (op) {
      case '<': return BOOL(a < b)
      case '>': return BOOL(a > b)
      case '<=': return BOOL(a <= b)
      case '>=': return BOOL(a >= b)
    }
    return BOOL(false)
  }

  numericPair(l: JVal, r: JVal): boolean {
    return isNumeric(l.t) && isNumeric(r.t)
  }
  num(v: JVal): number {
    return v.t === 'char' ? v.v : (v.t === 'int' || v.t === 'double') ? v.v : 0
  }

  arith(l: JVal, r: JVal, op: '+' | '-' | '*' | '/' | '%', line: number): JVal {
    if (!isNumeric(l.t) || !isNumeric(r.t)) {
      throw new CodeError('compile',
        `bad operand types for ${op}: ${l.t} and ${r.t} — arithmetic needs numbers (String uses + for joining text only)`, line)
    }
    const bothInt = l.t !== 'double' && r.t !== 'double'
    const a = this.num(l), b = this.num(r)
    if (op === '+') return bothInt ? INT(a + b) : DBL(a + b)
    if (op === '-') return bothInt ? INT(a - b) : DBL(a - b)
    if (op === '*') return bothInt ? INT(a * b) : DBL(a * b)
    if (op === '/') {
      if (bothInt) {
        if (b === 0) throw new CodeError('runtime', 'ArithmeticException: / by zero — integer division by zero stops the program', line, 'ArithmeticException')
        return INT(Math.trunc(a / b))
      }
      return DBL(a / b) // doubles yield Infinity, like the JVM
    }
    // %
    if (bothInt) {
      if (b === 0) throw new CodeError('runtime', 'ArithmeticException: / by zero (remainder)', line, 'ArithmeticException')
      return INT(a % b)
    }
    return DBL(b === 0 ? NaN : a % b)
  }

  evalCall(e: Expr & { e: 'call' }, env: Env): JVal {
    // bare call → user method (methods-lite)
    if (e.callee === null) {
      const m = this.methods.get(e.name)
      if (!m) throw new CodeError('compile', `cannot find symbol: method '${e.name}'`, e.line)
      return this.callMethod(m, e.args, env, e.line)
    }
    // System.out.println / print — route by structure BEFORE evaluating the
    // callee (System is a library name, not a program variable)
    if ((e.name === 'println' || e.name === 'print') && isSysOutCallee(e.callee)) {
      let s = ''
      if (e.args.length === 1) {
        const v = this.eval(e.args[0], env)
        s = v.t === 'String' ? v.v : javaToString(v)
      } else if (e.args.length > 1) {
        throw new CodeError('compile', `${e.name} takes at most one argument — join values with +`, e.line)
      }
      this.print(s + (e.name === 'println' ? '\n' : ''))
      return { t: 'null', v: null }
    }
    // static library calls — the root name routes, never the variable env
    const root = rootName(e.callee)
    if (root === 'Math') return this.mathCall(e.name, e.args.map(a => this.eval(a, env)), e.line)
    if (root === 'Integer' || root === 'Double' || root === 'Boolean' || root === 'String') {
      const args = e.args.map(a => this.eval(a, env))
      if (root === 'Integer' && (e.name === 'parseInt' || e.name === 'valueOf')) {
        if (args[0].t !== 'String') throw new CodeError('compile', 'Integer.parseInt expects a String', e.line)
        const n = Number(args[0].v.trim())
        if (!Number.isInteger(n)) throw new CodeError('runtime', `NumberFormatException: "${args[0].v}" is not an int`, e.line, 'NumberFormatException')
        return INT(n)
      }
      if (root === 'Double' && (e.name === 'parseDouble' || e.name === 'valueOf')) {
        if (args[0].t !== 'String') throw new CodeError('compile', 'Double.parseDouble expects a String', e.line)
        const n = Number(args[0].v.trim())
        if (Number.isNaN(n)) throw new CodeError('runtime', `NumberFormatException: "${args[0].v}" is not a double`, e.line, 'NumberFormatException')
        return DBL(n)
      }
      if (root === 'Boolean' && e.name === 'parseBoolean') return BOOL(args[0].t === 'String' && args[0].v.trim() === 'true')
      if (root === 'String' && e.name === 'valueOf') return STR(javaToString(args[0]))
      throw new CodeError('compile', `${root}.${e.name} is not available in this sandbox`, e.line)
    }
    // instance calls: String methods, Scanner input, array misuse
    if (e.callee.e === 'name' || e.callee.e === 'call' || e.callee.e === 'index' || e.callee.e === 'field') {
      const objV = this.eval(e.callee, env)
      if (objV.t === 'String') return this.stringMethod(objV.v, e, env)
      if (objV.t === 'scanner') {
        if (e.name === 'nextInt') {
          const tok = this.nextToken(e.line)
          const n = Number(tok)
          if (!Number.isInteger(n)) {
            throw new CodeError('runtime', `NumberFormatException: "${tok}" is not an int — nextInt() needs whole-number input`, e.line, 'NumberFormatException')
          }
          return INT(n)
        }
        if (e.name === 'nextDouble') {
          const tok = this.nextToken(e.line)
          const n = Number(tok)
          if (Number.isNaN(n)) {
            throw new CodeError('runtime', `NumberFormatException: "${tok}" is not a double`, e.line, 'NumberFormatException')
          }
          return DBL(n)
        }
        if (e.name === 'next') return STR(this.nextToken(e.line))
        if (e.name === 'nextLine') return STR(this.nextLine(e.line))
        throw new CodeError('compile', `Scanner.${e.name} is outside this sandbox (nextInt, nextDouble, next, nextLine)`, e.line)
      }
      if (objV.t === 'array' && e.name === 'length') {
        throw new CodeError('compile', "array length is a property, not a method — write arr.length (no parentheses)", e.line)
      }
      if (objV.t === 'null') {
        throw new CodeError('runtime', `NullPointerException: '${describeCallee(e.callee)}' holds null — nothing to call the method on`, e.line, 'NullPointerException')
      }
    }
    throw new CodeError('compile', `call '${e.name}' is not available in this sandbox`, e.line)
  }

  stringMethod(s: string, e: Expr & { e: 'call' }, env: Env): JVal {
    const args = e.args.map(a => this.eval(a, env))
    switch (e.name) {
      case 'length': return INT(s.length)
      case 'charAt': {
        const i = args[0]
        if (i.t !== 'int') throw new CodeError('compile', 'charAt expects an int index', e.line)
        if (i.v < 0 || i.v >= s.length) {
          throw new CodeError('runtime', `StringIndexOutOfBoundsException: index ${i.v} in a String of length ${s.length}`, e.line, 'StringIndexOutOfBoundsException')
        }
        return CHR(s.charCodeAt(i.v))
      }
      case 'substring': {
        const b = args[0]
        if (b.t !== 'int') throw new CodeError('compile', 'substring expects int index(es)', e.line)
        const end = args.length > 1 ? args[1] : INT(s.length)
        if (end.t !== 'int') throw new CodeError('compile', 'substring end must be an int', e.line)
        if (b.v < 0 || end.v > s.length || b.v > end.v) {
          throw new CodeError('runtime', `StringIndexOutOfBoundsException: substring(${b.v}, ${end.v}) on length ${s.length}`, e.line, 'StringIndexOutOfBoundsException')
        }
        return STR(s.slice(b.v, end.v))
      }
      case 'equals': return BOOL(args[0].t === 'String' && s === args[0].v)
      case 'equalsIgnoreCase': return BOOL(args[0].t === 'String' && s.toLowerCase() === args[0].v.toLowerCase())
      case 'contains': return BOOL(args[0].t === 'String' && s.includes(args[0].v))
      case 'toUpperCase': return STR(s.toUpperCase())
      case 'toLowerCase': return STR(s.toLowerCase())
      case 'trim': return STR(s.trim())
      case 'indexOf': {
        if (args[0].t === 'String') return INT(s.indexOf(args[0].v))
        if (args[0].t === 'char') return INT(s.indexOf(String.fromCharCode(args[0].v)))
        throw new CodeError('compile', 'indexOf expects a String or char', e.line)
      }
      case 'isEmpty': return BOOL(s.length === 0)
      case 'compareTo': {
        if (args[0].t !== 'String') throw new CodeError('compile', 'compareTo expects a String', e.line)
        return INT(s < args[0].v ? -1 : s > args[0].v ? 1 : 0)
      }
    }
    throw new CodeError('compile', `String method '${e.name}' is outside this sandbox`, e.line)
  }

  mathCall(name: string, args: JVal[], line: number): JVal {
    const n = (i: number): number => {
      const a = args[i]
      if (!isNumeric(a.t)) throw new CodeError('compile', `Math.${name} needs numeric arguments`, line)
      return this.num(a)
    }
    const isInt = (i: number): boolean => args[i].t !== 'double'
    switch (name) {
      case 'abs': return isInt(0) ? INT(Math.abs(n(0))) : DBL(Math.abs(n(0)))
      case 'max': return (isInt(0) && isInt(1)) ? INT(Math.max(n(0), n(1))) : DBL(Math.max(n(0), n(1)))
      case 'min': return (isInt(0) && isInt(1)) ? INT(Math.min(n(0), n(1))) : DBL(Math.min(n(0), n(1)))
      case 'pow': return DBL(Math.pow(n(0), n(1)))
      case 'sqrt': return DBL(Math.sqrt(n(0)))
      case 'cbrt': return DBL(Math.cbrt(n(0)))
      case 'ceil': return DBL(Math.ceil(n(0)))
      case 'floor': return DBL(Math.floor(n(0)))
      case 'round': {
        const v = n(0)
        return INT(Math.sign(v) * Math.round(Math.abs(v)))
      }
      case 'hypot': return DBL(Math.hypot(n(0), n(1)))
      case 'sin': return DBL(Math.sin(n(0)))
      case 'cos': return DBL(Math.cos(n(0)))
      case 'tan': return DBL(Math.tan(n(0)))
      case 'log': return DBL(Math.log(n(0)))
      case 'exp': return DBL(Math.exp(n(0)))
      case 'random': {
        // deterministic LCG — the sandbox replaces the JVM's entropy with a
        // fixed sequence so every run of the same program is identical
        this.randomState = (Math.imul(this.randomState, 1664525) + 1013904223) >>> 0
        return DBL(this.randomState / 4294967296)
      }
    }
    throw new CodeError('compile', `Math.${name} is not available`, line)
  }

  callMethod(m: MethodDef, argExprs: Expr[], callerEnv: Env, line: number): JVal {
    if (this.depth >= MAX_CALL_DEPTH) {
      throw new CodeError('runtime', 'StackOverflowError: recursion went deeper than 120 calls — check that the base case is reached', line, 'StackOverflowError')
    }
    const args = argExprs.map(a => this.eval(a, callerEnv))
    const env: Env = new Map()
    const NULLV: JVal = { t: 'null', v: null }
    m.params.forEach((p, i) => {
      const a = args[i] ?? NULLV
      if (typeof p.type === 'string') {
        env.set(p.name, { type: p.type, val: this.coerceTo(p.type, a, line) })
      } else {
        if (a.t !== 'array' && a.t !== 'null') {
          throw new CodeError('compile', `argument ${i + 1} of '${m.name}' must be an array`, line)
        }
        env.set(p.name, { type: 'array', val: a })
      }
    })
    const frame: Frame = { ret: null, returned: false }
    const sig: Signals = { brk: false, cont: false }
    this.depth++
    try {
      this.execBody(m.body, env, frame, sig)
    } finally {
      this.depth--
    }
    if (m.ret === 'void') return { t: 'null', v: null }
    if (!frame.returned) {
      throw new CodeError('runtime', `missing return: method '${m.name}' finished without executing return`, line)
    }
    if (frame.ret === null) return { t: 'null', v: null }
    return this.coerceTo(m.ret as JType, frame.ret, line)
  }
}

// -------------------------------------------------------------- public API

export interface TraceVar { name: string; type: string; value: string }
export interface TraceRow { line: number; vars: TraceVar[]; output: string }

export interface RunError {
  kind: ErrorKind
  message: string
  line?: number
  javaName?: string
}

export interface RunResult {
  ok: boolean
  stdout: string
  trace: TraceRow[]
  error: RunError | null
  steps: number
  traceTruncated: boolean
}

/**
 * runJava — parse, statically analyse (compile-style errors) and execute a
 * Java-subset program, capturing stdout plus the per-statement trace table.
 */
export function runJava(src: string, inputs: string[] = [], opts?: { trace?: boolean }): RunResult {
  const traceOn = opts?.trace !== false
  try {
    const program = new Parser(src).parseProgram()
    const stmts = program.mainBody.length ? program.mainBody : []
    const analyzer = new Analyzer(program)
    analyzer.checkProgram(program)
    if (analyzer.errors.length) {
      const e = analyzer.errors[0]
      return { ok: false, stdout: '', trace: [], error: { kind: 'compile', message: e.message, line: e.line }, steps: 0, traceTruncated: false }
    }
    const interp = new Interpreter(program, inputs, traceOn)
    const frame: Frame = { ret: null, returned: false }
    const sig: Signals = { brk: false, cont: false }
    if (stmts.length) {
      interp.execBody(stmts, new Map(), frame, sig)
    } else {
      // class-wrapped program: execute the main method (methods may also run
      // only when called from main — exactly like the JVM)
      const main = program.methods.find(m => m.name === 'main')
      if (!main) {
        return {
          ok: false, stdout: '', trace: [],
          error: { kind: 'compile', message: 'no runnable code — define statements at the top level or a main method inside the class' },
          steps: 0, traceTruncated: false,
        }
      }
      interp.callMethod(main, [], new Map(), main.line)
    }
    return {
      ok: true,
      stdout: interp.out,
      trace: interp.trace,
      error: null,
      steps: interp.steps,
      traceTruncated: interp.truncateNote,
    }
  } catch (err) {
    if (err instanceof CodeError) {
      return { ok: false, stdout: '', trace: [], error: { kind: err.kind, message: err.message, line: err.line, javaName: err.javaName }, steps: 0, traceTruncated: false }
    }
    return { ok: false, stdout: '', trace: [], error: { kind: 'runtime', message: `internal sandbox error: ${String(err)}` }, steps: 0, traceTruncated: false }
  }
}

/**
 * evalExprText — evaluate ONE Java-style expression against a plain
 * variable map. The flowchart workbench (classes 6-8) executes its
 * process / decision / loop blocks through this, so the arithmetic the
 * young classes see obeys the same Java semantics as the class 9-10
 * runner (integer division included). Numbers stay int when integral.
 */
export interface ExprEvalResult { ok: boolean; value?: JVal; error?: string }

export function evalExprText(expr: string, vars: Record<string, number | string | boolean>):
  ExprEvalResult {
  try {
    const toks = tokenize(expr)
    const p = new Parser(expr)
    p.toks = toks
    const e = p.parseExpr()
    if (p.peek().k !== 'eof') throw new CodeError('compile', `unexpected '${p.peek().v}' after the expression`, p.peek().line)
    const env: Env = new Map()
    for (const [k, v] of Object.entries(vars)) {
      if (typeof v === 'number') env.set(k, { type: Number.isInteger(v) ? 'int' : 'double', val: Number.isInteger(v) ? INT(v) : DBL(v) })
      else if (typeof v === 'boolean') env.set(k, { type: 'boolean', val: BOOL(v) })
      else env.set(k, { type: 'String', val: STR(String(v)) })
    }
    // methods: none in flowchart mode — but tolerate Math.*
    const prog: Program = { methods: [], mainBody: [], className: null }
    const interp = new Interpreter(prog, [], false)
    // route unknown bare calls through the Math library when rooted there
    const val = interp.eval(e, env)
    return { ok: true, value: val }
  } catch (err) {
    if (err instanceof CodeError) return { ok: false, error: err.message }
    return { ok: false, error: String(err) }
  }
}

/** Convenience: evaluate a condition text to a boolean (flowchart decisions). */
export function evalConditionText(expr: string, vars: Record<string, number | string | boolean>):
  { ok: true; value: boolean } | { ok: false; error: string } {
  const r = evalExprText(expr, vars)
  if (!r.ok || r.value === undefined) return { ok: false, error: r.error ?? 'cannot evaluate the condition' }
  if (r.value.t !== 'boolean') return { ok: false, error: `'${expr}' is not a true/false condition (comparison operators: == != < > <= >=)` }
  return { ok: true, value: (r.value as { t: 'boolean'; v: boolean }).v }
}

export { INT, DBL, BOOL, CHR, STR }
