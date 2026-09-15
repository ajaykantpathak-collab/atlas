// Minimal .riv writer based on rive-mcp's writeRiv approach
// https://github.com/ODU33104/rive-mcp
import { writeFileSync } from 'fs';

// --- Binary Writer ---
class BinaryWriter {
  chunks = [];
  varuint(v) {
    do {
      let b = v & 0x7f;
      v >>>= 7;
      if (v) b |= 0x80;
      this.chunks.push(b);
    } while (v);
  }
  float32(v) {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setFloat32(0, v, true);
    this.chunks.push(...new Uint8Array(buf));
  }
  uint32(v) {
    const buf = new ArrayBuffer(4);
    new DataView(buf).setUint32(0, v >>> 0, true);
    this.chunks.push(...new Uint8Array(buf));
  }
  string(s) {
    const bytes = new TextEncoder().encode(s);
    this.varuint(bytes.length);
    this.chunks.push(...bytes);
  }
  bytes() { return new Uint8Array(this.chunks); }
}

// --- Type keys (from official rive-runtime dev/defs/) ---
const T = {
  Backboard: 23, Artboard: 1, Node: 2, Shape: 3, Ellipse: 4,
  Rectangle: 7, Triangle: 8, Path: 12, PointsPath: 16,
  StraightVertex: 5, Fill: 20, SolidColor: 18,
  LinearGradient: 22, RadialGradient: 17, GradientStop: 19,
  Stroke: 24, LinearAnimation: 31,
  KeyedObject: 25, KeyedProperty: 26, KeyFrameDouble: 30,
};

// --- Property keys (from official rive-runtime dev/defs/) ---
const P = {
  name: 4, parentId: 5,
  width: 7, height: 8,  // LayoutComponent (Artboard)
  x: 13, y: 14,         // Node
  rotation: 15, scaleX: 16, scaleY: 17,  // TransformComponent
  opacity: 18,          // WorldTransformComponent
  pathWidth: 20, pathHeight: 21,  // ParametricPath
  colorValue: 37,       // SolidColor
  isVisible: 41,        // ShapePaint
  thickness: 47,        // Stroke
  isClosed: 32,         // PointsPath
  vertexX: 24, vertexY: 25,  // Vertex
  drawableFlags: 129,   // Drawable
  blendModeValue: 23,   // Drawable
  fps: 56, duration: 57, speed: 58, loopValue: 59,  // LinearAnimation
  objectId: 51, propertyKeyId: 53,  // KeyedObject/KeyedProperty
  frame: 67, interpolationType: 68, interpolatorId: 69, keyFrameValue: 70,  // KeyFrame
};

// --- Field types: 0=uint, 1=string, 2=double(float32), 3=color ---
const FT = { uint: 0, string: 1, double: 2, color: 3 };

// Property key -> field type
const PK_TYPE = {
  [P.name]: FT.string, [P.parentId]: FT.uint,
  [P.width]: FT.double, [P.height]: FT.double,
  [P.x]: FT.double, [P.y]: FT.double,
  [P.rotation]: FT.double, [P.scaleX]: FT.double, [P.scaleY]: FT.double,
  [P.opacity]: FT.double,
  [P.pathWidth]: FT.double, [P.pathHeight]: FT.double,
  [P.colorValue]: FT.color,
  [P.isVisible]: FT.uint, [P.thickness]: FT.double,
  [P.isClosed]: FT.uint, [P.vertexX]: FT.double, [P.vertexY]: FT.double,
  [P.drawableFlags]: FT.uint, [P.blendModeValue]: FT.uint,
  [P.fps]: FT.uint, [P.duration]: FT.uint, [P.speed]: FT.double, [P.loopValue]: FT.uint,
  [P.objectId]: FT.uint, [P.propertyKeyId]: FT.uint,
  [P.frame]: FT.uint, [P.interpolationType]: FT.uint, [P.interpolatorId]: FT.uint,
  [P.keyFrameValue]: FT.double,
};

