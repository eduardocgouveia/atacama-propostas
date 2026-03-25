# PROPOSAL ENGINE — PROPOSTA MÚLTIPLA

> Instrucoes para propostas com multiplas opcoes de plano
> Complemento ao PROPOSAL_ENGINE_v2.md

---

## Quando Usar

PROPOSTA MÚLTIPLA e para quando o cliente precisa escolher entre planos. Use quando:
- O vendedor quer dar opcoes ao cliente (2-3 planos)
- O objetivo e fechar na call com opcao de escolha
- O vendedor especifica "Proposta Multipla" ou "multiplas opcoes"
- O lead demonstrou interesse em mais de um nivel de servico
- Nao ficou claro qual plano e o ideal (o cliente decide)

---

## Principio

A proposta conta a historia COMPLETA (identica a Tipo A) mas na secao de Investimento apresenta 2-3 opcoes de plano para o cliente escolher. NAO e uma proposta resumida: e a mesma profundidade da Tipo A, com a flexibilidade de multiplos planos.

---

## Estrutura: Identica a Tipo A + Seletor de Planos

A PROPOSTA MÚLTIPLA usa TODAS as secoes da Tipo A:

1. **HERO** (capa com nome do cliente, badge de urgencia)
2. **VERDADE INCONVENIENTE** (diagnostico, dores, cards de impacto)
3. **A SOLUCAO** (cards de entregas com icones animados, team badges)
4. **METODO COSMOS** (orbital SVG, carrossel 5 etapas)
5. **CASES + CREDIBILIDADE** (depoimentos, numeros, badges Google/Meta/RD)
6. **INVESTIMENTO** ← UNICA DIFERENÇA: seletor de 2-3 planos
7. **PROXIMOS PASSOS + CTA** (roadmap, urgencia final)

### Regra: a solucao (secao 3) descreve os entregaveis do plano RECOMENDADO.

---

## SECAO 06: INVESTIMENTO (Seletor de Planos)

### Layout
- 2 a 3 cards de plano lado a lado (grid de 3 colunas)
- Cada card e um `card-glass` com:
  - Nome do plano (eyebrow uppercase)
  - Preco mensal (fonte grande, peso 800)
  - Setup (com desconto se aplicavel)
  - Divisor
  - 5-6 bullets do que inclui
  - Botao "Selecionar plano" (shimmer-btn linkando para aceite)
- Card RECOMENDADO: badge branco "RECOMENDADO" no topo, borda mais clara, leve translate-up

### Banner de Desconto (abaixo dos cards)
- Fundo com gradiente laranja sutil + borda laranja
- Valor original riscado > valor com desconto (fonte grande)
- Badge de porcentagem (ex: "54% DE DESCONTO")
- Descricao do que o setup inclui

### Box de Escassez (abaixo do desconto)
- Dot pulsante laranja + "CAPACIDADE LIMITADA"
- Texto sobre vagas limitadas por trimestre
- Data de validade em destaque

---

## Agrupamentos para Proposta Multipla

O engine deve AGRUPAR os planos por familia quando gerar a Proposta Multipla:

### Familia TRÁFEGO (so performance, sem social)
- TRÁFEGO START (R$ 2.270)
- TRÁFEGO PRO (R$ 3.280)
- TRÁFEGO ADVANCED (R$ 5.450)

### Familia PERFORMANCE + SOCIAL (trafego + social, com/sem AV)
- TRÁFEGO PRO (R$ 3.280)
- PERFORMANCE PRO + SOCIAL (R$ 5.300)
- PERFORMANCE PRO + SOCIAL + AUDIOVISUAL (R$ 6.680)

### Familia FULL (escala maxima)
- PERFORMANCE PRO + SOCIAL + AUDIOVISUAL (R$ 6.680)
- DIAMOND (R$ 8.780)

### Regra de selecao
O engine identifica o plano ideal na transcricao e apresenta:
- O plano ANTERIOR (opcao mais economica)
- O plano RECOMENDADO (tag "RECOMENDADO")
- O plano SEGUINTE (opcao premium)

Se o plano ideal for o primeiro da familia (START) ou o ultimo (DIAMOND), apresentar apenas 2 opcoes.

---

## Pagina de Aceite

A proposta multipla linka para `aceite-[prospect].html` que contem:
- Formulario conversacional multi-step (6 passos)
- Coleta: nome, CNPJ, email, telefone, endereco, confirmacao
- Tela final: card de pagamento do setup + botao para gateway

---

## HTML

- Arquivo unico auto-contido (clone da Tipo A com investimento alterado)
- Todas as imagens em base64 inline
- Mesmo design system: Inter Tight + Cormorant Unicase, dark, grain, gridlines
- Responsivo (grid 3 colunas > 1 coluna em mobile)
- Cards com hover: translateY(-4px) + borda mais clara
