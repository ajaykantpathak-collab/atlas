'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals - MUST match all covered nodes
const NODE_C7_CS_021 = 'c7_cs_021';
const NODE_C7_CS_022 = 'c7_cs_022';
const NODE_C7_CS_023 = 'c7_cs_023';
const NODE_C7_CS_024 = 'c7_cs_024';
const NODE_C7_CS_025 = 'c7_cs_025';
const ALL_NODE_IDS = [NODE_C7_CS_021, NODE_C7_CS_022, NODE_C7_CS_023, NODE_C7_CS_024, NODE_C7_CS_025];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The National Science Congress Portal & Scratch Fair Project',
  intro: 'You are the lead student web developer and Scratch programmer for the National Science Congress in New Delhi. Your mission is to build the interactive timetable portal, registration forms, procedural interactive simulations, data list trackers, and implement cyber ethics protocols.',
  context: 'Over 500 schools from Bengaluru, Mumbai, Kolkata, and Chennai are participating. You must construct valid HTML table structures, forms, Scratch block procedures with clones, data structure lists with 1-based indexing, and ensure digital citizenship rights are respected.',
};

// ─── BRILLIANT PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you change two radio buttons to have different name attributes (e.g. name="groupA" and name="groupB") instead of the same name="category", what will happen when you click both?',
    options: [
      'Selecting one will automatically deselect the other',
      'Both radio buttons can be selected at the same time',
      'The browser will disable both buttons',
      'The form will throw an automatic validation error'
    ],
    correctIndex: 1,
    explanation: 'When radio buttons have different name attributes, the browser treats them as separate independent groups, allowing both to be selected simultaneously.',
    verifyInstruction: 'Go to Lab 2 (Form Input Simulator), switch to "Different names (Broken Behavior)", and click both options to verify!'
  },
  {
    id: 'pred_2',
    question: 'In a Scratch list of 4 cities (1: Delhi, 2: Mumbai, 3: Kolkata, 4: Chennai), if you delete item 2 (Mumbai), what will happen to the index of Kolkata?',
    options: [
      'Kolkata stays at index 3 and index 2 becomes empty/null',
      'Kolkata automatically shifts up to become index 2',
      'Kolkata is also deleted automatically',
      'The list reverses its order'
    ],
    correctIndex: 1,
    explanation: 'In Scratch dynamic lists, deleting an item immediately causes all subsequent elements to shift up by 1 position.',
    verifyInstruction: 'Go to Lab 4 (Scratch List Inspector), click "delete" next to Mumbai (#2), and observe Kolkata\'s new index position!'
  }
];

