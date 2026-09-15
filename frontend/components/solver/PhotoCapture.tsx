'use client';

// ─── External Libraries (CDN) ───────────────────────────────────────────────
// easy-crop: loaded via <script> in HeadNext (crop.area-sdk.workers.dev CDN)
// KaTeX:     loaded via npm - 'katex' package
// MathLive:  loaded via npm - 'mathlive' package

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// ─── Module Declarations ────────────────────────────────────────────────────
// tesseract.js is loaded dynamically at runtime and may not be installed as a
// dependency; the dynamic import below uses @ts-expect-error to allow it to
// resolve to `any` without requiring the package at type-check time.

// MathLive's <math-field> custom element is not part of React's JSX types.
// Declare it so JSX recognizes the tag.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'virtual-keyboard-mode'?: string;
          'smart-fence'?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SolverResponse {
  steps: Array<{
    step_number: number;
    title: string;
    explanation: string;
    math_latex: string;
  }>;
  final_answer: string;
  latex_final: string;
  difficulty: string;
  estimated_time: string;
  hints_available: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PhotoCapture() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cropData, setCropData] = useState<CropArea | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState<'capture' | 'crop' | 'preview' | 'editing'>('capture');
  const [extractedLatex, setExtractedLatex] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [ocrStatus, setOcrStatus] = useState('');
  const [solution, setSolution] = useState<SolverResponse | null>(null);
  const [error, setError] = useState('');
  const [showRawImage, setShowRawImage] = useState(false);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);
  const mathLiveRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ── API helpers ────────────────────────────────────────────────────────────
  const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  };

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001') + '/api';

  const api = axios.create({ baseURL: apiBase });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // ── File handler ───────────────────────────────────────────────────────────
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Sirf JPG, PNG ya WebP format ki photo choose karein');
      return;
    }

    // Validate size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setError('Photo 20MB se chhoti honi chahiye');
      return;
    }

    setImageFile(file);
    setError('');
    setSolution(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      setCropData(null);
      setZoomLevel(1);
      setRotation(0);
      setDragOffset({ x: 0, y: 0 });
      setStage('crop');
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  // ── Crop handlers ──────────────────────────────────────────────────────────
  const handleCropAreaStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    setDragStart({ x: clientX - dragOffset.x, y: clientY - dragOffset.y });
  };

  const handleCropAreaMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleCropAreaEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel((z) => Math.min(3, Math.max(0.5, z + delta)));
  };

  const rotateImage = (deg: number) => {
    setRotation((r) => (r + deg) % 360);
  };

  const resetCrop = () => {
    setZoomLevel(1);
    setRotation(0);
    setDragOffset({ x: 0, y: 0 });
  };

  const confirmCrop = () => {
    if (!capturedImage || !cropContainerRef.current) return;

    const container = cropContainerRef.current;
    const rect = container.getBoundingClientRect();

    // Crop frame is centered, 85% of container
    const frameW = rect.width * 0.85;
    const frameH = rect.height * 0.7;
    const frameX = (rect.width - frameW) / 2;
    const frameY = (rect.height - frameH) / 2;

    // Map to image coordinates accounting for zoom, rotation, drag
    const img = new Image();
    img.onload = () => {
      const imgDisplayW = img.naturalWidth * zoomLevel;
      const imgDisplayH = img.naturalHeight * zoomLevel;

      const offsetX = (rect.width - imgDisplayW) / 2 + dragOffset.x;
      const offsetY = (rect.height - imgDisplayH) / 2 + dragOffset.y;

      // Convert frame coords to image coords
      const scaleX = img.naturalWidth / imgDisplayW;
      const scaleY = img.naturalHeight / imgDisplayH;

      let srcX = (frameX - offsetX) * scaleX;
      let srcY = (frameY - offsetY) * scaleY;
      let srcW = frameW * scaleX;
      let srcH = frameH * scaleY;

      // Clamp
      srcX = Math.max(0, Math.min(srcX, img.naturalWidth));
      srcY = Math.max(0, Math.min(srcY, img.naturalHeight));
      srcW = Math.min(srcW, img.naturalWidth - srcX);
      srcH = Math.min(srcH, img.naturalHeight - srcY);

      // Rotate context and draw
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = srcW;
      canvas.height = srcH;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(
        img,
        srcX,
        srcY,
        srcW,
        srcH,
        -srcW / 2,
        -srcH / 2,
        srcW,
        srcH
      );

      const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(croppedDataUrl);

      // Update file
      canvas.toBlob((blob) => {
        if (blob) {
          const f = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
          setImageFile(f);
        }
      }, 'image/jpeg', 0.9);

      setStage('preview');
    };
    img.src = capturedImage;
  };

  // ── OCR / Math Extraction ──────────────────────────────────────────────────
  const handleExtractMath = async () => {
    if (!imageFile) return;

    setError('');
    setSolution(null);
    setExtractedLatex('');
    setStage('preview');

    try {
      // Phase 1: Preprocess
      setOcrStatus('Image process ho rahi hai...');
      const processedBlob = await preprocessImage(imageFile);

      // Phase 2: Try backend first
      setOcrStatus('Math extract ho raha hai...');
      try {
        const formData = new FormData();
        formData.append('image', processedBlob, 'photo.jpg');

        const response = await api.post('/solver/photo', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000,
          onUploadProgress: (p) => {
            if (p.total) {
              setOcrStatus(`Upload ho raha hai... ${Math.round((p.loaded / p.total) * 100)}%`);
            }
          },
        });

        const data = response.data;
        setExtractedLatex(data.latex || data.latex_expression || '');
        setConfidence(data.confidence ?? data.confidence_score ?? 0.85);
        setOcrStatus('');
        setStage('preview');
        return;
      } catch (backendErr) {
        // Phase 3: Client-side fallback with Tesseract
        console.warn('Backend OCR failed, trying client-side:', backendErr);
        setOcrStatus('Offline mode - Tesseract use kar rahe hain...');

        await extractMathClientSide(processedBlob);
      }
    } catch (err) {
      console.error('Extraction failed:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Math extract nahi ho paya. Photo clear rakhkar phir se try karein.'
      );
      setOcrStatus('');
    }
  };

  // ── Client-side OCR fallback ───────────────────────────────────────────────
  const extractMathClientSide = async (blob: Blob): Promise<void> => {
    // Dynamic import for Tesseract.js
    // @ts-expect-error - tesseract.js is loaded dynamically at runtime
    const Tesseract = await import('tesseract.js');

    const result = await Tesseract.recognize(blob, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setOcrStatus(`OCR: ${Math.round((m.progress || 0) * 100)}%`);
        } else {
          setOcrStatus(`OCR: ${m.status}...`);
        }
      },
    });

    let raw = result.data.text.trim();
    const conf = result.data.confidence;

    // Basic LaTeX conversion heuristics
    raw = raw
      // Fractions: a/b -> \frac{a}{b}
      .replace(/(\d+)\s*\/\s*(\d+)/g, '\\frac{$1}{$2}')
      // Powers: x^2 -> x^{2}
      .replace(/\^(\d+)/g, '^{$1}')
      // Greek letters
      .replace(/\bsin\b/gi, '\\sin')
      .replace(/\bcos\b/gi, '\\cos')
      .replace(/\btan\b/gi, '\\	an')
      .replace(/\blog\b/gi, '\\log')
      .replace(/\bln\b/gi, '\\ln')
      .replace(/\bpi\b/gi, '\\pi')
      .replace(/\balpha\b/gi, '\\alpha')
      .replace(/\bbeta\b/gi, '\\beta')
      .replace(/\btheta\b/gi, '\\	heta')
      .replace(/\bdelta\b/gi, '\\delta')
      .replace(/\bint\b/gi, '\\int')
      .replace(/\bsum\b/gi, '\\sum')
      .replace(/\blim\b/gi, '\\lim')
      // sqrt
      .replace(/sqrt\s*\(([^)]+)\)/gi, '\\sqrt{$1}')
      // dx, dy notation
      .replace(/\b(dx|dy|dz|dt)\b/gi, '\\mathrm{$1}')
      // Parentheses around functions
      .replace(/\(\s*([^)]+)\s*\)/g, '($1)')
      // Clean newlines
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Wrap in derivative notation if it looks like one
    if (/\b(d|d\\)\/d/.test(raw) || /derivative|differentiat/i.test(raw)) {
      raw = raw;
    }

    setExtractedLatex(raw || '\\text{Extraction unclear - please edit manually}');
    setConfidence(conf ? conf / 100 : 0.5);
    setOcrStatus('');
    setStage('preview');
  };

  // ── Image preprocessing ────────────────────────────────────────────────────
  const preprocessImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas not supported'));

        // Resize to reasonable dimension (max 1600px on longest side)
        const maxDim = 1600;
        let { naturalWidth: w, naturalHeight: h } = img;
        if (Math.max(w, h) > maxDim) {
          const ratio = maxDim / Math.max(w, h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }

        canvas.width = w;
        canvas.height = h;

        // Enhance: slight contrast boost
        ctx.filter = 'contrast(1.1) brightness(1.05)';
        ctx.drawImage(img, 0, 0, w, h);
        ctx.filter = 'none';

        // Convert to high-quality JPEG
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to process image'));
          },
          'image/jpeg',
          0.92
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  // ── Solve ──────────────────────────────────────────────────────────────────
  const handleSolve = async () => {
    const expr = stage === 'editing' ? mathLiveRef.current?.getValue?.() || extractedLatex : extractedLatex;
    if (!expr || expr.trim() === '') {
      setError('Pehle math problem enter karein ya extract karein');
      return;
    }

    setError('');
    setSolution(null);

    try {
      const response = await api.post('/solver/solve', {
        expression: expr.trim(),
        topic: 'calculus',
        class_level: 11,
      });

      setSolution(response.data);
      setStage('preview');
    } catch (err) {
      console.error('Solver error:', err);
      setError(
        err instanceof Error && 'response' in err
          ? (err as any).response?.data?.detail || 'Solution nahi mil paya. Phir se try karein.'
          : 'Solution nahi mil paya. Phir se try karein.'
      );
    }
  };

  // ── Edit extracted math ─────────────────────────────────────────────────────
  const handleEdit = () => {
    setStage('editing');
  };

  // ── MathLive initialization ─────────────────────────────────────────────────
  useEffect(() => {
    if (stage === 'editing' && mounted) {
      const timer = setTimeout(() => {
        const el = document.getElementById('mathlive-editor');
        if (el && typeof window !== 'undefined' && (window as any).MathfieldElement) {
          if (!mathLiveRef.current || !(mathLiveRef.current instanceof (window as any).MathfieldElement)) {
            const mf = new (window as any).MathfieldElement(el, {
              virtualKeyboardMode: 'manual',
              smartFence: true,
              virtualKeyboards: [
                'algebra',
                'calculus',
                'greek',
                'arithmetic',
              ],
              keybindings: [
                {
                  key: 'Enter',
                  command: ['virtual-keyboard-toggle'],
                },
              ],
            });
            mf.value = extractedLatex;
            mathLiveRef.current = mf;
          }
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [stage, mounted, extractedLatex]);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleRetake = () => {
    setCapturedImage(null);
    setImageFile(null);
    setCropData(null);
    setZoomLevel(1);
    setRotation(0);
    setDragOffset({ x: 0, y: 0 });
    setStage('capture');
    setExtractedLatex('');
    setConfidence(0);
    setOcrStatus('');
    setSolution(null);
    setError('');
    setShowRawImage(false);
    mathLiveRef.current = null;
  };

  // ── Render helpers ─────────────────────────────────────────────────────────
  const confidenceColor =
    confidence >= 0.8
      ? 'text-emerald-400'
      : confidence >= 0.5
        ? 'text-yellow-400'
        : 'text-red-400';

  const confidenceLabel =
    confidence >= 0.8
      ? 'High'
      : confidence >= 0.5
        ? 'Medium'
        : 'Low';

  // ── Stage: Capture ─────────────────────────────────────────────────────────
  const renderCapture = () => (
    <div className="flex flex-col items-center justify-center py-12 gap-6">
      <div className="relative">
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.54-.51 1.22-.29 1.88.24.65.77 1.17 1.45 1.4a9.84 9.84 0 013.46 2.45c.83.83 1.51 1.76 2.02 2.79.45.91.78 1.88.98 2.88.1.5.17 1.01.17 1.53 0 .52-.07 1.03-.17 1.53-.2 1-.55 1.97-1.02 2.88-.51 1.03-1.19 1.96-2.02 2.79a9.84 9.84 0 01-3.46 2.45c-.68.23-1.21.75-1.45 1.4-.22.66-.09 1.34.29 1.88.22.36.52.67.89.88L5.2 20.8a.75.75 0 00.95.95l2.52-.52a.75.75 0 01.88.22c.38.38.83.66 1.34.85a11.3 11.3 0 004.1.36c1.15-.09 2.26-.43 3.27-.99 1.11-.61 2.04-1.44 2.74-2.44a6.48 6.48 0 001.2-3.27c.05-.65.02-1.3-.09-1.94-.12-.67-.35-1.32-.67-1.92a6.48 6.48 0 00-2.74-2.44 7.8 7.8 0 00-3.27-.99 7.64 7.64 0 00-2.45.3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>

      <div className="text-center px-4">
        <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Photo se Math Solve karein
        </h3>
        <p className="text-sm text-white/50 max-w-xs mx-auto">
          Apne textbook ka photo kheench kar derivative, integral ya koi bhi math problem instantly solve karein
        </p>
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full max-w-xs py-4 px-6 rounded-2xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-base shadow-lg shadow-brand/30 active:scale-[0.97] transition-transform flex items-center justify-center gap-3"
        aria-label="Photo kheench kar math problem solve karein"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.54-.51 1.22-.29 1.88.24.65.77 1.17 1.45 1.4a9.84 9.84 0 013.46 2.45c.83.83 1.51 1.76 2.02 2.79.45.91.78 1.88.98 2.88.1.5.17 1.01.17 1.53 0 .52-.07 1.03-.17 1.53-.2 1-.55 1.97-1.02 2.88-.51 1.03-1.19 1.96-2.02 2.79a9.84 9.84 0 01-3.46 2.45c-.68.23-1.21.75-1.45 1.4-.22.66-.09 1.34.29 1.88.22.36.52.67.89.88L5.2 20.8a.75.75 0 00.95.95l2.52-.52a.75.75 0 01.88.22c.38.38.83.66 1.34.85a11.3 11.3 0 004.1.36c1.15-.09 2.26-.43 3.27-.99 1.11-.61 2.04-1.44 2.74-2.44a6.48 6.48 0 001.2-3.27c.05-.65.02-1.3-.09-1.94-.12-.67-.35-1.32-.67-1.92a6.48 6.48 0 00-2.74-2.44 7.8 7.8 0 00-3.27-.99 7.64 7.64 0 00-2.45.3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
        Photo kheenchein
      </button>

      <p className="text-xs text-white/30 text-center">
        Camera automatically open hoga
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Photo capture input"
      />
    </div>
  );

  // ── Stage: Crop ────────────────────────────────────────────────────────────
  const renderCrop = () => (
    <div className="flex flex-col h-full">
      {/* Crop Canvas */}
      <div
        ref={cropContainerRef}
        className="relative flex-1 bg-black/50 overflow-hidden cursor-move select-none min-h-[300px]"
        onMouseDown={handleCropAreaStart}
        onMouseMove={handleCropAreaMove}
        onMouseUp={handleCropAreaEnd}
        onMouseLeave={handleCropAreaEnd}
        onTouchStart={handleCropAreaStart}
        onTouchMove={handleCropAreaMove}
        onTouchEnd={handleCropAreaEnd}
        onWheel={handleWheel}
        role="application"
        aria-label="Image crop area. Pinch to zoom, drag to pan"
      >
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured problem"
            className="absolute max-w-none pointer-events-none"
            style={{
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: 'center center',
              maxWidth: 'none',
              left: '50%',
              top: '50%',
              marginLeft: 0,
              marginTop: 0,
            }}
            draggable={false}
          />
        )}

        {/* Crop Frame Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Darkened areas */}
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 0 9999px rgba(0,0,0,0.5)' }} />
          {/* Clear crop window */}
          <div
            className="absolute border-2 border-brand/80"
            style={{
              left: '7.5%',
              top: '15%',
              width: '85%',
              height: '70%',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.3), inset 0 0 20px rgba(99,102,241,0.1)',
            }}
          >
            {/* Corner markers */}
            {[
              { top: -1, left: -1, br: '0', tr: '8px', tl: '0', bl: '0' },
              { top: -1, right: -1, br: '8px', tr: '0', tl: '0', bl: '0' },
              { bottom: -1, left: -1, br: '0', tr: '0', tl: '0', bl: '8px' },
              { bottom: -1, right: -1, br: '0', tr: '0', tl: '8px', bl: '0' },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-4 h-4"
                style={{
                  ...pos,
                  borderTop: '2px solid rgba(99,102,241,0.9)',
                  borderRight: '2px solid rgba(99,102,241,0.9)',
                  borderBottom: '2px solid rgba(99,102,241,0.9)',
                  borderLeft: '2px solid rgba(99,102,241,0.9)',
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Hint text */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-xs text-white/40 bg-black/30 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
            Drag se move karein, pinch ya scroll se zoom
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-3">
        {/* Zoom Slider */}
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand"
            aria-label="Zoom level"
          />
          <span className="text-xs text-white/50 w-10 text-right font-mono">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => rotateImage(-90)}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium active:bg-white/10 transition-colors flex items-center justify-center gap-2"
            aria-label="90 degree left rotate karein"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Left
          </button>
          <button
            onClick={() => rotateImage(90)}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium active:bg-white/10 transition-colors flex items-center justify-center gap-2"
            aria-label="90 degree right rotate karein"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
            </svg>
            Right
          </button>
          <button
            onClick={resetCrop}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium active:bg-white/10 transition-colors flex items-center justify-center gap-2"
            aria-label="Crop settings reset karein"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348c4.87.451 5.037 2.989 5.037 2.989l-1.13 1.13c-.023.023-1.453.549-3.086 1.153-1.54.57-2.22.856-3.16 1.28a8.96 8.96 0 01-2.77.85c-1.04.06-1.68-.17-1.93-.36l-.27-.21-.24.37c-.36.56-.63 1.01-.88 1.38-.36.53-.84.86-1.43.98-.18.04-.4.05-.66.03-1.2-.08-2.32-.4-3.24-1.01-1.2-.8-1.91-1.93-2.08-3.35-.08-.65.04-1.38.37-2.18l.35-.86-.86-.35c-.8-.33-1.53-.45-2.18-.37-1.42.17-2.55.88-3.35 2.08-.61.92-.93 2.04-1.01 3.24-.02.26-.01.48.03.66.12.59.45 1.07.98 1.43.37.25.82.52 1.38.88l.37.24-.21.27c-.19.25-.42.89-.36 1.93.08 1.2.4 2.32 1.01 3.24.8 1.2 1.93 1.91 3.35 2.08.65.08 1.38-.04 2.18-.37l.86-.35-.35-.86c-.33-.8-.45-1.53-.37-2.18" />
            </svg>
            Reset
          </button>
        </div>

        <button
          onClick={confirmCrop}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-base shadow-lg shadow-brand/30 active:scale-[0.97] transition-transform"
          aria-label="Crop confirm karein aur next step pe jayen"
        >
          Next - Math Extract karein
        </button>
      </div>
    </div>
  );

  // ── Stage: Preview / Results ───────────────────────────────────────────────
  const renderPreview = () => (
    <div className="flex flex-col gap-4">
      {/* Image Preview */}
      <div className="relative rounded-2xl overflow-hidden bg-black/30 border border-white/5">
        <img
          src={capturedImage!}
          alt="Captured math problem"
          className="w-full max-h-[280px] object-contain"
        />
        {/* Toggle raw/cropped */}
        {showRawImage && imageFile && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Original photo"
              className="w-full max-h-[280px] object-contain"
            />
          </div>
        )}
        <button
          onClick={() => setShowRawImage(!showRawImage)}
          className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-black/50 text-xs text-white/70 backdrop-blur-sm active:bg-black/70 transition-colors"
          aria-label={showRawImage ? 'Cropped photo dekhein' : 'Original photo dekhein'}
        >
          {showRawImage ? 'Cropped' : 'Original'}
        </button>
      </div>

      {/* Action Row */}
      <div className="flex gap-2">
        <button
          onClick={handleExtractMath}
          disabled={!!ocrStatus}
          className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-sm shadow-lg shadow-brand/20 active:scale-[0.97] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          aria-label="Math expression extract karein"
        >
          {ocrStatus ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {ocrStatus}
            </>
          ) : (
            'Extract Math'
          )}
        </button>

        <button
          onClick={handleRetake}
          className="py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm active:bg-white/10 transition-colors"
          aria-label="Naya photo kheenchin"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348c4.87.451 5.037 2.989 5.037 2.989l-1.13 1.13c-.023.023-1.453.549-3.086 1.153-1.54.57-2.22.856-3.16 1.28a8.96 8.96 0 01-2.77.85c-1.04.06-1.68-.17-1.93-.36l-.27-.21-.24.37c-.36.56-.63 1.01-.88 1.38-.36.53-.84.86-1.43.98-.18.04-.4.05-.66.03-1.2-.08-2.32-.4-3.24-1.01-1.2-.8-1.91-1.93-2.08-3.35-.08-.65.04-1.38.37-2.18l.35-.86-.86-.35c-.8-.33-1.53-.45-2.18-.37-1.42.17-2.55.88-3.35 2.08-.61.92-.93 2.04-1.01 3.24-.02.26-.01.48.03.66.12.59.45 1.07.98 1.43.37.25.82.52 1.38.88l.37.24-.21.27c-.19.25-.42.89-.36 1.93.08 1.2.4 2.32 1.01 3.24.8 1.2 1.93 1.91 3.35 2.08.65.08 1.38-.04 2.18-.37l.86-.35-.35-.86c-.33-.8-.45-1.53-.37-2.18" />
          </svg>
        </button>
      </div>

      {/* Extracted LaTeX Result */}
      {extractedLatex && (
        <div
          className="glass-strong rounded-2xl p-5 border border-white/10"
          role="region"
          aria-live="polite"
          aria-label="Extracted math expression"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Extracted Expression
            </h4>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${confidenceColor}`} aria-label={`Confidence: ${confidenceLabel}`}>
                {Math.round(confidence * 100)}% {confidenceLabel}
              </span>
              <div
                className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={confidence * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Rendered LaTeX */}
          <div className="bg-black/30 rounded-xl p-4 mb-4 min-h-[60px] flex items-center justify-center">
            <LatexRenderer latex={extractedLatex} />
          </div>

          {/* Raw LaTeX text (collapsible) */}
          <details className="mb-4">
            <summary className="text-xs text-white/40 cursor-pointer hover:text-white/60 transition-colors">
              Raw LaTeX code dekhein
            </summary>
            <code className="block mt-2 p-3 bg-black/30 rounded-lg text-xs text-emerald-400/80 font-mono break-all leading-relaxed">
              {extractedLatex}
            </code>
          </details>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSolve}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-sm shadow-lg shadow-brand/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
              aria-label="Is expression ko solve karein"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Solve karein
            </button>
            <button
              onClick={handleEdit}
              className="py-3.5 px-5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm active:bg-white/10 transition-colors flex items-center justify-center gap-2"
              aria-label="Expression edit karein"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div
          className="glass rounded-2xl p-4 border border-red-500/20 flex items-start gap-3"
          role="alert"
        >
          <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-red-300 font-medium">Kuch gadbad ho gayi</p>
            <p className="text-xs text-red-300/70 mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError('')}
            className="text-white/40 hover:text-white/70 transition-colors"
            aria-label="Error message close karein"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  // ── Stage: Edit (MathLive Editor) ──────────────────────────────────────────
  const renderEdit = () => (
    <div className="flex flex-col gap-4">
      {/* Preview thumb */}
      <div className="rounded-xl overflow-hidden bg-black/30 border border-white/5">
        <img
          src={capturedImage!}
          alt="Captured problem"
          className="w-full max-h-[140px] object-contain opacity-70"
        />
      </div>

      {/* MathLive Editor */}
      <div className="glass-strong rounded-2xl p-5 border border-white/10">
        <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
          LaTeX Edit karein
        </h4>

        {/* MathField Element */}
        <div className="bg-black/30 rounded-xl p-4 mb-3 min-h-[80px] flex items-center justify-center">
          {mounted && typeof window !== 'undefined' && (window as any).MathfieldElement ? (
            <math-field
              id="mathlive-editor"
              ref={mathLiveRef as any}
              className="math-field-host w-full text-lg text-white"
              style={{
                '--mf-primary': '#6366f1',
                '--mf-font-family': 'var(--font-body)',
                '--text-color': '#ffffff',
              } as any}
              virtual-keyboard-mode="manual"
              smart-fence
              aria-label="Math expression editor. Use virtual keyboard for math input."
            >
              {extractedLatex}
            </math-field>
          ) : (
            <input
              type="text"
              value={extractedLatex}
              onChange={(e) => setExtractedLatex(e.target.value)}
              className="w-full bg-transparent text-center text-white font-mono text-lg outline-none"
              placeholder="LaTeX yahan type karein..."
              aria-label="LaTeX input field"
            />
          )}
        </div>

        <p className="text-xs text-white/40 text-center mb-4">
          Virtual keyboard se ya direct LaTeX type karein
        </p>

        {/* Quick Insert Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: 'frac', insert: '\\frac{a}{b}' },
            { label: 'sqrt', insert: '\\sqrt{x}' },
            { label: '^{}', insert: '^{}' },
            { label: 'sin', insert: '\\sin' },
            { label: 'cos', insert: '\\cos' },
            { label: 'int', insert: '\\int' },
            { label: 'dx', insert: '\\,dx' },
            { label: 'pi', insert: '\\pi' },
            { label: 'd/dx', insert: '\\frac{d}{dx}' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (mathLiveRef.current?.insert) {
                  mathLiveRef.current.insert(item.insert);
                } else {
                  setExtractedLatex((prev) => prev + item.insert);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 font-mono active:bg-white/10 transition-colors hover:text-white/80"
              aria-label={`Insert ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Edit Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setStage('preview')}
            className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm active:bg-white/10 transition-colors"
            aria-label="Cancel edit"
          >
            Cancel
          </button>
          <button
            onClick={handleSolve}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-sm shadow-lg shadow-brand/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
            aria-label="Edited expression solve karein"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Solve karein
          </button>
        </div>
      </div>
    </div>
  );

  // ── Stage: Solution ────────────────────────────────────────────────────────
  const renderSolution = () => {
    if (!solution) return null;

    return (
      <div className="flex flex-col gap-4">
        {/* Success header */}
        <div className="glass-strong rounded-2xl p-4 border border-emerald-500/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-300">Solution ready!</h4>
            <p className="text-xs text-white/40">
              {solution.steps.length} steps • {solution.estimated_time} • {solution.difficulty}
            </p>
          </div>
        </div>

        {/* Final Answer */}
        <div className="glass-strong rounded-2xl p-5 border border-brand/20">
          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            Final Answer
          </h4>
          <div className="bg-black/30 rounded-xl p-4 flex items-center justify-center min-h-[50px]">
            <LatexRenderer latex={solution.latex_final} displayMode />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {solution.steps.map((step, idx) => (
            <StepCard key={idx} step={step} index={idx} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleRetake}
            className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm active:bg-white/10 transition-colors"
          >
            Naya Problem
          </button>
          <button
            onClick={() => {
              setSolution(null);
              setExtractedLatex('');
              setStage('editing');
            }}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand to-accent text-white font-semibold text-sm active:scale-[0.97] transition-transform"
          >
            Dubara Solve karein
          </button>
        </div>
      </div>
    );
  };

  // ── Main Render ────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center shadow-lg shadow-brand/20">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.54-.51 1.22-.29 1.88.24.65.77 1.17 1.45 1.4a9.84 9.84 0 013.46 2.45c.83.83 1.51 1.76 2.02 2.79.45.91.78 1.88.98 2.88.1.5.17 1.01.17 1.53 0 .52-.07 1.03-.17 1.53-.2 1-.55 1.97-1.02 2.88-.51 1.03-1.19 1.96-2.02 2.79a9.84 9.84 0 01-3.46 2.45c-.68.23-1.21.75-1.45 1.4-.22.66-.09 1.34.29 1.88.22.36.52.67.89.88L5.2 20.8a.75.75 0 00.95.95l2.52-.52a.75.75 0 01.88.22c.38.38.83.66 1.34.85a11.3 11.3 0 004.1.36c1.15-.09 2.26-.43 3.27-.99 1.11-.61 2.04-1.44 2.74-2.44a6.48 6.48 0 001.2-3.27c.05-.65.02-1.3-.09-1.94-.12-.67-.35-1.32-.67-1.92a6.48 6.48 0 00-2.74-2.44 7.8 7.8 0 00-3.27-.99 7.64 7.64 0 00-2.45.3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Photo Solver
          </h2>
          <p className="text-xs text-white/40">ML Agarwal • Class 11</p>
        </div>
      </div>

      {/* Card */}
      <div className="glass-card rounded-3xl p-5 min-h-[500px]">
        {/* Progress indicator */}
        {stage !== 'capture' && (
          <div className="flex items-center gap-1 mb-4" role="tablist" aria-label="Progress">
            {[
              { id: 'crop', label: 'Crop' },
              { id: 'preview', label: 'Extract' },
              { id: 'editing', label: 'Edit' },
            ].map((s, i, arr) => {
              const currentIdx = ['crop', 'preview', 'editing'].indexOf(stage);
              const isActive = stage === s.id || (solution && s.id === 'preview');
              const isPast = arr.findIndex(x => x.id === stage) > i;
              return (
                <div key={s.id} className="flex-1 flex items-center" role="tab" aria-selected={isActive}>
                  <div
                    className={`h-1 rounded-full transition-all ${
                      isActive || isPast ? 'bg-brand' : 'bg-white/10'
                    }`}
                    style={{ width: isActive ? '100%' : isPast ? '100%' : '33%' }}
                  />
                  <span className={`text-[10px] ml-1.5 ${isActive ? 'text-brand' : 'text-white/30'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Stage content */}
        {stage === 'capture' && renderCapture()}
        {stage === 'crop' && renderCrop()}
        {stage === 'preview' && (solution ? renderSolution() : renderPreview())}
        {stage === 'editing' && renderEdit()}
      </div>

      {/* Offline indicator */}
      <OfflineIndicator />
    </div>
  );
}

// ─── LatexRenderer Sub-Component ──────────────────────────────────────────────

function LatexRenderer({ latex, displayMode = false }: { latex: string; displayMode?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !latex) return;

    import('katex').then((katex) => {
      if (!containerRef.current) return;
      try {
        katex.default.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          strict: false,
          trust: true,
        });
        setError(false);
      } catch {
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
        setError(true);
      }
    });
  }, [latex, displayMode]);

  if (error) {
    return (
      <span className="text-white/50 text-sm font-mono">
        {latex}
      </span>
    );
  }

  return <div ref={containerRef} className={displayMode ? 'text-2xl' : 'text-lg'} />;
}

// ─── StepCard Sub-Component ───────────────────────────────────────────────────

function StepCard({ step, index }: { step: any; index: number }) {
  const [showMath, setShowMath] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glass rounded-2xl p-4 border border-white/5 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      role="listitem"
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold text-brand">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-semibold text-white/90 mb-1">{step.title}</h5>
          <p className="text-xs text-white/50 leading-relaxed mb-3">{step.explanation}</p>

          {step.math_latex && (
            <div>
              <button
                onClick={() => setShowMath(!showMath)}
                className="text-xs text-brand/70 hover:text-brand transition-colors flex items-center gap-1 mb-2"
                aria-expanded={showMath}
                aria-label={`Step ${index + 1} math expression toggle karein`}
              >
                <svg className={`w-3 h-3 transition-transform ${showMath ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                Math expression
              </button>
              {showMath && (
                <div className="bg-black/30 rounded-xl p-3 flex items-center justify-center">
                  <LatexRenderer latex={step.math_latex} displayMode />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── OfflineIndicator Sub-Component ──────────────────────────────────────────

function OfflineIndicator() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (online) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto glass rounded-xl p-3 border border-yellow-500/20 flex items-center gap-2 z-50" role="status" aria-live="polite">
      <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <span className="text-xs text-yellow-300">Offline hai - Tesseract.js use ho raha hai</span>
    </div>
  );
}
