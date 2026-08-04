import "@/App.css";

import { PersonStanding } from "lucide-react";

import { AccessibilityProvider } from "@/assets/Components/Accessibility/AccessibilityContext";
import AccessibilityModal from "@/assets/Components/Accessibility/AccessibilityModal";
import { useAccessibility } from "@/assets/Components/Accessibility/Hooks/context";

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
          <PersonStanding size={18} />
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
