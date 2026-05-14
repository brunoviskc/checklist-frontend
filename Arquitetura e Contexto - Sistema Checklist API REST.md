# Arquitetura e Contexto - Sistema Checklist (API REST)

Este documento consolida o estado atual, as decisões arquiteturais e o plano de ação do nosso sistema de gestão de projetos. Ele reflete a linha de montagem do nosso backend, limpa de testes intermediários e focada na estrutura de produção.

---

## 1. O Que Já Está Construído e Funcionando (A Linha de Montagem)

O nosso "motor" backend atingiu o estágio de Produto Mínimo Viável (MVP) 100% funcional, conectado a um banco de dados relacional persistente. A engrenagem opera com as seguintes camadas estruturadas:

*   **Modelagem de Dados (As Plantas Baixas e Caixarias):**
    *   Entidades `ProjetoModel` e `AmbienteModel` mapeadas.
    *   Relacionamento `1:N` estabelecido (Um projeto tem vários ambientes).
    *   Loop infinito de serialização JSON resolvido de forma cirúrgica utilizando as anotações `@JsonManagedReference` (no chefe/projeto) e `@JsonBackReference` (no subordinado/ambiente).
*   **Acesso a Dados (O Almoxarifado Definitivo):**
    *   Interfaces `ProjetoRepository` e `AmbienteRepository` implementadas estendendo `JpaRepository`.
    *   Transição concluída do banco em memória (H2) para o galpão definitivo no **MySQL** (banco: `checklist_db`).
*   **Regras de Negócio (A Gerência de Produção - Service):**
    *   `ProjetoService` estruturado com `@Transactional` (para garantir que a máquina pare e desfaça tudo se faltar luz no meio do salvamento).
    *   Injeção de dependências moderna com `@RequiredArgsConstructor`.
    *   Regra de amarração implementada: os ambientes "órfãos" que chegam da internet são automaticamente parafusados ao seu projeto pai antes de irem para o estoque.
*   **Endpoints da API (O Balcão de Atendimento - Controller):**
    *   `ProjetoController` mapeado em `/api/projetos`.
    *   Rotas operacionais: `POST` (Criar), `GET` (Listar todos), `GET /{id}` (Buscar específico) e `DELETE /{id}` (Cancelar pedido).
*   **Inspeção de Qualidade e SAC (Validações e Tratamento de Erros):**
    *   Campos blindados na raiz (`Model`) com `@NotBlank` e `@NotNull`.
    *   Recepção no Controller ativada com `@Valid`.
    *   Classe global `TratadorDeErros` (`@RestControllerAdvice`) implementada para interceptar requisições ruins (Erro 400) e devolver um laudo técnico limpo e formatado, sem expor os códigos internos (Stack Trace) da máquina.
*   **Segurança e Acessos (A Portaria):**
    *   `SecurityConfig` configurado temporariamente para permitir acesso sem token de autenticação, facilitando os testes de chão de fábrica.
    *   `CorsConfig` estabelecido para liberar conexões externas (`allowedOrigins("*")`), preparando o terreno para a chegada do sistema web.

---

## 2. Regras de Arquitetura e Bibliotecas (Ferramentas e Padrões)

A nossa fábrica roda sob a seguinte stack tecnológica e princípios arquiteturais:

*   **Linguagem & Framework:** Java 17+ com Spring Boot 3+.
*   **Banco de Dados:** MySQL local (Motor de persistência: Spring Data JPA / Hibernate com `ddl-auto=update`).
*   **Padrão de Projeto:** MVC simplificado para APIs REST (Model -> Repository -> Service -> Controller).
*   **Bibliotecas e Ferramentas Definidas:**
    *   **Lombok:** Redução de código repetitivo (construtores, getters, setters).
    *   **Spring Boot Validation:** Para o controle rigoroso da qualidade da entrada de dados.
    *   **Spring Security:** Ativo, porém operando em modo de "portões abertos" até a fase de deploy.
    *   **Jackson:** Para serialização inteligente do JSON.
*   **Convenção de Código:**
    *   Nomenclatura clara (ex: `tb_projetos`, `tb_ambientes`).
    *   Isolamento de responsabilidades: O *Controller* não acessa o banco diretamente, ele obrigatoriamente passa as ordens de serviço pela mesa do *Service*.

---

## 3. Próximo Passo Claro (A Próxima Etapa da Obra)

Com o backend operando perfeitamente nos bastidores, a nossa próxima missão é abandonar os simuladores (Insomnia/Postman) e construir a interface visual.

*   **Objetivo Imediato:** Iniciar o desenvolvimento do **Showroom (Frontend)** em uma nova pasta (`checklist-frontend`).
*   **Estrutura Inicial:** Criar os arquivos base (`index.html`, `style.css` e `script.js`) para montar a tela de cadastro que o consultor usará no navegador.
*   **Funcionalidade Alvo Adicional:** Implementar, via CSS (`@media print`) e JavaScript, a geração do "Detalhamento Técnico" (Ordem de Serviço formatada e limpa para impressão em papel).