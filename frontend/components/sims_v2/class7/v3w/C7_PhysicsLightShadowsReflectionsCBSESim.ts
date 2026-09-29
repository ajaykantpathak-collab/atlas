import type { SimDef } from '../../engine/types';
import C7_PhysicsLightShadowsReflectionsCBSESim from '../../../simulations/c6_12/C7_PhysicsLightShadowsReflectionsCBSESim';

/** v3 wrapped master — C7_PhysicsLightShadowsReflectionsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicslightshadowsreflectionscbsesim: SimDef = {
    id: 'v3w_c7_physicslightshadowsreflectionscbsesim',
    title: 'Light Travels in a Straight Line: Rectilinear Propagation',
    subtitle: 'Covers the straight-line path of light in a uniform medium, ray representation, and basic.',
    classLevel: 7, subject: 'physics', topic: 'Light Travels in a Straight Line: Rectilinear Propagation',
    chapters: [],
    nodeIds: ['c7_physics_ch05_003', 'c7_physics_ch05_002', 'c7_physics_ch05_004', 'c7_physics_ch05_005', 'c7_physics_ch05_006', 'c7_physics_ch05_007', 'c7_physics_ch05_009', 'c7_physics_ch05_011', 'c7_physics_ch05_010', 'c7_physics_ch05_001', 'c7_physics_ch05_008', 'c7_physics_ch06_007', 'c7_physics_ch01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Observe a beam of sunlight streaming through a dusty window or a cinema projector beam cutting through a dark.', goal: 'Master Light Travels in a Straight Line: Rectilinear Propagation.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Light travels in straight lines in a.', text: 'Light travels in straight lines in a homogeneous, transparent medium, a property known as rectilinear propagation of light.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch05_003', title: 'Light travels in straight lines in a.',
          scaffold: { problem: 'Three perforated cardboard cards A, B, and C are placed at distances of 0.2 m, 0.5 m, and 0.9 m from a table lamp.',
            steps: [
            { text: 'Identify the initial condition where all holes are collinear, allowing light rays to pass unimpeded due to rectilinear.' },
            { text: 'Note the displacement of card B by 0.05 m, which breaks the collinearity of the pinholes.' },
            { text: 'Apply the physical principle that light travels strictly in straight lines and cannot make a jog or turn to pass.' },
            { text: 'Conclude that the light beam is completely blocked at card B.' },
            { text: 'Verify that no light spot appears on the screen (the spot disappears).', faded: true, blankAnswer: 'The light spot on the screen disappears completely because.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_002', title: 'Luminous objects are those that emit.',
          scaffold: { problem: 'Classify the following four items found in a typical Indian school classroom into luminous and non-luminous categories: 1) A glowing tube.',
            steps: [
            { text: 'Examine item 1 (glowing tube light). It uses electricity to produce its own light. Therefore, it is luminous.' },
            { text: 'Examine item 2 (wooden desk). It does not produce any light; it only reflects classroom light.' },
            { text: 'Examine item 3 (burning sun). It undergoes nuclear fusion to generate its own massive amount of light.' },
            { text: 'Examine item 4 (green chalkboard). It does not emit light of its own and is only visible because light bounces off its.' },
            { text: 'Group the items into final categories: Luminous = Tube light, Sun; Non-luminous = Wooden desk, Chalkboard.', faded: true, blankAnswer: 'Luminous: Tube light, Sun; Non-luminous: Wooden desk,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_004', title: 'Transparent materials allow light to.',
          scaffold: { problem: 'A science teacher in a school in Mumbai tests four sheets of identical thickness: sheet A (clear plastic), sheet B (black chart paper),.',
            steps: [
            { text: 'Analyze sheet A (clear plastic): The laser spot emerges bright and sharp on the opposite wall.' },
            { text: 'Analyze sheet B (black chart paper): No laser light emerges on the opposite wall; the beam is completely blocked.' },
            { text: 'Analyze sheet C (waxed paper): The laser light passes through, but the spot on the opposite wall is spread out and.' },
            { text: 'Analyze sheet D (frosted glass): The laser light passes through partially as a diffused glow, preventing a sharp point.' },
            { text: 'Summarize classifications: Transparent = A, Translucent = C and D, Opaque = B.', faded: true, blankAnswer: 'Sheet A is transparent; Sheets C and D are translucent;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_005', title: 'A shadow is a dark patch formed on a.',
          scaffold: { problem: 'A cylindrical water bottle of height 15 cm is placed 30 cm away from a point source of light on a desk.',
            steps: [
            { text: 'Identify given quantities: height of object ($h_o = 15\\text{ cm}$), distance from source to object ($d_{so} = 30\\text{.' },
            { text: 'Identify the geometric proportionality formula for similar triangles formed by light rays: $\\frac{h_s}{h_o} =.' },
            { text: 'Rearrange the formula to solve for shadow height: $h_s = h_o \\times \\left(\\frac{d_{ss}}{d_{so}}\\right)$.' },
            { text: 'Substitute the values with units and compute: $h_s = 15\\text{ cm} \\times \\left(\\frac{90\\text{ cm}}{30\\text{ cm}}\\right).' },
            { text: 'Verify the answer physically: The screen is three times as far from the source as the object, so the shadow height is.', faded: true, blankAnswer: '45 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_006', title: 'The laws of reflection state that when.',
          scaffold: { problem: 'A light ray strikes a plane glass mirror in a physics lab in Delhi at an angle of incidence of 35°.',
            steps: [
            { text: 'Identify the given value: Angle of incidence ($\\angle i$) = 35°.' },
            { text: 'Recall the first law of reflection: Angle of incidence equals angle of reflection ($\\angle i = \\angle r$).' },
            { text: 'Substitute the value for the angle of reflection: $\\angle r = 35°$.' },
            { text: 'Compute the total angle by adding the two angles: Total angle = $\\angle i + \\angle r = 35° + 35° = 70°$.' },
            { text: 'Verify the answer physically: Both angles are equal relative to the normal, and 70° is a reasonable geometric sum for.', faded: true, blankAnswer: 'Angle of reflection = 35°, Total angle between rays = 70°' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_007', title: 'The image formed by a plane mirror is.',
          scaffold: { problem: 'A science student places a glowing LED bulb 25 cm in front of a flat plane mirror in a physics lab in Delhi.',
            steps: [
            { text: 'Identify given values: object distance ($d_o$) = 25 cm. Identify what to find: image distance ($d_i$) and total.' },
            { text: 'Recall the plane mirror property formula relating object distance and image distance: $d_i = d_o$.' },
            { text: 'Substitute the given object distance into the property equation: $d_i = 25\\text{ cm}$.' },
            { text: 'Compute the total distance between object and image by adding object distance and image distance: $D_{total} = d_o +.' },
            { text: 'Final calculation: $D_{total} = 50\\text{ cm}$. Verify that 50 cm is physically reasonable for a table-top lab setup.', faded: true, blankAnswer: 'Image distance = 25 cm; Total distance between object and.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch05_002', title: 'Identify each idea',
          dissect: { specimen: 'Light Travels in a Straight Line: Rectilinear Propagation', spots: [
            { id: 's1', label: 'Light travels in straight lines', prompt: 'Which idea is this? — Light travels in straight lines in a homogeneous, transparent medium, a property known as.', answer: 'Light travels in straight lines', options: ['Light travels in straight lines', 'Luminous objects are those that', 'Transparent materials allow light to', 'A shadow is a dark'] },
            { id: 's2', label: 'Luminous objects are those that', prompt: 'Which idea is this? — Luminous objects are those that emit their own light by converting various forms of.', answer: 'Luminous objects are those that', options: ['Luminous objects are those that', 'Light travels in straight lines', 'Transparent materials allow light to', 'A shadow is a dark'] },
            { id: 's3', label: 'Transparent materials allow light to', prompt: 'Which idea is this? — Transparent materials allow light to pass through them completely so objects can be seen.', answer: 'Transparent materials allow light to', options: ['Transparent materials allow light to', 'Light travels in straight lines', 'Luminous objects are those that', 'A shadow is a dark'] },
            { id: 's4', label: 'A shadow is a dark', prompt: 'Which idea is this? — A shadow is a dark patch formed on a surface when an opaque or translucent object blocks.', answer: 'A shadow is a dark', options: ['A shadow is a dark', 'Light travels in straight lines', 'Luminous objects are those that', 'Transparent materials allow light to'] },
            { id: 's5', label: 'The laws of reflection state', prompt: 'Which idea is this? — The laws of reflection state that when light falls on a smooth, reflective surface, the.', answer: 'The laws of reflection state', options: ['The laws of reflection state', 'Light travels in straight lines', 'Luminous objects are those that', 'Transparent materials allow light to'] },
            { id: 's6', label: 'The image formed by a', prompt: 'Which idea is this? — The image formed by a plane mirror is virtual, erect, of the exact same size as the.', answer: 'The image formed by a', options: ['The image formed by a', 'Light travels in straight lines', 'Luminous objects are those that', 'Transparent materials allow light to'] }
          ] } }
    ],
    explore: { component: C7_PhysicsLightShadowsReflectionsCBSESim, prompt: 'Explore the interactive — Light Travels in a Straight Line: Rectilinear Propagation' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch05_003', difficulty: 'standard',
          question: 'Light travels in straight lines in a homogeneous, transparent medium, a.',
          hint: 'Review basic ray concepts and the difference between light and sound propagation.',
          misconception: 'Students often think that light can bend around sharp corners or edges of obstacles if the light is bright enough, or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Light travels in straight lines in a homogeneous, transparent medium, a property known as',
                  options: ['Light travels in straight lines in a homogeneous, transparent medium, a property known as', 'Luminous objects are those that emit their own light by converting various forms of', 'Transparent materials allow light to pass through them completely so objects can be seen', 'A shadow is a dark patch formed on a surface when an opaque or translucent object blocks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that light can bend around sharp corners or edges of obstacles if the light is bright enough, or they confuse the.' }
          ],
            remediations: { 'light-can-bend-around-sharp': { steps: ['To fix this, take a straight pipe and a bent pipe, look at a lighted bulb through both, and record the observation that.', 'Emphasize that unlike sound waves which can diffract significantly around obstacles due to their long wavelengths,.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_002', difficulty: 'standard',
          question: 'Luminous objects are those that emit their own light by converting various.',
          hint: 'Review c7_physics_ch05_001 on Sources of Light: Natural and Artificial to reinforce how.',
          misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Luminous objects are those that emit their own light by converting various forms of',
                  options: ['Luminous objects are those that emit their own light by converting various forms of', 'Light travels in straight lines in a homogeneous, transparent medium, a property known as', 'Transparent materials allow light to pass through them completely so objects can be seen', 'A shadow is a dark patch formed on a surface when an opaque or translucent object blocks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal plate, a glass marble,.' }
          ],
            remediations: { 'any-object-that-looks-bright': { steps: ['To fix this, take the student into a windowless room or use a closed shoebox.', 'Place a shiny object like a steel spoon and a glowing object like a lit torch inside the box.', 'Close the lid completely and look through a pinhole—only the lit torch part of the torch can be seen if it emits light,.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_004', difficulty: 'standard',
          question: 'Transparent materials allow light to pass through them completely so objects.',
          hint: 'Review how light behaves when it encounters obstacles by revisiting c7_physics_ch05_003.',
          misconception: 'Students frequently confuse translucent materials with transparent materials because they both let some light pass.',
          parts: [
                { id: 'a', prompt: 'Explain why you cannot see your friend standing on the other side of a thick wooden wall even when the room is brightly lit.', answer: 'A wooden wall is an opaque material',
                  options: ['A wooden wall is an opaque material', 'the wall is too dark'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse translucent materials with transparent materials because they both let some light pass through.' }
          ],
            remediations: { 'students-frequently-confuse-translucent-material': { steps: ['To correct this, hold a clear glass tumbler and a piece of oiled tracing paper side by side in front of printed text.', 'Ask the student to read the text through the glass (where letters are sharp and clear) and then through the oiled paper.', 'Explain that because the text cannot be seen distinctly through the oiled paper, light is being scattered, proving the.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_005', difficulty: 'standard',
          question: 'A shadow is a dark patch formed on a surface when an opaque or translucent.',
          hint: 'Review c7_physics_ch05_003 and c7_physics_ch05_004 to reinforce how light travels and.',
          misconception: 'Students often believe that the shadow of an object moves on its own or that translucent objects cast completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A shadow is a dark patch formed on a surface when an opaque or translucent object blocks',
                  options: ['A shadow is a dark patch formed on a surface when an opaque or translucent object blocks', 'Light travels in straight lines in a homogeneous, transparent medium, a property known as', 'Luminous objects are those that emit their own light by converting various forms of', 'Transparent materials allow light to pass through them completely so objects can be seen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the shadow of an object moves on its own or that translucent objects cast completely pitch-black shadows.' }
          ],
            remediations: { 'the-shadow-of-an-object': { steps: ['To fix this, take a translucent plastic scale and an opaque book.', 'Hold each between a torch and a white wall in a darkened room.', 'Observe that the book casts a dark, sharp shadow (umbra only), while the translucent scale casts a very faint, hazy.', 'Conclude that translucent objects reduce the intensity of light rather than blocking it completely, resulting in a.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_006', difficulty: 'standard',
          question: 'The laws of reflection state that when light falls on a smooth, reflective.',
          hint: 'Review basic geometry concepts regarding perpendicular lines and angle measurements from.',
          misconception: 'Students frequently measure the angle of incidence and angle of reflection between the light ray and the reflecting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The laws of reflection state that when light falls on a smooth, reflective surface, the',
                  options: ['The laws of reflection state that when light falls on a smooth, reflective surface, the', 'Light travels in straight lines in a homogeneous, transparent medium, a property known as', 'Luminous objects are those that emit their own light by converting various forms of', 'Transparent materials allow light to pass through them completely so objects can be seen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently measure the angle of incidence and angle of reflection between the light ray and the reflecting surface itself, rather.' }
          ],
            remediations: { 'students-frequently-measure-the-angle': { steps: ['Take a flat sheet of paper and draw a straight line representing the mirror.', 'Draw a dashed line straight up at a 90° angle from the middle of the mirror line; label this dashed line as the.', 'Emphasize by drawing an arc that all angle measurements in optics must start from this dashed normal line, never from.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_007', difficulty: 'standard',
          question: 'The image formed by a plane mirror is virtual, erect, of the exact same size as.',
          hint: 'Review c7_physics_ch05_006 to master the basic laws of reflection before computing mirror.',
          misconception: 'Students often believe that the image formed in a plane mirror changes its size as the observer moves closer to or.',
          parts: [
                { id: 'a', prompt: 'Why is the image formed by a plane mirror called a "virtual image" instead of a "real image"?', answer: 'A plane mirror forms a virtual image',
                  options: ['A plane mirror forms a virtual image', 'we can clearly see them with our eyes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the image formed in a plane mirror changes its size as the observer moves closer to or farther away from the.' }
          ],
            remediations: { 'the-image-formed-in-a': { steps: ['To fix this misconception, have the student stand at a fixed distance from a wall mirror holding a ruler vertically.', 'Have them measure the height of their own reflection directly on the mirror surface using a dry-erase marker (or a.', 'Then, have them take two giant steps backward and measure the reflection height again on the same sheet.', 'They will observe that the measured height of the reflection remains identical, proving that image size depends only on.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
