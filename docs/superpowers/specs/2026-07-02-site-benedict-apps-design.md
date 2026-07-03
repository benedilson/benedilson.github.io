# Site Benedict Apps — Design

**Data:** 2026-07-02
**Objetivo:** substituir o Google Sites por um site promocional próprio em `https://benedilson.github.io` (GitHub Pages) para os apps Android **Projeto de Vida** e **Rosa a Maria**, com **FreshKeep** como "em breve".

## Contexto

- O repositório `benedilson/benedilson.github.io` já existe e serve o `app-ads.txt` usado na verificação do AdMob — **esse arquivo não pode ser alterado nem removido**.
- O site do desenvolvedor nas fichas da Play Store já aponta para `benedilson.github.io`.
- Fonte de conteúdo: descrições reais das fichas na Play Store e políticas de privacidade hoje hospedadas no Google Sites.

## Decisões de produto

1. **Três layouts de home**, todos embutidos no `index.html`, um visível por vez:
   - **A — One-page:** herói da marca → seção Projeto de Vida → seção Rosa a Maria → FreshKeep (em breve) → contato.
   - **B — Hub:** herói da marca + cards que levam às páginas dedicadas de cada app. **(padrão inicial)**
   - **C — Minimalista:** logo, uma frase, dois cards com botão do Google Play, menção discreta ao FreshKeep ("em breve"), contato.
2. **Três estilos visuais (temas)**, aplicáveis a qualquer layout via variáveis CSS:
   - **Claro e acolhedor** (fundo quente `#faf6ef`, serifada nos títulos, cada app com sua cor). **(padrão inicial)**
   - **Marinho e dourado** (fundo `#0d1b3e→#1a2b5c`, detalhes `#d4af5f`, contemplativo).
   - **Vibrante moderno** (fundo branco, gradientes verde→azul, títulos 800, energia jovem).
3. **Seletor privado:** painel flutuante aberto somente com `?config` na URL; mostra 3 layouts × 3 temas (9 combinações ao vivo). Escolha salva em `localStorage` (afeta só o navegador de quem escolheu). Visitantes veem o padrão (**layout B + tema Claro**). Quando o dono decidir, a combinação vencedora vira o padrão fixo no código.
4. **FreshKeep:** card "Em breve" na home (sem link, sem página própria).
5. **Políticas de privacidade migram** do Google Sites para páginas próprias; depois o dono atualiza as URLs no Play Console. As páginas antigas do Google Sites continuam no ar até lá.
6. **Contato:** noslideneb@gmail.com (mesmo da Play Store).

## Mapa do site

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home com os 3 layouts embutidos (blocos `<section data-layout="a/b/c">`) |
| `projeto-de-vida.html` | Herói + recursos (testes DISC e Holland, carreiras recomendadas, discernimento vocacional) + screenshots + badge Google Play + link privacidade |
| `rosa-a-maria.html` | Herói + recursos (Terço guiado, Lectio Divina, Pedrinhas de Salvação, diário espiritual, orações, mistérios) + screenshots + badge Google Play + link privacidade |
| `privacidade-projeto-de-vida.html` | Texto migrado de `sites.google.com/view/benedict-apps/página-inicial/projeto-de-vida/política-de-privacidade` |
| `privacidade-rosa-a-maria.html` | Texto migrado de `sites.google.com/view/benedict-apps/página-inicial/rosa-a-maria/política-de-privacidade-rosa-a-maria` |
| `404.html` | Página de erro com links para os apps |
| `app-ads.txt` | **Intocado** (`google.com, pub-5086097788622543, DIRECT, f08c47fec0942fa0`) |

## Arquitetura técnica

- **HTML + CSS + JS puro, sem build.** Aprovada a "opção 1": todo o conteúdo pré-renderizado no HTML; o seletor só troca classes no `<body>`.
- `assets/css/style.css` — único CSS compartilhado; temas como conjuntos de variáveis (`--fundo`, `--texto`, `--destaque`, `--destaque-pdv`, `--destaque-rosa`, `--card`...) ativados por classe no `<body>` (`tema-claro`, `tema-marinho`, `tema-vibrante`); layouts por classe `layout-a/b/c` que controla `display` das seções da home.
- `assets/js/config.js` (~60 linhas) — lê `localStorage` e aplica classes ao `<body>` em todas as páginas; se a URL tiver `?config`, injeta o painel de escolha.
- `assets/img/` — ícones e screenshots baixados da Play Store (sem hotlink); badge "Disponível no Google Play" oficial.
- Links dos apps:
  - Projeto de Vida: `https://play.google.com/store/apps/details?id=com.projetovida.app`
  - Rosa a Maria: `https://play.google.com/store/apps/details?id=com.rosamistica.rosa_mistica`
- SEO: `lang="pt-BR"`, meta description e Open Graph por página, títulos únicos.
- Responsivo mobile-first (público majoritariamente mobile).
- Sem analytics, sem cookies (exceto o `localStorage` do seletor) — coerente com apps que valorizam privacidade.

## Fora de escopo

- Página própria do FreshKeep, blog, formulário de contato, i18n, dark mode automático (o tema Marinho cumpre esse papel se escolhido), analytics.

## Critérios de aceite / verificação

1. As 9 combinações (3 layouts × 3 temas) renderizam sem quebra visual em desktop e mobile (screenshots locais antes do push).
2. `?config` abre o painel; sem `?config`, nenhum vestígio visível do seletor; escolha persiste entre páginas e visitas.
3. Visitante sem localStorage vê layout B + tema Claro.
4. Todos os links da Play Store, e-mail e políticas de privacidade funcionam.
5. Após o deploy, `https://benedilson.github.io/app-ads.txt` continua respondendo HTTP 200 com o conteúdo exato.
6. Lighthouse: sem erros graves de acessibilidade (contraste dos 3 temas).
