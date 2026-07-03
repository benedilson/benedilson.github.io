# Site Benedict Apps — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site promocional da Benedict Apps em `benedilson.github.io` com 3 layouts × 3 temas troláveis via `?config`, páginas dedicadas dos apps Projeto de Vida e Rosa a Maria, e políticas de privacidade migradas.

**Architecture:** HTML/CSS/JS puro sem build. Conteúdo 100% pré-renderizado; temas são conjuntos de variáveis CSS ativados por classe no `<body>` (`tema-claro|tema-marinho|tema-vibrante`); layouts da home são três blocos no `index.html` exibidos por classe (`layout-a|layout-b|layout-c`). `assets/js/config.js` aplica as classes salvas em localStorage e injeta o painel quando a URL tem `?config`.

**Tech Stack:** HTML5, CSS3 (custom properties), JavaScript vanilla, GitHub Pages.

**Repo:** `C:\sites\benedilson.github.io` (branch `main`, remote `origin` = github.com/benedilson/benedilson.github.io)

**Regras invioláveis:**
- `app-ads.txt` não muda NUNCA (verificação AdMob).
- Commits com identidade `Benedilson Lima <35690614+benedilson@users.noreply.github.com>` (já configurada no repo), SEM assinatura de IA.
- Idioma: pt-BR em todo o conteúdo.

**Dados fixos:**
- Play Projeto de Vida: `https://play.google.com/store/apps/details?id=com.projetovida.app`
- Play Rosa a Maria: `https://play.google.com/store/apps/details?id=com.rosamistica.rosa_mistica`
- E-mail: `noslideneb@gmail.com`
- Ícone PDV (512px): `https://play-lh.googleusercontent.com/zdS81Z4QxMFp-pXgOr_5GDKgLglnk5CrKU144mNhi_FSsFhotepnNQUR1TBM4BoMPeI0VAzQXAcQmz-gTO_F26k=w512` (cópia local já em `C:\sites\icon-pdv.png`)
- Ícone Rosa (512px): `https://play-lh.googleusercontent.com/Tt_zfLwNxWuoVZo6f8Y7ZzfPVn6YA0SRPHneyWke0jmstqjzIIrxpKBEloYRrFx9MbwbHBQNNFVeimz7H_V75A=w512` (cópia local já em `C:\sites\icon-rosa.png`)
- Badge Google Play pt-BR: `https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png`
- Política privacidade PDV (origem): `https://sites.google.com/view/benedict-apps/p%C3%A1gina-inicial/projeto-de-vida/pol%C3%ADtica-de-privacidade`
- Política privacidade Rosa (origem): `https://sites.google.com/view/benedict-apps/p%C3%A1gina-inicial/rosa-a-maria/pol%C3%ADtica-de-privacidade-rosa-a-maria`

**Textos-fonte (da Play Store, para basear o copy):**
- PDV: guia de orientação vocacional para jovens; teste DISC (perfil comportamental); teste de Holland (áreas de interesse); carreiras compatíveis; discernimento de vocação religiosa; resultados com gráficos; público: quem escolhe faculdade/curso, quem quer mudar de carreira, quem sente chamado religioso.
- Rosa: acompanhamento espiritual católico inspirado na devoção a Nossa Senhora; Terço completo passo a passo com mistérios do dia; Lectio Divina em 4 passos; Pedrinhas de Salvação (7 práticas diárias: Adoração, Eucaristia, Rosário, Lectio Divina, Confissão, Jejum, Dons do Espírito); Diário Espiritual (dados só no dispositivo); Orações; Mistérios do Rosário com meditações.
- FreshKeep: em breve (sem detalhes públicos — card genérico "novo app chegando").

---

### Task 1: Assets (ícones, badge, screenshots)

**Files:**
- Create: `assets/img/icon-projeto-de-vida.png`, `assets/img/icon-rosa-a-maria.png`, `assets/img/badge-google-play.png`, `assets/img/shots/pdv-1..3.webp`, `assets/img/shots/rosa-1..3.webp`

- [ ] **Step 1:** Copiar ícones já baixados e baixar badge:

```bash
cd /c/sites/benedilson.github.io
mkdir -p assets/img/shots assets/css assets/js
cp /c/sites/icon-pdv.png assets/img/icon-projeto-de-vida.png
cp /c/sites/icon-rosa.png assets/img/icon-rosa-a-maria.png
curl -sL "https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png" -o assets/img/badge-google-play.png
```

