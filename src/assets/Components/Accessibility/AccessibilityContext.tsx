/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AccessibilityTheme = "universal" | "foco-calmo" | "alta-distincao";

type AccessibilityContextValue = {
  isModalOpen: boolean;
  toggleModal: () => void;
  activeTheme: AccessibilityTheme;
  setActiveTheme: (theme: AccessibilityTheme) => void;
  resetSettings: () => void;
};

const STORAGE_KEY = "prumia:accessibility-theme";

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null,
);

function getInitialTheme(): AccessibilityTheme {
  if (typeof window === "undefined") return "universal";

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (storedTheme === "foco-calmo" || storedTheme === "alta-distincao") {
    return storedTheme;
  }

  return "universal";
}

type AccessibilityProviderProps = {
  children: ReactNode;
};

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] =
    useState<AccessibilityTheme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
    window.localStorage.setItem(STORAGE_KEY, activeTheme);
  }, [activeTheme]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      isModalOpen,
      toggleModal: () => setIsModalOpen((previous) => !previous),
      activeTheme,
      setActiveTheme,
      resetSettings: () => {
        setActiveTheme("universal");
        setIsModalOpen(false);
      },
    }),
    [activeTheme, isModalOpen],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      "useAccessibility deve ser usado dentro de AccessibilityProvider",
    );
  }

  return context;
}
