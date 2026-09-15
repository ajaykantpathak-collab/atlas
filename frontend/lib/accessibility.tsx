/** Accessibility context — font size, contrast, dyslexic font, colorblind mode. */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  dyslexicFont: boolean;
  colorblindSafe: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  dyslexicFont: false,
  colorblindSafe: false,
};

const AccessibilityContext = createContext<{
  settings: AccessibilitySettings;
  update: (partial: Partial<AccessibilitySettings>) => void;
}>({
  settings: defaultSettings,
  update: () => {},
});

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("a11y-settings");
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {}
    }
  }, []);

  // Apply settings to document
  useEffect(() => {
    document.documentElement.style.setProperty("--font-size-base", `${settings.fontSize}px`);
    document.body.classList.toggle("high-contrast", settings.highContrast);
    document.body.classList.toggle("font-dyslexic", settings.dyslexicFont);
    document.body.classList.toggle("colorblind-safe", settings.colorblindSafe);
    localStorage.setItem("a11y-settings", JSON.stringify(settings));
  }, [settings]);

  const update = (partial: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, update }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
