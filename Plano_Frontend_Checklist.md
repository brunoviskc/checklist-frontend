# Plano de Projeto — Frontend Sistema Checklist

> **Stack:** React 18 · Vite · CSS Variables · Recharts · React Router DOM · Fetch API · @media print  
> **Backend:** API REST Java/Spring Boot em `http://localhost:8080`  
> **Pasta do projeto:** `checklist-frontend/`

---

## Visão Geral

| Item | Total |
|------|-------|
| Fases de desenvolvimento | 4 |
| Telas principais | 3 |
| Temas (claro / escuro) | 2 |
| Gráfico de composição MDF | 1 |

---

## Telas do Sistema

### 1. Dashboard Principal
Lista de projetos com busca por cliente e seleção de ambiente. Cabeçalho global com toggle de tema claro/escuro.

**Funcionalidades:** Listagem · Filtro em tempo real · Toggle de tema

---

### 2. Painel do Cliente
Tela de detalhes do projeto com gráfico de rosca mostrando a porcentagem de material MDF total por ambiente do cliente selecionado. Métricas resumidas exibidas acima do gráfico.

**Funcionalidades:** Gráfico MDF (Recharts) · Métricas resumidas · Lista de ambientes expandível

---

### 3. Detalhamento Técnico (Ordem de Serviço)
Ficha completa do cliente com todos os ambientes e itens. Botão "Imprimir" aciona `@media print` — oculta toda a UI e exibe apenas o documento formatado para papel.

**Funcionalidades:** @media print · Ordem de Serviço · Exportar como PDF via browser

---

## Integração com a API REST

| Método | Endpoint | Uso no Frontend |
|--------|----------|-----------------|
| `GET` | `/api/projetos` | Listar todos os projetos na dashboard |
| `GET` | `/api/projetos/{id}` | Carregar dados do cliente selecionado + ambientes |
| `POST` | `/api/projetos` | Formulário de cadastro de novo projeto |
| `DELETE` | `/api/projetos/{id}` | Botão de exclusão na dashboard |

---

## Fases de Desenvolvimento

### Fase 1 — Fundação do Projeto

Configurar o ambiente, estrutura de pastas e sistema de temas antes de qualquer componente.

- **Estrutura de pastas** — `src/components`, `pages`, `hooks`, `services`, `styles`
- **CSS Variables** — `:root` com tokens de cor, tipografia e espaçamento para tema claro/escuro
- **ThemeProvider** — Context API para toggle global de tema, persistência via `localStorage`
- **API Service** — Módulo `api.js` centralizando fetch para `http://localhost:8080`

---

### Fase 2 — Dashboard e Listagem

Construir a tela principal com listagem de projetos, busca e ações rápidas.

- **Header** — Logo, nome do sistema, toggle tema claro/escuro
- **Busca de cliente** — Input com filtro em tempo real sobre a lista de projetos
- **ProjectCard** — Card por projeto com nome, ambientes, botões Detalhes e Excluir
- **Modal de cadastro** — Formulário POST de novo projeto + ambientes vinculados

---

### Fase 3 — Painel do Cliente + Gráfico MDF

Tela de detalhes do projeto com gráfico de composição de material MDF por ambiente.

- **Gráfico Recharts** — `PieChart` ou `RadialBarChart` com % MDF por ambiente, legenda e tooltip
- **Cálculo MDF** — Hook `useMdfStats()` agregando totais por ambiente a partir dos dados da API
- **Métricas resumidas** — Cards: total de ambientes, total MDF (m²), % médio do projeto
- **Lista de ambientes** — Tabela expandível com itens de cada ambiente

---

### Fase 4 — Detalhamento Técnico + Impressão

Gerar a Ordem de Serviço formatada, limpa para impressão em papel via `@media print`.

- **OS Component** — Layout estruturado: cabeçalho, dados do cliente, tabela de ambientes/itens
- **@media print CSS** — Oculta header, sidebar e botões; exibe só o documento com margens de página
- **Preview mode** — Botão "Visualizar impressão" alterna para modo de prévia inline antes de imprimir
- **Exportar PDF** — `window.print()` abre diálogo nativo — usuário salva como PDF pelo browser

---

## Estrutura de Pastas

```
checklist-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── MdfChart.jsx        ← Recharts
│   │   ├── OrdemServico.jsx    ← impressão
│   │   └── ThemeToggle.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ClientePanel.jsx
│   │   └── Detalhamento.jsx
│   ├── hooks/
│   │   ├── useTheme.js
│   │   └── useMdfStats.js
│   ├── services/
│   │   └── api.js              ← fetch /api/projetos
│   └── styles/
│       ├── theme.css           ← CSS variables
│       └── print.css          ← @media print
└── index.html
```

---

## Decisões Técnicas

### Tema Claro/Escuro
Usar CSS Variables no `:root` sem biblioteca extra. O `ThemeProvider` via Context API salva a preferência no `localStorage` e alterna uma classe no `<html>`, garantindo persistência entre sessões.

### Gráfico MDF
O hook `useMdfStats()` recebe os ambientes do projeto e calcula a proporção de MDF em relação ao total de materiais. O `PieChart` do Recharts exibe a composição por ambiente com tooltip e legenda interativa.

### Impressão da Ordem de Serviço
O `@media print` oculta tudo (header, botões, gráficos) e exibe apenas o componente `OrdemServico.jsx` com margens de página corretas. O usuário clica em "Imprimir" e o browser abre o diálogo nativo com opção de salvar como PDF — zero dependência externa.
