/**
 * C6 Science -- Exploring Magnets (Curiosity)
 *
 * One chapter concept: a bar magnet has two poles (N and S); its
 * magnetic field is strongest at the poles, and a compass needle
 * always lines up along the field direction -- pointing AWAY from N
 * and TOWARD S.
 *
 * Interaction model: drag the compass anywhere around the bar magnet
 * and the needle really aligns to the computed dipole field (two
 * magnetic "poles" add their pull). Toggle field lines and iron
 * filings, and flip the magnet's poles.
 */
import React, { useState, useRef, useMemo } from 'react';

const W = 800;
const H = 500;
const MAG = { x: W / 2, y: H / 2, w: 220, h: 60 };

// field vector at a point from two poles: N pushes away, S pulls in
function fieldAt(x: number, y: number, flipped: boolean): { bx: number; by: number } {
  const nSign = flipped ? -1 : 1;
  const nx = MAG.x + MAG.w / 2 - 12;
  const sx = MAG.x - MAG.w / 2 + 12;
  const ny = MAG.y;
  let bx = 0;
  let by = 0;
  let dx = x - nx;
  let dy = y - ny;
  let d3 = Math.pow(dx * dx + dy * dy, 1.5) + 400;
  bx += (nSign * dx) / d3;
  by += (nSign * dy) / d3;
  dx = sx - x;
  dy = ny - y;
  d3 = Math.pow(dx * dx + dy * dy, 1.5) + 400;
  bx += (nSign * dx) / d3;
  by += (nSign * dy) / d3;
  return { bx, by };
}

function fieldLines(flipped: boolean): string[] {
  const paths: string[] = [];
  for (let k = 0; k < 9; k++) {
    const nx = MAG.x + (MAG.w / 2 - 12) * (flipped ? -1 : 1);
    const ny = MAG.y;
    let x = nx;
    let y = ny + (k - 4) * 7;
    let d = 'M ' + x.toFixed(1) + ' ' + y.toFixed(1);
    for (let s = 0; s < 220; s++) {
      const f = fieldAt(x, y, flipped);
      const m = Math.hypot(f.bx, f.by);
      if (m < 1e-9) break;
      x += (f.bx / m) * 7;
      y += (f.by / m) * 7;
      if (x < -50 || x > W + 50 || y < -50 || y > H + 50) break;
      d += ' L ' + x.toFixed(1) + ' ' + y.toFixed(1);
      const sx = MAG.x - (MAG.w / 2 - 12) * (flipped ? -1 : 1);
      if (Math.hypot(x - sx, y - ny) < 10) break;
    }
    paths.push(d);
  }
  return paths;
}