- [ ] **Step 2:** Baixar páginas da Play e extrair URLs de screenshots (padrão `=w526-h296` são thumbs paisagem; os de celular usam `=w1052` ou proporção retrato). Selecionar 3 por app olhando as imagens (Read) e salvar como `pdv-1.png`... Depois converter/renomear direto (sem conversão webp se não houver ferramenta — usar .png e ajustar nomes no HTML das tasks seguintes):

```bash
curl -s "https://play.google.com/store/apps/details?id=com.projetovida.app&hl=pt_BR" -A "Mozilla/5.0" -o /tmp/pdv.html
curl -s "https://play.google.com/store/apps/details?id=com.rosamistica.rosa_mistica&hl=pt_BR" -A "Mozilla/5.0" -o /tmp/rosa.html
grep -o -E 'https://play-lh\.googleusercontent\.com/[A-Za-z0-9_=-]{40,}=w526-h296' /tmp/pdv.html | sort -u
# baixar cada uma com sufixo =w800 para melhor resolução
```

Se não houver screenshots utilizáveis (apps podem ter poucos), seguir com 2 por app; se zero, remover a seção de screenshots das páginas (decisão registrada no commit).

- [ ] **Step 3:** Verificar: `ls -la assets/img assets/img/shots` mostra os arquivos com tamanho > 0; abrir os PNG com Read pra confirmar que são as imagens certas.

- [ ] **Step 4:** Commit: `git add assets && git commit -m "Adiciona icones, badge e screenshots dos apps"`

---

### Task 2: CSS compartilhado com 3 temas e 3 layouts

**Files:**
- Create: `assets/css/style.css`

- [ ] **Step 1:** Escrever `assets/css/style.css` com esta estrutura (código completo abaixo é o esqueleto obrigatório; componentes seguem os mockups aprovados no brainstorm):

```css
/* ===== Reset básico ===== */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
img{max-width:100%;display:block}
a{color:inherit}

/* ===== Temas (variáveis) ===== */
body.tema-claro{
  --fundo:#faf6ef; --fundo-hero:#faf6ef;
  --texto:#2b2b2b; --texto-suave:#6b6b6b;
  --card:#ffffff; --borda:#e4dcc8;
  --marca:#8a7a5c; --pdv:#2e7d32; --rosa:#1a237e; --ouro:#b8935a;
  --sombra:0 2px 8px rgba(0,0,0,.07);
  --fonte-titulo:Georgia,'Times New Roman',serif;
}
body.tema-marinho{
  --fundo:#0d1b3e; --fundo-hero:linear-gradient(160deg,#0d1b3e,#1a2b5c);
  --texto:#f5f0e6; --texto-suave:#a9b3cf;
  --card:rgba(255,255,255,.07); --borda:rgba(212,175,95,.4);
  --marca:#d4af5f; --pdv:#9ccc65; --rosa:#d4af5f; --ouro:#d4af5f;
  --sombra:0 2px 12px rgba(0,0,0,.35);
  --fonte-titulo:Georgia,'Times New Roman',serif;
}
body.tema-vibrante{
  --fundo:#ffffff; --fundo-hero:linear-gradient(135deg,#e8f5e9,#e3f2fd);
  --texto:#111111; --texto-suave:#555555;
  --card:#f6f8fb; --borda:#e0e6ef;
  --marca:#1565c0; --pdv:#2e7d32; --rosa:#283593; --ouro:#f9a825;
  --sombra:0 4px 14px rgba(21,101,192,.12);
  --fonte-titulo:system-ui,'Segoe UI',Arial,sans-serif;
}
body{background:var(--fundo);color:var(--texto);font-family:system-ui,'Segoe UI',Arial,sans-serif;line-height:1.6}

/* ===== Alternância de layouts da home ===== */
.home-a,.home-b,.home-c{display:none}
body.layout-a .home-a{display:block}
body.layout-b .home-b{display:block}
body.layout-c .home-c{display:block}
```

Componentes obrigatórios (classes): `.container` (max-width:1040px), `.hero`, `.marca` (label uppercase com letter-spacing), `.card-app` (ícone+texto+badge), `.grid-recursos` (grid responsivo de features com emoji), `.btn-play` (badge do Google Play, height 56px), `.selo-breve` (card FreshKeep com opacidade reduzida e etiqueta "EM BREVE"), `.rodape` (contato + links + crédito), `.painel-config` (painel flutuante fixed bottom-right, z-index alto), `.shots` (scroll horizontal de screenshots com `overflow-x:auto`). Media query única `@media (max-width:720px)`.

- [ ] **Step 2:** Verificar sintaxe abrindo em navegador na Task 4 (CSS não tem teste isolado; validação visual vem com o HTML).

