// Atlas Puppy .riv generator — redesigned for a real puppy silhouette
// Rive draw order: FIRST written drawable = FRONT (on top)
import { RiveFile, hex as hexColor, PropertyKey } from '@stevysmith/rive-generator';
import { writeFileSync } from 'fs';

const riv = new RiveFile();
const artboard = riv.addArtboard({ name: 'AtlasPuppy', width: 240, height: 280 });

// Colors
const FUR = hexColor('#E8B86D');      // warm golden
const FUR_DARK = hexColor('#C4954A'); // shadow gold
const EAR = hexColor('#A67C3A');      // ear leather
const EAR_INNER = hexColor('#D4A05E'); // inner ear
const CREAM = hexColor('#FFF4E0');    // belly/snout
const DARK = hexColor('#2D2438');     // eyes/nose
const WHITE = hexColor('#FFFFFF');    // eye highlights
const PINK = hexColor('#FF8FA3');     // tongue
const BLUE = hexColor('#2563EB');     // collar
const GOLD = hexColor('#FFD700');     // collar tag

// ═══ FRONT LAYER (drawn first = on top) ═══

// Eye highlights — tiny white sparkles
const lHL = riv.addShape(artboard, { name: 'LHL', x: 100, y: 95 });
riv.addEllipse(lHL, { width: 8, height: 8 });
riv.addSolidColor(riv.addFill(lHL), WHITE);

const rHL = riv.addShape(artboard, { name: 'RHL', x: 150, y: 95 });
riv.addEllipse(rHL, { width: 8, height: 8 });
riv.addSolidColor(riv.addFill(rHL), WHITE);

// Pupils — big dark eyes
const lPup = riv.addShape(artboard, { name: 'LPup', x: 96, y: 100 });
riv.addEllipse(lPup, { width: 22, height: 24 });
riv.addSolidColor(riv.addFill(lPup), DARK);

const rPup = riv.addShape(artboard, { name: 'RPup', x: 146, y: 100 });
riv.addEllipse(rPup, { width: 22, height: 24 });
riv.addSolidColor(riv.addFill(rPup), DARK);

// Nose — big black nose
const nose = riv.addShape(artboard, { name: 'Nose', x: 121, y: 125 });
riv.addEllipse(nose, { width: 24, height: 20 });
riv.addSolidColor(riv.addFill(nose), DARK);

// Nose highlight
const noseHL = riv.addShape(artboard, { name: 'NoseHL', x: 126, y: 120 });
riv.addEllipse(noseHL, { width: 7, height: 5 });
riv.addSolidColor(riv.addFill(noseHL), WHITE);

// Eye whites
const lEye = riv.addShape(artboard, { name: 'LEye', x: 96, y: 98 });
riv.addEllipse(lEye, { width: 30, height: 32 });
riv.addSolidColor(riv.addFill(lEye), WHITE);

const rEye = riv.addShape(artboard, { name: 'REye', x: 146, y: 98 });
riv.addEllipse(rEye, { width: 30, height: 32 });
riv.addSolidColor(riv.addFill(rEye), WHITE);

// Mouth — smile curve
const mouth = riv.addShape(artboard, { name: 'Mouth', x: 121, y: 140 });
const mPath = riv.addPointsPath(mouth, { closed: false });
riv.addVertex(mPath, { x: -22, y: 0 });
riv.addVertex(mPath, { x: -8, y: 14 });
riv.addVertex(mPath, { x: 0, y: 17 });
riv.addVertex(mPath, { x: 8, y: 14 });
riv.addVertex(mPath, { x: 22, y: 0 });
riv.addSolidColor(riv.addStroke(mouth, { thickness: 4 }), DARK);

// Tongue
const tongue = riv.addShape(artboard, { name: 'Tongue', x: 121, y: 152 });
riv.addEllipse(tongue, { width: 18, height: 14 });
riv.addSolidColor(riv.addFill(tongue), PINK);

// Collar tag — gold star
const tag = riv.addShape(artboard, { name: 'Tag', x: 121, y: 185 });
riv.addEllipse(tag, { width: 18, height: 18 });
riv.addSolidColor(riv.addFill(tag), GOLD);

