(function () {
  var PADRAO = { layout: 'b', tema: 'marinho' };
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
