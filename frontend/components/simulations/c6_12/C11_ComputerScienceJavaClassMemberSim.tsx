'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 COMPUTER SCIENCE NODE DECLARATIONS ───
const NODE_C11_CS_011 = 'c11_cs_011'; // Class, Member Variables, Access Specifiers, Packages
const NODE_C11_CS_012 = 'c11_cs_012'; // Constructors, this keyword, Chaining, Overloading
const NODE_C11_CS_013 = 'c11_cs_013'; // Inheritance, extends, super, Single & Multilevel
const NODE_C11_CS_014 = 'c11_cs_014'; // Method Overriding, Runtime Polymorphism, Dynamic Dispatch
const NODE_C11_CS_015 = 'c11_cs_015'; // Abstract Classes, abstract Methods, Partial Implementation
const NODE_C11_CS_016 = 'c11_cs_016'; // Interfaces, implements, Multiple Inheritance contract
const NODE_C11_CS_017 = 'c11_cs_017'; // final keyword: variable, method, class
const NODE_C11_CS_018 = 'c11_cs_018'; // static keyword: static blocks, static import, static nested classes
const NODE_C11_CS_019 = 'c11_cs_019'; // Wrapper Classes: Integer, Double, Character, Autoboxing, Unboxing
const NODE_C11_CS_020 = 'c11_cs_020'; // Type Casting: Upcasting, Downcasting, instanceof

const ALL_NODE_IDS = [
  NODE_C11_CS_011,
  NODE_C11_CS_012,
  NODE_C11_CS_013,
  NODE_C11_CS_014,
  NODE_C11_CS_015,
  NODE_C11_CS_016,
  NODE_C11_CS_017,
  NODE_C11_CS_018,
  NODE_C11_CS_019,
  NODE_C11_CS_020,
];