- [ ] **Step 3:** Commit: `git add assets/css && git commit -m "Adiciona folha de estilo com temas claro, marinho e vibrante"`

---

### Task 3: config.js (aplicação de tema/layout + painel ?config)

**Files:**
- Create: `assets/js/config.js`

- [ ] **Step 1:** Escrever `assets/js/config.js` (código completo):

```js
(function () {
  var PADRAO = { layout: 'b', tema: 'claro' };
  var LAYOUTS = { a: 'One-page', b: 'Hub', c: 'Minimalista' };
  var TEMAS = { claro: 'Claro e acolhedor', marinho: 'Marinho e dourado', vibrante: 'Vibrante moderno' };

  function pref(chave, valido, padrao) {
    var v = null;
    try { v = new URLSearchParams(location.search).get(chave); } catch (e) {}
    if (valido[v]) { try { localStorage.setItem('ba-' + chave, v); } catch (e) {} return v; }
    try { v = localStorage.getItem('ba-' + chave); } catch (e) {}
    return valido[v] ? v : padrao;
  }

  function aplicar() {
    var layout = pref('layout', LAYOUTS, PADRAO.layout);
    var tema = pref('tema', TEMAS, PADRAO.tema);
    document.body.className = document.body.className
      .replace(/\b(layout|tema)-\S+/g, '').trim();
    document.body.classList.add('layout-' + layout, 'tema-' + tema);
  }

  function salvar(chave, valor) {
    try { localStorage.setItem('ba-' + chave, valor); } catch (e) {}
    aplicar();
    marcar();
  }

  var painel = null;
  function marcar() {
    if (!painel) return;
    var layout = pref('layout', LAYOUTS, PADRAO.layout);
    var tema = pref('tema', TEMAS, PADRAO.tema);
    painel.querySelectorAll('button[data-k]').forEach(function (b) {
      b.classList.toggle('ativo',
        (b.dataset.k === 'layout' && b.dataset.v === layout) ||
        (b.dataset.k === 'tema' && b.dataset.v === tema));
    });
  }

  function grupo(titulo, chave, opcoes) {
    var html = '<div class="grupo"><strong>' + titulo + '</strong>';
    Object.keys(opcoes).forEach(function (v) {
      html += '<button type="button" data-k="' + chave + '" data-v="' + v + '">' + opcoes[v] + '</button>';
    });
    return html + '</div>';
  }

  function abrirPainel() {
    painel = document.createElement('div');
    painel.className = 'painel-config';
    painel.innerHTML = '<strong>⚙️ Configuração do site</strong>' +
      grupo('Layout da home', 'layout', LAYOUTS) +
      grupo('Estilo visual', 'tema', TEMAS) +
      '<small>Salvo só neste navegador. Visitantes veem o padrão.</small>';
    painel.addEventListener('click', function (e) {
      if (e.target.dataset && e.target.dataset.k) salvar(e.target.dataset.k, e.target.dataset.v);
    });
    document.body.appendChild(painel);
    marcar();
  }

  aplicar();
  if (/[?&]config\b/.test(location.search)) abrirPainel();
})();
```

- [ ] **Step 2:** Teste manual mínimo já na Task 4 (o script depende do body existir — incluir com `<script src="assets/js/config.js"></script>` antes de `</body>` em TODAS as páginas).

- [ ] **Step 3:** Commit: `git add assets/js && git commit -m "Adiciona seletor privado de layout e tema"`

---

### Task 4: index.html com os 3 layouts

**Files:**
- Modify: `index.html` (substitui o placeholder atual)

- [ ] **Step 1:** Reescrever `index.html`. Estrutura obrigatória (head com SEO, três blocos de home, rodapé comum):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Benedict Apps — Apps com propósito</title>
  <meta name="description" content="Apps para vocação, fé e crescimento pessoal: Projeto de Vida (orientação vocacional) e Rosa a Maria (vida de oração católica).">
  <meta property="og:title" content="Benedict Apps — Apps com propósito">
  <meta property="og:description" content="Projeto de Vida e Rosa a Maria: descubra sua vocação e aprofunde sua vida de oração.">
  <meta property="og:image" content="https://benedilson.github.io/assets/img/icon-projeto-de-vida.png">
  <link rel="icon" href="assets/img/icon-projeto-de-vida.png">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="layout-b tema-claro">
  <!-- ===== LAYOUT A: one-page ===== -->
  <div class="home-a"> ... </div>
  <!-- ===== LAYOUT B: hub (padrão) ===== -->
  <div class="home-b"> ... </div>
  <!-- ===== LAYOUT C: minimalista ===== -->
  <div class="home-c"> ... </div>
  <footer class="rodape"> ... </footer>
  <script src="assets/js/config.js"></script>
