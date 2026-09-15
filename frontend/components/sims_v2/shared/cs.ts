/**
 * sims_v2/class1-5 — Computer Science strand (new — fills the CS gap
 * the old set had). Basics → files → internet → logic, age-scaled.
 * subject='cs'.
 */
import type { SimDef } from '../engine/types';

const R = { prompts: ['What surprised you?', 'Tell a friend what computers can do!'] };

export const csBasics: SimDef = {
    id: 'cs_basics', title: 'What is a Computer?', subtitle: 'The thinking machine!',
    classLevel: 1, subject: 'cs', topic: 'Computer Basics',
    chapters: ['Computer Skills: Basics'],
    emoji: '💻', theme: { bg: 'from-slate-100 to-gray-200', accent: 'slate', scene: 'computer' },
    scenario: { role: "a computer-trainer", intro: "A computer follows your instructions — learn to guide it!", goal: "Know every computer part." },
    discovery: { question: 'Is a computer smart — or does it only do what we tell it?', options: ['Only what we tell it!', 'It is smart like us', 'It thinks alone'], answer: 'Only what we tell it!', hook: 'A computer follows our instructions exactly — it is fast, not smart. Let us learn!' },
    teaching: [
        { title: 'A Computer Listens! 💻', text: 'A computer does exactly what we tell it — nothing more. It follows our instructions very fast!', emoji: '💻', bgColor: 'from-slate-400 to-gray-500' },
        { title: 'Parts of a Computer 🖥️', text: 'Monitor (the screen), keyboard (we type), mouse (we point), CPU (the brain inside)!', emoji: '🖥️', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Input and Output ➡️', text: 'We give INPUT (type, click) and the computer gives OUTPUT (shows, plays)!', emoji: '➡️', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Computers Help Us 🌟', text: 'Computers help us write, draw, learn, and play — but they need our instructions!', emoji: '🌟', bgColor: 'from-violet-400 to-purple-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'Which part is the computer\'s brain?', answer: 'CPU', options: ['Monitor', 'CPU', 'Mouse'],
          hint: 'It thinks inside!', misconception: 'The CPU is the brain — it follows all instructions!',
          workedExample: ['Monitor = screen.', 'CPU = brain.', 'Mouse = pointer.'] },
        { type: 'sort', question: 'Sort: INPUT (we give) or OUTPUT (computer gives)?', options: [],
          sortItems: [
            { id: 'cb1', label: 'Typing on keyboard', emoji: '⌨️', correctBin: 'in' },
            { id: 'cb2', label: 'Showing a picture', emoji: '🖼️', correctBin: 'out' },
            { id: 'cb3', label: 'Clicking the mouse', emoji: '🖱️', correctBin: 'in' },
            { id: 'cb4', label: 'Playing a sound', emoji: '🔊', correctBin: 'out' },
          ],
          bins: [ { id: 'in', label: 'Input ➡️', color: '#3b82f6' }, { id: 'out', label: 'Output ⬅️', color: '#10b981' } ],
          hint: 'We give input, computer gives output!',
          misconception: 'Keyboard & mouse = input. Screen & sound = output!',
          workedExample: ['We type/click = input.', 'Computer shows/plays = output.'] },
        { type: 'mcq', question: 'A computer is smart because it...', answer: 'Follows our instructions fast', options: ['Thinks alone', 'Follows our instructions fast', 'Dreams'],
          hint: 'Does it think or follow?', misconception: 'A computer follows instructions exactly — it is fast, not a thinker!',
          workedExample: ['We give instructions.', 'Computer follows them.', 'Fast, not smart.'] },
    ],
    successLine: 'Computer star! ⭐', tryAgainLine: 'What does each part do?',
    reflect: R,
};

export const csFiles: SimDef = {
    id: 'cs_files', title: 'Files and Folders', subtitle: 'Keep things tidy!',
    classLevel: 2, subject: 'cs', topic: 'Files and Folders',
    chapters: ['Computer Skills: Files'],
    emoji: '📁', theme: { bg: 'from-amber-100 to-yellow-200', accent: 'amber', scene: 'files' },
    scenario: { role: "a file-organizer", intro: "Keep files tidy in folders — save your work!", goal: "Organize every file." },
    discovery: { question: 'How do you keep your toys tidy — thrown everywhere or in boxes?', options: ['In boxes - tidy!', 'Everywhere', 'No toys'], answer: 'In boxes - tidy!', hook: 'Computers keep files tidy in FOLDERS — like boxes for your things!' },
    teaching: [
        { title: 'Files and Folders 📁', text: 'A file is one thing — a picture, a song. A folder holds many files — like a box!', emoji: '📁', bgColor: 'from-amber-400 to-yellow-500' },
        { title: 'Name Your Files 🏷️', text: 'Every file has a name so you can find it — "mydrawing.png"!', emoji: '🏷️', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Save and Open 💾', text: 'SAVE keeps your work. OPEN brings it back. Always save before you finish!', emoji: '💾', bgColor: 'from-emerald-400 to-teal-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'A folder is like a...', answer: 'Box that holds many files', options: ['Single picture', 'Box that holds many files', 'A song'],
          hint: 'It holds things!', misconception: 'A folder holds many files — like a box holds toys!',
          workedExample: ['File = one thing.', 'Folder = holds files.', 'Like a box.'] },
        { type: 'mcq', question: 'Before you finish work on a computer, you should...', answer: 'Save it', options: ['Delete it', 'Save it', 'Shut it'],
          hint: 'Keep your work!', misconception: 'Always SAVE before finishing — or your work is lost!',
          workedExample: ['Save = keep.', 'Always save.'] },
        { type: 'mcq', question: 'Which is a file?', answer: 'mydrawing.png', options: ['A folder', 'mydrawing.png', 'The screen'],
          hint: 'One named thing!', misconception: 'A file is one named thing — a picture, a song, a document!',
          workedExample: ['File = one thing with a name.', 'mydrawing.png is a file.'] },
    ],
    successLine: 'File keeper! ⭐', tryAgainLine: 'Files go in folders!',
    reflect: R,
};

