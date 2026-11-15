(() => {
  "use strict";

  /* ---------- estado ---------- */
  const params = new URLSearchParams(location.search);
  const MODO_TESTE = params.get("teste") === CONFIG.codigoTeste;
  const CHAVE = MODO_TESTE ? "advento-teste" : "advento-" + CONFIG.ano;

  let estado = { feito: {} };
  try { estado = Object.assign(estado, JSON.parse(localStorage.getItem(CHAVE)) || {}); } catch (e) {}
  const guardar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) {} };

  const prenda = (d) => PRENDAS.find((p) => p.dia === d);
  const familiar = (d) => FAMILIA[d - 1] || ["", "🎁"];
  const maiuscula = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- tempo ----------
     Em dezembro Portugal continental está em UTC+0, por isso
     "dia D às 00:01 em Lisboa" = Date.UTC(ano, 11, D, 0, 1). */
  const abreEm = (d) => Date.UTC(CONFIG.ano, 11, d, 0, 1);
  const desbloqueado = (d) => MODO_TESTE || Date.now() >= abreEm(d);
  const diaSemana = (d) => SEMANA[new Date(Date.UTC(CONFIG.ano, 11, d)).getUTCDay()];

  /* ---------- cabeçalho ---------- */
  if (MODO_TESTE) {
    $("#modo-teste").hidden = false;
    $("#reset").onclick = () => { estado = { feito: {} }; guardar(); location.reload(); };
  }

  function atualizaContagem() {
    const prox = PRENDAS.map((p) => p.dia).find((d) => !desbloqueado(d));
    const el = $("#contagem");
    if (!prox) {
      const feitos = Object.keys(estado.feito).length;
      el.innerHTML = feitos >= 24 ? "Todas as portas abertas. Feliz Natal! 🎄" : "Todas as portas já se podem abrir 🎄";
      return;
    }
    let s = Math.max(0, Math.floor((abreEm(prox) - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    const pad = (n) => String(n).padStart(2, "0");
    el.innerHTML = `A porta <b>${prox}</b> abre daqui a <b>${d ? d + "d " : ""}${pad(h)}:${pad(m)}:${pad(s)}</b>`;
  }

  /* ---------- calendário ---------- */
  const ORDEM = [2, 12, 4, 13, 19, 16, 6, 7, 15, 21, 18, 8, 3, 22, 17, 20, 9, 5, 23, 10, 1, 24, 14, 11]; // portas da mesma cor nunca lado a lado

  function hojeLisboa() {
    const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Lisbon", year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(new Date()).reduce((a, x) => ((a[x.type] = +x.value), a), {});
    return p.year === CONFIG.ano && p.month === 12 ? p.day : 0;
  }

  function desenhaCalendario() {
    const cal = $("#calendario");
    const hoje = hojeLisboa();
    cal.innerHTML = "";
    ORDEM.forEach((d) => {
      const p = prenda(d);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "porta";
      b.dataset.dia = d;
      b.style.setProperty("--c", diaSemana(d).cor);
      if (diaSemana(d).texto) b.style.setProperty("--t", diaSemana(d).texto);
      const livre = desbloqueado(d);
      if (!livre) b.classList.add("bloqueada");
      if (d === hoje && !estado.feito[d]) b.classList.add("hoje");
      if (estado.feito[d]) b.classList.add("aberta");
      b.setAttribute("aria-label", `Dia ${d}${livre ? "" : " (fechado)"}`);
      b.innerHTML = `
        <span class="dentro">${estado.feito[d] ? esc(familiar(d)[1]) : ""}</span>
        <span class="folha"><span class="num">${d}</span>${livre ? "" : '<span class="cad">🔒</span>'}</span>`;
      b.onclick = () => clicaPorta(d, b);
      cal.appendChild(b);
    });
  }

  function clicaPorta(d, el) {
    if (!desbloqueado(d)) {
      el.classList.remove("treme"); void el.offsetWidth; el.classList.add("treme");
      const dias = Math.ceil((abreEm(d) - Date.now()) / 86400000);
      aviso(`Calma aí oh campeão que esta só abre dia ${d} de dezembro (${dias === 1 ? "falta 1 dia" : `faltam ${dias} dias`})`);
      return;
    }
    abreModal(d);
  }

  /* ---------- modal ---------- */
  const modal = $("#modal"), conteudo = $("#modal-conteudo");
  let diaAtual = null;
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-fechar]")) fechaModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) fechaModal(); });

  function abreModal(d) {
    diaAtual = d;
    $("#modal-dia").textContent = `${d} de dezembro`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (estado.feito[d]) mostraFinal(d, false);
    else miniJogo(d);
  }
  function fechaModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    conteudo.innerHTML = "";
    diaAtual = null;
  }

  /* ---------- mini-jogos ---------- */
  function miniJogo(d) {
    const fim = () => setTimeout(() => mostraFinal(d, true), 600);
    jogoRaspa(fim, prenda(d));
  }

  function jogoRaspa(fim, p) {
    conteudo.innerHTML = `
      <h3>Raspa para abrir</h3>
      <p class="instr">Usa o dedo (ou o rato) para raspar o dourado.</p>
      <div class="raspa"><span class="por-baixo">${esc(familiar(p.dia)[1])}</span><span class="por-baixo-txt">${esc(maiuscula(familiar(p.dia)[0]))}</span><canvas></canvas></div>`;
    const cv = $(".raspa canvas", conteudo);
    const r = cv.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    cv.width = r.width * dpr; cv.height = r.height * dpr;
    const ctx = cv.getContext("2d");
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, "#d9a94a"); g.addColorStop(.5, "#f5d78a"); g.addColorStop(1, "#b98a2c");
    ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
    ctx.fillStyle = "rgba(90,60,10,.55)";
    ctx.font = "800 18px Nunito, sans-serif"; ctx.textAlign = "center";
    ctx.fillText("✦ RASPA AQUI ✦", r.width / 2, r.height / 2 + 6);
    ctx.globalCompositeOperation = "destination-out";
    let aRaspar = false, feito = false, ultimo = null, contador = 0;
    const ponto = (e) => { const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const raspa = (e) => {
      if (!aRaspar || feito) return;
      const [x, y] = ponto(e);
      ctx.lineWidth = 34; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(...(ultimo || [x, y])); ctx.lineTo(x, y); ctx.stroke();
      ultimo = [x, y];
      if (navigator.vibrate && contador % 3 === 0) navigator.vibrate(12); // vibra enquanto raspa (Android)
      if (++contador % 8 === 0) verifica();
    };
    const verifica = () => {
      const px = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let t = 0, l = 0;
      for (let i = 3; i < px.length; i += 64) { t++; if (px[i] === 0) l++; }
      if (l / t > 0.5) { feito = true; if (navigator.vibrate) navigator.vibrate([40, 60, 80]); cv.style.transition = "opacity .5s"; cv.style.opacity = 0; fim(); }
    };
    cv.addEventListener("pointerdown", (e) => { aRaspar = true; ultimo = null; cv.setPointerCapture(e.pointerId); raspa(e); });
    cv.addEventListener("pointermove", raspa);
    cv.addEventListener("pointerup", () => { aRaspar = false; ultimo = null; });
  }

  /* ---------- depois de raspar ---------- */
  function mostraFinal(d, celebrar) {
    const p = prenda(d);
    const [quem, emoji] = familiar(d);
    const sem = diaSemana(d);
    const bilhete = p.tipo === "vale" || p.tipo === "bilhete" ? `
      <div class="bilhete ${p.tipo} aparece">
        <div class="principal">
          <div class="tipo">${p.tipo === "vale" ? "Vale" : "Bilhete"} · ${d} dez</div>
          <div class="titulo-prenda">${esc(p.titulo)}</div>
          <div class="det">${esc(p.detalhe)}</div>
        </div>
        <div class="canhoto">Admitido</div>
      </div>` : "";
    conteudo.innerHTML = `
      <div class="revelado-emoji">${esc(emoji)}</div>
      <h3>${esc(maiuscula(quem))}</h3>
      <div class="semana" style="--cs:${sem.cor};--ct:${sem.texto || "#fff"}">
        <p class="frase" aria-label="${esc(sem.frase)}…"></p>
        ${p.tipo === "fisica" ? `<p class="abre aparece">open <b>${esc(quem)}</b> 🎁</p>` : ""}
      </div>
      ${bilhete}
      ${p.imagem ? `<img class="img-prenda aparece" src="${esc(p.imagem)}" alt="">` : ""}
      ${p.link ? `<p class="aparece"><a class="btn ouro" href="${esc(p.link)}" target="_blank" rel="noopener">Abrir link</a></p>` : ""}
      <p style="margin-top:18px"><button class="btn sec" type="button" data-fechar>Fechar</button></p>`;
    escreve($(".frase", conteudo), sem.frase + "…", celebrar, () =>
      conteudo.querySelectorAll(".aparece").forEach((el, i) => setTimeout(() => el.classList.add("ver"), i * 250)));
    if (!estado.feito[d]) {
      estado.feito[d] = true; guardar();
      desenhaCalendario();
    }
    if (celebrar) confetis(d === 24 ? 260 : 140);
  }

  // efeito máquina de escrever (só na primeira vez; depois aparece logo)
  function escreve(el, txt, animar, depois) {
    if (!animar || matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = txt; return depois(); }
    let i = 0;
    el.classList.add("a-escrever");
    const t = setInterval(() => {
      el.textContent = txt.slice(0, ++i);
      if (i >= txt.length) { clearInterval(t); el.classList.remove("a-escrever"); setTimeout(depois, 200); }
    }, 38);
  }

  /* ---------- extras ---------- */
  let tAviso;
  function aviso(txt) {
    const a = $("#aviso");
    a.textContent = txt; a.classList.add("ver");
    clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove("ver"), 2600);
  }

  const cvC = $("#confetis"), cC = cvC.getContext("2d");
  let pecas = [], aCorrer = false;
  function confetis(n) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cvC.width = innerWidth; cvC.height = innerHeight;
    const cores = ["#c3392c", "#e2b450", "#2b7457", "#f7efe1", "#ff8fa3"];
    for (let i = 0; i < n; i++) pecas.push({
      x: innerWidth / 2, y: innerHeight / 2, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4,
      r: Math.random() * 6 + 4, c: cores[i % cores.length], a: Math.random() * 6, va: (Math.random() - .5) * .3, v: 1,
    });
    if (!aCorrer) { aCorrer = true; requestAnimationFrame(passo); }
  }
  function passo() {
    cC.clearRect(0, 0, cvC.width, cvC.height);
    pecas.forEach((p) => {
      p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; p.v -= .006;
      cC.save(); cC.globalAlpha = Math.max(p.v, 0); cC.translate(p.x, p.y); cC.rotate(p.a);
      cC.fillStyle = p.c; cC.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); cC.restore();
    });
    pecas = pecas.filter((p) => p.y < cvC.height + 20 && p.v > 0);
    if (pecas.length) requestAnimationFrame(passo); else { aCorrer = false; cC.clearRect(0, 0, cvC.width, cvC.height); }
  }

  (function neve() {
    const n = $("#neve");
    for (let i = 0; i < 40; i++) {
      const f = document.createElement("i");
      const s = Math.random() * 4 + 2;
      f.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;--dx:${(Math.random() - .5) * 80}px;` +
        `animation-duration:${8 + Math.random() * 10}s;animation-delay:${-Math.random() * 18}s;opacity:${.3 + Math.random() * .5}`;
      n.appendChild(f);
    }
  })();

  /* ---------- arranque ---------- */
  desenhaCalendario();
  atualizaContagem();
  setInterval(() => {
    atualizaContagem();
    // quando passa a meia-noite, a porta nova acende sozinha
    const livres = PRENDAS.filter((p) => desbloqueado(p.dia)).length;
    if (livres !== desenhaCalendario.livres) { desenhaCalendario.livres = livres; if (diaAtual === null) desenhaCalendario(); }
  }, 1000);
  desenhaCalendario.livres = PRENDAS.filter((p) => desbloqueado(p.dia)).length;
})();