// ─── BRILLIANT OBSERVATION QUESTIONS ('What do you notice?' Pattern) ───
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In the HTML Table Architecture Lab, what visual changes occur to the header cells when you toggle from <td> to "Semantic <th> Active"?',
    observableOptions: [
      'The text automatically becomes bold and centered in each cell',
      'The text turns red and italicized with a green background',
      'The entire row disappears from view',
      'The borders turn into double dotted lines'
    ],
    correctIndex: 0,
    explanation: 'By default, browser user-agent stylesheets automatically render <th> tags with bold font-weight and centered text alignment.'
  },
  {
    id: 'obs_2',
    question: 'In the String Operations Evaluator, when you measure the length of "Science Congress 2026", what do you notice about how spaces are counted?',
    observableOptions: [
      'Spaces are completely ignored and not counted in the string length',
      'Each space is counted as 1 full character position in the length calculation',
      'Spaces count as 2 characters each',
      'Scratch raises a syntax error when strings contain spaces'
    ],
    correctIndex: 1,
    explanation: 'In Scratch and computational string processing, whitespace characters occupy real memory indices and count toward the total string length.'
  }
];

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In an HTML document, what happens if you place a <td> or <th> tag directly inside a <table> without wrapping it inside a <tr> (table row)?',
  options: [
    'The browser automatically creates vertical columns without rows',
    'The table structure breaks or behaves unpredictably because cells must live inside rows',
    'The text turns into bold header titles automatically',
    'It creates a multi-page form input field'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: HTML tables follow strict container nesting: Table -> Row -> Cell (td/th). Let us explore how it works visually!',
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

// ─── 22 CHALLENGES (foundation, standard, advanced with NEP 2020 competencies) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_001_tab_nest',
    nodeId: NODE_C7_CS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which tag serves as the mandatory outer container for defining an entire HTML table?',
    options: ['<tr>', '<table>', '<td>', '<th>'],
    correctIndex: 1,
    explanation: 'The <table> tag is the outermost container. All rows (<tr>) and cells (<td>, <th>) must be nested within <table> and </table>.',
    hints: [
      'Look for the tag that represents the entire grid fence.',
      'It shares the exact word of the structure you are creating.',
      'It opens with <table> and closes with </table>.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_002_th_td_diff',
    nodeId: NODE_C7_CS_021,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a browser visually and semantically distinguish a <th> cell from a <td> cell by default?',
    options: [
      '<th> is italic and left-aligned; <td> is underlined',
      '<th> is bold and centered; <td> is normal font and left-aligned',
      '<th> has a colored red background; <td> is transparent',
      'There is no visual or semantic difference whatsoever'
    ],
    correctIndex: 1,
    explanation: 'By default, browsers render <th> (table header) text in bold weight and centered alignment to signal column or row labels.',
    hints: [
      'Think about how column headings look in a printed marksheet.',
      'Header tags are made prominent without requiring custom styling.',
      'They appear bold and centered in each cell.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_003_drag_table_labels',
    nodeId: NODE_C7_CS_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Drag the correct HTML table components to their exact positions in the hierarchy diagram.',
    dragItems: [
      { label: '<table> (Outer Container)', targetId: 'target_outer' },
      { label: '<tr> (Row 1)', targetId: 'target_row1' },
      { label: '<th> (Header: Subject)', targetId: 'target_cell1' },
      { label: '<td> (Data: 95)', targetId: 'target_cell2' }
    ],
    correctMapping: {
      target_outer: '<table> (Outer Container)',
      target_row1: '<tr> (Row 1)',
      target_cell1: '<th> (Header: Subject)',
      target_cell2: '<td> (Data: 95)'
    },
    explanation: 'Nesting hierarchy is strictly: <table> contains <tr>, which in turn wraps <th> for headings and <td> for data values.',
    hints: [
      'The topmost envelope is the table container.',
      'Inside the table, horizontal rows come next.',
      'Headers label columns while data cells store actual values.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_004_form_input_types',
    nodeId: NODE_C7_CS_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which HTML input element creates a single-line text entry box for typing a student name?',
    options: ['<input type="radio">', '<input type="checkbox">', '<input type="text">', '<input type="submit">'],
    correctIndex: 2,
    explanation: '<input type="text"> generates a single-line blank area where users can type alphanumeric text.',
    hints: [
      'Look for the input type that matches ordinary written words.',
      'It is not a toggle button or multi-select tick box.',
      'The attribute is type="text".'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_005_radio_grouping',
    nodeId: NODE_C7_CS_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'To allow a user to pick ONLY ONE grade category (e.g., Junior or Senior), what attribute must all radio buttons in that group share?',
    options: ['Same value attribute', 'Same name attribute', 'Same id attribute', 'Same placeholder attribute'],
    correctIndex: 1,
    explanation: 'Radio buttons belong to the same mutually exclusive group only when they share the exact same name attribute.',
    hints: [
      'The browser needs an identifier to know they belong to one single question.',
      'Values must differ so the server knows which was chosen, but the group tag is identical.',
      'They must share the same name attribute.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_006_scratch_clone_block',
    nodeId: NODE_C7_CS_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Scratch 3.0, which hat block runs scripts specifically when a new clone is spawned?',
    options: ['when green flag clicked', 'when I start as a clone', 'create clone of myself', 'when key pressed'],
    correctIndex: 1,
    explanation: 'The "when I start as a clone" hat block executes the initialization and action scripts for newly spawned clones.',
    hints: [
      'Look for the block that acts as an event receiver for clones.',
      'It is a curved hat block in the Control category.',
      'It starts with "when I start as a clone".'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_007_scratch_list_index1',
    nodeId: NODE_C7_CS_024,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Scratch, what is the index number of the very first item in a list called "MetroCities"?',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'index',
    explanation: 'Scratch lists and string positions use 1-based indexing. The first element is always at index 1 (not index 0).',
    hints: [
      'Unlike Python or C++, Scratch is designed for beginners.',
      'Counting starts naturally from the first counting number.',
      'The first index is 1.'
    ],
    misconceptionIndex: 6
  },

  // Standard Tier (8-15)
  {
    id: 'ch_008_table_border_syntax',
    nodeId: NODE_C7_CS_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student at an ICSE school in Kolkata wants visible gridlines with thickness 2. Which is the valid HTML syntax?',
    options: ['<table border="2">', '<border size="2"><table>', '<table><border>2</border></table>', '<table grid="true" thickness="2">'],
    correctIndex: 0,
    explanation: 'border is an attribute of the <table> tag, written inside the opening tag as <table border="2">.',
    hints: [
      'Border is an attribute, never a standalone HTML tag.',
      'Attributes are written inside the opening tag.',
      'The syntax is <table border="2">.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_009_checkbox_vs_radio',
    nodeId: NODE_C7_CS_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A science exhibition registration form in Bengaluru asks students to select which workshop sessions they want to attend (they may pick multiple). Which input type should be used?',
    options: [
      'type="radio" because options are circular',
      'type="checkbox" because each box is independent allowing multiple selections',
      'type="submit" because it sends sessions directly',
      'type="text" because users must type every session name'
    ],
    correctIndex: 1,
    explanation: 'Checkboxes are independent controls designed for zero, one, or multiple choices. Radio buttons enforce a single exclusive choice.',
    hints: [
      'Can a student attend more than one workshop?',
      'Radio allows only 1 option; checkboxes allow multi-select.',
      'Use type="checkbox".'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_010_scratch_param_binding',
    nodeId: NODE_C7_CS_023,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student creates a custom block "drawSquare (side)" but hardcodes "move 50 steps" inside the definition. What will happen when "drawSquare (120)" is called?',
    options: [
      'It draws a square of side 120 because the parameter overrides the block',
      'It still draws a square of side 50 because the parameter bubble was not dragged into the move block',
      'Scratch shows a syntax error and stops',
      'It draws a rectangle of 50 by 120'
    ],
    correctIndex: 1,
    explanation: 'Parameters must be dragged from the definition hat into inner blocks. Hardcoded literals ignore arguments passed during block calls.',
    hints: [
      'Did the code inside the block actually use the parameter bubble?',
      'If literal "50" remains inside the move block, it always moves 50.',
      'It draws side 50 regardless of the call argument.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_011_list_delete_shift',
    nodeId: NODE_C7_CS_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'List "Cities" has: 1: Delhi, 2: Mumbai, 3: Kolkata, 4: Chennai. If you run "delete 2 of Cities", what is the new index of Chennai?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'index',
    explanation: 'Deleting item 2 (Mumbai) causes all subsequent items to shift up by 1 position. Kolkata becomes item 2, and Chennai becomes item 3.',
    hints: [
      'Notice what happens to items located after the deleted item.',
      'Kolkata was 3, Chennai was 4.',
      'After removing index 2, Chennai shifts from 4 down to 3.'
    ],
    misconceptionIndex: 6
  },
  {
    id: 'ch_012_string_join_spaces',
    nodeId: NODE_C7_CS_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the exact result of running the Scratch block: [join (Jai) (Hind)]?',
    options: ['Jai Hind', 'JaiHind', 'Jai-Hind', 'Jai_Hind'],
    correctIndex: 1,
    explanation: 'The join block concatenates strings exactly character-by-character without inserting automatic spaces. To get "Jai Hind", a space character must be explicitly joined.',
    hints: [
      'Does Scratch insert invisible spaces between joined strings?',
      'Concatenation simply glues string characters together.',
      'It produces "JaiHind" without spaces.'
    ],
    misconceptionIndex: 7
  },
  {
    id: 'ch_013_fair_use_vs_infringement',
    nodeId: NODE_C7_CS_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A Class 7 student downloads an entire commercial music album and puts it on their public school website for background music. Is this protected under Fair Use?',
    options: [
      'Yes, because it is on an educational school website',
      'No, because fair use only allows limited portions for non-commercial educational critique/study, not copying full works',
      'Yes, as long as the student typed the band name in the footer',
      'Yes, because anything on the internet is public domain'
    ],
    correctIndex: 1,
    explanation: 'Fair use is a narrow exception allowing small portions for educational commentary. Copying entire creative works without license constitutes copyright infringement.',
    hints: [
      'Does educational use grant unlimited permission to copy entire albums or movies?',
      'Giving credit does not excuse taking entire proprietary works.',
      'It is copyright infringement because full works exceed fair use limits.'
    ],
    misconceptionIndex: 8
  },
  {
    id: 'ch_014_drag_sort_table_code',
    nodeId: NODE_C7_CS_021,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange these HTML lines in the correct syntactic order to render a 1-row table with a header cell.',
    sortItems: [
      '<table border="1">',
      '<tr>',
      '<th>Science Project</th>',
      '</tr>',
      '</table>'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Proper HTML nesting opens <table>, opens <tr>, places <th> cell contents, closes </tr>, and closes </table>.',
    hints: [
      'Begin with opening table tag.',
      'Create row before inserting cell.',
      'Close tags in exact reverse order of opening.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_015_construct_form_code',
    nodeId: NODE_C7_CS_022,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct a complete submit input element with the display label "Register".',
    availableParts: ['<input', 'type="submit"', 'value="Register"', 'name="btn"', '>'],
    targetState: '<input type="submit" value="Register" >',
    validationHint: 'Assemble: <input + type="submit" + value="Register" + >',
    explanation: '<input type="submit" value="Register"> creates a functional button labeled "Register" that submits the form.',
    hints: [
      'Start with the tag opening <input.',
      'Specify the input type as submit.',
      'Add value="Register" to define the button caption, then close with >.'
    ],
    misconceptionIndex: 3
  },

  // Advanced Tier (16-22)
  {
    id: 'ch_016_string_length_spaces',
    nodeId: NODE_C7_CS_024,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Scratch, what is the output value of [length of (New Delhi)]?',
    correctAnswer: 9,
    tolerance: 0,
    unit: 'characters',
    explanation: '"New" (3 letters) + space (1 character) + "Delhi" (5 letters) = 9 total characters. Spaces are counted as characters.',
    hints: [
      'Count every single letter in New and Delhi.',
      'Do not forget to count the space in the middle as 1 character.',
      '3 + 1 + 5 = 9 characters.'
    ],
    misconceptionIndex: 7
  },
  {
    id: 'ch_017_clone_vs_sprite_dup',
    nodeId: NODE_C7_CS_023,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is using "create clone of myself" with custom procedures superior to duplicating a sprite 20 times in the sprite panel?',
    options: [
      'Clones run faster in browser tabs',
      'Duplicating sprites requires changing 20 identical scripts on any bug fix; clones share one master script dynamically',
      'Clones can only move in diagonal lines',
      'Scratch disables projects with more than 3 sprites'
    ],
    correctIndex: 1,
    explanation: 'Clones inherit the master sprite logic dynamically, promoting maintainability, abstraction, and memory efficiency compared to manual duplicate sprites.',
    hints: [
      'Think about code maintenance: what happens if the movement logic needs an update?',
      'Managing 20 identical scripts manually leads to errors and redundancy.',
      'Clones share one master definition, making debugging straightforward.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_018_digital_ethics_case',
    nodeId: NODE_C7_CS_025,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Riya takes a photo of an art competition winner without consent and posts it to social media with derogatory mocking captions. Which two cyber ethics principles are violated?',
    options: [
      'Copyright Act registration and server domain ownership',
      'Right to privacy (consent for image sharing) and respectful digital communication (anti-cyberbullying)',
      'Open-source software license and HTML table validation',
      'Browser cookie permissions and Fair Use quotation quotas'
    ],
    correctIndex: 1,
    explanation: 'Responsible digital citizenship requires respecting personal privacy (obtaining consent before posting photos) and communicating respectfully without harassment.',
    hints: [
      'Did she have permission to publish the photo?',
      'How does posting mocking comments affect the student community?',
      'It violates personal privacy and respectful online behavior.'
    ],
    misconceptionIndex: 8
  },
  {
    id: 'ch_019_plagiarism_vs_infringement',
    nodeId: NODE_C7_CS_025,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do Plagiarism and Copyright Infringement fundamentally differ in computer ethics?',
    options: [
      'Plagiarism is an ethical breach of presenting another\'s ideas as your own without credit; copyright infringement is a legal violation of unauthorized copying/distribution',
      'Plagiarism applies only to printed books; copyright infringement applies only to internet videos',
      'Plagiarism is a criminal offense under IT Act; copyright has no legal backing in India',
      'They are 100% synonymous terms with zero legal or ethical distinction'
    ],
    correctIndex: 0,
    explanation: 'Plagiarism is claiming someone else\'s work as your own (academic dishonesty). Copyright infringement is using protected material without legal rights or permission.',
    hints: [
      'Giving credit fixes plagiarism, but does it automatically authorize copyright use?',
      'One is an academic/ethical rule regarding attribution; the other is intellectual property law.',
      'Plagiarism is about claiming authorship; infringement is about violating legal copying rights.'
    ],
    misconceptionIndex: 8
  },
  {
    id: 'ch_020_table_cell_count_calc',
    nodeId: NODE_C7_CS_021,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An ICSE exam timetable table has 1 header row with 4 <th> cells and 5 schedule rows each containing 4 <td> cells. How many total cell tags (<th> + <td>) exist in the code?',
    correctAnswer: 24,
    tolerance: 0,
    unit: 'cells',
    explanation: 'Header row = 4 cells (<th>). 5 data rows × 4 cells (<td>) = 20 cells. Total = 4 + 20 = 24 cells.',
    hints: [
      'Calculate header cells: 1 row × 4.',
      'Calculate data cells: 5 rows × 4.',
      'Add them together: 4 + 20 = 24.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_021_scratch_letter_of_calc',
    nodeId: NODE_C7_CS_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What is the output of Scratch block: [letter 4 of (Kolkata)]?',
    options: ['l', 'k', 'o', 'a'],
    correctIndex: 1,
    explanation: 'In "Kolkata": 1=\'K\', 2=\'o\', 3=\'l\', 4=\'k\', 5=\'a\', 6=\'t\', 7=\'a\'. The 4th letter is \'k\'.',
    hints: [
      'Remember Scratch uses 1-based indexing.',
      'Count 1(K), 2(o), 3(l), 4(k)...',
      'The 4th letter is \'k\'.'
    ],
    misconceptionIndex: 6
  },
  {
    id: 'ch_022_cyber_pledge_formulation',
    nodeId: NODE_C7_CS_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'When creating an ethical digital research project on Indian monuments, which workflow is 100% compliant with copyright and digital citizenship?',
    options: [
      'Download high-res images, remove watermarks with editor, and present as own photography',
      'Use small educational image snippets, rewrite travel text in own words, provide full citations/sources, and respect Fair Use boundaries',
      'Copy entire Wikipedia paragraphs verbatim and omit attribution so slides look cleaner',
      'Share download links to pirated software in the class study group'
    ],
    correctIndex: 1,
    explanation: 'Proper digital citizenship combines Fair Use snippet selection, original phrasing, and accurate attribution of all media sources.',
    hints: [
      'Look for the option promoting honesty, original synthesis, and clear credit.',
      'Avoid taking full assets or claiming others\' work as your own.',
      'Rephrasing, using small snippets under Fair Use, and citing sources is the gold standard.'
    ],
    misconceptionIndex: 8
  }
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
  nodeId: NODE_C7_CS_021,
  title: 'HTML Tables, Forms, Scratch Blocks & Cyber Ethics',
  definition: 'An integrated computing curriculum covering structural HTML tables (table, tr, td, th), interactive forms (text, radio, checkbox, submit), Scratch procedural custom blocks and clones, list data structures with 1-based indexing and string operations, and cyber ethics including copyright, fair use, and digital citizenship.',
  eli5: 'Think of web pages like structured school timetables and interactive forms, Scratch scripts like smart recipe blocks that can photocopy helpers, and internet ethics like being a kind, honest friend in a digital town.',
  misconceptions: [
    { misconception: 'Using <td> for headings is fine because browsers show the table anyway', correction: '<th> is semantically essential and renders text bold and centered to identify column/row headers.' },
    { misconception: '<td> or <th> can sit directly inside <table> without <tr>', correction: 'HTML requires cells to be strictly wrapped inside a <tr> (table row) container.' },
    { misconception: 'border is an independent HTML tag like <border>1</border>', correction: 'border is an attribute of the <table> tag: <table border="1">.' },
    { misconception: 'name and value attributes on input tags do the exact same thing', correction: 'type defines the widget, name identifies the field to the server, and value is the actual submitted data.' },
    { misconception: 'Radio buttons and checkboxes can be swapped freely as they are just visual shapes', correction: 'Radio buttons (sharing same name) allow exactly one choice; checkboxes are independent multi-select toggles.' },
    { misconception: 'Clones are totally detached sprites that do not share original code', correction: 'Clones dynamically inherit the original master sprite\'s scripts and costumes like twins sharing DNA.' },
    { misconception: 'Scratch lists and strings count from index 0 like C++ or Python', correction: 'Scratch uses 1-based indexing; the first item or character is always at index 1.' },
    { misconception: 'The Scratch join block automatically places a space between words', correction: 'join glues characters together directly; spaces must be explicitly provided as separate characters.' },
    { misconception: 'Anything published on Google or the web is free to copy and use without permission', correction: 'Online creative works are automatically protected by copyright; use requires permission or narrow Fair Use with credit.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the outer container tag for an HTML table?', options: ['<tr>', '<table>', '<td>', '<th>'], correctIndex: 1 },
    { question: 'Which tag is used for bold, centered header cells in a table?', options: ['<td>', '<th>', '<tr>', '<head>'], correctIndex: 1 },
    { question: 'Which input type should you use when students can pick multiple hobbies?', options: ['radio', 'text', 'checkbox', 'submit'], correctIndex: 2 },
    { question: 'What must radio buttons share to act as a single-choice group?', options: ['value', 'name', 'id', 'class'], correctIndex: 1 },
    { question: 'Which block runs code when a new clone appears in Scratch?', options: ['when green flag clicked', 'when I start as a clone', 'clone sprite', 'repeat clone'], correctIndex: 1 },
    { question: 'In Scratch, what is the index of the first item in any list?', options: ['0', '1', '-1', 'null'], correctIndex: 1 },
    { question: 'What is the length of the string "ICSE Class 7" in Scratch?', options: ['10', '11', '12', '9'], correctIndex: 2 },
    { question: 'What is the legal right protecting original creators in India under the 1957 Act?', options: ['Patent', 'Copyright', 'Trademark', 'Domain'], correctIndex: 1 }
  ],
  masteryCriteria: 'Mastery of HTML table hierarchy, form inputs, Scratch custom procedures, list data structures (1-based), and cyber ethics principles.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. HTML Table Architecture Lab',
    instruction: 'Adjust table borders, toggle header rows, and observe real-time browser table rendering.',
    interactionType: 'table-builder',
    nodeId: NODE_C7_CS_021
  },
  {
    title: '2. Form Input & Radio Group Simulator',
    instruction: 'Test single-choice radio grouping vs multi-choice checkboxes in real-time.',
    interactionType: 'form-tester',
    nodeId: NODE_C7_CS_022
  },
  {
    title: '3. Scratch Clone & Procedure Spawner',
    instruction: 'Spawn dynamic sprite clones and adjust procedure speed parameters to see runtime duplication.',
    interactionType: 'scratch-spawner',
    nodeId: NODE_C7_CS_023
  },
  {
    title: '4. Scratch List & String Inspector',
    instruction: 'Add/delete list items and watch 1-based index shifting and string character counts in real-time.',
    interactionType: 'list-string-lab',
    nodeId: NODE_C7_CS_024
  },
  {
    title: '5. Cyber Ethics & Fair Use Validator',
    instruction: 'Evaluate online media scenarios and determine if they respect Copyright, Fair Use, or constitute Infringement.',
    interactionType: 'ethics-evaluator',
    nodeId: NODE_C7_CS_025
  }
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Capstone: Science Congress Portal Architect',
  description: 'Design the full event timetable table (with <th> headers for Time, Hall, Speaker), registration form (name, single-choice grade via radio, multi-choice events via checkboxes), write a Scratch clone animation script for falling confetti sparks, and author a 4-point Digital Citizenship Pledge for all attendees.',
  steps: [
    'Draft a 3x3 timetable table using strict table > tr > (th/td) nesting and border="1"',
    'Build a registration form ensuring all radio inputs share name="category"',
    'Create a Scratch procedure "spawnSparks (speed)" with a repeat clone loop',
    'Write a 4-point Cyber Ethics code of conduct regarding photo consent and attribution'
  ]
};

// ─── MAIN COMPONENT ───
function C7_ComputerScienceHtmlTablesTableSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_CS_021,
  title = DEFAULT_PROPS.title || 'HTML Tables, Forms, Scratch & Cyber Ethics',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['computerscience'] || { name: 'Computer Science', emoji: '💻', color: 'cyan' };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Predict-Then-Check State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionFeedback, setPredictionFeedback] = useState<Record<string, boolean>>({});

  // Brilliant Observation State
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationFeedback, setObservationFeedback] = useState<Record<string, boolean>>({});

  // Brilliant Exploration Interactive State
  const [tableBorder, setTableBorder] = useState(1);
  const [tableUseHeaders, setTableUseHeaders] = useState(true);
  const [selectedCity, setSelectedCity] = useState<'Delhi' | 'Mumbai' | 'Kolkata' | 'Chennai'>('Delhi');
  const [activeTabVisual, setActiveTabVisual] = useState<'code' | 'render' | 'dom'>('render');

  // Form tester state
  const [formRadioNameGroup, setFormRadioNameGroup] = useState<'matched' | 'mismatched'>('matched');
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [radio1Checked, setRadio1Checked] = useState(false);
  const [radio2Checked, setRadio2Checked] = useState(false);
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>({ setup: false, banner: true, chairs: false });

  // Scratch spawner state
  const [cloneCount, setCloneCount] = useState(3);
  const [cloneSpeedParam, setCloneSpeedParam] = useState(5);
  const [clonesList, setClonesList] = useState<{ id: number; x: number; y: number; speed: number }[]>([
    { id: 1, x: 50, y: 40, speed: 5 },
    { id: 2, x: 150, y: 70, speed: 5 },
    { id: 3, x: 250, y: 30, speed: 5 }
  ]);

  // Scratch list & string lab state
  const [scratchListItems, setScratchListItems] = useState<string[]>(['New Delhi', 'Mumbai', 'Kolkata', 'Chennai']);
  const [newListItemText, setNewListItemText] = useState('');
  const [testString, setTestString] = useState('Science Congress 2026');
  const [inspectCharIndex, setInspectCharIndex] = useState(1);

  // Ethics scenario tester
  const [ethicsJudgments, setEthicsJudgments] = useState<Record<number, string>>({});

  // Challenge execution state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty via BKT
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

  // HTML <canvas> particle system for Scratch Clone simulation visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];

    for (let i = 0; i < cloneCount * 8; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (cloneSpeedParam * 0.4),
        vy: (Math.random() - 0.5) * (cloneSpeedParam * 0.4),
        color: i % 2 === 0 ? '#38bdf8' : '#818cf8',
        size: Math.random() * 3 + 2
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      // Draw code badge
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`Active Clones: ${cloneCount} | Speed: ${cloneSpeedParam}`, 12, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [cloneCount, cloneSpeedParam, phase, currentSlide]);

  // Escalating hints callback
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the complete step-by-step solution.');
    }
  }, [hintCount, challenge]);

  // Reset auto-hint inactivity timer (10s)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Handlers for discovery & navigation
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent deduction! Let us master the full stack.');
    } else {
      audioManager.play('pop');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handlePredictionAnswer = useCallback((predId: string, optionIndex: number) => {
    const q = PREDICTION_QUESTIONS.find(p => p.id === predId);
    if (!q) return;
    const isCorrect = optionIndex === q.correctIndex;
    setPredictionAnswers(prev => ({ ...prev, [predId]: optionIndex }));
    setPredictionFeedback(prev => ({ ...prev, [predId]: isCorrect }));
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Great prediction! Now verify it inside the simulation.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Interesting hypothesis. Test it in the lab to verify!');
    }
  }, []);

  const handleObservationAnswer = useCallback((obsId: string, optionIndex: number) => {
    const q = OBSERVATION_QUESTIONS.find(o => o.id === obsId);
    if (!q) return;
    const isCorrect = optionIndex === q.correctIndex;
    setObservationAnswers(prev => ({ ...prev, [obsId]: optionIndex }));
    setObservationFeedback(prev => ({ ...prev, [obsId]: isCorrect }));
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot-on observation!');
    } else {
      audioManager.play('error');
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Exploration Lab. Interact with each simulation component to learn.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode unlocked. Freely test and build without grading pressures.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase activated. Solve problems across foundation, standard, and advanced tiers.');
  }, []);

  // Exploration lab handlers
  const handleAddScratchListItem = useCallback(() => {
    if (!newListItemText.trim()) return;
    setScratchListItems(prev => [...prev, newListItemText.trim()]);
    setNewListItemText('');
    audioManager.play('pop');
  }, [newListItemText]);

  const handleDeleteScratchListItem = useCallback((indexToDelete: number) => {
    setScratchListItems(prev => prev.filter((_, idx) => idx !== indexToDelete));
    audioManager.play('whoosh');
  }, []);

  const handleSpawnClone = useCallback(() => {
    const newId = clonesList.length + 1;
    setClonesList(prev => [
      ...prev,
      {
        id: newId,
        x: Math.floor(Math.random() * 260) + 20,
        y: Math.floor(Math.random() * 100) + 20,
        speed: cloneSpeedParam
      }
    ]);
    setCloneCount(c => c + 1);
    audioManager.play('sparkle');
    setSparklePos({ x: 200, y: 150 });
    setShowSparkle(true);
  }, [clonesList.length, cloneSpeedParam]);

  const handleClearClones = useCallback(() => {
    setClonesList([]);
    setCloneCount(0);
    audioManager.play('pop');
  }, []);

  // Completion Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding achievement! You have mastered HTML, Scratch, and Cyber Ethics.');
  }, [errors, onComplete]);

  // Next Challenge Handler
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

  // Universal Answer Handler
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
      const cleanedAnswer = typeof answer === 'string' ? answer.trim() : '';
      const cleanedTarget = challenge.targetState ? challenge.targetState.trim() : '';
      isCorrect = cleanedAnswer === cleanedTarget;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding problem solving.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('All hints used. Review the complete code explanation below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Drag-and-drop handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // Drag-sort handlers
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans selection:bg-gold-500 selection:text-white">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-900/30"
            aria-label="Computer Science icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-950 text-gold-400 border border-gold-800 font-mono">
                ICSE Class 7 CS
              </span>
              <span className="text-xs text-slate-400 font-mono">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Adaptive Status */}
        <div className="flex items-center gap-2" role="navigation" aria-label="Simulation Phase Indicator">
          {['discovery', 'explore', 'sandbox', 'challenge', 'complete'].map((pName) => (
            <motion.div
              key={pName}
              animate={{ opacity: phase === pName ? 1 : 0.4, scale: phase === pName ? 1.05 : 0.95 }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all border ${
                phase === pName
                  ? 'bg-gold-500/20 text-gold-300 border-gold-500/50 shadow-md shadow-gold-500/10'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              {pName}
            </motion.div>
          ))}
        </div>
      </header>

      {/* ─── PHASE 1: DISCOVERY HOOK & BRILLIANT PREDICTIONS ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-gold-950/40 rounded-2xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              Event Simulation Briefing
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-gold-900/40 text-xs text-gold-300">
              ⚡ <strong>Your Goal:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Question */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
            <span className="text-xs font-mono uppercase text-amber-400 bg-amber-950/50 px-2 py-1 rounded border border-amber-800">
              Curiosity Hook • Pre-Exploration
            </span>
            <p className="text-lg font-semibold text-white mt-3 mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  animate={wrongShake && discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-lg bg-slate-800 text-center leading-6 text-xs font-mono font-bold mr-2 text-gold-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 mr-1.5">✓</span>}
                  {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 mr-1.5">✗</span>}
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ 🎯 Great deduction!' : '✗ 💡 Let\'s find out why!'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-900/40 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Brilliant Predict-Then-Check Section */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-gold-900/50 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-gold-400 bg-gold-950/60 px-2.5 py-1 rounded border border-gold-800">
                🔮 Brilliant Predict-Then-Check Hypotheses
              </span>
              <span className="text-xs text-slate-400">Make predictions before testing in the live simulator</span>
            </div>

            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pred, pIdx) => {
                const userSelected = predictionAnswers[pred.id];
                const hasAnswered = userSelected !== undefined;
                return (
                  <div key={pred.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-sm font-bold text-slate-200">
                      <span className="text-gold-400 font-mono mr-2">Prediction #{pIdx + 1}:</span>
                      {pred.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pred.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={hasAnswered}
                          onClick={() => handlePredictionAnswer(pred.id, optIdx)}
                          className={`p-2.5 text-left text-xs rounded-lg transition-all border ${
                            hasAnswered
                              ? optIdx === pred.correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : optIdx === userSelected
                                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                : 'bg-slate-900/40 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                          }`}
                        >
                          <span className="font-mono text-gold-400 mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>

                    {hasAnswered && (
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                        <p className={predictionFeedback[pred.id] ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          {predictionFeedback[pred.id] ? '✓ Accurate Hypothesis!' : '⚡ Hypothesis Recorded!'}
                        </p>
                        <p className="text-slate-300">{pred.explanation}</p>
                        <p className="text-gold-300 font-medium">🔬 <strong>How to Verify:</strong> {pred.verifyInstruction}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Tab Bar */}
          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-800" role="tablist" aria-label="Lab Modules">
            {EXPLORATION_STEPS.map((step, sIdx) => (
              <motion.button
                key={sIdx}
                role="tab"
                aria-selected={currentSlide === sIdx}
                aria-label={step.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(sIdx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === sIdx
                    ? 'bg-gold-600 text-white border-gold-400 shadow-md shadow-gold-900/30'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                }`}
              >
                {step.title.split('.')[0]}. {step.title.split('.')[1]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-gold-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/40">
                👉 <strong>Instruction:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* SLIDE 0: HTML TABLE ARCHITECTURE LAB (SVG #1: Table DOM Tree) */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <label htmlFor="table-border-slider" className="text-xs font-bold text-slate-300">Border Thickness: {tableBorder}px</label>
                        <input
                          id="table-border-slider"
                          type="range"
                          min={0}
                          max={6}
                          value={tableBorder}
                          aria-label="Table border slider"
                          onChange={(e) => {
                            setTableBorder(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-40 accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Header Cell Mode (th vs td):</span>
                        <motion.button
                          aria-label="Toggle table header mode"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setTableUseHeaders(!tableUseHeaders);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            tableUseHeaders
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-900/60 text-rose-300 border border-rose-700'
                          }`}
                        >
                          {tableUseHeaders ? '✓ Semantic <th> Active' : '✗ Weak <td> for Headers'}
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                        <span className="text-xs text-slate-400">Select City Data:</span>
                        {(['Delhi', 'Mumbai', 'Kolkata', 'Chennai'] as const).map(city => (
                          <motion.button
                            key={city}
                            aria-label={`Select city ${city}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedCity(city);
                              audioManager.play('tap');
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-mono ${
                              selectedCity === city
                                ? 'bg-gold-600 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {city}
                          </motion.button>
                        ))}
                      </div>

                      {/* SVG Diagram 1: DOM Tree Representation */}
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <p className="text-[11px] font-mono text-gold-400 mb-2">SVG Diagram 1 • HTML Table Tree Hierarchy:</p>
                        <svg viewBox="0 0 360 130" className="w-full" aria-label="HTML Table DOM Tree Diagram" role="img">
                          <rect x="130" y="5" width="100" height="24" rx="4" fill="#0369a1" />
                          <text x="180" y="21" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">&lt;table border="{tableBorder}"&gt;</text>
                          <line x1="180" y1="29" x2="80" y2="55" stroke="#475569" strokeWidth="2" />
                          <line x1="180" y1="29" x2="280" y2="55" stroke="#475569" strokeWidth="2" />
                          <rect x="40" y="55" width="80" height="22" rx="4" fill="#4338ca" />
                          <text x="80" y="70" textAnchor="middle" fill="#fff" fontSize="10">Row 1 &lt;tr&gt;</text>
                          <rect x="240" y="55" width="80" height="22" rx="4" fill="#4338ca" />
                          <text x="280" y="70" textAnchor="middle" fill="#fff" fontSize="10">Row 2 &lt;tr&gt;</text>
                          <line x1="80" y1="77" x2="50" y2="98" stroke="#475569" strokeWidth="1.5" />
                          <line x1="80" y1="77" x2="110" y2="98" stroke="#475569" strokeWidth="1.5" />
                          <rect x="20" y="98" width="55" height="20" rx="3" fill={tableUseHeaders ? "#059669" : "#e11d48"} />
                          <text x="47" y="112" textAnchor="middle" fill="#fff" fontSize="9">{tableUseHeaders ? "<th> City" : "<td> City"}</text>
                          <rect x="85" y="98" width="55" height="20" rx="3" fill={tableUseHeaders ? "#059669" : "#e11d48"} />
                          <text x="112" y="112" textAnchor="middle" fill="#fff" fontSize="9">{tableUseHeaders ? "<th> Hall" : "<td> Hall"}</text>
                          <line x1="280" y1="77" x2="250" y2="98" stroke="#475569" strokeWidth="1.5" />
                          <line x1="280" y1="77" x2="310" y2="98" stroke="#475569" strokeWidth="1.5" />
                          <rect x="220" y="98" width="55" height="20" rx="3" fill="#0284c7" />
                          <text x="247" y="112" textAnchor="middle" fill="#fff" fontSize="9">&lt;td&gt; {selectedCity}</text>
                          <rect x="285" y="98" width="55" height="20" rx="3" fill="#0284c7" />
                          <text x="312" y="112" textAnchor="middle" fill="#fff" fontSize="9">&lt;td&gt; Hall A</text>
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <button
                          aria-label="View rendered browser output"
                          onClick={() => setActiveTabVisual('render')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            activeTabVisual === 'render' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          🖥️ Rendered Browser Output
                        </button>
                        <button
                          aria-label="View source HTML code"
                          onClick={() => setActiveTabVisual('code')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            activeTabVisual === 'code' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          📄 Source HTML Code
                        </button>
                      </div>

                      {activeTabVisual === 'render' ? (
                        <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 min-h-[190px] flex flex-col justify-center">
                          <table
                            style={{
                              border: `${tableBorder}px solid ${tableBorder > 0 ? '#94a3b8' : 'transparent'}`,
                              borderCollapse: 'collapse',
                              width: '100%',
                              backgroundColor: '#0f172a'
                            }}
                          >
                            <thead>
                              <tr style={{ backgroundColor: tableUseHeaders ? '#1e293b' : '#0f172a' }}>
                                {tableUseHeaders ? (
                                  <>
                                    <th style={{ border: `${tableBorder}px solid #64748b`, padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#38bdf8' }}>
                                      Host City
                                    </th>
                                    <th style={{ border: `${tableBorder}px solid #64748b`, padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#38bdf8' }}>
                                      Exhibition Hall
                                    </th>
                                  </>
                                ) : (
                                  <>
                                    <td style={{ border: `${tableBorder}px solid #64748b`, padding: '8px', textAlign: 'left', fontWeight: 'normal', color: '#cbd5e1' }}>
                                      Host City
                                    </td>
                                    <td style={{ border: `${tableBorder}px solid #64748b`, padding: '8px', textAlign: 'left', fontWeight: 'normal', color: '#cbd5e1' }}>
                                      Exhibition Hall
                                    </td>
                                  </>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style={{ border: `${tableBorder}px solid #64748b`, padding: '8px', textAlign: 'left', color: '#f8fafc' }}>
                                  {selectedCity}
                                </td>
                                <td style={{ border: `${tableBorder}px solid #64748b`, padding: '8px', textAlign: 'left', color: '#f8fafc' }}>
                                  Vigyan Bhawan - Hall A
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="p-4 bg-slate-950 font-mono text-xs rounded-xl border border-slate-800 text-gold-300 leading-relaxed overflow-x-auto min-h-[190px]">
                          <p className="text-slate-500">&lt;!-- Valid Nested ICSE HTML Table Structure --&gt;</p>
                          <p className="text-amber-400">&lt;table border="{tableBorder}"&gt;</p>
                          <p className="pl-4 text-gold-300">&lt;tr&gt;</p>
                          {tableUseHeaders ? (
                            <>
                              <p className="pl-8 text-emerald-400">&lt;th&gt;Host City&lt;/th&gt;</p>
                              <p className="pl-8 text-emerald-400">&lt;th&gt;Exhibition Hall&lt;/th&gt;</p>
                            </>
                          ) : (
                            <>
                              <p className="pl-8 text-rose-400">&lt;td&gt;Host City&lt;/td&gt;</p>
                              <p className="pl-8 text-rose-400">&lt;td&gt;Exhibition Hall&lt;/td&gt;</p>
                            </>
                          )}
                          <p className="pl-4 text-gold-300">&lt;/tr&gt;</p>
                          <p className="pl-4 text-gold-300">&lt;tr&gt;</p>
                          <p className="pl-8 text-gold-300">&lt;td&gt;{selectedCity}&lt;/td&gt;</p>
                          <p className="pl-8 text-gold-300">&lt;td&gt;Vigyan Bhawan - Hall A&lt;/td&gt;</p>
                          <p className="pl-4 text-gold-300">&lt;/tr&gt;</p>
                          <p className="text-amber-400">&lt;/table&gt;</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Observation Question #1 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-gold-900/60 mt-4 space-y-3">
                    <span className="text-xs font-mono uppercase text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
                      👁️ Brilliant Observation 1: What do you notice?
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200">
                      {OBSERVATION_QUESTIONS[0].question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => {
                        const isSelected = observationAnswers['obs_1'] === oIdx;
                        const hasAnswered = observationAnswers['obs_1'] !== undefined;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleObservationAnswer('obs_1', oIdx)}
                            className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                              hasAnswered
                                ? oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                  : isSelected
                                  ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {observationAnswers['obs_1'] !== undefined && (
                      <p className="text-xs text-slate-300 pt-1">
                        {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: FORM INPUT & RADIO GROUP SIMULATOR (SVG #2: Input Binding Architecture) */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Radio Group Name Binding:</span>
                    <div className="flex gap-2">
                      <motion.button
                        aria-label="Set matched radio group name"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFormRadioNameGroup('matched');
                          setSelectedRadio('Junior');
                          setRadio1Checked(true);
                          setRadio2Checked(false);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          formRadioNameGroup === 'matched'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        ✓ Shared name="category" (Single Choice)
                      </motion.button>
                      <motion.button
                        aria-label="Set mismatched radio group name"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFormRadioNameGroup('mismatched');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          formRadioNameGroup === 'mismatched'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        ✗ Different names (Broken Behavior)
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Live interactive form */}
                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Live HTML Form Render</h4>
                      <div>
                        <label htmlFor="student-name-input" className="text-xs text-slate-400 block mb-1">Student Name &lt;input type="text"&gt;:</label>
                        <input
                          id="student-name-input"
                          type="text"
                          aria-label="Student full name input field"
                          placeholder="e.g. Aarav Sharma"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-gold-500 focus:outline-none"
                        />
                      </div>

                      <div className="border-t border-slate-800 pt-3">
                        <label className="text-xs text-slate-400 block mb-2">Age Category (Radio Inputs):</label>
                        <div className="space-y-2 text-sm">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              aria-label="Junior Category radio option"
                              name={formRadioNameGroup === 'matched' ? 'category' : 'groupA'}
                              checked={formRadioNameGroup === 'matched' ? selectedRadio === 'Junior' : radio1Checked}
                              onChange={() => {
                                if (formRadioNameGroup === 'matched') setSelectedRadio('Junior');
                                else setRadio1Checked(!radio1Checked);
                                audioManager.play('tap');
                              }}
                              className="accent-gold-500"
                            />
                            <span>Junior Category (Class 6-8)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              aria-label="Senior Category radio option"
                              name={formRadioNameGroup === 'matched' ? 'category' : 'groupB'}
                              checked={formRadioNameGroup === 'matched' ? selectedRadio === 'Senior' : radio2Checked}
                              onChange={() => {
                                if (formRadioNameGroup === 'matched') setSelectedRadio('Senior');
                                else setRadio2Checked(!radio2Checked);
                                audioManager.play('tap');
                              }}
                              className="accent-gold-500"
                            />
                            <span>Senior Category (Class 9-10)</span>
                          </label>
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-3">
                        <label className="text-xs text-slate-400 block mb-2">Volunteer Tasks &lt;input type="checkbox"&gt; (Multi-select):</label>
                        <div className="flex gap-4 text-xs">
                          {(['setup', 'banner', 'chairs'] as const).map(task => (
                            <label key={task} className="flex items-center gap-1.5 cursor-pointer capitalize">
                              <input
                                type="checkbox"
                                aria-label={`Volunteer task ${task}`}
                                checked={checkboxState[task]}
                                onChange={() => {
                                  setCheckboxState(prev => ({ ...prev, [task]: !prev[task] }));
                                  audioManager.play('tap');
                                }}
                                className="accent-gold-500"
                              />
                              {task}
                            </label>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        aria-label="Submit Form simulation"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          audioManager.play('success');
                          speechManager.speak('Form data submitted to virtual server!');
                          setShowSparkle(true);
                        }}
                        className="w-full py-2 bg-gradient-to-r from-gold-600 to-gold-600 rounded-lg text-xs font-bold text-white shadow"
                      >
                        &lt;input type="submit" value="Register Now"&gt;
                      </motion.button>
                    </div>

                    {/* SVG Diagram 2: Form Input Architecture */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <p className="text-[11px] font-mono text-gold-400">SVG Diagram 2 • Radio vs Checkbox Binding Architecture:</p>
                      <svg viewBox="0 0 340 160" className="w-full" aria-label="Form Input Data Flow Diagram" role="img">
                        <rect x="10" y="10" width="150" height="65" rx="6" fill="#0f172a" stroke={formRadioNameGroup === 'matched' ? '#10b981' : '#f43f5e'} strokeWidth="1.5" />
                        <text x="85" y="28" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Radio Group (name=cat)</text>
                        <circle cx="30" cy="50" r="6" fill={selectedRadio === 'Junior' ? '#06b6d4' : '#1e293b'} stroke="#64748b" />
                        <text x="45" y="54" fill="#cbd5e1" fontSize="9">Junior (exclusive)</text>
                        <circle cx="100" cy="50" r="6" fill={selectedRadio === 'Senior' ? '#06b6d4' : '#1e293b'} stroke="#64748b" />
                        <text x="115" y="54" fill="#cbd5e1" fontSize="9">Senior</text>

                        <rect x="180" y="10" width="150" height="65" rx="6" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="255" y="28" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">Checkboxes (Independent)</text>
                        <rect x="195" y="44" width="10" height="10" fill={checkboxState.setup ? '#6366f1' : '#1e293b'} stroke="#64748b" />
                        <text x="210" y="53" fill="#cbd5e1" fontSize="9">Setup</text>
                        <rect x="255" y="44" width="10" height="10" fill={checkboxState.banner ? '#6366f1' : '#1e293b'} stroke="#64748b" />
                        <text x="270" y="53" fill="#cbd5e1" fontSize="9">Banner</text>

                        <rect x="10" y="90" width="320" height="60" rx="6" fill="#1e293b" />
                        <text x="20" y="110" fill="#94a3b8" fontSize="9" fontFamily="monospace">Data Sent to Server on Submit:</text>
                        <text x="20" y="128" fill="#34d399" fontSize="10" fontFamily="monospace">
                          category: "{selectedRadio || 'none'}" | tasks: [{Object.entries(checkboxState).filter(([_, v]) => v).map(([k]) => k).join(', ')}]
                        </text>
                      </svg>
                      <p className="text-xs text-slate-400">
                        {formRadioNameGroup === 'matched'
                          ? '✓ Single mutual exclusion enforced via shared name="category".'
                          : '✗ Broken: Different names allow simultaneous multi-selection.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: SCRATCH CLONE & PROCEDURE SPAWNER */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-gold-400">Scratch 3.0 Stage Simulator</span>
                        <span className="text-xs text-slate-400">Clones on stage: {clonesList.length}</span>
                      </div>
                      <canvas ref={canvasRef} width={340} height={180} className="w-full rounded-lg bg-slate-900 border border-slate-800" />
                      <div className="flex gap-2 mt-3">
                        <motion.button
                          aria-label="Create Scratch sprite clone"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSpawnClone}
                          className="flex-1 py-2 bg-gold-600 rounded-lg text-xs font-bold text-white"
                        >
                          + [create clone of (myself)]
                        </motion.button>
                        <motion.button
                          aria-label="Clear all clones"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleClearClones}
                          className="px-3 py-2 bg-rose-900/60 text-rose-300 rounded-lg text-xs font-bold border border-rose-700"
                        >
                          [delete this clone]
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/60 font-mono text-xs">
                        <span className="text-rose-400 font-bold block mb-1">define spawnSpark (speedParam)</span>
                        <p className="text-slate-300 pl-4">go to x: (pick random -200 to 200) y: (150)</p>
                        <p className="text-slate-300 pl-4">repeat until &lt;touching edge?&gt;</p>
                        <p className="text-gold-300 pl-8 font-bold">change y by ((0) - (speedParam))</p>
                        <p className="text-slate-300 pl-4">delete this clone</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300">
                          <label htmlFor="clone-speed-slider">Parameter (speedParam):</label>
                          <span className="font-mono text-gold-400 font-bold">{cloneSpeedParam} steps/tick</span>
                        </div>
                        <input
                          id="clone-speed-slider"
                          type="range"
                          min={1}
                          max={12}
                          value={cloneSpeedParam}
                          aria-label="Clone speed parameter slider"
                          onChange={(e) => {
                            setCloneSpeedParam(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        💡 <strong>Abstraction Power:</strong> One custom block definition governs every clone on the stage.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: SCRATCH LIST & STRING INSPECTOR (SVG #3: 1-Based Memory Indexing) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* List Data Structure */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-gold-400 font-mono">List: "MetroCities" (Length: {scratchListItems.length})</h4>
                        <span className="text-[10px] text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                          1-Based Indexing
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {scratchListItems.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-800 text-xs"
                          >
                            <span className="font-mono text-gold-400 font-bold w-6">#{idx + 1}</span>
                            <span className="text-slate-200 flex-1 font-medium">{item}</span>
                            <motion.button
                              aria-label={`Delete list item ${idx + 1}`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteScratchListItem(idx)}
                              className="text-rose-400 hover:text-rose-300 text-xs px-2 py-0.5 rounded bg-rose-950/40"
                            >
                              delete
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-slate-800">
                        <input
                          type="text"
                          value={newListItemText}
                          aria-label="New city item name"
                          onChange={(e) => setNewListItemText(e.target.value)}
                          placeholder="Add city name..."
                          className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                        />
                        <motion.button
                          aria-label="Add item to list"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddScratchListItem}
                          className="px-3 py-1.5 bg-gold-600 text-white rounded-lg text-xs font-bold"
                        >
                          Add to List
                        </motion.button>
                      </div>
                    </div>

                    {/* String Operations Lab */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-gold-400 font-mono">String Operations Evaluator</h4>
                      <div>
                        <label htmlFor="test-string-input" className="text-[11px] text-slate-400 block mb-1">Target String Value:</label>
                        <input
                          id="test-string-input"
                          type="text"
                          aria-label="Target string input"
                          value={testString}
                          onChange={(e) => setTestString(e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">length of string:</span>
                          <span className="text-lg font-mono font-bold text-gold-300">{testString.length}</span>
                          <span className="text-[10px] text-slate-500 block">(includes spaces)</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">letter #{inspectCharIndex} of string:</span>
                          <span className="text-lg font-mono font-bold text-gold-300">
                            {testString[inspectCharIndex - 1] === ' ' ? '[Space]' : testString[inspectCharIndex - 1] || 'None'}
                          </span>
                          <span className="text-[10px] text-slate-500 block">1-based char pos</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                          <label htmlFor="inspect-index-slider">Inspect Index:</label>
                          <span className="font-mono text-gold-400 font-bold">{inspectCharIndex}</span>
                        </div>
                        <input
                          id="inspect-index-slider"
                          type="range"
                          min={1}
                          max={Math.max(1, testString.length)}
                          value={inspectCharIndex}
                          aria-label="Character index slider"
                          onChange={(e) => setInspectCharIndex(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Observation Question #2 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-gold-900/60 mt-3 space-y-3">
                    <span className="text-xs font-mono uppercase text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
                      👁️ Brilliant Observation 2: What do you notice?
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200">
                      {OBSERVATION_QUESTIONS[1].question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => {
                        const isSelected = observationAnswers['obs_2'] === oIdx;
                        const hasAnswered = observationAnswers['obs_2'] !== undefined;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleObservationAnswer('obs_2', oIdx)}
                            className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                              hasAnswered
                                ? oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                  : isSelected
                                  ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {observationAnswers['obs_2'] !== undefined && (
                      <p className="text-xs text-slate-300 pt-1">
                        {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>

                  {/* SVG Diagram 3: 1-Based List Indexing Memory Architecture */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[11px] font-mono text-gold-400 mb-2">SVG Diagram 3 • Scratch 1-Based Indexing vs 0-Based Shifting Architecture:</p>
                    <svg viewBox="0 0 600 90" className="w-full" aria-label="1-Based List Indexing Architecture" role="img">
                      {[0, 1, 2, 3].map((slotIdx) => (
                        <g key={slotIdx} transform={`translate(${slotIdx * 145 + 10}, 10)`}>
                          <rect x="0" y="0" width="135" height="40" rx="5" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                          <rect x="0" y="0" width="30" height="40" rx="4" fill="#0284c7" />
                          <text x="15" y="25" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">#{slotIdx + 1}</text>
                          <text x="80" y="25" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">
                            {scratchListItems[slotIdx] || '[empty]'}
                          </text>
                          <text x="67" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                            letter #{slotIdx + 1}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 4: CYBER ETHICS & FAIR USE VALIDATOR (SVG #4: Cyber Ethics Venn Diagram) */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Scenario Analysis Lab</h4>
                    <div className="p-3 bg-slate-900 rounded-lg text-sm text-slate-200 border border-slate-800">
                      "A student copies a 2-paragraph excerpt of a scientific article on ISRO Chandrayaan from a news portal into their school presentation slide, puts it in quotation marks, and cites the journalist and publication name."
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {['Fair Use (Educational Excerpt with Credit)', 'Copyright Infringement', 'Plagiarism'].map((cat, cIdx) => (
                        <motion.button
                          key={cIdx}
                          aria-label={`Evaluate scenario as ${cat}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setEthicsJudgments(prev => ({ ...prev, [0]: cat }));
                            if (cIdx === 0) {
                              audioManager.play('success');
                              speechManager.speak('Correct! Limited portions used with full credit qualify as Fair Use.');
                            } else {
                              audioManager.play('error');
                              setWrongShake(true);
                              setTimeout(() => setWrongShake(false), 400);
                            }
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                            ethicsJudgments[0] === cat
                              ? cIdx === 0
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {cat}
                        </motion.button>
                      ))}
                    </div>

                    {ethicsJudgments[0] && (
                      <p className={`text-xs p-2 rounded ${ethicsJudgments[0].startsWith('Fair') ? 'bg-emerald-950/60 text-emerald-300' : 'bg-rose-950/60 text-rose-300'}`}>
                        {ethicsJudgments[0].startsWith('Fair')
                          ? '✓ Perfectly analyzed! Small portions for non-profit education with explicit source attribution are protected under Fair Use exceptions.'
                          : '✗ Re-evaluate: Since full attribution was given and only a small excerpt was used for non-commercial schoolwork, it is Fair Use.'}
                      </p>
                    )}

                    {/* SVG Diagram 4: Cyber Ethics Framework */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <p className="text-[11px] font-mono text-gold-400 mb-2">SVG Diagram 4 • Intellectual Property & Fair Use Spectrum:</p>
                      <svg viewBox="0 0 450 110" className="w-full" aria-label="Cyber Ethics Framework Diagram" role="img">
                        <rect x="15" y="15" width="125" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="77" y="38" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Copyright Act 1957</text>
                        <text x="77" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="9">Protects creators'</text>
                        <text x="77" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="9">original work</text>

                        <rect x="160" y="15" width="130" height="75" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                        <text x="225" y="38" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">Fair Use Exception</text>
                        <text x="225" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="9">Short educational snippet</text>
                        <text x="225" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="9">+ Full Attribution</text>

                        <rect x="310" y="15" width="125" height="75" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                        <text x="372" y="38" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">Violations</text>
                        <text x="372" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="9">Plagiarism (No Credit)</text>
                        <text x="372" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="9">Infringement (Illegal Copy)</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Navigation for Exploration */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous lab module"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-400 font-bold">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next lab module"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-900/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (Zero-Pressure Exploration) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Free Sandbox Playground
              </div>
              <h3 className="text-lg font-bold text-white">Freely Experiment & Combine Concepts</h3>
              <p className="text-xs text-slate-400">Test tables, forms, Scratch clones, and list shifts without scoring constraints.</p>
            </div>
            <motion.button
              aria-label="Proceed to graded challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-gold-900/40 whitespace-nowrap"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Table Quick Lab */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 font-mono">1. Table Grid Playground</span>
              <div className="flex justify-between text-xs text-slate-300">
                <label htmlFor="sandbox-table-border">Border: {tableBorder}</label>
                <input
                  id="sandbox-table-border"
                  type="range"
                  min={0}
                  max={5}
                  value={tableBorder}
                  aria-label="Sandbox table border"
                  onChange={(e) => setTableBorder(Number(e.target.value))}
                  className="w-24 accent-gold-500 cursor-pointer"
                />
              </div>
              <table style={{ border: `${tableBorder}px solid #94a3b8`, width: '100%', borderCollapse: 'collapse' }} className="text-xs">
                <thead>
                  <tr className="bg-slate-800">
                    <th style={{ border: `${tableBorder}px solid #64748b`, padding: '4px' }}>Subject</th>
                    <th style={{ border: `${tableBorder}px solid #64748b`, padding: '4px' }}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: `${tableBorder}px solid #64748b`, padding: '4px' }}>Comp Science</td>
                    <td style={{ border: `${tableBorder}px solid #64748b`, padding: '4px' }}>98</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Scratch Clone Particle Canvas */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-gold-400 font-mono">2. Scratch Clone Canvas</span>
              <canvas ref={canvasRef} width={260} height={100} className="w-full rounded bg-slate-900 border border-slate-800" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Clones: {cloneCount}</span>
                <button
                  aria-label="Spawn clone"
                  onClick={handleSpawnClone}
                  className="px-2 py-1 bg-gold-600 rounded text-[10px] font-bold text-white"
                >
                  + Spawn
                </button>
              </div>
            </div>

            {/* Quick String Evaluator */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">3. String & List Quick Check</span>
              <p className="text-xs text-slate-300">
                List length: <span className="text-gold-400 font-bold">{scratchListItems.length}</span> | Index 1: <span className="text-gold-400 font-bold">{scratchListItems[0] || 'empty'}</span>
              </p>
              <p className="text-xs text-slate-400">
                join ("Jai", "Hind") = <span className="text-emerald-400 font-mono font-bold">JaiHind</span>
              </p>
              <p className="text-xs text-slate-400">
                length of "New Delhi" = <span className="text-amber-400 font-mono font-bold">9</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE (Adaptive & Competency Driven) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Meta Bar */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gold-400 font-bold">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Node: {challenge.nodeId}
                </span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-gold-950 text-gold-400 border border-gold-800">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-white mt-1">
                {challenge.question}
              </h3>
            </div>

            {/* Adaptive Difficulty Badge */}
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border font-mono ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : difficulty === 'standard'
                  ? 'bg-gold-950/80 border-gold-500 text-gold-300'
                  : 'bg-rose-950/80 border-rose-500 text-rose-300'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* 1. MCQ CHALLENGES */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {challenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(i)}
                  disabled={answerRevealed || showExplanation}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    wrongFlash
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : showExplanation && i === challenge.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                      : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-lg bg-slate-800 text-center leading-6 text-xs font-mono font-bold mr-2 text-gold-400">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1.5">✓ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* 2. DRAG-LABEL CHALLENGES */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="space-y-4 p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs text-slate-400 w-full mb-1">Drag each tag into its matching box:</span>
                {challenge.dragItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable label: ${item.label}`}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-gold-600 to-gold-600 rounded-lg text-xs font-mono font-bold text-white cursor-grab shadow"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Target Diagram */}
              <motion.div
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800"
              >
                {[
                  { id: 'target_outer', placeholder: 'Drop Outer Container Tag' },
                  { id: 'target_row1', placeholder: 'Drop Table Row Tag' },
                  { id: 'target_cell1', placeholder: 'Drop Header Cell Tag' },
                  { id: 'target_cell2', placeholder: 'Drop Data Cell Tag' }
                ].map(target => (
                  <div
                    key={target.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(target.id)}
                    aria-label={`Target area ${target.id}`}
                    className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[70px] transition-all ${
                      droppedLabels[target.id]
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-slate-700 bg-slate-900/50 text-slate-500'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold">
                      {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : target.placeholder}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.button
                aria-label="Validate drag and drop labels"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-900/30"
              >
                Validate Labels
              </motion.button>
            </div>
          )}

          {/* 3. DRAG-SORT CHALLENGES */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="space-y-3 p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-2">Drag or re-arrange lines to build valid code order:</span>
              <motion.div
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Code line ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-gold-300 flex items-center justify-between cursor-grab"
                  >
                    <span>
                      <strong className="text-slate-500 mr-2">Line {displayIdx + 1}:</strong>
                      {item}
                    </span>
                    <span className="text-slate-600 text-xs">↕ drag</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                aria-label="Check code sequence order"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSortSubmit}
                disabled={showExplanation}
                className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-900/30 mt-3"
              >
                Check Code Sequence
              </motion.button>
            </div>
          )}

          {/* 4. NUMERIC CHALLENGES */}
          {challenge.type === 'numeric' && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <motion.input
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  type="number"
                  aria-label="Numeric answer input"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 focus:outline-none"
                />
                <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>
                <motion.button
                  aria-label="Verify numeric input"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-900/30"
                >
                  Verify Number
                </motion.button>
              </div>
            </div>
          )}

          {/* 5. CONSTRUCT CHALLENGES */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-amber-300 font-mono">{challenge.validationHint}</p>
              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, pIdx) => (
                  <motion.button
                    key={pIdx}
                    aria-label={`Add code token: ${part}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setConstructParts(prev => [...prev, part]);
                      audioManager.play('pop');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-gold-300"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              {/* Assembled code box */}
              <motion.div
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center"
              >
                {constructParts.map((part, cIdx) => (
                  <motion.span
                    key={cIdx}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="px-2.5 py-1 bg-gold-950 border border-gold-800 rounded text-xs font-mono text-gold-300 flex items-center gap-1.5"
                  >
                    {part}
                    <button
                      aria-label={`Remove code token ${part}`}
                      onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== cIdx))}
                      className="text-rose-400 hover:text-rose-300 text-[10px]"
                    >
                      ✕
                    </button>
                  </motion.span>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-600 font-mono">Click code tokens above to assemble syntax</span>
                )}
              </motion.div>

              <div className="flex gap-2">
                <motion.button
                  aria-label="Validate syntax construction"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-900/30"
                >
                  Validate Syntax Construction
                </motion.button>
                <button
                  aria-label="Clear assembled tokens"
                  onClick={() => setConstructParts([])}
                  className="px-4 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Step-by-Step Progressive Disclosure Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gold-300">Detailed Solution Walkthrough:</h4>
                <span className="text-xs text-slate-400 font-mono">
                  Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim()).length}
                </span>
              </div>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="text-gold-400 font-bold font-mono mr-1.5">{sIdx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                  <motion.button
                    aria-label="Show next explanation step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-gold-700 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <div className="text-xs text-emerald-400 font-bold">✓ Explanation Fully Revealed</div>
                )}

                <motion.button
                  aria-label="Advance to next challenge or complete"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Next Challenge →'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION SECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-gold-950 rounded-3xl border border-gold-700 shadow-2xl text-center space-y-4">
            <span className="text-4xl block" aria-hidden="true">🎉</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You have successfully completed the HTML tables, forms, Scratch computational procedures, list data structures, and cyber ethics simulation module.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-mono font-bold text-gold-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Accuracy</span>
                <span className="text-xl font-mono font-bold text-emerald-400">
                  {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
                </span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery</span>
                <span className="text-xl font-mono font-bold text-gold-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Difficulty</span>
                <span className="text-xl font-mono font-bold text-amber-400 uppercase">{difficulty}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 text-xs md:text-sm text-emerald-300 leading-relaxed">
            {errors === 0
              ? '🏆 PERFECT MASTERY! You have demonstrated flawless expertise in HTML nesting, forms, Scratch procedures, and cyber ethics.'
              : errors <= 3
              ? '🌟 Excellent performance! You have a solid grasp of the ICSE Class 7 Computer Science syllabus. Review the tips below to polish your score.'
              : '💪 Good effort! Learning computer science is iterative. Review the misconceptions below and retry the labs to master all five nodes.'}
          </div>

          {/* STRUCTURAL SPACED REPETITION SCHEDULE VISIBILITY */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-gold-950/40 rounded-2xl border border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 text-sm">📅 Spaced Repetition (SRS) Review Schedule</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300 font-mono text-[10px] border border-amber-700">
                  Adaptive SM-2 Interval
                </span>
              </div>
              <p className="text-slate-300">
                Next scheduled review in{' '}
                <strong className="text-amber-300 font-mono text-sm underline decoration-amber-400">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                ({errors === 0 ? '0 errors: Maximum retention interval' : errors <= 3 ? '1-3 errors: Moderate consolidation interval' : '4+ errors: Rapid reinforcement needed'}).
              </p>
              <p className="text-slate-400 text-[11px]">
                Reviewing according to this schedule optimizes synaptic memory consolidation before forgetfulness decay sets in.
              </p>
            </div>
            <div className="text-center p-3 bg-slate-950/80 rounded-xl border border-slate-800 min-w-[130px]">
              <span className="text-2xl block" aria-hidden="true">🧠</span>
              <span className="font-mono font-bold text-amber-400 text-xs">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
          </div>

          {/* STRUCTURAL REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase tracking-wider">
              <span>💭</span> Key Learning Reflections
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflection-surprising" className="text-xs font-bold text-gold-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflection-surprising"
                  rows={3}
                  aria-label="Reflection on the most surprising thing learned"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g., Scratch lists start at index 1 instead of index 0, or spaces count in string length..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflection-explain" className="text-xs font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="reflection-explain"
                  rows={3}
                  aria-label="Reflection on explaining the concept to a friend"
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g., Radio buttons are like single-choice quiz questions sharing the same group name..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="reflection-reallife" className="text-xs font-bold text-emerald-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="reflection-reallife"
                  rows={3}
                  aria-label="Reflection on real-life applications"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g., Creating school event registration websites or coding animations for science fairs..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Specific Concepts to Review:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">��� {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Capstone Project */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-gold-400 font-mono font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_ComputerScienceHtmlTablesTableSim;