export const csInternet: SimDef = {
    id: 'cs_internet', title: 'The Internet', subtitle: 'Connected world!',
    classLevel: 3, subject: 'cs', topic: 'Internet Basics',
    chapters: ['Computer Skills: Internet'],
    emoji: '🌐', theme: { bg: 'from-cyan-100 to-blue-200', accent: 'cyan', scene: 'internet' },
    scenario: { role: "a safe-surfer", intro: "The internet connects the world — surf safely!", goal: "Stay safe online." },
    discovery: { question: 'How does a website reach your computer — through wires and air?', options: ['Through wires and signals!', 'Magic', 'By post'], answer: 'Through wires and signals!', hook: 'The internet connects computers all over the world — let us see how!' },
    teaching: [
        { title: 'The Internet Connects! 🌐', text: 'The internet joins millions of computers — yours can talk to one far away!', emoji: '🌐', bgColor: 'from-cyan-400 to-blue-500' },
        { title: 'Websites and Browsers 🖱️', text: 'A browser (Chrome, Firefox) opens websites. A website is a page on the internet!', emoji: '🖱️', bgColor: 'from-sky-400 to-indigo-500' },
        { title: 'Be Safe Online! 🛡️', text: 'Never share your name, address, or passwords online. Ask a grown-up first!', emoji: '🛡️', bgColor: 'from-rose-400 to-red-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'What opens a website?', answer: 'A browser', options: ['A printer', 'A browser', 'A folder'],
          hint: 'Chrome or Firefox!', misconception: 'A browser opens websites — Chrome, Firefox, Edge!',
          workedExample: ['Browser = website opener.', 'Chrome, Firefox.'] },
        { type: 'mcq', question: 'Is it safe to share your password online?', answer: 'No — never share it', options: ['Yes to everyone', 'No — never share it', 'Only to strangers'],
          hint: 'Passwords are secret!', misconception: 'Never share passwords — they are your secret key!',
          workedExample: ['Password = secret.', 'Never share it.'] },
        { type: 'mcq', question: 'The internet connects...', answer: 'Computers all over the world', options: ['Only your house', 'Computers all over the world', 'Nothing'],
          hint: 'It is a world network!', misconception: 'The internet is a huge network joining computers worldwide!',
          workedExample: ['Many computers joined.', 'Across the world.'] },
    ],
    successLine: 'Safe surfer! ⭐', tryAgainLine: 'Stay safe online!',
    reflect: R,
};

