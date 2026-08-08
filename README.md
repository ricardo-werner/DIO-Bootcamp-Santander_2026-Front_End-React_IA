# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Estudo: toggle de tema e acessibilidade

Este projeto foi um bom exemplo de um ponto importante em React: **mudar o estado não significa, automaticamente, mudar a interface inteira**.

### O que acontecia

- o botão de dia/noite alternava o estado corretamente;
- o ícone mudava;
- partes internas do painel reagiam;
- mas a página principal parecia não mudar.

### Por que isso aconteceu

O estado do tema estava sendo alterado no React, mas a aplicação visual não estava totalmente conectada a esse estado.

Em outras palavras:

- o React sabia que o tema tinha mudado;
- o CSS da página inteira não estava ouvindo essa mudança do jeito ideal.

### O que foi ajustado

- o tema global passou a ser controlado com `data-theme="light|dark"` no elemento `html`;
- a paleta de acessibilidade foi separada em `data-palette`;
- as cores da interface passaram a usar variáveis CSS globais;
- os estilos do modal e dos botões foram simplificados para evitar duplicidade;
- a dependência da classe `dark` foi removida.

### O que aprender com isso

1. **Estado em React** controla dados e comportamento.
2. **CSS global** é o que faz a aparência mudar de verdade na tela.
3. **Separar responsabilidades** deixa o código mais fácil de manter.
4. **Variáveis CSS** são ótimas para temas claros/escuros.

### Resumo mental

Pense assim:

- o React guarda o valor do tema;
- o `html` recebe esse valor;
- o CSS lê esse valor e muda a aparência da página.

Se quiser estudar esse fluxo depois, os arquivos principais são:

- `src/assets/Components/Accessibility/AccessibilityContext.tsx`
- `src/assets/Components/Accessibility/Accessibility.css`
- `src/index.css`

Esse padrão é muito útil em projetos reais porque evita que o tema fique preso só em um componente.
