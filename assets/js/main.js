/* =========================================================
   CASABIO — scripts do site
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      menuBtn.classList.toggle('aberto', aberto);
      menuBtn.setAttribute('aria-expanded', String(aberto));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('aberto');
        menuBtn.classList.remove('aberto');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('aberto');
        menuBtn.classList.remove('aberto');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Sombra do header ao rolar ---------- */
  var topo = document.querySelector('.topo');
  if (topo) {
    var aoRolar = function () {
      topo.classList.toggle('rolado', window.scrollY > 8);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
  }

  /* ---------- Revelar elementos ao entrar na tela ---------- */
  var alvos = document.querySelectorAll('.revelar');

  if (alvos.length) {
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          var el = entrada.target;
          var atraso = parseInt(el.dataset.atraso || '0', 10);
          setTimeout(function () { el.classList.add('visivel'); }, atraso);
          obs.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      alvos.forEach(function (el) { obs.observe(el); });
    } else {
      alvos.forEach(function (el) { el.classList.add('visivel'); });
    }
  }

  /* ---------- Contadores animados ---------- */
  var contadores = document.querySelectorAll('[data-contador]');

  function formatar(n) {
    return n.toLocaleString('pt-BR');
  }

  function animar(el) {
    var alvo = parseFloat(el.dataset.contador);
    var duracao = 1800;
    var inicio = null;

    function passo(agora) {
      if (inicio === null) inicio = agora;
      var p = Math.min((agora - inicio) / duracao, 1);
      // easeOutExpo
      var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = formatar(Math.round(alvo * e));
      if (p < 1) requestAnimationFrame(passo);
      else el.textContent = formatar(alvo);
    }
    requestAnimationFrame(passo);
  }

  if (contadores.length) {
    var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduzido || !('IntersectionObserver' in window)) {
      contadores.forEach(function (el) {
        el.textContent = formatar(parseFloat(el.dataset.contador));
      });
    } else {
      var obsNum = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          animar(entrada.target);
          obsNum.unobserve(entrada.target);
        });
      }, { threshold: 0.5 });

      contadores.forEach(function (el) {
        el.textContent = '0';
        obsNum.observe(el);
      });
    }
  }

  /* ---------- Filtro de produtos ---------- */
  var filtros = document.querySelectorAll('.filtro');
  var itens = document.querySelectorAll('[data-categoria]');

  function aplicarFiltro(btn) {
    var alvo = btn.dataset.filtro;
    filtros.forEach(function (b) {
      b.classList.toggle('ativo', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    itens.forEach(function (item) {
      item.classList.toggle('oculto', !(alvo === 'todos' || item.dataset.categoria === alvo));
    });
  }

  if (filtros.length && itens.length) {
    // Permite abrir a página já filtrada via #estacoes ou #cisternas
    var doHash = document.querySelector('.filtro[data-filtro="' + location.hash.slice(1) + '"]');
    if (doHash) aplicarFiltro(doHash);

    filtros.forEach(function (btn) {
      btn.addEventListener('click', function () { aplicarFiltro(btn); });
    });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  var form = document.querySelector('[data-form-whatsapp]');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var dados = new FormData(form);
      var nome = (dados.get('nome') || '').toString().trim();
      var cidade = (dados.get('cidade') || '').toString().trim();
      var interesse = (dados.get('interesse') || '').toString().trim();
      var mensagem = (dados.get('mensagem') || '').toString().trim();

      var linhas = ['Olá! Vim pelo site da CASABIO.', ''];
      if (nome) linhas.push('*Nome:* ' + nome);
      if (cidade) linhas.push('*Cidade:* ' + cidade);
      if (interesse) linhas.push('*Interesse:* ' + interesse);
      if (mensagem) linhas.push('', mensagem);

      var numero = form.dataset.formWhatsapp;
      var url = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(linhas.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
