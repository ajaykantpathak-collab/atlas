'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (MANDATORY STRING LITERALS) ───
const NODE_C6_CS_011 = 'c6_cs_011';
const NODE_C6_CS_012 = 'c6_cs_012';
const NODE_C6_CS_013 = 'c6_cs_013';
const NODE_C6_CS_014 = 'c6_cs_014';
const NODE_C6_CS_015 = 'c6_cs_015';
const NODE_C6_CS_016 = 'c6_cs_016';
const NODE_C6_CS_017 = 'c6_cs_017';
const NODE_C6_CS_018 = 'c6_cs_018';
const NODE_C6_CS_019 = 'c6_cs_019';
const NODE_C6_CS_020 = 'c6_cs_020';

const ALL_NODE_IDS = [
  NODE_C6_CS_011,
  NODE_C6_CS_012,
  NODE_C6_CS_013,
  NODE_C6_CS_014,
  NODE_C6_CS_015,
  NODE_C6_CS_016,
  NODE_C6_CS_017,
  NODE_C6_CS_018,
  NODE_C6_CS_019,
  NODE_C6_CS_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Digital Tech Expo 2026: The Cyber Innovation Studio',
  intro: 'You are the lead junior digital developer at St. Xavier’s Tech Hub, Kolkata. The school is preparing for the CISCE Inter-School Cyber Olympiad. Your team must build interactive PowerPoint presentations with Excel data links, design dynamic Scratch arcade games, construct valid HTML web portals with formatted text and media links, and safeguard the school network against web threats.',
  context: 'Across 10 core computer science domains, you will assemble live interactive software modules, verify code execution, and guide peers on digital citizenship and netiquette.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In PowerPoint, when you embed an Excel rainfall chart using "Insert > Object" with the Link option checked, what happens when rainfall numbers are updated in Excel?',
  options: [
    'The PowerPoint chart updates automatically because it maintains a live reference link',
    'The PowerPoint presentation crashes because two files cannot share data',
    'The chart turns into an unlinked static photo that never changes',
    'You must delete the slide and retype the numbers manually',
  ],
  correctIndex: 0,
  hintAfter: 'Linked objects maintain a dynamic bridge to their source files — let us explore how data, code, and web protocols interact!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1 - 7)
  {
    id: 'ch_cs_001_ppt_recall',
    nodeId: NODE_C6_CS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which PowerPoint feature is a pre-drawn shape with built-in navigation commands that automatically opens the Action Settings dialog when inserted?',
    options: ['Action Button', 'WordArt Box', 'Screen Recorder', 'Format Painter'],
    correctIndex: 0,
    explanation: 'Action Buttons (such as Home, Next, Back, and Sound) are specialized shapes from the Shapes gallery that instantly open the Action Settings dialog.',
    hints: [
      'Look for ready-made navigation symbols like Home, Next, or Return in the Shapes menu.',
      'Unlike normal shapes, these pre-configured buttons trigger actions immediately when clicked during a slideshow.',
      'The shape is specifically called an Action Button.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_002_scratch_control',
    nodeId: NODE_C6_CS_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Scratch, what is the primary role of the C-shaped "forever" block in an animation script?',
    options: [
      'It executes nested blocks continuously in an infinite loop until stopped',
      'It pauses the entire Scratch engine for 10 seconds',
      'It deletes all costumes attached to the sprite',
      'It transmits a private message to the background stage only',
    ],
    correctIndex: 0,
    explanation: 'The C-shaped "forever" loop repeatedly executes all commands stacked inside its container from top to bottom until the red stop button or a stop block is triggered.',
    hints: [
      'Think of a loop that never ends on its own.',
      'It allows sprites to continue walking, dancing, or checking conditions non-stop.',
      'It runs continuously from top to bottom and cycles back to the start.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_003_scratch_vars',
    nodeId: NODE_C6_CS_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Scratch, which block should be placed under "when green flag clicked" to ensure the game points counter starts clean at zero?',
    options: ['set score to 0', 'change score by 1', 'show variable score', 'hide variable score'],
    correctIndex: 0,
    explanation: '"set score to 0" initializes the variable so previous game runs do not artificially inflate the starting score.',
    hints: [
      'Initialization sets a definite baseline starting value.',
      'Do not use "change by", which adds to whatever existing number is stored.',
      'Choose the "set [variable] to 0" block.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_004_html_structure',
    nodeId: NODE_C6_CS_015,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the primary structural zones of an HTML document in the correct hierarchy.',
    dragItems: [
      { label: '<html> Container', targetId: 'zone_root' },
      { label: '<head> Metadata/Title', targetId: 'zone_head' },
      { label: '<body> Visible Content', targetId: 'zone_body' },
      { label: '<title> Tab Label', targetId: 'zone_title' },
    ],
    correctMapping: {
      zone_root: '<html> Container',
      zone_head: '<head> Metadata/Title',
      zone_body: '<body> Visible Content',
      zone_title: '<title> Tab Label',
    },
    explanation: '<html> encloses the entire document. Inside <html>, <head> stores non-visible metadata including <title>, while <body> contains all user-visible headings, paragraphs, and media.',
    hints: [
      'The outer-most container that wraps every single tag is <html>.',
      'The <title> must live safely nested inside the <head> section.',
      'All visible headings and paragraphs belong inside the <body>.',
    ],
  },
  {
    id: 'ch_cs_005_html_formatting',
    nodeId: NODE_C6_CS_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which pair of HTML tags are self-closing (void elements) and do NOT require a separate closing tag?',
    options: ['<br> and <hr>', '<p> and <b>', '<h1> and <h6>', '<i> and <title>'],
    correctIndex: 0,
    explanation: '<br> (line break) and <hr> (horizontal rule) are empty/void tags that insert an action directly and do not contain child text.',
    hints: [
      'Look for tags that simply draw a line or break to a new line without wrapping text.',
      'Tags like <p>...</p> and <b>...</b> must have closing tags.',
      '<br> and <hr> are standalone void tags.',
    ],
  },
  {
    id: 'ch_cs_006_safe_browsing',
    nodeId: NODE_C6_CS_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What does the "s" in "https://" stand for in a website address URL?',
    options: ['Secure (data is encrypted)', 'Speed (fast loading)', 'Standard (regular text)', 'Server (public host)'],
    correctIndex: 0,
    explanation: 'The "s" stands for Secure. It confirms that the connection between your browser and the web server is encrypted, protecting credentials from eavesdropping.',
    hints: [
      'Think about security, locks, and encrypted envelopes.',
      'It guarantees that sensitive information is scrambled during transmission.',
      'It stands for Secure (HyperText Transfer Protocol Secure).',
    ],
  },
  {
    id: 'ch_cs_007_netiquette_basic',
    nodeId: NODE_C6_CS_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In digital communication etiquette (netiquette), why is typing an entire message in ALL CAPITAL LETTERS strongly discouraged?',
    options: [
      'It is interpreted across online communities as shouting and aggressive behavior',
      'It consumes twice as much computer memory and slows internet bandwidth',
      'It automatically disables spellcheck on school tablets',
      'Capital letters are illegal under digital copyright law',
    ],
    correctIndex: 0,
    explanation: 'In online netiquette, sentences written in ALL CAPS represent shouting, which feels rude and hostile to the recipient.',
    hints: [
      'Consider the tone and emotional perception of the recipient.',
      'How does it feel when someone speaks in a raised, shouting voice?',
      'ALL CAPS is universally recognized in netiquette as shouting.',
    ],
  },

  // Standard Tier (8 - 15)
  {
    id: 'ch_cs_008_ppt_hyperlink_app',
    nodeId: NODE_C6_CS_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student is building an interactive Indian Geography quiz in PowerPoint. Clicking an image of the Red Fort on Slide 2 should immediately navigate to Slide 5. Which method achieves this?',
    options: [
      'Select image > Insert > Hyperlink (Link) > Place in This Document > Slide 5',
      'Select image > Home > Font Size 72 > Double Click',
      'Select image > File > Print Preview > Page 5',
      'Select image > View > Slide Sorter > Drag to Slide 1',
    ],
    correctIndex: 0,
    explanation: 'Hyperlinks in PowerPoint can target internal slides using "Place in This Document", enabling non-linear interactive quiz navigation.',
    hints: [
      'Hyperlinks are not limited to external websites; they can link inside the same presentation.',
      'Under the Insert tab, select Hyperlink and look for the internal document target option.',
      'Use "Place in This Document" to target Slide 5.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_cs_009_scratch_broadcast',
    nodeId: NODE_C6_CS_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a Scratch cricket match simulation, Bowler Sprite broadcasts "bowl_delivery". How does the Batsman Sprite trigger its swing animation?',
    options: [
      'By starting its swing script with the event hat "when I receive [bowl_delivery]"',
      'By using a forever loop with no sensing blocks',
      'By changing its variable name to "Bowler"',
      'By embedding an HTML <a> tag inside its costume',
    ],
    correctIndex: 0,
    explanation: 'Broadcast sends a global message across the project. Any sprite with a matching "when I receive [message]" hat block will activate its script in response.',
    hints: [
      'Broadcasting is a public broadcast to all listeners.',
      'The receiver sprite must have a matching event listener block.',
      'The block is "when I receive [bowl_delivery]".',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_010_scratch_collision',
    nodeId: NODE_C6_CS_014,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the correct Scratch logic sequence inside the game loop to catch a falling mango with a basket and increment score.',
    availableParts: ['if <touching [Basket]?> then', 'change [score] by 1', 'go to [random position]', 'set y to (180)', 'end'],
    targetState: 'if <touching [Basket]?> then change [score] by 1 go to [random position] set y to (180) end',
    validationHint: 'Nest the score increment and repositioning commands inside the conditional if-block.',
    explanation: 'When the mango detects contact with the basket via the touching sensor, it increments the score by 1 and resets its position to the top of the stage.',
    hints: [
      'First check the condition: if touching basket.',
      'Inside the if block, increase the score by 1.',
      'Then reset the mango to the top with random position and y=180, and close the if block.',
    ],
  },
  {
    id: 'ch_cs_011_html_lists_links',
    nodeId: NODE_C6_CS_017,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Order the tags to construct a valid HTML numbered list containing a hyperlinked resource to the ISRO portal.',
    sortItems: [
      '<ol>',
      '<li>',
      '<a href="https://www.isro.gov.in">Visit ISRO Official</a>',
      '</li>',
      '</ol>',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'An ordered list <ol> must contain <li> list items. The anchor tag <a href="..."> text </a> is nested inside the <li> container.',
    hints: [
      'Start with the parent list container <ol>.',
      'Open the list item <li> before placing the anchor hyperlink.',
      'Close </li> and finally close the main </ol>.',
    ],
  },
  {
    id: 'ch_cs_012_html_attributes',
    nodeId: NODE_C6_CS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Examine this code: <body bgcolor="navy" text="white"><font color="yellow">Golden Temple</font><p>Amritsar, Punjab</p></body>. What will be the font color of "Amritsar, Punjab"?',
    options: ['White', 'Yellow', 'Navy', 'Black'],
    correctIndex: 0,
    explanation: 'The body tag sets default text="white" globally. The <font color="yellow"> tag locally styles only "Golden Temple". Once </font> closes, following paragraphs inherit the default white text.',
    hints: [
      'The font tag only modifies text wrapped between its opening <font> and closing </font>.',
      'Notice that the paragraph <p> is outside the font tags.',
      'The paragraph uses the global body text color, which is white.',
    ],
  },
  {
    id: 'ch_cs_013_eval_website',
    nodeId: NODE_C6_CS_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A Class 6 student in Delhi is researching India’s Chandrayaan-3 lunar mission. Which of the following sources is the most credible and trustworthy?',
    options: [
      'https://www.isro.gov.in (Official space agency portal with verified author credentials and https)',
      'http://free-space-secrets-2023.biz/pop (Unencrypted site from a pop-up offering free prizes)',
      'An anonymous forum post from 2011 with no citations or publication date',
      'A social media chat message forwarded without source attribution',
    ],
    correctIndex: 0,
    explanation: 'Evaluating website credibility requires checking the 3 pillars: reputable domain (.gov.in), HTTPS encryption, and verified institutional authorship.',
    hints: [
      'Look for official government domains (.gov.in) and secure HTTPS encryption.',
      'Avoid unencrypted HTTP links that promise free items or have anonymous authors.',
      'The official ISRO portal is the gold standard for Indian space research.',
    ],
  },
  {
    id: 'ch_cs_014_comm_types',
    nodeId: NODE_C6_CS_020,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the online communication platform with its defining operational characteristic.',
    options: [
      'Chat = Instant real-time text; Forum = Topic-organized persistent threads; Video Call = Live audio-visual interaction',
      'Chat = Only for government officials; Forum = Voice only; Video Call = Static text message',
      'Chat = Takes 5 days to deliver; Forum = Closes after 1 minute; Video Call = Radio broadcast',
      'Chat = Requires HTML code; Forum = PowerPoint slide; Video Call = Scratch sprite',
    ],
    correctIndex: 0,
    explanation: 'Chat delivers rapid real-time messaging, Forums store searchable topic threads over long durations, and Video Calls provide synchronous face-to-face audiovisual interaction.',
    hints: [
      'Chat is fast instant messaging (WhatsApp/Google Chat).',
      'Forums (like Stack Overflow) keep questions and answers organized by topic for years.',
      'Video calls (Google Meet/Zoom) transmit live camera feeds and audio.',
    ],
  },
  {
    id: 'ch_cs_015_scratch_math_numeric',
    nodeId: NODE_C6_CS_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Scratch game starts with variable "score = 15". The player catches 4 golden coins (+3 points each) and hits 1 obstacle (-5 points). What is the final score?',
    correctAnswer: 22,
    tolerance: 0,
    unit: 'points',
    explanation: 'Calculation: Initial 15 + (4 × 3) - 5 = 15 + 12 - 5 = 22 points.',
    hints: [
      'Start with the base score of 15.',
      'Add the score gained from coins: 4 × 3 = 12 (15 + 12 = 27).',
      'Subtract the obstacle penalty: 27 - 5 = 22.',
    ],
  },

  // Advanced Tier (16 - 22)
  {
    id: 'ch_cs_016_ppt_excel_adv',
    nodeId: NODE_C6_CS_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the critical technical distinction between an "Embedded" Excel Chart and a "Linked" Excel Chart in a PowerPoint presentation?',
    options: [
      'A linked chart reflects subsequent data edits made in the original Excel spreadsheet, whereas an embedded chart becomes an independent internal copy that does not auto-update',
      'An embedded chart only works on Mac computers while linked charts work on Windows',
      'A linked chart deletes the PowerPoint slide when the computer is turned off',
      'Embedded charts cannot display bar diagrams or pie charts',
    ],
    correctIndex: 0,
    explanation: 'Linked objects store a path reference to the external source file and update when source data changes. Embedded objects store all data within the PPTX file container.',
    hints: [
      'Think about what happens when numbers in the source Excel file are modified next month.',
      'Linked objects maintain a dynamic bridge to the original file.',
      'Embedded charts are static copies decoupled from the original workbook.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_cs_017_scratch_timing_adv',
    nodeId: NODE_C6_CS_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student creates two parallel scripts on Sprite 1: Script A has [forever: next costume, wait 0.5 secs]. Script B has [forever: change x by 10]. What will Sprite 1 do?',
    options: [
      'Sprite 1 will move smoothly across the screen continuously while changing its costume every half second',
      'Sprite 1 will freeze completely because wait blocks halt all scripts on all sprites',
      'Script B will be cancelled automatically by Script A',
      'The Scratch project will crash due to a thread conflict',
    ],
    correctIndex: 0,
    explanation: 'The "wait" block is a local pause affecting only Script A. Scratch supports multi-threading: Script B executes its motion concurrently without delay.',
    hints: [
      'Wait pauses only the script that contains it, not other concurrent scripts or sprites.',
      'Script B continues running its movement loop independently.',
      'The sprite glides continuously while periodically cycling its costume.',
    ],
  },
  {
    id: 'ch_cs_018_scratch_game_loop_adv',
    nodeId: NODE_C6_CS_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why must the keyboard sensing condition "if <key [right arrow] pressed?> then change x by 10" be enclosed inside a "forever" loop rather than running once after the green flag?',
    options: [
      'Without the forever loop, the script tests the key press once in a fraction of a millisecond on start and terminates, ignoring all subsequent user key presses',
      'Scratch requires loops to allocate sprite costume memory',
      'Key sensing blocks only work when the computer is connected to the internet',
      'The green flag event block cannot connect directly to motion blocks',
    ],
    correctIndex: 0,
    explanation: 'A game loop keeps the application alive. Without a loop, the program executes from top to bottom in under 1ms and exits before the user can press any key.',
    hints: [
      'Programs execute line-by-line in sequential order.',
      'If there is no continuous loop, the check occurs only once at the moment the green flag is clicked.',
      'The game loop keeps polling keyboard input throughout gameplay.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_019_html_syntax_debug_adv',
    nodeId: NODE_C6_CS_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Identify the structural syntax bug in this snippet: <html><head><title>Kolkata Tour<body><h1>Victoria Memorial</h1></body></head></html>',
    options: [
      'The <title> tag was never closed with </title>, and the <body> element was erroneously nested inside <head>',
      'HTML does not support the <h1> tag for monuments',
      'Kolkata must be written in Bengali script only',
      'The <html> tag must be written in uppercase only',
    ],
    correctIndex: 0,
    explanation: '<title> requires a matching </title> closing tag. Furthermore, <body> must be a sibling to <head> inside <html>, never nested inside <head>.',
    hints: [
      'Check the nesting: is <body> supposed to be inside <head>?',
      'Did the <title> tag have a closing </title>?',
      '<head> and <body> are separate sections inside <html>.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_cs_020_html_media_adv',
    nodeId: NODE_C6_CS_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Which HTML snippet correctly embeds an image named "tiger.jpg" and makes the entire image a clickable hyperlink to the Project Tiger wildlife portal?',
    options: [
      '<a href="https://projecttiger.nic.in"><img src="tiger.jpg" alt="Bengal Tiger"></a>',
      '<img href="https://projecttiger.nic.in" src="tiger.jpg">',
      '<a src="tiger.jpg"><img href="https://projecttiger.nic.in"></a>',
      '<link src="tiger.jpg" a="https://projecttiger.nic.in">',
    ],
    correctIndex: 0,
    explanation: 'Nesting an <img> element inside an <a>...</a> anchor container turns the image itself into a clickable hyperlink target.',
    hints: [
      'Remember: <a> uses href for URLs, and <img> uses src for image files.',
      'To make an image clickable, wrap the <img src="..."> inside <a href="...">...</a>.',
      'Option A correctly combines <a href> around <img src>.',
    ],
  },
  {
    id: 'ch_cs_021_cyber_safety_adv',
    nodeId: NODE_C6_CS_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student receives an email: "URGENT: Your school portal account is suspended! Click http://xavier-school-verify.xyz to enter password." Which two red flags indicate a phishing attempt?',
    options: [
      'Unencrypted HTTP protocol and suspicious unofficial domain (.xyz) creating false urgency',
      'The word "school" is mentioned in the text',
      'The email was received on a school computer during working hours',
      'The font size is set to Arial 12',
    ],
    correctIndex: 0,
    explanation: 'Phishing attacks leverage psychological urgency, unencrypted HTTP links, and deceptive mimic domains (.xyz instead of official .edu/.ac.in / .org).',
    hints: [
      'Check the protocol (http vs https) and the domain extension (.xyz vs official institutional domains).',
      'Notice the pressure tactic: "URGENT: Your account is suspended".',
      'Unencrypted HTTP and deceptive domains are hallmark phishing indicators.',
    ],
  },
  {
    id: 'ch_cs_022_cyberbullying_adv',
    nodeId: NODE_C6_CS_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Arrange the responsible protocol steps a student should follow if targeted by cyberbullying in a class WhatsApp group.',
    sortItems: [
      'Do not retaliate or respond with angry messages',
      'Take screenshots of the messages as evidence',
      'Block the offending user or leave the toxic group',
      'Report the incident immediately to parents, teachers, or school counselor',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Effective digital safety strategy: 1. Do not fuel conflict, 2. Preserve forensic evidence, 3. Restrict communication, 4. Escalate to trusted adult authorities.',
    hints: [
      'First rule: never escalate the situation with anger.',
      'Second rule: save proof by taking screenshots.',
      'Third rule: cut off contact by blocking.',
      'Final rule: report to a teacher or parent.',
    ],
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
  nodeId: NODE_C6_CS_011,
  title: 'PowerPoint, Scratch, HTML & Cyber Safety Suite',
  definition: 'An integrated Class 6 computing suite covering PowerPoint linking & action buttons, Scratch control loops & variables, HTML5 structural markup & formatting, and safe internet navigation & netiquette.',
  eli5: 'Learn how computers build interactive slides, code fun arcade games, build web pages from scratch, and surf the internet safely!',
  misconceptions: [
    {
      misconception: 'Hyperlinks in PowerPoint only open external websites on the internet.',
      correction: 'Hyperlinks can link to web pages, files, email addresses, or other slides in the same presentation.',
    },
    {
      misconception: 'Action buttons and ordinary shapes with text are identical.',
      correction: 'Action buttons are dedicated navigation shapes with built-in click handlers and auto-opening Action Settings.',
    },
    {
      misconception: 'Copying and pasting an Excel chart creates a live auto-updating link.',
      correction: 'Only importing via Insert > Object with the "Link" option checked preserves live two-way data synchronization.',
    },
    {
      misconception: 'All HTML tags must have matching closing tags.',
      correction: 'Void elements like <br>, <hr>, and <img> are self-closing and do not take separate closing tags.',
    },
    {
      misconception: 'Every website ending in .org is 100% verified and secure.',
      correction: 'Domain extensions alone do not guarantee authenticity; you must verify HTTPS, author credentials, and publication dates.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which tag is used to create a numbered list in HTML?', options: ['<ul>', '<ol>', '<dl>', '<list>'], correctIndex: 1 },
    { question: 'What is the function of the "touching [sprite]?" block in Scratch?', options: ['Detects collisions', 'Changes color', 'Plays audio', 'Deletes sprite'], correctIndex: 0 },
    { question: 'Which attribute in <body> changes the overall background color?', options: ['color', 'bgcolor', 'background', 'theme'], correctIndex: 1 },
    { question: 'What does "netiquette" mean?', options: ['Network cabling', 'Good internet manners', 'Computer viruses', 'Web design'], correctIndex: 1 },
    { question: 'Where must the <title> tag be placed in an HTML document?', options: ['Inside <body>', 'Inside <head>', 'Outside <html>', 'Inside <p>'], correctIndex: 1 },
    { question: 'In Scratch, how is a named variable updated during gameplay?', options: ['set variable', 'change variable by', 'delete variable', 'hide variable'], correctIndex: 1 },
    { question: 'What shape are Scratch condition blocks?', options: ['Oval', 'Hexagonal', 'Square', 'Circular'], correctIndex: 1 },
    { question: 'Which protocol is secure and encrypted?', options: ['http://', 'https://', 'ftp://', 'smtp://'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates proficiency in PowerPoint linking/actions, Scratch game architecture, HTML markup/attributes, and cyber safety evaluation.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: PowerPoint Action Navigation & Live Data Linking',
    instruction: 'Click the interactive buttons on the slide preview to test action buttons, hyperlinks, and live Excel data updates.',
    interactionType: 'slide-interactive',
    nodeId: NODE_C6_CS_011,
  },
  {
    title: 'Lab 2: Scratch Game Loop & Collision Mechanics',
    instruction: 'Use the left/right control buttons to move the player basket, catch falling items, and observe real-time variable scoring.',
    interactionType: 'scratch-arcade',
    nodeId: NODE_C6_CS_014,
  },
  {
    title: 'Lab 3: Live HTML Code Inspector & Renderer',
    instruction: 'Adjust the HTML heading level, background color, and font style sliders to see real-time DOM updates in the browser window.',
    interactionType: 'html-editor',
    nodeId: NODE_C6_CS_016,
  },
  {
    title: 'Lab 4: Hyperlink & Media Assembly Studio',
    instruction: 'Construct and test HTML list elements, image sources (src), and anchor references (href) with live interactive previews.',
    interactionType: 'media-builder',
    nodeId: NODE_C6_CS_017,
  },
  {
    title: 'Lab 5: Cyber Threat Inspector & URL Safety Analyzer',
    instruction: 'Evaluate incoming web URLs by toggling security attributes to identify secure HTTPS protocols and trustworthy domains.',
    interactionType: 'safety-evaluator',
    nodeId: NODE_C6_CS_019,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you change rainfall data in the source Excel file from 120mm to 300mm, what will the linked PowerPoint chart show?',
    options: [
      'The chart will automatically update its bar height to 300mm',
      'The chart will stay frozen at 120mm forever',
      'The PowerPoint presentation will delete the chart',
      'The chart will turn into plain text',
    ],
    correctIndex: 0,
    verifyInstruction: 'Click the "Update Excel Rainfall Data" button below to verify your prediction live in the slide simulator.',
    nodeId: NODE_C6_CS_011,
  },
  {
    question: 'Predict: If the player basket touches a falling star, what will happen to the "Score" variable container?',
    options: [
      'The variable will increment by +1 and the star will respawn at the top',
      'The variable will reset to 0 immediately',
      'The Scratch cat will delete itself',
      'The game will stop running',
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the basket under the falling star in the arcade lab to watch the collision sensor trigger variable incrementation!',
    nodeId: NODE_C6_CS_014,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice when you switch the HTML heading tag from <h1> to <h6> in the live inspector?',
    observableOptions: [
      'The heading text size decreases significantly, representing lower structural hierarchy',
      'The heading changes from English to Sanskrit',
      'The background color turns bright red',
      'The paragraph disappears from the page',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_CS_016,
  },
  {
    question: 'What happens in the URL inspector when you remove the "s" from "https://" and change ".gov.in" to ".xyz"?',
    observableOptions: [
      'The padlock disappears, security level drops to Dangerous, and warning badges activate',
      'The website loads 100 times faster',
      'The browser creates a new Scratch sprite',
      'No change occurs at all',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_CS_019,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead Cyber Architect: St. Xavier’s Digital Portal',
  description: 'Design a 3-page interactive school showcase integrating PowerPoint dynamic navigation, an embedded Scratch mini-game, a verified HTML notice board, and a certified HTTPS security certificate.',
  steps: [
    'Create an interactive presentation with Home and Next action buttons linking slides together',
    'Embed a live-linked Excel sports score chart that refreshes on workbook edit',
    'Code a Scratch eco-cleanup game with arrow controls, collision detection, and score variables',
    'Publish an HTML5 page with verified <head> metadata, <h1> headings, <ol> lists, and <a href> links',
    'Audit all school web links against phishing, unencrypted HTTP, and suspicious domain extensions',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
function C6_ComputerSciencePowerpointImportingDataSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['compsci'] || { name: 'Computer Science', emoji: '💻', color: 'indigo' };

  // ─── 30+ STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Predict-then-check & observations
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Escalating hints and reveal
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & interactive challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive Lab 1: PowerPoint Simulation
  const [pptCurrentSlide, setPptCurrentSlide] = useState<number>(1);
  const [excelRainfall, setExcelRainfall] = useState<number>(140);
  const [pptIsLinked, setPptIsLinked] = useState<boolean>(true);
  const [pptActionSoundPlayed, setPptActionSoundPlayed] = useState<boolean>(false);

  // Interactive Lab 2: Scratch Arcade Simulator
  const [scratchPlayerX, setScratchPlayerX] = useState<number>(150);
  const [scratchStarPos, setScratchStarPos] = useState<{ x: number; y: number }>({ x: 150, y: 30 });
  const [scratchScore, setScratchScore] = useState<number>(0);
  const [scratchGameRunning, setScratchGameRunning] = useState<boolean>(true);
  const [scratchCostume, setScratchCostume] = useState<'walk1' | 'walk2'>('walk1');

  // Interactive Lab 3: HTML Live Inspector
  const [htmlHeadingLevel, setHtmlHeadingLevel] = useState<'h1' | 'h2' | 'h3' | 'h4' | 'h6'>('h1');
  const [htmlBgColor, setHtmlBgColor] = useState<string>('#0f172a');
  const [htmlTextColor, setHtmlTextColor] = useState<string>('#38bdf8');
  const [htmlFontSize, setHtmlFontSize] = useState<number>(4);
  const [htmlIsBold, setHtmlIsBold] = useState<boolean>(true);
  const [htmlIsItalic, setHtmlIsItalic] = useState<boolean>(false);

  // Interactive Lab 4: Media & List Builder
  const [mediaListType, setMediaListType] = useState<'ul' | 'ol'>('ol');
  const [mediaImageSelected, setMediaImageSelected] = useState<string>('monument_delhi.jpg');
  const [mediaHyperlinkActive, setMediaHyperlinkActive] = useState<boolean>(true);

  // Interactive Lab 5: Cyber Security Inspector
  const [cyberProtocol, setCyberProtocol] = useState<'https://' | 'http://'>('https://');
  const [cyberDomain, setCyberDomain] = useState<string>('ncert.nic.in');
  const [cyberShowAuthor, setCyberShowAuthor] = useState<boolean>(true);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 5+ USEEFFECT CALLS ───

  // 1. Mount effect: Load existing mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. BKT-based Adaptive Difficulty Update
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 3. Scratch Game Loop (Falling Object Physics & Collision Detection)
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;
    if (currentSlide !== 1 && phase !== 'sandbox') return;
    if (!scratchGameRunning) return;

    const interval = setInterval(() => {
      setScratchStarPos(prev => {
        let newY = prev.y + 4;
        let newX = prev.x;

        // Collision Check with Basket at Y=180
        if (newY >= 170 && newY <= 200 && Math.abs(prev.x - scratchPlayerX) < 40) {
          audioManager.play('drop-correct');
          setScratchScore(s => s + 1);
          setScratchCostume(c => (c === 'walk1' ? 'walk2' : 'walk1'));
          if (predictionMade && !predictionVerified) {
            setPredictionVerified(true);
            speechManager.speak('Prediction verified! Collision detected and score incremented.');
          }
          newY = 20;
          newX = 40 + Math.floor(Math.random() * 240);
        } else if (newY > 210) {
          // Missed item resets to top
          newY = 20;
          newX = 40 + Math.floor(Math.random() * 240);
        }

        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [phase, currentSlide, scratchGameRunning, scratchPlayerX, predictionMade, predictionVerified]);

  // 4. HTML Canvas 2D Animated Diagnostics HUD
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background HUD
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Status text
      ctx.fillStyle = '#38bdf8';
      ctx.font = '12px monospace';
      ctx.fillText(`CISCE SIMULATOR: NODE [${challenge.nodeId}]`, 12, 20);

      // Animated pulsating frequency line
      ctx.beginPath();
      ctx.strokeStyle = difficulty === 'advanced' ? '#ef4444' : difficulty === 'standard' ? '#3b82f6' : '#22c55e';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 10) {
        const y = 18 + Math.sin((x + frame * 4) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, challenge, difficulty]);

  // 5. Inactivity timer cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── 12+ USECALLBACK HANDLERS ───

  // 1. Escalating hint trigger
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
      speechManager.speak('Let us study the complete step-by-step solution.');
    }
  }, [hintCount, challenge]);

  // 2. Inactivity timer reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 3. Discovery answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 4. Advance to exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Tech Labs. Explore and manipulate the systems!');
  }, []);

  // 5. Advance to sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test PowerPoint links, Scratch physics, and HTML attributes in Free Play.');
  }, []);

  // 6. Advance to challenges
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Ready for ICSE Olympiad Challenges! Read carefully and verify your logic.');
  }, []);

  // 7. Prediction handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis registered! Now verify it live in the interactive panel.');
  }, []);

  // 8. Observation handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp digital observation!' : 'Inspect the rendering output closely.');
  }, []);

  // 9. PowerPoint navigation action button click
  const handlePptActionClick = useCallback((targetSlide: number, playChime: boolean = true) => {
    setPptCurrentSlide(targetSlide);
    if (playChime) {
      audioManager.play('chime');
      setPptActionSoundPlayed(true);
      setTimeout(() => setPptActionSoundPlayed(false), 800);
    }
  }, []);

  // 10. Scratch basket movement
  const handleScratchMove = useCallback((delta: number) => {
    setScratchPlayerX(prev => Math.max(30, Math.min(270, prev + delta)));
    audioManager.play('tap');
  }, []);

  // 11. Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the Class 6 Computer Science curriculum.');
  }, [errors, onComplete]);

  // 12. Next challenge advance
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

  // 13. Answer validator handler (MCQ, Drag-Label, Drag-Sort, Numeric, Construct)
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
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Review the step-by-step logic carefully.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // 14. Drag handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrectTarget = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrectTarget) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // 15. Sort handler
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR WITH RICH MOTION ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">ICSE Class 6 • Computer Science Master Studio</p>
          </div>
        </div>

        {/* Difficulty Badge with Framer Motion */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Tier:</span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600/50'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-600/50'
                : 'bg-blue-950/60 text-blue-400 border-blue-600/50'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Card */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-800/60 shadow-lg"
          >
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-2">
              <span className="text-lg">🚀</span> {SCENARIO.title}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </motion.div>

          {/* Curiosity Hook Interactive Question */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold">Curiosity Hook</span>
              <span className="text-xs text-slate-400">Zero-stakes inquiry</span>
            </div>
            <h3 className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${option}`}
                  className={`p-4 text-left rounded-xl text-xs sm:text-sm transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-indigo-400 mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-xl border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border-emerald-600/50 text-emerald-300'
                      : 'bg-amber-950/50 border-amber-600/50 text-amber-300'
                  } text-xs sm:text-sm`}
                >
                  {discoveryCorrect ? '🎯 Accurate! Data links keep PowerPoint slides dynamically synchronized.' : DISCOVERY_QUESTION.hintAfter}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Guided Discovery Lab</span>
              <h2 className="text-base sm:text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded-full text-xs font-mono font-bold border border-indigo-700">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-amber-300 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
            👉 <span className="font-bold">Instructions:</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 min-h-[360px]"
            >
              {/* LAB 1: POWERPOINT SLIDE SIMULATOR WITH LIVE EXCEL DATA LINK & ACTION BUTTONS */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: PowerPoint Slide Screen Canvas */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner flex flex-col justify-between min-h-[280px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400 font-mono">
                      <span>Presentation1.pptx - [Slide {pptCurrentSlide} of 3]</span>
                      <span className="text-emerald-400">● Slide Show View</span>
                    </div>

                    {/* Slide 1 Content */}
                    {pptCurrentSlide === 1 && (
                      <div className="p-4 space-y-3 text-center my-auto">
                        <h3 className="text-lg font-extrabold text-indigo-300">Monsoon Rainfall in Indian Metro Cities</h3>
                        <p className="text-xs text-slate-300">St. Xavier’s Class 6 Science & Computer Project</p>
                        <div className="flex justify-center gap-3 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePptActionClick(2)}
                            aria-label="Action Button Next to Slide 2"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1"
                          >
                            <span>▶</span> Action: Next Slide
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePptActionClick(3)}
                            aria-label="Hyperlink to Chart Slide"
                            className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/50 text-xs font-semibold rounded-lg underline"
                          >
                            Hyperlink: Jump to Live Chart
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {/* Slide 2 Content */}
                    {pptCurrentSlide === 2 && (
                      <div className="p-4 space-y-3 my-auto">
                        <h4 className="text-sm font-bold text-amber-300">Overview of Rain Gauge Stations</h4>
                        <ul className="text-xs text-slate-300 space-y-1 text-left list-disc pl-4">
                          <li>Kolkata (Alipore Observatory)</li>
                          <li>Mumbai (Santacruz Met Station)</li>
                          <li>Chennai (Meenambakkam Station)</li>
                        </ul>
                        <div className="flex justify-between pt-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePptActionClick(1)}
                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg"
                          >
                            ⏮ Home Action Button
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePptActionClick(3)}
                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg"
                          >
                            Next Slide ⏭
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {/* Slide 3 Content: Excel Data Chart */}
                    {pptCurrentSlide === 3 && (
                      <div className="p-3 space-y-2 my-auto">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-200">Kolkata Monthly Rainfall (mm)</span>
                          <span className={pptIsLinked ? 'text-emerald-400 font-mono' : 'text-amber-400 font-mono'}>
                            {pptIsLinked ? '🔗 Linked to Excel' : '📦 Embedded Static'}
                          </span>
                        </div>

                        {/* Visual SVG Bar Chart */}
                        <svg viewBox="0 0 300 120" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                          {/* Grid Lines */}
                          <line x1="40" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="3" />
                          <line x1="40" y1="60" x2="280" y2="60" stroke="#334155" strokeDasharray="3" />
                          <line x1="40" y1="100" x2="280" y2="100" stroke="#475569" />

                          {/* Axes */}
                          <text x="10" y="25" fill="#94a3b8" fontSize="8">300mm</text>
                          <text x="10" y="65" fill="#94a3b8" fontSize="8">150mm</text>
                          <text x="10" y="105" fill="#94a3b8" fontSize="8">0mm</text>

                          {/* Bars */}
                          <rect x="60" y={100 - (120 / 300) * 80} width="35" height={(120 / 300) * 80} fill="#3b82f6" rx="3" />
                          <text x="77" y="112" textAnchor="middle" fill="#94a3b8" fontSize="8">July</text>

                          {/* Dynamic Linked Bar */}
                          <motion.rect
                            x="130"
                            y={100 - (excelRainfall / 300) * 80}
                            width="35"
                            height={(excelRainfall / 300) * 80}
                            animate={{ y: 100 - (excelRainfall / 300) * 80, height: (excelRainfall / 300) * 80 }}
                            fill="#10b981"
                            rx="3"
                          />
                          <text x="147" y="112" textAnchor="middle" fill="#94a3b8" fontSize="8">Aug ({excelRainfall})</text>

                          <rect x="200" y={100 - (90 / 300) * 80} width="35" height={(90 / 300) * 80} fill="#6366f1" rx="3" />
                          <text x="217" y="112" textAnchor="middle" fill="#94a3b8" fontSize="8">Sept</text>
                        </svg>

                        <div className="flex justify-between pt-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePptActionClick(1)}
                            className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg"
                          >
                            ⏮ Back to Menu
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {pptActionSoundPlayed && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs text-amber-400 font-semibold">
                        🔔 Action Sound Triggered: [Click.wav]
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column: Excel Control Panel */}
                  <div className="lg:col-span-5 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs border-b border-slate-800 pb-2">
                      <span>📊</span> Microsoft Excel (Rainfall_Data.xlsx)
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-slate-300 flex justify-between">
                        <span>August Rainfall Value:</span>
                        <span className="font-mono text-emerald-400 font-bold">{excelRainfall} mm</span>
                      </label>
                      <input
                        type="range"
                        min={50}
                        max={300}
                        value={excelRainfall}
                        onChange={(e) => {
                          setExcelRainfall(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="August Rainfall Slider"
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl space-y-2 text-xs">
                      <div className="text-slate-400 font-semibold">Object Import Configuration:</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPptIsLinked(true)}
                          className={`flex-1 py-1.5 rounded-lg border text-xs font-bold ${
                            pptIsLinked ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          ✓ Link Enabled
                        </button>
                        <button
                          onClick={() => setPptIsLinked(false)}
                          className={`flex-1 py-1.5 rounded-lg border text-xs font-bold ${
                            !pptIsLinked ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          Embedded Only
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {pptIsLinked
                          ? 'Moving the slider instantly updates Slide 3 in real-time via OLE reference link.'
                          : 'Embedded chart is decoupled from external Excel file updates.'}
                      </p>
                    </div>

                    {/* Prediction Trigger in Lab 1 */}
                    {!predictionMade && (
                      <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 space-y-2">
                        <span className="text-xs font-bold text-indigo-300">💡 Predict-Then-Check:</span>
                        <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LAB 2: SCRATCH ARCADE GAME LOOP SIMULATOR */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Scratch Stage Canvas */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-slate-800">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Scratch 3.0 Stage
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                          Score: {scratchScore}
                        </span>
                        <button
                          onClick={() => setScratchScore(0)}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded"
                        >
                          Reset Score
                        </button>
                      </div>
                    </div>

                    {/* SVG Game Stage */}
                    <svg viewBox="0 0 300 220" className="w-full bg-gradient-to-b from-sky-950 to-indigo-950 rounded-xl border border-slate-800">
                      {/* Grid markers */}
                      <line x1="0" y1="200" x2="300" y2="200" stroke="#334155" strokeWidth="2" />

                      {/* Falling Target Star */}
                      <motion.g
                        animate={{ x: scratchStarPos.x, y: scratchStarPos.y }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <circle cx="0" cy="0" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                        <text x="0" y="3" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="bold">★</text>
                      </motion.g>

                      {/* Player Sprite: Basket */}
                      <motion.g animate={{ x: scratchPlayerX }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                        <rect x="-25" y="175" width="50" height="20" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />
                        <text x="0" y="188" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">BASKET</text>

                        {/* Scratch Cat Sprite Actor */}
                        <circle cx="0" cy="160" r="12" fill="#ea580c" />
                        <circle cx="-4" cy="158" r="2" fill="#fff" />
                        <circle cx="4" cy="158" r="2" fill="#fff" />
                        <polygon points="-8,150 -4,142 0,150" fill="#ea580c" />
                        <polygon points="0,150 4,142 8,150" fill="#ea580c" />
                      </motion.g>
                    </svg>

                    {/* Arrow Keys Virtual Gamepad */}
                    <div className="flex justify-center gap-4 pt-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleScratchMove(-25)}
                        aria-label="Move Left"
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 flex items-center gap-1 text-xs"
                      >
                        ◀ Left Arrow (change x by -10)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleScratchMove(25)}
                        aria-label="Move Right"
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 flex items-center gap-1 text-xs"
                      >
                        Right Arrow (change x by 10) ▶
                      </motion.button>
                    </div>
                  </div>

                  {/* Right Column: Scratch Block Architecture */}
                  <div className="lg:col-span-5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-amber-400 border-b border-slate-800 pb-2">
                      🧩 Active Scripts Workspace
                    </div>

                    {/* Visual representation of Scratch Blocks */}
                    <div className="space-y-1 text-[11px] font-mono">
                      {/* Event Block */}
                      <div className="bg-amber-600 text-white px-3 py-1.5 rounded-t-lg font-bold">
                        when ⚑ clicked
                      </div>

                      {/* Variable Init */}
                      <div className="bg-orange-600 text-white px-3 py-1 pl-6">
                        set [score v] to (0)
                      </div>

                      {/* Forever Loop */}
                      <div className="bg-amber-500 text-slate-950 px-3 py-1 font-bold">
                        forever
                      </div>

                      {/* Nested If touching */}
                      <div className="bg-amber-500 text-slate-950 pl-4 py-1">
                        <div className="bg-amber-600 text-white px-3 py-1 rounded">
                          if &lt;touching [Basket v]?&gt; then
                        </div>
                        <div className="bg-orange-600 text-white px-3 py-1 ml-4 my-0.5 rounded">
                          change [score v] by (1)
                        </div>
                        <div className="bg-blue-600 text-white px-3 py-1 ml-4 rounded">
                          go to [random position v]
                        </div>
                        <div className="bg-amber-600 text-white px-3 py-0.5 rounded mt-0.5">
                          end
                        </div>
                      </div>

                      <div className="bg-amber-500 text-slate-950 px-3 py-0.5 rounded-b-lg font-bold">
                        end
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                      The C-shaped <span className="text-amber-400 font-bold">forever</span> loop acts as the continuous game heartbeat. The sensing block detects collision with the player, driving the <span className="text-orange-400 font-bold">score</span> variable accumulator.
                    </p>
                  </div>
                </div>
              )}

              {/* LAB 3: HTML LIVE INSPECTOR & TEXT FORMATTING */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Code Editor Controls */}
                  <div className="lg:col-span-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
                    <div className="text-indigo-300 font-bold border-b border-slate-800 pb-2 flex justify-between">
                      <span>💻 HTML Source Code</span>
                      <span className="text-slate-400 font-normal">index.html</span>
                    </div>

                    {/* Heading Selector */}
                    <div className="space-y-1">
                      <label className="text-slate-300 block font-sans text-xs">Heading Tag Hierarchy:</label>
                      <div className="flex gap-1">
                        {(['h1', 'h2', 'h3', 'h4', 'h6'] as const).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setHtmlHeadingLevel(tag);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-1 rounded border text-xs font-bold uppercase ${
                              htmlHeadingLevel === tag ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            &lt;{tag}&gt;
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Styling Toggles */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-slate-300 block font-sans text-xs mb-1">Body bgcolor:</label>
                        <select
                          value={htmlBgColor}
                          onChange={(e) => setHtmlBgColor(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                        >
                          <option value="#0f172a">Slate Navy (#0f172a)</option>
                          <option value="#1e1b4b">Deep Indigo (#1e1b4b)</option>
                          <option value="#064e3b">Emerald Night (#064e3b)</option>
                          <option value="#450a0a">Crimson Red (#450a0a)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-slate-300 block font-sans text-xs mb-1">Text Color:</label>
                        <select
                          value={htmlTextColor}
                          onChange={(e) => setHtmlTextColor(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                        >
                          <option value="#38bdf8">Sky Blue (#38bdf8)</option>
                          <option value="#facc15">Golden Yellow (#facc15)</option>
                          <option value="#ffffff">Pure White (#ffffff)</option>
                          <option value="#4ade80">Mint Green (#4ade80)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-1 font-sans text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={htmlIsBold}
                          onChange={(e) => setHtmlIsBold(e.target.checked)}
                          className="accent-indigo-500"
                        />
                        <span>Wrap with &lt;b&gt; (Bold)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={htmlIsItalic}
                          onChange={(e) => setHtmlIsItalic(e.target.checked)}
                          className="accent-indigo-500"
                        />
                        <span>Wrap with &lt;i&gt; (Italic)</span>
                      </label>
                    </div>

                    {/* Observation Question */}
                    {!observationAnswered && (
                      <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 space-y-2 font-sans">
                        <span className="text-xs font-bold text-indigo-300">🔍 Scientific Observation:</span>
                        <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Live Browser Render Preview */}
                  <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs text-slate-400">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      </div>
                      <span className="font-mono text-slate-300 ml-2">Chrome Tab: [Taj Mahal - Agra]</span>
                    </div>

                    {/* Rendered HTML Window */}
                    <div
                      style={{ backgroundColor: htmlBgColor, color: htmlTextColor }}
                      className="flex-1 p-6 rounded-xl mt-3 transition-colors duration-300 shadow-inner flex flex-col justify-center space-y-3"
                    >
                      {/* Dynamic Heading */}
                      {htmlHeadingLevel === 'h1' && (
                        <h1 className={`text-2xl font-black ${htmlIsBold ? 'font-bold' : 'font-normal'} ${htmlIsItalic ? 'italic' : ''}`}>
                          The Taj Mahal, Agra
                        </h1>
                      )}
                      {htmlHeadingLevel === 'h2' && (
                        <h2 className={`text-xl font-bold ${htmlIsBold ? 'font-bold' : 'font-normal'} ${htmlIsItalic ? 'italic' : ''}`}>
                          The Taj Mahal, Agra
                        </h2>
                      )}
                      {htmlHeadingLevel === 'h3' && (
                        <h3 className={`text-lg font-semibold ${htmlIsBold ? 'font-bold' : 'font-normal'} ${htmlIsItalic ? 'italic' : ''}`}>
                          The Taj Mahal, Agra
                        </h3>
                      )}
                      {htmlHeadingLevel === 'h4' && (
                        <h4 className={`text-base font-medium ${htmlIsBold ? 'font-bold' : 'font-normal'} ${htmlIsItalic ? 'italic' : ''}`}>
                          The Taj Mahal, Agra
                        </h4>
                      )}
                      {htmlHeadingLevel === 'h6' && (
                        <h6 className={`text-xs font-normal uppercase tracking-wider ${htmlIsBold ? 'font-bold' : 'font-normal'} ${htmlIsItalic ? 'italic' : ''}`}>
                          The Taj Mahal, Agra
                        </h6>
                      )}

                      <hr className="border-slate-700" />

                      <p className="text-xs sm:text-sm leading-relaxed">
                        The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, Uttar Pradesh.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: HTML MEDIA, LISTS, AND HYPERLINKS */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: List and Hyperlink Assembly */}
                  <div className="lg:col-span-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-4 text-xs">
                    <div className="text-indigo-300 font-bold border-b border-slate-800 pb-2">
                      🏷 HTML Lists & Link Customizer
                    </div>

                    <div className="space-y-2">
                      <span className="text-slate-300 font-semibold">Select List Container Tag:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setMediaListType('ol')}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold ${
                            mediaListType === 'ol' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          &lt;ol&gt; Ordered (Numbered 1, 2, 3)
                        </button>
                        <button
                          onClick={() => setMediaListType('ul')}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold ${
                            mediaListType === 'ul' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          &lt;ul&gt; Unordered (Bulleted •)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-slate-300 font-semibold">Select Image Asset (&lt;img src="..."&gt;):</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'monument_delhi.jpg', title: 'Qutub Minar (Delhi)' },
                          { id: 'isro_rocket.jpg', title: 'LVM3 Rocket (ISRO)' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setMediaImageSelected(item.id)}
                            className={`p-2 rounded-lg border text-left text-xs ${
                              mediaImageSelected === item.id ? 'bg-blue-600/30 text-blue-200 border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            🖼 {item.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={mediaHyperlinkActive}
                          onChange={(e) => setMediaHyperlinkActive(e.target.checked)}
                          className="accent-indigo-500"
                        />
                        <span>Wrap image inside &lt;a href="https://delhitourism.gov.in"&gt;</span>
                      </label>
                    </div>
                  </div>

                  {/* Right Column: HTML Output & Interactive Preview */}
                  <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div className="text-xs text-slate-400 border-b border-slate-800 pb-2">
                      🌐 Browser Render Output
                    </div>

                    {/* Live List Display */}
                    <div className="p-4 bg-slate-900 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Historical Facts of Delhi</h4>
                      {mediaListType === 'ol' ? (
                        <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-1">
                          <li>Construction of Qutub Minar began in 1199 AD.</li>
                          <li>It stands 72.5 meters tall with 379 spiral steps.</li>
                          <li>Designated a UNESCO World Heritage site in 1993.</li>
                        </ol>
                      ) : (
                        <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                          <li>Wear comfortable walking shoes when visiting.</li>
                          <li>Carry drinking water during afternoon visits.</li>
                          <li>Photography permits are available at the gate.</li>
                        </ul>
                      )}

                      {/* Image Preview with optional Clickable Hyperlink */}
                      <div className="pt-2 border-t border-slate-800">
                        {mediaHyperlinkActive ? (
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            href="#preview"
                            onClick={(e) => {
                              e.preventDefault();
                              audioManager.play('pop');
                              speechManager.speak('Hyperlinked image clicked! Opening external portal.');
                            }}
                            className="block p-3 bg-blue-950/40 border-2 border-dashed border-blue-500/60 rounded-xl text-center cursor-pointer hover:bg-blue-900/40 transition-colors"
                          >
                            <span className="text-2xl block mb-1">🏛️</span>
                            <span className="text-xs text-blue-300 font-bold underline">
                              [Clickable Image: {mediaImageSelected} → Opens Delhi Tourism]
                            </span>
                          </motion.a>
                        ) : (
                          <div className="p-3 bg-slate-800 rounded-xl text-center">
                            <span className="text-2xl block mb-1">🖼️</span>
                            <span className="text-xs text-slate-400">[Static Image: {mediaImageSelected}]</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: CYBER SECURITY & URL CREDIBILITY EVALUATOR */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: URL Parameter Controls */}
                  <div className="lg:col-span-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-4 text-xs">
                    <div className="text-indigo-300 font-bold border-b border-slate-800 pb-2">
                      🛡️ URL Credibility Parameter Console
                    </div>

                    <div className="space-y-2">
                      <span className="text-slate-300 font-semibold">Protocol Security:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setCyberProtocol('https://');
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold ${
                            cyberProtocol === 'https://' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          🔒 https:// (Encrypted SSL/TLS)
                        </button>
                        <button
                          onClick={() => {
                            setCyberProtocol('http://');
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold ${
                            cyberProtocol === 'http://' ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          ⚠️ http:// (Unencrypted Plaintext)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-slate-300 font-semibold">Domain Authority:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { domain: 'ncert.nic.in', type: 'Official Govt Edu' },
                          { domain: 'isro.gov.in', type: 'Official Govt Space' },
                          { domain: 'free-scholarship.xyz', type: 'Suspicious / Phishing' },
                          { domain: 'win-prizes-now.biz', type: 'Malicious / Scam' },
                        ].map((item) => (
                          <button
                            key={item.domain}
                            onClick={() => {
                              setCyberDomain(item.domain);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-lg border text-left text-xs ${
                              cyberDomain === item.domain ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            <span className="font-mono block font-bold">{item.domain}</span>
                            <span className="text-[10px] text-slate-400">{item.type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Threat Assessment Card */}
                  <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div className="text-xs text-slate-400 border-b border-slate-800 pb-2">
                      🔍 Security Evaluation Engine
                    </div>

                    {/* Full Address Bar Visual */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 font-mono text-xs flex items-center gap-2">
                      <span>{cyberProtocol === 'https://' ? '🔒' : '🔓'}</span>
                      <span className={cyberProtocol === 'https://' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {cyberProtocol}
                      </span>
                      <span className="text-slate-100">{cyberDomain}</span>
                      <span className="text-slate-500">/portal/index.html</span>
                    </div>

                    {/* Threat Score Result */}
                    {cyberProtocol === 'https://' && (cyberDomain.includes('.gov.in') || cyberDomain.includes('.nic.in')) ? (
                      <div className="p-4 bg-emerald-950/60 border border-emerald-600/60 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                          <span>✅</span> TRUSTED & VERIFIED INSTITUTIONAL DOMAIN
                        </div>
                        <p className="text-xs text-slate-300">
                          Data transmission is fully encrypted with valid government security credentials. Safe for student learning and resource downloads.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-rose-950/60 border border-rose-600/60 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                          <span>🚨</span> HIGH RISK CYBER THREAT DETECTED
                        </div>
                        <p className="text-xs text-slate-300">
                          Warning: Missing HTTPS encryption or unverified high-risk top-level domain (.xyz/.biz). Never enter passwords or personal data here.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono font-medium">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Next Lab"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Free Sandbox"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg"
              >
                Free Exploration Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (PRESSURE-FREE EXPERIMENTATION) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-1">
              <span>🎮</span> Free Play Exploration Studio (No Grading)
            </div>
            <p className="text-xs text-slate-300">
              Manipulate sliders, toggle HTML code tags, and test Scratch collision physics with zero assessment pressure. Build your intuitive understanding!
            </p>
          </div>

          {/* Unified Sandbox Console */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sandbox Module 1: Scratch Arcade */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-300">Arcade Physics Playground:</span>
              <svg viewBox="0 0 300 160" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                <circle cx={scratchStarPos.x} cy={scratchStarPos.y * 0.7} r="8" fill="#facc15" />
                <rect x={scratchPlayerX - 20} y="130" width="40" height="15" rx="3" fill="#d97706" />
              </svg>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-emerald-400 font-bold">Score: {scratchScore}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleScratchMove(-20)} className="px-3 py-1 bg-slate-800 text-xs text-white rounded">
                    ◀ Left
                  </button>
                  <button onClick={() => handleScratchMove(20)} className="px-3 py-1 bg-slate-800 text-xs text-white rounded">
                    Right ▶
                  </button>
                </div>
              </div>
            </div>

            {/* Sandbox Module 2: PowerPoint & HTML Mixer */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-300">Excel Data Synchronizer:</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Rainfall Value:</span>
                  <span className="font-mono text-emerald-400 font-bold">{excelRainfall} mm</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={300}
                  value={excelRainfall}
                  onChange={(e) => setExcelRainfall(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-xs font-bold text-slate-200">Live Linked Bar Height: {(excelRainfall / 3).toFixed(0)}px</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              I am Ready for Olympiad Challenges! 🏆 →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES (20+ CHALLENGES WITH ESCALATING HINTS) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Animated 2D Canvas Diagnostics HUD */}
          <canvas ref={canvasRef} width={600} height={35} className="w-full rounded-xl border border-slate-800 shadow-inner" />

          {/* Challenge Header & Dynamic Progress */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">CISCE Practice Quest</span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Competency:</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-indigo-950 text-indigo-300 border border-indigo-700">
                {challenge.competencyLevel}
              </span>
            </div>
          </div>

          {/* Progress Bar with Motion */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ / Classify / Distinguish / Match Formats */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                      wrongFlash
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Format */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag label: ${item.label}`}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Drop Targets Diagram */}
                <svg viewBox="0 0 400 200" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2">
                  {/* Root Box */}
                  <rect x="150" y="15" width="100" height="35" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="200" y="37" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    {droppedLabels.zone_root || '[Drop Root Tag]'}
                  </text>
                  <rect
                    x="150"
                    y="15"
                    width="100"
                    height="35"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_root')}
                    className="cursor-pointer"
                  />

                  {/* Head Box */}
                  <rect x="50" y="80" width="120" height="35" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="110" y="102" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="bold">
                    {droppedLabels.zone_head || '[Drop Head Tag]'}
                  </text>
                  <rect
                    x="50"
                    y="80"
                    width="120"
                    height="35"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_head')}
                    className="cursor-pointer"
                  />

                  {/* Title Box */}
                  <rect x="50" y="140" width="120" height="35" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="110" y="162" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">
                    {droppedLabels.zone_title || '[Drop Title Tag]'}
                  </text>
                  <rect
                    x="50"
                    y="140"
                    width="120"
                    height="35"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_title')}
                    className="cursor-pointer"
                  />

                  {/* Body Box */}
                  <rect x="230" y="80" width="130" height="95" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="295" y="132" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">
                    {droppedLabels.zone_body || '[Drop Body Tag]'}
                  </text>
                  <rect
                    x="230"
                    y="80"
                    width="130"
                    height="95"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_body')}
                    className="cursor-pointer"
                  />
                </svg>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit Drag Labels"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Structure Labels ✓
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Format */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIndex + 1}: ${item}`}
                      className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span className="font-mono text-indigo-400 font-bold mr-2">{displayIndex + 1}.</span>
                      <span className="flex-1 font-mono">{item}</span>
                      <span className="text-slate-500 text-xs">☰ Drag to Reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || []
                    )
                  }
                  disabled={showExplanation}
                  aria-label="Check Sequence Order"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Step Order ✓
                </motion.button>
              </div>
            )}

            {/* Numeric Input Format */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Numeric answer input"
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit Numeric Answer"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Block Sequence Format */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400 italic">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-mono rounded-lg shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <div key={i} className="px-2.5 py-1 bg-indigo-900 border border-indigo-600 text-indigo-200 text-xs font-mono rounded-lg flex items-center gap-1">
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold ml-1 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click blocks above to construct the game sequence...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Submit Constructed Blocks"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Constructed Logic ✓
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-700/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <span>💡</span> CISCE Board Step-by-Step Logic Analysis:
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    aria-label="Reveal Next Step"
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to Next Challenge"
                    className="block px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Quest →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD CAPSTONE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Class 6 Computing Mastery Certified! 🎉</h2>
            <p className="text-sm text-slate-300">
              Final Competency Score: <span className="text-emerald-400 font-bold font-mono">{Math.max(0, 100 - errors * 5)}%</span> | Mastery Tier: <span className="text-indigo-400 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-600/50 text-xs sm:text-sm text-emerald-200">
            {errors === 0
              ? '🌟 OUTSTANDING PERFECT SCORE! You have mastered PowerPoint linking, Scratch arcade physics, HTML markup, and cyber netiquette flawlessly!'
              : errors <= 3
              ? '👏 EXCELLENT PERFORMANCE! Your conceptual clarity in programming and web design is well above standard. Review misconceptions below to lock in 100%!'
              : '💪 COMMENDABLE EFFORT! Review the targeted misconceptions below and re-explore the interactive labs to sharpen your digital skills!'}
          </div>

          {/* Misconceptions Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Targeted Conceptual Corrections:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Common Error: {m.misconception}</p>
                      <p className="text-emerald-300">✓ CISCE Standard: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Schedule Status */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-indigo-300 block mb-1">📅 Spaced Repetition Review Interval:</span>
              Memory consolidation session scheduled in{' '}
              <span className="font-bold text-emerald-400">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
              .
            </div>
            <span className="text-2xl">🧠</span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <span>🏫</span> {REAL_WORLD_ACTIVITY.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono text-indigo-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Quest Milestone Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_ComputerSciencePowerpointImportingDataSim;