// --- WriterObject: { type: number, props: { key: number, value: any }[] } ---

function writeRiv(objects) {
  const w = new BinaryWriter();
  // Header
  w.chunks.push(0x52, 0x49, 0x56, 0x45); // "RIVE"
  w.varuint(7); // major
  w.varuint(0); // minor
  w.varuint(0); // fileId

  // ToC: collect all used property keys
  const used = new Map(); // key -> fieldType
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj.props)) {
      if (value === undefined || value === null) continue;
      const k = Number(key);
      const ft = PK_TYPE[k] ?? FT.double;
      used.set(k, ft);
    }
  }
  const tocKeys = [...used.keys()];
  for (const k of tocKeys) w.varuint(k);
  w.varuint(0); // end of ToC
  // Field types: 2 bits per property, packed into uint32 (4 props per uint32)
  for (let i = 0; i < tocKeys.length; i += 4) {
    let word = 0;
    for (let j = 0; j < 4 && i + j < tocKeys.length; j++) {
      word |= (used.get(tocKeys[i + j]) & 3) << (j * 2);
    }
    w.uint32(word);
  }

  // Objects
  for (const obj of objects) {
    w.varuint(obj.type);
    for (const [key, value] of Object.entries(obj.props)) {
      if (value === undefined || value === null) continue;
      const k = Number(key);
      const ft = PK_TYPE[k] ?? FT.double;
      w.varuint(k);
      switch (ft) {
        case FT.double: w.float32(value); break;
        case FT.string: w.string(String(value)); break;
        case FT.color: w.uint32(value >>> 0); break;
        default: w.varuint(typeof value === 'boolean' ? (value ? 1 : 0) : value); break;
      }
    }
    w.varuint(0); // end of properties
  }

  return w.bytes();
}

// --- Build a minimal scene: artboard + shape + ellipse + fill + solidcolor ---
function parseColor(c) {
  let s = c.replace(/^#/, '');
  if (s.length === 3) s = s.split('').map(ch => ch + ch).join('');
  if (s.length === 6) s = 'ff' + s;
  return Number.parseInt(s, 16) >>> 0;
}

// Build the scene
const objects = [];

// 1. Backboard (no props needed for runtime)
objects.push({ type: T.Backboard, props: {} });

// 2. Artboard
objects.push({
  type: T.Artboard,
  props: {
    [P.name]: 'Test',
    [P.width]: 200,
    [P.height]: 200,
  },
});

// Artboard is at file index 1, so artboard-local index 0 = artboard itself
// Each subsequent object gets artboard-local index = fileIndex - 1

// 3. Shape (artboard-local index 1, parentId = 0 = artboard)
objects.push({
  type: T.Shape,
  props: {
    [P.name]: 'Circle',
    [P.parentId]: 0,  // artboard
    [P.x]: 100,
    [P.y]: 100,
  },
});

// 4. Fill (artboard-local index 2, parentId = 1 = Shape)
objects.push({
  type: T.Fill,
  props: {
    [P.parentId]: 1,  // Shape
  },
});

// 5. SolidColor (artboard-local index 3, parentId = 2 = Fill)
objects.push({
  type: T.SolidColor,
  props: {
    [P.parentId]: 2,  // Fill
    [P.colorValue]: parseColor('#FF0000'),
  },
});

// 6. Ellipse (artboard-local index 4, parentId = 1 = Shape)
objects.push({
  type: T.Ellipse,
  props: {
    [P.parentId]: 1,  // Shape
    [P.pathWidth]: 80,
    [P.pathHeight]: 80,
  },
});

const data = writeRiv(objects);
writeFileSync('public/rive/test-handwritten.riv', data);
console.log('Generated test-handwritten.riv:', data.length, 'bytes');

// Hex dump
const hex = Array.from(data.slice(0, 80)).map(b => b.toString(16).padStart(2, '0')).join(' ');
console.log('First 80 bytes:', hex);
