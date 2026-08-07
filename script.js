document.addEventListener('DOMContentLoaded', () => {
  // Inicializa todos os módulos de acessibilidade
  initFontSizeControls();
  initHighContrastToggle();
  initFocusManager();
});

/**
 * 1. Controle do Tamanho da Fonte (Aumentar / Diminuir / Resetar)
 */
function initFontSizeControls() {
  const rootElement = document.documentElement;
  let currentSizePercent = 100; // Tamanho base (100%)
  const step = 10;              // Incremento de 10%
  const minSize = 80;
  const maxSize = 150;

  const btnIncrease = document.getElementById('btn-increase-font');
  const btnDecrease = document.getElementById('btn-decrease-font');
  const btnReset = document.getElementById('btn-reset-font');

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      if (currentSizePercent < maxSize) {
        currentSizePercent += step;
        updateFontSize();
        announceToScreenReader(`Tamanho da fonte aumentado para ${currentSizePercent}%`);
      }
    });
  }

  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      if (currentSizePercent > minSize) {
        currentSizePercent -= step;
        updateFontSize();
        announceToScreenReader(`Tamanho da fonte diminuído para ${currentSizePercent}%`);
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      currentSizePercent = 100;
      updateFontSize();
      announceToScreenReader('Tamanho da fonte restaurado para o padrão');
    });
  }

  function updateFontSize() {
    rootElement.style.fontSize = `${currentSizePercent}%`;
  }
}

/**
 * 2. Alternador de Tema de Alto Contraste
 */
function initHighContrastToggle() {
  const contrastBtn = document.getElementById('btn-contrast-toggle');
  
  if (!contrastBtn) return;

  contrastBtn.addEventListener('click', () => {
    const isHighContrast = document.body.classList.toggle('high-contrast');
    
    // Atualiza o estado ARIA para leitores de tela
    contrastBtn.setAttribute('aria-pressed', isHighContrast);

    const statusMessage = isHighContrast 
      ? 'Modo de alto contraste ativado' 
      : 'Modo de alto contraste desativado';

    announceToScreenReader(statusMessage);
  });
}

/**
 * 3. Gerenciamento de Foco Teclado (Tecla Esc fecha modais/menús)
 */
function initFocusManager() {
  document.addEventListener('keydown', (event) => {
    // Permite fechar componentes ativos apertando 'ESC'
    if (event.key === 'Escape') {
      const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
      if (activeModal) {
        activeModal.setAttribute('aria-hidden', 'true');
        announceToScreenReader('Janela modal fechada');
      }
    }
  });
}

/**
 * 4. Função Utilitária: Anúncio dinâmico para Leitores de Tela (ARIA Live Region)
 */
function announceToScreenReader(message) {
  let liveRegion = document.getElementById('a11y-status-announcer');

  // Se a região de anúncio ainda não existir no HTML, cria dinamica e invisível
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-status-announcer';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only'; // Classe CSS para esconder visualmente
    document.body.appendChild(liveRegion);
  }

  // Atualiza o texto para o leitor de tela vozear
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
}
