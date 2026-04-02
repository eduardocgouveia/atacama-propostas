# Fluxo: Call de Vendas > Proposta

> Fluxograma completo do processo de geracao de propostas

---

## Fluxo Principal

```
CALL DE PRE-VENDAS
    |
    v
TRANSCRICAO (Tactiq / Otter / manual)
    |
    v
QUALIFICACAO DO LEAD (engine faz automaticamente)
    |
    +---> QUALIFICADO              +---> DESQUALIFICADO
    |                              |
    v                              v
DEFINIR FORMATO                    PROPOSTA IGNITION
    |                              (R$ 5.500 one-shot)
    +---> TIPO A (envio)           |
    |                              v
    +---> TIPO B (call)            PROPOSAL ENGINE v2
    |                              + 00_IGNITION.md
    v                              |
PROPOSAL ENGINE v2                 v
+ TIPO_A.md ou TIPO_B.md          PROPOSTA HTML IGNITION
    |                              (Tipo A simplificado)
    v                              |
PROPOSTA HTML                      v
    |                              ENVIO AO PROSPECT
    v                              |
REVISAO (Eduardo/Lucio)            v
    |                              FECHAMENTO (pag. unico/6x)
    v                              |
ENVIO ou APRESENTACAO              v
    |                              ENTREGA EM 5-7 DIAS
    v                              + Call de Handoff (30min)
TIPO A: email/WhatsApp
TIPO B: screenshare > seletor > contratar
    |
    v
ONBOARDING (Metodo COSMOS)
```

> **Nota:** O engine detecta leads desqualificados automaticamente e sugere IGNITION. O operador confirma antes de gerar a proposta.

---

## Detalhe por Etapa

### 1. Call de Pre-Vendas
- Quem: Eduardo, Lucio ou membro comercial
- Objetivo: identificar dores, necessidades, contexto do negocio
- Duracaoo tipica: 30-60 minutos
- Garantir que transcricao esta ativa

### 2. Transcricao
- Obter texto da call (automatico ou manual)
- Verificar que as falas do prospect estao claras
- Se necessario, adicionar notas do vendedor ao final

### 3. Qualificacao + Definir Formato
- O engine qualifica automaticamente ao analisar a transcricao
- Se QUALIFICADO: escolher **Tipo A** (envio) ou **Tipo B** (call ao vivo)
- Se DESQUALIFICADO: engine sugere **IGNITION**. Operador confirma.

### 4. Gerar Proposta
- Usar `engine/PROPOSAL_ENGINE_v2.md` como prompt
- Especificar Tipo A, Tipo B ou confirmar IGNITION
- Colar transcricao
- Engine consulta `planos/CATALOGO_PLANOS.md` automaticamente

### 5. Revisao
- Conferir plano, precos, diagnostico, escassez
- Ajustar se necessario (regenerar ou editar HTML)

### 6. Entrega
- **Tipo A**: salvar HTML, enviar
- **Tipo B**: abrir no navegador, screenshare, apresentar

### 7. Pos-Proposta
- Se fechou (recorrente): iniciar onboarding (Metodo COSMOS Estagio 01)
- Se fechou (IGNITION): iniciar setup imediato (entrega em 5-7 dias)
- Se nao fechou: follow-up em 3, 5 e 8 dias (antes da validade)
- Se recusou plano recorrente: oferecer IGNITION como alternativa antes de descartar
- Se recusou tudo: documentar motivo em CRM (Kommo)

---

## Metricas do Processo

| Metrica | Meta |
|---------|------|
| Tempo call > proposta gerada | < 30 min |
| Tempo proposta gerada > revisada | < 1 hora |
| Tempo total call > envio | < 2 horas |
| Taxa de conversao Tipo A | Acompanhar |
| Taxa de conversao Tipo B | Acompanhar |
| Taxa de conversao IGNITION | Acompanhar |
| Leads desqualificados convertidos via IGNITION | Acompanhar |
