# Guia Operacional — Sistema de Propostas Atacama

> Passo a passo para qualquer membro do time comercial gerar uma proposta

---

## Pre-requisitos

- Acesso ao Claude Code ou Claude Chat
- Transcricao da call de vendas (texto)
- Este repositorio (`modelos-comerciais/`) acessivel

---

## Passo a Passo

### 1. Obter a Transcricao

Apos a call de pre-vendas, obtenha a transcricao do audio. Ferramentas sugeridas:
- Tactiq (plugin de transcricao automatica)
- Otter.ai
- Fireflies.ai
- Transcricao manual

**Importante:** a transcricao deve conter as falas do prospect (dores, necessidades, contexto do negocio).

### 2. Abrir o Claude Code / Claude Chat

Abra uma nova conversa no Claude.

### 3. Anexar o Prompt do Engine

Copie e cole o conteudo de `engine/PROPOSAL_ENGINE_v2.md` no inicio da conversa. Este e o prompt mestre que instrui o Claude sobre como gerar propostas.

**Alternativa:** Se estiver usando Claude Code neste repositorio, o CLAUDE.md ja fornece contexto. Basta referenciar o engine.

### 4. Especificar o Tipo

Informe qual formato deseja:
- **"Tipo A"** — Proposta completa para envio por email (padrao)
- **"Tipo B"** — Proposta compacta para apresentar ao vivo na call
- **"IGNITION"** — Proposta one-shot para leads desqualificados (R$ 5.500, sem recorrencia)

**Quando usar IGNITION:** Lead com faturamento < R$ 30k/mes, individual/solo, sem budget para gestao recorrente. O engine vai sugerir automaticamente se detectar lead desqualificado na transcricao.

### 5. Enviar a Transcricao

Cole a transcricao completa da reuniao. O engine vai:
1. Extrair informacoes do lead
2. Consultar o catalogo de planos
3. Montar diagnostico
4. Gerar a proposta HTML

### 6. Revisar

Antes de enviar ao prospect, revise:
- [ ] O plano recomendado esta correto?
- [ ] Os precos conferem com o catalogo?
- [ ] As dores do lead estao refletidas no diagnostico?
- [ ] A proposta esta concisa (Tipo A: 5-7 min de leitura)?
- [ ] Nao ha travessoes (—)?
- [ ] A validade de 10 dias esta com a data correta?
- [ ] Cases citados sao relevantes para o setor?

### 7. Enviar ou Apresentar

**Tipo A:** Salve o HTML e envie por email ou WhatsApp.
**Tipo B:** Abra o HTML no navegador e compartilhe tela na call.

---

## Customizacao

Se o prospect precisa de algo fora do catalogo padrao:
1. Leia `engine/REGRAS_CUSTOMIZACAO.md`
2. Obtenha autorizacao de Eduardo ou Lucio
3. Adicione `[OVERRIDE: motivo]` na instrucao ao engine

---

## Troubleshooting

**Engine sugeriu plano errado:**
Informe o plano correto e peca para regerar. Ex: "Use o plano PRO, nao o START."

**Faltam informacoes na transcricao:**
O engine vai listar as lacunas e pedir confirmacao. Preencha e reenvie.

**Proposta muito longa:**
Relembre: "Tipo A, respeite os limites de secao conforme PROPOSAL_ENGINE_TIPO_A.md"

**Precisa de preco especial:**
Use `[OVERRIDE: preco especial autorizado por Eduardo - R$ X.XXX]`

**Lead desqualificado para planos recorrentes:**
O engine vai sugerir IGNITION automaticamente. Confirme e ele gera a proposta. Se preferir forcar um plano recorrente mesmo assim, informe: "Gere com plano [X] mesmo assim."

---

## Referencia Rapida

Para consulta rapida de todos os planos (precos, perfis, quando oferecer), veja: `processo/TABELA_VENDAS.md`
