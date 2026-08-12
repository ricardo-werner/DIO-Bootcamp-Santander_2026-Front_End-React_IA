import "@/assets/Components/Accessibility/Accessibility.css";
import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { ThemeProvider } from '@/context/theme/ThemeProvider.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
