(function () {
  const BUILTIN = window.EF_CARDS || [];
  let lang = localStorage.getItem("leagueLang") === "ru" ? "ru" : "en";
  const state = { q: "", pos: "all", cat: "all", sort: "rating", view: "grid" };
  const remote = new Map();
  let CARDS = [];
  let db = null;
  let canEdit = false;
  let signedIn = false;
  let editing = null;
  let backendError = "";
  let cardsRealtime = false;

  const GROUPS = ["attack", "defense", "strength"];
  const SIZES = { attack: 10, defense: 9, strength: 7 };

  const T = {
    en: {
      title: "eFootball Card Database", back: "← League", search: "Search name, club, nation…",
      allPos: "All positions", allCats: "All", cards: "Cards", table: "Table", count: (n) => `${n} card${n === 1 ? "" : "s"}`,
      empty: "No cards found.", sortRating: "Sort: Rating", sortName: "Sort: Name", sortPos: "Sort: Position", sortUpd: "Sort: Newest",
      grpAttack: "ATTACKING", grpDefense: "DEFENDING", grpStrength: "STRENGTH",
      attrs: {
        attack: ["Offensive Awareness", "Ball Control", "Dribbling", "Tight Possession", "Low Pass", "Lofted Pass", "Finishing", "Heading", "Set Piece Taking", "Curl"],
        defense: ["Defensive Awareness", "Defensive Engagement", "Tackling", "Aggression", "GK Awareness", "GK Catching", "GK Parrying", "GK Reflexes", "GK Reach"],
        strength: ["Speed", "Acceleration", "Kicking Power", "Jump", "Physical Contact", "Balance", "Stamina"]
      },
      short: ["OFF", "BAL", "DRI", "FIN", "SPD", "PHY"],
      name: "Name", rating: "OVR", pos: "Pos", club: "Club", nation: "Nation", type: "Series", style: "Playing style",
      skill: "Key skill", updated: "Updated", category: "Category", tier: "Grade",
      add: "＋ Add card", edit: "✎ Edit", save: "Save", saving: "Saving…", cancel: "Cancel", del: "Delete card",
      revert: "Revert to built-in", newCard: "New card", editCard: "Edit card", photo: "Card image (PNG / JPG / WebP, up to 5 MB)",
      boost: "Level +", preview: "Live preview", attrsTitle: "Attributes",
      hintGuest: "Want to edit cards? Sign in on the League page.", hintOffline: "Editing is unavailable (no connection to the database).",
      hintNoRights: "Your account can't edit cards.", confirmDel: "Delete this card?", confirmRevert: "Revert this card to the built-in version?",
      needName: "Enter a name.", needPhoto: "Upload a card image.", saveErr: "Could not save: ", ballon: "Ballon d'Or",
      duplicateName: "A card with this name already exists.", badPhoto: "Choose a PNG, JPG or WebP image up to 5 MB.",
      backendErr: "Card database is unavailable: "
    },
    ru: {
      title: "База карточек eFootball", back: "← Лига", search: "Поиск: имя, клуб, страна…",
      allPos: "Все позиции", allCats: "Все", cards: "Карточки", table: "Таблица", count: (n) => `Карточек: ${n}`,
      empty: "Карточки не найдены.", sortRating: "Сорт.: Рейтинг", sortName: "Сорт.: Имя", sortPos: "Сорт.: Позиция", sortUpd: "Сорт.: Новые",
      grpAttack: "АТАКА", grpDefense: "ЗАЩИТА", grpStrength: "СИЛА",
      attrs: {
        attack: ["Умение атаковать", "Контроль мяча", "Дриблинг", "Удержание мяча", "Пас низом", "Пас навесом", "Реализация", "Игра головой", "Исполнение стандартов", "Подкрутка"],
        defense: ["Умение защищаться", "Вовлеченность в защиту", "Подкаты", "Агрессия", "Вратарские навыки", "Фиксация мяча", "Парирование", "Реакция", "Зона отражения"],
        strength: ["Скорость", "Ускорение", "Сила удара", "Прыгучесть", "Устойч. при толчках", "Баланс", "Выносливость"]
      },
      short: ["АТК", "КОН", "ДРИ", "ЗАВ", "СКО", "БОР"],
      name: "Имя", rating: "РЕЙТ", pos: "Поз", club: "Клуб", nation: "Страна", type: "Серия", style: "Стиль игры",
      skill: "Ключевой навык", updated: "Обновлено", category: "Категория", tier: "Класс",
      add: "＋ Добавить карточку", edit: "✎ Редактировать", save: "Сохранить", saving: "Сохранение…", cancel: "Отмена", del: "Удалить карточку",
      revert: "Вернуть стандартную", newCard: "Новая карточка", editCard: "Редактирование карточки", photo: "Картинка карточки (PNG / JPG / WebP, до 5 МБ)",
      boost: "Уровень +", preview: "Предпросмотр", attrsTitle: "Показатели",
      hintGuest: "Хотите редактировать карточки? Войдите на странице лиги.", hintOffline: "Редактирование недоступно (нет связи с базой).",
      hintNoRights: "Этот аккаунт не может редактировать карточки.", confirmDel: "Удалить эту карточку?", confirmRevert: "Вернуть стандартную версию карточки?",
      needName: "Введите имя.", needPhoto: "Загрузите картинку карточки.", saveErr: "Не удалось сохранить: ", ballon: "Золотой мяч",
      duplicateName: "Карточка с таким именем уже есть.", badPhoto: "Выберите PNG, JPG или WebP до 5 МБ.",
      backendErr: "База карточек недоступна: "
    }
  };

  const $ = (id) => document.getElementById(id);
  const t = () => T[lang];

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  const catLabel = (c) => (c === "Ballon d'Or" ? t().ballon : c);
  const val = (e) => (Array.isArray(e) ? e[0] : e);
  const boostOf = (e) => (Array.isArray(e) ? e[1] || 0 : 0);
  const clampNum = (v, max) => Math.max(0, Math.min(max, Math.round(Number(v) || 0)));

  function normalize(c) {
    const d = c.detail || {};
    const detail = {};
    GROUPS.forEach((g) => {
      detail[g] = Array.from({ length: SIZES[g] }, (_, i) => (d[g] && d[g][i] != null ? d[g][i] : 40));
    });
    return { tier: "S+", category: "", type: "", playstyle: "", skill: "", club: "", nation: "", ...c, detail };
  }

  function buildCards() {
    const map = new Map(BUILTIN.map((c) => [c.id, c]));
    remote.forEach((row, id) => {
      const base = map.get(id) || {};
      const merged = { ...base, ...row.data, id };
      if (row.photo_path && db) merged.photo = db.storage.from("card-images").getPublicUrl(row.photo_path).data.publicUrl;
      map.set(id, merged);
    });
    CARDS = [...map.values()].filter((c) => !c.deleted && c.name).map(normalize);
  }

  function cardEl(c) {
    const card = el("button", "ef-card");
    card.type = "button";
    card.dataset.tier = c.tier;
    const img = el("img", "ef-photo");
    img.src = c.photo || "";
    img.alt = c.name;
    img.loading = "lazy";
    const rate = el("div", "ef-rate");
    rate.append(el("b", "", String(c.rating)), el("span", "", c.pos));
    card.append(img, rate, el("div", "ef-grade", c.tier), el("div", "ef-name", c.name));
    card.addEventListener("click", () => openDetail(c));
    return card;
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    const list = CARDS.filter((c) => {
      if (state.pos !== "all" && c.pos !== state.pos) return false;
      if (state.cat !== "all" && c.category !== state.cat) return false;
      if (!q) return true;
      return [c.name, c.club, c.nation, c.pos, c.type, c.playstyle, c.category, catLabel(c.category)].join(" ").toLowerCase().includes(q);
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
    [tt.name, tt.rating, tt.tier, tt.pos, tt.club, tt.nation, tt.category, ...tt.short].forEach((h) => head.append(el("th", "", h)));
    const thead = el("thead");
    thead.append(head);
    table.append(thead);
    const body = el("tbody");
    list.forEach((c) => {
      const d = c.detail;
      const tr = el("tr");
      tr.append(el("td", "db-td-name", c.name), el("td", "db-td-rate", String(c.rating)), el("td", "", c.tier), el("td", "", c.pos),
        el("td", "", c.club), el("td", "", c.nation), el("td", "", catLabel(c.category)));
      [d.attack[0], d.attack[1], d.attack[2], d.attack[6], d.strength[0], d.strength[4]].forEach((v) => tr.append(el("td", "db-td-stat", String(val(v)))));
      tr.addEventListener("click", () => openDetail(c));
      body.append(tr);
    });
    table.append(body);
    $("dbTable").replaceChildren(table);
  }

  function renderCats() {
    const cats = [...new Set(CARDS.map((c) => c.category).filter(Boolean))];
    if (state.cat !== "all" && !cats.includes(state.cat)) state.cat = "all";
    const mk = (value, label) => {
      const b = el("button", "db-cat" + (state.cat === value ? " active" : ""), label);
      b.type = "button";
      b.addEventListener("click", () => { state.cat = value; render(); });
      return b;
    };
    $("dbCats").replaceChildren(mk("all", t().allCats), ...cats.map((c) => mk(c, catLabel(c))));
    $("dbCats").hidden = cats.length === 0;
  }

  function render() {
    const tt = t();
    renderCats();
    const list = filtered();
    $("dbCount").textContent = tt.count(list.length);
    $("dbEmpty").hidden = list.length > 0;
    $("dbEmpty").textContent = tt.empty;
    $("dbGrid").hidden = state.view !== "grid" || !list.length;
    $("dbTable").hidden = state.view !== "table" || !list.length;
    $("dbGrid").replaceChildren(...list.map(cardEl));
    renderTable(list);
  }

  const tierClass = (v) => (v >= 90 ? "t-cyan" : v >= 80 ? "t-lime" : v >= 70 ? "t-amber" : "t-red");

  function attrPanel(d) {
    const tt = t();
    const wrap = el("div", "db-attrs");
    [["attack", tt.grpAttack], ["defense", tt.grpDefense], ["strength", tt.grpStrength]].forEach(([key, title]) => {
      const col = el("div", "db-attr-col");
      col.append(el("h3", "", title));
      (d[key] || []).forEach((entry, i) => {
        const v = val(entry);
        const boost = boostOf(entry);
        const row = el("div", "db-attr " + tierClass(v));
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
    const left = el("div", "db-d-card");
    left.append(cardEl(c));
    left.firstChild.disabled = true;
    const right = el("div", "db-d-info");
    right.append(el("h2", "", c.name));
    const meta = el("div", "db-d-meta");
    [[tt.rating, c.rating], [tt.tier, c.tier], [tt.pos, c.pos], [tt.club, c.club], [tt.nation, c.nation], [tt.category, catLabel(c.category)],
      [tt.type, c.type], [tt.style, c.playstyle], [tt.skill, c.skill], [tt.updated, c.updated]].forEach(([k, v]) => {
      if (v == null || v === "") return;
      const row = el("div");
      row.append(el("span", "", k), el("b", "", String(v)));
      meta.append(row);
    });
    right.append(meta);
    if (canEdit) {
      const btn = el("button", "db-btn", tt.edit);
      btn.type = "button";
      btn.addEventListener("click", () => { $("dbModal").hidden = true; openEditor(c); });
      right.append(btn);
    }
    $("dbDetail").replaceChildren(left, right, attrPanel(c.detail));
    $("dbModal").hidden = false;
  }

  /* ---------- Editor ---------- */

  function blankCard() {
    return normalize({ id: "", name: "", rating: 100, tier: "S+", pos: "CF", type: "Epic", category: "", photo: "" });
  }

  function openEditor(card) {
    const isNew = !card;
    const draft = JSON.parse(JSON.stringify(card || blankCard()));
    editing = { draft, isNew, file: null, previewUrl: null, original: card || null };
    drawEditor();
    $("dbEditModal").hidden = false;
  }

  function closeEditor() {
    if (editing && editing.previewUrl) URL.revokeObjectURL(editing.previewUrl);
    editing = null;
    $("dbEditModal").hidden = true;
  }

  function field(label, input) {
    const wrap = el("label", "db-field");
    wrap.append(el("span", "", label), input);
    return wrap;
  }

  function textInput(key, opts = {}) {
    const inp = el("input");
    inp.type = opts.type || "text";
    if (opts.list) inp.setAttribute("list", opts.list);
    if (opts.max) inp.max = opts.max;
    if (opts.type === "number") inp.min = 0;
    inp.value = editing.draft[key] ?? "";
    inp.addEventListener("input", () => {
      editing.draft[key] = opts.type === "number" ? clampNum(inp.value, opts.max || 999) : inp.value;
      updatePreview();
    });
    return inp;
  }

  function datalist(id, values) {
    const dl = el("datalist");
    dl.id = id;
    [...new Set(values.filter(Boolean))].forEach((v) => dl.append(new Option(v, v)));
    return dl;
  }

  function updatePreview() {
    const box = $("dbEditPreview");
    if (!box || !editing) return;
    const preview = { ...editing.draft, name: editing.draft.name || "—" };
    const c = cardEl(preview);
    c.disabled = true;
    box.replaceChildren(c);
    const panel = $("dbEditAttrs");
    if (panel) panel.replaceChildren(attrPanel(editing.draft.detail));
  }

  function drawEditor() {
    const tt = t();
    const { draft, isNew } = editing;
    const root = $("dbEditor");
    root.replaceChildren();
    root.append(el("h2", "db-edit-title", isNew ? tt.newCard : tt.editCard));

    const layout = el("div", "db-edit-layout");
    const side = el("div", "db-edit-side");
    side.append(el("h3", "db-edit-sub", tt.preview));
    const prev = el("div", "db-edit-preview");
    prev.id = "dbEditPreview";
    side.append(prev);

    const file = el("input");
    file.type = "file";
    file.accept = "image/png,image/jpeg,image/webp";
    file.addEventListener("change", () => {
      const f = file.files[0];
      if (!f) return;
      if (!["image/png", "image/jpeg", "image/webp"].includes(f.type) || f.size > 5 * 1024 * 1024) {
        $("dbEditErr").textContent = t().badPhoto;
        file.value = "";
        return;
      }
      $("dbEditErr").textContent = "";
      if (editing.previewUrl) URL.revokeObjectURL(editing.previewUrl);
      editing.file = f;
      editing.previewUrl = URL.createObjectURL(f);
      draft.photo = editing.previewUrl;
      updatePreview();
    });
    side.append(field(tt.photo, file));

    const form = el("div", "db-edit-form");
    const grid = el("div", "db-edit-grid");
    const posList = datalist("dlPos", ["GK", "CB", "LB", "RB", "DMF", "CMF", "AMF", "LMF", "RMF", "LWF", "RWF", "SS", "CF", "LW", "RW", "ST"]);
    const catList = datalist("dlCat", ["Ballon d'Or", ...CARDS.map((c) => c.category)]);
    const tierList = datalist("dlTier", ["S+", "S", "A+", "A", "B"]);
    const typeList = datalist("dlType", ["Epic", "Legend", "Featured", "Iconic Moment", ...CARDS.map((c) => c.type)]);
    grid.append(
      field(tt.name, textInput("name")),
      field(tt.rating, textInput("rating", { type: "number", max: 140 })),
      field(tt.tier, textInput("tier", { list: "dlTier" })),
      field(tt.pos, textInput("pos", { list: "dlPos" })),
      field(tt.club, textInput("club")),
      field(tt.nation, textInput("nation")),
      field(tt.category, textInput("category", { list: "dlCat" })),
      field(tt.type, textInput("type", { list: "dlType" })),
      field(tt.style, textInput("playstyle")),
      field(tt.skill, textInput("skill"))
    );
    form.append(grid, posList, catList, tierList, typeList);
    layout.append(side, form);
    root.append(layout);

    root.append(el("h3", "db-edit-sub", tt.attrsTitle));
    const cols = el("div", "db-edit-attrs");
    [["attack", tt.grpAttack], ["defense", tt.grpDefense], ["strength", tt.grpStrength]].forEach(([g, title]) => {
      const col = el("div", "db-edit-col");
      col.append(el("h4", "", title));
      draft.detail[g].forEach((entry, i) => {
        const row = el("div", "db-edit-attr");
        row.append(el("span", "", tt.attrs[g][i]));
        const v = el("input");
        v.type = "number"; v.min = 0; v.max = 140; v.value = val(entry);
        const b = el("input", "db-edit-boost");
        b.type = "number"; b.min = 0; b.max = 30; b.value = boostOf(entry) || ""; b.placeholder = tt.boost;
        b.title = tt.boost;
        const sync = () => {
          const nv = clampNum(v.value, 140);
          const nb = clampNum(b.value, 30);
          draft.detail[g][i] = nb ? [nv, nb] : nv;
          updatePreview();
        };
        v.addEventListener("input", sync);
        b.addEventListener("input", sync);
        row.append(v, b);
        col.append(row);
      });
      cols.append(col);
    });
    root.append(cols);

    const live = el("div");
    live.id = "dbEditAttrs";
    root.append(el("h3", "db-edit-sub", tt.preview), live);

    const bar = el("div", "db-edit-bar");
    const err = el("span", "db-edit-err");
    err.id = "dbEditErr";
    const save = el("button", "db-btn db-btn-primary", tt.save);
    save.type = "button";
    save.addEventListener("click", () => saveCard(save));
    const cancel = el("button", "db-btn", tt.cancel);
    cancel.type = "button";
    cancel.addEventListener("click", closeEditor);
    bar.append(err);
    if (!isNew) {
      const builtin = BUILTIN.some((c) => c.id === draft.id);
      if (builtin && remote.has(draft.id) && !remote.get(draft.id).data.deleted) {
        const rev = el("button", "db-btn", tt.revert);
        rev.type = "button";
        rev.addEventListener("click", () => removeCard(true));
        bar.append(rev);
      }
      if (!builtin) {
        const del = el("button", "db-btn db-btn-danger", tt.del);
        del.type = "button";
        del.addEventListener("click", () => removeCard(false));
        bar.append(del);
      }
    }
    bar.append(cancel, save);
    root.append(bar);
    updatePreview();
  }

  const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "card";

  async function saveCard(btn) {
    const tt = t();
    const { draft, isNew, file } = editing;
    const err = $("dbEditErr");
    err.textContent = "";
    if (!draft.name.trim()) { err.textContent = tt.needName; return; }
    if (!draft.photo && !file) { err.textContent = tt.needPhoto; return; }
    if (CARDS.some((c) => c.id !== draft.id && c.name.trim().toLowerCase() === draft.name.trim().toLowerCase())) {
      err.textContent = tt.duplicateName;
      return;
    }
    btn.disabled = true;
    btn.textContent = tt.saving;
    try {
      const id = isNew ? `${slug(draft.name)}-${Math.random().toString(36).slice(2, 7)}` : draft.id;
      const prevRow = remote.get(id);
      let photoPath = prevRow ? prevRow.photo_path : null;
      let newPhotoPath = null;
      if (file) {
        const ext = file.type === "image/jpeg" ? "jpg" : file.type === "image/webp" ? "webp" : "png";
        const path = `cards/${id}-${Date.now()}.${ext}`;
        const up = await db.storage.from("card-images").upload(path, file, { contentType: file.type, cacheControl: "31536000" });
        if (up.error) throw up.error;
        newPhotoPath = path;
        photoPath = path;
      }
      const data = { ...draft, id, name: draft.name.trim(), rating: clampNum(draft.rating, 140), updated: new Date().toISOString().slice(0, 10) };
      delete data.photo;
      delete data.deleted;
      const builtinPhoto = (BUILTIN.find((c) => c.id === id) || {}).photo;
      if (!photoPath && builtinPhoto) data.photo = builtinPhoto;
      const { error } = await db.from("efootball_cards").upsert({ id, data, photo_path: photoPath, updated_at: new Date().toISOString() });
      if (error) {
        if (newPhotoPath) await db.storage.from("card-images").remove([newPhotoPath]);
        throw error;
      }
      if (newPhotoPath && prevRow && prevRow.photo_path) {
        const { error: cleanupError } = await db.storage.from("card-images").remove([prevRow.photo_path]);
        if (cleanupError) console.error("Could not remove replaced card image:", cleanupError);
      }
      await loadRemote();
      closeEditor();
      applyLang();
    } catch (e) {
      err.textContent = tt.saveErr + (e.message || e);
      btn.disabled = false;
      btn.textContent = tt.save;
    }
  }

  async function removeCard(revertOnly) {
    const tt = t();
    const { draft } = editing;
    if (!confirm(revertOnly ? tt.confirmRevert : tt.confirmDel)) return;
    const builtin = BUILTIN.some((c) => c.id === draft.id);
    const row = remote.get(draft.id);
    try {
      let res;
      if (builtin && !revertOnly) {
        res = await db.from("efootball_cards").upsert({ id: draft.id, data: { deleted: true }, photo_path: null, updated_at: new Date().toISOString() });
      } else {
        res = await db.from("efootball_cards").delete().eq("id", draft.id);
      }
      if (res.error) throw res.error;
      if (row && row.photo_path && (revertOnly || !builtin)) {
        const { error: cleanupError } = await db.storage.from("card-images").remove([row.photo_path]);
        if (cleanupError) console.error("Could not remove deleted card image:", cleanupError);
      }
      await loadRemote();
      closeEditor();
      applyLang();
    } catch (e) {
      $("dbEditErr").textContent = tt.saveErr + (e.message || e);
    }
  }

  /* ---------- Backend ---------- */

  async function loadRemote() {
    if (!db) return;
    const { data, error } = await db.from("efootball_cards").select("id,data,photo_path");
    if (error) throw error;
    remote.clear();
    (data || []).forEach((r) => remote.set(r.id, r));
    buildCards();
  }

  async function refreshRights() {
    canEdit = false;
    if (db) {
      const { data: sess } = await db.auth.getSession();
      signedIn = !!(sess && sess.session);
      if (signedIn) {
        const { data, error } = await db.rpc("is_card_editor");
        if (error) throw error;
        canEdit = data === true;
      }
    }
    backendError = "";
    applyRights();
  }

  function applyRights() {
    const tt = t();
    $("dbAdd").hidden = !canEdit;
    const hint = backendError ? tt.backendErr + backendError : !db ? tt.hintOffline : !signedIn ? tt.hintGuest : !canEdit ? tt.hintNoRights : "";
    $("dbHint").textContent = hint;
    $("dbHint").hidden = !hint;
  }

  async function initBackend() {
    try {
      const [{ createClient }, cfg] = await Promise.all([
        import("https://esm.sh/@supabase/supabase-js@2"),
        import("./supabase-config.js")
      ]);
      if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) {
        backendError = "Supabase config is missing.";
        applyRights();
        return;
      }
      db = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      await loadRemote();
      applyLang();
      db.auth.onAuthStateChange(() => {
        void refreshRights().catch((e) => {
          backendError = e.message || String(e);
          applyRights();
        });
      });
      db.channel("efootball-cards").on("postgres_changes", { event: "*", schema: "public", table: "efootball_cards" }, async () => {
        try {
          await loadRemote();
          applyLang();
        } catch (e) {
          backendError = e.message || String(e);
          applyRights();
        }
      }).subscribe((status, error) => {
        cardsRealtime = status === "SUBSCRIBED";
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          backendError = error?.message || status;
          applyRights();
        }
      });
      await refreshRights();
      window.setInterval(async () => {
        if (!db || cardsRealtime) return;
        try {
          await loadRemote();
          applyLang();
        } catch (e) {
          backendError = e.message || String(e);
          applyRights();
        }
      }, 15000);
    } catch (e) {
      backendError = e.message || String(e);
      applyRights();
    }
  }

  /* ---------- Page wiring ---------- */

  function applyLang() {
    const tt = t();
    document.documentElement.lang = lang;
    document.title = "eFootball League — " + tt.title.replace("eFootball ", "");
    $("dbTitle").textContent = tt.title;
    $("backLink").textContent = tt.back;
    $("dbSearch").placeholder = tt.search;
    $("viewGrid").textContent = tt.cards;
    $("viewTable").textContent = tt.table;
    $("dbAdd").textContent = tt.add;
    const positions = [...new Set(CARDS.map((c) => c.pos))].sort();
    $("dbPos").replaceChildren(new Option(tt.allPos, "all"), ...positions.map((p) => new Option(p, p)));
    $("dbPos").value = positions.includes(state.pos) ? state.pos : "all";
    state.pos = $("dbPos").value;
    $("dbSort").replaceChildren(new Option(tt.sortRating, "rating"), new Option(tt.sortName, "name"),
      new Option(tt.sortPos, "pos"), new Option(tt.sortUpd, "updated"));
    $("dbSort").value = state.sort;
    document.querySelectorAll(".db-lang button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    applyRights();
    render();
  }

  $("dbSearch").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("dbPos").addEventListener("change", (e) => { state.pos = e.target.value; render(); });
  $("dbSort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  $("dbAdd").addEventListener("click", () => openEditor(null));
  document.querySelectorAll(".db-view button").forEach((b) => b.addEventListener("click", () => {
    state.view = b.dataset.view;
    document.querySelectorAll(".db-view button").forEach((x) => x.classList.toggle("active", x === b));
    render();
  }));
  document.querySelectorAll(".db-lang button").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    localStorage.setItem("leagueLang", lang);
    applyLang();
    if (editing) drawEditor();
  }));
  $("dbClose").addEventListener("click", () => { $("dbModal").hidden = true; });
  $("dbEditClose").addEventListener("click", closeEditor);
  $("dbModal").addEventListener("click", (e) => { if (e.target === $("dbModal")) $("dbModal").hidden = true; });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    $("dbModal").hidden = true;
    if (editing) closeEditor();
  });

  if (localStorage.getItem("leagueTheme") === "halloween") document.documentElement.dataset.theme = "halloween";

  buildCards();
  applyLang();
  void initBackend();
})();
