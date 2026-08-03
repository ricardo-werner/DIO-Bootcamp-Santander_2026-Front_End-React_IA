import { createContext, useContext, useState, useEffect, ReactNode }  from "react";

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
  resetSettings: () => void;
}


