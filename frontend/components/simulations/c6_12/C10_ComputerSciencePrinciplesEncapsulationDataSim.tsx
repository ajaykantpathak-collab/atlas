'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery, getNodesNeedingReview } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED NODE CONSTANTS ───
const NODE_C10_CS_001 = 'c10_cs_001';
const NODE_C10_CS_002 = 'c10_cs_002';
const NODE_C10_CS_003 = 'c10_cs_003';
const NODE_C10_CS_004 = 'c10_cs_004';
const NODE_C10_CS_005 = 'c10_cs_005';
const NODE_C10_CS_006 = 'c10_cs_006';
const NODE_C10_CS_007 = 'c10_cs_007';
const NODE_C10_CS_008 = 'c10_cs_008';
const NODE_C10_CS_009 = 'c10_cs_009';
const NODE_C10_CS_010 = 'c10_cs_010';

const ALL_NODE_IDS = [
  NODE_C10_CS_001,
  NODE_C10_CS_002,
  NODE_C10_CS_003,
  NODE_C10_CS_004,
  NODE_C10_CS_005,
  NODE_C10_CS_006,
  NODE_C10_CS_007,
  NODE_C10_CS_008,
  NODE_C10_CS_009,
  NODE_C10_CS_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Mission: Bengaluru FinTech Core Engine',
  intro: 'You are the lead software engineer at PaySetu, a high-speed UPI banking engine in Bengaluru. A massive transaction bug just leaked private account balances, corrupted shared counters, and crashed the JVM instance registry!',
  context: 'Your task is to rebuild the core architecture from scratch: capsule encapsulation, stack vs heap memory management, instance isolation, method signatures, static coordination, and rock-solid constructor initialisation.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In PaySetu’s broken codebase, Account a = new Account(); Account b = a; b.balance = 5000; What is a.balance?',
  options: [
    '₹0 — "a" has its own separate memory copy',
    '₹5000 — "a" and "b" point to the exact same heap object',
    'null — reference "b" unlinked reference "a"',
    'Compilation Error — cannot assign one object reference to another',
  ],
  correctIndex: 1,
  hintAfter: 'Surprised? In Java, object variables hold memory references (addresses), NOT separate copies of the object itself! Let us discover why.',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 22 CHALLENGES (Foundation, Standard, Advanced with NEP 2020 Competencies) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_cs_01',
    nodeId: NODE_C10_CS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'PaySetu bundles private fields (balance, pin) and public methods (deposit, checkBalance) into BankAccount.class. Which OOP principle is this?',
    options: ['Polymorphism', 'Encapsulation', 'Inheritance', 'Dynamic Dispatch'],
    correctIndex: 1,
    explanation: 'Encapsulation is bundling data (fields) and methods that operate on that data into a single unit (a class). Marking fields private is data hiding.',
    hints: [
      'Think of a medical capsule that holds multiple ingredients inside one protective shell.',
      'It combines state and behaviour into a single class container.',
      'The answer is Encapsulation.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_02',
    nodeId: NODE_C10_CS_001,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A customer presses "Transfer ₹500" on the PaySetu mobile app without knowing the SQL queries or network sockets executing underneath. This illustrates:',
    options: ['Abstraction', 'Data Hiding', 'Multiple Inheritance', 'Memory Allocation'],
    correctIndex: 0,
    explanation: 'Abstraction exposes only essential operational features to the user while hiding internal implementation complexities.',
    hints: [
      'Think of a car dashboard: you use the steering and pedals without knowing the internal cylinder combustion.',
      'It hides HOW it works and only shows WHAT it does.',
      'Exposing essential features while hiding inner workings is Abstraction.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_03',
    nodeId: NODE_C10_CS_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following describes the three fundamental characteristics of every Java object?',
    options: [
      'Stack, Heap, Garbage Collector',
      'State, Behaviour, Identity',
      'Public, Private, Protected',
      'Name, Package, Import',
    ],
    correctIndex: 1,
    explanation: 'Every Java object possesses State (values in instance variables), Behaviour (methods it executes), and Identity (its unique heap memory reference).',
    hints: [
      'What an object holds, what an object can do, and what makes it distinct in memory.',
      'State is data, Behaviour is methods, Identity is its address.',
      'The three characteristics are State, Behaviour, and Identity.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_04',
    nodeId: NODE_C10_CS_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each Java modifier / element to its correct role in class BankAccount.',
    dragItems: [
      { label: 'private double balance;', targetId: 'slot_field' },
      { label: 'public void deposit(double a)', targetId: 'slot_method' },
      { label: 'BankAccount acc1 = new BankAccount();', targetId: 'slot_instantiation' },
      { label: 'acc1.deposit(500);', targetId: 'slot_invocation' },
    ],
    correctMapping: {
      slot_field: 'private double balance;',
      slot_method: 'public void deposit(double a)',
      slot_instantiation: 'BankAccount acc1 = new BankAccount();',
      slot_invocation: 'acc1.deposit(500);',
    },
    explanation: 'Fields declare internal state, methods declare behaviour, "new" performs heap instantiation, and the dot operator invokes behaviour.',
    hints: [
      'Look for the keyword "private double" — that is an encapsulated field.',
      '"public void" defines a method signature.',
      '"new BankAccount()" creates the object, and "acc1.deposit()" calls it.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_05',
    nodeId: NODE_C10_CS_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What actually happens in JVM memory when the line "Account acc = new Account();" executes?',
    options: [
      'Memory is reserved on the Stack only; no constructor runs',
      'Space is allocated on Heap, constructor initialises fields, and its heap address is assigned to reference variable "acc"',
      'A class file is compiled into bytecode on the hard disk',
      'Two duplicate objects are created in parallel registers',
    ],
    correctIndex: 1,
    explanation: 'The new operator allocates heap memory for the object, executes the constructor, and returns the reference address to the stack variable acc.',
    hints: [
      'Objects always live in the Heap; reference pointers live in the Stack frame.',
      'The new keyword triggers heap allocation + constructor invocation.',
      'Heap space is created and its reference stored in the variable.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_06',
    nodeId: NODE_C10_CS_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A variable declared inside method "public void computeInterest()" with "double tax = 18.5;" is classified as:',
    options: ['Instance Variable', 'Local Variable', 'Class Variable', 'Static Field'],
    correctIndex: 1,
    explanation: 'Local variables are declared inside a method or block. They are created on method entry and destroyed immediately on exit.',
    hints: [
      'It is declared inside the braces of a method.',
      'It does not have the static keyword and does not belong to the whole object.',
      'Variables inside methods are Local variables.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_07',
    nodeId: NODE_C10_CS_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which method header correctly promises to compute and return a transaction surcharge as a decimal value without displaying it?',
    options: [
      'public void calculateSurcharge(double amount)',
      'public double calculateSurcharge(double amount)',
      'public static void surcharge(double amount)',
      'double return calculateSurcharge(int amount)',
    ],
    correctIndex: 1,
    explanation: 'A non-void return type (double) specifies that the method returns a decimal value back to the caller via a return statement.',
    hints: [
      'If it must return a decimal number, its return type cannot be void.',
      'The return type appears directly before the method name.',
      'The valid signature is "public double calculateSurcharge(double amount)".',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_08',
    nodeId: NODE_C10_CS_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why will the Java compiler REJECT the following pair in the same class?\nint fee(int days)\ndouble fee(int days)',
    options: [
      'Method names must contain at least 5 letters',
      'Return types alone cannot distinguish overloaded methods because calls like fee(5) would be ambiguous',
      'A class cannot have both int and double methods',
      'fee is a reserved Java keyword',
    ],
    correctIndex: 1,
    explanation: 'Overloading requires different parameter lists (count, type, or order). The compiler cannot distinguish method calls based on return type alone at the call site.',
    hints: [
      'When you call fee(10), how would the compiler know whether you wanted the int or double version?',
      'The argument lists are identical: (int days).',
      'Return type alone cannot resolve an overloaded method call.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_09',
    nodeId: NODE_C10_CS_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why MUST "public static void main(String[] args)" be declared with the static keyword?',
    options: [
      'Because main cannot return any data to the operating system',
      'So the JVM can invoke main directly using the Class name before any object of the class has been instantiated in memory',
      'To prevent any other class from creating objects of this class',
      'Because all methods in Java are static by default',
    ],
    correctIndex: 1,
    explanation: 'At startup, no objects exist on the heap. The JVM needs a class-level entry point to invoke ClassName.main() without needing an instance first.',
    hints: [
      'Think about what exists when your program first boots up before line 1 runs.',
      'No object has been created with "new" yet.',
      'Static allows JVM to call the method directly on the class blueprint.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_10',
    nodeId: NODE_C10_CS_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following is a strict syntactic rule for constructors in Java?',
    options: [
      'Must have "void" as their return type',
      'Must have the exact same name as the class and must NOT have any return type (not even void)',
      'Must always be declared private',
      'Must be called using the dot operator like obj.Student()',
    ],
    correctIndex: 1,
    explanation: 'Constructors have the exact class name, have no return type, and are invoked automatically during "new ClassName()". Writing void makes it a regular method!',
    hints: [
      'Does a constructor return anything?',
      'What happens if you write "void Student()"? Java treats it as a normal method!',
      'Constructors share the class name and have NO return type.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_11',
    nodeId: NODE_C10_CS_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Class PremiumAccount extends BankAccount. Both contain "public void processTxn(int id)". This mechanism is:',
    options: [
      'Method Overloading (Compile-time polymorphism in the same class)',
      'Method Overriding (Runtime polymorphism across superclass and subclass with identical signature)',
      'Data Encapsulation',
      'Multiple Inheritance',
    ],
    correctIndex: 1,
    explanation: 'Method overriding happens when a subclass provides a specific implementation for an inherited superclass method with the exact same name, return type, and parameter list.',
    hints: [
      'Notice these methods are in TWO different classes in an inheritance hierarchy.',
      'They have the exact same signature: processTxn(int id).',
      'Redefining a parent method in a child class is Method Overriding.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_12',
    nodeId: NODE_C10_CS_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Class Account has "static int totalAcc = 0; int myBalance = 1000;". We run: new Account(); new Account(); new Account(); and on each constructor run totalAcc++ and myBalance += 500. How many total copies of totalAcc exist in memory?',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'copy',
    explanation: 'A static (class) variable has exactly ONE shared copy in memory for the entire class, regardless of how many objects are instantiated.',
    hints: [
      'Is totalAcc declared static?',
      'Instance variables get 1 copy per object; static variables get only 1 copy for all objects.',
      'The answer is 1.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_13',
    nodeId: NODE_C10_CS_008,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the resolution steps the Java compiler executes when resolving "obj.calculate(5, 12.5)":',
    sortItems: [
      'Search for method calculate with exact signature calculate(int, double)',
      'If not found, search for compatible widening signature calculate(double, double)',
      'Bind the resolved method signature into compiled bytecode at compile-time',
      'Reject compilation with ambiguity or missing method error if no valid match exists',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Compiler first looks for exact parameter match, then applies automatic widening promotion, binds the call, or emits an error.',
    hints: [
      'Exact matching always takes highest priority.',
      'Implicit type widening (int to double) happens next.',
      'Binding the signature into bytecode completes compile-time polymorphism.',
    ],
  },
  {
    id: 'ch_cs_14',
    nodeId: NODE_C10_CS_010,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble a valid Copy Constructor for class "Account" that duplicates state from another Account object "orig".',
    availableParts: [
      'public Account(Account orig)',
      '{',
      'this.balance = orig.balance;',
      'this.accNum = orig.accNum;',
      '}',
      'return orig;',
      'void Account(Account orig)',
    ],
    targetState: 'public Account(Account orig) { this.balance = orig.balance; this.accNum = orig.accNum; }',
    validationHint: 'A constructor has no return type, takes Account orig as parameter, and copies fields individually.',
    explanation: 'Copy constructors take an instance of the same class and copy each field individually to ensure deep independent state.',
    hints: [
      'Do not include any return type (no void, no return).',
      'Header: public Account(Account orig)',
      'Body copies orig.balance and orig.accNum.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_15',
    nodeId: NODE_C10_CS_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Observe this snippet:\nAccount a1 = new Account(101, 4000);\nAccount a2 = new Account(101, 4000);\nboolean test = (a1 == a2);\nWhat is the value of test in Java, and why?',
    options: [
      'true — because all instance fields (accNum and balance) are identical',
      'false — because == compares reference memory addresses, and a1 and a2 reside at distinct heap locations',
      'true — Java automatically merges identical objects into one heap address',
      'Compilation Error — == operator cannot be used on objects',
    ],
    correctIndex: 1,
    explanation: 'In Java, the == operator on reference types tests IDENTITY (memory address). Since a1 and a2 were created via two distinct "new" calls, their heap addresses differ.',
    hints: [
      'Does == check content equality or memory address equality for objects?',
      'Each "new" keyword creates a distinct block in the heap.',
      'Two distinct objects have distinct identities, so (a1 == a2) evaluates to false.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_16',
    nodeId: NODE_C10_CS_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A junior programmer writes this inside a class:\nprivate int balance = 1000;\npublic static void printReport() {\n  System.out.println(balance);\n}\nWhat will happen on compilation?',
    options: [
      'Compiles and prints 1000',
      'Compiler Error: "non-static variable balance cannot be referenced from a static context"',
      'Compiles, but prints null at runtime',
      'Compiles, creating an automatic temporary Account instance',
    ],
    correctIndex: 1,
    explanation: 'Static methods belong to the class and have no "this" pointer. They cannot access instance variables directly unless an object is instantiated or passed in.',
    hints: [
      'Does printReport() have an object reference attached to it?',
      'balance is an instance variable (non-static), but printReport is static.',
      'A static method cannot directly touch non-static fields.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_17',
    nodeId: NODE_C10_CS_004,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluating ICSE 2024 candidate errors: Why is declaring fields inside "public void accept()" rather than at class level a critical structural mistake?',
    options: [
      'It causes an immediate OutOfMemory error in the JVM',
      'Variables inside accept() become local variables, destroyed upon method completion, leaving the object with no persistent state',
      'Java forbids methods from containing any variable declarations',
      'It converts the class into an abstract interface',
    ],
    correctIndex: 1,
    explanation: 'Instance variables must be declared at class level (outside all methods) so they live for the lifetime of the object and are accessible across all member methods.',
    hints: [
      'What is the lifetime of a variable declared inside a method?',
      'Local variables die when the method returns.',
      'Fields must be at class level to maintain persistent object state.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_18',
    nodeId: NODE_C10_CS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Class FixedDeposit has one written constructor: "public FixedDeposit(int tenure, double principal)". If main() runs "FixedDeposit fd = new FixedDeposit();", what happens?',
    options: [
      'Java automatically invokes the default no-argument constructor with zeroed fields',
      'Compile-time Error: constructor FixedDeposit() is undefined because user defined a parameterized constructor',
      'The code compiles, but crashes with NullPointerException at runtime',
      'JVM automatically creates dummy values tenure=1, principal=1000.0',
    ],
    correctIndex: 1,
    explanation: 'Java provides a free default no-argument constructor ONLY if the programmer writes NO constructors. Once any constructor is written, the automatic default is removed.',
    hints: [
      'Does Java still supply the invisible default constructor after you write a parameterized one?',
      'Writing any custom constructor removes the automatic default constructor.',
      'The call new FixedDeposit() fails to compile unless you explicitly write FixedDeposit() {}.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_19',
    nodeId: NODE_C10_CS_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Look at the Java method execution:\nint process(int a, int b) { return a * 2 + b; }\nWhat integer value is returned by the nested call "process(process(2, 3), 4)"?',
    correctAnswer: 18,
    tolerance: 0,
    unit: '',
    explanation: 'Inner call: process(2, 3) = 2*2 + 3 = 7. Outer call: process(7, 4) = 7*2 + 4 = 18.',
    hints: [
      'Evaluate the inner call first: process(2, 3).',
      '2 * 2 + 3 = 7.',
      'Now evaluate outer call: process(7, 4) = 7 * 2 + 4.',
    ],
  },
  {
    id: 'ch_cs_20',
    nodeId: NODE_C10_CS_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'PaySetu needs to generate sequential UPI transaction IDs: TXN_1001, TXN_1002, TXN_1003. How should the state be designed?',
    options: [
      'private int lastId in every Transaction object',
      'private static int counter = 1000; at class level, incremented in constructor; private int txnId in each object',
      'A local variable int counter = 1000 inside method generateId()',
      'public double counter initialized in main() only',
    ],
    correctIndex: 1,
    explanation: 'A private static counter maintains a single shared sequence across all transactions, while an instance variable txnId stores the unique ID for each individual transaction.',
    hints: [
      'You need ONE shared sequence counter across all objects, and ONE unique ID per object.',
      'Shared data = static class variable; individual data = instance variable.',
      'Use a static counter incremented in the constructor.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_21',
    nodeId: NODE_C10_CS_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Comparing Polymorphism types in CISCE Computer Science: Which row accurately distinguishes Overloading from Overriding?',
    options: [
      'Overloading: Across Super/Subclass at Runtime | Overriding: In Same Class at Compile Time',
      'Overloading: Same Class, Different Parameter Lists, Compile Time | Overriding: Across Super/Subclass, Same Signature, Runtime',
      'Overloading: Requires "extends" keyword | Overriding: Requires "static" keyword',
      'Overloading and Overriding are identical concepts with different names',
    ],
    correctIndex: 1,
    explanation: 'Overloading happens within the same class with different parameters (resolved at compile time). Overriding happens between subclass and superclass with identical signatures (resolved at runtime).',
    hints: [
      'Where does overloading live? Inside the SAME class.',
      'Where does overriding live? Across PARENT and CHILD classes.',
      'Overloading is compile-time; Overriding is run-time polymorphism.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_22',
    nodeId: NODE_C10_CS_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct an encapsulated Indian Banking Pin Validator method that returns true only if pin is between 1000 and 9999.',
    availableParts: [
      'public boolean validatePin(int p)',
      '{',
      'if (p >= 1000 && p <= 9999) return true;',
      'return false;',
      '}',
      'public void validatePin(int p)',
      'private boolean validatePin(int p)',
    ],
    targetState: 'public boolean validatePin(int p) { if (p >= 1000 && p <= 9999) return true; return false; }',
    validationHint: 'Use public boolean signature with 4-digit range check returning true/false.',
    explanation: 'Encapsulation uses public gatekeeper methods with boolean returns to validate inputs and protect internal private state.',
    hints: [
      'The method must be public and return boolean.',
      'Check range: p >= 1000 && p <= 9999.',
      'Return true if valid, false otherwise.',
    ],
    misconceptionIndex: 0,
  },
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_CS_001,
  title: 'Java OOP Principles & Memory Architecture',
  definition: 'Object-Oriented Programming (OOP) in Java models real-world systems via classes (blueprints) and objects (heap instances) through encapsulation, abstraction, inheritance, and polymorphism.',
  eli5: 'A class is like a blueprint for a smartphone. The objects are the actual phones built in the factory. Encapsulation is putting the delicate wires inside the case and giving you safe buttons to press.',
  misconceptions: [
    { misconception: 'Encapsulation and Abstraction are the same thing.', correction: 'Encapsulation bundles data + methods into a class with data hiding (private fields). Abstraction exposes essential actions while hiding internal implementation mechanics.' },
    { misconception: 'Object reference variables hold the actual object data.', correction: 'Reference variables in stack memory only hold the memory address (pointer) pointing to the object allocated in heap memory.' },
    { misconception: 'Method overloading can be done by changing only the return type.', correction: 'Overloading requires different parameter lists (count, type, or order). Return type alone is ambiguous at the call site.' },
    { misconception: 'A static variable gets duplicated for each object.', correction: 'A static variable belongs to the class and has exactly ONE shared copy across all objects.' },
    { misconception: 'Constructors have a void return type.', correction: 'Constructors have NO return type (not even void) and share the exact class name.' },
  ],
  diagnosticQuestions: [
    { question: 'What keyword allocates heap memory for a Java object?', options: ['malloc', 'new', 'create', 'alloc'], correctIndex: 1 },
    { question: 'Which access modifier completely restricts field visibility to its own class?', options: ['public', 'protected', 'private', 'default'], correctIndex: 2 },
    { question: 'Where are Java local variables stored during execution?', options: ['Heap', 'Stack frame', 'Metaspace', 'Hard drive'], correctIndex: 1 },
    { question: 'What is the signature of the Java application entry point?', options: ['void main()', 'public static void main(String[] args)', 'static int main()', 'public void main(String args)'], correctIndex: 1 },
    { question: 'How many copies of an instance variable exist when 4 objects are instantiated?', options: ['1', '2', '4', '8'], correctIndex: 2 },
    { question: 'What operator is used to invoke methods through an object reference?', options: ['->', '::', '.', '#'], correctIndex: 2 },
    { question: 'Method overloading is resolved at:', options: ['Compile time', 'Runtime', 'Deployment time', 'Garbage collection time'], correctIndex: 0 },
    { question: 'What happens when you write a parameterized constructor in a class with no default constructor?', options: ['Java keeps the default constructor', 'Java removes the automatic default constructor', 'Compiler crashes', 'JVM adds random parameters'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands OOP principles, class/object distinction, memory allocation (stack vs heap), method signatures, static coordination, and constructors.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Encapsulation Capsule',
    instruction: 'Toggle field access between PRIVATE and PUBLIC. Watch what happens to PaySetu bank security when rogue scripts attempt direct modification!',
    interactionType: 'toggle-capsule',
    nodeId: NODE_C10_CS_001,
  },
  {
    title: '2. Stack vs Heap Memory Explorer',
    instruction: 'Click "Instantiate Object" (new BankAccount) and "Assign Reference" (acc2 = acc1). Observe how pointers and heap memory blocks behave in real-time.',
    interactionType: 'memory-inspector',
    nodeId: NODE_C10_CS_005,
  },
  {
    title: '3. Instance vs Static Whiteboard',
    instruction: 'Spawn multiple customer accounts. Adjust local balance and increment the shared static transaction counter. Notice which data is isolated vs shared!',
    interactionType: 'static-vs-instance',
    nodeId: NODE_C10_CS_006,
  },
  {
    title: '4. Method Overloading Engine',
    instruction: 'Select different argument combinations (int, double, String) and watch the Java compiler resolve the exact matching method signature at compile-time!',
    interactionType: 'overload-resolver',
    nodeId: NODE_C10_CS_008,
  },
  {
    title: '5. The Constructor Assembly Factory',
    instruction: 'Switch between Default, Parameterized, and Copy constructors to build customer accounts with custom initial states.',
    interactionType: 'constructor-factory',
    nodeId: NODE_C10_CS_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If "acc2 = acc1" and we execute "acc2.deposit(1500)", what will happen to acc1.balance?',
    options: [
      'acc1.balance remains unchanged because acc2 is an independent clone',
      'acc1.balance increases by 1500 because both references point to the same heap object',
      'acc1 becomes null',
      'acc1 and acc2 will crash the JVM memory',
    ],
    correctIndex: 1,
    verifyInstruction: 'In the Memory Explorer below, click "Assign Reference (acc2 = acc1)" then deposit ₹1500 to verify!',
    nodeId: NODE_C10_CS_005,
  },
  {
    question: 'Predict: If we create 3 BankAccount objects and increment a static counter in the constructor, how many copies of the static counter will exist in memory?',
    options: [
      '3 separate copies, one inside each object',
      'Exactly 1 shared copy for the entire class',
      '0 copies until a method is called',
      'A new copy on every method invocation',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3 (Instance vs Static Whiteboard), click "Instantiate New Object" to see the static transaction counter share one global value!',
    nodeId: NODE_C10_CS_006,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when balance is marked PRIVATE vs PUBLIC?',
    observableOptions: [
      'When PRIVATE, external code cannot tamper with balance; it must go through safe deposit() checks.',
      'When PRIVATE, the class cannot run any methods at all.',
      'When PUBLIC, balance is automatically encrypted.',
      'There is no observable difference.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_CS_001,
  },
  {
    question: 'In the Memory Explorer, what do you observe about the heap address when assigning acc2 = acc1?',
    observableOptions: [
      'Both acc1 and acc2 display the identical heap address 0x7A4F pointing to the same single object.',
      'acc2 allocates a new separate memory block at 0x9999 with duplicated balance.',
      'acc1 memory block is destroyed and replaced by acc2.',
      'acc1 and acc2 merge into a single stack variable.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_CS_005,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'PaySetu UPI Architect Challenge',
  description: 'Design a Java class "UPIUser" representing an Indian digital payment user. It must include private fields (mobileNumber, upiId, walletBalance), a shared static transactionLimit of ₹1,00,000, overloaded pay() methods for QR code and phone number, and a copy constructor.',
  steps: [
    '1. Declare private instance variables: mobileNumber (long), upiId (String), walletBalance (double).',
    '2. Declare private static double dailyLimit = 100000.0; for the shared limit.',
    '3. Create a parameterized constructor and a copy constructor for device cloning.',
    '4. Write overloaded methods: pay(String receiverUpi, double amt) and pay(long mobile, double amt).',
    '5. Test the class inside public static void main(String[] args).',
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
function C10_ComputerSciencePrinciplesEncapsulationDataSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Predict States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Reflection Responses
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Interactive Lab 1: Encapsulation Capsule State
  const [isFieldPrivate, setIsFieldPrivate] = useState(true);
  const [capsuleBalance, setCapsuleBalance] = useState(5000);
  const [hackAttemptResult, setHackAttemptResult] = useState<string | null>(null);
  const [depositInput, setDepositInput] = useState(1000);

  // Interactive Lab 2: Stack & Heap Memory Explorer State (Fixed typing to array)
  const [heapObjects, setHeapObjects] = useState<{ id: string; address: string; balance: number; name: string }[]>([
    { id: 'obj1', address: '0x7A4F', balance: 5000, name: 'Aarav' },
  ]);
  const [stackReferences, setStackReferences] = useState<{ refName: string; targetAddress: string }[]>([
    { refName: 'acc1', targetAddress: '0x7A4F' },
  ]);
  const [memoryDepositAmt, setMemoryDepositAmt] = useState(1500);

  // Interactive Lab 3: Static vs Instance Whiteboard State
  const [staticTxnCount, setStaticTxnCount] = useState(42);
  const [instanceAccounts, setInstanceAccounts] = useState<{ id: number; name: string; balance: number }[]>([
    { id: 1, name: 'Priya', balance: 3500 },
    { id: 2, name: 'Rohan', balance: 7200 },
  ]);

  // Interactive Lab 4: Method Overloading Resolver State
  const [selectedParamType1, setSelectedParamType1] = useState<'int' | 'double' | 'String'>('int');
  const [selectedParamType2, setSelectedParamType2] = useState<'none' | 'int' | 'double' | 'String'>('double');
  const [resolvedMethodSignature, setResolvedMethodSignature] = useState<string>('transfer(int, double)');

  // Interactive Lab 5: Constructor Factory State
  const [constructorType, setConstructorType] = useState<'default' | 'parameterized' | 'copy'>('parameterized');
  const [constructedUser, setConstructedUser] = useState({ name: 'Ananya', balance: 10000, upiPin: 4321 });

  // Sandbox State
  const [sandboxSliderBalance, setSandboxSliderBalance] = useState(2500);
  const [sandboxStaticRate, setSandboxStaticRate] = useState(5.5);
  const [sandboxSecurityLevel, setSandboxSecurityLevel] = useState<'high' | 'low'>('high');

  // Challenge & Evaluation States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop / Interactive Inputs for Challenges
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Animation & Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'memory' | 'code'>('blueprint');

  // Persistence Refs & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C10_CS_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty adaptation
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Method Overloading resolver
  useEffect(() => {
    let sig = `transfer(${selectedParamType1}`;
    if (selectedParamType2 !== 'none') {
      sig += `, ${selectedParamType2}`;
    }
    sig += `)`;
    setResolvedMethodSignature(sig);
  }, [selectedParamType1, selectedParamType2]);

  // Canvas Memory Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 120, 60);
      ctx.fillRect(10, 10, 120, 60);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('STACK (Ref)', 20, 26);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.fillText('acc1 -> 0x7A4F', 20, 45);

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.strokeRect(200, 10, 140, 60);
      ctx.fillRect(200, 10, 140, 60);
      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('HEAP (0x7A4F)', 210, 26);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.fillText(`balance: ₹${capsuleBalance}`, 210, 45);

      const arrowProgress = (Math.sin(frame * 0.08) + 1) / 2;
      ctx.beginPath();
      ctx.moveTo(130, 40);
      ctx.lineTo(195, 40);
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2 + arrowProgress;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(195, 40);
      ctx.lineTo(185, 35);
      ctx.lineTo(185, 45);
      ctx.fillStyle = '#4ade80';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [capsuleBalance]);

  // Escalating hints
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      setCurrentHint(currentChallengeObj.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentChallengeObj.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeObj]);

  // Inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Discovery answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Both reference variables point to the exact same heap memory address.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Phase transitions
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the PaySetu Core Labs! Let us explore OOP principles interactively.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked! Experiment with classes, memory, and static counters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your Java skills to the test!');
  }, []);

  // Prediction handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now interact with the lab to verify your hypothesis.');
  }, []);

  // Lab 1: Encapsulation simulation
  const handleDirectHackAttempt = useCallback(() => {
    audioManager.play('tap');
    if (isFieldPrivate) {
      setHackAttemptResult('✓ PROTECTED: balance has private access in BankAccount. Direct external modification blocked!');
      audioManager.play('error');
      speechManager.speak('Access denied! Private access modifier successfully blocked external corruption.');
    } else {
      setCapsuleBalance(-99999);
      setHackAttemptResult('✗ SECURITY BREACH: Public balance was directly corrupted to -₹99,999 by rogue external script!');
      audioManager.play('drop-wrong');
      speechManager.speak('Warning! Public field allowed invalid negative balance.');
    }
  }, [isFieldPrivate]);

  const handleSafeDeposit = useCallback(() => {
    if (depositInput <= 0) {
      setHackAttemptResult('✗ Method deposit() rejected invalid non-positive amount.');
      audioManager.play('error');
    } else {
      setCapsuleBalance(b => b + depositInput);
      setHackAttemptResult(`✓ Success: public void deposit(${depositInput}) verified positive value and updated balance safely.`);
      audioManager.play('drop-correct');
    }
  }, [depositInput]);

  // Lab 2: Memory Reference Assignment
  const handleAssignReference = useCallback(() => {
    if (stackReferences.length === 1) {
      setStackReferences(prev => [...prev, { refName: 'acc2', targetAddress: '0x7A4F' }]);
      audioManager.play('chime');
      speechManager.speak('Reference acc2 created! Notice it points to the exact same 0x7A4F heap address as acc1.');
    }
  }, [stackReferences.length]);

  const handleMemoryDeposit = useCallback(() => {
    setHeapObjects(prev =>
      prev.map(obj => (obj.address === '0x7A4F' ? { ...obj, balance: obj.balance + memoryDepositAmt } : obj))
    );
    audioManager.play('count');
    setPredictionVerified(true);
  }, [memoryDepositAmt]);

  // Lab 3: Spawn Account
  const handleSpawnAccount = useCallback(() => {
    const newId = instanceAccounts.length + 1;
    const names = ['Kavita', 'Vikram', 'Tanvi', 'Dev'];
    const chosenName = names[newId % names.length];
    setInstanceAccounts(prev => [...prev, { id: newId, name: chosenName, balance: 5000 }]);
    setStaticTxnCount(c => c + 1);
    audioManager.play('pop');
  }, [instanceAccounts.length]);

  // Lab 5: Constructor Switcher
  const handleConstructorSelect = useCallback((type: 'default' | 'parameterized' | 'copy') => {
    setConstructorType(type);
    audioManager.play('tap');
    if (type === 'default') {
      setConstructedUser({ name: 'null', balance: 0, upiPin: 0 });
    } else if (type === 'parameterized') {
      setConstructedUser({ name: 'Ananya Roy', balance: 12500, upiPin: 8899 });
    } else {
      setConstructedUser({ name: 'Ananya Roy (Clone)', balance: 12500, upiPin: 8899 });
    }
  }, []);

  // Drag handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeObj]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && currentChallengeObj.sortItems ? currentChallengeObj.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentChallengeObj]);

  // Completion
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Core engine architecture verified with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // Next Challenge
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // General Answer Handler
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
      isCorrect = answer === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
    } else if (currentChallengeObj.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = (answer as string).trim() === currentChallengeObj.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well applied.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete solution step-by-step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-cyan-950/60 border border-cyan-700/50 rounded-2xl" role="img" aria-label="subject icon">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 10 Computer Science • Stream Architecture Core</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-cyan-950/60 text-cyan-400 border-cyan-700'
                : 'bg-purple-950/60 text-purple-400 border-purple-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Mastery: <strong className="text-cyan-300">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-700/50 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Real-World Engineering Hook</span>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300 mt-2 italic bg-indigo-900/30 p-2 rounded-lg border border-indigo-800/40">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-base font-semibold text-slate-200">🔍 Pre-Exploration Curiosity Check:</h3>
            <p className="text-sm font-mono text-cyan-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`p-3 text-left text-xs md:text-sm rounded-xl border transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && !discoveryCorrect && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-cyan-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {discoveryAnswered && !discoveryCorrect && idx !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-xl space-y-3">
                <p className={`text-xs md:text-sm font-medium ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Excellent intuition! In Java, reference variables store pointers, not separate data.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter Visual Labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-cyan-950/50"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Navigation Bar for Labs */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800">
            <motion.button
              aria-label="Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Prev Lab
            </motion.button>
            <span className="text-xs font-mono text-cyan-300">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Launch Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
              >
                Launch Sandbox →
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                  <p className="text-xs text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ─── LAB 1: ENCAPSULATION CAPSULE ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-cyan-400">Class BankAccount Capsule</span>
                        <motion.button
                          aria-label={`Toggle access modifier. Currently ${isFieldPrivate ? 'private' : 'public'}`}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsFieldPrivate(!isFieldPrivate)}
                          className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                            isFieldPrivate
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                              : 'bg-rose-950 text-rose-400 border-rose-600'
                          }`}
                        >
                          Modifier: {isFieldPrivate ? '✓ 🔒 PRIVATE' : '✗ 🔓 PUBLIC (Dangerous)'}
                        </motion.button>
                      </div>

                      {/* SVG 1: Encapsulation Capsule Diagram */}
                      <svg viewBox="0 0 320 180" className="w-full h-auto" aria-label="Encapsulation capsule showing private inner core and public method gatekeepers">
                        <defs>
                          <linearGradient id="capsuleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#1e293b" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="20" width="280" height="140" rx="24" fill="url(#capsuleGrad1)" stroke={isFieldPrivate ? '#10b981' : '#f43f5e'} strokeWidth="2.5" />
                        
                        <rect x="35" y="40" width="250" height="48" rx="12" fill="#020617" stroke={isFieldPrivate ? '#047857' : '#be123c'} strokeDasharray={isFieldPrivate ? 'none' : '4 4'} />
                        <text x="50" y="60" fill={isFieldPrivate ? '#34d399' : '#fb7185'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                          {isFieldPrivate ? '🔒 private double balance;' : '⚠️ public double balance;'}
                        </text>
                        <text x="50" y="78" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                          Current Value: ₹{capsuleBalance}
                        </text>

                        <rect x="35" y="96" width="250" height="52" rx="12" fill="#091E3A" stroke="#38bdf8" />
                        <text x="50" y="116" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          ✓ public void deposit(double amt) &#123;...&#125;
                        </text>
                        <text x="50" y="134" fill="#7dd3fc" fontSize="10" fontFamily="monospace">
                          ✓ public double getBalance() &#123; return balance; &#125;
                        </text>
                      </svg>
                    </div>

                    {hackAttemptResult && (
                      <p className="text-xs font-mono p-2.5 rounded-lg bg-slate-900 border border-slate-700 mt-2">
                        {hackAttemptResult}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <span className="text-xs font-bold text-slate-300">Interact & Test Data Hiding:</span>
                    
                    <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl space-y-2">
                      <p className="text-xs text-rose-300 font-semibold">1. Rogue Script Attack (Direct Access)</p>
                      <code className="block text-[11px] font-mono text-slate-300 bg-slate-900 p-2 rounded">
                        acc1.balance = -99999;
                      </code>
                      <motion.button
                        aria-label="Execute Direct Hack Attack"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDirectHackAttempt}
                        className="w-full py-1.5 bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold rounded-lg"
                      >
                        Execute Direct Hack
                      </motion.button>
                    </div>

                    <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-xl space-y-2">
                      <p className="text-xs text-emerald-300 font-semibold">2. Safe Gatekeeper Method Access</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Amount ₹</span>
                        <input
                          aria-label="Deposit Amount"
                          type="number"
                          value={depositInput}
                          onChange={(e) => setDepositInput(Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                        />
                        <motion.button
                          aria-label="Call Deposit Method"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSafeDeposit}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg"
                        >
                          ✓ Call deposit()
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: STACK & HEAP MEMORY EXPLORER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 pt-2">
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/60 border border-indigo-700/60 rounded-2xl space-y-2">
                      <p className="text-xs font-bold text-indigo-300">🤔 PREDICT-THEN-CHECK:</p>
                      <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left text-xs bg-slate-900 hover:bg-slate-850 border border-slate-700 rounded-lg text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl flex items-center justify-between">
                      <p className="text-xs text-emerald-300">
                        ✓ Prediction locked! Test your hypothesis below using "Assign Reference" and "Call Deposit".
                      </p>
                    </div>
                  )}

                  {/* SVG 2: Memory Reference Pointer Diagram */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400">JVM Memory Pointer Architecture:</span>
                    <svg viewBox="0 0 500 120" className="w-full h-auto" aria-label="Stack references pointing to heap object address">
                      {/* Stack Side */}
                      <rect x="20" y="20" width="160" height="85" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="35" y="42" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">STACK (Frame)</text>
                      <text x="35" y="65" fill="#e2e8f0" fontSize="11" fontFamily="monospace">acc1: 0x7A4F</text>
                      {stackReferences.length > 1 && (
                        <text x="35" y="85" fill="#38bdf8" fontSize="11" fontFamily="monospace">acc2: 0x7A4F</text>
                      )}

                      {/* Heap Side */}
                      <rect x="300" y="20" width="180" height="85" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                      <text x="315" y="42" fill="#c084fc" fontSize="12" fontWeight="bold" fontFamily="monospace">HEAP (0x7A4F)</text>
                      <text x="315" y="65" fill="#94a3b8" fontSize="11" fontFamily="monospace">holder: Aarav</text>
                      <text x="315" y="85" fill="#4ade80" fontSize="11" fontWeight="bold" fontFamily="monospace">balance: ₹{heapObjects[0]?.balance}</text>

                      {/* Pointer Arrow 1 */}
                      <path d="M 180 60 L 300 60" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
                      {/* Pointer Arrow 2 (if present) */}
                      {stackReferences.length > 1 && (
                        <path d="M 180 80 L 300 70" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 2" />
                      )}

                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
                        </marker>
                      </defs>
                    </svg>
                  </div>

                  {/* HTML5 Canvas Animation Loop */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400">Live Pulse Stream:</span>
                    <canvas ref={canvasRef} width={360} height={80} className="w-full mt-2 rounded-xl" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-sky-400">Stack Frames (Reference Variables)</span>
                      <div className="space-y-1.5 font-mono text-xs">
                        {stackReferences.map((ref, idx) => (
                          <div key={idx} className="flex justify-between p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-sky-300">{ref.refName}</span>
                            <span className="text-emerald-400">→ {ref.targetAddress}</span>
                          </div>
                        ))}
                      </div>
                      {stackReferences.length === 1 && (
                        <motion.button
                          aria-label="Assign reference acc2 to acc1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAssignReference}
                          className="w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg"
                        >
                          + Assign Reference: Account acc2 = acc1;
                        </motion.button>
                      )}
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-purple-400">Heap Memory (Actual Objects)</span>
                      <div className="space-y-1.5 font-mono text-xs">
                        {heapObjects.map((obj, idx) => (
                          <div key={idx} className="p-2 bg-slate-900 rounded-lg border border-purple-900/60">
                            <div className="flex justify-between text-purple-300">
                              <span>Address: {obj.address}</span>
                              <span>Holder: {obj.name}</span>
                            </div>
                            <div className="text-emerald-400 mt-1 font-bold">balance = ₹{obj.balance}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          aria-label="Deposit amount into memory"
                          type="number"
                          value={memoryDepositAmt}
                          onChange={(e) => setMemoryDepositAmt(Number(e.target.value))}
                          className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                        />
                        <motion.button
                          aria-label="Deposit via acc2 reference"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleMemoryDeposit}
                          className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg"
                        >
                          acc2.deposit(₹{memoryDepositAmt})
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: STATIC VS INSTANCE WHITEBOARD ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-amber-400">🏢 Class-Level Whiteboard (STATIC)</span>
                      <span className="text-[10px] text-slate-400 font-mono">1 copy for all objects</span>
                    </div>

                    {/* SVG 3: Static Shared Memory vs Instance Isolation Diagram */}
                    <svg viewBox="0 0 300 130" className="w-full h-auto" aria-label="Static class variable shared across all object instances">
                      <rect x="10" y="10" width="280" height="45" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="25" y="30" fill="#fde68a" fontSize="11" fontWeight="bold" fontFamily="monospace">static int totalTransactions: {staticTxnCount}</text>
                      <text x="25" y="45" fill="#fcd34d" fontSize="9" fontFamily="monospace">Shared by all instances</text>

                      <rect x="10" y="70" width="130" height="50" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                      <text x="20" y="90" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">obj_1.balance</text>
                      <text x="20" y="105" fill="#cbd5e1" fontSize="9" fontFamily="monospace">₹3500 (Isolated)</text>

                      <rect x="160" y="70" width="130" height="50" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                      <text x="170" y="90" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">obj_2.balance</text>
                      <text x="170" y="105" fill="#cbd5e1" fontSize="9" fontFamily="monospace">₹7200 (Isolated)</text>
                    </svg>

                    <div className="p-3 bg-amber-950/30 border border-amber-700/50 rounded-xl text-center space-y-1">
                      <p className="text-xs font-mono text-amber-300">public static int totalTransactions;</p>
                      <p className="text-2xl font-black font-mono text-amber-400">{staticTxnCount}</p>
                    </div>
                    <motion.button
                      aria-label="Instantiate new bank account object"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSpawnAccount}
                      className="w-full py-2 bg-gradient-to-r from-amber-600 to-indigo-600 text-white text-xs font-bold rounded-xl"
                    >
                      + Instantiate New Object (new BankAccount)
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-cyan-400">📱 Per-Object Instance Variables (NON-STATIC)</span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {instanceAccounts.map(acc => (
                        <div key={acc.id} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                          <div>
                            <span className="text-cyan-300 font-bold">obj_{acc.id} ({acc.name})</span>
                            <p className="text-slate-400 text-[11px]">balance: ₹{acc.balance}</p>
                          </div>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">
                            Instance #{acc.id}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: METHOD OVERLOADING ENGINE ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-cyan-400">Compile-Time Method Signature Resolver</span>
                      <span className="text-xs font-mono text-purple-400 font-bold">{resolvedMethodSignature}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Parameter 1 Type:</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['int', 'double', 'String'] as const).map(t => (
                            <motion.button
                              key={t}
                              aria-label={`Select parameter 1 type ${t}`}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedParamType1(t)}
                              className={`py-1.5 text-xs font-mono font-bold rounded-lg border ${
                                selectedParamType1 === t
                                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                                  : 'bg-slate-900 text-slate-400 border-slate-800'
                              }`}
                            >
                              {t}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Parameter 2 Type:</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(['none', 'int', 'double', 'String'] as const).map(t => (
                            <motion.button
                              key={t}
                              aria-label={`Select parameter 2 type ${t}`}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedParamType2(t)}
                              className={`py-1.5 text-xs font-mono font-bold rounded-lg border ${
                                selectedParamType2 === t
                                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                                  : 'bg-slate-900 text-slate-400 border-slate-800'
                              }`}
                            >
                              {t}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 font-mono block">Compiler Resolution Result:</span>
                      <p className="text-xs font-mono text-emerald-300 mt-1">
                        ✓ Bound to: <span className="underline">{resolvedMethodSignature}</span> in BankAccount.class (Resolved at Compile Time)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: CONSTRUCTOR FACTORY ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-indigo-300">Select Constructor Blueprint:</span>
                    <div className="space-y-2">
                      {[
                        { type: 'default' as const, label: 'Default: BankAccount()', desc: 'No arguments, zero/null state defaults' },
                        { type: 'parameterized' as const, label: 'Parameterized: BankAccount(name, bal, pin)', desc: 'Custom initialization upon creation' },
                        { type: 'copy' as const, label: 'Copy Constructor: BankAccount(BankAccount other)', desc: 'Independent duplicate with identical initial fields' },
                      ].map(c => (
                        <motion.button
                          key={c.type}
                          aria-label={`Select ${c.label}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleConstructorSelect(c.type)}
                          className={`w-full p-2.5 text-left rounded-xl border transition-all ${
                            constructorType === c.type
                              ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <p className="text-xs font-mono font-bold">{c.label}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{c.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-emerald-400">Resulting Initialized Heap Object:</span>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                      <p className="text-slate-400">Class: BankAccount</p>
                      <p className="text-cyan-300">name: <span className="text-white">"{constructedUser.name}"</span></p>
                      <p className="text-emerald-300">balance: <span className="text-white">₹{constructedUser.balance}</span></p>
                      <p className="text-amber-300">upiPin: <span className="text-white">{constructedUser.upiPin}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white">Interactive Sandbox & Multi-Representation Studio</h2>
              <p className="text-xs text-slate-400 mt-1">
                Manipulate variables freely. Switch representations to view the Live Class Blueprint, Stack/Heap Layout, and Compiled Java Code.
              </p>
            </div>
            <motion.button
              aria-label="Start challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/50"
            >
              Start Challenges →
            </motion.button>
          </div>

          {/* Representation Selector Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'blueprint' as const, label: '1. Class Blueprint' },
              { id: 'memory' as const, label: '2. Stack & Heap Layout' },
              { id: 'code' as const, label: '3. Java Source Code' },
            ].map(tab => (
              <motion.button
                key={tab.id}
                aria-label={`Switch to ${tab.label}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-600'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sandbox Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Account Balance (Instance)</span>
                <span className="text-cyan-300 font-mono font-bold">₹{sandboxSliderBalance}</span>
              </div>
              <input
                aria-label="Adjust instance account balance"
                type="range"
                min={0}
                max={10000}
                step={500}
                value={sandboxSliderBalance}
                onChange={(e) => setSandboxSliderBalance(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Shared Interest Rate (Static)</span>
                <span className="text-amber-300 font-mono font-bold">{sandboxStaticRate}%</span>
              </div>
              <input
                aria-label="Adjust static shared interest rate"
                type="range"
                min={3.0}
                max={9.0}
                step={0.5}
                value={sandboxStaticRate}
                onChange={(e) => setSandboxStaticRate(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs text-slate-400">Security Gatekeeper Modifier</span>
              <motion.button
                aria-label="Toggle field access modifier"
                whileTap={{ scale: 0.95 }}
                onClick={() => setSandboxSecurityLevel(s => (s === 'high' ? 'low' : 'high'))}
                className={`py-1.5 rounded-lg text-xs font-bold border ${
                  sandboxSecurityLevel === 'high'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                    : 'bg-rose-950 text-rose-400 border-rose-600'
                }`}
              >
                {sandboxSecurityLevel === 'high' ? '✓ 🔒 PRIVATE Fields' : '✗ 🔓 PUBLIC Fields'}
              </motion.button>
            </div>
          </div>

          {/* Multi-Representation Views */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 min-h-[160px]">
            {activeTab === 'blueprint' && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Blueprint View: BankAccount</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-slate-400">// Encapsulated Fields</p>
                    <p className="text-purple-300">{sandboxSecurityLevel === 'high' ? 'private' : 'public'} double balance = {sandboxSliderBalance};</p>
                    <p className="text-amber-300">private static double interestRate = {sandboxStaticRate};</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-slate-400">// Public Methods</p>
                    <p className="text-sky-300">public void deposit(double amt)</p>
                    <p className="text-sky-300">public static double getRate()</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'memory' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-sky-900/60">
                  <span className="text-sky-300 font-bold block mb-1">Stack Frame</span>
                  <p className="text-slate-300">ref: user1 → 0x88F0</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-purple-900/60">
                  <span className="text-purple-300 font-bold block mb-1">Heap Address: 0x88F0</span>
                  <p className="text-emerald-400">balance: ₹{sandboxSliderBalance}</p>
                  <p className="text-amber-400">BankAccount.interestRate: {sandboxStaticRate}% (Shared)</p>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <pre className="text-xs font-mono text-slate-300 bg-slate-900 p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
{`public class BankAccount {
    ${sandboxSecurityLevel === 'high' ? 'private' : 'public'} double balance;
    private static double interestRate = ${sandboxStaticRate};

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void deposit(double amt) {
        if (amt > 0) this.balance += amt;
    }
}`}
              </pre>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & COMPETENCY ENGINE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Challenge Top Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-base md:text-lg font-bold text-white mt-0.5">
                Competency: <span className="text-sky-300 uppercase">{currentChallengeObj.competencyLevel}</span>
              </h2>
            </div>

            <motion.span
              key={currentChallengeObj.difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-xs font-mono font-bold px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-300"
            >
              Node: {currentChallengeObj.nodeId}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-sm md:text-base font-semibold text-white whitespace-pre-line leading-relaxed">
              {currentChallengeObj.question}
            </p>

            {/* MCQ Options */}
            {(currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') && currentChallengeObj.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-4">
                {currentChallengeObj.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(idx)}
                    className={`p-3 text-left text-xs md:text-sm rounded-xl border transition-all ${
                      showExplanation && idx === currentChallengeObj.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
                    {showExplanation && idx === currentChallengeObj.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Challenge */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable code block: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-cyan-700/80 hover:bg-cyan-600 rounded-lg text-white font-mono text-xs cursor-grab"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'slot_field', label: '1. Encapsulated Field Declaration:' },
                    { id: 'slot_method', label: '2. Member Method Declaration:' },
                    { id: 'slot_instantiation', label: '3. Heap Object Instantiation:' },
                    { id: 'slot_invocation', label: '4. Member Method Invocation:' },
                  ].map(slot => (
                    <div
                      key={slot.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 space-y-1"
                    >
                      <span className="text-[11px] text-slate-400 font-semibold">{slot.label}</span>
                      <div className="p-2 bg-slate-900 rounded font-mono text-xs text-cyan-300 min-h-[32px]">
                        {droppedLabels[slot.id] || '<Drop matching Java statement here>'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Architecture Layout"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Architecture Layout
                </motion.button>
              </div>
            )}

            {/* Drag Sort Challenge */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeObj.sortItems.length
                    ? sortArrangement.map(idx => currentChallengeObj.sortItems![idx])
                    : currentChallengeObj.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex items-center justify-between cursor-grab"
                    >
                      <span>{displayIdx + 1}. {item}</span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit Sorted Order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3])}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Numeric Answer"
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="w-40 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl font-mono text-white text-sm"
                  />
                  {currentChallengeObj.unit && (
                    <span className="text-xs text-slate-400 font-mono">{currentChallengeObj.unit}</span>
                  )}
                  <motion.button
                    aria-label="Check Numeric Answer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="mt-4 space-y-3">
                <span className="text-xs text-slate-400 block">{currentChallengeObj.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add code block ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-cyan-300 font-mono text-xs rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded font-mono text-xs flex items-center gap-1">
                      {part}
                      <button aria-label={`Remove block ${part}`} onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} className="text-rose-400 hover:text-rose-300 ml-1">
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 font-mono">Click code blocks above to construct Java code</span>
                  )}
                </div>

                <motion.button
                  aria-label="Validate Constructed Code"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl disabled:opacity-50"
                >
                  Validate Construction
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Progressive Step-by-Step Disclosure */}
          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Step-by-Step CISCE Solution:</span>
              <div className="space-y-2">
                {currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((step, idx) => (
                  <motion.p key={idx} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-200">
                    <span className="font-bold text-amber-400 font-mono mr-1.5">{idx + 1}.</span>
                    {step}{!step.endsWith('.') && '.'}
                  </motion.p>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                {revealedSteps < currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal Next Reasoning Step"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold rounded-xl"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Next Challenge or Complete"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD RETENTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-cyan-950/60 border border-cyan-700/60 rounded-3xl text-center space-y-3">
            <span className="text-4xl" role="img" aria-label="trophy">🏆</span>
            <h2 className="text-2xl font-black text-white">Mission Accomplished: PaySetu Core Secured!</h2>
            <p className="text-sm text-slate-300">
              Final System Integrity Score: <strong className="text-cyan-300">{Math.max(0, 100 - errors * 5)}%</strong> • Tier Reached: <strong className="text-purple-300 uppercase">{difficulty}</strong>
            </p>

            {/* Motivational Feedback Banner */}
            <div className="p-4 bg-emerald-950/50 border border-emerald-700 rounded-2xl max-w-xl mx-auto">
              <p className="text-base font-black text-emerald-300 uppercase tracking-wide">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {errors === 0
                  ? 'You demonstrated 100% precision in OOP principles, memory reference mechanics, and constructor design.'
                  : errors <= 3
                  ? 'Solid performance across class capsules, static coordination, and method overloading resolution.'
                  : errors <= 7
                  ? 'You tackled tough ICSE computer science concepts. Keep practicing reference assignments and memory models!'
                  : 'Every error is a stepping stone to building stronger mental models of the JVM.'}
              </p>
            </div>
          </div>

          {/* ─── GUIDED REFLECTION SECTION ─── */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">💡</span> Conceptual Reflection
            </h3>
            
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref_surprising" className="text-xs font-semibold text-cyan-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  id="ref_surprising"
                  aria-label="What was the most surprising thing you learned?"
                  type="text"
                  placeholder="e.g., That 'a = b' copies the heap address, not a brand-new object clone..."
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers(p => ({ ...p, surprising: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref_explain" className="text-xs font-semibold text-sky-300 block">
                  2. How would you explain this to a friend?
                </label>
                <input
                  id="ref_explain"
                  aria-label="How would you explain this to a friend?"
                  type="text"
                  placeholder="e.g., A class is a cookie cutter, objects are the cookies, and private fields are the secret recipe..."
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers(p => ({ ...p, explain: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref_realLife" className="text-xs font-semibold text-indigo-300 block">
                  3. Where in real life might you use this?
                </label>
                <input
                  id="ref_realLife"
                  aria-label="Where in real life might you use this?"
                  type="text"
                  placeholder="e.g., Designing secure banking PIN checks and shared transaction rate limits for UPI apps..."
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers(p => ({ ...p, realLife: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400">Your Diagnostic Misconception Review:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs text-rose-300 font-bold">✗ Common Error: {m.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ CISCE Standard: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-cyan-400">Spaced Repetition Schedule (SM-2):</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Next scheduled review in <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to cement neural retention.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              SRS v2.1 Active
            </span>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-800/50 rounded-2xl space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1 text-xs font-mono text-cyan-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <p key={idx}>{step}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Core System Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_ComputerSciencePrinciplesEncapsulationDataSim;