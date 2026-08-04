import { createContext, useContext } from "react";

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

export const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility deve ser usado dentro de um AccessibilityProvider",
    );
  }
  return context;
}