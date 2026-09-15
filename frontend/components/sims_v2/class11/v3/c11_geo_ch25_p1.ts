import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch25_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch25_p1: SimDef = {
    id: 'v3_c11_geo_ch25_p1',
    title: 'Introduction to Aerial Photographs · Part 1/2',
    subtitle: 'See why one aerial photo holds two scales — and when tilt beats nadir.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to Aerial Photographs · Part 1/2',
    chapters: ['c11_geo_ch25'],
    nodeIds: ['c11_geo_cbse_25_001', 'c11_geo_cbse_25_002', 'c11_geo_cbse_25_003', 'c11_geo_cbse_25_004', 'c11_geo_cbse_25_005', 'c11_geo_cbse_25_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a photo-interpreter measuring terrain from a survey flight', intro: 'Hours of drone passes now do what months of theodolite work once did — but the geometry underneath is still one lens, one ray.', goal: 'Compute photo scale under relief variation and choose between vertical and oblique photographs.' },
    discovery: {
        question: 'A camera 3,000 m up photographs a hilltop and a valley in one frame — same scale everywhere, since it\'s one photo?',
        options: ['No — the hilltop is closer to the lens, so its scale is larger; relief changes the effective flying height', 'Yes — one exposure means one scale', 'Yes — scale depends only on the focal length', 'No — valleys always photograph larger'],
        answer: 'No — the hilltop is closer to the lens, so its scale is larger; relief changes the effective flying height',
        hook: 'And satellites haven\'t made these photos obsolete — Cartosat can\'t see through monsoon cloud, but a plane flies underneath it.',
    },
    teaching: [
        { title: 'Aerial Photography: Principle, Types and Advantages', text: 'Aerial photography is the technique of capturing photographs of the Earth\'s surface from an elevated platform (aircraft, drone, or balloon) using a precision camera mounted vertically or at an angle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_25_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute photo scale at two elevations with f/(H−h), then pick vertical versus oblique photography for mapping contours versus reading quake-damaged facades.',
        labels: ['Aerial Photography: Principle, Types', 'Aerial Photographs: Vertical', 'Geometry of Aerial Photographs', 'Scale of Aerial Photographs', 'Relief Displacement in Aerial', 'Stereoscopic Vision and Parallax'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_25_001', title: 'Aerial Photography: Principle, Types and Advantages',
          scaffold: { problem: 'The Survey of India plans an aerial survey of the Chambal ravines (Madhya Pradesh) for gully erosion mapping.',
            steps: [
            { text: 'Identify target average scale = 1:12,000 = 1/12,000. Use average ground elevation h_avg = (150 + 350)/2 = 250 m AMSL.' },
            { text: 'Apply scale formula: Scale = f / (H – h_avg). Rearrange: H – h_avg = f / Scale.' },
            { text: 'Convert f = 153 mm = 0.153 m. Compute H – h_avg = 0.153 / (1/12,000) = 0.153 × 12,000 = 1836 m.' },
            { text: 'Flying height AMSL: H = 1836 + h_avg = 1836 + 250 = 2086 m AMSL.' },
            { text: 'Calculate scale at lowest point (h = 150 m): H – h = 2086 – 150 = 1936 m.' },
            { text: 'Calculate scale at highest point (h = 350 m): H – h = 2086 – 350 = 1736 m.' },
            { text: 'Interpret: Scale varies from 1:11,341 (ravine ridges) to 1:12,654 (gully floors) — a 10.4% variation.', faded: true, blankAnswer: 'Flying height = 2086 m AMSL. Scale range: 1:11,341 (ridges).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_25_002', title: 'Aerial Photographs: Vertical vs Oblique Photographs',
          scaffold: { problem: 'A Survey of India aircraft captures vertical aerial photographs over the Gangetic plains (average elevation 100 m) with a 152 mm focal.',
            steps: [
            { text: 'Determine flying height above ground (H) = altitude above MSL - average ground elevation = 4000 m - 100 m = 3900 m.' },
            { text: 'Convert focal length to same units: f = 152 mm = 0.152 m.' },
            { text: 'Compute nominal scale for vertical photo: S = f / H = 0.152 / 3900 = 1 / 25658 ≈ 1 : 25,658.' },
            { text: 'For low oblique, the camera axis is tilted 30° from vertical. The distance from lens to ground at the principal point.' },
            { text: 'Scale at the principal point of oblique photo = f / (H / cos θ) = 0.152 / 4503 ≈ 1 : 29,625 (smaller scale than.' },
            { text: 'In the foreground (closer to aircraft), the ground is nearer to the lens than the principal point distance, so scale.', faded: true, blankAnswer: 'Vertical nominal scale ≈ 1:25,658. Low oblique scale varies.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_25_003', title: 'Geometry of Aerial Photographs: Focal Length and Principal Point',
          scaffold: { problem: 'A vertical aerial photograph of a portion of the Yamuna floodplain near Delhi is taken with a metric camera of focal length 152.4 mm.',
            steps: [
            { text: 'Identify given values: f = 152.4 mm = 0.1524 m; H = 4200 m; h = 210 m; photo distance = 3.8 cm = 0.038 m.' },
            { text: 'Compute flying height above ground: H - h = 4200 - 210 = 3990 m.' },
            { text: 'Calculate photo scale (RF): Scale = f / (H - h) = 0.1524 / 3990 = 1 / 26181.1 ≈ 1:26,181.' },
            { text: 'Convert photo distance to ground distance: Ground distance = photo distance × denominator of RF = 0.038 m × 26181.1.' },
            { text: 'Verify: At 1:26,181, 1 cm on photo = 261.81 m on ground; 3.8 cm ≈ 995 m — consistent.', faded: true, blankAnswer: 'The actual ground length of the road segment.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_25_004', title: 'Scale of Aerial Photographs: Determination Methods',
          scaffold: { problem: 'A vertical aerial photograph of the Narmada Valley was taken with a 152.4 mm focal length camera.',
            steps: [
            { text: 'Identify given values: f = 152.4 mm, H = 3650 m, h_valley = 350 m, h_hill = 850 m.' },
            { text: 'Calculate flying height above ground for each location: Valley: H - h = 3,650,000 - 350,000 = 3,300,000 mm.' },
            { text: 'Apply scale formula S = f / (H - h). Valley scale = 152.4 / 3,300,000 = 1 / 21,653.' },
            { text: 'Convert 5 cm photo distance (50 mm) to ground distance using each scale.' },
            { text: 'Interpret: The same 5 cm on the photograph represents 1.083 km on the valley floor but only 0.919 km on the hilltops.', faded: true, blankAnswer: 'Valley floor scale = 1:21,653 (5 cm = 1.083 km); Hilltop.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_25_005', title: 'Relief Displacement in Aerial Photographs: Causes and Correction',
          scaffold: { problem: 'A vertical aerial photograph of the Nilgiri Hills is taken at 3500 m above MSL with a 152 mm focal length camera.',
            steps: [
            { text: 'Identify datum and flying height above datum. Use MSL as datum. H = 3500 m.' },
            { text: 'Calculate flying height above each terrain: H_peak = 3500 - 2400 = 1100 m. H_valley = 3500 - 1800 = 1700 m.' },
            { text: 'The valley floor is closer to datum, so its image position (68 mm) approximates the planimetric position.' },
            { text: 'Verify using formula: d = r × h / H_valley. Here h = height of peak above valley = 2400 - 1800 = 600 m.' },
            { text: 'Re-read problem: "peak appears at 72 mm... valley appears at 68 mm". These are two different ground points.' },
            { text: 'For peak: r_planimetric = 72 × (3500 - 2400) / 3500 = 72 × 1100 / 3500 = 22.63 mm.' },
            { text: 'The peak and valley are at different planimetric positions. The relief displacement of the peak is d_peak = r_photo.' },
            { text: 'Photo scale at peak: S_peak = f / (H - h_peak) = 152 / 1100 = 1:7236.', faded: true, blankAnswer: '(a) Peak displacement = 49.4 mm outward; valley.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_25_006', title: 'Stereoscopic Vision and Parallax for 3D Viewing',
          scaffold: { problem: 'A stereo pair of vertical aerial photographs was taken with a camera of focal length 152.4 mm.',
            steps: [
            { text: 'Identify that absolute parallax p for any point = x_left − x_right (distance from principal point along flight line.' },
            { text: 'Identify given values: f = 152.4 mm, B = 1,500 m = 1,500,000 mm, p_datum = 76.2 mm, p_top = 78.5 mm.' },
            { text: 'Compute parallax difference Δp = p_top − p_datum = 78.5 − 76.2 = 2.3 mm.' },
            { text: 'Use the exact parallax formula: h = (Δp × H²) / (B × f + Δp × H)?' },
            { text: 'Plug in: p_base = 76.2 mm, p_top = 78.5 mm, B = 1,500,000 mm, f = 152.4 mm.' },
            { text: 'Check approximation: Δp = 2.3 mm, H = 3,000,000 mm. Approx h ≈ (Δp × H²) / (B × f) = (2.3 × 9×10¹²) / (1.5×10⁶ × 152.4).' },
            { text: 'Interpret: The TV tower is approximately 87.8 m tall. This is a realistic height for a TV tower.', faded: true, blankAnswer: 'The height of the TV tower is 87.8 m above the datum.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_25_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A drone club member wants to \'just tilt the camera\' for mapping a landslide, arguing: \'An oblique shot is basically a tilted vertical photo — you can measure road lengths on it with one scale factor. And Google Earth imagery works like any aerial photo for measurement.\'',
            decisions: [{ prompt: 'What does he misunderstand about aerial photo geometry?', options: [
                { text: 'Explain the projection difference: a vertical photo is a near-orthographic central projection with roughly uniform scale over flat ground; an oblique displaces the principal point from the nadir, so scale varies non-linearly from foreground to horizon — a single factor can be off by 2× or more. And raw metric photos preserve relief displacement, which is exploited for stereoscopic height; orthorectified mosaics like Google Earth have removed it.', outcome: 'He switches to vertical metric photography for measurement and keeps obliques for what they\'re good at — visual interpretation of facades and terrain.' },
                { text: 'Let him measure the oblique — tilt is a geometric nuisance a single correction factor can fix.', outcome: 'Tilt isn\'t rotation: scale changes continuously with both ground distance and elevation, so no single factor can flatten an oblique into a map.', reveals: 'oblique-is-tilted-vertical' },
                { text: 'Use Google Earth directly — it\'s sharper than old aerial photos, so it must measure better.', outcome: 'Orthorectification removes relief displacement using a DEM; that makes it planimetrically tidy but destroys the stereo geometry metric photos exploit for heights.', reveals: 'google-earth-equals-aerial-photo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_25_006', title: 'The bigger picture',
          caseStudy: { intro: 'The camera\'s central projection is the whole science — every measurement traces back to a straight ray through a lens.',
            decisions: [{ prompt: 'What comes next? Introduction to Aerial Photographs · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Aerial Photographs · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_001', difficulty: 'standard',
          question: 'Aerial photography is the technique of capturing photographs of the Earth\'s.',
          hint: 'Review Class 8 map projections (c8_geo_ch2_2, c8_geo_ch2_3) and Class 11 Physics ray.',
          misconception: 'Students believe aerial photographs are "just photos from planes" and equate them with satellite images or drone.',
          parts: [
                { id: 'a', prompt: 'Why does a vertical aerial photograph show scale variation across the image even when the camera is perfectly level, whereas a topographical map maintains.', answer: 'A vertical aerial photograph is a **central projection**',
                  options: ['A vertical aerial photograph is a **central projection**', 'because the photo is distorted', 'just photos from planes'],
                  hint: 'Review Class 8 map projections (c8_geo_ch2_2, c8_geo_ch2_3) and Class 11 Physics ray optics (thin.',
                  misconception: 'Students believe aerial photographs are "just photos from planes" and equate them with satellite images or drone selfies.' },
                { id: 'b', prompt: 'Compare a low oblique and a high oblique aerial photograph in terms of: (a) horizon visibility, (b) scale variation pattern, (c) suitability for mapping hilly.', answer: 'horizon visibility, (',
                  options: ['horizon visibility, (', 'high oblique shows more area', 'just photos from planes'],
                  hint: 'Review Class 8 map projections (c8_geo_ch2_2, c8_geo_ch2_3) and Class 11 Physics ray optics (thin.',
                  misconception: 'Students believe aerial photographs are "just photos from planes" and equate them with satellite images or drone selfies.' }
          ],
            remediations: { 'aerial-photographs-are-just-photos': { steps: ['** Revisit Class 8 map projections (c8_geo_ch2_2, c8_geo_ch2_3) — understand the difference between perspective.', '** Draw a ray diagram: ground point → lens (perspective centre) → image plane.', '** Use a printed vertical aerial photo (Survey of India sample) and a topographical map of the same area.', '** Sketch low vs high oblique — mark horizon line, near/far scale gradient.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe aerial photographs are "just photos from planes" and equate them with satellite images or drone.',
          parts: [
                { id: 'a', prompt: 'Design a photo-specification table for a new aerial survey of the Sundarbans mangrove delta (tidal, low-relief, cloudy) at 1:10,000 scale for tidal creek.', answer: '| Parameter | Specification | Justification |',
                  options: ['| Parameter | Specification | Justification |', 'just photos from planes'],
                  hint: 'Review Class 8 map projections (c8_geo_ch2_2, c8_geo_ch2_3) and Class 11 Physics ray optics (thin.',
                  misconception: 'Students believe aerial photographs are "just photos from planes" and equate them with satellite images or drone selfies.' }
          ],
            remediations: { 'aerial-photographs-are-just-photos': { steps: ['** Revisit Class 8 map projections (c8_geo_ch2_2, c8_geo_ch2_3) — understand the difference between perspective.', '** Draw a ray diagram: ground point → lens (perspective centre) → image plane.', '** Use a printed vertical aerial photo (Survey of India sample) and a topographical map of the same area.', '** Sketch low vs high oblique — mark horizon line, near/far scale gradient.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_002', difficulty: 'standard',
          question: 'Vertical aerial photographs are taken with the camera axis perfectly.',
          hint: 'Revisit c11_geo_cbse_25_001 to review camera axis definitions and the concept.',
          misconception: 'Students often believe that "oblique photographs are just tilted vertical photographs" and that scale correction is.',
          parts: [
                { id: 'a', prompt: 'Given a vertical aerial photograph with focal length 152 mm and flying height 3000 m above mean sea level, calculate the nominal scale.', answer: 'Nominal scale = f / H = 152 mm / 3,000,000 mm = 1 : 19,737 (approx 1:20,000)',
                  options: ['Nominal scale = f / H = 152 mm / 3,000,000 mm = 1 : 19,737 (approx 1:20,000)', 'oblique photographs are just tilted vertical photographs'],
                  hint: 'Revisit c11_geo_cbse_25_001 to review camera axis definitions and the concept of nadir/principal.',
                  misconception: 'Students often believe that "oblique photographs are just tilted vertical photographs" and that scale correction is a simple rotation.' }
          ],
            remediations: { 'oblique-photographs-are-just-tilted': { steps: ['Use a physical model: Hold a rectangular card (representing the image plane) parallel to a table (vertical photo) then.', 'Shine a flashlight (camera lens) through a pinhole onto the card; observe how the light footprint stretches.', 'Print a vertical and low oblique photo of the same area (e.g., school campus from Survey of India archives).', 'Overlay a grid of 1 cm squares on both.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_003', difficulty: 'standard',
          question: 'In vertical aerial photography, the **focal length (f)** is the precise.',
          hint: 'Revisit the pinhole camera model (Class 10 Physics): a tiny aperture projects an inverted.',
          misconception: 'Students often believe the principal point is always at the exact centre of the photographic print (the intersection.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In vertical aerial photography, the **focal length (f)** is the precise distance from the',
                  options: ['In vertical aerial photography, the **focal length (f)** is the precise distance from the', 'Aerial photography is the technique of capturing photographs of the Earth\'s surface from', 'Vertical aerial photographs are taken with the camera axis perfectly perpendicular to the', 'The scale of an aerial photograph is the ratio of a distance on the photograph to the'],
                  hint: 'Revisit the pinhole camera model (Class 10 Physics): a tiny aperture projects an inverted image.',
                  misconception: 'Students often believe the principal point is always at the exact centre of the photographic print (the intersection of the print\'s.' }
          ],
            remediations: { 'the-principal-point-is-always': { steps: ['Take a printed aerial photograph (or a scanned image) with visible fiducial marks.', 'Draw lines connecting opposite fiducial marks using a ruler.', 'Mark their intersection — this is the principal point.', 'Now fold the photo to find its geometric centre (diagonal intersection).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_004', difficulty: 'standard',
          question: 'The scale of an aerial photograph is the ratio of a distance on the photograph.',
          hint: 'Review c11_geo_cbse_25_003 (Geometry of Aerial Photographs) focusing on the similar.',
          misconception: 'Students believe the scale of a vertical aerial photograph is constant across the entire image, calculated simply.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The scale of an aerial photograph is the ratio of a distance on the photograph to the',
                  options: ['The scale of an aerial photograph is the ratio of a distance on the photograph to the', 'Aerial photography is the technique of capturing photographs of the Earth\'s surface from', 'Vertical aerial photographs are taken with the camera axis perfectly perpendicular to the', 'In vertical aerial photography, the **focal length (f)** is the precise distance from the'],
                  hint: 'Review c11_geo_cbse_25_003 (Geometry of Aerial Photographs) focusing on the similar triangles.',
                  misconception: 'Students believe the scale of a vertical aerial photograph is constant across the entire image, calculated simply as focal length divided.' }
          ],
            remediations: { 'the-scale-of-a-vertical': { steps: ['Draw a cross-section diagram showing camera at height H, hilltop at h1, valley at h2.', 'Write similar triangle ratios for both points: photo_distance / focal_length = ground_distance / (H - h).', 'Derive scale = f/(H - h) for each point.', 'Calculate numerical example: f=152mm, H=4000m, h_hill=1500m, h_valley=500m.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_005', difficulty: 'standard',
          question: 'Relief displacement is the radial shift of an image point on a vertical aerial.',
          hint: 'Review the similar triangles derivation in c11_geo_cbse_25_003 (Geometry of Aerial.',
          misconception: 'Students believe relief displacement is caused by the camera lens "magnifying" tall objects, making them look bigger.',
          parts: [
                { id: 'a', prompt: 'Explain why relief displacement is zero at the principal point and increases towards the edges of a vertical aerial photograph, using the geometry of similar.', answer: 'At the principal point, the radial distance r = 0, so displacement d = r·h/H = 0',
                  options: ['At the principal point, the radial distance r = 0, so displacement d = r·h/H = 0', 'lens distortion', 'scale change', 'magnifying'],
                  hint: 'Review the similar triangles derivation in c11_geo_cbse_25_003 (Geometry of Aerial Photographs) and.',
                  misconception: 'Students believe relief displacement is caused by the camera lens "magnifying" tall objects, making them look bigger and thus shifted.' }
          ],
            remediations: { 'relief-displacement-is-caused-by': { steps: ['Draw a side-view diagram: exposure station L, focal length f, photo plane, ground datum, and a vertical object.', 'Trace rays from L through base B and top T to photo plane.', 'Mark image points b and t.', 'Measure planimetric position b\' where ray through B would hit if ground were flat at datum.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_25_006', difficulty: 'standard',
          question: 'Stereoscopic vision is the physiological process by which the human brain fuses.',
          hint: 'Review the ray diagram in Node 003 (Geometry of Aerial Photographs) and the relief.',
          misconception: 'Students believe that parallax and relief displacement are the same phenomenon because both cause image shifts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Stereoscopic vision is the physiological process by',
                  options: ['Stereoscopic vision is the physiological process by', 'Aerial photography is the technique of capturing photographs of the Earth\'s surface from', 'Vertical aerial photographs are taken with the camera axis perfectly perpendicular to the', 'In vertical aerial photography, the **focal length (f)** is the precise distance from the'],
                  hint: 'Review the ray diagram in Node 003 (Geometry of Aerial Photographs) and the relief displacement.',
                  misconception: 'Students believe that parallax and relief displacement are the same phenomenon because both cause image shifts on aerial photographs.' }
          ],
            remediations: { 'parallax-and-relief-displacement-are': { steps: ['Draw a single vertical photo of a tall tower — show radial displacement of top from base (relief displacement).', 'Draw a stereo pair — show that on the left photo the top shifts left, on the right photo it shifts right; the.', 'Use a physical model: place a pencil (tower) on a table, photograph from two positions; overlay prints and measure the.', 'Emphasize: relief displacement = single photo, radial; parallax = stereo pair, along flight line, measures height.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
