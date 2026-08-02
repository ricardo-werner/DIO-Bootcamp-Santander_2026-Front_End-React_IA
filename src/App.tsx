import { Accessibility } from "lucide-react";

import "@/App.css";

import {
  AccessibilityProvider,
  useAccessibility,
} from "@/assets/Components/Acessibility/AccessibilityContext";
import AccessibilityModal from "@/assets/Components/Acessibility/AcessibilityModal";

function AppContent() {
  const { toggleModal } = useAccessibility();

  return (
    <main className="app-shell">
      <header className="app-hero">
        <p className="app-eyebrow">PrumIA</p>
        <h1>Educador Financeiro com IA</h1>
        <p className="app-lead">
          Ajuste o contraste, a tipografia e o foco visual com um painel de
          acessibilidade simples e centralizado.
        </p>

        <button className="app-action" onClick={toggleModal} type="button">
          <Accessibility size={18} />
          Abrir painel de acessibilidade
        </button>
      </header>

      <AccessibilityModal />
    </main>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}

export default App;
