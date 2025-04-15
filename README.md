# 🚀 GitHub Feedback

Uma aplicação React que permite ao usuário obter **feedback automatizado baseado no seu perfil do GitHub**. A ferramenta analisa o nome de usuário fornecido, consulta os dados do perfil e retorna uma análise personalizada e estilizada em Markdown.

## 🧠 Funcionalidades

- 🔍 Entrada de nome de usuário do GitHub
- 🧾 Geração de feedback em tempo real com base no perfil
- 🎨 Exibição estilizada de feedback (suporte a Markdown)
- 🌈 UI moderna com animações via Framer Motion
- 💡 Loading animado durante a análise
- 📜 Feedback formatado com destaque para listas, links, títulos e muito mais
- [ ] ⚙️ Tecnologias Utilizadas

- **React** – Biblioteca principal da UI
- **TypeScript** – Tipagem estática
- **Tailwind CSS** – Estilização moderna e utilitária
- **Framer Motion** – Animações suaves
- **React Query** – Gerenciamento de requisições e cache
- **Marked** – Parser de Markdown para HTML
- **Lucide React** – Ícones elegantes
- **ShadCN/UI** – Componentes de interface reutilizáveis

## 🧩 Estrutura do Projeto

```
📦 src
├── components
│   └── ui
│       ├── button.tsx
│       ├── input.tsx
│       └── card.tsx
├── service
│   └── feedback.ts         // Função que chama a API e retorna feedback
```

## 🧪 Como Usar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/github-feedback.git
cd github-feedback
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Rode a aplicação

```bash
npm run dev
# ou
yarn dev
```

## 🧾 Como Funciona

### 🔹 Entrada do usuário:

Um campo `Input` permite digitar o nome de usuário do GitHub.

### 🔹 Requisição de feedback:

Ao clicar em **"Obter Feedback"**, a função `postFeedbackByUsernameGithub` é chamada e retorna um texto em **Markdown** com o feedback do perfil.

### 🔹 Loading animado:

Enquanto a análise acontece, uma animação com ícones e textos exibe o progresso.

### 🔹 Resultado final:

O texto de feedback é renderizado com o `marked` e estilizado usando `prose` do Tailwind para uma leitura agradável.

## 🖌️ Estilização Customizada

A classe `.feedback-div-custom` é aplicada ao conteúdo do feedback, com estilos adicionais para listas:

```css
.feedback-div-custom ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Tailwind's gap-2 */
}
```