// ═══ MID LAYER ═══

// Snout — cream muzzle area
const snout = riv.addShape(artboard, { name: 'Snout', x: 121, y: 130 });
riv.addEllipse(snout, { width: 65, height: 55 });
riv.addSolidColor(riv.addFill(snout), CREAM);

// Left ear — big floppy ear, hangs down from head
const lEar = riv.addShape(artboard, { name: 'LEar', x: 55, y: 105 });
const lePath = riv.addPointsPath(lEar, { closed: true });
riv.addVertex(lePath, { x: -5, y: -25 });
riv.addVertex(lePath, { x: 20, y: -30 });
riv.addVertex(lePath, { x: 30, y: 5 });
riv.addVertex(lePath, { x: 25, y: 45 });
riv.addVertex(lePath, { x: 10, y: 60 });
riv.addVertex(lePath, { x: -10, y: 40 });
riv.addVertex(lePath, { x: -15, y: 10 });
riv.addSolidColor(riv.addFill(lEar), EAR);

// Right ear — big floppy ear
const rEar = riv.addShape(artboard, { name: 'REar', x: 187, y: 105 });
const rePath = riv.addPointsPath(rEar, { closed: true });
riv.addVertex(rePath, { x: 5, y: -25 });
riv.addVertex(rePath, { x: -20, y: -30 });
riv.addVertex(rePath, { x: -30, y: 5 });
riv.addVertex(rePath, { x: -25, y: 45 });
riv.addVertex(rePath, { x: -10, y: 60 });
riv.addVertex(rePath, { x: 10, y: 40 });
riv.addVertex(rePath, { x: 15, y: 10 });
riv.addSolidColor(riv.addFill(rEar), EAR);

// Collar — blue band
const collar = riv.addShape(artboard, { name: 'Collar', x: 121, y: 172 });
riv.addRectangle(collar, { width: 105, height: 12 });
riv.addSolidColor(riv.addFill(collar), BLUE);

// Paws — cream paws at bottom
const lPaw = riv.addShape(artboard, { name: 'LPaw', x: 85, y: 255 });
riv.addEllipse(lPaw, { width: 35, height: 25 });
riv.addSolidColor(riv.addFill(lPaw), CREAM);

const rPaw = riv.addShape(artboard, { name: 'RPaw', x: 157, y: 255 });
riv.addEllipse(rPaw, { width: 35, height: 25 });
riv.addSolidColor(riv.addFill(rPaw), CREAM);

// Belly — cream chest
const belly = riv.addShape(artboard, { name: 'Belly', x: 121, y: 215 });
riv.addEllipse(belly, { width: 85, height: 75 });
riv.addSolidColor(riv.addFill(belly), CREAM);

// Tail — small wagging tail (dark gold)
const tail = riv.addShape(artboard, { name: 'Tail', x: 200, y: 200 });
const tPath = riv.addPointsPath(tail, { closed: true });
riv.addVertex(tPath, { x: 0, y: 0 });
riv.addVertex(tPath, { x: 25, y: -20 });
riv.addVertex(tPath, { x: 35, y: -10 });
riv.addVertex(tPath, { x: 30, y: 5 });
riv.addVertex(tPath, { x: 10, y: 15 });
riv.addSolidColor(riv.addFill(tail), FUR_DARK);

// ═══ BACK LAYER (drawn last = behind) ═══

// Head — big round golden head
const head = riv.addShape(artboard, { name: 'Head', x: 121, y: 100 });
riv.addEllipse(head, { width: 115, height: 105 });
riv.addSolidColor(riv.addFill(head), FUR);

// Body — bigger rounded body
const body = riv.addShape(artboard, { name: 'Body', x: 121, y: 210 });
riv.addEllipse(body, { width: 135, height: 110 });
riv.addSolidColor(riv.addFill(body), FUR);

// ═══ ANIMATIONS ═══

