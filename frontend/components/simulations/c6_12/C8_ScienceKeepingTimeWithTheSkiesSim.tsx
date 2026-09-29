'use client';
/**
 * C8_ScienceKeepingTimeWithTheSkiesSim (Class 8 Science)
 *
 * ELI5: Nature gave us clocks: Earth's spin gives day and night, its tilted
 * yearly trip around the Sun gives seasons, and the Moon's orbit around Earth
 * gives the month of phases. Slide through the year and the lunar month to
 * see how time-keeping came from the skies.
 */
import React, { useMemo, useState } from 'react';

function declination(day: number): number {
  return 23.5 * Math.sin(((2 * Math.PI) * (day - 81)) / 365);
}

function daylightHours(day: number, lat: number): number {
  const dec = (declination(day) * Math.PI) / 180;
  const la = (lat * Math.PI) / 180;
  const cosH = -Math.tan(la) * Math.tan(dec);
  const H = Math.acos(Math.max(-1, Math.min(1, cosH)));
  return (2 * H * 180) / Math.PI / 15;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function dateLabel(day: number): string {
  let d = day;
  for (let m = 0; m < 12; m++) {
    if (d <= DAY_IN_MONTH[m]) return `${d} ${MONTHS[m]}`;
    d -= DAY_IN_MONTH[m];
  }
  return '31 Dec';
}

function moonPhaseName(day: number): string {
  const names = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];
  return names[Math.floor(((day - 1) / 29.5) * 8) % 8];
}

