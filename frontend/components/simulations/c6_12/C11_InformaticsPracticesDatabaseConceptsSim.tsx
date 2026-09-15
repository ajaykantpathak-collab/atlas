'use client';

/**
 * C11_InformaticsPracticesDatabaseConceptsSim.tsx
 * Class 11 Informatics Practices — Database Concepts (NCERT Ch. keip107)
 *
 * HONEST NUMERICS — every readout is computed from the live table state:
 *   Cardinality  = students.length          (number of tuples / rows)
 *   Degree       = columns.length           (number of attributes / columns)
 *   Candidate-key test = distinct-non-null count === row count for that
 *   column (counted with a Set over the CURRENT data — a column loses
 *   candidate-key status the instant a duplicate or NULL appears).
 *   Referential integrity: an ENROLLMENT row is accepted only if its
 *   AdmNo exists in STUDENT — checked with .some() over live rows.
 *   Redundancy cost  = rows × cols × approxBytes × fileCopies (bytes).
 *   SELECT σ / PROJECT π: result rows = students.filter(cond).length,
 *   result degree = selected columns count — real query arithmetic.
 *
 * Controls: add/remove rows & columns, click-to-inspect cells, primary-key
 * election, FK insert (valid/invalid), redundancy slider, update/sync
 * buttons, projection checkboxes, selection condition dropdowns, constraint
 * test buttons, Reset.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Database,
  Table2,
  KeyRound,
  Copy as FolderCopyIcon,
  Filter,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Layers,
  Info,
  Volume2,
  VolumeX,
  Compass,
  Beaker,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Flame,
  HelpCircle,
  Sparkles,
  Plus,
  Minus,
  MousePointerClick,
} from 'lucide-react';

import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore } from '../../../lib/masteryStore';

type SRSItem = ReturnType<typeof createReviewItem>;
type BKTState = ReturnType<typeof createBKTState>;

// ==========================================
// CONCEPT NODES TRACKED BY BKT (chapter keip107)
// ==========================================
const ALL_NODE_IDS = [
  'keip107_relation',
  'keip107_keys',
  'keip107_dbms_vs_files',
  'keip107_select_project',
  'keip107_constraints',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// CENTRAL DATASET (one relation shared by all labs)
// ==========================================
type CellValue = string | number | null;
type Row = Record<string, CellValue>;

interface ColumnDef {
  name: string;
  domain: string;          // human-readable domain statement
  kind: 'int' | 'text';    // used by the constraint checker
}

const BASE_COLUMNS: ColumnDef[] = [
  { name: 'AdmNo', domain: 'integer 100-999, school admission number', kind: 'int' },
  { name: 'SName', domain: 'text, student name (2-20 letters)', kind: 'text' },
  { name: 'City', domain: 'text, city of residence', kind: 'text' },
  { name: 'Age', domain: 'integer 5-25 years', kind: 'int' },
  { name: 'Marks', domain: 'integer 0-100 marks', kind: 'int' },
];

const HOUSE_COLUMN: ColumnDef = { name: 'House', domain: 'text {Blue, Green, Red, Yellow}', kind: 'text' };

const BASE_ROWS: Row[] = [
  { AdmNo: 101, SName: 'Aman', City: 'Delhi', Age: 16, Marks: 88 },
  { AdmNo: 102, SName: 'Bhavya', City: 'Jaipur', Age: 17, Marks: 92 },
  { AdmNo: 103, SName: 'Chirag', City: 'Delhi', Age: 16, Marks: 79 },
  { AdmNo: 104, SName: 'Divya', City: 'Surat', Age: 15, Marks: 95 },
  { AdmNo: 105, SName: 'Esha', City: 'Jaipur', Age: 17, Marks: 88 },
];

const EXTRA_ROW_POOL: Row[] = [
  { AdmNo: 106, SName: 'Farhan', City: 'Pune', Age: 16, Marks: 84 },
  { AdmNo: 107, SName: 'Gauri', City: 'Delhi', Age: 15, Marks: 91 },
  { AdmNo: 108, SName: 'Harsh', City: 'Kochi', Age: 17, Marks: 73 },
];

const HOUSE_VALUES = ['Blue', 'Green', 'Red', 'Yellow'];

// ==========================================
// SCENARIO / DISCOVERY / PREDICTIONS
// ==========================================
const SCENARIO = {
  title: 'The School Records Digitisation Bureau',
  intro: 'Your school still keeps student records in separate registers in the office, the library and the exam cell. You are the new data manager: convert this mess into ONE relational database and defend it against duplication, bad keys and constraint violations.',
  context: 'One relation (table) named STUDENT is shared by every lab below. Every tuple you add, every key you elect and every query you run changes the SAME live data — exactly how a DBMS keeps one consistent copy for all users.',
};

const DISCOVERY_QUESTION = {
  question: 'The office register, the library register and the exam-cell register each store the same 5 students. The exam cell changes Esha\u2019s city from Jaipur to Surat but the other two registers are not updated. What has the file system produced?',
  options: [
    'Data independence — the registers are now free to hold different values.',
    'Data redundancy exploited into an inconsistency: the same fact now has two conflicting values.',
    'Data aggregation — the three registers have merged into a data warehouse.',
    'Referential integrity — the registers now reference each other correctly.'
  ],
  correctIndex: 1,
  hintAfter: 'Redundancy (same data copied in many files) is the root cause: after an update, copies disagree — that is an inconsistency. A DBMS keeps ONE copy, so every user sees the same value.'
};

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: SName is almost unique in the table above. If a new student also named Aman joins, what happens to SName as a candidate key?',
    options: [
      'It stays a candidate key because names look unique most of the time.',
      'It stops being a candidate key: a candidate key must be unique and non-null for EVERY tuple.',
      'It becomes a foreign key automatically.',
      'It becomes the primary key with higher priority than AdmNo.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 2: click SName to inspect it, then in Lab 5 insert the duplicate Aman and re-check the distinct-count verdict.',
    nodeId: 'keip107_keys' as NodeId
  },
  {
    question: 'Predict: you PROJECT only the City column from 5 student tuples. How many rows does the result contain if 2 students share the same city?',
    options: [
      '5 — projection never changes the number of tuples.',
      '3 — in pure relational algebra a projection returns a SET, so duplicate rows vanish.',
      '2 — duplicates collapse into one row per city pair.',
      '0 — projection removes all rows without keys.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 4: project only City over the default table (Delhi, Jaipur, Delhi, Surat, Jaipur) and read the \u201crows returned\u201d counter.',
    nodeId: 'keip107_select_project' as NodeId
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: in Lab 2, which columns of the default STUDENT table pass the candidate-key test?',
    observableOptions: [
      'AdmNo only — every other column repeats a value somewhere.',
      'AdmNo and SName — both are unique.',
      'City and Age — both repeat, which is what keys need.',
      'All columns, because keys are optional in a relation.'
    ],
    correctIndex: 0,
    nodeId: 'keip107_keys' as NodeId
  }
];

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Database and DBMS are the same thing.',
    correction: 'A database is the organised COLLECTION of related data; the DBMS (Database Management System) is the SOFTWARE that stores, queries and protects it. MySQL/Oracle are DBMS software; the student tables they hold are the database.',
    nodeId: 'keip107_dbms_vs_files' as NodeId
  },
  {
    id: 'misc_02',
    misconception: 'A table can have only ONE candidate key.',
    correction: 'A relation may have SEVERAL candidate keys (all columns that are unique + non-null for every tuple). One of them is CHOSEN as the primary key; the remaining candidates are called alternate keys. AdmNo and AadhaarNo could both be candidates — only one becomes primary.',
    nodeId: 'keip107_keys' as NodeId
  },
  {
    id: 'misc_03',
    misconception: 'Cardinality means the number of columns and degree means the number of rows.',
    correction: 'It is the reverse: CARDINALITY = number of TUPLES (rows); DEGREE = number of ATTRIBUTES (columns). Adding one student raises cardinality; adding one attribute (e.g. House) raises degree.',
    nodeId: 'keip107_relation' as NodeId
  },
  {
    id: 'misc_04',
    misconception: 'A foreign key must also be unique in its own table.',
    correction: 'A foreign key just has to match some existing primary-key value in the REFERENCED table. Many enrolment rows may point at the same AdmNo — repetition is normal and useful; only the referenced primary key must stay unique.',
    nodeId: 'keip107_keys' as NodeId
  },
  {
    id: 'misc_05',
    misconception: 'Storing data in many files is safer because a crash in one file still leaves copies.',
    correction: 'Multiple copies cause update anomalies: changing one copy leaves the others stale, so reports disagree. A DBMS stores one logical copy and provides recovery, so consistency and safety come from transaction management, not duplication.',
    nodeId: 'keip107_dbms_vs_files' as NodeId
  },
  {
    id: 'misc_06',
    misconception: 'Domains are optional decoration — any column can hold any value.',
    correction: 'The domain of an attribute is the pool of legal values (Age: integer 5-25). Domain constraints are enforced on every insert: the value 200 for Age is syntactically an integer but lies OUTSIDE the domain, so the DBMS rejects it.',
    nodeId: 'keip107_constraints' as NodeId
  }
];

// ==========================================
// CHALLENGES (8 across 3 tiers)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION ---
  {
    id: 'ch_db_01',
    nodeId: 'keip107_relation',
    type: 'mcq',
    difficulty: 'foundation',
    question: 'A relation STUDENT has 5 tuples and 5 attributes. One student leaves and a House column is added. What are the new cardinality and degree?',
    options: [
      'Cardinality 4, Degree 6',
      'Cardinality 5, Degree 5',
      'Cardinality 6, Degree 4',
      'Cardinality 4, Degree 4'
    ],
    correctIndex: 0,
    explanation: 'Removing one tuple: 5 \u2212 1 = 4 cardinality. Adding one attribute: 5 + 1 = 6 degree. Rows and columns are independent.',
    hints: ['Cardinality counts tuples (rows).', 'Degree counts attributes (columns).', 'One row removed, one column added.'],
    misconceptionIndex: 2
  },
  {
    id: 'ch_db_02',
    nodeId: 'keip107_keys',
    type: 'mcq',
    difficulty: 'foundation',
    question: 'Which property set makes a column a valid candidate key?',
    options: [
      'Unique and may contain NULLs',
      'Unique and non-null for every tuple in the relation',
      'Repeated often, so groups are easy to form',
      'Text type only — numbers cannot be keys'
    ],
    correctIndex: 1,
    explanation: 'A candidate key must uniquely identify EVERY tuple and never be NULL. Uniqueness alone with a NULL breaks identification.',
    hints: ['Think of the admission number.', 'What happens to a row whose key is NULL?', 'Two properties: uniqueness + not-null.']
  },
  {
    id: 'ch_db_03',
    nodeId: 'keip107_select_project',
    type: 'numeric',
    difficulty: 'foundation',
    question: 'The default table has 5 students: cities Delhi, Jaipur, Delhi, Surat, Jaipur. Run SELECT \u03c3 City = "Delhi" (selection). How many tuples are returned?',
    correctAnswer: 2,
    tolerance: 0,
    unit: 'tuples',
    explanation: 'Selection keeps tuples that satisfy the condition. Only Aman (Delhi) and Chirag (Delhi) match \u2192 2 tuples.',
    hints: ['Selection filters ROWS, it does not remove duplicates.', 'Count the Delhi rows in the default table.', 'Aman and Chirag both live in Delhi.']
  },
  // --- STANDARD ---
  {
    id: 'ch_db_04',
    nodeId: 'keip107_dbms_vs_files',
    type: 'numeric',
    difficulty: 'standard',
    question: 'A 5-row \u00d7 5-column table is copied into 3 department files, each tuple consuming 40 bytes. Estimate total storage in bytes.',
    correctAnswer: 600,
    tolerance: 0,
    unit: 'bytes',
    explanation: 'One copy = 5 tuples \u00d7 40 bytes per tuple = 200 bytes. Three copies = 200 \u00d7 3 = 600 bytes. Redundancy multiplies BOTH storage and update-anomaly risk by the number of copies.',
    hints: ['Storage = rows \u00d7 cols \u00d7 bytes-per-cell \u00d7 copies.', 'Use 8 bytes per cell (the lab\u2019s estimate).', '5 \u00d7 5 \u00d7 8 = 200 bytes per copy; 3 copies.']
  },
  {
    id: 'ch_db_05',
    nodeId: 'keip107_keys',
    type: 'mcq',
    difficulty: 'standard',
    question: 'ENROLLMENT(EnrollNo, AdmNo, Course) references STUDENT(AdmNo). Which insert will the DBMS REJECT?',
    options: [
      'EnrollNo 7, AdmNo 105, Course "IP" — because 105 already exists in STUDENT',
      'EnrollNo 8, AdmNo 999, Course "CS" — because 999 is not any STUDENT\u2019s AdmNo',
      'EnrollNo 9 and EnrollNo 10 both with AdmNo 101 — because AdmNo repeats in ENROLLMENT',
      'EnrollNo 11, AdmNo NULL, Course "PE" — foreign keys may be NULL anywhere'
    ],
    correctIndex: 1,
    explanation: 'Referential integrity: the FK value must appear in the referenced primary key. 999 does not, so the insert violates the constraint. Repeating a FK (option C) and even a NULL FK (allowed in SQL when the column is not declared NOT NULL) are legal.',
    hints: ['Ask: does the referenced table contain this value?', 'Uniqueness is demanded of the PRIMARY key, not the foreign key.', '999 exists in no student row.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_db_06',
    nodeId: 'keip107_relation',
    type: 'numeric',
    difficulty: 'standard',
    question: 'PROJECT \u03c0 City over the 5 default tuples (Delhi, Jaipur, Delhi, Surat, Jaipur) in pure relational algebra where the result is a set. How many tuples remain?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'tuples',
    explanation: 'Projection returns a SET of tuples: {Delhi, Jaipur, Surat} = 3 distinct cities. (In SQL a plain SELECT keeps duplicates until DISTINCT is written \u2014 the algebra answer is 3.)',
    hints: ['Projection removes columns, then duplicates collapse.', 'Count DISTINCT city names.', 'Delhi, Jaipur, Surat.']
  },
  // --- ADVANCED ---
  {
    id: 'ch_db_07',
    nodeId: 'keip107_constraints',
    type: 'mcq',
    difficulty: 'advanced',
    question: 'You try to insert (AdmNo 103, SName "Isha", City "Pune", Age 200, Marks 55) into STUDENT where Age has domain integer 5-25. What happens?',
    options: [
      'Accepted: 200 is a valid integer, so the domain is satisfied.',
      'Rejected by the domain constraint: the value\u2019s type fits but its RANGE lies outside 5-25.',
      'Accepted but silently truncated to 25 by the DBMS.',
      'Rejected only because 103 is a duplicate primary key.'
    ],
    correctIndex: 1,
    explanation: 'Domain constraint checks type AND range. Age = 200 is an integer but outside 5-25, so the insert is refused. (AdmNo 103 duplicating Chirag would ALSO be refused by the primary-key constraint \u2014 the DBMS reports the first violated check.)',
    hints: ['Domain = legal value pool, not just the data type.', 'Is 200 within 5-25?', 'DBMSs never silently fix your data.'],
    misconceptionIndex: 5
  },
  {
    id: 'ch_db_08',
    nodeId: 'keip107_dbms_vs_files',
    type: 'numeric',
    difficulty: 'advanced',
    question: '3 departments each keep a file copy of the same table. The exam cell updates one fact, 2 copies are NOT updated. How many inconsistent copies exist now (including the updated one being "in conflict")?',
    correctAnswer: 2,
    tolerance: 0,
    unit: 'copies',
    explanation: 'Copies = 3. Updated copy = 1 correct; stale copies = 2. Each stale copy now conflicts with the updated fact \u2192 2 inconsistent copies. One DBMS copy makes this number structurally impossible.',
    hints: ['Count the copies that were NOT updated.', 'Total copies minus the updated one.', '3 \u2212 1 = 2.']
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Field Task: Audit the School Office',
  description: 'Apply today\u2019s database concepts to your own school\u2019s paper registers.',
  steps: [
    'Step 1: List three registers that store the same student facts \u2014 that is redundancy; count the copies.',
    'Step 2: For each register column, write its domain (e.g. Class: {6..12}, Phone: 10 digits).',
    'Step 3: Circle the column that is unique + non-null \u2014 the only candidate key \u2014 and elect it primary.',
    'Step 4: Find one fact that differs between two registers. That stale copy is the update anomaly you will kill with one DBMS table.'
  ]
};

// ==========================================
// SMALL DERIVED HELPERS (pure, deterministic)
// ==========================================
function distinctCount(rows: Row[], col: string): number {
  const s = new Set<string>();
  rows.forEach(r => {
    const v = r[col];
    if (v !== null && v !== undefined) s.add(String(v));
  });
  return s.size;
}

function nullCount(rows: Row[], col: string): number {
  return rows.filter(r => r[col] === null || r[col] === undefined).length;
}

function isCandidateKey(rows: Row[], col: string): boolean {
  return distinctCount(rows, col) === rows.length && nullCount(rows, col) === 0 && rows.length > 0;
}

// ==========================================
// LAB DIAGRAM SUB-COMPONENTS
// ==========================================
const RelationTable: React.FC<{
  columns: ColumnDef[];
  rows: Row[];
  selected: { row: number; col: string } | null;
  primaryKey: string | null;
  onSelect: (rowIdx: number, colName: string) => void;
  highlightCol?: string | null;
}> = ({ columns, rows, selected, primaryKey, onSelect, highlightCol }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-800">
    <table className="w-full text-xs">
      <thead>
        <tr className="bg-slate-800/80">
          <th className="px-2 py-2 text-left text-slate-500 font-mono"># tuple</th>
          {columns.map(c => (
            <th
              key={c.name}
              className={`px-3 py-2 text-left font-bold whitespace-nowrap ${
                primaryKey === c.name ? 'text-emerald-400' : highlightCol === c.name ? 'text-sky-300' : 'text-slate-200'
              }`}
            >
              {primaryKey === c.name && <KeyRound className="inline w-3 h-3 mr-1 -mt-0.5" />}
              {c.name}
              <span className="ml-1 text-[9px] font-normal text-slate-500">({c.kind})</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/60'}>
            <td className="px-2 py-1.5 text-slate-600 font-mono text-[10px]">t{i}</td>
            {columns.map(c => {
              const isSel = selected?.row === i && selected?.col === c.name;
              return (
                <td
                  key={c.name}
                  onClick={() => onSelect(i, c.name)}
                  className={`px-3 py-1.5 cursor-pointer transition-colors duration-150 whitespace-nowrap ${
                    isSel ? 'bg-indigo-600/40 text-white font-bold ring-1 ring-indigo-400' : 'text-slate-300 hover:bg-slate-800/70'
                  }`}
                >
                  {r[c.name] === null ? <span className="text-rose-400 italic">NULL</span> : String(r[c.name])}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Readout: React.FC<{ label: string; value: string; tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' }> = ({ label, value, tone = 'indigo' }) => {
  const tones: Record<string, string> = {
    indigo: 'text-indigo-300',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    sky: 'text-sky-300',
  };
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 px-3 py-2">
      <p className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</p>
      <p className={`text-sm font-bold ${tones[tone]}`}>{value}</p>
    </div>
  );
};

const Verdict: React.FC<{ ok: boolean; text: string }> = ({ ok, text }) => (
  <div className={`flex items-start gap-2 rounded-lg border p-3 text-xs ${ok ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200' : 'border-rose-500/40 bg-rose-950/40 text-rose-200'}`}>
    {ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
    <span>{text}</span>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_InformaticsPracticesDatabaseConceptsSim({
  initialNodeId = 'keip107_relation',
  onComplete,
  devMode = false
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'>('discovery');
  const [activeExplorationIndex, setActiveExplorationIndex] = useState<number>(0);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // BKT & SRS
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });
  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach(c => {
      initial[c.id] = createReviewItem(c.id, 'Database Concepts');
    });
    return initial;
  });

  // Discovery / predictions
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // ── CENTRAL RELATION STATE (shared by Labs 1, 2, 4, 5) ──
  const [columns, setColumns] = useState<ColumnDef[]>(BASE_COLUMNS);
  const [students, setStudents] = useState<Row[]>(BASE_ROWS.map(r => ({ ...r })));
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);
  const [primaryKey, setPrimaryKey] = useState<string | null>('AdmNo');

  // Lab 2: FK state
  const [enrollments, setEnrollments] = useState<Row[]>([
    { EnrollNo: 1, AdmNo: 101, Course: 'IP' },
    { EnrollNo: 2, AdmNo: 103, Course: 'CS' },
  ]);
  const [fkMessage, setFkMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [nextEnrollNo, setNextEnrollNo] = useState(3);

  // Lab 3: file-system vs DBMS
  const [deptCopies, setDeptCopies] = useState<number>(3);
  const [fileStale, setFileStale] = useState<boolean>(false);
  const [updateCount, setUpdateCount] = useState<number>(0);
  const [inconsistencies, setInconsistencies] = useState<number>(0);
  const [dbmsTarget, setDbmsTarget] = useState<CellValue>('Jaipur');
  const [fileTargets, setFileTargets] = useState<CellValue[]>(['Jaipur', 'Jaipur', 'Jaipur', 'Jaipur', 'Jaipur', 'Jaipur']);

  // Lab 4: query state
  const [projectedCols, setProjectedCols] = useState<string[]>(['AdmNo', 'SName']);
  const [condColumn, setCondColumn] = useState<string>('City');
  const [condOperator, setCondOperator] = useState<string>('=');
  const [condValue, setCondValue] = useState<string>('Delhi');
  const [filterEnabled, setFilterEnabled] = useState<boolean>(true);
  const [distinctOnly, setDistinctOnly] = useState<boolean>(false);

  // Lab 5: constraint tester
  const [testRow, setTestRow] = useState<Row>({ AdmNo: 103, SName: 'Isha', City: 'Pune', Age: 200, Marks: 55 });
  const [constraintLog, setConstraintLog] = useState<Array<{ ok: boolean; text: string }>>([]);

  // Challenge engine
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ submitted: boolean; isCorrect: boolean; explanation: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // FX
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playFx = useCallback((sound: SoundEffect) => {
    if (soundEnabled) audioManager.play(sound);
  }, [soundEnabled]);

  const speakText = useCallback((text: string) => {
    if (speechEnabled) speechManager.speak(text);
  }, [speechEnabled]);

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  useEffect(() => {
    setSelectedOption(null);
    setNumericInput('');
    setChallengeFeedback(null);
    setShowHint(false);
    setCurrentHintIndex(0);
  }, [currentChallengeIndex, currentChallenge]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (activeTab === 'challenges' && !challengeFeedback?.submitted) {
      timerRef.current = setTimeout(() => {
        setShowHint(true);
        playFx('hint');
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIndex, challengeFeedback, playFx]);

  // ── DERIVED READOUTS (honest, computed from live state) ──
  const cardinality = students.length;
  const degree = columns.length;

  const candidateKeys = useMemo(() => columns.filter(c => isCandidateKey(students, c.name)).map(c => c.name), [columns, students]);

  const storageBytes = cardinality * degree * 8;                    // 8 bytes per cell estimate
  const fileStorageBytes = storageBytes * deptCopies;
  const dbmsStorageBytes = storageBytes;
  const liveStaleCopies = fileStale
    ? fileTargets.slice(0, deptCopies).filter(v => v !== dbmsTarget).length
    : 0;

  const queryResult = useMemo(() => {
    let rows = students;
    if (filterEnabled) {
      rows = rows.filter(r => {
        const v = r[condColumn];
        const sv = v === null ? 'null' : String(v);
        const target = condValue;
        const asNum = parseFloat(sv);
        const targetNum = parseFloat(target);
        switch (condOperator) {
          case '=': return sv === target;
          case '\u2260': return sv !== target;
          case '>': return !isNaN(asNum) && !isNaN(targetNum) && asNum > targetNum;
          case '<': return !isNaN(asNum) && !isNaN(targetNum) && asNum < targetNum;
          default: return true;
        }
      });
    }
    if (distinctOnly) {
      const seen = new Set<string>();
      rows = rows.filter(r => {
        const key = projectedCols.map(c => String(r[c])).join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    return rows;
  }, [students, filterEnabled, condColumn, condOperator, condValue, distinctOnly, projectedCols]);

  // ── RESET (full determinism) ──
  const resetAll = () => {
    setColumns(BASE_COLUMNS.map(c => ({ ...c })));
    setStudents(BASE_ROWS.map(r => ({ ...r })));
    setSelectedCell(null);
    setPrimaryKey('AdmNo');
    setEnrollments([{ EnrollNo: 1, AdmNo: 101, Course: 'IP' }, { EnrollNo: 2, AdmNo: 103, Course: 'CS' }]);
    setFkMessage(null);
    setNextEnrollNo(3);
    setDeptCopies(3);
    setFileStale(false);
    setUpdateCount(0);
    setInconsistencies(0);
    setDbmsTarget('Jaipur');
    setFileTargets(['Jaipur', 'Jaipur', 'Jaipur', 'Jaipur', 'Jaipur', 'Jaipur']);
    setProjectedCols(['AdmNo', 'SName']);
    setCondColumn('City');
    setCondOperator('=');
    setCondValue('Delhi');
    setFilterEnabled(true);
    setDistinctOnly(false);
    setTestRow({ AdmNo: 103, SName: 'Isha', City: 'Pune', Age: 200, Marks: 55 });
    setConstraintLog([]);
    setDiscoverySelected(null);
    setDiscoverySubmitted(false);
    setPredictionAnswers({});
    setObservationAnswers({});
    setCurrentChallengeIndex(0);
    setActiveExplorationIndex(0);
    playFx('whoosh');
    speakText('Simulation reset. One clean relation restored.');
  };

  // ── LAB 1 handlers ──
  const addRow = () => {
    if (students.length >= 8) return;
    const next = EXTRA_ROW_POOL[students.length - BASE_ROWS.length];
    if (!next) return;
    setStudents(prev => {
      const row = { ...next };
      if (columns.some(c => c.name === 'House')) {
        row.House = HOUSE_VALUES[prev.length % HOUSE_VALUES.length];
      }
      return [...prev, row];
    });
    playFx('pop');
    speakText(`Tuple added. Cardinality is now ${students.length + 1}.`);
  };

  const removeRow = () => {
    if (students.length <= 2) return;
    setStudents(prev => prev.slice(0, -1));
    playFx('tap');
    speakText(`Tuple removed. Cardinality is now ${students.length - 1}.`);
  };

  const addHouseColumn = () => {
    if (columns.some(c => c.name === 'House')) return;
    setStudents(prev => prev.map((r, i) => ({ ...r, House: HOUSE_VALUES[i % HOUSE_VALUES.length] })));
    setColumns(prev => [...prev, { ...HOUSE_COLUMN }]);
    playFx('chime');
    speakText(`Attribute House added. Degree is now ${degree + 1}. Watch the key verdicts change!`);
  };

  const removeExtraColumn = () => {
    if (!columns.some(c => c.name === 'House')) return;
    setColumns(prev => prev.filter(c => c.name !== 'House'));
    if (primaryKey === 'House') setPrimaryKey('AdmNo');
    playFx('tap');
    speakText(`Attribute House removed. Degree is back to ${degree - 1}.`);
  };

  // ── LAB 2 handlers ──
  const electPrimaryKey = (col: string) => {
    if (isCandidateKey(students, col)) {
      setPrimaryKey(col);
      playFx('success');
      speakText(`${col} elected as primary key. It is unique and non-null for all ${students.length} tuples.`);
    } else {
      playFx('error');
      speakText(`${col} cannot be the primary key. It repeats a value or contains NULL.`);
    }
  };

  const insertEnrollment = (admNo: number | null, course: string) => {
    if (admNo === null) {
      setEnrollments(prev => [...prev, { EnrollNo: nextEnrollNo, AdmNo: null, Course: course }]);
      setFkMessage({ ok: true, text: `EnrollNo ${nextEnrollNo}, AdmNo NULL, ${course}: accepted \u2014 a NULL foreign key is allowed unless the column is declared NOT NULL (it simply records \u201cno link yet\u201d).` });
      playFx('pop');
      setNextEnrollNo(n => n + 1);
      return;
    }
    const exists = students.some(s => Number(s.AdmNo) === admNo);
    if (exists) {
      setEnrollments(prev => [...prev, { EnrollNo: nextEnrollNo, AdmNo: admNo, Course: course }]);
      setFkMessage({ ok: true, text: `EnrollNo ${nextEnrollNo}, AdmNo ${admNo}, ${course}: accepted \u2014 ${admNo} exists in STUDENT(AdmNo), so referential integrity holds.` });
      playFx('success');
    } else {
      setFkMessage({ ok: false, text: `EnrollNo ${nextEnrollNo}, AdmNo ${admNo}, ${course}: REJECTED \u2014 no tuple in STUDENT has AdmNo = ${admNo}. Referential integrity violated (orphan record).` });
      playFx('error');
      speakText('Rejected. That admission number references no student.');
    }
    setNextEnrollNo(n => n + 1);
  };

  // ── LAB 3 handlers ──
  const performUpdate = () => {
    const newVal: CellValue = dbmsTarget === 'Jaipur' ? 'Surat' : 'Jaipur';
    setDbmsTarget(newVal);
    const next = fileTargets.map((v, i) => (i === 0 ? newVal : v));
    setFileTargets(next);
    setFileStale(true);
    setUpdateCount(c => c + 1);
    const stale = next.filter((v, i) => i < deptCopies && v !== newVal).length;
    setInconsistencies(stale);
    playFx(stale > 0 ? 'error' : 'success');
    speakText(`Exam cell changed the city to ${String(newVal)}. DBMS shows one value everywhere; ${stale} file copies are now stale.`);
  };

  const syncFiles = () => {
    setFileTargets(Array.from({ length: 6 }, () => dbmsTarget));
    setFileStale(false);
    setInconsistencies(0);
    playFx('success');
    speakText('All file copies re-synced. That manual sync is exactly what a DBMS does automatically.');
  };

  // ── LAB 5 handler ──
  const attemptInsert = () => {
    const logs: Array<{ ok: boolean; text: string }> = [];
    const adm = testRow.AdmNo;
    const age = Number(testRow.Age);
    const marks = Number(testRow.Marks);

    if (adm === null || adm === undefined) {
      logs.push({ ok: false, text: 'PRIMARY KEY / NOT NULL violated: AdmNo is NULL \u2014 every tuple needs a non-null identity.' });
    } else if (isNaN(Number(adm)) || Number(adm) < 100 || Number(adm) > 999) {
      logs.push({ ok: false, text: `DOMAIN violated: AdmNo ${String(adm)} is outside its domain (integer 100-999) \u2014 a key must first be a legal value.` });
    } else if (students.some(s => Number(s.AdmNo) === Number(adm))) {
      logs.push({ ok: false, text: `PRIMARY KEY violated: AdmNo ${adm} already belongs to tuple t${students.findIndex(s => Number(s.AdmNo) === Number(adm))}. Duplicate identity refused.` });
    }
    if (typeof age !== 'number' || isNaN(age) || age < 5 || age > 25) {
      logs.push({ ok: false, text: `DOMAIN violated: Age ${String(testRow.Age)} lies outside the declared domain integer 5-25.` });
    }
    if (isNaN(marks) || marks < 0 || marks > 100) {
      logs.push({ ok: false, text: `DOMAIN violated: Marks ${String(testRow.Marks)} outside integer 0-100.` });
    }
    const name = String(testRow.SName ?? '');
    if (name.trim().length < 2) {
      logs.push({ ok: false, text: 'DOMAIN violated: SName must be 2-20 letters of text.' });
    }

    if (logs.length === 0) {
      logs.push({ ok: true, text: `INSERT accepted: tuple (AdmNo ${adm}, ${name}) passed every constraint. Cardinality becomes ${cardinality + 1}.` });
      setStudents(prev => [...prev, { ...testRow }]);
      playFx('success');
      speakText('Insert accepted. All constraints satisfied.');
    } else {
      playFx('error');
      speakText('Insert rejected. Read the violated constraints.');
    }
    setConstraintLog(logs);
  };

  // ── Challenge handlers ──
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    if (isCorrect) {
      playFx('success');
      speakText('Correct! Redundant copies drift apart after an update.');
    } else {
      playFx('error');
      speakText('Not quite. Think about copies that were never updated.');
    }
  };

  const setPrediction = (pIdx: number, oIdx: number, correct: number) => {
    setPredictionAnswers(prev => ({ ...prev, [pIdx]: oIdx }));
    if (oIdx === correct) { playFx('success'); } else { playFx('error'); }
  };

  const handleSubmitChallenge = () => {
    if (!currentChallenge) return;
    let isCorrect = false;
    if (currentChallenge.type === 'mcq') {
      if (selectedOption === null) return;
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else {
      const val = parseFloat(numericInput);
      if (isNaN(val)) return;
      const target = currentChallenge.correctAnswer ?? 0;
      const tol = currentChallenge.tolerance ?? 0;
      isCorrect = Math.abs(val - target) <= tol;
    }

    const nodeId = currentChallenge.nodeId;
    const oldBkt = bktStates[nodeId] || createBKTState();
    setBktStates(prev => ({ ...prev, [nodeId]: bktUpdate(oldBkt, isCorrect) }));

    const oldSrs = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id, 'Database Concepts');
    setSrsItems(prev => ({ ...prev, [currentChallenge.id]: sm2Update(oldSrs, isCorrect ? 5 : 1, 0) }));

    if (isCorrect) {
      playFx('sparkle');
      setScore(prev => prev + 10);
      setStreak(prev => {
        const s = prev + 1;
        if (s >= 3) {
          setShowConfetti(true);
          playFx('celebration');
          setTimeout(() => setShowConfetti(false), 2500);
        }
        return s;
      });
      speakText('Correct. Constraint satisfied!');
    } else {
      playFx('error');
      setStreak(0);
      speakText('Incorrect. Read the explanation below.');
    }

    setChallengeFeedback({ submitted: true, isCorrect, explanation: currentChallenge.explanation });
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      playFx('whoosh');
    } else {
      recordGameScore([...ALL_NODE_IDS], score + 20);
      setShowSuccessBanner(true);
      playFx('celebration');
      speakText('You have mastered Database Concepts!');
      setTimeout(() => setShowSuccessBanner(false), 2200);
      if (onComplete) onComplete(score + 20);
    }
  };

  const averageMastery = useMemo(() => {
    const vals = ALL_NODE_IDS.map(id => bktStates[id]?.pKnown ?? 0);
    const sum = vals.reduce((a, b) => a + b, 0);
    return Math.round((sum / vals.length) * 100);
  }, [bktStates]);

  const selectedCellInfo = selectedCell ? {
    tuple: `t${selectedCell.row}`,
    attribute: selectedCell.col,
    value: String(students[selectedCell.row]?.[selectedCell.col] ?? 'NULL'),
    domain: columns.find(c => c.name === selectedCell.col)?.domain ?? '—',
  } : null;

  const EXPLORATION_STEPS = [
    { title: 'Lab 1: Relation Anatomy', instruction: 'Add or remove TUPLES and ATTRIBUTES and watch cardinality / degree react. Click any cell to read its (tuple, attribute, domain) coordinates.', nodeId: 'keip107_relation' as NodeId },
    { title: 'Lab 2: Keys & Referential Integrity', instruction: 'Inspect each column\u2019s distinct-count verdict, elect a primary key, then try to enrol students \u2014 including one with an unknown AdmNo.', nodeId: 'keip107_keys' as NodeId },
    { title: 'Lab 3: File System vs DBMS', instruction: 'Copy the table into N department files, perform the same update a DBMS would do, and count the stale copies that a file system leaves behind.', nodeId: 'keip107_dbms_vs_files' as NodeId },
    { title: 'Lab 4: SELECT \u03c3 & PROJECT \u03c0', instruction: 'Build a real query: tick columns to PROJECT, choose an attribute / operator / value to SELECT, and toggle DISTINCT to see set semantics.', nodeId: 'keip107_select_project' as NodeId },
    { title: 'Lab 5: Constraint Guard', instruction: 'Attempt the poisoned insert (duplicate AdmNo 103, Age 200). Read each violated constraint, fix the values until the row is accepted.', nodeId: 'keip107_constraints' as NodeId },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 select-none">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-sky-500 to-indigo-700 rounded-xl shadow-lg">
            <Database className="w-8 h-8 text-slate-950" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-sky-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Class 11 IP: Database Concepts
            </h1>
            <p className="text-xs text-slate-400">Relations • Keys • DBMS vs Files • SELECT/PROJECT • Constraints</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-3">
            <div className="flex items-center gap-1 text-sky-400 font-bold text-sm">
              <Award className="w-4 h-4" /> Score: {score}
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" /> Mastery: {averageMastery}%
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
              <Flame className="w-4 h-4" /> Streak: {streak}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors" title="Toggle Sound FX">
              {soundEnabled ? <Volume2 className="w-5 h-5 text-sky-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
            <button onClick={() => setSpeechEnabled(!speechEnabled)} className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors" title="Toggle Voice Readout">
              <BookOpen className={`w-5 h-5 ${speechEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
            </button>
            <button onClick={resetAll} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white rounded-xl text-xs font-bold shadow-lg transition-all">
              <RotateCcw className="w-4 h-4" /> RESET ALL
            </button>
          </div>
        </div>
      </header>

      {/* NAV TABS */}
      <nav className="max-w-7xl mx-auto mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'discovery', label: '1. Discovery Portal', icon: Compass },
          { id: 'lab', label: '2. Interactive Lab', icon: Beaker },
          { id: 'challenges', label: `3. Challenge Suite (${CHALLENGES.length})`, icon: Award },
          { id: 'misconceptions', label: '4. Misconceptions', icon: AlertTriangle },
          { id: 'summary', label: '5. Summary & Real-World', icon: Layers }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as 'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'); playFx('tap'); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 shadow-lg shadow-sky-500/20 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-sky-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <main className="max-w-7xl mx-auto">
        {/* ══════ TAB 1: DISCOVERY ══════ */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-2xl font-bold text-sky-400 mb-3 flex items-center gap-2">
                <Compass className="w-6 h-6" /> Scenario Context
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">{SCENARIO.context}</p>
            </div>

            <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-amber-400 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-100">Discovery Hypothesis Challenge</h3>
              </div>
              <p className="text-slate-200 text-lg font-medium mb-6">{DISCOVERY_QUESTION.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = discoverySelected === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let btnStyle = 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700';
                  if (discoverySubmitted) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                  return (
                    <button key={idx} onClick={() => handleDiscoverySubmit(idx)} disabled={discoverySubmitted}
                      className={`p-4 rounded-xl border text-left transition-all text-sm leading-relaxed flex items-start gap-3 ${btnStyle}`}>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-sky-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
              {discoverySubmitted && (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 text-amber-200 text-sm flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-1">Database Insight:</p>
                    <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-400" /> Interactive Predictions
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 mb-3">{pred.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pred.options.map((opt, oIdx) => {
                        const chosen = predictionAnswers[pIdx] === oIdx;
                        let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                        if (predictionAnswers[pIdx] !== undefined) {
                          if (oIdx === pred.correctIndex) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                          else if (chosen) style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                        }
                        return (
                          <button key={oIdx} onClick={() => setPrediction(pIdx, oIdx, pred.correctIndex)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all ${style}`}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {predictionAnswers[pIdx] !== undefined && (
                      <p className="mt-3 text-xs text-amber-300 flex items-center gap-2">
                        <Info className="w-4 h-4" /> {pred.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB 2: LAB ══════ */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex gap-2 overflow-x-auto scrollbar-none">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button key={idx} onClick={() => { setActiveExplorationIndex(idx); playFx('tap'); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeExplorationIndex === idx
                      ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}>
                  {step.title}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 border border-sky-500/20 rounded-2xl p-5 shadow-xl flex items-center gap-4">
              <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/30">
                <Beaker className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h3 className="font-bold text-sky-400 text-sm">{EXPLORATION_STEPS[activeExplorationIndex].title}</h3>
                <p className="text-slate-300 text-sm">{EXPLORATION_STEPS[activeExplorationIndex].instruction}</p>
              </div>
            </div>

            {/* LIVE RELATION STATUS STRIP (all labs) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Readout label="Relation" value="STUDENT" tone="sky" />
              <Readout label="Cardinality (tuples)" value={`${cardinality} rows`} tone="indigo" />
              <Readout label="Degree (attributes)" value={`${degree} columns`} tone="indigo" />
              <Readout label="Candidate key(s)" value={candidateKeys.length ? candidateKeys.join(', ') : 'NONE — add data!'} tone={candidateKeys.length ? 'emerald' : 'rose'} />
            </div>

            {/* ── LAB 1 ── */}
            {activeExplorationIndex === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <RelationTable columns={columns} rows={students} selected={selectedCell} primaryKey={primaryKey}
                    onSelect={(rowIdx, colName) => { setSelectedCell({ row: rowIdx, col: colName }); playFx('tap'); }} />
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-sky-400" /> Click any cell — each crossing of one tuple with one attribute holds exactly ONE atomic value.
                  </p>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sky-400 text-sm flex items-center gap-2"><Table2 className="w-4 h-4" /> Tuple / Attribute Controls</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={addRow} disabled={students.length >= 8} className="flex items-center justify-center gap-1 py-2.5 bg-emerald-600/80 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all">
                      <Plus className="w-4 h-4" /> Tuple (row)
                    </button>
                    <button onClick={removeRow} disabled={students.length <= 2} className="flex items-center justify-center gap-1 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all">
                      <Minus className="w-4 h-4" /> Tuple
                    </button>
                    <button onClick={addHouseColumn} disabled={columns.some(c => c.name === 'House')} className="flex items-center justify-center gap-1 py-2.5 bg-indigo-600/80 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all">
                      <Plus className="w-4 h-4" /> Attribute: House
                    </button>
                    <button onClick={removeExtraColumn} disabled={!columns.some(c => c.name === 'House')} className="flex items-center justify-center gap-1 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all">
                      <Minus className="w-4 h-4" /> Attribute
                    </button>
                  </div>
                  {selectedCellInfo && (
                    <div className="bg-slate-900 p-4 rounded-lg border border-indigo-500/40 space-y-1.5 text-xs">
                      <p className="text-slate-500 uppercase text-[10px]">Selected cell coordinates</p>
                      <p className="text-slate-300">Tuple: <span className="font-bold text-indigo-300">{selectedCellInfo.tuple}</span> (row {selectedCell.row + 1} of {cardinality})</p>
                      <p className="text-slate-300">Attribute: <span className="font-bold text-indigo-300">{selectedCellInfo.attribute}</span> (of {degree})</p>
                      <p className="text-slate-300">Value: <span className="font-bold text-white">{selectedCellInfo.value}</span></p>
                      <p className="text-slate-400">Domain: <span className="text-amber-300">{selectedCellInfo.domain}</span></p>
                    </div>
                  )}
                  <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    Relation = table &nbsp;•&nbsp; Tuple = row &nbsp;•&nbsp; Attribute = column &nbsp;•&nbsp; Domain = pool of legal values.
                    Adding the House attribute (repeated values!) instantly drops it out of the candidate-key list above.
                  </div>
                </div>
              </div>
            )}

            {/* ── LAB 2 ── */}
            {activeExplorationIndex === 1 && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <h4 className="font-bold text-sky-400 text-sm flex items-center gap-2"><KeyRound className="w-4 h-4" /> Key Detective — click a column to test / elect it</h4>
                    <div className="space-y-2">
                      {columns.map(c => {
                        const distinct = distinctCount(students, c.name);
                        const nulls = nullCount(students, c.name);
                        const candidate = isCandidateKey(students, c.name);
                        return (
                          <button key={c.name} onClick={() => electPrimaryKey(c.name)}
                            className={`w-full flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl border text-xs transition-all text-left ${
                              primaryKey === c.name
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                                : candidate ? 'bg-slate-950 border-slate-700 hover:border-sky-500 text-slate-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                            }`}>
                            <span className="font-bold">{c.name}</span>
                            <span className="text-slate-500">distinct {distinct}/{students.length} • NULLs {nulls}</span>
                            <span className={`font-bold ${candidate ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {candidate ? 'CANDIDATE KEY' : 'not a key'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                      Primary key in force: <span className="font-bold text-emerald-400">{primaryKey ?? 'none'}</span>.
                      {candidateKeys.length > 1 && (
                        <> Alternate key(s): <span className="text-sky-300 font-semibold">{candidateKeys.filter(k => k !== primaryKey).join(', ') || '—'}</span>.</>
                      )}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="font-bold text-sky-400 text-sm">Referential Integrity Tester</h4>
                    <p className="text-[11px] text-slate-400">ENROLLMENT.AdmNo is a FOREIGN KEY referencing STUDENT(AdmNo). Try to enrol:</p>
                    <button onClick={() => insertEnrollment(104, 'PE')} className="w-full py-2.5 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all">
                      INSERT (EnrollNo {nextEnrollNo}, AdmNo 104, &apos;PE&apos;) — valid
                    </button>
                    <button onClick={() => insertEnrollment(999, 'CS')} className="w-full py-2.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all">
                      INSERT (EnrollNo {nextEnrollNo}, AdmNo 999, &apos;CS&apos;) — orphan
                    </button>
                    <button onClick={() => insertEnrollment(null, 'Music')} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all">
                      INSERT (EnrollNo {nextEnrollNo}, AdmNo NULL)
                    </button>
                    {fkMessage && <Verdict ok={fkMessage.ok} text={fkMessage.text} />}
                    <div className="bg-slate-900 rounded-lg border border-slate-800 p-3">
                      <p className="text-[10px] text-slate-500 uppercase mb-1">ENROLLMENT — {enrollments.length} tuples</p>
                      <div className="space-y-1 font-mono text-[11px]">
                        {enrollments.map((e, i) => (
                          <p key={i} className={e.AdmNo === null ? 'text-amber-300' : 'text-slate-300'}>
                            ({e.EnrollNo}, {e.AdmNo === null ? 'NULL' : e.AdmNo}, {e.Course})
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── LAB 3 ── */}
            {activeExplorationIndex === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-sky-400 text-sm flex items-center gap-2"><FolderCopyIcon className="w-4 h-4" /> One fact, many copies — &ldquo;Aman&apos;s city&rdquo;</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40">
                      <p className="text-xs font-bold text-emerald-400 mb-2">DBMS — one logical copy</p>
                      <div className="text-center bg-slate-900 rounded-lg border border-emerald-500/30 py-4 transition-colors duration-300">
                        <p className="text-[10px] text-slate-500 uppercase">STUDENT.City (all users)</p>
                        <p className="text-xl font-extrabold text-emerald-300 transition-all">{String(dbmsTarget)}</p>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">Every user reads the same value — inconsistency is structurally impossible.</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/40">
                      <p className="text-xs font-bold text-rose-400 mb-2">File system — {deptCopies} copies</p>
                      <div className="space-y-1.5">
                        {['Exam cell', 'Office', 'Library', 'Transport', 'Accounts', 'Sports'].slice(0, deptCopies).map((dept, i) => {
                          const stale = fileStale && fileTargets[i] !== dbmsTarget;
                          return (
                            <div key={dept} className={`flex justify-between items-center px-3 py-1.5 rounded-lg border text-xs transition-colors duration-300 ${
                              stale ? 'bg-rose-950/50 border-rose-500/60 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}>
                              <span>{dept}.dat</span>
                              <span className={`font-bold ${stale ? 'text-rose-300' : 'text-emerald-300'}`}>{String(fileTargets[i])}{stale ? ' ⚠ stale' : ''}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sky-400 text-sm">Redundancy Controls</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Department file copies:</span>
                      <span className="font-bold text-amber-400">{deptCopies} copies</span>
                    </div>
                    <input type="range" min={1} max={6} value={deptCopies} onChange={e => setDeptCopies(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                  <button onClick={performUpdate} className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 rounded-xl text-xs font-bold shadow-lg hover:from-sky-400 transition-all">
                    UPDATE: exam cell changes city ({updateCount} updates done)
                  </button>
                  <button onClick={syncFiles} disabled={!fileStale} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-amber-400 border border-slate-700 rounded-xl text-xs font-bold transition-all">
                    Manually re-sync all files
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <Readout label="DBMS storage" value={`${dbmsStorageBytes} bytes`} tone="emerald" />
                    <Readout label="File storage" value={`${fileStorageBytes} bytes`} tone={fileStorageBytes > dbmsStorageBytes ? 'rose' : 'emerald'} />
                    <Readout label="Updates done" value={`${updateCount}`} tone="indigo" />
                    <Readout label="Inconsistent copies" value={`${liveStaleCopies} stale`} tone={liveStaleCopies ? 'rose' : 'emerald'} />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Storage estimate: {cardinality} rows × {degree} cols × 8 bytes × {deptCopies} copies = {fileStorageBytes} bytes. Redundancy multiplies BOTH storage and risk.</p>
                </div>
              </div>
            )}

            {/* ── LAB 4 ── */}
            {activeExplorationIndex === 3 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-sky-400 text-sm flex items-center gap-2"><Filter className="w-4 h-4" /> Query Designer</h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">π PROJECT — tick columns</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {columns.map(c => {
                        const on = projectedCols.includes(c.name);
                        return (
                          <button key={c.name}
                            onClick={() => {
                              setProjectedCols(prev => on ? prev.filter(p => p !== c.name) : [...prev, c.name]);
                              playFx('tap');
                            }}
                            className={`px-2 py-2 rounded-lg border text-[11px] font-bold transition-all min-h-[36px] ${
                              on ? 'bg-indigo-600/70 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                            }`}>
                            {on ? '✓ ' : ''}{c.name}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold pt-1">σ SELECT — tuple filter</p>
                    <div className="flex items-center gap-1.5">
                      <select value={condColumn} onChange={e => setCondColumn(e.target.value)} className="flex-1 min-h-9 bg-slate-900 border border-slate-700 rounded-lg text-xs px-2 text-slate-200">
                        {columns.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                      <select value={condOperator} onChange={e => setCondOperator(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg text-xs px-2 min-h-9 text-slate-200">
                        <option value="=">=</option>
                        <option value={'\u2260'}>≠</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                      </select>
                      <input value={condValue} onChange={e => setCondValue(e.target.value)} placeholder="value"
                        className="w-20 min-h-9 bg-slate-900 border border-slate-700 rounded-lg text-xs px-2 text-slate-200" />
                    </div>
                    <label className="flex items-center justify-between text-xs text-slate-300 pt-1">
                      <span>Apply σ filter</span>
                      <button onClick={() => { setFilterEnabled(!filterEnabled); playFx('tap'); }}
                        className={`w-11 h-6 rounded-full transition-colors relative ${filterEnabled ? 'bg-sky-500' : 'bg-slate-700'}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${filterEnabled ? 'left-[22px]' : 'left-0.5'}`} />
                      </button>
                    </label>
                    <label className="flex items-center justify-between text-xs text-slate-300">
                      <span>DISTINCT (set semantics)</span>
                      <button onClick={() => { setDistinctOnly(!distinctOnly); playFx('tap'); }}
                        className={`w-11 h-6 rounded-full transition-colors relative ${distinctOnly ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${distinctOnly ? 'left-[22px]' : 'left-0.5'}`} />
                      </button>
                    </label>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 leading-relaxed">
                    SELECT {projectedCols.length ? projectedCols.join(', ') : '—'}<br />
                    FROM STUDENT<br />
                    {filterEnabled && <>WHERE {condColumn} {condOperator} {condValue}<br /></>}
                    {distinctOnly && <>DISTINCT<br /></>}
                    <span className="text-slate-500">→ {queryResult.length} rows × {projectedCols.length} cols</span>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <Readout label="Rows in (σ)" value={filterEnabled ? `filtered from ${cardinality}` : `all ${cardinality}`} tone="indigo" />
                    <Readout label="Rows out" value={`${queryResult.length} tuples`} tone="sky" />
                    <Readout label="Cols out (π)" value={`${projectedCols.length} attrs`} tone="emerald" />
                  </div>
                  <RelationTable
                    columns={columns.filter(c => projectedCols.includes(c.name))}
                    rows={queryResult}
                    selected={null}
                    primaryKey={null}
                    onSelect={() => {}}
                  />
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Selection σ filters TUPLES (rows); projection π keeps chosen ATTRIBUTES (columns).
                    With DISTINCT off, SQL keeps duplicate rows — pure relational algebra would collapse them. Compare both with one click.
                  </p>
                </div>
              </div>
            )}

            {/* ── LAB 5 ── */}
            {activeExplorationIndex === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-sky-400 text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Insert Attempt — poisoned by default</h4>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-2 gap-3">
                    {(['AdmNo', 'SName', 'City', 'Age', 'Marks'] as const).map(f => (
                      <label key={f} className="text-xs text-slate-400 space-y-1">
                        <span className="block font-bold text-slate-300">{f}</span>
                        <input
                          value={String(testRow[f] ?? '')}
                          onChange={e => {
                            const raw = e.target.value;
                            const isInt = columns.find(c => c.name === f)?.kind === 'int';
                            setTestRow(prev => ({ ...prev, [f]: isInt ? (raw === '' ? null : Number(raw)) : raw }));
                          }}
                          className="w-full min-h-9 bg-slate-900 border border-slate-700 rounded-lg px-2 text-sm text-slate-100 focus:border-sky-500 outline-none"
                        />
                      </label>
                    ))}
                  </div>
                  <button onClick={attemptInsert} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl text-sm font-bold shadow-lg hover:from-emerald-400 transition-all">
                    INSERT INTO STUDENT — run constraint checks
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => setTestRow({ AdmNo: 103, SName: 'Isha', City: 'Pune', Age: 200, Marks: 55 })} className="flex-1 py-2 bg-rose-950/60 border border-rose-500/50 text-rose-300 rounded-xl text-[11px] font-bold">
                      Load poisoned row
                    </button>
                    <button onClick={() => setTestRow({ AdmNo: 106, SName: 'Isha', City: 'Pune', Age: 16, Marks: 55 })} className="flex-1 py-2 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 rounded-xl text-[11px] font-bold">
                      Load valid row
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-sky-400 text-sm">Constraint Checker Log</h4>
                  {constraintLog.length === 0 && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-500">
                      Run an insert to see which constraints fire. Constraints checked: PRIMARY KEY (unique + not null), NOT NULL, DOMAIN (Age 5-25, Marks 0-100, name 2-20 letters).
                    </div>
                  )}
                  {constraintLog.map((l, i) => <Verdict key={i} ok={l.ok} text={l.text} />)}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <RelationTable columns={columns} rows={students.slice(-3)} selected={null} primaryKey={primaryKey} onSelect={() => {}} />
                    <p className="text-[10px] text-slate-500 mt-2">Last 3 tuples of STUDENT — accepted inserts appear here and in every other lab.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Guided observation question (lab footer) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-400" /> {OBSERVATION_QUESTIONS[0].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => {
                  const answered = observationAnswers[0] !== undefined;
                  const chosen = observationAnswers[0] === idx;
                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';
                  if (answered) {
                    if (idx === OBSERVATION_QUESTIONS[0].correctIndex) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                    else if (chosen) style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                  }
                  return (
                    <button key={idx} onClick={() => {
                      setObservationAnswers(prev => ({ ...prev, 0: idx }));
                      if (idx === OBSERVATION_QUESTIONS[0].correctIndex) playFx('success'); else playFx('error');
                    }} className={`p-3 rounded-xl border text-left text-xs transition-all ${style}`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB 3: CHALLENGES ══════ */}
        {activeTab === 'challenges' && currentChallenge && (
          <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                  currentChallenge.difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  currentChallenge.difficulty === 'standard' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                  'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {currentChallenge.difficulty}
                </span>
                <span className="text-xs text-slate-500">Challenge {currentChallengeIndex + 1} of {CHALLENGES.length} • {currentChallenge.nodeId}</span>
              </div>
              <p className="text-lg font-semibold text-slate-100 mb-6">{currentChallenge.question}</p>

              {currentChallenge.type === 'mcq' && (
                <div className="space-y-3 mb-6">
                  {currentChallenge.options?.map((opt, idx) => {
                    let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';
                    if (challengeFeedback?.submitted) {
                      if (idx === currentChallenge.correctIndex) style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                      else if (selectedOption === idx) style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else if (selectedOption === idx) {
                      style = 'bg-indigo-950/80 border-indigo-500 text-indigo-100';
                    }
                    return (
                      <button key={idx} onClick={() => { if (!challengeFeedback?.submitted) { setSelectedOption(idx); playFx('tap'); } }}
                        className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${style}`}>
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentChallenge.type === 'numeric' && (
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      disabled={challengeFeedback?.submitted}
                      placeholder="Your answer"
                      className="flex-1 min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-4 text-lg text-slate-100 focus:border-sky-500 outline-none"
                    />
                    {currentChallenge.unit && <span className="text-sm text-slate-500 font-bold">{currentChallenge.unit}</span>}
                  </div>
                </div>
              )}

              {!challengeFeedback?.submitted ? (
                <button onClick={handleSubmitChallenge} className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 rounded-xl font-bold shadow-lg hover:from-sky-400 transition-all">
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <Verdict ok={challengeFeedback.isCorrect} text={challengeFeedback.isCorrect ? 'Correct! +10 points.' : 'Incorrect — read the reasoning.'} />
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300">
                    <p className="font-bold text-sky-400 mb-1">Explanation:</p>{challengeFeedback.explanation}
                  </div>
                  <button onClick={handleNextChallenge} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl font-bold shadow-lg hover:from-emerald-400 transition-all">
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge' : 'Finish & Record Score'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════ TAB 4: MISCONCEPTIONS ══════ */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-sky-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" /> Key Misconceptions Clarified
              </h2>
              <p className="text-slate-400 text-sm mb-6">The classic exam traps of Database Concepts — each one is disproved by the labs above.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <XCircle className="w-5 h-5" /> Misconception
                    </div>
                    <p className="text-slate-200 text-sm font-semibold">{m.misconception}</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                      <CheckCircle2 className="w-5 h-5" /> Correct Fact
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{m.correction}</p>
                    <p className="text-[10px] text-slate-600 font-mono pt-1">verify in Lab: {m.nodeId}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB 5: SUMMARY ══════ */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-sky-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="text-slate-300 text-sm mb-6">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-sky-500 text-slate-950 font-bold text-xs flex items-center justify-center flex-shrink-0">{idx + 1}</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-sky-400" /> Concept Mastery Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const m = Math.round((bktStates[nodeId]?.pKnown ?? 0) * 100);
                  const level = getMasteryLevel(bktStates[nodeId]?.pKnown ?? 0);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 font-mono mb-1">{nodeId}</p>
                      <div className="text-lg font-bold text-sky-400">{m}%</div>
                      <p className="text-[10px] text-slate-500">{level}</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-sky-500 h-full transition-all duration-500" style={{ width: `${m}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {devMode && <p className="text-xs text-slate-500 mt-4 font-mono">devMode • initialNodeId: {initialNodeId} • SRS items: {Object.keys(srsItems).length}</p>}
            </div>
          </div>
        )}
      </main>

      {showHint && currentChallenge && (
        <HintBubble
          message={currentChallenge.hints[currentHintIndex] || 'Ask: is the column unique and non-null for every tuple?'}
          onComplete={() => setShowHint(false)}
        />
      )}
      {showHint && currentChallenge && currentHintIndex < 2 && (
        <button onClick={() => setCurrentHintIndex(i => i + 1)} className="fixed bottom-4 right-4 z-40 px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-xl">
          Next hint ({currentHintIndex + 1}/3)
        </button>
      )}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && <SuccessBanner message="Database Concepts mastered!" onComplete={() => setShowSuccessBanner(false)} />}
    </div>
  );
}