function C6_ScienceExploringMagnetsSim() {
  const [pos, setPos] = useState({ x: W / 2 + 190, y: H / 2 + 90 });
  const [flipped, setFlipped] = useState(false);
  const [showLines, setShowLines] = useState(true);
  const [showFilings, setShowFilings] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragging = useRef(false);

  const lines = useMemo(() => fieldLines(flipped), [flipped]);
  const filings = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 420; i++) {
      pts.push({ x: 20 + rnd() * (W - 40), y: 20 + rnd() * (H - 40) });
    }
    return pts;
  }, []);

  const toSvg = (e: React.PointerEvent): { x: number; y: number } => {
    const svg = svgRef.current;
    if (!svg) return pos;
    const r = svg.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  const f = fieldAt(pos.x, pos.y, flipped);
  const needleDeg = (Math.atan2(f.by, f.bx) * 180) / Math.PI;
  const strength = Math.min(1, Math.hypot(f.bx, f.by) * 26000);
  const northLabel = flipped ? 'S' : 'N';
  const southLabel = flipped ? 'N' : 'S';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-gold-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-gold-700">Exploring Magnets -- compass detective</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Every magnet has two poles: <b>north (N)</b> and <b>south (S)</b>. The space around it is filled with an
        invisible <b>magnetic field</b> -- strongest at the poles. A compass needle is a tiny magnet: its dark
        north tip always turns to point ALONG the field. Drag the compass and follow the field lines!
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <button onClick={() => setFlipped(!flipped)} className="px-4 py-1.5 rounded-full text-xs font-black bg-gold-600 text-white hover:bg-gold-700 transition-colors">
          Flip the magnet ({northLabel} is left)
        </button>
        {[
          { on: showLines, set: setShowLines, label: 'Field lines' },
          { on: showFilings, set: setShowFilings, label: 'Iron filings' },
        ].map((t) => (
          <button key={t.label} onClick={() => t.set(!t.on)} className={'px-4 py-1.5 rounded-full text-xs font-black transition-colors ' + (t.on ? 'bg-amber-300 text-amber-900' : 'bg-slate-200 text-slate-500 hover:bg-slate-300')}>
            {t.on ? '[ON] ' : '[OFF] '}
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_220px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-gold-100 bg-gold-50/30 overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={'0 0 ' + W + ' ' + H}
            className="w-full cursor-crosshair touch-none select-none"
            onPointerDown={(e) => { dragging.current = true; setPos(toSvg(e)); }}
            onPointerMove={(e) => { if (dragging.current) setPos(toSvg(e)); }}
            onPointerUp={() => { dragging.current = false; }}
            onPointerLeave={() => { dragging.current = false; }}
          >
            <rect width={W} height={H} fill="#faf5ff" />
            {showFilings && filings.map((p, i) => {
              const fp = fieldAt(p.x, p.y, flipped);
              const deg = (Math.atan2(fp.by, fp.bx) * 180) / Math.PI;
              return <line key={i} x1={p.x - 7} y1={p.y} x2={p.x + 7} y2={p.y} stroke="#a78bfa" strokeWidth="1.6" opacity="0.7" transform={'rotate(' + deg + ' ' + p.x + ' ' + p.y + ')'} />;
            })}
            {showLines && lines.map((d, i) => <path key={i} d={d} fill="none" stroke="#c4b5fd" strokeWidth="1.5" opacity="0.8" />)}
            {/* bar magnet */}
            <g>
              <rect x={MAG.x - MAG.w / 2} y={MAG.y - MAG.h / 2} width={MAG.w / 2} height={MAG.h} rx="6" fill="#ef4444" />
              <rect x={MAG.x} y={MAG.y - MAG.h / 2} width={MAG.w / 2} height={MAG.h} rx="6" fill="#3b82f6" />
              <text x={MAG.x - MAG.w / 4} y={MAG.y + 6} textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff">{northLabel}</text>
              <text x={MAG.x + MAG.w / 4} y={MAG.y + 6} textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff">{southLabel}</text>
            </g>
            {/* draggable compass */}
            <g style={{ transform: 'translate(' + pos.x + 'px,' + pos.y + 'px)' }}>
              <circle r="34" fill="#ffffff" stroke="#52525b" strokeWidth="3" className="cursor-grab" />
              <g style={{ transform: 'rotate(' + needleDeg + 'deg)', transition: 'transform 0.12s ease-out', transformOrigin: '0px 0px' }}>
                <polygon points="0,-27 7,0 0,4 -7,0" fill="#1e293b" />
                <polygon points="0,27 7,0 0,4 -7,0" fill="#ef4444" opacity="0.9" />
              </g>
              <circle r="3.5" fill="#52525b" />
              <text x="0" y="-42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#52525b">drag me!</text>
            </g>
          </svg>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-gold-600 text-white text-center">
            <div className="text-xs uppercase tracking-widest opacity-80">Compass needle points</div>
            <div className="text-3xl font-black">{Math.round((needleDeg + 360) % 360)}&deg;</div>
            <div className="text-[11px] opacity-90">(0&deg; = right, 90&deg; = down)</div>
          </div>
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Field strength here</span>
              <span className="text-gold-700 font-black">{(strength * 100).toFixed(0)}%</span>
            </label>
            <div className="h-3 rounded-full bg-gold-100 mt-1 overflow-hidden">
              <div className="h-full rounded-full bg-gold-500 transition-all duration-150" style={{ width: strength * 100 + '%' }} />
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
            Move the compass close to a pole -- the needle snaps into line and the strength bar shoots up. Far away, the field gets weak.
          </div>
          <div className="p-2 rounded-xl bg-gold-50 border-2 border-gold-200 text-[11px] text-gold-800 font-semibold">
            At the MIDDLE of the magnet the field runs parallel to the bar. Find that spot!
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Drag the compass in a big circle around the magnet. Where does the needle point straight back at the magnet? Which pole is it pointing to?</li>
          <li>Flip the magnet and repeat. What changed and what stayed the same? (Write N-tips-AWAY in your observation.)</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceExploringMagnetsSim };
export default C6_ScienceExploringMagnetsSim;
