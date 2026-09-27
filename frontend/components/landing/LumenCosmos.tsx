'use client';

/**
 * LumenCosmos — the Lumen particle cosmos as the landing page's background.
 *
 * Client-only by necessity (WebGL + GPUComputationRenderer); the heavy lumen
 * modules are dynamically imported inside the effect so the landing's static
 * HTML paints instantly and the engine never enters the server bundle.
 *
 * Layers, bottom to top:
 *   1. `lumen-cosmos-gl`      — the animated GPGPU starfield (pointer-active:
 *                               mouse bends the starlight, hold gathers,
 *                               release bursts; touch drags do the same)
 *   2. `lumen-cosmos-static`  — one-shot painted starfield used ONLY for
 *                               prefers-reduced-motion (or a GPU that cannot
 *                               run float compute) — never animated
 *   3. scrim                  — fixed contrast gradients so copy stays
 *                               readable over the bright disk
 *
 * The whole wrapper is aria-hidden and pointer-events-none: the pointer is
 * tracked on window by the scene, content above stays fully interactive.
 */
import { useEffect, useRef } from 'react';

export default function LumenCosmos() {
  const glRef = useRef<HTMLCanvasElement | null>(null);
  const staticRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const glCanvas = glRef.current;
    const staticCanvas = staticRef.current;
    if (!glCanvas || !staticCanvas) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // static sky, painted once (repainted on resize) — no loop, no WebGL
      let unbind = () => {};
      import('./lumenCosmosScene')
        .then((mod) => {
          if (disposed) return;
          mod.drawStaticStarfield(staticCanvas);
          staticCanvas.style.opacity = '1';
          const onResize = () => mod.drawStaticStarfield(staticCanvas);
          window.addEventListener('resize', onResize);
          unbind = () => window.removeEventListener('resize', onResize);
        })
        .catch(() => {});
      return () => {
        disposed = true;
        unbind();
      };
    }

    import('./lumenCosmosScene')
      .then((mod) => {
        if (disposed) return;
        const scene = mod.initCosmos({
          canvas: glCanvas,
          onReady: () => {
            // fade the live sky in over the static paint once the first
            // frame is actually on screen
            glCanvas.style.opacity = '1';
          },
        });
        cleanup = scene.cleanup;
      })
      .catch(() => {
        // no float textures / no WebGL2: fall back to the static sky
        import('./lumenCosmosScene')
          .then((m) => {
            if (disposed) return;
            m.drawStaticStarfield(staticCanvas);
            staticCanvas.style.opacity = '1';
          })
          .catch(() => {});
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={glRef}
        className="h-full w-full transition-opacity duration-700"
        style={{ opacity: 0 }}
      />
      <canvas
        ref={staticRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0 }}
      />
      {/* contrast scrims: nav band, hero pool, footer fade — the cosmos stays
          vivid at the edges while copy keeps its contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(10,10,15,0.78) 0%, rgba(10,10,15,0.25) 9%, transparent 16%)',
            'radial-gradient(125% 82% at 50% 34%, rgba(10,10,15,0.62) 0%, rgba(10,10,15,0.38) 48%, rgba(10,10,15,0.1) 76%, transparent 100%)',
            'linear-gradient(to top, rgba(10,10,15,0.82) 0%, rgba(10,10,15,0.3) 10%, transparent 20%)',
          ].join(', '),
        }}
      />
    </div>
  );
}
