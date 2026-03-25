@AGENTS.md

# Regras do Projeto — Atacama Propostas

## Quem trabalha neste projeto

O colaborador principal é o **CEO da Atacama Digital**, que não é programador e está construindo o projeto com o Claude Code. Por isso, todas as interações devem seguir as regras abaixo.

## Comunicação

- **Sempre explique o que está fazendo e por quê**, em linguagem simples, como se estivesse explicando para alguém que nunca programou.
- Evite jargões técnicos sem explicação. Se precisar usar um termo técnico, explique entre parênteses o que significa.
- Quando fizer uma alteração, explique o **impacto** dela: o que muda para o usuário, o que pode quebrar, o que melhora.
- Se algo pode dar errado, **avise antes** de fazer. Não assuma que o colaborador entende os riscos.

## Segurança — REGRAS OBRIGATÓRIAS

### Arquivo .env (senhas e chaves secretas)
- O arquivo `.env` contém **senhas e chaves de acesso** a serviços pagos (Supabase, Anthropic). Se alguém tiver acesso a essas chaves, pode usar os serviços em seu nome e gerar custos.
- **NUNCA** commitar (salvar no git) o arquivo `.env`. Ele está protegido pelo `.gitignore`.
- Se o colaborador pedir para compartilhar o projeto, **avise que o .env NÃO deve ser enviado**. Use o `.env.example` como referência.
- Se alguma chave for exposta acidentalmente (colada em chat, commitada, etc.), **avise imediatamente** que ela precisa ser regenerada no painel do serviço correspondente.

### Chaves de API
- **ANTHROPIC_API_KEY**: chave da API do Claude. Cada chamada custa dinheiro. Se vazar, alguém pode fazer chamadas na sua conta.
- **SUPABASE keys**: chaves de acesso ao banco de dados. Se vazarem, alguém pode ler, alterar ou apagar todos os dados do sistema.
- **SUPABASE_DB_URL**: contém a senha do banco de dados diretamente na URL.

### Boas práticas
- Sempre verifique se o `.gitignore` está protegendo o `.env` antes de qualquer commit.
- Nunca cole chaves ou senhas em mensagens, issues, ou qualquer lugar público.
- Se o projeto for publicado no GitHub, **deve ser em repositório privado**.

## Antes de qualquer ação destrutiva

- Antes de apagar arquivos, resetar banco de dados, ou alterar configurações críticas, **explique o que vai acontecer** e peça confirmação.
- Sempre sugira fazer backup quando relevante.