</body>
</html>
```

Conteúdo de cada bloco (copy aprovado no brainstorm — usar exatamente):
- Tagline da marca: **"Apps com propósito para a sua caminhada"**; subtítulo: **"Vocação, fé e crescimento pessoal — direto no seu celular."**
- **home-a (one-page):** herói da marca → seção PDV (ícone, título verde, 4 bullets: teste DISC, teste de Holland, carreiras pro seu perfil, discernimento vocacional; badge Play + link "saiba mais" → projeto-de-vida.html) → seção Rosa (ícone, título, 4 bullets: Terço passo a passo, Lectio Divina, Pedrinhas de Salvação, Diário espiritual; badge Play + link → rosa-a-maria.html) → card FreshKeep "EM BREVE — um novo app da Benedict Apps está chegando" → âncora de contato.
- **home-b (hub):** herói da marca + dois `.card-app` grandes e clicáveis (ícone 96px, nome, frase de 1 linha: PDV "Descubra sua vocação com testes sérios e orientação de verdade." / Rosa "Reze o Terço, medite a Palavra e acompanhe sua vida espiritual." + botão "Conhecer o app" → página dedicada + badge Play) + `.selo-breve` FreshKeep.
- **home-c (minimalista):** centralizado; marca, tagline, dois cards compactos (ícone 64px + nome + badge Play), linha "FreshKeep — em breve", e-mail.
- Rodapé comum: "Benedict Apps · Brasília, Brasil" + mailto + links das políticas de privacidade + links das fichas na Play.

- [ ] **Step 2:** Subir servidor local e verificar:

```bash
cd /c/sites/benedilson.github.io && npx -y http-server -p 8099
# noutra chamada: curl -s localhost:8099 | grep -c "home-a\|home-b\|home-c"  → 3 ocorrências+
```

Abrir `http://localhost:8099/?config` com msedge headless e capturar screenshot de cada uma das 9 combinações NA TASK 8 (aqui basta: layout B/tema claro renderiza sem erro no console).

- [ ] **Step 3:** Commit: `git add index.html && git commit -m "Cria home com layouts one-page, hub e minimalista"`

---

### Task 5: Páginas dos apps

**Files:**
- Create: `projeto-de-vida.html`, `rosa-a-maria.html`

- [ ] **Step 1:** Criar `projeto-de-vida.html`: head próprio (title "Projeto de Vida — descubra sua vocação | Benedict Apps"; description usando o texto da ficha), nav simples de volta pra home, herói (ícone + headline **"Você sabe para onde está indo na vida?"** + parágrafo da ficha), `.grid-recursos` com 6 cards (🔍 Teste DISC — seu perfil comportamental; 🧭 Teste de Holland — suas áreas de interesse; 💼 Carreiras pro seu perfil; ✝️ Discernimento vocacional — a vida religiosa pode ser um chamado?; 📊 Resultados com gráficos e explicações; 🎯 Pra quem está escolhendo faculdade, mudando de carreira ou explorando um chamado), seção `.shots` com os screenshots baixados, CTA final com badge Play, rodapé com link da política de privacidade do app. `<script src="assets/js/config.js">` no fim (tema respeitado; layout não afeta páginas internas).

- [ ] **Step 2:** Criar `rosa-a-maria.html` no mesmo molde: headline **"Um companheiro para a sua vida de oração"**, 6 cards (📿 Terço completo passo a passo com os mistérios do dia; 📖 Lectio Divina nos 4 passos tradicionais; ✝️ Pedrinhas de Salvação — 7 práticas diárias; 📝 Diário Espiritual — seus dados ficam só no seu aparelho; 🙏 Tesouro de orações da Igreja; 🌟 Mistérios com meditações e frutos), screenshots, CTA badge Play, política de privacidade. Fechamento: *"Que Nossa Senhora abençoe sua jornada de fé. Ave Maria!"*

- [ ] **Step 3:** Verificar: `curl -s localhost:8099/projeto-de-vida.html | grep -c "DISC"` ≥ 1; abrir ambas no navegador (temas trocam via ?config).

- [ ] **Step 4:** Commit: `git add projeto-de-vida.html rosa-a-maria.html && git commit -m "Cria paginas dedicadas dos apps"`

---

### Task 6: Políticas de privacidade migradas

**Files:**
- Create: `privacidade-projeto-de-vida.html`, `privacidade-rosa-a-maria.html`

