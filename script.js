document.addEventListener('DOMContentLoaded', () => {
  initFontSizeControls();
  initHighContrastToggle();
  initMagnifierToggle();
  initFormValidation();
});

// 1. Controle de Tamanho da Fonte
function initFontSizeControls() {
  let currentSize = 100;
  const root = document.documentElement;

  document.getElementById('btn-increase-font')?.addEventListener('click', () => {
    if (currentSize < 150) {
      currentSize += 10;
      root.style.fontSize = `${currentSize}%`;
      announceToScreenReader(`Tamanho do texto aumentado para ${currentSize}%`);
    }
  });

  document.getElementById('btn-decrease-font')?.addEventListener('click', () => {
    if (currentSize > 80) {
      currentSize -= 10;
      root.style.fontSize = `${currentSize}%`;
      announceToScreenReader(`Tamanho do texto diminuído para ${currentSize}%`);
    }
  });

  document.getElementById('btn-reset-font')?.addEventListener('click', () => {
    currentSize = 100;
    root.style.fontSize = '100%';
    announceToScreenReader('Tamanho do texto restaurado ao padrão');
  });
}

// 2. Toggle de Alto Contraste
function initHighContrastToggle() {
  const btn = document.getElementById('btn-contrast-toggle');
  btn?.addEventListener('click', () => {
    const isContrast = document.body.classList.toggle('high-contrast');
    btn.setAttribute('aria-pressed', isContrast);
    announceToScreenReader(isContrast ? 'Alto contraste ativado' : 'Alto contraste desativado');
  });
}

// 3. Toggle do Modo Lupa
function initMagnifierToggle() {
  const btn = document.getElementById('btn-magnifier-toggle');
  btn?.addEventListener('click', () => {
    const isMagnifier = document.body.classList.toggle('magnifier-active');
    btn.setAttribute('aria-pressed', isMagnifier);
    announceToScreenReader(isMagnifier ? 'Modo Lupa ativado. Passe o mouse ou foca nos textos para ampliar.' : 'Modo Lupa desativado');
  });
}

// 4. Validação de Formulário Acessível
function initFormValidation() {
  const form = document.getElementById('meu-formulario');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome');
    const erroNome = document.getElementById('erro-nome');

    if (!nome.value.trim()) {
      nome.setAttribute('aria-invalid', 'true');
      erroNome.textContent = 'Por favor, preencha o campo nome.';
      announceToScreenReader('Erro no formulário: O campo nome é obrigatório.');
      nome.focus();
    } else {
      nome.removeAttribute('aria-invalid');
      erroNome.textContent = '';
      announceToScreenReader('Formulário enviado com sucesso!');
      alert('Formulário enviado!');
    }
  });
}

// Utilitário para Leitores de Tela
function announceToScreenReader(message) {
  let liveRegion = document.getElementById('a11y-announcer');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-announcer';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = message;
}
