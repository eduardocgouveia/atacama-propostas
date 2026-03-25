# Atacama Propostas

Sistema de geração automática de propostas comerciais da Atacama Digital, usando inteligência artificial.

**O que o sistema faz:** Você cola a transcrição de uma call de vendas, a IA analisa o prospect (empresa, desafios, orçamento), e gera uma proposta comercial completa em HTML que pode ser enviada por link.

---

## Pré-requisitos

Antes de começar, você precisa ter instalado no seu computador:

### 1. Node.js (o motor que roda o projeto)

Node.js é o programa que faz o código do projeto funcionar no seu computador.

- Acesse https://nodejs.org
- Baixe a versão **LTS** (a que aparece em destaque, geralmente com um botão verde)
- Instale normalmente (próximo, próximo, concluir)
- Para verificar se instalou corretamente, abra o Terminal e digite:
  ```
  node --version
  ```
  Deve aparecer algo como `v20.x.x` ou `v22.x.x`

### 2. Git (controle de versão do código)

Git é o programa que permite baixar o código do GitHub e manter tudo sincronizado.

- **Mac:** Abra o Terminal e digite `git --version`. Se não estiver instalado, o Mac vai oferecer para instalar automaticamente.
- **Windows:** Baixe em https://git-scm.com e instale com as opções padrão.

### 3. Conta no Supabase (banco de dados e login)

Supabase é o serviço que guarda os dados do sistema (propostas, usuários, prospects) e cuida do login.

- Acesse https://supabase.com e crie uma conta gratuita
- Crie um novo projeto (anote a senha do banco de dados, você vai precisar)

### 4. Chave da API da Anthropic (inteligência artificial)

A Anthropic é a empresa que faz o Claude (a IA que analisa as calls e gera as propostas). Cada vez que o sistema analisa uma call ou gera uma proposta, ele faz uma chamada para a API da Anthropic, e isso tem um custo por uso.

- Acesse https://console.anthropic.com
- Crie uma conta e adicione créditos
- Vá em **API Keys** e crie uma nova chave

---

## Instalação passo a passo

### Passo 1: Baixar o projeto

Abra o Terminal e rode estes comandos (copie e cole um por vez):

```bash
cd ~/Projects
git clone git@github.com:eduardocgouveia/atacama-propostas.git
cd atacama-propostas
```

> **O que isso faz:** Entra na pasta Projects, baixa todo o código do GitHub para o seu computador, e entra na pasta do projeto.

### Passo 2: Instalar as dependências

```bash
npm install
```

> **O que isso faz:** Baixa todas as bibliotecas (pacotes de código prontos) que o projeto precisa para funcionar. Pode demorar 1-2 minutos na primeira vez.

### Passo 3: Configurar as variáveis de ambiente

As variáveis de ambiente são as **senhas e chaves de acesso** que o projeto usa para se conectar aos serviços externos (banco de dados, IA). Elas ficam em um arquivo chamado `.env` que **nunca deve ser compartilhado**.

```bash
cp .env.example .env
```

> **O que isso faz:** Cria uma cópia do arquivo de exemplo `.env.example` com o nome `.env`. Agora você precisa editar esse arquivo e colocar suas chaves reais.

Abra o arquivo `.env` em qualquer editor de texto e preencha:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_SUA-CHAVE-AQUI
SUPABASE_DB_URL=postgresql://postgres:SUA-SENHA@db.SEU-PROJETO.supabase.co:5432/postgres

# Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-SUA-CHAVE-AQUI

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Onde encontrar cada valor:**

| Variável | Onde pegar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Supabase > Settings > API > anon/public key |
| `SUPABASE_DB_URL` | Supabase > Settings > Database > Connection string (URI). Substitua `[YOUR-PASSWORD]` pela senha que definiu ao criar o projeto |
| `ANTHROPIC_API_KEY` | console.anthropic.com > API Keys |
| `NEXT_PUBLIC_APP_URL` | Deixe `http://localhost:3000` para desenvolvimento local |

### Passo 4: Criar as tabelas no banco de dados

```bash
npx drizzle-kit push
```

> **O que isso faz:** Cria todas as tabelas necessárias no banco de dados do Supabase (tabelas de usuários, propostas, prospects, etc). Precisa rodar apenas na primeira vez ou quando houver mudanças no banco.

### Passo 5: Criar o primeiro usuário