- [ ] **Step 1:** Buscar o texto atual das duas políticas no Google Sites (WebFetch nas duas URLs listadas no cabeçalho; se WebFetch falhar por render JS, usar `curl -sL` e extrair texto do HTML). O texto migrado deve ser fiel ao original — sem reescrever cláusulas.

- [ ] **Step 2:** Criar as duas páginas com template simples: head próprio (title "Política de Privacidade — <App>"), `.container` estreito (max-width:720px), texto em `<h1>/<h2>/<p>/<ul>`, data de vigência do original, e-mail de contato, link de volta pra página do app. Incluir `config.js` (tema).

- [ ] **Step 3:** Verificar: as duas páginas abrem, texto legível nos 3 temas (checar contraste no tema marinho).

- [ ] **Step 4:** Commit: `git add privacidade-*.html && git commit -m "Migra politicas de privacidade para o site"`

- [ ] **Step 5:** Registrar pendência PÓS-DEPLOY para o dono: atualizar as URLs de política de privacidade no Play Console dos dois apps para as novas páginas.

---

### Task 7: 404.html

**Files:**
- Create: `404.html`

- [ ] **Step 1:** Criar `404.html` (GitHub Pages usa esse nome automaticamente): mensagem "Página não encontrada", link pra home e cards mini dos dois apps. Mesmo head/CSS/config.js.

- [ ] **Step 2:** Verificar: `curl -s -o /dev/null -w "%{http_code}" localhost:8099/nao-existe` → http-server devolve o 404 padrão local (ok); a rota real só é testável pós-deploy (`https://benedilson.github.io/nao-existe` → página customizada).

- [ ] **Step 3:** Commit: `git add 404.html && git commit -m "Adiciona pagina 404"`

---

### Task 8: Verificação das 9 combinações + acessibilidade

- [ ] **Step 1:** Com o servidor local no ar, gerar screenshots headless das 9 combinações (o config.js da Task 3 já lê `?layout=x&tema=y` com precedência sobre o localStorage):

```bash
cd /c/sites/benedilson.github.io
for L in a b c; do for T in claro marinho vibrante; do
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu \
    --screenshot="shots-review/home-$L-$T.png" --window-size=1280,900 \
    "http://localhost:8099/?layout=$L&tema=$T" 2>/dev/null; sleep 1
done; done
```

(Se o msedge não estiver nesse caminho, localizar com `ls "/c/Program Files"*/Microsoft/Edge/Application/msedge.exe`. `shots-review/` NÃO é commitado — adicionar ao .gitignore.)

- [ ] **Step 2:** Read em cada screenshot; conferir: nada sobreposto, texto legível, badge visível, FreshKeep presente. Repetir com `--window-size=390,844` (mobile) para as 3 combinações com layout padrão de cada tema.

- [ ] **Step 3:** Corrigir problemas visuais encontrados; re-capturar até limpo.

- [ ] **Step 4:** Checar contraste: no tema marinho, `--texto-suave:#a9b3cf` sobre `#0d1b3e` ≈ 7:1 (ok); validar visualmente links dourados. Ajustar variáveis se necessário.

- [ ] **Step 5:** Commit: `git add -A && git commit -m "Ajustes visuais das combinacoes de layout e tema"`

---

### Task 9: Deploy e verificação pós-push

- [ ] **Step 1:** Revisão final: `git status` limpo de sobras; `cat app-ads.txt` confere byte a byte.

- [ ] **Step 2:** `git push`

- [ ] **Step 3:** Aguardar workflow "pages build and deployment" concluir:

```bash
gh run list --repo benedilson/benedilson.github.io --limit 1
```

(Se falhar com erro genérico, reexecutar: já aconteceu antes neste repo e resolve com retry/commit vazio.)

- [ ] **Step 4:** Verificar produção:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://benedilson.github.io/            # 200
curl -s https://benedilson.github.io/app-ads.txt                                  # linha exata do AdMob
curl -s -o /dev/null -w "%{http_code}\n" https://benedilson.github.io/projeto-de-vida.html   # 200
curl -s -o /dev/null -w "%{http_code}\n" https://benedilson.github.io/rosa-a-maria.html      # 200
curl -s -o /dev/null -w "%{http_code}\n" https://benedilson.github.io/nao-existe  # 404 (com página custom)
```

- [ ] **Step 5:** Avisar o dono: site no ar; testar `https://benedilson.github.io/?config` no celular e no desktop; escolher layout/tema vencedor; depois atualizar URLs de privacidade no Play Console. Quando ele decidir, trocar o padrão em `index.html` (`<body class="layout-X tema-Y">`) e nas demais páginas (`tema-Y`), commit "Define layout e tema padrao do site".
