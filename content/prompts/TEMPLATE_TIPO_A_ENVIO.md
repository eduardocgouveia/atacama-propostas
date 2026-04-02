# Template HTML — Tipo A (Envio)

> Skeleton HTML para propostas enviadas por email
> O engine preenche os placeholders {{...}} com dados extraidos da transcricao

---

## Como usar

O Proposal Engine usa este template como referencia de estrutura e CSS.
Ao gerar uma proposta Tipo A, o engine deve:
1. Copiar esta estrutura base
2. Substituir todos os `{{PLACEHOLDERS}}` com dados reais
3. Ajustar secoes conforme o plano recomendado
4. Gerar arquivo HTML unico auto-contido

---

## Skeleton HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Proposta Comercial . {{NOME_EMPRESA}} . Atacama Digital</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Cormorant+Unicase:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #000000;
    --white: #FFFFFF;
    --gray-90: #1A1A1A;
    --gray-80: #222222;
    --gray-70: #3A3A3A;
    --gray-50: #959595;
    --gray-30: #C4C4C4;
    --silver: #DBDCDD;
    --orange: #E13F07;
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter Tight', sans-serif;
    background: var(--black);
    color: var(--white);
    line-height: 1.6;
  }

  /* LAYOUT */
  .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  .section { padding: 128px 0; }
  .section-alt { background: var(--gray-90); }
  .section-number {
    font-size: 14px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray-50);
    margin-bottom: 32px;
  }

  /* TIPOGRAFIA */
  .display {
    font-family: 'Cormorant Unicase', serif;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 0.9;
  }
  h1 { font-size: clamp(3rem, 8vw, 6rem); }
  h2 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; }
  h3 { font-size: 1.2rem; font-weight: 600; }
  p { color: var(--gray-30); max-width: 720px; }

  /* HERO */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--black);
  }
  .hero-content { text-align: center; z-index: 2; }
  .hero .eyebrow {
    font-size: 12px;
    letter-spacing: 0.2em;
    color: var(--gray-50);
    margin-bottom: 24px;
  }
  .hero .subtitle { color: var(--gray-30); margin-top: 16px; }
  .badge-urgencia {
    display: inline-block;
    background: rgba(225, 63, 7, 0.15);
    border: 1px solid rgba(225, 63, 7, 0.3);
    color: #ff6b3d;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    margin-top: 24px;
    animation: pulse 2s ease-in-out infinite;
  }

  /* CARDS */
  .card {
    background: var(--gray-80);
    border-left: 3px solid var(--gray-70);
    padding: 32px;
    margin-bottom: 16px;
    transition: border-color 0.3s;
  }
  .card:hover { border-color: var(--white); }
  .card h3 { margin-bottom: 16px; }
  .card-label { font-size: 12px; color: var(--gray-50); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  /* TABELA */
  table { width: 100%; border-collapse: collapse; margin: 24px 0; }
  th {
    background: var(--black);
    text-align: left;
    padding: 12px 16px;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray-50);
  }
  td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--gray-70);
    color: var(--gray-30);
  }
  tr:nth-child(even) td { background: rgba(255,255,255,0.02); }

  /* CAIXA URGENCIA */
  .urgencia {
    background: rgba(225, 63, 7, 0.08);
    border-left: 4px solid var(--orange);
    padding: 24px 32px;
    margin: 32px 0;
  }
  .urgencia strong { color: #ff6b3d; }

  /* ANCORAGEM */
  .preco-ancora {
    display: flex;
    align-items: center;
    gap: 32px;
    margin: 32px 0;
  }
  .preco-original {
    opacity: 0.5;
    text-decoration: line-through;
    font-size: 1.5rem;
  }
  .preco-novo {
    background: var(--white);
    color: var(--black);
    padding: 24px 40px;
    font-size: 2rem;
    font-weight: 800;
  }
  .seta { font-size: 2rem; color: var(--gray-50); }

  /* TIMELINE */
  .timeline { border-left: 2px solid var(--gray-70); padding-left: 32px; }
  .timeline-item { margin-bottom: 48px; position: relative; }
  .timeline-item::before {
    content: '';
    position: absolute;
    left: -38px;
    top: 6px;
    width: 10px;
    height: 10px;
    background: var(--white);
    border-radius: 50%;
  }

  /* FOOTER */
  .footer {
    text-align: center;
    padding: 80px 0;
    background: var(--black);
  }
  .footer .tagline {
    font-family: 'Cormorant Unicase', serif;
    font-size: 2rem;
    font-weight: 600;
    margin: 24px 0;
  }
  .footer .coords { font-size: 12px; color: var(--gray-50); letter-spacing: 0.1em; }

  /* ANIMACOES */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  .fade-1 { animation: fadeUp 0.6s ease 0.2s both; }
  .fade-2 { animation: fadeUp 0.6s ease 0.5s both; }
  .fade-3 { animation: fadeUp 0.6s ease 0.7s both; }
  .fade-4 { animation: fadeUp 0.6s ease 1.0s both; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .section { padding: 64px 0; }
    .container { padding: 0 20px; }
    .preco-ancora { flex-direction: column; text-align: center; }
  }
</style>
</head>
<body>

<!-- ============= SECAO 01: HERO ============= -->
<section class="hero">
  <div class="hero-content">
    <p class="eyebrow fade-1">PROPOSTA COMERCIAL EXCLUSIVA . {{MES_ANO}}</p>
    <h1 class="display fade-2">{{NOME_EMPRESA}}</h1>
    <p class="subtitle fade-3">{{FRASE_POSICIONAMENTO}}</p>
    <div class="fade-4">
      <span class="badge-urgencia">VALIDA ATE {{DATA_VALIDADE}} . {{PLANO_RECOMENDADO}}</span>
    </div>
  </div>
</section>

<!-- ============= SECAO 02: CONTEXTO + DIAGNOSTICO ============= -->
<section class="section">
  <div class="container">
    <p class="section-number">01 / CONTEXTO</p>
    <h2>{{HEADLINE_DIAGNOSTICO}}</h2>
    <p style="margin: 24px 0;">{{PARAGRAFO_CONTEXTO}}</p>
    <table>
      <thead>
        <tr><th>Sintoma</th><th>Causa Real</th><th>Impacto no Negocio</th></tr>
      </thead>
      <tbody>
        <!-- {{LINHAS_DIAGNOSTICO}} — 4 a 6 linhas -->
        <tr><td>{{SINTOMA_1}}</td><td>{{CAUSA_1}}</td><td>{{IMPACTO_1}}</td></tr>
        <tr><td>{{SINTOMA_2}}</td><td>{{CAUSA_2}}</td><td>{{IMPACTO_2}}</td></tr>
        <tr><td>{{SINTOMA_3}}</td><td>{{CAUSA_3}}</td><td>{{IMPACTO_3}}</td></tr>
        <tr><td>{{SINTOMA_4}}</td><td>{{CAUSA_4}}</td><td>{{IMPACTO_4}}</td></tr>
      </tbody>
    </table>
    <div class="urgencia">
      <strong>Verdade dura:</strong> {{VERDADE_DURA}}
    </div>
  </div>
</section>

<!-- ============= SECAO 03: A SOLUCAO ============= -->
<section class="section section-alt">
  <div class="container">
    <p class="section-number">02 / A SOLUCAO</p>
    <h2>{{PLANO_RECOMENDADO}}</h2>
    <p style="margin: 24px 0;">{{JUSTIFICATIVA_PLANO}}</p>

    <!-- Repetir para cada item do plano -->
    <div class="card">
      <h3>{{ITEM_NOME}}</h3>
      <p class="card-label">O que e</p>
      <p>{{ITEM_O_QUE_E}}</p>
      <p class="card-label" style="margin-top: 16px;">O que nao e</p>
      <p>{{ITEM_O_QUE_NAO_E}}</p>
      <p class="card-label" style="margin-top: 16px;">Por que importa</p>
      <p>{{ITEM_POR_QUE}}</p>
      <p class="card-label" style="margin-top: 16px;">Conexao Atacama</p>
      <p>{{ITEM_CONEXAO}}</p>
    </div>
    <!-- /Repetir -->

  </div>
</section>

<!-- ============= SECAO 04: TRANSPARENCIA ============= -->
<section class="section">
  <div class="container">
    <p class="section-number">03 / TRANSPARENCIA</p>
    <h2>O que nao esta incluso</h2>
    <div class="grid-2" style="margin-top: 32px;">
      <!-- Repetir para cada exclusao -->
      <div class="card">
        <p style="color: #ff6b3d; font-weight: 600;">&#10008; {{EXCLUSAO_ITEM}}</p>
        <p style="font-size: 14px;">{{EXCLUSAO_ALTERNATIVA}}</p>
      </div>
      <!-- /Repetir -->
    </div>
  </div>
</section>

<!-- ============= SECAO 05: CASES ============= -->
<section class="section section-alt">
  <div class="container">
    <p class="section-number">04 / CASES DE SUCESSO</p>
    <div class="grid-3" style="margin-top: 32px;">
      <!-- Repetir 3-4 cases -->
      <div class="card" style="text-align: center;">
        <p class="card-label">{{CASE_TAG}}</p>
        <h3>{{CASE_NOME}}</h3>
        <p class="display" style="font-size: 2.5rem; color: var(--white); margin: 16px 0;">{{CASE_RESULTADO}}</p>
        <p style="font-size: 14px;">{{CASE_DESCRICAO}}</p>
      </div>
      <!-- /Repetir -->
    </div>
  </div>
</section>

<!-- ============= SECAO 06: DIFERENCIAIS ============= -->
<section class="section">
  <div class="container">
    <p class="section-number">05 / DIFERENCIAIS</p>
    <div class="grid-3" style="margin-top: 32px;">
      <!-- Repetir 4-6 diferenciais -->
      <div class="card">
        <p class="display" style="font-size: 3rem; color: var(--gray-70);">{{DIFERENCIAL_NUM}}</p>
        <h3 style="margin-top: 8px;">{{DIFERENCIAL_TITULO}}</h3>
        <p style="font-size: 14px;">{{DIFERENCIAL_DESCRICAO}}</p>
      </div>
      <!-- /Repetir -->
    </div>
  </div>
</section>

<!-- ============= SECAO 07: INVESTIMENTO ============= -->
<section class="section section-alt">
  <div class="container">
    <p class="section-number">06 / INVESTIMENTO</p>

    <!-- Ancoragem -->
    <div class="preco-ancora">
      <div>
        <p class="card-label">Valor fragmentado no mercado</p>
        <p class="preco-original">R$ {{VALOR_MERCADO}}/mes</p>
      </div>
      <span class="seta">→</span>
      <div>
        <p class="card-label">Valor Atacama</p>
        <p class="preco-novo">R$ {{VALOR_ATACAMA}}/mes</p>
      </div>
    </div>

    <!-- Setup -->
    <div class="card" style="margin-top: 32px;">
      <h3>Setup (pagamento unico)</h3>
      <p class="display" style="font-size: 2rem;">R$ {{VALOR_SETUP}}</p>
    </div>

    <!-- Tabela resumo -->
    <h3 style="margin-top: 48px;">Tudo que esta incluso</h3>
    <table>
      <thead><tr><th>Item</th><th>Detalhe</th><th>Frequencia</th></tr></thead>
      <tbody>
        <!-- {{LINHAS_RESUMO}} -->
        <tr><td>{{ITEM_RESUMO}}</td><td>{{DETALHE_RESUMO}}</td><td>{{FREQ_RESUMO}}</td></tr>
      </tbody>
    </table>

    <!-- Urgencia -->
    <div class="urgencia">
      <strong>Condicao exclusiva:</strong> Valores validos ate {{DATA_VALIDADE}}. Apos este prazo, disponibilidade de equipe e condicoes podem ser revisadas.
    </div>
  </div>
</section>

<!-- ============= SECAO 08: VISAO DE FUTURO + PROXIMOS PASSOS ============= -->
<section class="section">
  <div class="container">
    <p class="section-number">07 / VISAO DE FUTURO</p>
    <div class="timeline" style="margin-top: 32px;">
      <div class="timeline-item">
        <h3>Mes 1 a 3 / Estruturacao</h3>
        <p>{{FASE_1_DESCRICAO}}</p>
      </div>
      <div class="timeline-item">
        <h3>Mes 4 a 6 / Aceleracao</h3>
        <p>{{FASE_2_DESCRICAO}}</p>
      </div>
      <div class="timeline-item">
        <h3>Mes 7 a 12 / Consolidacao</h3>
        <p>{{FASE_3_DESCRICAO}}</p>
      </div>
    </div>

    <p class="section-number" style="margin-top: 64px;">08 / PROXIMOS PASSOS</p>
    <div class="grid-3" style="margin-top: 32px;">
      <div class="card" style="text-align: center;">
        <p class="display" style="font-size: 2rem;">01</p>
        <h3>Aprovacao</h3>
      </div>
      <div class="card" style="text-align: center;">
        <p class="display" style="font-size: 2rem;">02</p>
        <h3>Setup (10 dias)</h3>
      </div>
      <div class="card" style="text-align: center;">
        <p class="display" style="font-size: 2rem;">03</p>
        <h3>Operacao ativa</h3>
      </div>
    </div>

    <div class="urgencia" style="margin-top: 32px;">
      <strong>Ultima chamada:</strong> Esta proposta expira em {{DATA_VALIDADE}}. Vagas limitadas para novos projetos neste trimestre.
    </div>
  </div>
</section>

<!-- ============= FOOTER ============= -->
<section class="footer">
  <!-- Logo Atacama (base64 ou SVG inline) -->
  <p class="tagline">Welcome to Clarity.</p>
  <p style="color: var(--gray-30); max-width: 500px; margin: 16px auto;">
    Presenca digital nao e entrega pontual. E sistema. E consistencia. E metodo. E construcao de marca que vira resultado.
  </p>
  <p class="coords">8°02'36.6" S / 34°53'53.5" W . RECIFE, PE</p>
</section>

</body>
</html>
```

---

## Placeholders

| Placeholder | Origem | Exemplo |
|-------------|--------|---------|
| `{{NOME_EMPRESA}}` | Transcricao | "Grupo Ballian" |
| `{{MES_ANO}}` | Data atual | "MARCO 2026" |
| `{{DATA_VALIDADE}}` | Data + 10 dias | "26 DE MARCO DE 2026" |
| `{{PLANO_RECOMENDADO}}` | Catalogo | "PERFORMANCE PRO + SOCIAL + AUDIOVISUAL" |
| `{{FRASE_POSICIONAMENTO}}` | Engine gera | "De influencer a sistema de vendas" |
| `{{HEADLINE_DIAGNOSTICO}}` | Engine gera | "3 marcas. Zero presenca digital integrada." |
| `{{PARAGRAFO_CONTEXTO}}` | Transcricao | Contexto extraido da call |
| `{{SINTOMA_N}}` / `{{CAUSA_N}}` / `{{IMPACTO_N}}` | Engine gera | Diagnostico |
| `{{VERDADE_DURA}}` | Engine gera | Frase de impacto |
| `{{ITEM_*}}` | Catalogo + Engine | Itens do plano |
| `{{VALOR_MERCADO}}` | ANCORAGEM_PRECOS.md | "21.000" |
| `{{VALOR_ATACAMA}}` | Catalogo | "6.680" |
| `{{VALOR_SETUP}}` | Catalogo | "1.580" |
