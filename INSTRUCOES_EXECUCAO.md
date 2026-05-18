# Instruções para rodar a aplicação do Checklist

## Requisitos
- Node.js 18+ instalado
- npm disponível no terminal
- Java 21+ instalado
- Maven Wrapper disponível no projeto backend
- Banco MySQL local ativo em `localhost:3306`

## Ordem recomendada
1. Suba o backend Spring Boot.
2. Suba o frontend Vite.
3. Abra o navegador e valide a listagem, criação, edição e exclusão.

## Backend
Na pasta `checklist/`, execute:

```bash
./mvnw spring-boot:run
```

O backend deve ficar disponível em:
- http://localhost:8080

Endpoint principal de teste:
- http://localhost:8080/api/projetos

## Frontend
Na pasta `checklist-frontend/`, execute:

```bash
npm install
```

Depois inicie em desenvolvimento:

```bash
npm run dev
```

Se quiser fixar o host local para validação no navegador:

```bash
npm run dev -- --host 127.0.0.1
```

O endereço mais comum do frontend é:
- http://localhost:5173/

## Validação rápida
Depois de subir os dois serviços, teste estas rotas e ações:
- Abrir a lista de projetos no frontend.
- Criar um projeto novo.
- Editar um cliente existente.
- Adicionar e remover ambientes.
- Excluir um projeto.

Se quiser checar a API diretamente:

```bash
Invoke-WebRequest -Uri 'http://localhost:8080/api/projetos' -UseBasicParsing
```

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
- O frontend consome a API em `http://localhost:8080/api/projetos` por padrão.
- Se precisar apontar para outro backend, use a variável `VITE_API_URL`.
- Se a API não responder, a aplicação usa dados locais de fallback para continuar funcionando.
