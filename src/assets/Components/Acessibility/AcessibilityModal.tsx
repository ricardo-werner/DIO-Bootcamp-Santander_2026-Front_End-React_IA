import { Brain, Eye, Palette, RefreshCw, X } from "lucide-react";

import { useAccessibility } from "./AccessibilityContext";
import "./AcessibilityModal.css";

export default function AccessibilityModal() {
  const {
    isModalOpen,
    toggleModal,
    activeTheme,
    setActiveTheme,
    resetSettings,
  } = useAccessibility();

  if (!isModalOpen) return null;

  return (
    <div onClick={toggleModal} className="modal-overlay">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-modal-title"
      >
        <div className="modal-header">
          <h3
            id="accessibility-modal-title"
            className="text-lg font-bold text-slate-800"
          >
            Painel de Acessibilidade
          </h3>
          <button
            onClick={toggleModal}
            className="modal-close-btn"
            aria-label="Fechar Modal"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="control-group">
            <label className="control-label mb-3 text-sm font-bold text-slate-700">
              Perfil de Cor e Contraste
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                onClick={() => setActiveTheme("universal")}
                aria-pressed={activeTheme === "universal"}
                className={`flex flex-col items-center justify-center rounded-xl border-2 p-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTheme === "universal"
                    ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
                type="button"
              >
                <Palette
                  size={24}
                  className={
                    activeTheme === "universal"
                      ? "text-blue-600"
                      : "text-slate-400"
                  }
                />
                <span className="mt-2 text-sm font-bold">Padrão</span>
                <span className="mt-1 text-[.625rem] uppercase tracking-wider opacity-80">
                  Universal
                </span>
              </button>

              <button
                onClick={() => setActiveTheme("foco-calmo")}
                aria-pressed={activeTheme === "foco-calmo"}
                className={`flex flex-col items-center justify-center rounded-xl border-2 p-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTheme === "foco-calmo"
                    ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
                type="button"
              >
                <Brain
                  size={24}
                  className={
                    activeTheme === "foco-calmo"
                      ? "text-blue-600"
                      : "text-slate-400"
                  }
                />
                <span className="mt-2 text-sm font-bold">Foco Calmo</span>
                <span className="mt-1 text-[.625rem] uppercase tracking-wider opacity-80">
                  TDAH / Dislexia
                </span>
              </button>

              <button
                onClick={() => setActiveTheme("alta-distincao")}
                aria-pressed={activeTheme === "alta-distincao"}
                className={`flex flex-col items-center justify-center rounded-xl border-2 p-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTheme === "alta-distincao"
                    ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
                type="button"
              >
                <Eye
                  size={24}
                  className={
                    activeTheme === "alta-distincao"
                      ? "text-blue-600"
                      : "text-slate-400"
                  }
                />
                <span className="mt-2 text-sm font-bold">Alta Distinção</span>
                <span className="mt-1 text-[.625rem] uppercase tracking-wider opacity-80">
                  Daltonismo
                </span>
              </button>
            </div>
          </div>

          <hr className="my-4 border-slate-200" />
        </div>

        <div className="modal-footer">
          <button onClick={resetSettings} className="btn-reset" type="button">
            <RefreshCw size={16} className="mr-2" />
            Resetar Configurações
          </button>

          <button onClick={toggleModal} className="btn-apply" type="button">
            Aplicar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
