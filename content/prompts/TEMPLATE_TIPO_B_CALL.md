# Template HTML — Tipo B (Call ao Vivo)

> Skeleton HTML para propostas apresentadas durante a call de vendas
> Compacto, seletor de planos, botao de contratacao

---

## Como usar

O Proposal Engine usa este template para gerar propostas Tipo B.
Diferente do Tipo A, este e COMPACTO (3-5 telas) e otimizado para screenshare.

---

## Skeleton HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{NOME_EMPRESA}} . Atacama Digital</title>
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
    font-size: 18px; /* maior para screenshare */
  }

  /* LAYOUT */
  .container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
  .section { padding: 80px 0; }
  .section-alt { background: var(--gray-90); }

  /* TIPOGRAFIA — maior para screenshare */
  .display {
    font-family: 'Cormorant Unicase', serif;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 0.9;
  }
  h1 { font-size: clamp(3.5rem, 9vw, 7rem); }
  h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; }
  h3 { font-size: 1.3rem; font-weight: 600; }
  p { color: var(--gray-30); }

  /* HERO COMPACTO */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--black);
  }
  .hero .eyebrow {
    font-size: 13px;
    letter-spacing: 0.2em;
    color: var(--gray-50);
    margin-bottom: 24px;
  }
  .badge-urgencia {
    display: inline-block;
    background: rgba(225, 63, 7, 0.15);
    border: 1px solid rgba(225, 63, 7, 0.3);
    color: #ff6b3d;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 32px;
    animation: pulse 2s ease-in-out infinite;
  }

  /* DIAGNOSTICO BULLETS */
  .diagnostico-list {
    list-style: none;
    margin: 32px 0;
  }
  .diagnostico-list li {
    padding: 16px 24px;
    border-left: 3px solid var(--gray-70);
    margin-bottom: 12px;
    font-size: 1.1rem;
  }
  .verdade-dura {
    background: rgba(225, 63, 7, 0.08);
    border-left: 4px solid var(--orange);
    padding: 20px 28px;
    margin-top: 24px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #ff6b3d;
  }

  /* SELETOR DE PLANOS */
  .planos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 40px 0;
  }
  .plano-card {
    background: var(--gray-80);
    border: 2px solid var(--gray-70);
    padding: 40px 32px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
  }
  .plano-card:hover {
    border-color: var(--white);
    transform: translateY(-4px);
  }
  .plano-card.recomendado {
    border-color: #ff6b3d;
  }
  .plano-card.recomendado::before {
    content: 'RECOMENDADO';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff6b3d;
    color: var(--white);
    padding: 4px 16px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    border-radius: 2px;
  }
  .plano-nome {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
  }
  .plano-preco {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 8px 0;
  }
  .plano-preco-label {
    font-size: 13px;
    color: var(--gray-50);
  }
  .plano-setup {
    font-size: 14px;
    color: var(--gray-50);
    margin: 12px 0 20px;
  }
  .plano-items {
    list-style: none;
    text-align: left;
  }
  .plano-items li {
    padding: 6px 0;
    font-size: 14px;
    color: var(--gray-30);
    border-bottom: 1px solid var(--gray-70);
  }
  .plano-items li::before {
    content: '✓ ';
    color: var(--white);
    font-weight: 600;
  }

  /* DIFERENCIAIS INLINE */
  .diferenciais-list {
    list-style: none;
    margin: 32px 0;
  }
  .diferenciais-list li {
    padding: 12px 0;
    font-size: 1.1rem;
    border-bottom: 1px solid var(--gray-70);
  }
  .case-inline {
    display: inline-block;
    background: var(--gray-80);
    padding: 12px 24px;
    margin: 8px 8px 8px 0;
    border-radius: 4px;
  }
  .case-inline .numero {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--white);
  }

  /* FORMULARIO MULTI-STEP (Typeform style) */
  .form-section {
    padding: 80px 0;
    background: var(--gray-90);
  }
  .form-wrapper {
    max-width: 600px;
    margin: 0 auto;
  }
  .form-step {
    display: none;
    animation: fadeUp 0.4s ease both;
  }
  .form-step.active { display: block; }
  .form-step h2 {
    margin-bottom: 8px;
  }
  .form-step .step-sub {
    color: var(--gray-50);
    font-size: 14px;
    margin-bottom: 32px;
  }

  /* Progress bar */
  .progress-bar {
    display: flex;
    gap: 6px;
    margin-bottom: 48px;
  }
  .progress-bar .bar {
    flex: 1;
    height: 3px;
    background: var(--gray-70);
    border-radius: 2px;
    transition: background 0.3s;
  }
  .progress-bar .bar.done { background: var(--white); }
  .progress-bar .bar.current { background: #ff6b3d; }

  /* Step counter */
  .step-counter {
    font-size: 12px;
    letter-spacing: 0.15em;
    color: var(--gray-50);
    margin-bottom: 16px;
  }

  /* Inputs */
  .form-group { margin-bottom: 20px; }
  .form-group label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--gray-50);
    margin-bottom: 6px;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 14px 16px;
    background: var(--gray-80);
    border: 1px solid var(--gray-70);
    color: var(--white);
    font-family: 'Inter Tight', sans-serif;
    font-size: 16px;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }
  .form-group input:focus,
  .form-group select:focus {
    border-color: var(--white);
  }
  .form-group input::placeholder {
    color: var(--gray-50);
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .form-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }

  /* Plan selector in form */
  .plan-option {
    background: var(--gray-80);
    border: 2px solid var(--gray-70);
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .plan-option:hover { border-color: var(--white); }
  .plan-option.selected { border-color: #ff6b3d; }
  .plan-option input[type="radio"] { display: none; }
  .plan-radio {
    width: 20px;
    height: 20px;
    border: 2px solid var(--gray-50);
    border-radius: 50%;
    flex-shrink: 0;
    position: relative;
  }
  .plan-option.selected .plan-radio {
    border-color: #ff6b3d;
  }
  .plan-option.selected .plan-radio::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: #ff6b3d;
    border-radius: 50%;
  }

  /* Buttons */
  .btn-next, .btn-prev, .btn-submit {
    font-family: 'Inter Tight', sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding: 16px 40px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.03em;
  }
  .btn-next, .btn-submit {
    background: var(--white);
    color: var(--black);
  }
  .btn-next:hover, .btn-submit:hover {
    background: var(--silver);
    transform: translateY(-2px);
  }
  .btn-prev {
    background: transparent;
    color: var(--gray-50);
    border: 1px solid var(--gray-70);
    margin-right: 12px;
  }
  .btn-prev:hover { border-color: var(--white); color: var(--white); }
  .form-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
  }
  .btn-submit {
    background: #ff6b3d;
    color: var(--white);
    font-size: 18px;
    padding: 20px 48px;
    width: 100%;
  }
  .btn-submit:hover { background: #E13F07; }

  /* Loading spinner for CEP */
  .cep-loading {
    font-size: 13px;
    color: var(--gray-50);
    margin-top: 6px;
    display: none;
  }
  .cep-loading.visible { display: block; }

  .urgencia-final {
    background: rgba(225, 63, 7, 0.1);
    border: 1px solid rgba(225, 63, 7, 0.2);
    padding: 20px 32px;
    margin-top: 32px;
    text-align: center;
  }
  .urgencia-final strong { color: #ff6b3d; }

  @media (max-width: 600px) {
    .form-row, .form-row-3 { grid-template-columns: 1fr; }
  }

  /* ANIMACOES */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .planos-grid { grid-template-columns: 1fr; }
    .section { padding: 48px 0; }
  }
</style>
</head>
<body>

<!-- ============= SECAO 01: HERO ============= -->
<section class="hero">
  <div>
    <p class="eyebrow">PROPOSTA EXCLUSIVA . {{MES_ANO}}</p>
    <h1 class="display">{{NOME_EMPRESA}}</h1>
    <p style="color: var(--gray-30); margin-top: 16px; font-size: 1.2rem;">{{FRASE_POSICIONAMENTO}}</p>
    <span class="badge-urgencia">VALIDA ATE {{DATA_VALIDADE}}</span>
  </div>
</section>

<!-- ============= SECAO 02: DIAGNOSTICO RESUMIDO ============= -->
<section class="section">
  <div class="container">
    <h2>O que identificamos</h2>
    <ul class="diagnostico-list">
      <li>{{BULLET_DOR_1}}</li>
      <li>{{BULLET_DOR_2}}</li>
      <li>{{BULLET_DOR_3}}</li>
    </ul>
    <div class="verdade-dura">{{VERDADE_DURA}}</div>
  </div>
</section>

<!-- ============= SECAO 03: SELETOR DE PLANOS ============= -->
<section class="section section-alt">
  <div class="container">
    <h2 style="text-align: center;">Sua solucao personalizada</h2>
    <div class="planos-grid">

      <!-- OPCAO A -->
      <div class="plano-card">
        <p class="plano-nome">{{PLANO_A_NOME}}</p>
        <p class="plano-preco">R$ {{PLANO_A_PRECO}}</p>
        <p class="plano-preco-label">por mes</p>
        <p class="plano-setup">Setup: R$ {{PLANO_A_SETUP}}</p>
        <ul class="plano-items">
          <li>{{PLANO_A_ITEM_1}}</li>
          <li>{{PLANO_A_ITEM_2}}</li>
          <li>{{PLANO_A_ITEM_3}}</li>
          <li>{{PLANO_A_ITEM_4}}</li>
          <li>{{PLANO_A_ITEM_5}}</li>
        </ul>
      </div>

      <!-- OPCAO B (RECOMENDADO) -->
      <div class="plano-card recomendado">
        <p class="plano-nome">{{PLANO_B_NOME}}</p>
        <p class="plano-preco">R$ {{PLANO_B_PRECO}}</p>
        <p class="plano-preco-label">por mes</p>
        <p class="plano-setup">Setup: R$ {{PLANO_B_SETUP}}</p>
        <ul class="plano-items">
          <li>{{PLANO_B_ITEM_1}}</li>
          <li>{{PLANO_B_ITEM_2}}</li>
          <li>{{PLANO_B_ITEM_3}}</li>
          <li>{{PLANO_B_ITEM_4}}</li>
          <li>{{PLANO_B_ITEM_5}}</li>
        </ul>
      </div>

      <!-- OPCAO C -->
      <div class="plano-card">
        <p class="plano-nome">{{PLANO_C_NOME}}</p>
        <p class="plano-preco">R$ {{PLANO_C_PRECO}}</p>
        <p class="plano-preco-label">por mes</p>
        <p class="plano-setup">Setup: R$ {{PLANO_C_SETUP}}</p>
        <ul class="plano-items">
          <li>{{PLANO_C_ITEM_1}}</li>
          <li>{{PLANO_C_ITEM_2}}</li>
          <li>{{PLANO_C_ITEM_3}}</li>
          <li>{{PLANO_C_ITEM_4}}</li>
          <li>{{PLANO_C_ITEM_5}}</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<!-- ============= SECAO 04: POR QUE ATACAMA ============= -->
<section class="section">
  <div class="container">
    <h2>Por que Atacama</h2>
    <ul class="diferenciais-list">
      <li>{{DIFERENCIAL_1}}</li>
      <li>{{DIFERENCIAL_2}}</li>
      <li>{{DIFERENCIAL_3}}</li>
      <li>{{DIFERENCIAL_4}}</li>
    </ul>
    <div style="margin-top: 24px;">
      <div class="case-inline">
        <span class="numero">{{CASE_1_RESULTADO}}</span>
        <span style="color: var(--gray-50); margin-left: 8px;">{{CASE_1_NOME}}</span>
      </div>
      <div class="case-inline">
        <span class="numero">{{CASE_2_RESULTADO}}</span>
        <span style="color: var(--gray-50); margin-left: 8px;">{{CASE_2_NOME}}</span>
      </div>
    </div>
  </div>
</section>

<!-- ============= SECAO 05: CONTRATAR AGORA (Multi-step Form) ============= -->
<section class="form-section" id="contratar">
  <div class="container">
    <div class="form-wrapper">

      <!-- Progress bar -->
      <div class="progress-bar">
        <div class="bar current" id="bar-1"></div>
        <div class="bar" id="bar-2"></div>
        <div class="bar" id="bar-3"></div>
        <div class="bar" id="bar-4"></div>
        <div class="bar" id="bar-5"></div>
      </div>

      <form id="contrato-form" action="{{FORM_ACTION}}" method="POST">

        <!-- ===== STEP 1: Selecao do Plano ===== -->
        <div class="form-step active" id="step-1">
          <p class="step-counter">PASSO 1 DE 5</p>
          <h2>Qual plano voce escolhe?</h2>
          <p class="step-sub">Selecione o plano ideal para o seu negocio.</p>

          <label class="plan-option" onclick="selectPlan(this, 'A')">
            <input type="radio" name="plano" value="{{PLANO_A_NOME}}">
            <span class="plan-radio"></span>
            <div>
              <strong>{{PLANO_A_NOME}}</strong>
              <span style="color: var(--gray-50); margin-left: 12px;">R$ {{PLANO_A_PRECO}}/mes</span>
            </div>
          </label>

          <label class="plan-option selected" onclick="selectPlan(this, 'B')">
            <input type="radio" name="plano" value="{{PLANO_B_NOME}}" checked>
            <span class="plan-radio"></span>
            <div>
              <strong>{{PLANO_B_NOME}}</strong>
              <span style="color: #ff6b3d; margin-left: 12px;">RECOMENDADO</span>
              <br><span style="color: var(--gray-50);">R$ {{PLANO_B_PRECO}}/mes</span>
            </div>
          </label>

          <label class="plan-option" onclick="selectPlan(this, 'C')">
            <input type="radio" name="plano" value="{{PLANO_C_NOME}}">
            <span class="plan-radio"></span>
            <div>
              <strong>{{PLANO_C_NOME}}</strong>
              <span style="color: var(--gray-50); margin-left: 12px;">R$ {{PLANO_C_PRECO}}/mes</span>
            </div>
          </label>

          <div class="form-nav">
            <span></span>
            <button type="button" class="btn-next" onclick="nextStep(2)">Continuar</button>
          </div>
        </div>

        <!-- ===== STEP 2: Dados da Empresa ===== -->
        <div class="form-step" id="step-2">
          <p class="step-counter">PASSO 2 DE 5</p>
          <h2>Dados da empresa</h2>
          <p class="step-sub">Informacoes para o contrato.</p>

          <div class="form-group">
            <label>Denominacao Social</label>
            <input type="text" name="razao_social" placeholder="Razao social completa" required>
          </div>
          <div class="form-group">
            <label>CNPJ</label>
            <input type="text" name="cnpj" placeholder="00.000.000/0000-00" required
                   oninput="maskCNPJ(this)">
          </div>
          <div class="form-group">
            <label>E-mail corporativo</label>
            <input type="email" name="email_empresa" placeholder="contato@empresa.com.br" required>
          </div>

          <div class="form-nav">
            <button type="button" class="btn-prev" onclick="prevStep(1)">Voltar</button>
            <button type="button" class="btn-next" onclick="nextStep(3)">Continuar</button>
          </div>
        </div>

        <!-- ===== STEP 3: Endereco da Empresa (CEP auto-fill) ===== -->
        <div class="form-step" id="step-3">
          <p class="step-counter">PASSO 3 DE 5</p>
          <h2>Endereco da empresa</h2>
          <p class="step-sub">Digite o CEP para preenchimento automatico.</p>

          <div class="form-group">
            <label>CEP</label>
            <input type="text" name="cep_empresa" id="cep-empresa" placeholder="00000-000"
                   oninput="maskCEP(this)" onblur="buscaCEP('empresa')">
            <p class="cep-loading" id="cep-loading-empresa">Buscando endereco...</p>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Endereco</label>
              <input type="text" name="endereco_empresa" id="endereco-empresa" placeholder="Rua, Av...">
            </div>
            <div class="form-group">
              <label>Numero</label>
              <input type="text" name="numero_empresa" placeholder="N">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Complemento</label>
              <input type="text" name="complemento_empresa" placeholder="Sala, Andar...">
            </div>
            <div class="form-group">
              <label>Bairro</label>
              <input type="text" name="bairro_empresa" id="bairro-empresa">
            </div>
          </div>
          <div class="form-row-3">
            <div class="form-group">
              <label>Cidade</label>
              <input type="text" name="cidade_empresa" id="cidade-empresa">
            </div>
            <div class="form-group">
              <label>UF</label>
              <input type="text" name="uf_empresa" id="uf-empresa" maxlength="2">
            </div>
            <div class="form-group" style="display:none;">
              <input type="hidden" name="cep_empresa_val" id="cep-empresa-val">
            </div>
          </div>

          <div class="form-nav">
            <button type="button" class="btn-prev" onclick="prevStep(2)">Voltar</button>
            <button type="button" class="btn-next" onclick="nextStep(4)">Continuar</button>
          </div>
        </div>

        <!-- ===== STEP 4: Representante Legal ===== -->
        <div class="form-step" id="step-4">
          <p class="step-counter">PASSO 4 DE 5</p>
          <h2>Representante legal</h2>
          <p class="step-sub">Dados do responsavel pela assinatura do contrato.</p>

          <div class="form-row">
            <div class="form-group">
              <label>Nome completo</label>
              <input type="text" name="rep_nome" required>
            </div>
            <div class="form-group">
              <label>CPF</label>
              <input type="text" name="rep_cpf" placeholder="000.000.000-00"
                     oninput="maskCPF(this)" required>
            </div>
          </div>
          <div class="form-row-3">
            <div class="form-group">
              <label>Nacionalidade</label>
              <input type="text" name="rep_nacionalidade" value="Brasileiro(a)">
            </div>
            <div class="form-group">
              <label>Estado Civil</label>
              <select name="rep_estado_civil">
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
                <option>Viuvo(a)</option>
                <option>Uniao Estavel</option>
              </select>
            </div>
            <div class="form-group">
              <label>Profissao</label>
              <input type="text" name="rep_profissao">
            </div>
          </div>
          <div class="form-row-3">
            <div class="form-group">
              <label>Documento (RG)</label>
              <input type="text" name="rep_rg">
            </div>
            <div class="form-group">
              <label>Orgao Expedidor</label>
              <input type="text" name="rep_orgao" placeholder="SSP/PE">
            </div>
            <div class="form-group">
              <label>Data de Nascimento</label>
              <input type="date" name="rep_nascimento">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Telefone Celular</label>
              <input type="tel" name="rep_celular" placeholder="(00) 00000-0000"
                     oninput="maskPhone(this)" required>
            </div>
            <div class="form-group">
              <label>Telefone Fixo</label>
              <input type="tel" name="rep_fixo" placeholder="(00) 0000-0000"
                     oninput="maskPhone(this)">
            </div>
          </div>
          <div class="form-group">
            <label>E-mail pessoal</label>
            <input type="email" name="rep_email" required>
          </div>

          <div class="form-nav">
            <button type="button" class="btn-prev" onclick="prevStep(3)">Voltar</button>
            <button type="button" class="btn-next" onclick="nextStep(5)">Continuar</button>
          </div>
        </div>

        <!-- ===== STEP 5: Endereco do Representante (CEP auto-fill) + Confirmar ===== -->
        <div class="form-step" id="step-5">
          <p class="step-counter">PASSO 5 DE 5</p>
          <h2>Endereco do representante</h2>
          <p class="step-sub">Digite o CEP para preenchimento automatico.</p>

          <div class="form-group">
            <label>CEP</label>
            <input type="text" name="cep_rep" id="cep-rep" placeholder="00000-000"
                   oninput="maskCEP(this)" onblur="buscaCEP('rep')">
            <p class="cep-loading" id="cep-loading-rep">Buscando endereco...</p>
          </div>
          <div class="form-group">
            <label>Endereco completo</label>
            <input type="text" name="endereco_rep" id="endereco-rep">
          </div>
          <div class="form-row-3">
            <div class="form-group">
              <label>Bairro</label>
              <input type="text" name="bairro_rep" id="bairro-rep">
            </div>
            <div class="form-group">
              <label>Cidade</label>
              <input type="text" name="cidade_rep" id="cidade-rep">
            </div>
            <div class="form-group">
              <label>UF</label>
              <input type="text" name="uf_rep" id="uf-rep" maxlength="2">
            </div>
          </div>

          <div style="margin-top: 40px;">
            <div class="urgencia-final">
              <strong>Vagas limitadas</strong> . Condicao valida por 10 dias . Ate {{DATA_VALIDADE}}
            </div>
          </div>

          <div class="form-nav" style="margin-top: 32px;">
            <button type="button" class="btn-prev" onclick="prevStep(4)">Voltar</button>
            <span></span>
          </div>
          <button type="submit" class="btn-submit" style="margin-top: 16px;">CONFIRMAR E CONTRATAR</button>
          <p style="font-size: 13px; color: var(--gray-50); margin-top: 12px; text-align: center;">
            Ao confirmar, voce sera direcionado para o pagamento seguro do setup.
          </p>
        </div>

      </form>
    </div>
  </div>
</section>

<script>
// ===== NAVEGACAO MULTI-STEP =====
const totalSteps = 5;

function nextStep(n) {
  document.querySelector('.form-step.active').classList.remove('active');
  document.getElementById('step-' + n).classList.add('active');
  updateProgress(n);
  window.scrollTo({ top: document.getElementById('contratar').offsetTop, behavior: 'smooth' });
}

function prevStep(n) {
  document.querySelector('.form-step.active').classList.remove('active');
  document.getElementById('step-' + n).classList.add('active');
  updateProgress(n);
  window.scrollTo({ top: document.getElementById('contratar').offsetTop, behavior: 'smooth' });
}

function updateProgress(current) {
  for (let i = 1; i <= totalSteps; i++) {
    const bar = document.getElementById('bar-' + i);
    bar.className = 'bar';
    if (i < current) bar.classList.add('done');
    if (i === current) bar.classList.add('current');
  }
}

// ===== SELETOR DE PLANO =====
function selectPlan(el, letter) {
  document.querySelectorAll('.plan-option').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
}

// ===== BUSCA CEP (ViaCEP API) =====
async function buscaCEP(tipo) {
  const cepInput = document.getElementById('cep-' + tipo);
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) return;

  const loading = document.getElementById('cep-loading-' + tipo);
  loading.classList.add('visible');

  try {
    const res = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
    const data = await res.json();
    if (!data.erro) {
      const prefix = tipo === 'empresa' ? '' : '';
      document.getElementById('endereco-' + tipo).value = data.logradouro || '';
      document.getElementById('bairro-' + tipo).value = data.bairro || '';
      document.getElementById('cidade-' + tipo).value = data.localidade || '';
      document.getElementById('uf-' + tipo).value = data.uf || '';
    }
  } catch(e) { /* silencioso */ }

  loading.classList.remove('visible');
}

