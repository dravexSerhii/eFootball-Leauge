(function () {
  const CARDS = window.EF_CARDS || [];
  let lang = localStorage.getItem("leagueLang") === "ru" ? "ru" : "en";
  const state = { q: "", pos: "all", sort: "rating", view: "grid" };

  const T = {
    en: {
      title: "eFootball Card Database", back: "← League", search: "Search name, club, nation…",
      allPos: "All positions", cards: "Cards", table: "Table", count: (n) => `${n} card${n === 1 ? "" : "s"}`,
      empty: "No cards found.", sortRating: "Sort: Rating", sortName: "Sort: Name", sortPos: "Sort: Position", sortUpd: "Sort: Newest",
      grpAttack: "ATTACKING", grpDefense: "DEFENDING", grpStrength: "STRENGTH",
      attrs: {
        attack: ["Offensive Awareness", "Ball Control", "Dribbling", "Tight Possession", "Low Pass", "Lofted Pass", "Finishing", "Heading", "Set Piece Taking", "Curl"],
        defense: ["Defensive Awareness", "Defensive Engagement", "Tackling", "Aggression", "GK Awareness", "GK Catching", "GK Parrying", "GK Reflexes", "GK Reach"],
        strength: ["Speed", "Acceleration", "Kicking Power", "Jump", "Physical Contact", "Balance", "Stamina"]
      },
      stats: ["Offensive Awareness", "Ball Control", "Dribbling", "Finishing", "Speed", "Physical Contact"],
      short: ["OFF", "BAL", "DRI", "FIN", "SPD", "PHY"],
      name: "Name", rating: "OVR", pos: "Pos", club: "Club", nation: "Nation", type: "Series", style: "Playing style",
      skill: "Key skill", updated: "Updated"
    },
    ru: {
      title: "База карточек eFootball", back: "← Лига", search: "Поиск: имя, клуб, страна…",
      allPos: "Все позиции", cards: "Карточки", table: "Таблица", count: (n) => `Карточек: ${n}`,
      empty: "Карточки не найдены.", sortRating: "Сорт.: Рейтинг", sortName: "Сорт.: Имя", sortPos: "Сорт.: Позиция", sortUpd: "Сорт.: Новые",
      grpAttack: "АТАКА", grpDefense: "ЗАЩИТА", grpStrength: "СИЛА",
      attrs: {
        attack: ["Умение атаковать", "Контроль мяча", "Дриблинг", "Удержание мяча", "Пас низом", "Пас навесом", "Реализация", "Игра головой", "Исполнение стандартов", "Подкрутка"],
        defense: ["Умение защищаться", "Вовлеченность в защиту", "Подкаты", "Агрессия", "Вратарские навыки", "Фиксация мяча", "Парирование", "Реакция", "Зона отражения"],
        strength: ["Скорость", "Ускорение", "Сила удара", "Прыгучесть", "Устойч. при толчках", "Баланс", "Выносливость"]
      },
      stats: ["Игра в атаке", "Контроль мяча", "Дриблинг", "Завершение", "Скорость", "Борьба"],
      short: ["АТК", "КОН", "ДРИ", "ЗАВ", "СКО", "БОР"],
      name: "Имя", rating: "РЕЙТ", pos: "Поз", club: "Клуб", nation: "Страна", type: "Серия", style: "Стиль игры",
      skill: "Ключевой навык", updated: "Обновлено"
    }
  };

  const $ = (id) => document.getElementById(id);
  const t = () => T[lang];
  const photoUrl = (c) => c.photo;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function cardEl(c) {
    const card = el("button", "ef-card");
    card.type = "button";
    card.dataset.series = c.type.toLowerCase();
    const img = el("img", "ef-photo");
    img.src = photoUrl(c);
    img.alt = c.name;
    img.loading = "lazy";
    const rate = el("div", "ef-rate");
    rate.append(el("b", "", String(c.rating)), el("span", "", c.pos));
    const name = el("div", "ef-name", c.name);
    const grade = el("div", "ef-grade", "S+");
    card.append(img, rate, grade, name);
    card.addEventListener("click", () => openDetail(c));
    return card;
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    const list = CARDS.filter((c) => {
      if (state.pos !== "all" && c.pos !== state.pos) return false;
      if (!q) return true;
      return [c.name, c.club, c.nation, c.pos, c.type, c.playstyle].join(" ").toLowerCase().includes(q);
    });
    const s = state.sort;
    list.sort((a, b) => {
      if (s === "name") return a.name.localeCompare(b.name);
      if (s === "pos") return a.pos.localeCompare(b.pos) || b.rating - a.rating;
      if (s === "updated") return (b.updated || "").localeCompare(a.updated || "") || b.rating - a.rating;
      return b.rating - a.rating || a.name.localeCompare(b.name);
    });
    return list;
  }

  function renderTable(list) {
    const tt = t();
    const table = el("table", "db-table");
    const head = el("tr");
    [tt.name, tt.rating, tt.pos, tt.club, tt.nation, tt.type, ...tt.short].forEach((h) => head.append(el("th", "", h)));
    const thead = el("thead");
    thead.append(head);
    table.append(thead);
    const body = el("tbody");
    list.forEach((c) => {
      const tr = el("tr");
      tr.append(el("td", "db-td-name", c.name), el("td", "db-td-rate", String(c.rating)), el("td", "", c.pos),
        el("td", "", c.club), el("td", "", c.nation), el("td", "", c.type));
      c.stats.forEach((v) => tr.append(el("td", "db-td-stat", String(v))));
      tr.addEventListener("click", () => openDetail(c));
      body.append(tr);
    });
    table.append(body);
    $("dbTable").replaceChildren(table);
  }

  function render() {
    const tt = t();
    const list = filtered();
    $("dbCount").textContent = tt.count(list.length);
    $("dbEmpty").hidden = list.length > 0;
    $("dbEmpty").textContent = tt.empty;
    $("dbGrid").hidden = state.view !== "grid" || !list.length;
    $("dbTable").hidden = state.view !== "table" || !list.length;
    $("dbGrid").replaceChildren(...list.map(cardEl));
    renderTable(list);
  }

  const tier = (v) => (v >= 90 ? "t-cyan" : v >= 80 ? "t-lime" : v >= 70 ? "t-amber" : "t-red");

  function attrPanel(d) {
    const tt = t();
    const wrap = el("div", "db-attrs");
    [["attack", tt.grpAttack], ["defense", tt.grpDefense], ["strength", tt.grpStrength]].forEach(([key, title]) => {
      const col = el("div", "db-attr-col");
      col.append(el("h3", "", title));
      (d[key] || []).forEach((entry, i) => {
        const [v, boost] = Array.isArray(entry) ? entry : [entry, 0];
        const row = el("div", "db-attr " + tier(v));
        row.append(el("span", "db-attr-name", tt.attrs[key][i]));
        if (boost) row.append(el("em", "db-attr-boost", "+" + boost));
        row.append(el("b", "db-attr-val", String(v)));
        col.append(row);
      });
      wrap.append(col);
    });
    return wrap;
  }

  function openDetail(c) {
    const tt = t();
    const box = $("dbDetail");
    const left = el("div", "db-d-card");
    left.append(cardEl(c));
    left.firstChild.disabled = true;
    const right = el("div", "db-d-info");
    right.append(el("h2", "", c.name));
    const meta = el("div", "db-d-meta");
    [[tt.rating, c.rating], [tt.pos, c.pos], [tt.club, c.club], [tt.nation, c.nation], [tt.type, c.type],
      [tt.style, c.playstyle], [tt.skill, c.skill], [tt.updated, c.updated]].forEach(([k, v]) => {
      if (v == null || v === "") return;
      const row = el("div");
      row.append(el("span", "", k), el("b", "", String(v)));
      meta.append(row);
    });
    right.append(meta);
    const bars = el("div", "db-d-bars");
    c.stats.forEach((v, i) => {
      const row = el("div", "db-bar");
      const track = el("i");
      const fill = el("u");
      fill.style.width = Math.min(100, Math.round((v / 120) * 100)) + "%";
      track.append(fill);
      row.append(el("span", "", tt.stats[i]), track, el("b", "", String(v)));
      bars.append(row);
    });
    if (!c.detail) right.append(bars);
    const parts = [left, right];
    if (c.detail) parts.push(attrPanel(c.detail));
    box.replaceChildren(...parts);
    $("dbModal").hidden = false;
  }

  function applyLang() {
    const tt = t();
    document.documentElement.lang = lang;
    document.title = "eFootball League — " + tt.title.replace("eFootball ", "");
    $("dbTitle").textContent = tt.title;
    $("backLink").textContent = tt.back;
    $("dbSearch").placeholder = tt.search;
    $("viewGrid").textContent = tt.cards;
    $("viewTable").textContent = tt.table;
    const positions = [...new Set(CARDS.map((c) => c.pos))].sort();
    $("dbPos").replaceChildren(new Option(tt.allPos, "all"), ...positions.map((p) => new Option(p, p)));
    $("dbPos").value = positions.includes(state.pos) ? state.pos : "all";
    state.pos = $("dbPos").value;
    $("dbSort").replaceChildren(new Option(tt.sortRating, "rating"), new Option(tt.sortName, "name"),
      new Option(tt.sortPos, "pos"), new Option(tt.sortUpd, "updated"));
    $("dbSort").value = state.sort;
    document.querySelectorAll(".db-lang button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    render();
  }

  $("dbSearch").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("dbPos").addEventListener("change", (e) => { state.pos = e.target.value; render(); });
  $("dbSort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  document.querySelectorAll(".db-view button").forEach((b) => b.addEventListener("click", () => {
    state.view = b.dataset.view;
    document.querySelectorAll(".db-view button").forEach((x) => x.classList.toggle("active", x === b));
    render();
  }));
  document.querySelectorAll(".db-lang button").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    localStorage.setItem("leagueLang", lang);
    applyLang();
  }));
  $("dbClose").addEventListener("click", () => { $("dbModal").hidden = true; });
  $("dbModal").addEventListener("click", (e) => { if (e.target === $("dbModal")) $("dbModal").hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("dbModal").hidden = true; });

  const savedTheme = localStorage.getItem("leagueTheme");
  if (savedTheme === "halloween") document.documentElement.dataset.theme = "halloween";

  applyLang();
})();