// IDLE — breathing + head bob + ear wiggle + tail wag
const idle = riv.addLinearAnimation(artboard, { name: 'idle', duration: 3.0, loop: 'loop' });

const bodyK = riv.addKeyedObject(idle, body.id);
const bodySY = riv.addKeyedProperty(bodyK, PropertyKey.scaleY);
riv.addKeyFrameDouble(bodySY, { frame: 0, value: 1 });
riv.addKeyFrameDouble(bodySY, { frame: 45, value: 1.03 });
riv.addKeyFrameDouble(bodySY, { frame: 90, value: 1 });

const headK = riv.addKeyedObject(idle, head.id);
const headY = riv.addKeyedProperty(headK, PropertyKey.y);
riv.addKeyFrameDouble(headY, { frame: 0, value: 100 });
riv.addKeyFrameDouble(headY, { frame: 45, value: 97 });
riv.addKeyFrameDouble(headY, { frame: 90, value: 100 });

const tailK = riv.addKeyedObject(idle, tail.id);
const tailR = riv.addKeyedProperty(tailK, PropertyKey.rotation);
riv.addKeyFrameDouble(tailR, { frame: 0, value: 0 });
riv.addKeyFrameDouble(tailR, { frame: 30, value: 0.3 });
riv.addKeyFrameDouble(tailR, { frame: 60, value: -0.2 });
riv.addKeyFrameDouble(tailR, { frame: 90, value: 0 });

// CELEBRATE — jump + head shake
const celebrate = riv.addLinearAnimation(artboard, { name: 'celebrate', duration: 1.2, loop: 'oneShot' });

const cBodyK = riv.addKeyedObject(celebrate, body.id);
const cBodyY = riv.addKeyedProperty(cBodyK, PropertyKey.y);
riv.addKeyFrameDouble(cBodyY, { frame: 0, value: 210 });
riv.addKeyFrameDouble(cBodyY, { frame: 15, value: 170 });
riv.addKeyFrameDouble(cBodyY, { frame: 36, value: 210 });

const cHeadK = riv.addKeyedObject(celebrate, head.id);
const cHeadR = riv.addKeyedProperty(cHeadK, PropertyKey.rotation);
riv.addKeyFrameDouble(cHeadR, { frame: 0, value: 0 });
riv.addKeyFrameDouble(cHeadR, { frame: 8, value: -0.2 });
riv.addKeyFrameDouble(cHeadR, { frame: 16, value: 0.2 });
riv.addKeyFrameDouble(cHeadR, { frame: 24, value: -0.15 });
riv.addKeyFrameDouble(cHeadR, { frame: 36, value: 0 });

const cTailK = riv.addKeyedObject(celebrate, tail.id);
const cTailR = riv.addKeyedProperty(cTailK, PropertyKey.rotation);
riv.addKeyFrameDouble(cTailR, { frame: 0, value: 0 });
riv.addKeyFrameDouble(cTailR, { frame: 6, value: 0.5 });
riv.addKeyFrameDouble(cTailR, { frame: 12, value: -0.3 });
riv.addKeyFrameDouble(cTailR, { frame: 18, value: 0.5 });
riv.addKeyFrameDouble(cTailR, { frame: 24, value: -0.3 });
riv.addKeyFrameDouble(cTailR, { frame: 36, value: 0 });

// THINKING — head tilt
const thinking = riv.addLinearAnimation(artboard, { name: 'thinking', duration: 2.5, loop: 'loop' });

const tHeadK = riv.addKeyedObject(thinking, head.id);
const tHeadR = riv.addKeyedProperty(tHeadK, PropertyKey.rotation);
riv.addKeyFrameDouble(tHeadR, { frame: 0, value: 0 });
riv.addKeyFrameDouble(tHeadR, { frame: 30, value: 0.25 });
riv.addKeyFrameDouble(tHeadR, { frame: 75, value: 0.25 });
riv.addKeyFrameDouble(tHeadR, { frame: 90, value: 0 });

const data = riv.export();
writeFileSync('public/rive/atlas-puppy.riv', data);
console.log('Generated atlas-puppy.riv:', data.length, 'bytes');
