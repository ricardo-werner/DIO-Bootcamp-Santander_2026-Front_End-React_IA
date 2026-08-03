/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface AccessibilityContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  lineHeight: number;
  setLineHeight: React.Dispatch<React.SetStateAction<number>>;
  letterSpacing: number;
  setLetterSpacing: React.Dispatch<React.SetStateAction<number>>;
  isDyslexicFont: boolean;
  setIsDyslexicFont: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
  colorBlindness: string;
  setColorBlindness: React.Dispatch<React.SetStateAction<string>>;
  colorPalette: string;
  setColorPalette: React.Dispatch<React.SetStateAction<string>>;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fontSize, setFontSize] = useState<number>(
    () => Number(localStorage.getItem("acc_font_size")) || 100,
  );
  const [lineHeight, setLineHeight] = useState<number>(
    () => Number(localStorage.getItem("acc_line_height")) || 1.6,
  );
  const [letterSpacing, setLetterSpacing] = useState<number>(
    () => Number(localStorage.getItem("acc_letter_spacing")) || 0.02,
  );
  const [isDyslexicFont, setIsDyslexicFont] = useState<boolean>(
    () => localStorage.getItem("acc_dyslexic_font") === "true",
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("acc_dark_mode") === "true",
  );
  const [colorBlindness, setColorBlindness] = useState<string>(
    () => localStorage.getItem("acc_color_blindness") || "none",
  );

  // NOVO: Armazena e inicializa a paleta de cores preferida
  const [colorPalette, setColorPalette] = useState<string>(
    () => localStorage.getItem("acc_color_palette") || "calmo",
  );

  useEffect(() => {
    localStorage.setItem("acc_font_size", fontSize.toString());
    localStorage.setItem("acc_line_height", lineHeight.toString());
    localStorage.setItem("acc_letter_spacing", letterSpacing.toString());
    localStorage.setItem("acc_dyslexic_font", isDyslexicFont.toString());
    localStorage.setItem("acc_dark_mode", darkMode.toString());
    localStorage.setItem("acc_color_blindness", colorBlindness);
    localStorage.setItem("acc_color_palette", colorPalette);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [
    fontSize,
    lineHeight,
    letterSpacing,
    isDyslexicFont,
    darkMode,
    colorBlindness,
    colorPalette,
  ]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const resetSettings = () => {
    setFontSize(100);
    setLineHeight(1.6);
    setLetterSpacing(0.02);
    setIsDyslexicFont(false);
    setColorBlindness("none");
    setColorPalette("calmo");
    setDarkMode(false);
  };

  const dynamicStyles = {
    fontSize: `${fontSize}%`,
    lineHeight: lineHeight,
    letterSpacing: `${letterSpacing}em`,
  };

  const getDaltonismoClass = () => {
    if (colorBlindness === "deuteranopia") return "daltonismo-deuteranopia";
    if (colorBlindness === "protanopia") return "daltonismo-protanopia";
    if (colorBlindness === "tritanopia") return "daltonismo-tritanopia";
    return "";
  };

  const getPaletteClass = () => {
    if (colorPalette === "universal") return "paleta-universal";
    if (colorPalette === "alta-definicao") return "paleta-alta-definicao";
    return "paleta-calmo";
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isModalOpen,
        toggleModal,
        fontSize,
        setFontSize,
        lineHeight,
        setLineHeight,
        letterSpacing,
        setLetterSpacing,
        isDyslexicFont,
        setIsDyslexicFont,
        darkMode,
        toggleDarkMode,
        colorBlindness,
        setColorBlindness,
        colorPalette,
        setColorPalette,
        resetSettings,
      }}
    >
      {/* A classe wrapper-container aplica o background-color e color baseados nas paletas */}
      <div
        style={dynamicStyles}
        className={`wrapper-container ${getPaletteClass()} ${getDaltonismoClass()} ${
          isDyslexicFont ? "font-lexend" : "font-sans"
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility deve ser usado dentro de um AccessibilityProvider",
    );
  }
  return context;
}