export const csLogic: SimDef = {
    id: 'cs_logic', title: 'Step-by-Step Thinking', subtitle: 'Algorithms!',
    classLevel: 4, subject: 'cs', topic: 'Algorithms and Logic',
    chapters: ['Computer Skills: Algorithms', 'Computer Skills: Logo'],
    emoji: '🧩', theme: { bg: 'from-violet-100 to-purple-200', accent: 'violet', scene: 'logic' },
    scenario: { role: "a step-planner", intro: "Algorithms are steps in order — plan them!", goal: "Order every algorithm." },
    discovery: { question: 'Can you teach a computer to make a sandwich — does it need every tiny step?', options: ['Yes - every step in order!', 'No - it knows', 'Only the last step'], answer: 'Yes - every step in order!', hook: 'A computer needs exact steps in order — that is an ALGORITHM!' },
    teaching: [
        { title: 'Steps in Order! 🧩', text: 'An algorithm is steps in order — like a recipe. Computers follow them exactly!', emoji: '🧩', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Order Matters! 🔢', text: '"Put on shoes, then socks" fails — you need socks first! Order matters in algorithms!', emoji: '🔢', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Instructions for Computers 💻', text: 'Programs are instructions. Logo lets you draw with commands — FORWARD, RIGHT, LEFT!', emoji: '💻', bgColor: 'from-emerald-400 to-teal-500' },
    ],
    challenges: [
        { type: 'order', question: 'Put the steps in order to make a jam sandwich!', options: [],
          sortItems: [
            { id: 's1', label: 'Spread jam', emoji: '🍓', correctBin: 'st2' },
            { id: 's2', label: 'Take two bread slices', emoji: '🍞', correctBin: 'st1' },
            { id: 's3', label: 'Put together and eat', emoji: '🥪', correctBin: 'st3' },
          ],
          bins: [ { id: 'st1', label: '1st', color: '#8b5cf6' }, { id: 'st2', label: '2nd', color: '#3b82f6' },
                  { id: 'st3', label: '3rd', color: '#10b981' } ],
          hint: 'Bread first, jam next, eat last!',
          misconception: 'Order matters: bread → jam → together!',
          workedExample: ['Bread first.', 'Spread jam.', 'Put together.'] },
        { type: 'mcq', question: 'An algorithm is...', answer: 'Steps in order to do a task', options: ['A computer part', 'Steps in order to do a task', 'A game'],
          hint: 'Like a recipe!', misconception: 'An algorithm = steps in order — like a recipe a computer follows!',
          workedExample: ['Algorithm = ordered steps.', 'Like a recipe.'] },
        { type: 'mcq', question: 'In Logo, FORWARD 100 makes the turtle...', answer: 'Move forward', options: ['Turn around', 'Move forward', 'Stop'],
          hint: 'It moves!', misconception: 'FORWARD moves the turtle ahead — a drawing command!',
          workedExample: ['FORWARD = move ahead.', 'The turtle draws.'] },
    ],
    successLine: 'Logic star! ⭐', tryAgainLine: 'Steps in order!',
    reflect: R,
};

export const csScratch: SimDef = {
    id: 'cs_scratch', title: 'Code Blocks', subtitle: 'Build programs!',
    classLevel: 5, subject: 'cs', topic: 'Block Coding',
    chapters: ['Computer Skills: Scratch', 'Computer Skills: PowerPoint'],
    emoji: '🐱', theme: { bg: 'from-orange-100 to-amber-200', accent: 'orange', scene: 'code' },
    scenario: { role: "a code-builder", intro: "Snap blocks to make programs — build a game!", goal: "Build every program." },
    discovery: { question: 'Can you make a cat dance with just blocks you snap together?', options: ['Yes - code blocks!', 'No', 'Only typing'], answer: 'Yes - code blocks!', hook: 'Scratch lets you snap code blocks like Lego to make things happen!' },
    teaching: [
        { title: 'Snap the Blocks! 🐱', text: 'Scratch uses blocks you snap together — no typing! Move, turn, say, repeat!', emoji: '🐱', bgColor: 'from-orange-400 to-amber-500' },
        { title: 'Events Start Things ⚡', text: '"When flag clicked" starts your code. Events make things happen!', emoji: '⚡', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Loops Repeat 🔁', text: 'A loop does something again and again — "repeat 4" runs it four times!', emoji: '🔁', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Make a Game! 🎮', text: 'With blocks you can make a sprite move, jump, score points — a real game!', emoji: '🎮', bgColor: 'from-rose-400 to-pink-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'In Scratch, what starts your program?', answer: 'When flag clicked', options: ['Repeat', 'When flag clicked', 'Say hello'],
          hint: 'The green flag!', misconception: '"When flag clicked" is the event that starts your Scratch code!',
          workedExample: ['Events start code.', 'Green flag = start.'] },
        { type: 'mcq', question: 'A "repeat" block does what?', answer: 'Runs the inside blocks again and again', options: ['Stops the program', 'Runs the inside blocks again and again', 'Deletes blocks'],
          hint: 'A loop!', misconception: 'Repeat loops — runs the inside blocks that many times!',
          workedExample: ['Repeat = loop.', 'Inside runs again.'] },
        { type: 'order', question: 'Order these blocks to move the sprite forward then say "Hi"!', options: [],
          sortItems: [
            { id: 'b1', label: 'Say "Hi"', emoji: '💬', correctBin: 'bl3' },
            { id: 'b2', label: 'When flag clicked', emoji: '🚩', correctBin: 'bl1' },
            { id: 'b3', label: 'Move 10 steps', emoji: '🚶', correctBin: 'bl2' },
          ],
          bins: [ { id: 'bl1', label: '1st', color: '#f97316' }, { id: 'bl2', label: '2nd', color: '#3b82f6' },
                  { id: 'bl3', label: '3rd', color: '#10b981' } ],
          hint: 'Start event, then move, then talk!',
          misconception: 'Event first, then actions in order!',
          workedExample: ['Flag starts it.', 'Move steps.', 'Say Hi.'] },
    ],
    successLine: 'Code builder! ⭐', tryAgainLine: 'Snap the blocks!',
    reflect: R,
};

export const csSims: SimDef[] = [csBasics, csFiles, csInternet, csLogic, csScratch];
