/** Device capability detection for 3D vs 2D fallback. */
"use client";

import { useState, useEffect } from "react";

export interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsWebGL: boolean;
  prefersReducedMotion: boolean;
  isOnline: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    supportsWebGL: false,
    prefersReducedMotion: false,
    isOnline: true,
  });

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

    // Check WebGL support
    let supportsWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      supportsWebGL = !!gl;
    } catch {
      supportsWebGL = false;
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Rough low-end check: hardware concurrency
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    setCaps({
      isMobile,
      isLowEnd,
      supportsWebGL,
      prefersReducedMotion,
      isOnline: navigator.onLine,
    });
  }, []);

  return caps;
}
