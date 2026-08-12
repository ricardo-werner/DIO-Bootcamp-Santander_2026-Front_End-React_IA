import { type ReactNode, useEffect, useState } from "react";

import { useTheme } from "@/hooks/useTheme";

import { AccessibilityContext } from "../Accessibility/Hooks/context";

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const toggleDarkMode = toggleTheme;

  const normalizeColorPalette = (value: string | null) => {
    if (value === "foco-calmo") return "calmo";
    if (value === "alta-distincao") return "alta-definicao";
    if (
      value === "calmo" ||
      value === "universal" ||
      value === "alta-definicao"
    ) {
      return value;
    }

    return "universal";
  };

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
  const [colorBlindness, setColorBlindness] = useState<string>(
    () => localStorage.getItem("acc_color_blindness") || "none",
  );

  const [colorPalette, setColorPalette] = useState<string>(() =>
    normalizeColorPalette(localStorage.getItem("acc_color_palette")),
  );

  useEffect(() => {
    localStorage.setItem("acc_font_size", fontSize.toString());
    localStorage.setItem("acc_line_height", lineHeight.toString());
    localStorage.setItem("acc_letter_spacing", letterSpacing.toString());
    localStorage.setItem("acc_dyslexic_font", isDyslexicFont.toString());
    localStorage.setItem("acc_color_blindness", colorBlindness);
    localStorage.setItem("acc_color_palette", colorPalette);

    document.documentElement.setAttribute("data-palette", colorPalette);
  }, [
    fontSize,
    lineHeight,
    letterSpacing,
    isDyslexicFont,
    colorBlindness,
    colorPalette,
  ]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const resetSettings = () => {
    setFontSize(100);
    setLineHeight(1.6);
    setLetterSpacing(0.02);
    setIsDyslexicFont(false);
    setColorBlindness("none");
    setColorPalette("universal");
    if (theme === "dark") {
      toggleTheme();
    }
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
        className={`min-h-screen transition-all duration-200 ${getDaltonismoClass()} ${
          isDyslexicFont ? "font-lexend" : "font-sans"
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}
