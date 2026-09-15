/**
 * Generate Rive .riv files programmatically for Atlas games
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { RiveFile, hex, PropertyKey } from '@stevysmith/rive-generator';

const OUTPUT_DIR = join(process.cwd(), 'public', 'rive');
mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Owl Mascot ───────────────────────────────────────────────

export function generateOwlMascot(): string {
  const riv = new RiveFile();

  const artboard = riv.addArtboard({ name: 'OwlMascot', width: 120, height: 120 });

  // Body
  const body = riv.addShape(artboard, { name: 'Body', x: 60, y: 65 });
  riv.addEllipse(body, { width: 40, height: 44 });
  const bodyFill = riv.addFill(body);
  riv.addSolidColor(bodyFill, hex('#8B6F47'));

  // Belly
  const belly = riv.addShape(artboard, { name: 'Belly', x: 60, y: 70 });
  riv.addEllipse(belly, { width: 26, height: 30 });
  const bellyFill = riv.addFill(belly);
  riv.addSolidColor(bellyFill, hex('#D4A574'));

  // Left eye
  const leftEye = riv.addShape(artboard, { name: 'LeftEye', x: 48, y: 50 });
  riv.addEllipse(leftEye, { width: 18, height: 18 });
  const leftEyeFill = riv.addFill(leftEye);
  riv.addSolidColor(leftEyeFill, hex('#FFFFFF'));

  // Right eye
  const rightEye = riv.addShape(artboard, { name: 'RightEye', x: 72, y: 50 });
  riv.addEllipse(rightEye, { width: 18, height: 18 });
  const rightEyeFill = riv.addFill(rightEye);
  riv.addSolidColor(rightEyeFill, hex('#FFFFFF'));

  // Left pupil
  const leftPupil = riv.addShape(artboard, { name: 'LeftPupil', x: 48, y: 50 });
  riv.addEllipse(leftPupil, { width: 10, height: 10 });
  const leftPupilFill = riv.addFill(leftPupil);
  riv.addSolidColor(leftPupilFill, hex('#2C1810'));

  // Right pupil
  const rightPupil = riv.addShape(artboard, { name: 'RightPupil', x: 72, y: 50 });
  riv.addEllipse(rightPupil, { width: 10, height: 10 });
  const rightPupilFill = riv.addFill(rightPupil);
  riv.addSolidColor(rightPupilFill, hex('#2C1810'));

  // Beak
  const beak = riv.addShape(artboard, { name: 'Beak', x: 60, y: 58 });
  const beakPath = riv.addPointsPath(beak, { closed: true });
  riv.addVertex(beakPath, { x: -4, y: 0 });
  riv.addVertex(beakPath, { x: 4, y: 0 });
  riv.addVertex(beakPath, { x: 0, y: 6 });
  const beakFill = riv.addFill(beak);
  riv.addSolidColor(beakFill, hex('#FFA000'));

  // Left ear
  const leftEar = riv.addShape(artboard, { name: 'LeftEar', x: 38, y: 32 });
  const leftEarPath = riv.addPointsPath(leftEar, { closed: true });
  riv.addVertex(leftEarPath, { x: -2, y: 0 });
  riv.addVertex(leftEarPath, { x: 4, y: 8 });
  riv.addVertex(leftEarPath, { x: 6, y: 0 });
  const leftEarFill = riv.addFill(leftEar);
  riv.addSolidColor(leftEarFill, hex('#8B6F47'));

  // Right ear
  const rightEar = riv.addShape(artboard, { name: 'RightEar', x: 82, y: 32 });
  const rightEarPath = riv.addPointsPath(rightEar, { closed: true });
  riv.addVertex(rightEarPath, { x: 2, y: 0 });
  riv.addVertex(rightEarPath, { x: -4, y: 8 });
  riv.addVertex(rightEarPath, { x: -6, y: 0 });
  const rightEarFill = riv.addFill(rightEar);
  riv.addSolidColor(rightEarFill, hex('#8B6F47'));

  // ─── Idle Animation (gentle bob + blink) ──────────────────
  const idleAnim = riv.addLinearAnimation(artboard, {
    name: 'idle',
    duration: 2.0,
    loop: 'loop',
  });

  // Bob body up and down
  const bodyKeyedObj = riv.addKeyedObject(idleAnim, body);
  const bodyYKey = riv.addKeyedProperty(bodyKeyedObj, PropertyKey.y);
  riv.addKeyFrameDouble(bodyYKey, { frame: 0, value: 65 });
  riv.addKeyFrameDouble(bodyYKey, { frame: 30, value: 61 });
  riv.addKeyFrameDouble(bodyYKey, { frame: 60, value: 65 });

  // ─── Celebrate Animation ──────────────────────────────────
  const celebrateAnim = riv.addLinearAnimation(artboard, {
    name: 'celebrate',
    duration: 0.8,
    loop: 'oneShot',
  });

  const celBodyKeyed = riv.addKeyedObject(celebrateAnim, body);
  const celBodyYKey = riv.addKeyedProperty(celBodyKeyed, PropertyKey.y);
  riv.addKeyFrameDouble(celBodyYKey, { frame: 0, value: 65 });
  riv.addKeyFrameDouble(celBodyYKey, { frame: 12, value: 50 });
  riv.addKeyFrameDouble(celBodyYKey, { frame: 24, value: 65 });

  const celBodyRotKey = riv.addKeyedProperty(celBodyKeyed, PropertyKey.rotation);
  riv.addKeyFrameDouble(celBodyRotKey, { frame: 0, value: 0 });
  riv.addKeyFrameDouble(celBodyRotKey, { frame: 8, value: -10 });
  riv.addKeyFrameDouble(celBodyRotKey, { frame: 16, value: 10 });
  riv.addKeyFrameDouble(celBodyRotKey, { frame: 24, value: 0 });

  // Export
  const filePath = join(OUTPUT_DIR, 'owl-mascot.riv');
  writeFileSync(filePath, riv.export());
  console.log(`Generated: ${filePath}`);
  return filePath;
}

// ─── Apple (for counting game) ────────────────────────────────

export function generateApple(): string {
  const riv = new RiveFile();

  const artboard = riv.addArtboard({ name: 'Apple', width: 50, height: 50 });

  // Apple body with radial gradient
  const body = riv.addShape(artboard, { name: 'Body', x: 25, y: 30 });
  riv.addEllipse(body, { width: 36, height: 36 });
  const fill = riv.addFill(body);
  const grad = riv.addRadialGradient(fill, { startX: 18, startY: 22, endX: 35, endY: 40 });
  riv.addGradientStop(grad, { position: 0, color: hex('#FF6B6B') });
  riv.addGradientStop(grad, { position: 0.6, color: hex('#E53935') });
  riv.addGradientStop(grad, { position: 1, color: hex('#C62828') });

  // Leaf
  const leaf = riv.addShape(artboard, { name: 'Leaf', x: 28, y: 10 });
  riv.addEllipse(leaf, { width: 12, height: 6 });
  const leafFill = riv.addFill(leaf);
  riv.addSolidColor(leafFill, hex('#4CAF50'));

  // Stem
  const stem = riv.addShape(artboard, { name: 'Stem', x: 25, y: 10 });
  riv.addRectangle(stem, { width: 2, height: 6, x: 0, y: 0 });
  const stemFill = riv.addFill(stem);
  riv.addSolidColor(stemFill, hex('#5D4037'));

  // Bounce animation (squash and stretch on drop)
  const bounceAnim = riv.addLinearAnimation(artboard, {
    name: 'bounce',
    duration: 0.4,
    loop: 'oneShot',
  });

  const bodyKeyed = riv.addKeyedObject(bounceAnim, body);
  const scaleXKey = riv.addKeyedProperty(bodyKeyed, PropertyKey.scaleX);
  riv.addKeyFrameDouble(scaleXKey, { frame: 0, value: 1 });
  riv.addKeyFrameDouble(scaleXKey, { frame: 6, value: 1.2 });
  riv.addKeyFrameDouble(scaleXKey, { frame: 12, value: 1 });

  const scaleYKey = riv.addKeyedProperty(bodyKeyed, PropertyKey.scaleY);
  riv.addKeyFrameDouble(scaleYKey, { frame: 0, value: 1 });
  riv.addKeyFrameDouble(scaleYKey, { frame: 6, value: 0.8 });
  riv.addKeyFrameDouble(scaleYKey, { frame: 12, value: 1 });

  const filePath = join(OUTPUT_DIR, 'apple.riv');
  writeFileSync(filePath, riv.export());
  console.log(`Generated: ${filePath}`);
  return filePath;
}

// ─── Generate all ─────────────────────────────────────────────

export function generateAllRiveFiles(): string[] {
  const files: string[] = [];
  try { files.push(generateOwlMascot()); } catch (e) { console.error('Owl mascot failed:', e); }
  try { files.push(generateApple()); } catch (e) { console.error('Apple failed:', e); }
  return files;
}

if (require.main === module) {
  console.log('Generating Rive files...');
  const files = generateAllRiveFiles();
  console.log(`\nDone! Generated ${files.length} files:`);
  files.forEach(f => console.log(`  ${f}`));
}
