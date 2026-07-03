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
    atualizarBotaoTema(tema);
  }

  var botaoTema = null;
  function atualizarBotaoTema(tema) {
    if (botaoTema) botaoTema.textContent = tema === 'marinho' ? '☀️' : '🌙';
  }

  function criarBotaoTema() {
    botaoTema = document.createElement('button');
    botaoTema.type = 'button';
    botaoTema.className = 'botao-tema';
    botaoTema.setAttribute('aria-label', 'Alternar entre tema claro e escuro');
    botaoTema.addEventListener('click', function () {
      var atual = pref('tema', TEMAS, PADRAO.tema);
      salvar('tema', atual === 'marinho' ? 'claro' : 'marinho');
    });
    document.body.appendChild(botaoTema);
    atualizarBotaoTema(pref('tema', TEMAS, PADRAO.tema));
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

  function criarBotaoWhats() {
    var a = document.createElement('a');
    a.className = 'botao-whats';
    a.href = 'https://wa.me/5561991509056?text=' + encodeURIComponent('Olá! Vi o site da Benedict Apps e tenho interesse em um app personalizado.');
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Fale comigo no WhatsApp sobre um app personalizado');
    a.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 .8C7.7.8 1 7.4 1 15.6c0 2.8.8 5.4 2.2 7.7L1 31.2l8.2-2.1c2.2 1.2 4.6 1.8 6.8 1.8 8.3 0 15-6.6 15-14.8S24.3.8 16 .8zm0 27.1c-2.2 0-4.4-.6-6.3-1.7l-.5-.3-4.7 1.2 1.3-4.5-.3-.5c-1.3-2-2-4.3-2-6.6C3.5 8.7 9.1 3.2 16 3.2s12.5 5.5 12.5 12.4S22.9 27.9 16 27.9zm7-9.2c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.3 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.4 1.3-1.4 3.2s1.4 3.7 1.6 4c.2.3 2.8 4.2 6.7 5.9.9.4 1.7.6 2.2.8.9.3 1.8.3 2.5.2.8-.1 2.3-.9 2.7-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5z"/></svg>';
    document.body.appendChild(a);
  }

  criarBotaoTema();
  criarBotaoWhats();
  aplicar();
  if (/[?&]config\b/.test(location.search)) abrirPainel();

  document.querySelectorAll('.ano-atual').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('[data-copiar]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var texto = btn.getAttribute('data-copiar');
      function feito() {
        var original = btn.textContent;
        btn.textContent = 'Copiada! 🙏';
        setTimeout(function () { btn.textContent = original; }, 2500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(feito);
      } else {
        var ta = document.createElement('textarea');
        ta.value = texto;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); feito(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });
})();