O sistema exige login para acessar o painel. Você precisa criar o primeiro usuário manualmente:

1. Acesse o painel do Supabase (https://supabase.com/dashboard)
2. Selecione seu projeto
3. No menu lateral, clique em **Authentication**
4. Clique em **Users** > **Add user** > **Create new user**
5. Coloque seu email e uma senha

### Passo 6: Rodar o projeto

```bash
npm run dev
```

> **O que isso faz:** Inicia o servidor de desenvolvimento. O sistema fica acessível enquanto esse comando estiver rodando no Terminal.

Abra no navegador: **http://localhost:3000**

Use o email e senha que criou no Passo 5 para entrar.

---

## Como usar

1. **Faça login** com o email/senha criados no Supabase
2. No menu lateral, clique em **Propostas** > **Nova Proposta**
3. **Cole a transcrição** da call de vendas na caixa de texto (mínimo 100 caracteres)
4. Clique em **Analisar** — a IA vai processar a transcrição (leva ~30 segundos)
5. Revise a análise: dados do prospect, score do lead, plano recomendado
6. Clique em **Gerar Proposta** — a IA cria o HTML completo (pode levar 1-2 minutos)
7. **Copie o link** da proposta para enviar ao prospect, ou **baixe o HTML**

---

## Estrutura de pastas (para referência)

```
atacama-propostas/
├── content/                  # Textos e regras que a IA usa
│   ├── plans/                # Catálogo de planos (preços, serviços)
│   ├── prompts/              # Instruções para a IA (como analisar, como gerar)
│   └── personas/             # Mapa de personas e ICP
├── src/                      # Código do sistema
│   ├── app/                  # Páginas (login, dashboard, propostas)
│   ├── components/           # Componentes visuais reutilizáveis
│   └── lib/                  # Lógica interna (IA, banco de dados, auth)
├── .env                      # Suas senhas (NUNCA compartilhe este arquivo)
├── .env.example              # Modelo do .env (sem senhas reais)
└── package.json              # Lista de dependências do projeto
```

---

## Comandos úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o projeto em modo desenvolvimento |
| `npm run build` | Gera a versão de produção (para deploy) |
| `npx drizzle-kit push` | Atualiza as tabelas do banco de dados |
| `npx drizzle-kit studio` | Abre uma interface visual para ver o banco de dados |

---

## Segurança — LEIA COM ATENÇÃO

### O arquivo .env contém senhas reais

O arquivo `.env` tem as chaves de acesso ao banco de dados e à API da Anthropic. **Se alguém tiver acesso a essas chaves, pode:**

- Ler, alterar ou apagar todos os dados do sistema
- Fazer chamadas à API da Anthropic na sua conta (gerando custos)

**Regras de ouro:**

1. **NUNCA envie o arquivo `.env` por email, WhatsApp, Slack ou qualquer outro meio**
2. **NUNCA cole as chaves em conversas, issues do GitHub, ou documentos compartilhados**
3. O `.gitignore` já protege o `.env` de ser enviado ao GitHub, mas tenha atenção ao compartilhar a pasta do projeto de outras formas
4. Se desconfiar que uma chave vazou, **regenere imediatamente** no painel do serviço correspondente (Supabase ou Anthropic)

### O repositório deve ser privado

Este repositório no GitHub deve **sempre** estar configurado como **privado**. Um repositório público permite que qualquer pessoa veja o código, os prompts da IA, e a lógica de negócio.

Para verificar: GitHub > Seu repositório > Settings > General > "Danger Zone" > Visibility deve ser **Private**.

---

## Problemas comuns

### "Email ou senha invalidos" no login
Verifique se criou o usuário no painel do Supabase (Passo 5). O email e senha devem ser exatamente os mesmos.

### Erro ao analisar transcrição
Verifique se a `ANTHROPIC_API_KEY` está correta no `.env` e se tem créditos na conta da Anthropic.

### Erro ao gerar proposta
A geração usa o modelo Claude Opus, que é mais lento e caro. Verifique se tem créditos suficientes e aguarde até 2 minutos.

### "Cannot connect to database"
Verifique se a `SUPABASE_DB_URL` está correta no `.env`, especialmente a senha (a parte entre `:` e `@`).

### Porta 3000 já em uso
Outro programa está usando a porta 3000. Feche o outro Terminal que estiver rodando `npm run dev` e tente novamente.