// ─── NARRATIVE SCENARIO HOOK (Indian Real-World Context) ───
const SCENARIO = {
  title: 'Mission: Bengaluru Metro Automated Ticketing & Fleet Engine',
  intro: 'Namma Metro Bengaluru is rolling out its next-gen Java-based ticketing and autonomous rolling stock management system. You are the Lead Systems Architect reviewing the core object hierarchies, access security, polymorphism dispatchers, and memory layout.',
  context: 'The transit authority requires zero memory crashes, rock-solid security specifiers, robust inheritance for MetroTrain and GreenLineCoach, dynamic fares via polymorphism, and strict type casting for NFC smart cards.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An engineer writes: "Vehicle v = new MetroTrain(); v.emergencyBrake();" where emergencyBrake() is declared only in MetroTrain, not in Vehicle. What happens at compile time?',
  options: [
    'Compiles smoothly because the real object in Heap memory is a MetroTrain.',
    'Compile-time Error: The compiler only checks the declared reference type (Vehicle), which has no emergencyBrake().',
    'Throws a runtime ClassCastException during JVM execution.',
    'Automatically downcasts at runtime and triggers the brake without errors.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: In Java, the compiler checks the REFERENCE type for valid method names, while the JVM resolves overridden implementations at runtime via Dynamic Method Dispatch.',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (1 to 7) ---
  {
    id: 'ch_001_c11',
    nodeId: NODE_C11_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which access specifier in Java allows a member to be accessed in the same package and also by subclasses located in completely different packages?',
    options: ['public', 'private', 'protected', 'default (package-private)'],
    correctIndex: 2,
    explanation: 'protected grants access to all classes in the same package AND subclasses in different packages. Default (no modifier) only grants access within the same package.',
    hints: [
      'Think about inheritance across package boundaries.',
      'Default access stops at the package border, while this specifier opens a door specifically for child classes.',
      'The keyword starts with "pro" and protects family inheritance while opening package access.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_c12',
    nodeId: NODE_C11_CS_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the constructor syntax element with its exact operational role in constructor chaining.',
    dragItems: [
      { label: 'this.id = id', targetId: 'slot_shadow' },
      { label: 'this(id, "General", 0)', targetId: 'slot_chain' },
      { label: 'super(id)', targetId: 'slot_parent' },
    ],
    correctMapping: {
      slot_shadow: 'this.id = id',
      slot_chain: 'this(id, "General", 0)',
      slot_parent: 'super(id)',
    },
    explanation: 'this.id = id resolves variable shadowing, this(...) delegates to an overloaded constructor in the SAME class, and super(...) invokes the superclass constructor.',
    hints: [
      'this.field is used to distinguish instance fields from identically named method parameters.',
      'this() invokes another constructor in the same class and must be the 1st line.',
      'super() reaches up into the parent class constructor.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_c17',
    nodeId: NODE_C11_CS_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the precise effect of declaring "public final class SmartCard" in Java?',
    options: [
      'SmartCard objects cannot be modified after construction (immutable data).',
      'The SmartCard class cannot be instantiated using the new keyword.',
      'No other class can extend SmartCard using the extends keyword.',
      'All methods inside SmartCard are automatically made private.',
    ],
    correctIndex: 2,
    explanation: 'A final class cannot be extended (inherited). It can still be instantiated with new (e.g. String is a final class).',
    hints: [
      'Do not confuse final with abstract.',
      'final on a variable locks value, final on method locks overriding, final on class locks...',
      'It prevents any child class from saying "extends SmartCard".',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_c19',
    nodeId: NODE_C11_CS_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the statement "Integer fare = 50;", which Java mechanism is automatically performed by the compiler?',
    options: [
      'Explicit Downcasting',
      'Autoboxing (converting primitive int 50 to Integer object via Integer.valueOf(50))',
      'Unboxing (converting Integer object to primitive)',
      'Dynamic Method Dispatch',
    ],
    correctIndex: 1,
    explanation: 'Autoboxing is the automatic conversion of a primitive type (int) into its corresponding wrapper class object (Integer).',
    hints: [
      'A raw integer 50 is being wrapped inside an Integer object reference.',
      'Boxing wraps; Unboxing opens the box.',
      'Since it happens automatically without "new Integer()", it is Autoboxing.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_005_c13',
    nodeId: NODE_C11_CS_013,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the constructor execution sequence from FIRST to LAST when constructing an object: "new GreenLineCoach()" where GreenLineCoach extends MetroCoach, and MetroCoach extends RollingStock.',
    sortItems: [
      'RollingStock constructor executes',
      'MetroCoach constructor executes',
      'GreenLineCoach constructor executes',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Constructor execution always flows from the top of the inheritance hierarchy downward: Base superclass (RollingStock) -> Intermediate (MetroCoach) -> Derived subclass (GreenLineCoach).',
    hints: [
      'Before a child can initialise its specific fields, its parent foundation must exist.',
      'super() is evaluated upwards, executing the topmost superclass body first.',
      'Order: RollingStock -> MetroCoach -> GreenLineCoach.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_006_c18',
    nodeId: NODE_C11_CS_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When does a static initialisation block "static { ... }" execute in Java?',
    options: [
      'Every time a new object of the class is created using new.',
      'Only when called explicitly like a normal method.',
      'Exactly once when the class is loaded into memory by the JVM, before main() and before object instantiation.',
      'Right after the garbage collector reclaims the class.',
    ],
    correctIndex: 2,
    explanation: 'Static blocks execute exactly once when the class is loaded by the ClassLoader, prior to any constructor calls or main() execution.',
    hints: [
      'Static belongs to the class blueprint, not individual instances.',
      'It is used for one-time setup like configuration loading or static lookup tables.',
      'It runs at class-loading time.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_007_c20',
    nodeId: NODE_C11_CS_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following statements about Reference Type Casting in Java is strictly TRUE?',
    options: [
      'Upcasting requires an explicit cast operator like "(Parent) childRef".',
      'Downcasting is always safe and never throws runtime exceptions.',
      'Upcasting is safe and implicit, while downcasting requires an explicit cast and can throw ClassCastException.',
      'The instanceof operator changes the declared type of the reference variable permanently.',
    ],
    correctIndex: 2,
    explanation: 'Upcasting (SubClass to SuperClass) is widening and 100% type-safe (implicit). Downcasting narrows the view and requires an explicit cast, carrying the risk of ClassCastException at runtime.',
    hints: [
      'Every Dog is an Animal (safe upcasting), but not every Animal is a Dog.',
      'Narrowing reference types requires explicit syntax (SubClass) ref.',
      'Risky downcasts should be guarded by instanceof.',
    ],
    misconceptionIndex: 6,
  },

  // --- STANDARD (8 to 15) ---
  {
    id: 'ch_008_c14',
    nodeId: NODE_C11_CS_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given:\nclass Ticket { double calcFare() { return 20.0; } }\nclass WeekendTicket extends Ticket { double calcFare() { return 15.0; } }\nTicket t = new WeekendTicket();\nSystem.out.println(t.calcFare());\nWhat is output and what concept is active?',
    options: [
      '20.0 — Static Binding based on reference type Ticket.',
      '15.0 — Dynamic Method Dispatch resolving to the actual WeekendTicket object at runtime.',
      'Compilation Error: Cannot assign WeekendTicket to Ticket reference.',
      '35.0 — Both methods are chained automatically.',
    ],
    correctIndex: 1,
    explanation: 'Dynamic Method Dispatch / Runtime Polymorphism inspects the actual object in the Heap (WeekendTicket) at runtime, executing its overridden method (15.0).',
    hints: [
      'Look at the object created with the "new" keyword on the right-hand side.',
      'Overridden instance methods are resolved dynamically at runtime by the JVM.',
      'The output is 15.0.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_009_c15',
    nodeId: NODE_C11_CS_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A class "abstract class TransitVehicle" contains an abstract method "abstract void calibrateSensors();". What is required of the first concrete subclass "MetroCoach"?',
    options: [
      'MetroCoach may optionally implement calibrateSensors() if needed.',
      'MetroCoach MUST provide a concrete implementation body for calibrateSensors(), or itself be declared abstract.',
      'MetroCoach automatically inherits a default empty body and does not need to do anything.',
      'MetroCoach cannot extend TransitVehicle because abstract classes cannot be inherited.',
    ],
    correctIndex: 1,
    explanation: 'A concrete subclass MUST override and implement all inherited abstract methods from its abstract parent; failure to do so causes a compile-time error unless the subclass is also abstract.',
    hints: [
      'Abstract methods are unfulfilled contracts.',
      'A concrete class cannot contain any unimplemented abstract methods.',
      'It must override calibrateSensors() with a body "{ ... }".',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_010_c16',
    nodeId: NODE_C11_CS_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why does Java forbid "class HybridTrain extends ElectricTrain, DieselTrain" (Multiple Class Inheritance) but allow "class HybridTrain implements ElectricPower, GPSNavigable" (Multiple Interface Implementation)?',
    options: [
      'Interfaces cannot have any method names.',
      'Interfaces have no instance state or inherited method bodies to create ambiguity (the Diamond Problem), so multiple implementation is safe.',
      'Class inheritance is limited to 2 parents, not 3.',
      'It is simply a stylistic choice with no architectural reason.',
    ],
    correctIndex: 1,
    explanation: 'Java avoids the "Diamond Problem" of multiple class inheritance where two parents have conflicting instance state or method bodies. Pure interfaces specify contracts without conflicting implementations.',
    hints: [
      'Think about the Diamond Problem of multiple inheritance.',
      'If two parent classes have an instance variable "int speed", which one does the child get?',
      'Interfaces define pure contracts without state conflicts.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_011_c18',
    nodeId: NODE_C11_CS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the Java compiler throw an error if you write "this.passengerCount = 100;" inside a "public static void resetSystem()" method?',
    options: [
      'static methods cannot accept numerical assignments.',
      'In a static context, no "this" or "super" instance exists because static methods belong to the class blueprint, not to any particular object.',
      'passengerCount must always be declared final.',
      'static methods can only modify String variables.',
    ],
    correctIndex: 1,
    explanation: 'Static methods run in a class-level context where no object instance is bound. Therefore, the "this" reference (pointing to current instance) does not exist.',
    hints: [
      'Who does "this" point to?',
      'Can you call a static method before creating any objects using new?',
      'Without an instance, "this" has no memory address to reference.',
    ],
    misconceptionIndex: 10,
  },
  {
    id: 'ch_012_c19',
    nodeId: NODE_C11_CS_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Bengaluru metro station reader receives token payload "00350" as a String. Integer.parseInt("00350") converts it to a fare in paise. After adding 150 paise surcharge, what is the final fare integer value?',
    correctAnswer: 500,
    tolerance: 0,
    unit: 'paise',
    explanation: 'Integer.parseInt("00350") returns primitive int 350. Adding 150 gives 500 paise (₹5.00).',
    hints: [
      'Integer.parseInt trims leading zeros and parses decimal digits.',
      '350 + 150 = ?',
      'The integer arithmetic yields 500.',
    ],
  },
  {
    id: 'ch_013_c20',
    nodeId: NODE_C11_CS_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Consider:\nObject obj = new MetroTrain();\nif (obj instanceof SmartCard) {\n    SmartCard sc = (SmartCard) obj;\n}\nWhat happens when this code executes?',
    options: [
      'Throws ClassCastException at line 3.',
      'The instanceof condition evaluates to false; the downcast block is safely skipped without throwing an exception.',
      'Compiles with an error because Object cannot be used on the left of new.',
      'obj is converted to SmartCard automatically.',
    ],
    correctIndex: 1,
    explanation: 'instanceof checks whether the actual object (MetroTrain) IS-A SmartCard. It is false, so the if-block does not execute, preventing a ClassCastException.',
    hints: [
      'What is the actual class of obj? MetroTrain.',
      'Is a MetroTrain an instance of SmartCard? No.',
      'The if guard protects the code from crashing.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_014_c12',
    type: 'construct',
    nodeId: NODE_C11_CS_012,
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the correct constructor chaining declaration for a 2-parameter constructor delegating to a 3-parameter master constructor.',
    availableParts: ['MetroPassenger(String name, int age)', '{', 'this(name, age, 0.0);', 'super();', '}'],
    targetState: 'MetroPassenger(String name, int age) { this(name, age, 0.0); }',
    validationHint: 'Select the constructor header, open brace, this(...) delegation call, and closing brace in sequence.',
    explanation: 'Chaining via this(...) must be the first statement inside the constructor body to delegate default initialisation cleanly.',
    hints: [
      'Start with the constructor signature.',
      'The body must open with { and immediately call this(name, age, 0.0);',
      'Finish with the closing brace }.',
    ],
  },
  {
    id: 'ch_015_c17',
    nodeId: NODE_C11_CS_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a security-critical banking module for metro fare payment, why should the method "public final double verifyCardChecksum(byte[] key)" be marked final?',
    options: [
      'To allow subclasses to rewrite the encryption algorithm for custom smart cards.',
      'To prevent malicious or accidental subclass overriding from altering the cryptographic integrity check.',
      'To make the method run 100 times faster via GPU acceleration.',
      'To convert all local variables into global constants.',
    ],
    correctIndex: 1,
    explanation: 'Marking a method final prevents any subclass from overriding it. This guarantees that core security or validation logic remains inviolable throughout the inheritance hierarchy.',
    hints: [
      'What does final on a method do?',
      'It prevents subclasses from changing the method body.',
      'This guarantees security algorithms cannot be tampered with in child classes.',
    ],
    misconceptionIndex: 2,
  },

  // --- ADVANCED (16 to 22) ---
  {
    id: 'ch_016_c14',
    nodeId: NODE_C11_CS_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An architect evaluates access specifiers on overridden methods. If superclass "TransitSystem" declares "protected void dispatchTrain()", which access modifier is ILLEGAL in subclass "BengaluruMetro"?',
    options: [
      'public (widening access is legal)',
      'protected (matching access is legal)',
      'private (narrowing access is illegal)',
      'Both public and protected are illegal',
    ],
    correctIndex: 2,
    explanation: 'In method overriding, a subclass CANNOT reduce the visibility of an inherited method. Protected can be overridden as protected or public, but NEVER as default or private.',
    hints: [
      'The Liskov Substitution Principle and Java language specification mandate that an override cannot break the visibility contract.',
      'You can widen access (protected -> public), but you cannot narrow it.',
      'private is more restrictive than protected, making it a compiler error.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_017_c18',
    nodeId: NODE_C11_CS_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Given the code:\nimport static java.lang.Math.PI;\nimport static java.lang.Math.sqrt;\nWhich statement compiles without error and demonstrates static import?',
    options: [
      'double area = PI * sqrt(64);',
      'double area = Math.PI() * sqrt();',
      'import static java.lang.Math;',
      'double area = static PI * sqrt(64);',
    ],
    correctIndex: 0,
    explanation: 'static import imports static members (constants and methods) directly into namespace, enabling unqualified usage: PI and sqrt(64).',
    hints: [
      'Static import allows accessing Math.PI simply as PI, and Math.sqrt() as sqrt().',
      'Look for the option using both imported symbols directly.',
      'Option 1 uses PI * sqrt(64).',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_018_c19',
    nodeId: NODE_C11_CS_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate:\nInteger a = 200;\nInteger b = 200;\nInteger x = 50;\nInteger y = 50;\nSystem.out.println((a == b) + " " + (x == y));\nWhat is printed in standard Java?',
    options: [
      'true true — == always compares numerical values of wrappers.',
      'false false — == always compares object references in Heap memory.',
      'false true — Java caches Integer objects between -128 and +127 (so x == y is true), but allocates distinct objects for 200 (a == b is false).',
      'Compilation Error: Cannot use == operator on wrapper objects.',
    ],
    correctIndex: 2,
    explanation: '== compares memory references. Java maintains an Integer cache for values from -128 to 127. Thus x and y reference the cached instance (true), while a and b (200) are distinct heap objects (false). To compare values, always use .equals()!',
    hints: [
      'Remember that == compares reference addresses, not content.',
      'Java provides an internal cache for small integers (-128 to 127).',
      '50 is within cache (same reference), 200 is outside (new objects).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_019_c16',
    nodeId: NODE_C11_CS_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What are the implicit modifiers of every variable declared inside a Java interface (e.g., "int MAX_SPEED = 80;") in Class 11 Java?',
    options: [
      'private static final',
      'public static final',
      'protected volatile',
      'default package-private',
    ],
    correctIndex: 1,
    explanation: 'All variables declared in a Java interface are implicitly public, static, and final (constants). All methods are implicitly public abstract.',
    hints: [
      'Can an interface hold mutable instance variables? No.',
      'Variables are shared across all implementing classes as constants.',
      'Modifiers: public, static, and final.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_020_c20',
    nodeId: NODE_C11_CS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An engineer writes:\nRollingStock rs = new RollingStock();\nMetroTrain mt = (MetroTrain) rs;\nWhat will happen when this code runs?',
    options: [
      'Compiles and runs perfectly, upgrading the RollingStock into a MetroTrain.',
      'Throws ClassCastException at runtime because the actual object is only a generic RollingStock and lacks the MetroTrain structure.',
      'Compiler Error: Inconvertible types.',
      'Java automatically creates a blank MetroTrain instance.',
    ],
    correctIndex: 1,
    explanation: 'Downcasting does not mutate or expand an existing object in memory. Since rs references a pure RollingStock instance created with "new RollingStock()", casting it to a subclass throws ClassCastException.',
    hints: [
      'Does casting change the real object in Heap memory?',
      'No. An object created as a parent cannot be treated as a child.',
      'The JVM detects the mismatch at runtime and throws ClassCastException.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_021_c11',
    nodeId: NODE_C11_CS_011,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the mandatory file structure declarations in a valid Java source file from TOP to BOTTOM.',
    sortItems: [
      'package school.records;',
      'import java.util.Scanner;',
      'public class Student { ... }',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'In Java, the package statement MUST be the first non-comment line, followed by import statements, followed by class/interface declarations.',
    hints: [
      'Package statement always comes first.',
      'Imports must come before class headers.',
      'Order: package -> import -> class.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_022_c15',
    nodeId: NODE_C11_CS_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing the Indian Railways fare engine. Why is "abstract class TrainTicket" preferred over a pure interface "interface TrainTicket"?',
    options: [
      'Abstract class allows partial implementation: common concrete fields (pnr, passengerName, baseFare) and shared methods (printReceipt()), while forcing subclasses (SleeperTicket, TatkalTicket) to implement abstract double calculateTax().',
      'Interfaces are deprecated in modern Java.',
      'Abstract classes can be instantiated directly with new TrainTicket().',
      'Interfaces cannot have any methods at all.',
    ],
    correctIndex: 0,
    explanation: 'Abstract classes provide partial implementation: state (instance variables) + common concrete methods + abstract contracts. Interfaces in Class 11 Java cannot hold instance variables or method bodies.',
    hints: [
      'Think about shared instance state (pnr, name) and concrete helper methods.',
      'Interfaces cannot store instance variables.',
      'Abstract classes combine shared base code with forced method contracts.',
    ],
    misconceptionIndex: 8,
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
  nodeId: NODE_C11_CS_011,
  title: 'Java OOP Architecture & Class Member Simulation',
  definition: 'Comprehensive mastery of Java class members, access specifiers, constructors (this), inheritance (extends, super), method overriding, dynamic dispatch, abstract classes, interfaces, final, static, wrapper classes, and type casting.',
  eli5: 'Think of Java OOP like building high-tech metro trains. Blueprints (classes) define trains (objects). Access rules are security gates. Inheritance lets new models build on older ones. Overriding lets express trains have faster brakes. Casting is checking if a passenger holds a VIP card.',
  misconceptions: [
    { misconception: 'Default access and protected access are the same because both work in the package.', correction: 'protected grants visibility across packages to subclasses, whereas default access does not.' },
    { misconception: 'this and this() mean the same thing in a constructor.', correction: 'this refers to the current instance; this() invokes another overloaded constructor in the same class.' },
    { misconception: 'A final class cannot be instantiated using new.', correction: 'A final class can be instantiated freely (like String), but cannot be extended by subclasses.' },
    { misconception: '== compares the numerical value of two Integer wrapper objects.', correction: '== compares object memory addresses. Use .equals() to compare primitive values wrapped inside.' },
    { misconception: 'super() can appear anywhere inside a subclass constructor.', correction: 'super() or this() MUST be the very first executable statement in a constructor body.' },
    { misconception: 'A static block executes every time a new object is created.', correction: 'A static block executes exactly once when the class is loaded by the JVM.' },
    { misconception: 'Downcasting an object magically adds subclass features to a superclass instance.', correction: 'Downcasting only changes the reference type; the actual object in heap memory must already be an instance of the target subclass.' },
  ],
  diagnosticQuestions: [
    { question: 'Which keyword prevents a class from being inherited in Java?', options: ['abstract', 'static', 'final', 'private'], correctIndex: 2 },
    { question: 'Where must super() or this() be placed in a constructor?', options: ['First statement', 'Last statement', 'Anywhere in constructor', 'Inside a static block'], correctIndex: 0 },
    { question: 'What is Dynamic Method Dispatch?', options: ['Compile-time method overloading', 'Runtime resolution of overridden methods by actual object type', 'Static method hiding', 'Garbage collection pass'], correctIndex: 1 },
    { question: 'What are implicit modifiers of interface variables?', options: ['private', 'public static final', 'protected', 'transient'], correctIndex: 1 },
    { question: 'Which wrapper class wraps the primitive char?', options: ['Char', 'Character', 'String', 'Chr'], correctIndex: 1 },
    { question: 'What exception is thrown on an invalid downcast?', options: ['NullPointerException', 'ClassCastException', 'IllegalArgumentException', 'NumberFormatException'], correctIndex: 1 },
    { question: 'Can static methods use "this" or "super"?', options: ['Yes, always', 'No, never', 'Only inside subclasses', 'Only with final fields'], correctIndex: 1 },
    { question: 'What is autoboxing?', options: ['Manual conversion', 'Compiler converting primitive to wrapper object automatically', 'Casting superclass to subclass', 'Garbage collection'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates deep understanding of Java OOP design, memory execution models, access security, polymorphism dispatch, and casting safety.',
};

// ─── 5 BRILLIANT-STYLE INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Access Specifiers & Security Boundaries',
    instruction: 'Click each access specifier to inspect its reach across Same Class, Same Package, Subclass (Other Package), and World.',
    interactionType: 'click-specifier',
    nodeId: NODE_C11_CS_011,
  },
  {
    title: '2. Constructor Chaining & the "this" / "super" Bridge',
    instruction: 'Drag the parameter slider to watch "this()" chain default values into the Master Constructor and "super()" initialise parent state.',
    interactionType: 'slider-constructor',
    nodeId: NODE_C11_CS_012,
  },
  {
    title: '3. Dynamic Method Dispatch & Polymorphism Engine',
    instruction: 'Switch reference types vs Heap objects and drag the speed slider to see real-time dynamic dispatch and stopping distance calculation.',
    interactionType: 'interactive-dispatch',
    nodeId: NODE_C11_CS_014,
  },
  {
    title: '4. Abstract Class vs Interface Contract Matrix',
    instruction: 'Toggle blueprint architecture to observe partial implementation (state + code) vs pure contract (interfaces).',
    interactionType: 'toggle-contract',
    nodeId: NODE_C11_CS_015,
  },
  {
    title: '5. Reference Type Casting Ladder & instanceof Guard',
    instruction: 'Drag the casting slider up and down the inheritance ladder to observe safe Upcasting vs risky Downcasting guarded by instanceof.',
    interactionType: 'ladder-casting',
    nodeId: NODE_C11_CS_020,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS (Brilliant.org Pattern) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you assign "Vehicle v = new MetroTrain();" and call "v.calcSpeed()", which version runs?',
    options: [
      'Vehicle version (resolved at compile time by reference type)',
      'MetroTrain version (resolved dynamically at runtime by actual object in Heap)',
      'Throws an error because types do not match',
      'Both run in reverse order',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select the object type in the Dynamic Dispatch lab below to verify runtime resolution in real time.',
  },
  {
    question: 'Predict: If you attempt "(MetroTrain) new Vehicle()", what will happen when executed?',
    options: [
      'The Vehicle will be upgraded to a MetroTrain.',
      'JVM throws a ClassCastException at runtime.',
      'It compiles with a warning and returns null.',
      'It creates a copy of the MetroTrain.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Use the Casting Ladder below to try downcasting a raw base object.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the "protected" modifier compared to "default" (package-private)?',
    observableOptions: [
      'Protected opens access to subclasses outside the package; Default blocks them.',
      'Default is accessible worldwide; Protected is only in the class.',
      'Both are 100% identical in all situations.',
      'Protected can only be applied to interfaces.',
    ],
    correctIndex: 0,
  },
  {
    question: 'What happens to the JVM Stack reference when an object is Upcast?',
    observableOptions: [
      'The object in Heap memory is deleted.',
      'The reference view is widened to parent methods, but the underlying Heap object retains its specific subclass methods.',
      'The object loses all its fields permanently.',
      'The Stack memory overflows.',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Architect Bengaluru Metro Fleet System',
  description: 'Design a production-ready Java class hierarchy for Namma Metro. Create an abstract "TransitVehicle" with concrete GPS tracking and abstract "calculateBrakingDistance()". Implement it with "MetroCoach" and "ExpressLine", enforcing security using "final" and constants with interfaces.',
  steps: [
    '1. Define package "bmtc.transit.fleet" and declare abstract class TransitVehicle with protected fields (vehicleId, baseSpeed).',
    '2. Implement interface "GPSNavigable" with public static final double METRO_MAX_SPEED = 90.0.',
    '3. Provide constructor chaining with this() and call super() in derived class MetroCoach.',
    '4. Override calculateBrakingDistance() and mark critical fail-safe methods as final.',
    '5. Write a test suite with safe downcasting guarded by instanceof.',
  ],
};

function C11_ComputerScienceJavaClassMemberSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['cs'] || { name: 'Computer Science (ISC)', emoji: '💻', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & BKT state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Escalating hints state (0 to 3)
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Exploration & Sandbox Visual States
  const [selectedSpecifier, setSelectedSpecifier] = useState<'public' | 'protected' | 'default' | 'private'>('protected');
  const [dispatchRefType, setDispatchRefType] = useState<'RollingStock' | 'MetroTrain' | 'GreenLineExpress'>('RollingStock');
  const [dispatchHeapType, setDispatchHeapType] = useState<'RollingStock' | 'MetroTrain' | 'GreenLineExpress'>('GreenLineExpress');
  const [simulatedSpeed, setSimulatedSpeed] = useState<number>(60); // Real-time slider state
  const [constructorParamCount, setConstructorParamCount] = useState(1); // 1, 2, or 3
  const [constructorChainLog, setConstructorChainLog] = useState<string[]>([
    'MetroPassenger(101)',
    '-> this(101, "General", 0.0)',
    '-> super("RollingStock_User")',
    '=> Initialised in Master Constructor'
  ]);
  const [activeContractTab, setActiveContractTab] = useState<'abstract' | 'interface'>('abstract');
  const [castingLadderLevel, setCastingLadderLevel] = useState<number>(2); // 1=RollingStock, 2=MetroTrain, 3=GreenLineExpress
  const [castingActualObject, setCastingActualObject] = useState<'RollingStock' | 'MetroTrain' | 'GreenLineExpress'>('GreenLineExpress');
  const [isInstanceOfGuardActive, setIsInstanceOfGuardActive] = useState(true);

  // Challenge Drag & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Inactivity auto-hint timer
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Canvas animation ref for JVM Stack/Heap Visualizer
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_CS_011);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION: JVM MEMORY STACK & HEAP WITH LIVE SPEED BRAKING ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let pulse = 0;

    const render = () => {
      pulse += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Partition lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Headers
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#818cf8';
      ctx.fillText('JVM CALL STACK (Reference)', 15, 18);
      ctx.fillStyle = '#34d399';
      ctx.fillText('JVM HEAP (Object Instance)', canvas.width / 2 + 15, 18);

      // Draw Stack Frame
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 1.5;
      ctx.fillRect(15, 28, canvas.width / 2 - 30, 52);
      ctx.strokeRect(15, 28, canvas.width / 2 - 30, 52);

      ctx.fillStyle = '#e0e7ff';
      ctx.font = '10px monospace';
      ctx.fillText(`Type: ${dispatchRefType}`, 22, 45);
      ctx.fillText(`var: trainRef -> [0x7A4F]`, 22, 63);

      // Draw Heap Object
      const glow = Math.sin(pulse) * 4 + 4;
      ctx.fillStyle = '#064e3b';
      ctx.strokeStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = glow;
      ctx.fillRect(canvas.width / 2 + 15, 25, canvas.width / 2 - 30, 60);
      ctx.strokeRect(canvas.width / 2 + 15, 25, canvas.width / 2 - 30, 60);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#a7f3d0';
      ctx.font = '10px monospace';
      ctx.fillText(`Class: ${dispatchHeapType}`, canvas.width / 2 + 22, 42);
      ctx.fillText(`Addr: 0x7A4F`, canvas.width / 2 + 22, 57);
      ctx.fillText(`calcBraking() -> Dynamic Dispatch`, canvas.width / 2 + 22, 72);

      // Draw Pointer Arrow
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 2]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 15, 54);
      ctx.lineTo(canvas.width / 2 + 15, 54);
      ctx.stroke();
      ctx.setLineDash([]);

      // Dynamic Speed & Braking Metric Bar at bottom
      const brakingFactor = dispatchHeapType === 'GreenLineExpress' ? 0.75 : dispatchHeapType === 'MetroTrain' ? 1.15 : 1.6;
      const brakingDist = (simulatedSpeed * brakingFactor).toFixed(1);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(15, 90, canvas.width - 30, 32);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(15, 90, canvas.width - 30, 32);

      // Real-time dynamic braking gauge
      const barWidth = Math.min(canvas.width - 60, (Number(brakingDist) / 200) * (canvas.width - 60));
      ctx.fillStyle = dispatchHeapType === 'GreenLineExpress' ? '#10b981' : dispatchHeapType === 'MetroTrain' ? '#38bdf8' : '#f59e0b';
      ctx.fillRect(20, 95, barWidth, 6);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '9px monospace';
      ctx.fillText(`Speed: ${simulatedSpeed} km/h | Dynamic Braking Distance: ${brakingDist} m (${dispatchHeapType} algorithm)`, 20, 114);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dispatchRefType, dispatchHeapType, simulatedSpeed]);

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      speechManager.speak('Let us review the step-by-step architectural breakdown.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Exceptional deduction! You understand compiler type checking.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Java Architecture Lab. Let us explore the visual models.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Play Mode. Test type casting, constructor chains, and access rules freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering Challenge Arena. Apply your knowledge to solve Bengaluru Metro architecture problems.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the dynamic dispatch lab below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! That is the core distinction.' : 'Take another close look at the diagram.');
  }, []);

  const handleSpecifierClick = useCallback((specifier: 'public' | 'protected' | 'default' | 'private') => {
    setSelectedSpecifier(specifier);
    audioManager.play('tap');
    const audioDescriptions: Record<string, string> = {
      public: 'Public access: Open to all classes in all packages across the entire world.',
      protected: 'Protected access: Open to same package, plus subclasses in different packages.',
      default: 'Default package-private access: Strictly restricted to the same package.',
      private: 'Private access: Hidden inside the declaring class only.',
    };
    speechManager.speak(audioDescriptions[specifier]);
  }, []);

  const handleConstructorChain = useCallback((params: number) => {
    setConstructorParamCount(params);
    audioManager.play('count');
    if (params === 1) {
      setConstructorChainLog(['MetroPassenger(101)', '-> this(101, "General", 0.0)', '-> super("RollingStock_User")', '=> Initialised in Master Constructor']);
    } else if (params === 2) {
      setConstructorChainLog(['MetroPassenger(101, "Aarav")', '-> this(101, "Aarav", 0.0)', '-> super("RollingStock_User")', '=> Initialised in Master Constructor']);
    } else {
      setConstructorChainLog(['MetroPassenger(101, "Aarav", 75.0)', '-> super("RollingStock_User")', '=> Full Master Constructor Assigned Directly']);
    }
  }, []);

  const handleCastingLadderChange = useCallback((level: number) => {
    setCastingLadderLevel(level);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Architect certification complete! Final score: ${finalScore} percent.`);
  }, [errors, onComplete]);

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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent object-oriented reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Hints exhausted. Let us study the architectural solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('tap');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructAddPart = useCallback((part: string) => {
    setConstructParts(prev => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleConstructRemovePart = useCallback((index: number) => {
    setConstructParts(prev => prev.filter((_, i) => i !== index));
    audioManager.play('pop');
  }, []);

  const handleResetSimulation = useCallback(() => {
    setPhase('discovery');
    setCurrentSlide(0);
    setCurrentChallenge(0);
    setErrors(0);
    setScoreBreakdown({ correct: 0, total: 0 });
    setHitMisconceptions([]);
    audioManager.play('whoosh');
  }, []);

  // Inactivity timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-indigo-400 font-medium">
              ISC Class 11 Computer Science • Nodes: c11_cs_011 to c11_cs_020
            </p>
          </div>
        </div>

        {/* Phase Badges & Difficulty Level */}
        <div className="flex items-center gap-3">
          <motion.span 
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700' :
              difficulty === 'standard' ? 'bg-indigo-950/60 text-indigo-400 border-indigo-700' :
              'bg-purple-950/60 text-purple-400 border-purple-700'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Narrative Card */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900/80 rounded-2xl border border-indigo-800/40 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-900/60 px-3 py-1 rounded-md">
              Real-World Mission Context
            </span>
            <h2 className="text-xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
              💡 {SCENARIO.context}
            </div>
          </div>

          {/* Interactive Discovery Hook Question */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-md">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              Curiosity Discovery Puzzle
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-white mt-2 leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="mt-4 space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs mr-2 text-indigo-400">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-slate-950 rounded-xl border border-indigo-900/60"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-medium'}`}>
                  {discoveryCorrect ? '✓ Spot on! The compiler checks the declared reference type, not the runtime object.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Architecture Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Navigation & Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}:
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {EXPLORATION_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-indigo-500 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-300 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40 flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* ─── LAB STEP 0: ACCESS SPECIFIERS & SECURITY ─── */}
          {currentSlide === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Controls */}
              <div className="md:col-span-5 space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Select Access Modifier
                </h3>
                {(['public', 'protected', 'default', 'private'] as const).map((spec) => (
                  <motion.button
                    key={spec}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSpecifierClick(spec)}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-semibold transition-all border ${
                      selectedSpecifier === spec
                        ? 'bg-indigo-900/70 border-indigo-400 text-white shadow-lg'
                        : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-indigo-300">
                        {spec === 'default' ? 'default (no keyword)' : spec}
                      </span>
                      <span className="text-xs text-slate-500 font-normal">
                        {spec === 'public' ? 'Widest' : spec === 'private' ? 'Most Restrictive' : spec === 'protected' ? 'Subclass + Pkg' : 'Package Only'}
                      </span>
                    </div>
                  </motion.button>
                ))}

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-indigo-300">CISCE Key Distinction:</p>
                  <p>
                    {selectedSpecifier === 'protected'
                      ? '✓ protected opens the door to subclasses in different packages!'
                      : selectedSpecifier === 'default'
                      ? '❌ default blocks subclasses located in other packages.'
                      : selectedSpecifier === 'private'
                      ? '🔒 private is locked inside the declaring class alone.'
                      : '🌐 public is open to every class in every package.'}
                  </p>
                </div>
              </div>

              {/* Dynamic Visual Matrix (Multi-representation) */}
              <div className="md:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                  Scope Reachability Matrix: <span className="text-indigo-400 font-mono">{selectedSpecifier}</span>
                </h3>

                <svg viewBox="0 0 440 220" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800/80">
                  {/* Same Class Box */}
                  <rect x="20" y="20" width="90" height="80" rx="8" 
                    fill={selectedSpecifier !== null ? '#064e3b' : '#1e293b'} 
                    stroke="#10b981" strokeWidth="1.5" />
                  <text x="65" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Same Class</text>
                  <text x="65" y="75" textAnchor="middle" fill="#34d399" fontSize="12">✓ ALLOWED</text>

                  {/* Same Package Box */}
                  <rect x="125" y="20" width="90" height="80" rx="8" 
                    fill={selectedSpecifier !== 'private' ? '#064e3b' : '#450a0a'} 
                    stroke={selectedSpecifier !== 'private' ? '#10b981' : '#ef4444'} strokeWidth="1.5" />
                  <text x="170" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Same Package</text>
                  <text x="170" y="75" textAnchor="middle" fill={selectedSpecifier !== 'private' ? '#34d399' : '#f87171'} fontSize="12">
                    {selectedSpecifier !== 'private' ? '✓ ALLOWED' : '✗ BLOCKED'}
                  </text>

                  {/* Subclass Other Package Box */}
                  <rect x="230" y="20" width="95" height="80" rx="8" 
                    fill={selectedSpecifier === 'public' || selectedSpecifier === 'protected' ? '#064e3b' : '#450a0a'} 
                    stroke={selectedSpecifier === 'public' || selectedSpecifier === 'protected' ? '#10b981' : '#ef4444'} strokeWidth="1.5" />
                  <text x="277" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">Subclass</text>
                  <text x="277" y="63" textAnchor="middle" fill="#94a3b8" fontSize="8">(Other Package)</text>
                  <text x="277" y="82" textAnchor="middle" fill={selectedSpecifier === 'public' || selectedSpecifier === 'protected' ? '#34d399' : '#f87171'} fontSize="11" fontWeight="bold">
                    {selectedSpecifier === 'public' || selectedSpecifier === 'protected' ? '✓ ALLOWED' : '✗ BLOCKED'}
                  </text>

                  {/* World / Any Class Box */}
                  <rect x="340" y="20" width="80" height="80" rx="8" 
                    fill={selectedSpecifier === 'public' ? '#064e3b' : '#450a0a'} 
                    stroke={selectedSpecifier === 'public' ? '#10b981' : '#ef4444'} strokeWidth="1.5" />
                  <text x="380" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">World</text>
                  <text x="380" y="75" textAnchor="middle" fill={selectedSpecifier === 'public' ? '#34d399' : '#f87171'} fontSize="12">
                    {selectedSpecifier === 'public' ? '✓ ALLOWED' : '✗ BLOCKED'}
                  </text>

                  {/* Code snippet representation */}
                  <rect x="20" y="120" width="400" height="80" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="35" y="145" fill="#38bdf8" fontFamily="monospace" fontSize="10">package transit.security;</text>
                  <text x="35" y="165" fill="#e2e8f0" fontFamily="monospace" fontSize="10">
                    public class MetroFare &#123; <tspan fill="#f59e0b">{selectedSpecifier === 'default' ? '/* default */' : selectedSpecifier}</tspan> double baseFare = 45.0; &#125;
                  </text>
                  <text x="35" y="185" fill="#94a3b8" fontFamily="monospace" fontSize="9">
                    // Access from other package: {selectedSpecifier === 'public' ? '100% visible' : selectedSpecifier === 'protected' ? 'visible only to subclass' : 'inaccessible'}
                  </text>
                </svg>
              </div>
            </motion.div>
          )}

          {/* ─── LAB STEP 1: CONSTRUCTOR CHAINING & THIS/SUPER ─── */}
          {currentSlide === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-5 space-y-4">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Test Overloaded Constructors
                </h3>

                {/* Real-Time Parameter Slider */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Constructor Parameters:</span>
                    <span className="font-mono text-indigo-400 font-bold bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-700/60">
                      {constructorParamCount} Parameter{constructorParamCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={constructorParamCount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setConstructorParamCount(val);
                      handleConstructorChain(val);
                    }}
                    className="w-full accent-indigo-500 cursor-pointer"
                    aria-label="Constructor parameter count slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1: (id)</span>
                    <span>2: (id, name)</span>
                    <span>3: (id, name, balance)</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <p className="font-bold text-amber-300">Chaining Execution Path:</p>
                  {constructorChainLog.length > 0 ? (
                    constructorChainLog.map((step, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="font-mono text-indigo-300 bg-slate-950 p-2 rounded-lg border border-slate-800/80"
                      >
                        {step}
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">Drag slider above to trace constructor delegation.</p>
                  )}
                </div>
              </div>

              <div className="md:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                  Constructor Chaining Relay Race
                </h3>
                <svg viewBox="0 0 420 220" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800">
                  {/* Superclass RollingStock */}
                  <rect x="120" y="15" width="180" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="210" y="38" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">
                    Superclass: RollingStock(id)
                  </text>

                  {/* Downward arrow from super */}
                  <path d="M 210 55 L 210 75" stroke="#818cf8" strokeWidth="2" />

                  {/* 3-arg Master Constructor */}
                  <rect x="60" y="80" width="300" height="45" rx="8" 
                    fill={constructorParamCount === 3 ? '#064e3b' : '#132f25'} 
                    stroke={constructorParamCount === 3 ? '#10b981' : '#059669'} strokeWidth={constructorParamCount === 3 ? '2' : '1'} />
                  <text x="210" y="100" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                    Master: MetroPassenger(id, name, balance)
                  </text>
                  <text x="210" y="115" textAnchor="middle" fill="#6ee7b7" fontSize="9">
                    this.id=id; this.name=name; this.balance=balance;
                  </text>

                  {/* Chained smaller constructors */}
                  <rect x="30" y="155" width="160" height="45" rx="8" 
                    fill={constructorParamCount === 2 ? '#312e81' : '#1e293b'} 
                    stroke={constructorParamCount === 2 ? '#818cf8' : '#475569'} strokeWidth={constructorParamCount === 2 ? '2' : '1'} />
                  <text x="110" y="175" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">
                    MetroPassenger(id, name)
                  </text>
                  <text x="110" y="190" textAnchor="middle" fill="#f59e0b" fontSize="8">
                    this(id, name, 0.0);
                  </text>

                  <rect x="230" y="155" width="160" height="45" rx="8" 
                    fill={constructorParamCount === 1 ? '#312e81' : '#1e293b'} 
                    stroke={constructorParamCount === 1 ? '#818cf8' : '#475569'} strokeWidth={constructorParamCount === 1 ? '2' : '1'} />
                  <text x="310" y="175" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">
                    MetroPassenger(id)
                  </text>
                  <text x="310" y="190" textAnchor="middle" fill="#f59e0b" fontSize="8">
                    this(id, "Unassigned", 0.0);
                  </text>

                  {/* Upward chain arrows */}
                  <path d="M 110 155 L 150 125" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M 310 155 L 270 125" stroke="#f59e0b" strokeWidth="1.5" />
                </svg>
              </div>
            </motion.div>
          )}

          {/* ─── LAB STEP 2: DYNAMIC METHOD DISPATCH & POLYMORPHISM ─── */}
          {currentSlide === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Predict-then-check */}
              {!predictionMade ? (
                <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/60">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Predict Before You Interact
                  </span>
                  <p className="text-sm font-semibold text-white mt-1">
                    {PREDICTION_QUESTIONS[0].question}
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(i)}
                        className="text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300">
                  ✓ Prediction logged! Interact with the JVM Dispatcher below to inspect real-time binding.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Reference vs Heap Selector + Live Speed Slider */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      1. Declared Reference Type (Stack)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['RollingStock', 'MetroTrain', 'GreenLineExpress'] as const).map((t) => (
                        <motion.button
                          key={t}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDispatchRefType(t)}
                          className={`py-2 px-1 text-[11px] rounded-lg font-mono font-bold border transition-all ${
                            dispatchRefType === t
                              ? 'bg-indigo-600 border-indigo-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {t.replace('RollingStock', 'Base')}
                        </motion.button>
                      ))}
                    </div>

                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block pt-2">
                      2. Actual Object Created with `new` (Heap)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['RollingStock', 'MetroTrain', 'GreenLineExpress'] as const).map((t) => (
                        <motion.button
                          key={t}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDispatchHeapType(t)}
                          className={`py-2 px-1 text-[11px] rounded-lg font-mono font-bold border transition-all ${
                            dispatchHeapType === t
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {t.replace('RollingStock', 'Base')}
                        </motion.button>
                      ))}
                    </div>

                    {/* Real-time Slider: Velocity control */}
                    <div className="pt-2 space-y-1.5 border-t border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-300">Train Speed:</span>
                        <span className="font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                          {simulatedSpeed} km/h
                        </span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={120}
                        step={5}
                        value={simulatedSpeed}
                        onChange={(e) => setSimulatedSpeed(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Train speed dynamic dispatch slider"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>20 km/h (Slow)</span>
                        <span>70 km/h (Cruising)</span>
                        <span>120 km/h (Express)</span>
                      </div>
                    </div>
                  </div>

                  {/* Code Line Simulation */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                    <p className="text-slate-500">// Executing polymorphic method call:</p>
                    <p className="text-indigo-400 mt-1">
                      {dispatchRefType} train = new <span className="text-emerald-400">{dispatchHeapType}</span>();
                    </p>
                    <p className="text-amber-300">train.calculateBrakingDistance({simulatedSpeed});</p>
                    <p className="text-emerald-400 mt-2 font-bold">
                      =&gt; Dispatches dynamically to: {dispatchHeapType}.calculateBrakingDistance()
                    </p>
                  </div>
                </div>

                {/* Canvas JVM Memory Animation */}
                <div className="md:col-span-7 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    Live JVM Memory Architecture &amp; Dynamic Dispatch Pointer
                  </h3>
                  <canvas ref={canvasRef} width={420} height={135} className="w-full h-auto rounded-xl border border-slate-800" />
                </div>
              </div>

              {/* Observation Question */}
              {!observationAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-900 rounded-2xl border border-slate-800"
                >
                  <p className="text-sm font-semibold text-white mb-3">
                    {OBSERVATION_QUESTIONS[1].question}
                  </p>
                  <div className="space-y-2">
                    {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservation(i)}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ─── LAB STEP 3: ABSTRACT CLASSES VS INTERFACES ─── */}
          {currentSlide === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-5 space-y-4">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveContractTab('abstract')}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                      activeContractTab === 'abstract'
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    Abstract Class (Partial)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveContractTab('interface')}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                      activeContractTab === 'interface'
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    Interface (Pure Contract)
                  </motion.button>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-3">
                  <h4 className="font-bold text-indigo-300">
                    {activeContractTab === 'abstract' ? 'Abstract Class Capabilities:' : 'Interface Capabilities:'}
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {activeContractTab === 'abstract' ? (
                      <>
                        <li>✓ Can contain instance variables with state (e.g. String pnr;).</li>
                        <li>✓ Supports concrete methods with full bodies.</li>
                        <li>✓ Has constructors called via super().</li>
                        <li>✗ Single inheritance only (can extend only ONE class).</li>
                      </>
                    ) : (
                      <>
                        <li>✓ Pure contract: all methods implicitly public abstract.</li>
                        <li>✓ All variables implicitly public static final constants.</li>
                        <li>✓ Allows Multiple Inheritance: a class can implement MANY interfaces.</li>
                        <li>✗ Cannot hold instance variables or constructors.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                  Architectural Comparison Visualizer
                </h3>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  {activeContractTab === 'abstract' ? (
                    <div>
                      <p className="text-indigo-400">abstract class TransitVehicle &#123;</p>
                      <p className="pl-4 text-slate-400">// Instance state allowed:</p>
                      <p className="pl-4 text-amber-300">protected String trainId;</p>
                      <p className="pl-4 text-slate-400">// Concrete method (partial implementation):</p>
                      <p className="pl-4 text-emerald-400">public void displayId() &#123; System.out.println(trainId); &#125;</p>
                      <p className="pl-4 text-slate-400">// Abstract method (forced contract):</p>
                      <p className="pl-4 text-rose-400">public abstract void emergencyBrake();</p>
                      <p className="text-indigo-400">&#125;</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-purple-400">interface GPSNavigable, ElectricPower &#123;</p>
                      <p className="pl-4 text-slate-400">// Implicit: public static final</p>
                      <p className="pl-4 text-amber-300">double TRACK_GAUGE = 1.435; // Standard gauge</p>
                      <p className="pl-4 text-slate-400">// Implicit: public abstract</p>
                      <p className="pl-4 text-rose-400">void transmitCoordinates();</p>
                      <p className="text-purple-400">&#125;</p>
                      <p className="text-slate-400 mt-2">// Multiple interfaces implemented safely:</p>
                      <p className="text-emerald-300">class MetroTrain implements GPSNavigable, ElectricPower &#123; ... &#125;</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── LAB STEP 4: TYPE CASTING LADDER & INSTANCEOF ─── */}
          {currentSlide === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-5 space-y-4">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Type Casting Ladder Controller
                </h3>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <label className="text-xs font-semibold text-slate-300 block">
                    1. Choose Underlying Heap Object:
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['RollingStock', 'MetroTrain', 'GreenLineExpress'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setCastingActualObject(type)}
                        className={`py-1.5 px-1 text-[10px] font-mono rounded-lg border font-bold ${
                          castingActualObject === type ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {type.replace('RollingStock', 'Base')}
                      </button>
                    ))}
                  </div>

                  <label className="text-xs font-semibold text-slate-300 block pt-2">
                    2. Reference View Level: Level {castingLadderLevel} (Drag slider for instant update)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={castingLadderLevel}
                    onChange={(e) => setCastingLadderLevel(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                    aria-label="Casting level slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1: RollingStock</span>
                    <span>2: MetroTrain</span>
                    <span>3: GreenLine</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-300">instanceof Safety Guard:</span>
                    <button
                      onClick={() => setIsInstanceOfGuardActive(!isInstanceOfGuardActive)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isInstanceOfGuardActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-rose-950 text-rose-400 border border-rose-700'
                      }`}
                    >
                      {isInstanceOfGuardActive ? 'ACTIVE (Guarded)' : 'OFF (Unguarded)'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                  Inheritance Hierarchy Ladder
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className={`p-3 rounded-xl border transition-all ${castingLadderLevel === 1 ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    Level 1: RollingStock (Base Superclass) • Methods: displayInfo()
                  </div>
                  <div className={`p-3 rounded-xl border transition-all ${castingLadderLevel === 2 ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    Level 2: MetroTrain extends RollingStock • Adds: emergencyBrake()
                  </div>
                  <div className={`p-3 rounded-xl border transition-all ${castingLadderLevel === 3 ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    Level 3: GreenLineExpress extends MetroTrain • Adds: triggerRegenerativeBraking()
                  </div>
                </div>

                {/* Status Result */}
                <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  {castingLadderLevel <= (castingActualObject === 'GreenLineExpress' ? 3 : castingActualObject === 'MetroTrain' ? 2 : 1) ? (
                    <span className="text-emerald-400 font-bold">
                      ✓ SAFE CAST: The real object ({castingActualObject}) IS-A valid instance of the target reference.
                    </span>
                  ) : isInstanceOfGuardActive ? (
                    <span className="text-amber-400 font-bold">
                      🛡️ GUARDED: instanceof evaluated to FALSE. Dangerous downcast was aborted safely!
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold">
                      💥 CRASH: JVM threw ClassCastException! Cannot cast {castingActualObject} down to Level {castingLadderLevel}.
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg flex items-center gap-2"
              >
                Enter Free Exploration Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY (No Pressure) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/40 to-slate-900 rounded-2xl border border-emerald-800/40">
            <h2 className="text-xl font-bold text-white">Free Exploration Sandbox</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Manipulate class hierarchies, test wrapper autoboxing/unboxing, dynamic dispatch, and casting without grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wrapper Class Autoboxing / Parsing Lab */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                Wrapper Class Autoboxing &amp; Parse Lab
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-slate-400">// Parsing String to primitive int:</p>
                  <p className="text-indigo-300">int fare = Integer.parseInt("450");</p>
                  <p className="text-emerald-400">=&gt; returns primitive: 450</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-slate-400">// Autoboxing primitive int into Integer object:</p>
                  <p className="text-indigo-300">Integer boxedFare = 450; // Integer.valueOf(450)</p>
                  <p className="text-emerald-400">=&gt; returns Heap Object reference: 0x82FA</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-slate-400">// Character utility inspection:</p>
                  <p className="text-indigo-300">Character.isDigit('8');</p>
                  <p className="text-emerald-400">=&gt; returns boolean: true</p>
                </div>
              </div>
            </div>

            {/* Static vs Instance Context Lab */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
                Static Members &amp; Memory Layout
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-slate-400">// Static Constant shared by all trains:</p>
                  <p className="text-purple-300">public static final double MAX_DECEL = 1.3; // m/s^2</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-slate-400">// Static Import syntax shortcut:</p>
                  <p className="text-purple-300">import static java.lang.Math.PI;</p>
                  <p className="text-slate-300">double dist = PI * 2 * radius;</p>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2"
          >
            I am Ready for the Architecture Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ARENA (22 Progressive Challenges) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  Node: {challenge.nodeId}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={answerRevealed || showExplanation}
                className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-700/60 text-xs font-bold disabled:opacity-40"
              >
                💡 Hint ({hintCount}/3)
              </motion.button>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Question Box */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-semibold text-white whitespace-pre-line leading-relaxed">
              {challenge.question}
            </h3>

            {/* ─── MCQ RENDERING (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="mt-5 space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                        : wrongFlash && i !== challenge.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs mr-2 text-indigo-400">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── DRAG-LABEL CHALLENGE RENDERING ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Snippet:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700/80 hover:bg-indigo-600 rounded-lg cursor-grab text-white text-xs font-mono font-bold border border-indigo-500/50 shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((slotId) => (
                    <div
                      key={slotId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[11px] text-slate-500 font-mono">
                        {slotId.replace('slot_', '').toUpperCase()} ROLE
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300 mt-1">
                        {droppedLabels[slotId] || 'Drop matching code here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Verify Constructor Mapping →
                </motion.button>
              </div>
            )}

            {/* ─── DRAG-SORT CHALLENGE RENDERING ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange steps in the correct execution sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01, x: 2 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <span className="text-indigo-400 font-bold mr-2">{displayIdx + 1}.</span> {item}
                      </span>
                      <span className="text-slate-600 text-xs">☰ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* ─── NUMERIC CHALLENGE RENDERING ─── */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CONSTRUCT CHALLENGE RENDERING ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAddPart(part)}
                      className="px-3 py-1.5 bg-indigo-800/70 hover:bg-indigo-700 rounded-lg text-white font-mono text-xs border border-indigo-600/50"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900 text-indigo-200 rounded-lg font-mono text-xs border border-indigo-700 flex items-center gap-1.5"
                    >
                      {part}
                      <button onClick={() => handleConstructRemovePart(i)} className="text-rose-400 hover:text-rose-300">
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to assemble code declaration...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Validate Constructed Code →
                </motion.button>
              </div>
            )}

            {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─���─ */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 rounded-2xl border border-amber-700/60 space-y-3"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Step-by-Step Architectural Solution:
                </h4>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-100 leading-relaxed font-sans"
                      >
                        <span className="font-mono font-bold text-amber-400 mr-2">[{i + 1}]</span>
                        {sentence}{sentence.endsWith('.') ? '' : '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="mt-2 px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-amber-100 rounded-xl text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Architecture Exam →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl border border-indigo-700/60 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">ISC Computer Science OOP Certified!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Final Architecture Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span> • Mastery Tier: <span className="text-indigo-400 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold uppercase text-emerald-400 tracking-wider mb-2">Performance Assessment</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {errors === 0
                ? 'You have mastered all 10 Java OOP nodes with compiler-level precision!'
                : errors <= 3
                ? 'You demonstrated a rock-solid grasp of dynamic dispatch, constructors, and casting.'
                : errors <= 7
                ? 'Review your misconception profile below to polish access rules and interfaces.'
                : 'Revisit the interactive exploration labs and test constructor chains again.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold uppercase text-rose-300 tracking-wider">
                Targeted Misconception Feedback:
              </h3>
              {hitMisconceptions.map((mIdx) => {
                const item = misconceptions?.[mIdx];
                if (!item) return null;
                return (
                  <div key={mIdx} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Misconception: {item.misconception}</p>
                    <p className="text-emerald-400 font-semibold">✓ CISCE Correction: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition (SRS) Visible Schedule */}
          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/40">
            <h3 className="text-xs font-bold uppercase text-amber-400 tracking-wider mb-1">
              Spaced Repetition Schedule (SM-2)
            </h3>
            <p className="text-xs text-slate-300">
              Recommended review time:{' '}
              <span className="text-amber-300 font-bold font-mono">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
              . Regular active retrieval solidifies neural synaptic recall for board exams.
            </p>
          </div>

          {/* Real-World Final Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((s, idx) => (
                <p key={idx} className="text-xs text-slate-400 font-mono">
                  {s}
                </p>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleResetSimulation}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl"
          >
            ↺ Restart Interactive Simulation
          </motion.button>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Architecture Challenge Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_ComputerScienceJavaClassMemberSim;