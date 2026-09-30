(function () {
  "use strict";

  var DICT = window.I18N;
  var STAGE_W = 1440, STAGE_H = 900;
  var H_QUERY = window.matchMedia("(min-width: 901px) and (min-height: 561px)");
  var STATION_X = [144, 490, 836, 1182]; // station centers inside .metro (desktop stage px)
  var CV_FILES = { en: "assets/Lucas_Mol_Resume_EN.pdf", pt: "assets/Lucas_Mol_Curriculo_PT.pdf" };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var hwrap = $("#hwrap"), sticky = $(".sticky"), track = $("#track");
  var scenes = $$(".scene");
  var navLinks = $$(".scene-nav a[data-scene]");
  var progressFill = $(".progress-fill"), counter = $("#counter"), hint = $(".scroll-hint");
  var layers = $$(".layer");

  var state = {
    lang: initialLang(),
    mode: "async",
    timeout: false,
    station: 3,
    active: 0,
    horizontal: H_QUERY.matches,
    vw: document.documentElement.clientWidth,
    scale: 1
  };

  function t(key) { return (DICT[state.lang] && DICT[state.lang][key]) || DICT.en[key] || ""; }

  function initialLang() {
    try {
      var saved = localStorage.getItem("lm-lang");
      if (saved === "en" || saved === "pt") return saved;
    } catch (e) { /* storage unavailable */ }
    return (navigator.language || "").toLowerCase().indexOf("pt") === 0 ? "pt" : "en";
  }

  /* ---------- Binary background rows ---------- */
  function fillBinary() {
    var words = "01001000 01100101 01101100 01101100 01101111 00100001".split(" ");
    var rows = "";
    for (var i = 0; i < 18; i++) {
      var shifted = words.slice(i % 6).concat(words.slice(0, i % 6)).join(" ");
      rows += "<div>" + shifted + "  " + words.join(" ") + "</div>";
    }
    $$(".bin").forEach(function (el) { el.innerHTML = rows; });
  }

  /* ---------- Layout ---------- */
  function layout() {
    state.horizontal = H_QUERY.matches;
    state.vw = document.documentElement.clientWidth;
    state.scale = Math.min(state.vw / STAGE_W, window.innerHeight / STAGE_H);
    document.documentElement.style.setProperty("--s", state.scale.toFixed(4));

    if (state.horizontal) {
      scenes.forEach(function (s) { s.style.width = state.vw + "px"; s.style.flexBasis = state.vw + "px"; });
      var trackWidth = state.vw * scenes.length;
      hwrap.style.height = (trackWidth - state.vw + window.innerHeight) + "px";
    } else {
      scenes.forEach(function (s) { s.style.width = ""; s.style.flexBasis = ""; });
      hwrap.style.height = "";
      track.style.transform = "";
    }
    closeMenu();
    update();
  }

  function maxScrollY() { return Math.max(1, hwrap.offsetHeight - window.innerHeight); }
  function maxTrackX() { return Math.max(1, state.vw * (scenes.length - 1)); }

  /* ---------- Scroll → track + parallax ---------- */
  var ticking = false;
  function requestUpdate() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(function () { ticking = false; update(); }); }
  }

  function update() {
    var active = 0, progress = 0;

    if (state.horizontal) {
      var y = window.scrollY - hwrap.offsetTop;
      var p = Math.min(1, Math.max(0, y / maxScrollY()));
      var x = Math.round(p * maxTrackX());
      track.style.transform = "translate3d(" + (-x) + "px,0,0)";

      layers.forEach(function (el) {
        var scene = el.closest(".scene");
        var speed = parseFloat(el.getAttribute("data-speed")) || 1;
        var sceneX = scene.offsetLeft - x;
        var shift = (speed - 1) * sceneX;
        if (el.closest(".stage")) shift = shift / state.scale;
        el.style.transform = "translate(" + Math.round(shift) + "px,0)";
      });

      active = Math.round(x / state.vw);
      progress = (x + state.vw) / (state.vw * scenes.length);
    } else {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      progress = docH > 0 ? window.scrollY / docH : 0;
      scenes.forEach(function (s, i) { if (s.getBoundingClientRect().top <= 140) active = i; });
      layers.forEach(function (el) {
        if (el.classList.contains("bin")) {
          var top = el.closest(".scene").getBoundingClientRect().top;
          el.style.transform = "translate(0," + Math.round(-0.25 * top) + "px)";
        } else {
          el.style.transform = "";
        }
      });
    }

    progressFill.style.width = (Math.min(1, Math.max(0, progress)) * 100).toFixed(2) + "%";
    if (active !== state.active) setActive(active);
  }

  function setActive(i) {
    state.active = i;
    navLinks.forEach(function (a) {
      var on = Number(a.getAttribute("data-scene")) === i;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    counter.textContent = "0" + (i + 1) + " / 0" + scenes.length;
    hint.classList.toggle("is-end", i === scenes.length - 1);
  }

  function scrollToScene(i, instant) {
    i = Math.max(0, Math.min(scenes.length - 1, i));
    if (state.horizontal) {
      var top = hwrap.offsetTop + (i * state.vw / maxTrackX()) * maxScrollY();
      window.scrollTo({ top: top, behavior: instant ? "auto" : "smooth" });
    } else {
      scenes[i].scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
    }
  }

  /* ---------- Navigation ---------- */
  function sceneIndexFromHref(href) {
    if (!href || href.charAt(0) !== "#") return -1;
    var target = document.getElementById(href.slice(1));
    return target ? scenes.indexOf(target) : -1;
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var i = sceneIndexFromHref(a.getAttribute("href"));
    if (i < 0) return;
    e.preventDefault();
    closeMenu();
    scrollToScene(i);
    if (history.replaceState) history.replaceState(null, "", a.getAttribute("href"));
  });

  document.addEventListener("keydown", function (e) {
    if (!state.horizontal || sim.open) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") { e.preventDefault(); scrollToScene(state.active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollToScene(state.active - 1); }
  });

  // Trackpad horizontal swipes move the track too
  window.addEventListener("wheel", function (e) {
    if (state.horizontal && !sim.open && Math.abs(e.deltaX) > Math.abs(e.deltaY)) window.scrollBy(0, e.deltaX);
  }, { passive: true });

  // Keep keyboard focus visible: jump to the scene that holds the focused element
  document.addEventListener("focusin", function (e) {
    if (!state.horizontal) return;
    var scene = e.target.closest && e.target.closest(".scene");
    sticky.scrollLeft = 0; sticky.scrollTop = 0;
    if (scene) { scene.scrollLeft = 0; scene.scrollTop = 0; }
    if (scene && scenes.indexOf(scene) !== state.active) scrollToScene(scenes.indexOf(scene), true);
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $(".menu-btn"), sceneNav = $("#scene-nav");
  function closeMenu() {
    sceneNav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", t("nav.menu"));
  }
  menuBtn.addEventListener("click", function () {
    var open = !sceneNav.classList.contains("is-open");
    sceneNav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", t(open ? "nav.menuClose" : "nav.menu"));
  });

  /* ---------- i18n ---------- */
  function applyLang(lang) {
    state.lang = lang;
    try { localStorage.setItem("lm-lang", lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = t("meta.title");
    var meta = $('meta[name="description"]'); if (meta) meta.setAttribute("content", t("meta.desc"));

    $$("[data-i18n]").forEach(function (el) { var v = t(el.getAttribute("data-i18n")); if (v) el.textContent = v; });
    $$("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    $$("[data-i18n-alt]").forEach(function (el) { el.setAttribute("alt", t(el.getAttribute("data-i18n-alt"))); });
    $$(".lang-toggle button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    $$("[data-cv]").forEach(function (el) { el.setAttribute("href", CV_FILES[lang]); });

    renderArchGrid();
    if (sim.open) buildSim();
    renderJourney();
    var status = $("#form-status"); if (status) status.textContent = "";
  }

  $$(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  /* ---------- Architecture gallery + simulation ---------- */
  // Geometry lives here; texts live in i18n.js (archs.<id>). Coordinates use a 1200×440 canvas.
  var ARCHS = [
    { id: "micro", loop: 7.4,
      nodes: { client: [110, 150], gateway: [370, 150], svcA: [650, 150], svcB: [930, 150], dbA: [650, 330], dbB: [930, 330] },
      edges: [["client", "gateway"], ["gateway", "svcA"], ["svcA", "svcB"], ["svcA", "dbA"], ["svcB", "dbB"]],
      tracks: [
        { k: "req", p: ["client", "gateway", "svcA"], s: 0, d: 1.4 },
        { k: "req", p: ["svcA", "dbA"], s: 1.4, d: 0.6, i: 1 },
        { k: "res", p: ["dbA", "svcA"], s: 2.0, d: 0.6, i: 1 },
        { k: "req", p: ["svcA", "svcB"], s: 2.6, d: 0.7 },
        { k: "req", p: ["svcB", "dbB"], s: 3.3, d: 0.6, i: 1 },
        { k: "res", p: ["dbB", "svcB"], s: 3.9, d: 0.6, i: 1 },
        { k: "res", p: ["svcB", "svcA"], s: 4.5, d: 0.7 },
        { k: "res", p: ["svcA", "gateway", "client"], s: 5.2, d: 1.4 }
      ] },
    { id: "event", loop: 5.6,
      nodes: { client: [110, 150], api: [350, 150], broker: [590, 150], worker: [830, 150], external: [1070, 150], db: [830, 330] },
      edges: [["client", "api"], ["api", "broker"], ["broker", "worker"], ["worker", "external"], ["worker", "db"]],
      tracks: [
        { k: "req", p: ["client", "api"], s: 0, d: 0.9 },
        { k: "req", p: ["api", "broker"], s: 0.9, d: 0.7 },
        { k: "res", p: ["api", "client"], s: 1.1, d: 0.9, tag: "202 Accepted" },
        { k: "req", p: ["broker", "worker"], s: 1.8, d: 0.7 },
        { k: "req", p: ["worker", "external"], s: 2.5, d: 0.7 },
        { k: "res", p: ["external", "worker"], s: 3.2, d: 0.7, i: 1 },
        { k: "req", p: ["worker", "db"], s: 3.9, d: 0.7 }
      ] },
    { id: "hex", loop: 6.0,
      nodes: { client: [100, 225], inAdapter: [330, 225], useCase: [600, 150], domain: [600, 300], outAdapter: [870, 225], db: [1100, 225] },
      edges: [["client", "inAdapter"], ["inAdapter", "useCase"], ["useCase", "domain"], ["useCase", "outAdapter"], ["outAdapter", "db"]],
      deco: [
        { poly: "420,30 780,30 970,225 780,420 420,420 230,225", cls: "hex-outer" },
        { poly: "480,92 720,92 800,225 720,358 480,358 400,225", cls: "hex-inner" }
      ],
      labels: [{ x: 438, y: 58, key: "adapters" }, { x: 498, y: 118, key: "core" }],
      tracks: [
        { k: "req", p: ["client", "inAdapter", "useCase"], s: 0, d: 1.2 },
        { k: "req", p: ["useCase", "domain"], s: 1.2, d: 0.6, i: 1 },
        { k: "res", p: ["domain", "useCase"], s: 1.8, d: 0.6, i: 1 },
        { k: "req", p: ["useCase", "outAdapter", "db"], s: 2.4, d: 1.1 },
        { k: "res", p: ["db", "outAdapter", "useCase", "inAdapter", "client"], s: 3.6, d: 1.9 }
      ] },
    { id: "strangler", loop: 6.0, dashed: ["legacy"],
      nodes: { client: [110, 225], facade: [390, 225], newA: [760, 80], newB: [760, 225], legacy: [760, 370] },
      edges: [["client", "facade"], ["facade", "newA"], ["facade", "newB"], ["facade", "legacy"]],
      labels: [{ x: 880, y: 150, key: "migrated" }, { x: 880, y: 305, key: "remaining" }],
      tracks: [
        { k: "req", p: ["client", "facade", "newA"], s: 0, d: 1.3 },
        { k: "res", p: ["newA", "facade", "client"], s: 1.3, d: 1.3 },
        { k: "req", p: ["client", "facade", "legacy"], s: 2.9, d: 1.3 },
        { k: "res", p: ["legacy", "facade", "client"], s: 4.2, d: 1.3 }
      ] },
    { id: "multi", loop: 7.8,
      nodes: { tA: [110, 80], tB: [110, 225], tC: [110, 370], gateway: [410, 225], services: [700, 225], dA: [1000, 80], dB: [1000, 225], dC: [1000, 370] },
      edges: [["tA", "gateway"], ["tB", "gateway"], ["tC", "gateway"], ["gateway", "services"], ["services", "dA"], ["services", "dB"], ["services", "dC"]],
      tracks: [
        { k: "req", p: ["tA", "gateway", "services", "dA"], s: 0, d: 1.8, tag: "tenant A" },
        { k: "res", p: ["dA", "services", "gateway", "tA"], s: 1.8, d: 1.8 },
        { k: "req", p: ["tC", "gateway", "services", "dC"], s: 3.9, d: 1.8, tag: "tenant C" },
        { k: "res", p: ["dC", "services", "gateway", "tC"], s: 5.7, d: 1.8 }
      ] },
    { id: "sso", loop: 8.4,
      nodes: { user: [110, 225], appA: [400, 100], appB: [400, 350], idp: [720, 225], api: [1040, 100] },
      edges: [["user", "appA"], ["user", "appB"], ["appA", "idp"], ["appB", "idp"], ["appA", "api"]],
      tracks: [
        { k: "req", p: ["user", "appA"], s: 0, d: 0.8 },
        { k: "req", p: ["appA", "idp"], s: 0.8, d: 0.8, tag: "login" },
        { k: "res", p: ["idp", "appA"], s: 1.6, d: 0.8, tag: "token" },
        { k: "req", p: ["appA", "api"], s: 2.4, d: 0.9 },
        { k: "res", p: ["api", "appA", "user"], s: 3.3, d: 1.3 },
        { k: "req", p: ["user", "appB"], s: 4.9, d: 0.8 },
        { k: "req", p: ["appB", "idp"], s: 5.7, d: 0.8 },
        { k: "res", p: ["idp", "appB"], s: 6.5, d: 0.8, tag: "token" },
        { k: "res", p: ["appB", "user"], s: 7.3, d: 0.8 }
      ] }
  ];
  var NW = 176, NH = 64, SVGNS = "http://www.w3.org/2000/svg";

  function svgEl(name, attrs, parent) {
    var el = document.createElementNS(SVGNS, name);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }

  function drawDiagram(svg, arch, mini) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var txt = t("archs")[arch.id];
    (arch.deco || []).forEach(function (d) { svgEl("polygon", { points: d.poly, "class": d.cls }, svg); });
    arch.edges.forEach(function (e) {
      var a = arch.nodes[e[0]], b = arch.nodes[e[1]];
      svgEl("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], "class": "edge" }, svg);
    });
    if (!mini) {
      (arch.labels || []).forEach(function (l) {
        svgEl("text", { x: l.x, y: l.y, "class": "deco-label" }, svg).textContent = txt.labels[l.key];
      });
    }
    var nodeEls = {};
    Object.keys(arch.nodes).forEach(function (id) {
      var c = arch.nodes[id];
      var g = svgEl("g", { "class": "node" + ((arch.dashed || []).indexOf(id) >= 0 ? " dashed" : "") }, svg);
      svgEl("rect", { x: c[0] - NW / 2, y: c[1] - NH / 2, width: NW, height: NH, rx: 14 }, g);
      if (!mini) {
        var lbl = txt.nodes[id];
        svgEl("text", { x: c[0] - NW / 2 + 16, y: c[1] - 4, "class": "nt" }, g).textContent = lbl[0];
        svgEl("text", { x: c[0] - NW / 2 + 16, y: c[1] + 17, "class": "ns" }, g).textContent = lbl[1];
      }
      nodeEls[id] = g;
    });
    return nodeEls;
  }

  // Cards
  var archGrid = $("#arch-grid");
  function renderArchGrid() {
    var txt = t("archs");
    archGrid.innerHTML = "";
    ARCHS.forEach(function (arch, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "arch-card";
      b.setAttribute("aria-haspopup", "dialog");
      var mini = svgEl("svg", { viewBox: "0 0 1200 440", "class": "arch-mini", "aria-hidden": "true" });
      drawDiagram(mini, arch, true);
      b.appendChild(mini);
      var h = document.createElement("span"); h.className = "arch-name"; h.textContent = txt[arch.id].title; b.appendChild(h);
      var p = document.createElement("span"); p.className = "arch-desc"; p.textContent = txt[arch.id].desc; b.appendChild(p);
      var c = document.createElement("span"); c.className = "arch-cta";
      c.innerHTML = esc(t("arch.cta")) + '<svg width="28" height="12" viewBox="0 0 28 12" aria-hidden="true"><path d="M0 6h26M21 1l5 5-5 5"/></svg>';
      b.appendChild(c);
      b.addEventListener("click", function () { openSim(i, b); });
      archGrid.appendChild(b);
    });
  }

  // Simulation dialog
  var sim = $("#sim"), simSvg = $("#sim-svg"), simCanvas = $(".sim-canvas"), simIndex = 0, simRaf = 0, simT0 = 0, simState = null, simOpener = null;

  function pointsFor(arch, path) { return path.map(function (id) { return arch.nodes[id]; }); }
  function along(pts, f) {
    var lens = [], total = 0;
    for (var i = 1; i < pts.length; i++) {
      var l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); lens.push(l); total += l;
    }
    var dist = f * total;
    for (var j = 0; j < lens.length; j++) {
      if (dist <= lens[j] || j === lens.length - 1) {
        var r = lens[j] ? Math.min(1, dist / lens[j]) : 0;
        return [pts[j][0] + (pts[j + 1][0] - pts[j][0]) * r, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * r];
      }
      dist -= lens[j];
    }
    return pts[pts.length - 1];
  }
  function ease(f) { return f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2; }

  function buildSim() {
    var arch = ARCHS[simIndex], txt = t("archs")[arch.id];
    $("#sim-title").textContent = txt.title;
    $("#sim-desc").textContent = txt.desc;
    $("#sim-count").textContent = "0" + (simIndex + 1) + " / 0" + ARCHS.length;
    $("#sim-steps").innerHTML = txt.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
    var nodeEls = drawDiagram(simSvg, arch, false);
    var dots = arch.tracks.map(function (tr) {
      var g = svgEl("g", { "class": "dot " + tr.k + (tr.i ? " internal" : ""), opacity: 0 }, simSvg);
      svgEl("circle", { r: tr.i ? 5 : 8, cx: 0, cy: 0 }, g);
      if (tr.tag) svgEl("text", { x: 0, y: -16, "text-anchor": "middle", "class": "dot-tag" }, g).textContent = tr.tag;
      return { tr: tr, g: g, pts: pointsFor(arch, tr.p) };
    });
    simState = { arch: arch, dots: dots, nodeEls: nodeEls };
    simT0 = performance.now();
  }

  function frame(now) {
    if (!simState) return;
    var arch = simState.arch, time = ((now - simT0) / 1000) % arch.loop, hot = {}, focusX = null;
    simState.dots.forEach(function (d) {
      var tr = d.tr;
      if (time >= tr.s && time < tr.s + tr.d) {
        var pos = along(d.pts, ease((time - tr.s) / tr.d));
        d.g.setAttribute("transform", "translate(" + pos[0].toFixed(1) + "," + pos[1].toFixed(1) + ")");
        d.g.setAttribute("opacity", 1);
        if (focusX === null || !tr.i) focusX = pos[0];
        Object.keys(arch.nodes).forEach(function (id) {
          var c = arch.nodes[id];
          if (Math.abs(c[0] - pos[0]) < NW / 2 && Math.abs(c[1] - pos[1]) < NH / 2) hot[id] = tr.k;
        });
      } else {
        d.g.setAttribute("opacity", 0);
      }
    });
    Object.keys(simState.nodeEls).forEach(function (id) {
      var el = simState.nodeEls[id];
      el.classList.toggle("hot-req", hot[id] === "req");
      el.classList.toggle("hot-res", hot[id] === "res");
    });
    // On narrow screens the diagram scrolls sideways: the "camera" follows the moving dot
    if (simCanvas.scrollWidth > simCanvas.clientWidth + 4 && focusX !== null) {
      var target = focusX * (simCanvas.scrollWidth / 1200) - simCanvas.clientWidth / 2;
      simCanvas.scrollLeft += (target - simCanvas.scrollLeft) * 0.08;
    }
    simRaf = window.requestAnimationFrame(frame);
  }

  function openSim(i, opener) {
    simIndex = i; simOpener = opener || null;
    buildSim();
    if (!sim.open) {
      if (sim.showModal) sim.showModal(); else sim.setAttribute("open", "");
      document.documentElement.classList.add("sim-open");
    }
    window.cancelAnimationFrame(simRaf);
    simRaf = window.requestAnimationFrame(frame);
  }
  function closeSim() {
    window.cancelAnimationFrame(simRaf); simState = null;
    if (sim.open) { if (sim.close) sim.close(); else sim.removeAttribute("open"); }
  }
  sim.addEventListener("close", function () {
    window.cancelAnimationFrame(simRaf); simState = null;
    document.documentElement.classList.remove("sim-open");
    if (simOpener) simOpener.focus({ preventScroll: true });
  });
  sim.addEventListener("click", function (e) { if (e.target === sim) closeSim(); });
  $("#sim-close").addEventListener("click", closeSim);
  $("#sim-prev").addEventListener("click", function () { openSim((simIndex - 1 + ARCHS.length) % ARCHS.length, simOpener); });
  $("#sim-next").addEventListener("click", function () { openSim((simIndex + 1) % ARCHS.length, simOpener); });

  /* ---------- Journey ---------- */
  var metro = $("#metro"), detail = $("#station-detail"), jlist = $("#journey-list");

  function tagsHtml(tags) { return '<ul class="tags">' + tags.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function bulletsHtml(b) { return '<ul class="bullets">' + b.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

  function renderJourney() {
    var stations = t("stations");

    $$(".station", metro).forEach(function (el) { el.remove(); });
    stations.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "station" + (i < state.station ? " is-past" : "");
      b.style.left = STATION_X[i] + "px";
      b.setAttribute("aria-pressed", String(i === state.station));
      b.innerHTML = '<span class="yr">' + esc(s.year) + '</span><span class="st-dot-wrap"><span class="st-dot"></span></span>' +
        '<span class="st-role">' + esc(s.role) + '</span><span class="st-org">' + esc(s.org) + "</span>";
      b.addEventListener("click", function () { state.station = i; renderJourney(); });
      metro.appendChild(b);
    });

    var cx = STATION_X[state.station];
    $(".metro-fill", metro).style.width = (cx - 34) + "px";
    $(".metro-train", metro).style.left = (cx - 34) + "px";

    var cur = stations[state.station];
    detail.innerHTML =
      '<div class="sd-meta"><span class="sd-period">' + esc(cur.period) + '</span><h3 class="sd-role">' + esc(cur.role) +
      '</h3><span class="sd-org">' + esc(cur.org) + "</span></div>" +
      '<div class="sd-body">' + bulletsHtml(cur.bullets) + tagsHtml(cur.tags) + "</div>";

    jlist.innerHTML = stations.slice().reverse().map(function (s) {
      return '<li><span class="jl-period">' + esc(s.period) + '</span><span class="jl-role">' + esc(s.role) +
        '</span><span class="jl-org">' + esc(s.org) + "</span>" + bulletsHtml(s.bullets) + "</li>";
    }).join("");
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var form = $("#contact-form"), statusEl = $("#form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name, email = form.elements.email, msg = form.elements.message;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    [[name, name.value.trim() !== ""], [email, emailOk], [msg, msg.value.trim() !== ""]].forEach(function (pair) {
      pair[0].setAttribute("aria-invalid", String(!pair[1]));
    });
    if (!name.value.trim() || !emailOk || !msg.value.trim()) { statusEl.textContent = t("contact.invalid"); return; }
    var subject = t("contact.subject") + name.value.trim();
    var body = msg.value.trim() + "\n\n— " + name.value.trim() + " <" + email.value.trim() + ">";
    window.location.href = "mailto:lucasmolpro@outlook.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    statusEl.textContent = t("contact.sent");
  });

  /* ---------- Live clocks ---------- */
  var clocks = $$("[data-tz]");
  function tick() {
    var now = new Date();
    clocks.forEach(function (el) {
      try {
        el.textContent = new Intl.DateTimeFormat("en-GB", { timeZone: el.getAttribute("data-tz"), hour: "2-digit", minute: "2-digit" }).format(now);
      } catch (e) { el.textContent = ""; }
    });
  }

  /* ---------- Init ---------- */
  $("#year").textContent = String(new Date().getFullYear());
  fillBinary();
  applyLang(state.lang);
  setActive(0);
  layout();
  tick(); setInterval(tick, 30000);

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", function () { window.requestAnimationFrame(layout); });
  if (H_QUERY.addEventListener) H_QUERY.addEventListener("change", layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  var start = sceneIndexFromHref(window.location.hash);
  if (start > 0) window.requestAnimationFrame(function () { scrollToScene(start, true); });
})();