export function C8_ScienceKeepingTimeWithTheSkiesSim() {
  const [day, setDay] = useState(81);
  const [lat, setLat] = useState(20);
  const [moonDay, setMoonDay] = useState(15);
  const [view, setView] = useState<'orbit' | 'moon'>('orbit');

  const dec = Math.round(declination(day) * 10) / 10;
  const daylight = Math.round(daylightHours(day, lat) * 10) / 10;
  const season =
    dec > 15 ? 'peak summer (Sun overhead near Tropic of Cancer)' :
    dec > 5 ? 'summer side' :
    dec < -15 ? 'peak winter' :
    dec < -5 ? 'winter side' :
    'near an equinox (equal day and night)';

  const earthAngle = ((day - 1) / 365) * 360 - 90;
  const ex = 170 + 105 * Math.cos((earthAngle * Math.PI) / 180);
  const ey = 110 + 105 * Math.sin((earthAngle * Math.PI) / 180);

  // moon: fraction illuminated seen from earth
  const phase = (moonDay / 29.5) * 2 * Math.PI;
  const illum = Math.round(((1 - Math.cos(phase)) / 2) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Keeping Time with the Skies</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Three sky clocks:</span> (1) SPIN - Earth
          turns once in 24 h, giving day and night. (2) ORBIT - the tilted axis leans Earth 23.5
          degrees toward or away from the Sun through the year: seasons. (3) MOON - one loop of the
          Moon around us, about 29.5 days, gives the phases our calendars called a month.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['orbit', 'Earth orbit and seasons'], ['moon', 'Moon phase clock']] as ['orbit' | 'moon', string][]).map(([v, label]) => (
          <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === v ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {view === 'orbit' ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Day of year ({dateLabel(day)})</span><span className="font-mono text-gold-600">{day}</span></label>
              <input type="range" min={1} max={365} value={day} aria-label="day of year" onChange={(e) => setDay(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Your latitude (north)</span><span className="font-mono text-emerald-600">{lat} deg</span></label>
              <input type="range" min={-66} max={66} value={lat} aria-label="latitude" onChange={(e) => setLat(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[['Equinox', 81], ['Solstice', 172], ['Another equinox', 264], ['Midwinter', 355]].map(([label, d]) => (
                <button key={label as string} onClick={() => setDay(d as number)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold-100 text-gold-700 hover:bg-gold-200 transition-all">
                  {label as string}
                </button>
              ))}
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
              <div>Sun&apos;s noon angle over equator: <span className="text-gold-700 font-bold">{dec} deg</span></div>
              <div>daylight at {lat} deg: <span className="text-emerald-700 font-bold">{daylight} h</span></div>
              <div className="text-xs text-slate-500 mt-1 font-sans">{season}</div>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-br from-gold-50 to-slate-900 rounded-2xl border border-slate-200">
            <svg viewBox="0 0 340 220" className="w-full">
              <circle cx={170} cy={110} r={26} fill="#fbbf24" />
              <text x={170} y={150} textAnchor="middle" fontSize="10" fill="#fde68a">Sun</text>
              <ellipse cx={170} cy={110} rx={105} ry={105} fill="none" stroke="#475569" strokeDasharray="4 4" />
              <circle cx={ex} cy={ey} r={12} fill="#3b82f6" />
              {/* tilt line */}
              <line x1={ex} y1={ey - 18} x2={ex + 6} y2={ey + 16} stroke="#93c5fd" strokeWidth={1.5} />
              <text x={ex + 12} y={ey + 4} fontSize="9" fill="#93c5fd">23.5 deg tilt</text>
              <text x={170} y={208} textAnchor="middle" fontSize="10" fill="#cbd5e1">
                Earth at {dateLabel(day)} - lean the slider and watch daylight change
              </text>
            </svg>
            <div className="px-2 pb-1">
              <div className="h-4 rounded-full bg-slate-700 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-400 to-amber-300" style={{ width: `${(daylight / 24) * 100}%`, transition: 'width 250ms' }} />
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">{daylight} h daylight / 24 h at {lat} deg</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Moon day of the month (29.5 day loop)</span><span className="font-mono text-gold-600">{moonDay}</span></label>
              <input type="range" min={1} max={29} value={moonDay} aria-label="moon day" onChange={(e) => setMoonDay(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[['New moon', 1], ['First quarter', 8], ['Full moon', 15], ['Last quarter', 22]].map(([label, d]) => (
                <button key={label as string} onClick={() => setMoonDay(d as number)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold-100 text-gold-700 hover:bg-gold-200 transition-all">
                  {label as string}
                </button>
              ))}
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-sm font-mono">
              <div>phase: <span className="text-gold-700 font-bold">{moonPhaseName(moonDay)}</span></div>
              <div>lit fraction seen from Earth: <span className="text-gold-700 font-bold">{illum}%</span></div>
              <div className="text-xs text-slate-500 mt-1 font-sans">one full cycle = 29.5 days = one month on many Indian calendars (Amavasya to Purnima and back)</div>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl border border-slate-200">
            <svg viewBox="0 0 300 220" className="w-full">
              {(() => {
                const k = Math.cos(phase); // 1 = new, -1 = full
                const waxing = Math.sin(phase) >= 0;
                const half = waxing
                  ? 'M150,40 A55,55 0 0 1 150,150 Z'
                  : 'M150,40 A55,55 0 0 0 150,150 Z';
                return (
                  <>
                    <circle cx={150} cy={95} r={55} fill="#1e293b" stroke="#475569" />
                    <path d={half} fill="#e2e8f0" style={{ transition: 'all 200ms' }} />
                    <ellipse cx={150} cy={95} rx={55 * Math.abs(k)} ry={55} fill={k > 0 ? '#1e293b' : '#e2e8f0'} style={{ transition: 'all 200ms' }} />
                  </>
                );
              })()}
              <text x={150} y={185} textAnchor="middle" fontSize="11" fill="#e2e8f0">{moonPhaseName(moonDay)} - {illum}% lit</text>
              <text x={150} y={205} textAnchor="middle" fontSize="9" fill="#94a3b8">the terminator (edge of shadow) sweeps across the disc through the month</text>
            </svg>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the day when daylight at Chennai (13 deg N) is almost exactly 12 h. Now set latitude to 60 deg N - what happens to the same day?</li>
          <li>Jump from New moon day 1: after how many days does the next full moon arrive? Why is the cycle about 29.5 and not 28 days?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceKeepingTimeWithTheSkiesSim;
