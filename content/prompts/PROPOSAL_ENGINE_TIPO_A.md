# PROPOSAL ENGINE — TIPO A (Envio)

> Instrucoes especificas para propostas enviadas por email ao cliente
> Complemento ao PROPOSAL_ENGINE_v2.md

---

## Quando Usar

Tipo A e a proposta PADRAO. Use quando:
- O cliente vai receber a proposta por email/WhatsApp e ler sozinho
- Nao ha call agendada para apresentacao ao vivo
- O vendedor nao especificou o formato

Se nao especificado, GERE TIPO A.

---

## Principio

O cliente vai ler SOZINHO, sem vendedor do lado explicando. A proposta precisa:
- Contar a historia completa (diagnostico > solucao > investimento)
- Antecipar e responder objecoes silenciosas
- Ser auto-contida e persuasiva por si so
- Ser MAIS CURTA que as propostas anteriores (meta: 40-50% mais enxuta)

---

## Estrutura: 8 Secoes Obrigatorias

### SECAO 01: HERO (CAPA)
- Logo Atacama (ou placeholder)
- Eyebrow: "PROPOSTA COMERCIAL EXCLUSIVA . [MES ANO]"
- Titulo principal: nome do grupo/empresa (fonte display, grande)
- Subtitulo: frase de posicionamento personalizada
- Meta-info: Plano recomendado | Validade (10 dias, badge de urgencia)
- **MAX: 1 tela (sem scroll)**

### SECAO 02: CONTEXTO + DIAGNOSTICO
- Numero: "01 / CONTEXTO"
- Headline provocativa baseada no diagnostico
- Paragrafo de contexto (MAX 3 linhas)
- Tabela diagnostico: SINTOMA | CAUSA REAL | IMPACTO NO NEGOCIO (4 linhas, MAX 6)
- Bloco "Verdade dura": 1 frase de impacto
- **MAX: 1.5 telas**

### SECAO 03: A SOLUCAO
- Numero: "02 / A SOLUCAO"
- Nome do plano + justificativa (1 paragrafo)
- Para CADA ITEM do plano, card com:
  - O QUE E (2-3 linhas)
  - O QUE NAO E (1-2 linhas)
  - POR QUE IMPORTA (1-2 linhas)
  - CONEXAO ATACAMA (1-2 linhas)
- **REGRA DE CONCISAO: cada card max 8-10 linhas total. Sem textao.**

### SECAO 04: TRANSPARENCIA (EXCLUSOES)
- Numero: "03 / TRANSPARENCIA"
- Grid de exclusoes: icone X + item + alternativa breve
- **MAX: 1 tela**

### SECAO 05: CASES DE SUCESSO
- Numero: "04 / CASES"
- Grid de 3-4 cards visuais (overlay escuro)
- Cada card: TAG + NOME + RESULTADO (numero grande) + descricao curta (1 linha)
- Priorizar cases do mesmo setor que o lead
- **MAX: 1 tela**

### SECAO 06: DIFERENCIAIS
- Numero: "05 / DIFERENCIAIS"
- Grid de 4-6 cards numerados
- Cada card: numero + titulo + 1 paragrafo curto (2-3 linhas)
- Adaptar ao contexto do lead
- **MAX: 1 tela**

### SECAO 07: INVESTIMENTO
- Numero: "06 / INVESTIMENTO"
- Bloco de ancoragem: valor mercado (riscado) > valor Atacama (destaque)
- Setup em bloco separado
- Tabela resumo: TODOS os itens inclusos (1 linha por item)
- Comparativo mercado vs Atacama
- Caixa de urgencia: validade 10 dias
- **MAX: 2 telas**

### SECAO 08: VISAO DE FUTURO + PROXIMOS PASSOS
- Numero: "07 / VISAO DE FUTURO"
- Timeline vertical com 3 fases (Mes 1-3 / 4-6 / 7-12)
- "08 / PROXIMOS PASSOS": 4-5 etapas horizontais
- Caixa de urgencia final
- **MAX: 1.5 telas**

### FECHAMENTO
- Logo centralizado
- "Welcome to Clarity."
- Coordenadas: 8 02'36.6" S / 34 53'53.5" W . RECIFE, PE

---

## Regras de Concisao (TIPO A)

1. Cada secao tem MAX de telas indicado acima. Respeite.
2. Paragrafos: MAX 3 linhas. Se passou de 3, corte.
3. Bullet points > paragrafos sempre que possivel.
4. Tabela de diagnostico: MAX 6 linhas (nao 10).
5. Cards de solucao: MAX 10 linhas cada (nao 20).
6. Cases: 1 linha de descricao por card (nao paragrafo).
7. O lead deve conseguir ler a proposta INTEIRA em 5-7 minutos.

---

## HTML Tipo A

- Arquivo unico auto-contido (sem dependencias externas)
- Imagens em base64 inline
- Design system completo conforme `templates/BRANDKIT_REFERENCE.md`
- Fundo escuro, tipografia Inter Tight + Cormorant Unicase
- Responsivo (mobile-first)
- Animacoes sutis (fadeUp, hover em cards)
