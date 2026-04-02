# Regras de Customizacao de Propostas

> Quando e como o Proposal Engine pode desviar do catalogo de planos

---

## Regra Padrao

O Proposal Engine DEVE seguir o `planos/CATALOGO_PLANOS.md` rigorosamente.
Nenhum plano pode ser inventado, nenhum preco alterado, nenhum item adicionado por conta propria.

---

## Quando Customizar

Customizacao so e permitida com a tag `[OVERRIDE: motivo]` na transcricao ou instrucao.

### Quem pode autorizar override:
- Eduardo (CEO)
- Lucio (Comercial)
- Coordenador de Nucleo

### Tipos de customizacao permitidos:

**1. Add-on a plano existente**
Adicionar 1-2 itens a um plano sem mudar o plano inteiro.
Exemplo: PRO + producao audiovisual eventual (sem ser mensal)
Regra: manter nome do plano base + listar add-ons separadamente com preco adicional.

**2. Preco especial**
Desconto ou condicao especial negociada internamente.
Regra: mostrar preco original riscado + preco especial + motivo (ex: "condicao de lancamento", "parceria estrategica").

**3. Plano hibrido**
Combinar elementos de 2 planos.
Regra: documentar claramente quais itens de qual plano estao inclusos. Preco customizado deve ser validado antes de gerar.

**4. Escopo reduzido**
Cliente quer menos do que um plano oferece.
Regra: usar o plano mais proximo e listar o que foi REMOVIDO com nota "nao incluso nesta versao". NAO reduzir preco sem autorizacao.

---

## Regra Especial: IGNITION (Plano 00)

O IGNITION e um produto padronizado. Sua margem depende de ZERO customizacao.

**Regras:**
- IGNITION NAO aceita override. Escopo e preco sao fixos.
- NAO adicionar itens ao IGNITION (se o lead precisa de mais, ele cabe num plano recorrente).
- NAO reduzir preco do IGNITION.
- UNICA flexibilidade: parcelamento em ate 6x.

**Excecao "quase qualificado":** Se o lead esta no limiar (faturamento R$ 25-35k, mostra potencial), o vendedor pode oferecer IGNITION + 1 mes de gestao avulsa como add-on (preco a definir com Eduardo). Isso NAO e customizacao do IGNITION, e um add-on separado.

---

## O que NUNCA customizar (mesmo com override)

- Setup gratuito (pode parcelar, nunca isentar)
- Planos que nao existem no catalogo sem aprovacao de Eduardo
- Promessas de resultado especifico (ex: "garantimos 50 vendas")
- Exclusividade territorial
- SLA de resposta inferior a 24h uteis
- IGNITION: preco, escopo e entregaveis (produto padronizado)

---

## Como documentar override na proposta

Quando houver override, incluir no HTML (visivel apenas na versao interna, nao no envio ao cliente):

```html
<!-- OVERRIDE: [motivo] | Autorizado por: [nome] | Data: [data] -->
```

E na versao de revisao interna, destacar os itens customizados com tag [CUSTOM] ao lado.