// ===== MASCARAS =====
function maskCNPJ(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 14);
  v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  v = v.replace(/(\d{4})(\d)/, '$1-$2');
  el.value = v;
}

function maskCPF(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  el.value = v;
}

function maskCEP(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 8);
  v = v.replace(/(\d{5})(\d)/, '$1-$2');
  el.value = v;
}

function maskPhone(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/, '($1) $2');
  v = v.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  el.value = v;
}

// ===== SUBMIT =====
document.getElementById('contrato-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Redirecionar para gateway de pagamento com dados
  // {{LINK_PAGAMENTO}} — substituir quando gateway for definido
  const formData = new FormData(this);
  const params = new URLSearchParams(formData).toString();
  window.location.href = '{{LINK_PAGAMENTO}}?' + params;
});
</script>

<!-- FOOTER MINIMO -->
<footer style="text-align: center; padding: 40px; background: var(--black);">
  <p style="font-family: 'Cormorant Unicase', serif; font-size: 1.5rem; font-weight: 600;">Welcome to Clarity.</p>
  <p style="font-size: 12px; color: var(--gray-50); margin-top: 8px;">ATACAMA DIGITAL . RECIFE, PE</p>
</footer>

</body>
</html>
```

---

## Placeholders Tipo B

| Placeholder | Descricao |
|-------------|-----------|
| `{{NOME_EMPRESA}}` | Nome do prospect |
| `{{MES_ANO}}` | "MARCO 2026" |
| `{{DATA_VALIDADE}}` | Data + 10 dias |
| `{{FRASE_POSICIONAMENTO}}` | 1 linha de posicionamento |
| `{{BULLET_DOR_1..3}}` | 3 dores em formato "dor > causa > impacto" |
| `{{VERDADE_DURA}}` | Frase provocativa de impacto |
| `{{PLANO_A/B/C_*}}` | 3 opcoes de plano do catalogo |
| `{{DIFERENCIAL_1..4}}` | 4 diferenciais em 1 linha |
| `{{CASE_1/2_*}}` | 2 cases inline |
| `{{LINK_PAGAMENTO}}` | URL do gateway de pagamento (TBD) |
| `{{FORM_ACTION}}` | URL de destino do formulario (TBD) |

---

## Formulario de Contratacao (Multi-step)

O botao "Contratar Agora" foi substituido por um formulario multi-step estilo Typeform com 5 passos:

| Passo | Conteudo | Campos |
|-------|----------|--------|
| 1 | Selecao do plano | Radio buttons com 3 opcoes (A, B recomendado, C) |
| 2 | Dados da empresa | Denominacao Social, CNPJ, Email |
| 3 | Endereco da empresa | CEP (auto-fill via ViaCEP), Endereco, N, Complemento, Bairro, Cidade, UF |
| 4 | Representante legal | Nome, CPF, Nacionalidade, Estado Civil, Profissao, RG, Orgao, Nascimento, Celular, Fixo, Email |
| 5 | Endereco do representante | CEP (auto-fill via ViaCEP), Endereco, Bairro, Cidade, UF + Botao CONFIRMAR |

### Funcionalidades JS incluidas:
- **Navegacao multi-step** com progress bar visual (5 barras)
- **Busca de CEP automatica** via API ViaCEP (preenche endereco, bairro, cidade, UF)
- **Mascaras de input**: CNPJ (00.000.000/0000-00), CPF (000.000.000-00), CEP (00000-000), Telefone ((00) 00000-0000)
- **Seletor de plano** com radio buttons estilizados
- **Submit** redireciona para `{{LINK_PAGAMENTO}}` com dados do formulario como query params

---

## Notas

- O plano central (B) deve ser o RECOMENDADO e vem pre-selecionado.
- Os planos A e C sao opcoes abaixo e acima do recomendado.
- Se so houver 2 opcoes viaveis, remover a opcao C.
- `{{LINK_PAGAMENTO}}` e `{{FORM_ACTION}}` serao definidos quando o gateway for escolhido. Ate la, usar `#`.
- A busca de CEP usa a API publica ViaCEP (https://viacep.com.br) — gratuita, sem autenticacao.
- O formulario e 100% auto-contido no HTML (JS inline, sem dependencias externas).
