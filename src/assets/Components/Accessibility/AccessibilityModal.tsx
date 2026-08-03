import { Eye, Moon, RefreshCw, Sun, X } from 'lucide-react';
import './Accessibility.css';
import { useAccessibility } from './AccessibilityContext';

function TextToSpeech() {
  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance('Painel de acessibilidade pronto para uso.');
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="control-group">
      <button type="button" onClick={handleSpeak} className="btn-apply" aria-label="Ouvir descrição do painel">
        Ler conteúdo
      </button>
    </div>
  );
}

export default function AccessibilityModal() {
  const {
    isModalOpen, toggleModal, fontSize, setFontSize, lineHeight, setLineHeight,
    letterSpacing, setLetterSpacing, isDyslexicFont, setIsDyslexicFont,
    darkMode, toggleDarkMode, colorBlindness, setColorBlindness, 
    colorPalette, setColorPalette, resetSettings
  } = useAccessibility();

  return (
    <>
      <button onClick={toggleDarkMode} className="theme-toggle-btn" aria-label="Alternar modo claro e escuro">
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <button onClick={toggleModal} className="floating-accessibility-btn" aria-label="Abrir painel de acessibilidade" aria-haspopup="dialog">
        <Eye size={24} />
      </button>

      {isModalOpen && (
        <div onClick={toggleModal} className="modal-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-box" role="dialog" aria-modal="true">
            <div className="modal-header">
              <h3 className="modal-title">Acessibilidade Integrada</h3>
              <button onClick={toggleModal} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <TextToSpeech />

              {/* NOVO: Seletor de Paletas de Cores Acessíveis */}
              <div className="control-group">
                <label htmlFor="palette-select" className="control-label">Paleta de Cores do Sistema</label>
                <select 
                  id="palette-select" value={colorPalette} 
                  onChange={(e) => setColorPalette(e.target.value)} className="select-input"
                >
                  <option value="calmo">Foco Calmo (TDAH / Down / Dislexia)</option>
                  <option value="universal">Contraste Universal (Baixa Visão / Fotofobia)</option>
                  <option value="alta-definicao">Alta Definição (Daltonismo Protan/Deuteran)</option>
                </select>
              </div>

              {/* Filtro de Daltonismo */}
              <div className="control-group">
                <label htmlFor="colorblind-select" className="control-label">Filtro de Tela (Simulador de Daltonismo)</label>
                <select 
                  id="colorblind-select" value={colorBlindness} 
                  onChange={(e) => setColorBlindness(e.target.value)} className="select-input"
                >
                  <option value="none">Nenhum Filtro (Padrão)</option>
                  <option value="deuteranopia">Deuteranomalia / Deuteranopia (Verde fraco/Ausente)</option>
                  <option value="protanopia">Protanomalia / Protanopia (Vermelho fraco/Ausente)</option>
                  <option value="tritanopia">Tritanomalia / Tritanopia (Azul/Amarelo)</option>
                </select>
              </div>

              {/* Tipografia */}
              <div className="control-group">
                <label htmlFor="font-size-slider" className="control-label">Tamanho da Fonte: {fontSize}%</label>
                <input 
                  id="font-size-slider" type="range" min="100" max="200" value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))} className="slider-input"
                />
              </div>

              <div className="control-group">
                <label htmlFor="line-height-slider" className="control-label">Espaçamento de Linha: {lineHeight}</label>
                <input 
                  id="line-height-slider" type="range" min="1.5" max="2.5" step="0.1" value={lineHeight} 
                  onChange={(e) => setLineHeight(Number(e.target.value))} className="slider-input"
                />
              </div>

              <div className="control-group">
                <label htmlFor="letter-spacing-slider" className="control-label">Espaçamento de Letras: {letterSpacing}em</label>
                <input 
                  id="letter-spacing-slider" type="range" min="0.02" max="0.15" step="0.01" value={letterSpacing} 
                  onChange={(e) => setLetterSpacing(Number(e.target.value))} className="slider-input"
                />
              </div>

              <div className="checkbox-group">
                <input 
                  id="dyslexic-checkbox" type="checkbox" checked={isDyslexicFont} 
                  onChange={(e) => setIsDyslexicFont(e.target.checked)} className="checkbox-input"
                />
                <label htmlFor="dyslexic-checkbox" className="text-sm font-semibold select-none cursor-pointer">
                  Ativar Fonte para Dislexia (Lexend)
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={resetSettings} className="btn-reset">
                <RefreshCw size={14} /> Restaurar Padrão
              </button>
              <button onClick={toggleModal} className="btn-apply">
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
