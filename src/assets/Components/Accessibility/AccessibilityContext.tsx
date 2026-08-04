import { type ReactNode,useEffect, useState } from "react";

import { AccessibilityContext } from '../Accessibility/Hooks/context';

export function AccessibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
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
    () => localStorage.getItem("acc_color_palette") || "universal",
  );

  useEffect(() => {
    localStorage.setItem("acc_font_size", fontSize.toString());
    localStorage.setItem("acc_line_height", lineHeight.toString());
    localStorage.setItem("acc_letter_spacing", letterSpacing.toString());
    localStorage.setItem("acc_dyslexic_font", isDyslexicFont.toString());
    localStorage.setItem("acc_dark_mode", darkMode.toString());
    localStorage.setItem("acc_color_blindness", colorBlindness);
    localStorage.setItem("acc_color_palette", colorPalette);

    // Aplicação exata do meu modelo:
    // Injeta o atributo data-theme na raiz do documento (html) para ativar as variáveis CSS
    document.documentElement.setAttribute("data-theme", colorPalette);

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
    setColorPalette("universal");
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
        className={`min-h-screen text-left transition-all duration-200 ${getDaltonismoClass()} ${
          isDyslexicFont ? "font-lexend" : "font-sans"
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

