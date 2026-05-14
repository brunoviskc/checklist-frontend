# Instruções para rodar o frontend do Checklist

## Requisitos
- Node.js 18+ instalado
- npm disponível no terminal

## Instalação
Na pasta do projeto, execute:

```bash
npm install
```

## Executar em desenvolvimento
Na pasta do projeto, execute:

```bash
npm run dev
```

Se quiser fixar o host local para validação no navegador:

```bash
npm run dev -- --host 127.0.0.1
```

Depois acesse o endereço mostrado no terminal, normalmente:
- http://127.0.0.1:5173/

## Build de produção
Para gerar a versão final do frontend:

```bash
npm run build
```

## Pré-visualização do build
Depois do build, você pode testar a versão gerada com:

```bash
npm run preview
```

## Observações
- O frontend tenta consumir a API em `http://localhost:8080/api/projetos`.
- Se a API não responder, a aplicação usa dados locais de fallback para continuar funcionando.
- Para testar a integração completa, mantenha o backend Spring Boot ativo antes de abrir o frontend.
