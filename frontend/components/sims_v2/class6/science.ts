/**
 * Class 6 Science — physics/chemistry/biology nodes the c6_12 sims miss.
 * Senior depth. Real nodeIds from the enhanced graph.
 */
import type { SimDef } from '../engine/types';
import { GrowthTimeline } from './interactives_social';

export const c6PhyCircuits: SimDef = {
    id: 'c6_phy_circuits', title: 'Electric Circuits', subtitle: 'Current, cells, conductors',
    classLevel: 6, subject: 'science', topic: 'Electricity',
    chapters: ['Physics Ch3: Electricity'],
    nodeIds: ['c6_physics_ch03_011','c6_physics_ch03_012','c6_physics_ch03_013','c6_physics_ch03_014','c6_physics_ch03_015','c6_physics_ch03_016','c6_physics_ch03_017'],
    emoji: '⚡', theme: { bg: 'from-yellow-100 to-amber-200', accent: 'yellow', scene: 'circuits' },
    scenario: { role: "a young electrician", intro: "A circuit is a complete path for electricity — break it and the bulb goes out.", goal: "Build and understand circuits." },
    discovery: {
        question: "A bulb has one wire connected but won't glow. What's missing?",
        options: ["A complete loop back to the cell", "A bigger bulb", "A switch"],
        answer: "A complete loop back to the cell",
        hook: "Current needs a complete circuit — a loop from cell to bulb and back!",
    },
    teaching: [
        { title: 'A Torchlight and Its Parts', text: 'A torchlight is a portable electrical system that generates light by creating a complete path—called a circuit—for electricity to flow from a battery to a bulb. Have you ever wondered why your torchlight doesn\'t stay on all the time, even w', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Building a Simple Electrical Circuit', text: 'A simple electrical circuit is a complete, continuous path of conducting material that allows electric current to flow from a power source through a device and  Have you ever wondered how the light bulb in your room turns on the moment you', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Circuit Diagrams and Symbols', text: 'A circuit diagram is a standard, simplified representation of an electrical circuit that uses universal symbols to show how components like batteries, bulbs, an Imagine you are trying to explain how a flashlight works to a friend living far', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Electrical Conductors and Insulators', text: 'An electrical conductor is a material that allows electric current to flow through it easily, while an electrical insulator is a material that resists the flow  Have you ever wondered why your mother uses a plastic handle to lift a hot meta', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Switches: Opening and Closing Circuits', text: 'A switch is a mechanical device in an electrical circuit that controls the flow of current by physically connecting or disconnecting the conductive path. When t Have you ever wondered why the light in your room turns on only when you press', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Electric Cells and Batteries', text: 'An electric cell is a device that converts stored chemical energy into electrical energy to create a voltage difference between its two terminals. A battery is  Think about the remote control you use for your TV; have you ever noticed the', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Series Circuits: One Path for Current', text: 'A series circuit is an electrical arrangement where components are connected end-to-end, creating one single, continuous path for the electric current to flow.  Have you ever noticed a string of small decorative fairy lights where, if one b', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Parallel Circuits: Multiple Paths', text: 'A parallel circuit is an electrical arrangement where components are connected across the same two points, creating multiple independent paths for the electric  Have you ever wondered why, if one light bulb in your house burns out, the rest', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'circuit', prompt: 'Complete the circuit — give it power and light the bulb!' },
    observe: {
        prompt: 'When you opened the switch, what happened?',
        options: ['Bulb went out — circuit broken', 'Bulb got brighter', 'Nothing changed'],
        answer: 'Bulb went out — circuit broken',
    },
    predict: {
        question: 'If you remove one bulb from a series circuit, what happens?',
        options: ['All bulbs go out — path broken', 'Others get brighter', 'Nothing'],
        answer: 'All bulbs go out — path broken',
        verifyWidget: 'electric', verifyPrompt: 'Try it — does removing one bulb kill the whole series?',
    },
    challenges: [
        { type: 'mcq', question: 'A complete circuit needs:', answer: 'a closed loop from cell to component and back', options: ['just a battery', 'a closed loop from cell to component and back', 'a switch only'],
          hint: 'Current must flow in a loop!', misconception: 'A circuit needs a complete path — cell → component → back to cell.',
          workedExample: ['Cell provides current.', 'Wire to bulb.', 'Wire back to cell.', 'Complete loop.'] },
        { type: 'sort', question: 'Sort conductors and insulators:',
          sortItems: [
            { id: 's0', label: 'copper wire', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'rubber', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'iron nail', emoji: '📌', correctBin: 'b0' },
            { id: 's3', label: 'plastic', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'conductor', color: '#3b82f6' },
                  { id: 'b1', label: 'insulator', color: '#ef4444' } ],
          hint: 'Metals conduct; rubber/plastic insulate!', misconception: 'Conductors = metals; insulators = rubber, plastic, wood.',
          workedExample: ['Copper, iron = conduct.', 'Rubber, plastic = insulate.'] },
        { type: 'mcq', question: 'A switch works by:', answer: 'opening or closing the circuit', options: ['making electricity', 'opening or closing the circuit', 'storing charge'],
          hint: 'What does the switch do to the loop?', misconception: 'A switch breaks/completes the loop — ON = closed = current flows.',
          workedExample: ['Switch ON = closed loop.', 'Current flows.', 'OFF = open = no current.'] },
        { type: 'subpart', question: 'Compare circuits:',
          parts: [
            { id: 'a', prompt: 'In a series circuit, current has:', answer: 'one path', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'In parallel, if one bulb fails:', answer: 'others keep working', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Electric Circuits:', hint: 'Work through each part step by step.', misconception: 'Students often think electricity is used up by the bulb and vanishes. In reality, a circuit is a loop; elect', parts: [
            { id: 'a', prompt: 'Name the three basic components found inside a standard torchlight that allow it to function.', answer: 'The three components are the battery, the bulb, and the swit', hint: 'Think: A Torchlight and Its Parts', misconception: 'Students often think electricity is used up by the bulb and vanishes. In reality, a circuit is a loop; elect', workedExample: ['First, ask the student to trace the entire path from one end','Tell them: If the path has a gap, the electricity cannot ret'] },
            { id: 'b', prompt: 'If you take the battery out of your torchlight, the bulb will not light up even if the switch is in the ON p', answer: 'The battery is the source of electrical energy; without it,', hint: 'Think: A Torchlight and Its Parts', misconception: 'Students often think electricity is used up by the bulb and vanishes. In reality, a circuit is a loop; elect', workedExample: ['First, ask the student to trace the entire path from one end','Tell them: If the path has a gap, the electricity cannot ret'] },
            { id: 'c', prompt: 'A torchlight has a switch. If the switch is OFF, how would you describe the status of the electrical circuit', answer: 'The circuit is broken or incomplete, meaning electricity', hint: 'Think: A Torchlight and Its Parts', misconception: 'Students often think electricity is used up by the bulb and vanishes. In reality, a circuit is a loop; elect', workedExample: ['First, ask the student to trace the entire path from one end','Tell them: If the path has a gap, the electricity cannot ret'] },
            { id: 'd', prompt: 'If a torchlight is ON but the bulb is not glowing, what is one possible reason related to the circuit compon', answer: 'The bulb might be fused (broken filament) or the battery mig', hint: 'Think: A Torchlight and Its Parts', misconception: 'Students often think electricity is used up by the bulb and vanishes. In reality, a circuit is a loop; elect', workedExample: ['First, ask the student to trace the entire path from one end','Tell them: If the path has a gap, the electricity cannot ret'] }
        ] },
    ],
    reflect: { prompts: ['Why does a circuit need to be a complete loop?', 'When is parallel better than series?'] },
    successLine: 'Circuit mastered! ⚡', tryAgainLine: 'Check the loop is complete.',
};

export const c6PhyHeat: SimDef = {
    id: 'c6_phy_heat', title: 'Heat', subtitle: 'Conduction, convection, radiation',
    classLevel: 6, subject: 'science', topic: 'Heat',
    chapters: ['Physics Ch7: Heat'],
    nodeIds: ['c6_physics_ch07_019','c6_physics_ch07_020','c6_physics_ch07_021','c6_physics_ch07_022','c6_physics_ch07_023','c6_physics_ch07_024','c6_physics_ch07_025'],
    emoji: '🔥', theme: { bg: 'from-red-100 to-orange-200', accent: 'red', scene: 'heat' },
    scenario: { role: "a heat-investigator", intro: "Heat travels three ways — through solids, liquids, and empty space — warming our world.", goal: "Understand how heat moves." },
    discovery: {
        question: "The sun warms Earth through empty space — no air to carry it. How?",
        options: ["Radiation — heat travels as waves", "Conduction", "Convection"],
        answer: "Radiation — heat travels as waves",
        hook: "Radiation carries heat through empty space — no medium needed!",
    },
    teaching: [
        { title: 'What is Heat and How It Flows', text: 'Heat is a form of energy that moves from a region or object with a higher temperature to a region or object with a lower temperature. This energy transfer conti Have you ever noticed that a metal spoon left in a hot cup of tea becomes hot t', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Conduction: Heat Through Solids', text: 'Conduction is the process of heat transfer through a solid material caused by direct physical contact between its particles. Heat energy moves from the hotter p Have you ever noticed how the handle of a metal spoon gets hot when left in a b', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Convection: Heat Through Liquids and G', text: 'Convection is the process of heat transfer in liquids and gases where the warmer, lighter fluid rises and the cooler, heavier fluid sinks to replace it, creatin Have you ever noticed how the water at the top of a pot starts swirling even be', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Radiation: Heat Without a Medium', text: 'Radiation is the process by which heat energy travels through space in the form of electromagnetic waves without needing any physical material or medium. It all Have you ever felt the warmth of a bonfire on your face even though you aren\'t', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'The Water Cycle and Heat Transfer', text: 'The water cycle is the continuous movement of water on Earth through the atmosphere, land, and oceans, powered by the Sun\'s energy. It involves heat transfer pr Have you ever wondered how a puddle disappears on a sunny day, or how rain clou', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Heat vs Temperature: Understanding the', text: 'Heat is a form of energy related to the total motion of molecules in a substance, while temperature is a measurement indicating how hot or cold an object is bas Have you ever wondered why a small cup of tea feels hot enough to burn your ton', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Insulators: Materials That Block Heat', text: 'An insulator is a material that resists the flow of heat, acting as a barrier to keep heat from moving from one area to another. It essentially blocks or slows  Have you ever wondered why the handle of a metal frying pan is often made of pl', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Applications of Heat Transfer in Daily', text: 'Heat transfer in daily life refers to the natural movement of thermal energy through conduction, convection, and radiation, which we use to regulate temperature Have you ever wondered why the handle of your frying pan is often made of wood', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'grow', prompt: 'Control the heat — how fast does energy spread?' },
    challenges: [
        { type: 'sort', question: 'Match the heat transfer to its type:',
          sortItems: [
            { id: 's0', label: 'Metal spoon in hot soup', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Hot air rising', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Sun warming Earth', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'conduction', color: '#3b82f6' },
                  { id: 'b1', label: 'convection', color: '#ef4444' },
                  { id: 'b2', label: 'radiation', color: '#10b981' } ],
          hint: 'Touch / flow / waves!', misconception: 'Conduction = solids by contact; convection = fluids by movement; radiation = waves through space.',
          workedExample: ['Spoon = conduction.', 'Hot air = convection.', 'Sun = radiation.'] },
        { type: 'mcq', question: 'Heat always flows from:', answer: 'hot to cold', options: ['cold to hot', 'hot to cold', 'no direction'],
          hint: 'Which way does heat move?', misconception: 'Heat flows from higher to lower temperature — hot to cold.',
          workedExample: ['Hot object.', 'Cold object.', 'Heat flows hot → cold.'] },
        { type: 'mcq', question: 'A thermos keeps drinks hot because:', answer: 'it insulates to block heat loss', options: ['it heats the drink', 'it insulates to block heat loss', 'it\'s made of metal'],
          hint: 'How does a thermos trap heat?', misconception: 'A thermos insulates — traps heat inside by blocking transfer.',
          workedExample: ['Insulation.', 'Blocks heat flow.', 'Keeps drinks hot.'] },
        { type: 'subpart', question: 'Heat vs temperature:',
          parts: [
            { id: 'a', prompt: 'Heat is:', answer: 'thermal energy', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Temperature measures:', answer: 'how hot something is', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Heat:', hint: 'Work through each part step by step.', misconception: 'Students often believe cold is a substance that travels, rather than understanding that cold is just the s', parts: [
            { id: 'a', prompt: 'In which direction does heat always flow between two objects of different temperatures?', answer: 'Heat always flows from the hotter object to the cooler objec', hint: 'Think: What is Heat and How It Flows', misconception: 'Students often believe cold is a substance that travels, rather than understanding that cold is just the s', workedExample: ['1','Ask the student to define what heat is (energy) and what col','2'] },
            { id: 'b', prompt: 'If you hold an ice cube in your hand, why does your hand feel cold?', answer: 'Your hand feels cold because heat is flowing out of your han', hint: 'Think: What is Heat and How It Flows', misconception: 'Students often believe cold is a substance that travels, rather than understanding that cold is just the s', workedExample: ['1','Ask the student to define what heat is (energy) and what col','2'] },
            { id: 'c', prompt: 'A metal rod is held over a candle flame. After a few minutes, the other end becomes hot. What is this mode of', answer: 'This is called conduction', hint: 'Think: What is Heat and How It Flows', misconception: 'Students often believe cold is a substance that travels, rather than understanding that cold is just the s', workedExample: ['1','Ask the student to define what heat is (energy) and what col','2'] },
            { id: 'd', prompt: 'Compare the way a room is warmed by a heater (convection) and the way the Sun warms the Earth (radiation). Why', answer: 'The heater warms the air, which moves in currents (convectio', hint: 'Think: What is Heat and How It Flows', misconception: 'Students often believe cold is a substance that travels, rather than understanding that cold is just the s', workedExample: ['1','Ask the student to define what heat is (energy) and what col','2'] }
        ] },
    ],
    reflect: { prompts: ['Why does metal feel colder than wood at the same temperature?', 'How does the sun heat Earth through space?'] },
    successLine: 'Heat mastered! 🔥', tryAgainLine: 'Heat flows hot to cold, three ways.',
};

export const c6PhyMotion: SimDef = {
    id: 'c6_phy_motion', title: 'Motion & Time', subtitle: 'Speed and measurement',
    classLevel: 6, subject: 'science', topic: 'Motion',
    chapters: ['Physics Ch8: Motion'],
    nodeIds: ['c6_physics_ch08_027','c6_physics_ch08_029','c6_physics_ch08_030','c6_physics_ch08_031','c6_physics_ch08_033'],
    emoji: '🏃', theme: { bg: 'from-sky-100 to-cyan-200', accent: 'sky', scene: 'motion' },
    scenario: { role: "a race-timer", intro: "Speed is distance over time — and motion can be steady (uniform) or changing (non-uniform).", goal: "Measure speed and motion." },
    discovery: {
        question: "Two runners cover 100m — one in 20s, one in 25s. Who is faster?",
        options: ["The 20s runner — less time = faster", "The 25s runner", "Same speed"],
        answer: "The 20s runner — less time = faster",
        hook: "Same distance, less time = faster! Speed = distance ÷ time.",
    },
    teaching: [
        { title: 'Measuring Time: From Sundials to Clock', text: 'A sundial is an ancient device that measures time by using the position of a shadow cast by a stationary object (a gnomon) onto a marked surface, tracking the s Have you ever noticed how your own shadow changes length and direction during a', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Slow and Fast: Comparing Speeds', text: 'Speed is the distance an object travels in a specific amount of time. It tells us how fast or slow an object is moving by comparing the total path covered to th Imagine you and your friend both start walking from the school gate to the park', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Understanding Speed', text: 'Speed is a measure of how fast an object changes its position, calculated by dividing the total distance travelled by the time taken to cover that distance. It  Imagine you and your friend are both running to the school gate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Uniform Motion: Constant Speed', text: 'Uniform motion occurs when an object moves in a straight line at a constant speed, covering equal distances in equal intervals of time. It represents a steady,  Imagine you are riding a bicycle on a long, straight, empty road, and you keep', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Non-uniform Motion: Changing Speed', text: 'Non-uniform motion is the movement of an object where its speed changes over time, meaning it does not cover equal distances in equal intervals of time. In this Have you ever watched a car driving through a busy market street? It doesn\'t mo', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Measuring Speed in Practice', text: 'Speed is a measure of how quickly an object covers a specific distance over a period of time. It is calculated by dividing the total distance travelled by the t Imagine you and your friend decide to race from the school gate to the playgrou', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'The Pendulum and Time Measurement', text: 'A simple pendulum is a device consisting of a small weight (bob) suspended from a fixed point by a thread, which repeats its to-and-fro motion in equal interval Have you ever noticed how a swing in a park moves forward and backward repeated', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Units of Time and Their Conversions', text: 'Time is a physical quantity used to measure the duration of events or the interval between them, with the \'second\' serving as the basic SI unit. Larger and smal Imagine you are waiting for your favorite television show to start; do you chec', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'projectile', prompt: 'Launch the ball — change speed and angle, trace the path!' },
    challenges: [
        { type: 'math_input', question: 'A car travels 100 km in 2 hours. Its speed?', answer: '50',
          mathInput: { placeholder: 'km/h' },
          hint: 'Speed = distance ÷ time!', misconception: 'Speed = 100/2 = 50 km/h.',
          workedExample: ['Speed = distance/time.', '100/2.', '= 50 km/h'] },
        { type: 'mcq', question: 'Uniform motion means:', answer: 'constant speed', options: ['speeding up', 'constant speed', 'stopping'],
          hint: 'Steady speed!', misconception: 'Uniform = constant speed — equal distances in equal times.',
          workedExample: ['Same speed throughout.', 'Equal distances, equal times.', 'Uniform.'] },
        { type: 'mcq', question: 'A car speeding up and slowing down is:', answer: 'non-uniform motion', options: ['uniform motion', 'non-uniform motion', 'no motion'],
          hint: 'Speed is changing!', misconception: 'Changing speed = non-uniform motion.',
          workedExample: ['Speed changes.', 'Not constant.', 'Non-uniform.'] },
        { type: 'subpart', question: 'Two cyclists ride 60 km:',
          parts: [
            { id: 'a', prompt: 'Cyclist A takes 3 hours. Speed?', answer: '20 km/h', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Cyclist B takes 2 hours. Who is faster?', answer: 'Cyclist B', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Motion & Time:', hint: 'Work through each part step by step.', misconception: 'Students often believe the sun physically moves around the earth, causing the shadow to move. They also freq', parts: [
            { id: 'a', prompt: 'What is the main source of energy/movement that causes a sundials shadow to change position?', answer: 'The sun\'s apparent movement across the sky', hint: 'Think: Measuring Time: From Sundials to Clocks', misconception: 'Students often believe the sun physically moves around the earth, causing the shadow to move. They also freq', workedExample: ['Ask the student to stand under a ceiling light and slowly tu','Ask them: Did your hand change shape, or did the light\'s an'] },
            { id: 'b', prompt: 'If you look at a sundial at noon and then again two hours later, why will the shadow point in a different dire', answer: 'Because the suns position in the sky has changed relative t', hint: 'Think: Measuring Time: From Sundials to Clocks', misconception: 'Students often believe the sun physically moves around the earth, causing the shadow to move. They also freq', workedExample: ['Ask the student to stand under a ceiling light and slowly tu','Ask them: Did your hand change shape, or did the light\'s an'] },
            { id: 'c', prompt: 'A student wants to use a sundial to check the time at midnight. Why is this impossible?', answer: 'Because a sundial requires a light source to cast a shadow;', hint: 'Think: Measuring Time: From Sundials to Clocks', misconception: 'Students often believe the sun physically moves around the earth, causing the shadow to move. They also freq', workedExample: ['Ask the student to stand under a ceiling light and slowly tu','Ask them: Did your hand change shape, or did the light\'s an'] },
            { id: 'd', prompt: 'Compare a sundial to a modern digital watch. What is the biggest difference in how they know the time?', answer: 'A sundial relies on external natural light and celestial pos', hint: 'Think: Measuring Time: From Sundials to Clocks', misconception: 'Students often believe the sun physically moves around the earth, causing the shadow to move. They also freq', workedExample: ['Ask the student to stand under a ceiling light and slowly tu','Ask them: Did your hand change shape, or did the light\'s an'] }
        ] },
    ],
    generate: { kind: 'div', count: 5, level: 6 },
    sampleChallenges: 8,
    reflect: { prompts: ['How is speed different from distance?', 'Why is most real motion non-uniform?'] },
    successLine: 'Motion mastered! 🏃', tryAgainLine: 'Speed = distance ÷ time.',
};

export const c6PhyLight: SimDef = {
    id: 'c6_phy_light', title: 'Light & Shadows', subtitle: 'Rectilinear propagation',
    classLevel: 6, subject: 'science', topic: 'Light',
    chapters: ['Physics Ch11: Light'],
    nodeIds: ['c6_physics_ch11_035','c6_physics_ch11_036','c6_physics_ch11_037','c6_physics_ch11_038','c6_physics_ch11_039','c6_physics_ch11_040'],
    emoji: '💡', theme: { bg: 'from-yellow-100 to-amber-200', accent: 'yellow', scene: 'light' },
    scenario: { role: "a light-investigator", intro: "Light travels in straight lines — that's why shadows form and mirrors reflect.", goal: "Understand how light behaves." },
    discovery: {
        question: "Why does a shadow have the same shape as the object blocking the light?",
        options: ["Light travels straight — the object blocks its path", "Shadows are alive", "Light bends around objects"],
        answer: "Light travels straight — the object blocks its path",
        hook: "Light goes straight — block it and you get a shadow matching the object's shape!",
    },
    teaching: [
        { title: 'Sources of Light: Natural and Artifici', text: 'Sources of light are objects that emit or produce their own light (natural sources) or objects that have been created to provide illumination (artificial source Imagine you are sitting in your room at night.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Light Travels in Straight Lines', text: 'Light is a form of energy that travels in a straight line, known as rectilinear propagation. This means it cannot bend around obstacles unless it is reflected o Have you ever tried to look at a light bulb through a garden hose? If the hose', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Transparent, Translucent, and Opaque M', text: 'Materials are classified by how much light they allow to pass through them: transparent materials let most light pass so objects are clearly visible, translucen Imagine you are looking through your bedroom window; why can you see the street', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Shadow Formation and Its Properties', text: 'A shadow is a dark region created when an opaque object prevents light from reaching a surface. It requires three components: a source of light, an opaque objec Have you ever noticed your shadow getting longer on the ground as the sun sets?', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Reflection of Light: Bouncing Off Surf', text: 'Reflection is the bouncing of light rays off a surface. We see objects only because light hits them and reflects into our eyes, allowing our brain to perceive t Have you ever wondered why you can see your face in a mirror but not in a plain', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Images Formed by a Plane Mirror', text: 'A plane mirror is a flat, smooth reflecting surface that produces an image which appears to be located behind the mirror at the same distance as the object in f Have you ever noticed that when you comb your hair in front of a mirror, your r', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'The Pinhole Camera: How It Works', text: 'A pinhole camera is a simple light-tight box with a tiny hole on one side that forms an inverted, real image of an object on the opposite screen by allowing lig Have you ever wondered how a tiny hole in a dark box can capture a picture of', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Making a Periscope Using Reflection', text: 'A periscope is an optical instrument that uses two plane mirrors placed at 45-degree angles to allow an observer to see objects that are outside their direct li Have you ever tried to see over a tall crowd at a school parade or look around', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Multiple Reflections and Kaleidoscopes', text: 'Multiple reflection is the process where a light ray bounces off two or more mirrors consecutively, creating several images of a single object. A kaleidoscope i Have you ever stood between two mirrors in a trial room or a barbershop and not', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Uses of Light and Optical Instruments', text: 'Optical instruments are devices that use lenses or mirrors to manipulate light, allowing us to see objects more clearly, observe things that are too small for t Have you ever looked at a tiny insect and wished you could see its wings clearl', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'prism', prompt: 'Aim white light at the prism — watch it split into a rainbow!' },
    challenges: [
        { type: 'mcq', question: 'Light travels in:', answer: 'straight lines', options: ['curves', 'straight lines', 'zigzags'],
          hint: 'Rectilinear propagation!', misconception: 'Light travels in straight lines — that\'s why shadows form.',
          workedExample: ['Light goes straight.', 'Block it = shadow.', 'Straight lines.'] },
        { type: 'sort', question: 'Sort by how much light passes:',
          sortItems: [
            { id: 's0', label: 'Clear glass', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Frosted glass', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Wooden door', emoji: '📌', correctBin: 'b2' }
          ],
          bins: [ { id: 'b0', label: 'transparent', color: '#3b82f6' },
                  { id: 'b1', label: 'translucent', color: '#ef4444' },
                  { id: 'b2', label: 'opaque', color: '#10b981' } ],
          hint: 'All light / some light / no light!', misconception: 'Transparent = all light; translucent = some; opaque = none.',
          workedExample: ['Clear glass = all.', 'Frosted = some.', 'Wood = none.'] },
        { type: 'mcq', question: 'A shadow forms when:', answer: 'an opaque object blocks light', options: ['light speeds up', 'an opaque object blocks light', 'it\'s dark outside'],
          hint: 'What blocks the light?', misconception: 'Shadow = dark area where an opaque object blocks light.',
          workedExample: ['Opaque object.', 'Blocks light.', 'Shadow forms.'] },
        { type: 'subpart', question: 'Understand reflection:',
          parts: [
            { id: 'a', prompt: 'A mirror forms an image by:', answer: 'reflecting light', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'A pinhole camera works because light:', answer: 'travels in straight lines', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Light & Shadows:', hint: 'Work through each part step by step.', misconception: 'Students often categorize the Moon as a natural source of light. They see it glowing in the night sky and as', parts: [
            { id: 'a', prompt: 'Which of these is a natural source of light: a lit candle, the Sun, a torch, or a street lamp?', answer: 'The Sun is the natural source', hint: 'Think: Sources of Light: Natural and Artificial', misconception: 'Students often categorize the Moon as a natural source of light. They see it glowing in the night sky and as', workedExample: ['Step 1: Ask the student to look at a mirror in a dark room','Step 2: Explain that if the mirror were a source, it would g','Step 3: Use a flashlight to show that the mirror only shows '] },
            { id: 'b', prompt: 'If you are in a dark room and switch on a study lamp, is the lamp a natural or artificial source of light? Why', answer: 'It is an artificial source because it is a human-made object', hint: 'Think: Sources of Light: Natural and Artificial', misconception: 'Students often categorize the Moon as a natural source of light. They see it glowing in the night sky and as', workedExample: ['Step 1: Ask the student to look at a mirror in a dark room','Step 2: Explain that if the mirror were a source, it would g','Step 3: Use a flashlight to show that the mirror only shows '] },
            { id: 'c', prompt: 'No, it is a natural source. Even though it is not a star or the sun, it is a living organism that produces its', answer: '**Correct Answer:** No, a firefly is a natural source of lig', hint: 'Think: Sources of Light: Natural and Artificial', misconception: 'Students often categorize the Moon as a natural source of light. They see it glowing in the night sky and as', workedExample: ['Step 1: Ask the student to look at a mirror in a dark room','Step 2: Explain that if the mirror were a source, it would g','Step 3: Use a flashlight to show that the mirror only shows '] },
            { id: 'd', prompt: 'Why do we call the Sun our most important natural source of light while stars are also natural?', answer: 'The Sun is the closest star to Earth and provides the vast m', hint: 'Think: Sources of Light: Natural and Artificial', misconception: 'Students often categorize the Moon as a natural source of light. They see it glowing in the night sky and as', workedExample: ['Step 1: Ask the student to look at a mirror in a dark room','Step 2: Explain that if the mirror were a source, it would g','Step 3: Use a flashlight to show that the mirror only shows '] }
        ] },
    ],
    reflect: { prompts: ['Why can\'t you see around a corner?', 'How do shadows prove light travels straight?'] },
    successLine: 'Light mastered! 💡', tryAgainLine: 'Light travels in straight lines.',
};

export const c6PhyEarth: SimDef = {
    id: 'c6_phy_earth', title: 'Earth & Sky', subtitle: 'Day, night, seasons, eclipses',
    classLevel: 6, subject: 'science', topic: 'Earth and Space',
    chapters: ['Physics Ch12: Earth & Sky'],
    nodeIds: ['c6_physics_ch12_045','c6_physics_ch12_046','c6_physics_ch12_047','c6_physics_ch12_048','c6_physics_ch12_049','c6_physics_ch12_050','c6_physics_ch12_051'],
    emoji: '🌍', theme: { bg: 'from-blue-100 to-indigo-200', accent: 'blue', scene: 'earth' },
    scenario: { role: "an astronomer", intro: "Earth spins for day and night, orbits the sun for the year — and shadows in space cause eclipses.", goal: "Understand Earth's motions." },
    discovery: {
        question: "Why is it day in India while it's night in America?",
        options: ["Earth rotates — half faces the sun", "The sun moves", "America is far away"],
        answer: "Earth rotates — half faces the sun",
        hook: "Earth spins — the half facing the sun has day, the other half has night!",
    },
    teaching: [
        { title: 'Rotation of the Earth: Day and Night', text: 'The Earths rotation is the spinning motion of our planet around an imaginary central line called its axis, which connects the North Pole to the South Pole. Thi Have you ever wondered why you go to bed when its dark and wake up when its b', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Revolution of the Earth: The Year', text: 'The revolution of the Earth is its movement in an elliptical orbit around the Sun, which takes approximately 365.25 days to complete one full cycle. This durati Think about your birthday—it happens every year, but have you ever wondered why', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Seasons: Why They Change', text: 'Seasons change because the Earth rotates on an axis that is tilted at an angle of 23.5 degrees relative to its orbit around the Sun. As Earth revolves, this til Have you ever noticed that when it is very hot in India during June, people in', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Understanding Eclipses', text: 'An eclipse is an astronomical event where one celestial body passes into the shadow of another, or blocks the light reaching an observer from another, due to th Have you ever noticed your own shadow on the ground when standing in front of a', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Solar Eclipse: Moon Blocks the Sun', text: 'A solar eclipse occurs when the Moon moves directly between the Earth and the Sun, casting a shadow on the Earths surface and blocking the sunlight for a brief Have you ever noticed how a lamp casts a shadow when you put your hand in front', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Lunar Eclipse: Earth Blocks the Sun', text: 'A lunar eclipse is a celestial event that occurs when the Earth passes directly between the Sun and the Moon, causing the Earths shadow to fall upon the Moon\'s Have you ever played with a flashlight and your hand to cast a shadow on a wall', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Phases of the Moon', text: 'The phases of the Moon are the different shapes of the Moon\'s illuminated portion as seen from Earth, caused by the Moon orbiting the Earth while reflecting sun Have you ever noticed how the Moon sometimes looks like a thin silver slice, a', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Exploring the Night Sky', text: 'A constellation is a recognized group of stars that appears to form a specific pattern in the night sky, often associated with historical or cultural stories. T Have you ever looked at a group of stars and thought they looked like a kite, a', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'orbit', prompt: 'Spin the planets — watch day and night cycle!' },
    challenges: [
        { type: 'mcq', question: 'Day and night are caused by:', answer: 'Earth rotating on its axis', options: ['the sun moving', 'Earth rotating on its axis', 'the moon'],
          hint: 'Earth spins!', misconception: 'Day/night = Earth\'s rotation — the side facing the sun has day.',
          workedExample: ['Earth rotates.', 'Facing sun = day.', 'Away = night.'] },
        { type: 'mcq', question: 'Seasons are caused by:', answer: 'Earth\'s tilted axis', options: ['distance from sun', 'Earth\'s tilted axis', 'the moon'],
          hint: 'Why do seasons change?', misconception: 'Seasons = Earth\'s tilt — different parts get more sunlight through the year.',
          workedExample: ['Tilted axis.', 'More/less sunlight.', 'Seasons change.'] },
        { type: 'mcq', question: 'A solar eclipse happens when:', answer: 'the Moon blocks the Sun', options: ['Earth blocks the Moon', 'the Moon blocks the Sun', 'the sun goes out'],
          hint: 'Moon in the middle!', misconception: 'Solar eclipse = Moon between Sun and Earth, blocking sunlight.',
          workedExample: ['Moon in middle.', 'Blocks the sun.', 'Solar eclipse.'] },
        { type: 'subpart', question: 'Rotation vs revolution:',
          parts: [
            { id: 'a', prompt: 'Rotation causes:', answer: 'day and night', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Revolution around the sun takes:', answer: 'one year', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Earth & Sky:', hint: 'Work through each part step by step.', misconception: 'Students often believe the Sun moves around the Earth because of the common phrase the sun rises and sets. T', parts: [
            { id: 'a', prompt: 'What is the name of the imaginary line that runs through the Earth from the North Pole to the South Pole aroun', answer: 'The line is called the axis', hint: 'Think: Rotation of the Earth: Day and Night', misconception: 'Students often believe the Sun moves around the Earth because of the common phrase the sun rises and sets. T', workedExample: ['Ask the student to stand up and spin in a circle while looki','Ask them if the lamp moved or if their perspective of the la','Explain that just as the lamp stayed in one place while they'] },
            { id: 'b', prompt: 'If you are in India and it is currently daytime, what is happening on the opposite side of the Earth, and why?', answer: 'It is currently night on the opposite side because that part', hint: 'Think: Rotation of the Earth: Day and Night', misconception: 'Students often believe the Sun moves around the Earth because of the common phrase the sun rises and sets. T', workedExample: ['Ask the student to stand up and spin in a circle while looki','Ask them if the lamp moved or if their perspective of the la','Explain that just as the lamp stayed in one place while they'] },
            { id: 'c', prompt: 'If the Earth stopped rotating suddenly, what would happen to the cycle of day and night?', answer: 'The cycle would stop; one side of the Earth would face the S', hint: 'Think: Rotation of the Earth: Day and Night', misconception: 'Students often believe the Sun moves around the Earth because of the common phrase the sun rises and sets. T', workedExample: ['Ask the student to stand up and spin in a circle while looki','Ask them if the lamp moved or if their perspective of the la','Explain that just as the lamp stayed in one place while they'] },
            { id: 'd', prompt: 'Why does the Sun appear to move from the East to the West throughout the day?', answer: 'The Sun appears to move because the Earth rotates from West', hint: 'Think: Rotation of the Earth: Day and Night', misconception: 'Students often believe the Sun moves around the Earth because of the common phrase the sun rises and sets. T', workedExample: ['Ask the student to stand up and spin in a circle while looki','Ask them if the lamp moved or if their perspective of the la','Explain that just as the lamp stayed in one place while they'] }
        ] },
    ],
    reflect: { prompts: ['How would life change if Earth didn\'t tilt?', 'Why do solar and lunar eclipses differ?'] },
    successLine: 'Astronomy mastered! 🌍', tryAgainLine: 'Spin = day, orbit = year.',
};

export const c6ChemMaterials: SimDef = {
    id: 'c6_chem_materials', title: 'Materials', subtitle: 'Properties & classification',
    classLevel: 6, subject: 'science', topic: 'Materials',
    chapters: ['Chemistry Ch4: Materials'],
    nodeIds: ['c6_chemistry_ch04_001','c6_chemistry_ch04_002','c6_chemistry_ch04_003','c6_chemistry_ch04_005','c6_chemistry_ch04_008','c6_chemistry_ch04_009'],
    emoji: '🧱', theme: { bg: 'from-stone-100 to-slate-200', accent: 'stone', scene: 'materials' },
    scenario: { role: "a materials-scientist", intro: "Everything is made of materials — metals, non-metals — each with properties that decide its use.", goal: "Classify materials by their properties." },
    discovery: {
        question: "Why are cooking pots made of metal but their handles of plastic?",
        options: ["Metal conducts heat, plastic insulates", "Plastic is cheaper", "Random choice"],
        answer: "Metal conducts heat, plastic insulates",
        hook: "Each material's properties decide its use — metal conducts, plastic insulates!",
    },
    teaching: [
        { title: 'What Are Materials and Why We Classify', text: 'Materials are substances used to create objects, and matter is anything that occupies space (volume) and has mass. Classification is the process of grouping the Imagine you are looking at your school bag.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Properties of Materials: Appearance, H', text: 'Materials are substances used to create objects, and they are classified based on properties such as appearance (lustre), hardness, and solubility in water. The Have you ever wondered why your water bottle is made of plastic or metal instea', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Effect of Air and Water on Iron: Rusti', text: 'Rusting is a chemical change where iron reacts with oxygen and water to form a new substance called iron oxide, which appears as a reddish-brown, flaky coating  Have you ever noticed that an old iron gate left out in the monsoon rains start', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Effect of Air and Water on Other Metal', text: 'Metals react with air and moisture at different rates: some form protective layers (like aluminium and copper) that prevent further damage, while others, like g Have you ever noticed that old copper coins turn green, or why a gold ring stay', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Non-metals and Their Properties', text: 'Non-metals are materials that generally lack metallic properties such as lustre, malleability, and the ability to conduct heat or electricity. They exist in var Have you ever wondered why the handle of a pressure cooker is made of plastic w', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Are Non-metals Essential for Life?', text: 'Non-metals are materials that are essential for supporting biological life processes, serving as the fundamental building blocks of cells and providing the gase Have you ever wondered why we can build a house out of iron, but our own bodies', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Choosing the Right Material for the Ri', text: 'Material selection is the process of choosing a substance to make an object based on its specific physical and chemical properties, such as hardness, transparen Imagine you are trying to drink water from a sieve—would it work? Of course not', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Metals vs Non-metals: Key Differences', text: 'Metals are elements typically characterized by a shiny (lustrous) appearance, hardness, and the ability to conduct heat and electricity, whereas non-metals gene Have you ever wondered why your kitchen spoons are made of stainless steel whil', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Corrosion: Why Metals Degrade and How', text: 'Corrosion is the gradual, harmful chemical reaction of a metal surface with its environment (such as moisture and oxygen), leading to the degradation of the met Have you ever noticed how an old iron gate or a bicycle chain develops a reddis', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Materials in Our Daily Life: From Kitc', text: 'Matter is defined as anything that occupies space (having volume) and possesses mass (the quantity of material present). Materials are specific types of matter  Start by looking at the water bottle on your desk; why is it made of plastic ra', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { widget: 'tray', prompt: 'Sort materials by their properties — metal or non-metal?' },
    challenges: [
        { type: 'sort', question: 'Sort metals and non-metals:',
          sortItems: [
            { id: 's0', label: 'iron', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'wood', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'copper', emoji: '📌', correctBin: 'b0' },
            { id: 's3', label: 'rubber', emoji: '📌', correctBin: 'b1' },
            { id: 's4', label: 'aluminium', emoji: '📌', correctBin: 'b0' }
          ],
          bins: [ { id: 'b0', label: 'metal', color: '#3b82f6' },
                  { id: 'b1', label: 'non-metal', color: '#ef4444' } ],
          hint: 'Shiny + conducts = metal!', misconception: 'Metals = shiny, conduct heat; non-metals = dull, insulate.',
          workedExample: ['Iron, copper, aluminium = metal.', 'Wood, rubber = non-metal.'] },
        { type: 'mcq', question: 'Pots are made of metal because metal:', answer: 'conducts heat', options: ['is shiny', 'conducts heat', 'is cheap'],
          hint: 'What property matters for cooking?', misconception: 'Metal conducts heat — essential for cooking pots.',
          workedExample: ['Cooking needs heat transfer.', 'Metal conducts.', 'Right material.'] },
        { type: 'mcq', question: 'Rusting happens when iron meets:', answer: 'air and water', options: ['only air', 'air and water', 'only heat'],
          hint: 'What does iron need to rust?', misconception: 'Rust = iron + air + water — a chemical reaction.',
          workedExample: ['Iron + air.', '+ water.', '= rust.'] },
        { type: 'subpart', question: 'Material properties:',
          parts: [
            { id: 'a', prompt: 'A material that lets electricity flow is a:', answer: 'conductor', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Which prevents rusting?', answer: 'painting the iron', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Materials:', hint: 'Work through each part step by step.', misconception: 'Students often confuse transparent with colorless. They might think a colored glass is opaque because it i', parts: [
            { id: 'a', prompt: 'What are the two essential characteristics that define anything as matter?', answer: 'Matter must occupy space (volume) and have mass', hint: 'Think: What Are Materials and Why We Classify Them', misconception: 'Students often confuse transparent with colorless. They might think a colored glass is opaque because it i', workedExample: ['First, ask the student to look through a piece of colored ce','Ask: Can you see the light even though it is colored? Explai','Then, have them compare this to a piece of wood, which block'] },
            { id: 'b', prompt: 'If you have a steel spoon and a wooden spoon, why might you classify them differently in a shiny vs. dull te', answer: 'Steel is lustrous (shiny), whereas wood is non-lustrous (dul', hint: 'Think: What Are Materials and Why We Classify Them', misconception: 'Students often confuse transparent with colorless. They might think a colored glass is opaque because it i', workedExample: ['First, ask the student to look through a piece of colored ce','Ask: Can you see the light even though it is colored? Explai','Then, have them compare this to a piece of wood, which block'] },
            { id: 'c', prompt: 'You need to make a window. Why would you choose glass instead of cardboard?', answer: 'Steps: 1', hint: 'Think: What Are Materials and Why We Classify Them', misconception: 'Students often confuse transparent with colorless. They might think a colored glass is opaque because it i', workedExample: ['First, ask the student to look through a piece of colored ce','Ask: Can you see the light even though it is colored? Explai','Then, have them compare this to a piece of wood, which block'] },
            { id: 'd', prompt: 'Compare a sponge and a stone. If you press them, how do you classify them?', answer: 'The sponge is soft (easily compressed) and the stone is hard', hint: 'Think: What Are Materials and Why We Classify Them', misconception: 'Students often confuse transparent with colorless. They might think a colored glass is opaque because it i', workedExample: ['First, ask the student to look through a piece of colored ce','Ask: Can you see the light even though it is colored? Explai','Then, have them compare this to a piece of wood, which block'] }
        ] },
    ],
    reflect: { prompts: ['Why do we pick different materials for different jobs?', 'How is rusting a chemical change?'] },
    successLine: 'Materials mastered! 🧱', tryAgainLine: 'Match properties to the job.',
};

export const c6ChemChanges: SimDef = {
    id: 'c6_chem_changes', title: 'Changes Around Us', subtitle: 'Physical vs chemical',
    classLevel: 6, subject: 'science', topic: 'Changes',
    chapters: ['Chemistry Ch5: Changes'],
    nodeIds: ['c6_chemistry_ch05_001','c6_chemistry_ch05_002','c6_chemistry_ch05_003','c6_chemistry_ch05_004','c6_chemistry_ch05_005','c6_chemistry_ch05_006','c6_chemistry_ch05_007','c6_chemistry_ch05_008'],
    emoji: '🔄', theme: { bg: 'from-teal-100 to-cyan-200', accent: 'teal', scene: 'changes' },
    scenario: { role: "a change-detective", intro: "Changes happen everywhere — some are physical (reversible), some chemical (new substance forms).", goal: "Tell physical from chemical changes." },
    discovery: {
        question: "Melting ice and burning paper — which change can be undone?",
        options: ["Melting ice — physical, reversible", "Burning paper", "Both"],
        answer: "Melting ice — physical, reversible",
        hook: "Melting = physical (ice back to water). Burning = chemical (new substance, can't undo)!",
    },
    teaching: [
        { title: 'Physical Changes: What Changes and Wha', text: 'A physical change is a change in the form, shape, size, or state of a substance where no new material is created. The original substance remains the same, even  Imagine you have a crisp, clean sheet of paper.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Chemical Changes: New Substances Are B', text: 'A chemical change is a process in which one or more substances undergo a transformation to create entirely new substances with different properties. Unlike phys Have you ever wondered why a piece of paper turns into ash when it burns, but s', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Rusting as a Chemical Change: Understa', text: 'Rusting is a chemical change where iron reacts with oxygen and moisture from the air to form a new substance called iron oxide (rust). This process permanently  Have you ever noticed how the iron gate in your garden or a bicycle left in the', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Combustion: Burning and Its Characteri', text: 'Combustion is a chemical change where a substance reacts rapidly with oxygen, releasing energy in the form of heat and light. It is an essential process that al Have you ever wondered why a candle flame glows or why a wood fire keeps us war', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Can Changes Be Reversed? Reversible vs', text: 'A reversible change is one that can be undone to restore the original substance, whereas an irreversible change creates a new substance or condition that cannot Have you ever wondered why you can turn ice back into water, but you cant turn', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Are Changes Permanent? Exploring Tempo', text: 'A temporary change is a process that alters an object\'s state or appearance only as long as specific conditions exist, allowing the object to return to its orig Have you ever noticed how an ice cube melts into a puddle on a hot day, but if', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Are All Changes Desirable? Good and Ba', text: 'A change is considered desirable if it provides a benefit or fulfills a human need, while an undesirable change is one that causes harm, waste, or unwanted  Have you ever noticed that while you love the smell of a fresh, juicy mango, yo', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Slow Natural Changes: Weathering, Eros', text: 'Slow natural changes are gradual transformations in the environment, such as weathering, erosion, and rusting, that occur over long periods and are often imperc Have you ever wondered why old iron gates turn reddish-brown or why mountain su', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Distinguishing Physical from Chemical', text: 'A physical change alters the state or appearance of a substance without creating a new material, whereas a chemical change transforms a substance into an entire Have you ever wondered why water turns into ice but paper turns into ash when b', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Changes in Food: Cooking, Spoilage, an', text: 'Cooking, spoilage, and preservation are processes that involve changes in food; cooking is often a combination of physical (softening) and chemical changes (alt Have you ever noticed how a fresh piece of bread turns moldy after a few days,', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { widget: 'tray', prompt: 'Sort changes — physical or chemical?' },
    challenges: [
        { type: 'sort', question: 'Sort physical and chemical changes:',
          sortItems: [
            { id: 's0', label: 'Melting ice', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Burning paper', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Tearing cloth', emoji: '📌', correctBin: 'b0' },
            { id: 's3', label: 'Rusting iron', emoji: '📌', correctBin: 'b1' },
            { id: 's4', label: 'Boiling water', emoji: '📌', correctBin: 'b0' }
          ],
          bins: [ { id: 'b0', label: 'physical', color: '#3b82f6' },
                  { id: 'b1', label: 'chemical', color: '#ef4444' } ],
          hint: 'Same substance = physical; new substance = chemical!', misconception: 'Physical = no new substance (melt, tear, boil); chemical = new substance (burn, rust).',
          workedExample: ['Melt, tear, boil = physical.', 'Burn, rust = chemical.'] },
        { type: 'mcq', question: 'Burning paper is a chemical change because:', answer: 'a new substance (ash, smoke) forms', options: ['it changes shape', 'a new substance (ash, smoke) forms', 'it melts'],
          hint: 'Does a new substance form?', misconception: 'Chemical = new substance. Burning makes ash/smoke — can\'t get paper back.',
          workedExample: ['Burning.', 'Ash + smoke form.', 'New substance = chemical.'] },
        { type: 'mcq', question: 'A reversible change is one that:', answer: 'can be undone', options: ['can\'t be undone', 'can be undone', 'always burns'],
          hint: 'Can you reverse it?', misconception: 'Reversible = can return to original (freeze ↔ melt).',
          workedExample: ['Water → ice.', 'Ice → water.', 'Reversible.'] },
        { type: 'subpart', question: 'Desirable vs undesirable:',
          parts: [
            { id: 'a', prompt: 'Cooking food is a ___ change:', answer: 'desirable', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Rusting of a gate is:', answer: 'undesirable', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Changes Around Us:', hint: 'Work through each part step by step.', misconception: 'Students often believe that if a change is permanent or drastic (like breaking an object), it cannot be ph', parts: [
            { id: 'a', prompt: 'If you stretch a rubber band, is it still a rubber band?', answer: 'Yes, it is still a rubber band', hint: 'Think: Physical Changes: What Changes and What Stays', misconception: 'Students often believe that if a change is permanent or drastic (like breaking an object), it cannot be ph', workedExample: ['Ask the student to name the material before and after the ch','Remind them that a physical change is about the *identity* o','Use the example of a jigsaw puzzle: cutting the picture into'] },
            { id: 'b', prompt: 'When you dissolve salt in water, does the salt disappear and become a new substance, or does it stay as salt?', answer: 'The salt stays as salt, it just changes its state (by mixing', hint: 'Think: Physical Changes: What Changes and What Stays', misconception: 'Students often believe that if a change is permanent or drastic (like breaking an object), it cannot be ph', workedExample: ['Ask the student to name the material before and after the ch','Remind them that a physical change is about the *identity* o','Use the example of a jigsaw puzzle: cutting the picture into'] },
            { id: 'c', prompt: 'You have a metal wire. You bend it into a circle. Has a new substance been formed?', answer: 'No', hint: 'Think: Physical Changes: What Changes and What Stays', misconception: 'Students often believe that if a change is permanent or drastic (like breaking an object), it cannot be ph', workedExample: ['Ask the student to name the material before and after the ch','Remind them that a physical change is about the *identity* o','Use the example of a jigsaw puzzle: cutting the picture into'] },
            { id: 'd', prompt: 'Compare tearing a piece of paper to cutting a piece of wood. How are they similar in terms of physical change?', answer: 'Both involve changing the size and shape of the original mat', hint: 'Think: Physical Changes: What Changes and What Stays', misconception: 'Students often believe that if a change is permanent or drastic (like breaking an object), it cannot be ph', workedExample: ['Ask the student to name the material before and after the ch','Remind them that a physical change is about the *identity* o','Use the example of a jigsaw puzzle: cutting the picture into'] }
        ] },
    ],
    reflect: { prompts: ['What makes a change chemical rather than physical?', 'Why can\'t you un-burn paper?'] },
    successLine: 'Changes understood! 🔄', tryAgainLine: 'New substance = chemical change.',
};

export const c6BioNutrition: SimDef = {
    id: 'c6_bio_nutrition', title: 'Nutrition', subtitle: 'Food and digestion',
    classLevel: 6, subject: 'science', topic: 'Nutrition',
    chapters: ['Biology Ch9: Nutrition'],
    nodeIds: ['c6_biology_ch09_001','c6_biology_ch09_002','c6_biology_ch09_003','c6_biology_ch09_004','c6_biology_ch09_005','c6_biology_ch09_006','c6_biology_ch09_007','c6_biology_ch09_008'],
    emoji: '🍎', theme: { bg: 'from-red-100 to-rose-200', accent: 'red', scene: 'nutrition' },
    scenario: { role: "a body-fuel expert", intro: "Food is fuel — your body digests it for energy, builds itself from it, and needs a balanced diet.", goal: "Understand nutrition and digestion." },
    discovery: {
        question: "Why do we need to eat but plants don't?",
        options: ["Plants make their own food; we can't", "Plants don't need energy", "We eat for fun"],
        answer: "Plants make their own food; we can't",
        hook: "Plants photosynthesize their own food — animals must eat to get energy!",
    },
    teaching: [
        { title: 'Nutrition in Animals: The Digestive Sy', text: 'The digestive system is a biological network of organs, including a long muscular tube (the alimentary canal) and accessory organs like the liver and pancreas,  Imagine you just ate your favourite snack—how does that bite of bread actually', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Types of Nutrition: Herbivores, Carniv', text: 'Animals are classified into three main groups based on their dietary habits: herbivores (plant-eaters), carnivores (flesh-eaters), and omnivores (eaters of both Have you ever wondered why a cow spends all day chewing grass while a tiger onl', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'The Digestion Process: From Mouth to A', text: 'Digestion is the biological process of breaking down large, complex food molecules into smaller, simpler units that the body can absorb and use for energy, grow Have you ever wondered how a crunchy apple you eat for a snack becomes the ener', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Respiration in Animals: How Breathing', text: 'Breathing is the mechanical action of moving air into and out of the lungs to exchange oxygen and carbon dioxide. It is driven by the movement of the diaphragm  Have you ever noticed how your chest moves when you take a deep breath after ru', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Cellular Respiration: How Cells Extrac', text: 'Cellular respiration is the process where cells break down digested food (like simple sugars) using oxygen to release the energy needed for all body activities. Think about why you feel tired after a long game of tag—it\'s because your fuel', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'The Food Chain: Energy Flow in Nature', text: 'A food chain is a linear sequence showing how energy flows from one organism to another, starting from plants that capture sunlight and passing through consumer Have you ever wondered why you feel energized after eating a lunch of rice and', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'What is a Balanced Diet?', text: 'A balanced diet is a daily food pattern that provides the body with the right proportions of energy-giving carbohydrates and fats, body-building proteins, and p Think about how you feel after eating a heavy meal of just sweets versus a meal', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Respiration and Circulation: How Oxyge', text: 'The circulatory system acts as the body\'s transport highway, using the heart as a pump to move blood through vessels to deliver oxygen from the lungs to every i Imagine you are waiting for a delivery of a parcel at your home.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'grow', prompt: 'Feed the body — what happens to food from mouth to energy?' },
    challenges: [
        { type: 'sort', question: 'Sort the eaters:',
          sortItems: [
            { id: 's0', label: 'Cow', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Lion', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Bear', emoji: '📌', correctBin: 'b2' },
            { id: 's3', label: 'Deer', emoji: '📌', correctBin: 'b0' },
            { id: 's4', label: 'Tiger', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'herbivore', color: '#3b82f6' },
                  { id: 'b1', label: 'carnivore', color: '#ef4444' },
                  { id: 'b2', label: 'omnivore', color: '#10b981' } ],
          hint: 'Plants / meat / both!', misconception: 'Herbivore = plants; carnivore = meat; omnivore = both.',
          workedExample: ['Cow, deer = herbivore.', 'Lion, tiger = carnivore.', 'Bear = omnivore.'] },
        { type: 'order', question: 'Order the digestion path:', sortItems: [
            { id: 'o0', label: 'Absorption into blood', emoji: '▶️', correctBin: 's3' },
            { id: 'o1', label: 'Small intestine', emoji: '▶️', correctBin: 's2' },
            { id: 'o2', label: 'Mouth', emoji: '▶️', correctBin: 's0' },
            { id: 'o3', label: 'Stomach', emoji: '▶️', correctBin: 's1' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' },
                  { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' },
                  { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Follow the food!', misconception: 'Food path: mouth → stomach → small intestine → absorbed.',
          workedExample: ['Mouth chews.', 'Stomach breaks down.', 'Intestine absorbs.', 'Into blood.'] },
        { type: 'mcq', question: 'Plants differ from animals because plants:', answer: 'make their own food', options: ['eat meat', 'make their own food', 'don\'t need energy'],
          hint: 'Photosynthesis!', misconception: 'Plants photosynthesize — make their own food from sunlight.',
          workedExample: ['Plants photosynthesize.', 'Make own food.', 'Animals must eat.'] },
        { type: 'subpart', question: 'Cellular respiration:',
          parts: [
            { id: 'a', prompt: 'Cells need oxygen to:', answer: 'burn food for energy', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Energy comes from food + :', answer: 'oxygen', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in Nutrition:', hint: 'Work through each part step by step.', misconception: 'Students often believe that digestion only happens in the stomach. They ignore the essential work of the mou', parts: [
            { id: 'a', prompt: 'What is the primary function of the digestive system?', answer: 'The primary function is to break down large, complex food in', hint: 'Think: Nutrition in Animals: The Digestive System', misconception: 'Students often believe that digestion only happens in the stomach. They ignore the essential work of the mou', workedExample: ['1','Ask the student: Does the bread you chew turn into mush in y','Explain that the mouth is the first station of the factory'] },
            { id: 'b', prompt: 'Why does the body need accessory organs like the liver and pancreas if we already have a long muscular tube?', answer: 'The tube holds the food, but the accessory organs provide es', hint: 'Think: Nutrition in Animals: The Digestive System', misconception: 'Students often believe that digestion only happens in the stomach. They ignore the essential work of the mou', workedExample: ['1','Ask the student: Does the bread you chew turn into mush in y','Explain that the mouth is the first station of the factory'] },
            { id: 'c', prompt: 'If you were to trace a piece of food, what is the sequence of the main tube it travels through?', answer: 'It travels from the mouth through the esophagus to the stoma', hint: 'Think: Nutrition in Animals: The Digestive System', misconception: 'Students often believe that digestion only happens in the stomach. They ignore the essential work of the mou', workedExample: ['1','Ask the student: Does the bread you chew turn into mush in y','Explain that the mouth is the first station of the factory'] },
            { id: 'd', prompt: 'How is the digestive system different from just a simple pipe?', answer: 'A pipe just moves things, but the digestive system is a biol', hint: 'Think: Nutrition in Animals: The Digestive System', misconception: 'Students often believe that digestion only happens in the stomach. They ignore the essential work of the mou', workedExample: ['1','Ask the student: Does the bread you chew turn into mush in y','Explain that the mouth is the first station of the factory'] }
        ] },
    ],
    reflect: { prompts: ['Why do animals need both food and oxygen?', 'What does a balanced diet include?'] },
    successLine: 'Nutrition mastered! 🍎', tryAgainLine: 'Food + oxygen = energy.',
};

export const c6BioPlants: SimDef = {
    id: 'c6_bio_plants', title: 'How Plants Live', subtitle: 'Photosynthesis & growth',
    classLevel: 6, subject: 'science', topic: 'Plant Life',
    chapters: ['Biology Ch10: Plants'],
    nodeIds: ['c6_biology_ch10_001','c6_biology_ch10_002','c6_biology_ch10_003'],
    emoji: '🌱', theme: { bg: 'from-green-100 to-emerald-200', accent: 'green', scene: 'plants' },
    scenario: { role: "a botanist", intro: "Plants make their own food from sunlight, move water through hidden tubes, and reproduce from seeds.", goal: "Understand how plants live." },
    discovery: {
        question: "A plant in a dark cupboard turns yellow and weak. Why?",
        options: ["No sunlight — can't make food", "It's sleeping", "Too much water"],
        answer: "No sunlight — can't make food",
        hook: "Plants need sunlight to photosynthesize food — no light, no energy, no green!",
    },
    teaching: [
        { title: 'How Do Plants Grow? From Seed to Tree', text: 'Plant growth is the biological process where a seed absorbs water, splits its coat, and develops into a mature plant by pushing roots downward and a shoot upwar Have you ever wondered how a tiny, dry chickpea in your kitchen cupboard can tu', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'How Do Plants Make Food? Understanding', text: 'Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce sugar (food) and oxygen. It occurs primarily in the leave Have you ever wondered why you need to eat lunch to have energy to play, but th', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Transport in Plants: How Water and Nut', text: 'Transport in plants is the process by which water and minerals are moved from roots to leaves, and food (sugars) is moved from leaves to all other plant parts t Have you ever wondered how a tall tree gets water to its highest leaves, even t', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Do Plants Respire? Gas Exchange in Pla', text: 'Plant respiration is the process by which all living plant cells take in oxygen and release carbon dioxide to break down food and release energy required for su Have you ever wondered if a tree breathes while you are sleeping at night? It', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Plant Reproduction: From Flowers to Se', text: 'Plant sexual reproduction is the process in flowering plants where male and female parts of a flower interact to produce seeds, which then grow into new plants. Have you ever wondered why a bright, colourful flower eventually disappears and', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Seed Germination: What Triggers Growth', text: 'Seed germination is the process by which a dormant seed absorbs water, softens its outer coat, and activates its internal stored food to begin growing into a se Have you ever wondered why a dry bean from your kitchen cupboard doesn\'t grow i', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Plant Responses: How Plants React to L', text: 'Plant response is the process by which a plant adjusts its growth direction or physical state in reaction to environmental stimuli like light, gravity, or touch Have you ever noticed a houseplant sitting on a windowsill leaning toward the g', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'cell', prompt: 'Zoom into the cell — find the nucleus and chloroplasts!' },
    challenges: [
        { type: 'mcq', question: 'Photosynthesis uses:', answer: 'sunlight, water, and CO2', options: ['only water', 'sunlight, water, and CO2', 'soil and oxygen'],
          hint: 'The recipe for plant food!', misconception: 'Photosynthesis = sunlight + water + CO2 → glucose + oxygen.',
          workedExample: ['Sunlight.', 'Water.', 'CO2.', '→ glucose + oxygen.'] },
        { type: 'sort', question: 'Match the plant tube to its job:',
          sortItems: [
            { id: 's0', label: 'Carries water up', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Carries food down', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'xylem', color: '#3b82f6' },
                  { id: 'b1', label: 'phloem', color: '#ef4444' } ],
          hint: 'Xylem = water up; phloem = food down!', misconception: 'Xylem = water up; phloem = food down from leaves.',
          workedExample: ['Xylem = water up.', 'Phloem = food down.'] },
        { type: 'mcq', question: 'A seed needs ___ to germinate:', answer: 'water, warmth, and air', options: ['only soil', 'water, warmth, and air', 'darkness'],
          hint: 'What wakes a seed?', misconception: 'Germination needs water + warmth + air — the seed wakes and sprouts.',
          workedExample: ['Water.', 'Warmth.', 'Air.', 'Seed sprouts.'] },
        { type: 'subpart', question: 'Plant reproduction:',
          parts: [
            { id: 'a', prompt: 'Flowers make:', answer: 'seeds', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
            { id: 'b', prompt: 'Pollination leads to:', answer: 'fertilization and seed formation', hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
          ],
          hint: 'Think step by step!', misconception: 'Each part builds on the last — check your reasoning.' },
        { type: 'subpart', question: 'Apply what you learned in How Plants Live:', hint: 'Work through each part step by step.', misconception: 'Students often believe that plants eat the soil or that the soil is the source of the seed\'s growth energy.', parts: [
            { id: 'a', prompt: 'What are the three main things a seed needs to begin the process of growing into a plant?', answer: 'A seed needs moisture, warmth, and air', hint: 'Think: How Do Plants Grow? From Seed to Tree', misconception: 'Students often believe that plants eat the soil or that the soil is the source of the seed\'s growth energy.', workedExample: ['Ask the student: If the seed is in the soil, how does it get','Explain that the soil only provides support and water, not t'] },
            { id: 'b', prompt: 'If you plant a seed upside down, in which direction will the root grow? Why?', answer: 'The root will still grow downward', hint: 'Think: How Do Plants Grow? From Seed to Tree', misconception: 'Students often believe that plants eat the soil or that the soil is the source of the seed\'s growth energy.', workedExample: ['Ask the student: If the seed is in the soil, how does it get','Explain that the soil only provides support and water, not t'] },
            { id: 'c', prompt: 'A seed is planted in a dark, dry, and cold room. Why will it fail to grow?', answer: 'It fails because it lacks the trigger conditions: moisture', hint: 'Think: How Do Plants Grow? From Seed to Tree', misconception: 'Students often believe that plants eat the soil or that the soil is the source of the seed\'s growth energy.', workedExample: ['Ask the student: If the seed is in the soil, how does it get','Explain that the soil only provides support and water, not t'] },
            { id: 'd', prompt: 'Compare the job of the root and the shoot during the early days of a seedling\'s life.', answer: 'The root acts as an anchor and a water-seeker, while the sho', hint: 'Think: How Do Plants Grow? From Seed to Tree', misconception: 'Students often believe that plants eat the soil or that the soil is the source of the seed\'s growth energy.', workedExample: ['Ask the student: If the seed is in the soil, how does it get','Explain that the soil only provides support and water, not t'] }
        ] },
    ],
    reflect: { prompts: ['How is photosynthesis the reverse of respiration?', 'Why do seeds wait for the right conditions to sprout?'] },
    successLine: 'Botany mastered! 🌱', tryAgainLine: 'Sunlight + water + CO2 = plant food.',
};

export const c6PhyScience: SimDef = {
    id: 'c6_phy_science', title: 'Doing Science', subtitle: 'Observe, test, conclude',
    classLevel: 6, subject: 'science', topic: 'Scientific Method',
    chapters: ['Physics Ch1-2: Science'],
    nodeIds: ['c6_physics_ch01_001','c6_physics_ch01_002','c6_physics_ch01_003','c6_physics_ch01_004','c6_physics_ch02_006','c6_physics_ch02_008','c6_physics_ch02_009','c6_physics_ch02_010'],
    emoji: '🔬', theme: { bg: 'from-cyan-100 to-blue-200', accent: 'cyan', scene: 'science' },
    scenario: { role: "a young scientist", intro: "Science is a way of asking questions — observe, guess, test, and conclude.", goal: "Learn how science works." },
    discovery: {
        question: "A plant wilts. To find out why, what should a scientist do FIRST?",
        options: ["Observe and form a hypothesis", "Water it randomly", "Throw it away"],
        answer: "Observe and form a hypothesis",
        hook: "Science starts with observation — then a guess (hypothesis) you can test!",
    },
    teaching: [
        { title: 'What is Science and Why It Matters', text: 'Science is a systematic method of exploring the natural world by making observations, asking questions about how things work, and testing those questions to fin Imagine your favorite flashlight suddenly stops working; what is the first thin', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'The Scientific Method: Observation to', text: 'The scientific method is a structured, step-by-step process used to explore questions about the natural world by making observations, forming logical guesses, a Imagine your kitchen light doesn\'t turn on when you flip the switch.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Branches of Science and Their Scope', text: 'Science is a systematic way of observing, questioning, and experimenting to understand how the natural world and the universe function. It is organized into bra Have you ever wondered why your bicycle tyre goes flat, or why a seed turns int', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Science in Everyday Life', text: 'Science is a systematic way of observing our surroundings, asking questions about how things work, and using a step-by-step method to find logical answers. It i Have you ever wondered why your pen suddenly stopped writing even though it loo', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Women in Science and Scientific Temper', text: 'Scientific temper is a way of thinking that involves being curious, observing the world carefully, and using evidence to test our ideas instead of relying on gu Have you ever wondered why your plant in the corner is wilting while the one on', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Nature as Our Laboratory', text: 'Nature is the primary laboratory where scientific inquiry begins by systematically observing, questioning, and collecting data from the environment. It provides Have you ever wondered why flowers turn toward the sunlight, or why clouds seem', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Science Fairs and Sharing Discoveries', text: 'A science fair is a structured event where students present their scientific discoveries and experiments to an audience. It serves as a platform to demonstrate  Have you ever made a discovery at home, like noticing that salt dissolves faste', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Testing Substances with Natural Indica', text: 'Natural indicators are substances derived from plants that change their colour when they come into contact with an acidic or basic substance. They serve as simp Have you ever noticed how your clothes might change colour if you spill lemon j', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Exploring the Local Environment', text: 'Exploring the local environment is the practice of observing and documenting natural features and human-made structures in one\'s immediate surroundings to under Imagine you are walking from your front door to the school gate; how many thing', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Recording and Documenting Observations', text: 'Recording observations is the systematic process of writing down what is seen, measured, or experienced during an activity, including details like date, time, l Have you ever tried to remember exactly what happened during a science experime', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { lab: 'grow', prompt: 'Run an experiment — change one thing and watch what happens!' },
    challenges: [
        { type: 'order', question: 'Order the scientific method:', sortItems: [
            { id: 'o0', label: 'Observe', emoji: '▶️', correctBin: 's0' },
            { id: 'o1', label: 'Make a hypothesis', emoji: '▶️', correctBin: 's1' },
            { id: 'o2', label: 'Test with an experiment', emoji: '▶️', correctBin: 's2' },
            { id: 'o3', label: 'Draw a conclusion', emoji: '▶️', correctBin: 's3' }
          ],
          bins: [ { id: 's0', label: '1st', color: '#3b82f6' }, { id: 's1', label: '2nd', color: '#8b5cf6' },
                  { id: 's2', label: '3rd', color: '#f59e0b' }, { id: 's3', label: '4th', color: '#10b981' } ],
          hint: 'Observe → guess → test → conclude!', misconception: 'Scientific method: observe, hypothesize, test, conclude.',
          workedExample: ['Observe.', 'Hypothesis.', 'Test.', 'Conclude.'] },
        { type: 'mcq', question: 'A hypothesis is:', answer: 'a testable guess', options: ['a proven fact', 'a testable guess', 'a wild idea'],
          hint: 'It\'s a guess you can check!', misconception: 'A hypothesis is a testable prediction — you test it to see if it holds.',
          workedExample: ['A guess.', 'That you test.', 'Hypothesis.'] },
        { type: 'mcq', question: 'A natural indicator (like turmeric) helps test:', answer: 'acids and bases', options: ['temperature', 'acids and bases', 'weight'],
          hint: 'It changes color!', misconception: 'Natural indicators change color to show if a substance is acid or base.',
          workedExample: ['Turmeric changes color.', 'Tests acid/base.', 'Indicator.'] },
        { type: 'subpart', question: 'Why record observations?',
          parts: [
            { id: 'a', prompt: 'Recording observations lets you:', answer: 'check and share your work', hint: 'Proof!', misconception: 'Records let you and others verify the experiment.' },
            { id: 'b', prompt: 'Science is mainly about:', answer: 'asking questions and testing them', hint: 'It\'s a process!', misconception: 'Science is a process of questioning and testing, not just facts.' },
          ],
          hint: 'Observe, record, verify!', misconception: 'Science = observe + test + record — a repeatable process.',
          workedExample: ['Observe.', 'Test.', 'Record.'] },
        { type: 'subpart', question: 'Apply what you learned in Doing Science:', hint: 'Work through each part step by step.', misconception: 'Students often believe that science is truth that never changes or that it is only performed by experts in w', parts: [
            { id: 'a', prompt: 'What is the best way to describe Science? A) A giant book containing all the facts about the world. B) A pro', answer: 'The correct answer is B', hint: 'Think: What is Science and Why It Matters', misconception: 'Students often believe that science is truth that never changes or that it is only performed by experts in w', workedExample: ['If a student thinks science is just facts, have them pick a ','Guide them to propose a test, such as applying different pre','This shifts their focus from passive memorization to active '] },
            { id: 'b', prompt: 'If you see a plant wilting and decide to water it to see if it recovers, have you used the scientific method?', answer: 'Yes, because you observed a problem (wilting), formed a hypo', hint: 'Think: What is Science and Why It Matters', misconception: 'Students often believe that science is truth that never changes or that it is only performed by experts in w', workedExample: ['If a student thinks science is just facts, have them pick a ','Guide them to propose a test, such as applying different pre','This shifts their focus from passive memorization to active '] },
            { id: 'c', prompt: 'Your friend says, Science is just memorizing facts from the textbook. How would you use the concept of the s', answer: 'Explain that if science were just memorization, it would nev', hint: 'Think: What is Science and Why It Matters', misconception: 'Students often believe that science is truth that never changes or that it is only performed by experts in w', workedExample: ['If a student thinks science is just facts, have them pick a ','Guide them to propose a test, such as applying different pre','This shifts their focus from passive memorization to active '] },
            { id: 'd', prompt: 'Compare these two: A student who reads that water boils at 100°C and a student who heats water and measures', answer: 'The second student is doing science because they are moving', hint: 'Think: What is Science and Why It Matters', misconception: 'Students often believe that science is truth that never changes or that it is only performed by experts in w', workedExample: ['If a student thinks science is just facts, have them pick a ','Guide them to propose a test, such as applying different pre','This shifts their focus from passive memorization to active '] }
        ] },
    ],
    reflect: { prompts: ['How is a hypothesis different from a fact?', 'Why do scientists write everything down?'] },
    successLine: 'Scientific method mastered! 🔬', tryAgainLine: 'Observe → guess → test → conclude.',
};

export const c6ChemDetail: SimDef = {
    id: 'c6_chem_detail', title: 'Metals & Rusting', subtitle: 'Corrosion and protection',
    classLevel: 6, subject: 'science', topic: 'Metals and Corrosion',
    chapters: ['Chemistry Ch4: Metals'],
    // nodeIds intentionally omitted: ch04 nodes are owned by c6_chem_materials and ch05 by c6_chem_changes; this detail sim falls back to its own simId for mastery attribution.
    emoji: '⚙️', theme: { bg: 'from-stone-100 to-amber-200', accent: 'stone', scene: 'metals' },
    scenario: { role: "a corrosion-fighter", intro: "Metals rust and corrode when exposed to air and water — but we can protect them.", goal: "Understand rusting and prevention." },
    discovery: {
        question: "Why does an iron nail left in rain rust, but a painted iron gate doesn't?",
        options: ["Paint blocks air and water from reaching the iron", "Paint is magic", "Rain only rusts nails"],
        answer: "Paint blocks air and water from reaching the iron",
        hook: "Rust needs air + water. Paint is a barrier — no contact, no rust!",
    },
    teaching: [
        { title: 'Rusting 🦠', text: 'Rusting is when iron reacts with air and water to form rust (iron oxide) — a chemical change that weakens metal!', emoji: '🦠', bgColor: 'from-stone-400 to-amber-500' },
        { title: 'Other Metals Too 🔩', text: 'Copper turns green, aluminium dulls — metals react with air and water differently. Gold barely reacts at all!', emoji: '🔩', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Non-metals 🌬️', text: 'Non-metals (oxygen, carbon, sulfur) have different properties — dull, brittle, and some are essential for life!', emoji: '🌬️', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Preventing Corrosion 🛡️', text: 'We protect metals by painting, oiling, galvanizing (zinc coat), or making alloys — blocking air and water!', emoji: '🛡️', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Materials in Daily Life 🏠', text: 'From kitchen pans to bridges, we choose materials that resist corrosion — stainless steel, aluminium, coated iron!', emoji: '🏠', bgColor: 'from-purple-400 to-indigo-500' },
    ],
    explore: { widget: 'tray', prompt: 'Test protection methods — which stops rust best?' },
    challenges: [
        { type: 'mcq', question: 'Rusting requires:', answer: 'air and water together', options: ['only air', 'air and water together', 'only sunlight'],
          hint: 'Two things needed!', misconception: 'Rust = iron + oxygen (air) + water — both must be present.',
          workedExample: ['Iron + air.', '+ water.', '= rust.'] },
        { type: 'mcq', question: 'Painting iron prevents rust by:', answer: 'blocking air and water', options: ['making it stronger', 'blocking air and water', 'adding iron'],
          hint: 'A barrier!', misconception: 'Paint blocks air and water from reaching iron — preventing rust.',
          workedExample: ['Paint = barrier.', 'No air/water contact.', 'No rust.'] },
        { type: 'sort', question: 'Metal or non-metal behavior?',
          sortItems: [
            { id: 's0', label: 'Iron rusts', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Copper turns green', emoji: '📌', correctBin: 'b0' },
            { id: 's2', label: 'Oxygen supports life', emoji: '📌', correctBin: 'b1' }
          ],
          bins: [ { id: 'b0', label: 'Metal reaction', color: '#3b82f6' }, { id: 'b1', label: 'Non-metal role', color: '#ef4444' } ],
          hint: 'Metals corrode; non-metals like oxygen sustain life!', misconception: 'Metals corrode (rust, tarnish); non-metals like oxygen sustain life.',
          workedExample: ['Iron rusts, copper greens = metals.', 'Oxygen = non-metal for life.'] },
        { type: 'subpart', question: 'Preventing corrosion:',
          parts: [
            { id: 'a', prompt: 'Galvanizing coats iron with:', answer: 'zinc', hint: 'A protective metal!', misconception: 'Galvanizing = coating iron with zinc to prevent rust.' },
            { id: 'b', prompt: 'Stainless steel resists rust because it\'s:', answer: 'an alloy', hint: 'Mixed metals!', misconception: 'Stainless steel is an alloy that resists corrosion.' },
          ],
          hint: 'Coat or alloy to protect!', misconception: 'Coating (zinc, paint) or alloys (stainless steel) prevent rust.',
          workedExample: ['Zinc coat.', 'Alloy.', 'Both protect.'] },
    ],
    reflect: { prompts: ['Why does rust need both air AND water?', 'How do we protect metals in daily life?'] },
    successLine: 'Corrosion understood! ⚙️', tryAgainLine: 'Block air + water to stop rust.',
};

export const c6BioAdolescence: SimDef = {
    id: 'c6_bio_adolescence', title: 'Growing Up', subtitle: 'Adolescence & change',
    classLevel: 6, subject: 'science', topic: 'Adolescence',
    chapters: ['Biology Ch6: Adolescence'],
    nodeIds: ['c6_biology_ch06_001','c6_biology_ch06_002','c6_biology_ch06_003','c6_biology_ch06_004','c6_biology_ch06_005','c6_biology_ch06_008'],
    emoji: '🌱', theme: { bg: 'from-green-100 to-teal-200', accent: 'green', scene: 'adolescence' },
    scenario: { role: "a growing-body expert", intro: "Adolescence is the journey from child to adult — the body changes, hormones drive it, and health matters.", goal: "Understand growing up." },
    discovery: {
        question: "Why do teenagers suddenly grow taller and their bodies change so fast?",
        options: ["Hormones trigger the growth spurt", "They eat more", "It\'s random"],
        answer: "Hormones trigger the growth spurt",
        hook: "Hormones are chemical messengers that trigger adolescence — growth, changes, all driven by them!",
    },
    teaching: [
        { title: 'Growing With Age: What Happens During', text: 'Adolescence is a transformative stage of human development occurring between childhood and adulthood, typically spanning from age eleven or twelve to nineteen,  Have you ever looked at old photos of yourself from four years ago and realized', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Physical Changes in Adolescence: Heigh', text: 'Physical changes in adolescence refer to the rapid, visible growth and transformation of the body\'s structure, including height, weight, and overall body shape, Have you ever looked at old photos of yourself from four years ago and realized', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Changes Indicating Reproductive Maturi', text: 'Reproductive maturity is the stage during adolescence when an individual\'s body develops the biological capacity to produce offspring. It is marked by specific  Have you ever noticed how your older siblings or cousins suddenly seem to chang', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Emotional and Behavioural Changes Duri', text: 'Adolescence is a transitional stage of growth between childhood and adulthood where the brain undergoes structural reorganization, leading to more intense emoti Have you ever felt like you were super happy one minute and then suddenly annoy', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Making Adolescence a Joyful Experience', text: 'Coping strategies in adolescence are healthy, proactive ways to manage the new emotional and social challenges that arise during this stage of rapid growth, pri Have you ever felt like a small problem in your day—like a disagreement with a', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'The \'Why\' Question: Hormones Behind th', text: 'Hormones are invisible chemical messengers produced by glands in the body that travel through the bloodstream to signal specific tissues to grow or change. They Have you ever wondered why your voice changes or why you suddenly start growing', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Personal Hygiene and Care During Adole', text: 'Personal hygiene during adolescence involves the regular maintenance of cleanliness to manage increased sweat and oil gland activity, which helps prevent body o Have you noticed that you feel stickier or more prone to smelling sweaty afte', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Nutrition and Exercise Needs During Ad', text: 'Adolescence is a specific stage of human growth characterized by rapid physical, emotional, and social development, necessitating increased nutrient intake and  Have you noticed how you seem to grow out of your clothes much faster than a fe', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    explore: { component: GrowthTimeline, prompt: 'Watch the heart beat — raise the rate and see the ECG!' },
    challenges: [
        { type: 'mcq', question: 'Adolescence is the transition from:', answer: 'child to adult', options: ['baby to child', 'child to adult', 'adult to old'],
          hint: 'Growing up!', misconception: 'Adolescence = the change from child to adult (10-19 years).',
          workedExample: ['Child → adolescent → adult.', 'The transition.'] },
        { type: 'mcq', question: 'Physical changes in adolescence are triggered by:', answer: 'hormones', options: ['food only', 'hormones', 'sleep'],
          hint: 'Chemical messengers!', misconception: 'Hormones trigger the growth spurt and body changes.',
          workedExample: ['Hormones released.', 'Trigger changes.', 'Growth spurt.'] },
        { type: 'sort', question: 'Sort the changes:',
          sortItems: [
            { id: 's0', label: 'Growing taller', emoji: '📌', correctBin: 'b0' },
            { id: 's1', label: 'Mood swings', emoji: '📌', correctBin: 'b1' },
            { id: 's2', label: 'Voice deepening', emoji: '📌', correctBin: 'b0' }
          ],
          bins: [ { id: 'b0', label: 'Physical change', color: '#3b82f6' }, { id: 'b1', label: 'Emotional change', color: '#ef4444' } ],
          hint: 'Body vs feelings!', misconception: 'Height/voice = physical; mood swings = emotional.',
          workedExample: ['Taller, voice = physical.', 'Mood = emotional.'] },
        { type: 'subpart', question: 'Healthy adolescence needs:',
          parts: [
            { id: 'a', prompt: 'For the growing body:', answer: 'good nutrition and exercise', hint: 'Fuel + movement!', misconception: 'Growing bodies need nutritious food and exercise.' },
            { id: 'b', prompt: 'Personal hygiene is important because:', answer: 'the body is changing and needs care', hint: 'Care for change!', misconception: 'The changing body needs extra hygiene and self-care.' },
          ],
          hint: 'Fuel and care!', misconception: 'Nutrition + exercise + hygiene keep the adolescent body healthy.',
          workedExample: ['Nutrition fuels growth.', 'Hygiene cares for it.'] },
        { type: 'subpart', question: 'Apply what you learned in Growing Up:', hint: 'Work through each part step by step.', misconception: 'Students often think that because they are in the same grade, they should all be at the same stage of physical', parts: [
            { id: 'a', prompt: 'What is the typical age range for the stage known as adolescence?', answer: 'Adolescence generally begins around age eleven or twelve and', hint: 'Think: Growing With Age: What Happens During Teenage', misconception: 'Students often think that because they are in the same grade, they should all be at the same stage of physical', workedExample: ['First, explain that human development is like a race where e','Ask them to look at a variety of trees in a garden—some are ','Emphasize that normal has a wide range, and their body\'s ti'] },
            { id: 'b', prompt: 'If your friend starts their growth spurt at age eleven and you start yours at age thirteen, does this mean one', answer: 'No, it is normal because the start and end points of adolesc', hint: 'Think: Growing With Age: What Happens During Teenage', misconception: 'Students often think that because they are in the same grade, they should all be at the same stage of physical', workedExample: ['First, explain that human development is like a race where e','Ask them to look at a variety of trees in a garden—some are ','Emphasize that normal has a wide range, and their body\'s ti'] },
            { id: 'c', prompt: 'Why is adolescence described as a dramatic transformation rather than just getting older?', answer: 'It refers to the sharp acceleration in growth rates and sign', hint: 'Think: Growing With Age: What Happens During Teenage', misconception: 'Students often think that because they are in the same grade, they should all be at the same stage of physical', workedExample: ['First, explain that human development is like a race where e','Ask them to look at a variety of trees in a garden—some are ','Emphasize that normal has a wide range, and their body\'s ti'] },
            { id: 'd', prompt: 'Compare the growth you experienced as a toddler (ages 1-3) to the growth expected during adolescence. What is', answer: 'As a toddler, growth is a continuous process, whereas in ado', hint: 'Think: Growing With Age: What Happens During Teenage', misconception: 'Students often think that because they are in the same grade, they should all be at the same stage of physical', workedExample: ['First, explain that human development is like a race where e','Ask them to look at a variety of trees in a garden—some are ','Emphasize that normal has a wide range, and their body\'s ti'] }
        ] },
    ],
    reflect: { prompts: ['How do hormones control growth?', 'Why does adolescence need extra nutrition?'] },
    successLine: 'Adolescence understood! 🌱', tryAgainLine: 'Hormones drive the growth spurt.',
};

export const c6ScienceSims = [
    c6PhyCircuits, c6PhyHeat, c6PhyMotion, c6PhyLight, c6PhyEarth,
    c6ChemMaterials, c6ChemChanges, c6BioNutrition, c6BioPlants,
    c6PhyScience, c6ChemDetail, c6BioAdolescence,
];
