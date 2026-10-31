(function () {
  const D = window.DATA;
  const $ = (id) => document.getElementById(id);
  const page = document.body.dataset.page;

  // ---------- helpers ----------
  function h(tag, props, children) {
    const el = document.createElement(tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else el.setAttribute(k, v);
    });
    [].concat(children || []).forEach((c) => c && el.appendChild(c));
    return el;
  }
  const ext = { target: "_blank", rel: "noopener noreferrer" };

  // ---------- reusable components ----------
  const Button = (label, href, o = {}) =>
    h("a", { class: "btn" + (o.primary ? " primary" : ""), href, text: label, ...(o.external ? ext : {}), ...(o.download ? { download: "" } : {}) });
  const Tags = (items) => h("ul", { class: "tags" }, items.map((t) => h("li", { text: t })));
  const Badge = (text, kind) => h("span", { class: "badge " + (kind || ""), text });
  const Fact = ([k, v]) => h("div", { class: "fact" }, [h("dt", { text: k }), h("dd", { text: v })]);
  const Part = (x, n) => h("div", { class: "part" }, [h("span", { class: "n", text: "0" + (n + 1) }), h("strong", { text: x.name }), h("p", { text: x.text })]);

  // ---------- shared chrome ----------
  const pages = [["home", "index.html", "Home"], ["projects", "projects.html", "Projects"], ["research", "research.html", "Research"], ["experiments", "experiments.html", "Experiments"], ["about", "about.html", "About"]];
  const nav = $("site-nav");
  const links = h("nav", { class: "nav-links", id: "nav-links", "aria-label": "Pages" },
    pages.map(([id, href, label]) => h("a", { href, text: label, ...(id === page ? { class: "active", "aria-current": "page" } : {}) })));
  const menuBtn = h("button", { class: "menu-btn", "aria-label": "Toggle menu", "aria-expanded": "false", "aria-controls": "nav-links", text: "MENU" });
  menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", links.classList.toggle("open")));
  nav.append(h("div", { class: "wrap bar" }, [h("a", { class: "logo", href: "index.html", "aria-label": "Home", text: "HS_" }), menuBtn, links]));

  $("site-footer").append(
    h("div", { class: "wrap foot" }, [
      h("span", { text: "© " + new Date().getFullYear() + " Hrideya Sharma" }),
      h("span", { class: "foot-links" }, [
        h("a", { href: "mailto:" + D.email, text: "Email" }),
        h("a", { href: D.github, text: "GitHub", ...ext }),
        h("a", { href: D.linkedin, text: "LinkedIn", ...ext }),
        h("a", { href: D.resume, text: "Resume", download: "" }),
      ]),
    ])
  );

  // ---------- home ----------
  function renderHome() {
    $("intro").textContent = D.intro;
    $("hero-links").append(
      Button("RESUME", D.resume, { primary: true, download: true }),
      Button("GITHUB", D.github, { external: true }),
      Button("LINKEDIN", D.linkedin, { external: true }),
      Button("EMAIL", "mailto:" + D.email)
    );

    // pixel-art computer (24x23)
    const art = [
      "........................",
      "..BBBBBBBBBBBBBBBBBBBB..",
      "..BLLLLLLLLLLLLLLLLLLB..",
      "..BLSSSSSSSSSSSSSSSSLB..",
      "..BLSGSSSSSSSSSSSSSSLB..",
      "..BLSSGSSSSSSSSSSSSSLB..",
      "..BLSGSSSGGGGSSSSSSSLB..",
      "..BLSSSSSSSSSSSSSSSSLB..",
      "..BLSGGGGGGSSSSSSSSSLB..",
      "..BLSSSSSSSSSSSSSSSSLB..",
      "..BLSGGGGGGGGGSSSSSSLB..",
      "..BLSSSSSSSSSSSSSSSSLB..",
      "..BLSGSSSSSSSSSSSSSSLB..",
      "..BLLLLLLLLLLLLLLLPLLB..",
      "..BBBBBBBBBBBBBBBBBBBB..",
      ".........BBBBBB.........",
      "........BBBBBBBB........",
      "......BBBBBBBBBBBB......",
      "..BBBBBBBBBBBBBBBBBBBB..",
      "..BKKKKKKKKKKKKKKKKKKB..",
      "..BKBKBKBKBKBKBKBKBKKB..",
      "..BBBBBBBBBBBBBBBBBBBB..",
      "........................",
    ];
    const colors = { B: "#2e2e2e", L: "#4a4a4a", S: "#0d140c", G: "#39ff14", K: "#8a8a8a", P: "#b57bff" };
    const ctx = $("sprite").getContext("2d");
    art.forEach((r, y) => [...r].forEach((c, x) => {
      if (colors[c]) { ctx.fillStyle = colors[c]; ctx.fillRect(x, y, 1, 1); }
    }));
  }

  // ---------- projects ----------
  function renderProjects() {
    const dlg = $("case");

    function openCase(p) {
      const s = p.study;
      const close = h("button", { class: "x", "aria-label": "Close", text: "X" });
      close.addEventListener("click", () => dlg.close());
      dlg.replaceChildren(
        h("div", { class: "case-head" }, [
          h("div", {}, [Badge(p.status, p.status === "ONGOING" ? "purple" : ""), h("h2", { id: "case-title", text: p.title }), h("p", { class: "muted", text: p.subtitle })]),
          close,
        ]),
        h("h3", { text: "The problem" }),
        h("p", { text: s.problem }),
        h("h3", { text: p.parts ? "How it works" : "How it was built" }),
        p.parts ? h("div", { class: "parts" }, p.parts.map(Part)) : null,
        h("dl", { class: "steps" }, s.approach.flatMap(([k, v]) => [h("dt", { text: k }), h("dd", { text: v })])),
        h("h3", { text: "Stack" }),
        Tags(p.tech),
        s.status ? h("p", { class: "note", text: s.status }) : null,
        p.link ? h("div", { class: "btn-row" }, [Button("VIEW ON GITHUB", p.link, { primary: true, external: true })]) : null
      );
      dlg.showModal();
      dlg.scrollTop = 0;
    }
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

    D.projects.forEach((p) => {
      const open = h("button", { class: "btn primary", text: "OPEN CASE STUDY" });
      open.addEventListener("click", () => openCase(p));
      $("projects-grid").append(
        h("article", { class: "card" + (p.featured ? " featured" : "") }, [
          Badge(p.status, p.status === "ONGOING" ? "purple" : ""),
          h("h2", { text: p.title }),
          h("p", { class: "muted", text: p.subtitle }),
          h("p", { text: p.summary }),
          p.parts ? h("div", { class: "parts" }, p.parts.map(Part)) : null,
          Tags(p.tech),
          h("div", { class: "btn-row" }, [open, p.link ? Button("GITHUB", p.link, { external: true }) : null]),
        ])
      );
    });
  }

  // ---------- research ----------
  function renderResearch() {
    const pub = D.publication;
    $("publication").append(
      h("article", { class: "card paper" }, [
        h("div", { class: "badges" }, [Badge("PUBLISHED", ""), Badge(pub.venue, "outline")]),
        h("h2", { text: pub.title }),
        ...pub.text.map((t) => h("p", { text: t })),
        h("p", { class: "stat-row" }, [h("span", { class: "stat", text: "≈30%" }), document.createTextNode(" fewer parameters than Vanilla KAN, with better performance on structured learning tasks")]),
        Tags(pub.tech),
        h("div", { class: "btn-row" }, [Button("VIEW PUBLICATION", pub.link, { primary: true, external: true })]),
      ])
    );
    D.research.forEach((r) =>
      $("research-grid").append(
        h("article", { class: "card" }, [
          h("div", { class: "badges" }, [Badge("ONGOING", "purple"), Badge("NO RESULTS REPORTED", "outline")]),
          h("h2", { text: r.title }),
          h("p", { class: "muted", text: r.subtitle }),
          h("blockquote", { text: r.question }),
          ...r.body.map((t) => h("p", { text: t })),
          h("dl", { class: "facts" }, r.facts.map(Fact)),
          Tags(r.tech),
        ])
      )
    );
  }

  // ---------- experiments ----------
  function renderExperiments() {
    D.experiments.forEach((x) =>
      $("experiments-grid").append(
        h("article", { class: "card" }, [
          Badge(x.status, x.status === "EXPLORING" ? "purple" : "outline"),
          h("h2", { text: x.title }),
          h("p", { text: x.text }),
          Tags(x.tech),
        ])
      )
    );
  }

  // ---------- about ----------
  function renderAbout() {
    D.about.forEach((t) => $("about-text").append(h("p", { text: t })));

    D.arsenal.forEach((c) =>
      $("arsenal-grid").append(h("div", { class: "slot" }, [h("h3", { text: c.name }), h("ul", { class: "items" }, c.items.map((t) => h("li", { text: t })))]))
    );

    $("edu").append(
      h("p", {}, [h("strong", { text: D.education.degree }), document.createTextNode(" · " + D.education.school + " · " + D.education.years)]),
      h("ul", { class: "ach" }, D.achievements.map((a) => h("li", { text: a })))
    );

    const row = (k, node) => h("p", { class: "cl" }, [h("span", { class: "prompt", text: k }), node]);
    $("contact-box").append(
      row("email", h("a", { href: "mailto:" + D.email, text: D.email })),
      row("github", h("a", { href: D.github, text: "github.com/hrideya163", ...ext })),
      row("linkedin", h("a", { href: D.linkedin, text: "linkedin.com/in/hrideya-sharma-97861b330", ...ext })),
      h("div", { class: "btn-row" }, [Button("DOWNLOAD RESUME", D.resume, { primary: true, download: true })])
    );
  }

  ({ home: renderHome, projects: renderProjects, research: renderResearch, experiments: renderExperiments, about: renderAbout })[page]();
})();
