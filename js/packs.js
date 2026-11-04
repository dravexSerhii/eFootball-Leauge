(() => {
  // Ratings follow EA SPORTS FC 27 (max 99). Entries marked est: are approximations, edit freely.
  const PLAYERS = [
    { id: "pele", name: "Pel\u00e9", nation: "BRA", country: "Brazil", pos: "ST", rating: 95, stats: [96, 95, 89, 94, 60, 88] },
    { id: "maradona", name: "Maradona", nation: "ARG", country: "Argentina", pos: "CAM", rating: 95, stats: [94, 92, 93, 98, 58, 82] },
    { id: "mbappe", name: "Mbapp\u00e9", nation: "FRA", country: "France", pos: "ST", rating: 91, stats: [96, 91, 80, 92, 29, 76] },
    { id: "dembele", name: "Demb\u00e9l\u00e9", nation: "FRA", country: "France", pos: "ST", rating: 90, stats: [92, 87, 86, 92, 40, 66] },
    { id: "olise", name: "Olise", nation: "FRA", country: "France", pos: "RM", rating: 90, stats: [83, 86, 90, 92, 42, 66] },
    { id: "messi", name: "Messi", nation: "ARG", country: "Argentina", pos: "CF", rating: 96, stats: [94, 96, 96, 99, 40, 72] },
    { id: "kvaratskhelia", name: "Kvaratskhelia", nation: "GEO", country: "Georgia", pos: "LW", rating: 89, stats: [88, 84, 83, 91, 42, 70] },
    { id: "cannavaro", name: "Cannavaro", nation: "ITA", country: "Italy", pos: "CB", rating: 90, stats: [82, 55, 72, 74, 93, 89] },
    { id: "ronaldo", name: "Ronaldo", nation: "POR", country: "Portugal", pos: "LW", rating: 96, stats: [98, 99, 85, 92, 42, 92] },
    { id: "kante", name: "Kant\u00e9", nation: "FRA", country: "France", pos: "CDM", rating: 85, stats: [77, 65, 73, 80, 85, 79] },
    { id: "vinicius", name: "Vin\u00edcius Jr", nation: "BRA", country: "Brazil", pos: "LW", rating: 91, stats: [95, 85, 82, 93, 30, 68] },
    { id: "bellingham", name: "Bellingham", nation: "ENG", country: "England", pos: "CM", rating: 91, stats: [82, 86, 87, 89, 80, 86] },
    { id: "raphinha", name: "Raphinha", nation: "BRA", country: "Brazil", pos: "RW", rating: 89, stats: [90, 85, 85, 90, 45, 68] },
    { id: "neymar", name: "Neymar", nation: "BRA", country: "Brazil", pos: "LW", rating: 88, stats: [88, 84, 86, 93, 38, 62] },
    { id: "aguero", name: "Ag\u00fcero", nation: "ARG", country: "Argentina", pos: "ST", rating: 88, stats: [85, 92, 78, 88, 40, 76] },
    { id: "bsilva", name: "B. Silva", nation: "POR", country: "Portugal", pos: "CM", rating: 87, stats: [80, 80, 88, 90, 66, 68] },
    { id: "forlan", name: "Forl\u00e1n", nation: "URU", country: "Uruguay", pos: "ST", rating: 87, stats: [78, 90, 76, 82, 40, 76] },
    { id: "cucurella", name: "Cucurella", nation: "ESP", country: "Spain", pos: "LB", rating: 82,     stats: [79, 58, 76, 80, 82, 76] },
        { id: "rodri", name: "Rodri", nation: "ESP", country: "Spain", pos: "CDM", rating: 91, stats: [62, 80, 86, 83, 88, 88] },
        { id: "saliba", name: "Saliba", nation: "FRA", country: "France", pos: "CB", rating: 88, stats: [80, 48, 70, 78, 89, 84] },
        { id: "yamal", name: "Yamal", nation: "ESP", country: "Spain", pos: "RW", rating: 92, stats: [89, 84, 86, 94, 38, 62] },
        { id: "kimmich", name: "Kimmich", nation: "GER", country: "Germany", pos: "CDM", rating: 88, stats: [68, 76, 89, 84, 82, 78] },
        { id: "suarez", name: "Su\u00e1rez", nation: "URU", country: "Uruguay", pos: "ST", rating: 88, stats: [76, 90, 80, 83, 50, 86] },
        { id: "kane", name: "Kane", nation: "ENG", country: "England", pos: "ST", rating: 91, stats: [70, 94, 85, 83, 48, 86] },
    { id: "ronaldinho", name: "Ronaldinho", nation: "BRA", country: "Brazil", pos: "CAM", rating: 95, stats: [90, 88, 91, 97, 45, 76] },
    { id: "buffon", name: "Buffon", nation: "ITA", country: "Italy", pos: "GK", rating: 95, stats: [88, 86, 70, 90, 50, 89] },
    { id: "kahn", name: "Kahn", nation: "GER", country: "Germany", pos: "GK", rating: 92, stats: [86, 84, 68, 88, 46, 90] },
    { id: "neuer", name: "Neuer", nation: "GER", country: "Germany", pos: "GK", rating: 90, stats: [88, 86, 80, 90, 48, 86] },
    { id: "thuram", name: "Thuram", nation: "FRA", country: "France", pos: "CB", rating: 91, stats: [84, 58, 72, 76, 91, 88] },
    { id: "pedri", name: "Pedri", nation: "ESP", country: "Spain", pos: "CM", rating: 89, stats: [78, 74, 88, 91, 74, 66] },
    { id: "kounde", name: "Kound\u00e9", nation: "FRA", country: "France", pos: "RB", rating: 86, stats: [82, 62, 78, 82, 85, 80] },
    { id: "huijsen", name: "Huijsen", nation: "ESP", country: "Spain", pos: "CB", rating: 85, stats: [76, 52, 74, 76, 85, 82] },
    { id: "zabarnyi", name: "Zabarnyi", nation: "UKR", country: "Ukraine", pos: "CB", rating: 84, stats: [74, 40, 66, 70, 85, 83] },
    { id: "mckennie", name: "McKennie", nation: "USA", country: "USA", pos: "CM", rating: 82, stats: [76, 70, 76, 78, 78, 82] },
    { id: "courtois", name: "Courtois", nation: "BEL", country: "Belgium", pos: "GK", rating: 91, stats: [86, 84, 74, 88, 50, 88] },
    { id: "trent", name: "Trent", nation: "ENG", country: "England", pos: "RB", rating: 88, stats: [76, 72, 92, 82, 78, 72] },
    { id: "valverde", name: "Valverde", nation: "URU", country: "Uruguay", pos: "CM", rating: 89, stats: [88, 80, 84, 85, 80, 86] },
    { id: "lautaro", name: "Lautaro Mart\u00ednez", nation: "ARG", country: "Argentina", pos: "ST", rating: 89, stats: [80, 90, 76, 86, 50, 82] },
    { id: "mendes", name: "N. Mendes", nation: "POR", country: "Portugal", pos: "LB", rating: 87, stats: [92, 66, 80, 86, 82, 78] },
    { id: "safonov", name: "Safonov", nation: "RUS", country: "Russia", pos: "GK", rating: 85, stats: [80, 78, 68, 82, 48, 84] }
      ];
  const STAT_LABELS = ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"];

  const TIERS = ["gold", "rare", "epic", "icon", "ballon"];
  const TIER_WEIGHT = { gold: 72, rare: 20, epic: 7, icon: 1, ballon: 0.5 };
  const tierOf = player => player.rating >= 96 ? "ballon" : player.rating >= 95 ? "icon" : player.rating >= 90 ? "epic" : player.rating >= 88 ? "rare" : "gold";

  const CARDS_PER_PACK = 1;
  // Photo box aspect (width / height) on the card
  const PHOTO_BOX = 0.93;
  const PHOTO_FILES = {
    cannavaro: ["canavaro.webp", "cannavaro.webp", "cannavaro.png"],
    bsilva: ["b.silva.png"],
    bellingham: ["belingham.png"],
    forlan: ["Forlan.webp"],
    mbappe: ["mbappe.avif"],
    pele: ["pele.png"],
    suarez: ["suares.png"],
    kane: ["kane.avif"],
    kahn: ["kahn.avif"],
    zabarnyi: ["zabarniy.webp"],
    huijsen: ["hujsens.webp"],
    courtois: ["\u0441ourtois.png"],
    trent: ["alexande-arnold.png"],
    mendes: ["nunu-mendes.png"],
    lautaro: ["lautaro.png"]
  };
  // Crop per player: [left, right, top] as fractions of the source photo
  const PHOTO_CROP = {
    pele: [0.03, 0.95, 0],
    rodri: [0.2, 0.8, 0.13],
    yamal: [0.15, 0.85, 0.2],
    saliba: [0.2, 0.84, 0.1],
    kimmich: [0.3, 0.98, 0.02],
    suarez: [0.25, 0.99, 0.01],
    kane: [0.08, 0.86, 0.18],
    trent: [0.1, 0.9, 0],
    valverde: [0.1, 0.9, 0],
    lautaro: [0.15, 0.95, 0],
    mendes: [0.15, 0.85, 0.2],
    safonov: [0.15, 0.85, 0.15],
    courtois: [0.28, 1, 0],
    kahn: [0.08, 0.9, 0.17],
    ronaldinho: [0.15, 0.95, 0],
    buffon: [0.15, 0.95, 0],
    neuer: [0.12, 0.92, 0.02],
    pedri: [0.1, 0.9, 0],
    kounde: [0.12, 0.92, 0],
    huijsen: [0.15, 0.85, 0.15],
    zabarnyi: [0, 1, 0],
    mckennie: [0.12, 0.92, 0.08],
    thuram: [0.08, 0.92, 0],
    neymar: [0.32, 0.98, 0],
    bsilva: [0.2, 0.96, 0],
    cucurella: [0.08, 1, 0],
    raphinha: [0.25, 0.98, 0.03],
    aguero: [0.24, 1, 0.02],
    vinicius: [0.3, 1, 0],
    bellingham: [0.16, 0.88, 0.08],
    forlan: [0.1, 0.9, 0],
    kvaratskhelia: [0.16, 0.86, 0.19],
    mbappe: [0, 1, 0],
    dembele: [0.18, 0.76, 0.17],
    olise: [0.12, 0.84, 0.16],
    kante: [0.22, 0.97, 0.02],
    messi: [0.1, 0.9, 0.17],
    ronaldo: [0.18, 0.82, 0.02],
    maradona: [0.1, 0.92, 0],
    cannavaro: [0.34, 0.97, 0.02]
  };
  const STORE_KEY = "leaguePacks";
  const PACK_PRICE = 1000;
  const START_COINS = 5000;
  const BONUS = 100;
  const BONUS_COOLDOWN = 24 * 3600 * 1000;
  const SELL_PRICE = { gold: 150, rare: 400, epic: 1000, icon: 2500, ballon: 5000 };
  const TEXT = {
    en: {
      back: "\u2190 League", packs: "packs opened", collected: "collected",
      title: "Void Football Pack", subtitle: "Tap the pack to open it", open: "Buy & open \u2014 ",
      again: "Open another pack", all: "Reveal all", hint: "Tap a card to reveal it", pack: "VOID PACK",
      collection: "Collection", gold: "GOLD", rare: "RARE", epic: "EPIC", icon: "ICON", ballon: "PHENOMENON",
      tabPacks: "Packs", tabCollection: "Collection", poor: "Not enough coins. Sell duplicates in the Collection or claim the daily bonus.",
      bonus: "Daily bonus +", bonusWait: "Bonus in ", sell: "Sell +",
      rewardGot: "League rewards: +{0} coins (win 200, draw 50, loss 20).",
      rewardNone: "No new league coins yet. Win 200, draw 50, loss 20.",
      rewardSignIn: "Sign in on the league page to receive coins for your matches.",
      rewardNoTeam: "This account is not linked to a team.",
      walletError: "Could not sync your shared wallet. Please try again."
    },
    ru: {
      back: "\u2190 Лига", packs: "паков открыто", collected: "собрано",
      title: "Пустотный пак футбола", subtitle: "Нажмите на пак, чтобы открыть", open: "Купить и открыть \u2014 ",
      again: "Открыть ещё пак", all: "Показать все", hint: "Нажмите на карту, чтобы открыть", pack: "ПУСТОТНЫЙ ПАК",
      collection: "Коллекция", gold: "ЗОЛОТО", rare: "РЕДКАЯ", epic: "ЭПИК", icon: "ЛЕГЕНДА", ballon: "ФЕНОМЕН",
      tabPacks: "Паки", tabCollection: "Коллекция", poor: "Не хватает монет. Продайте дубликаты в коллекции или заберите ежедневный бонус.",
      bonus: "Ежедневный бонус +", bonusWait: "Бонус через ", sell: "Продать +",
      rewardGot: "Награда лиги: +{0} монет (победа 200, ничья 50, поражение 20).",
      rewardNone: "Новых монет лиги пока нет. Победа 200, ничья 50, поражение 20.",
      rewardSignIn: "Войдите на странице лиги, чтобы получать монеты за матчи.",
      rewardNoTeam: "Этот аккаунт не привязан к команде.",
      walletError: "Не удалось синхронизировать общий баланс. Попробуйте ещё раз."
    }
  };

  const $ = id => document.getElementById(id);
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lang = localStorage.getItem("leagueLang") === "ru" ? "ru" : "en";
  let busy = false;
  let storeKey = STORE_KEY;
  const loadSave = (key, startCoins) => {
    const fresh = { opened: 0, owned: {}, coins: startCoins, bonusAt: 0 };
    try {
      const raw = JSON.parse(localStorage.getItem(key));
      if (raw && typeof raw.opened === "number" && raw.owned && typeof raw.owned === "object") {
        return { bonusAt: 0, ...raw, coins: typeof raw.coins === "number" ? raw.coins : startCoins };
      }
    } catch { /* start with an empty collection */ }
    return fresh;
  };
  let save = loadSave(storeKey, START_COINS);

  const tr = key => TEXT[lang][key];

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function persist() {
    try { localStorage.setItem(storeKey, JSON.stringify(save)); } catch { /* storage unavailable */ }
  }

  function renderOdds() {
    const list = $("odds");
    list.replaceChildren();
    [...TIERS].reverse().forEach(tier => {
      const item = el("li", `r-${tier}`);
      item.append(el("span", "", tr(tier)), el("b", "", `${TIER_WEIGHT[tier]}%`));
      list.append(item);
    });
  }

  function updateCoins() {
    $("statCoins").textContent = save.coins.toLocaleString();
    $("openButton").textContent = tr("open") + PACK_PRICE;
    $("openButton").classList.toggle("poor", save.coins < PACK_PRICE);
    const wait = save.bonusAt + BONUS_COOLDOWN - Date.now();
    const btn = $("bonusButton");
    btn.disabled = wait > 0;
    if (wait > 0) {
      const h = Math.floor(wait / 3600000), m = Math.ceil((wait % 3600000) / 60000);
      btn.textContent = `${tr("bonusWait")}${h}:${String(m % 60).padStart(2, "0")}`;
    } else {
      btn.textContent = tr("bonus") + BONUS;
    }
  }

  async function claimBonus() {
    if (!walletReady) return;
    if (!cloudClient && save.bonusAt + BONUS_COOLDOWN > Date.now()) return;
    if (cloudClient) {
      const { data, error } = await cloudClient.rpc("claim_league_daily_bonus");
      if (error || !data) {
        console.error("Daily coin bonus claim failed:", error || new Error("No wallet data"));
        $("buyNote").textContent = tr("rewardNone");
        $("buyNote").hidden = false;
        return;
      }
      if (!data.claimed) {
        save.bonusAt = Date.parse(data.bonus_at) || Date.now();
        $("buyNote").textContent = tr("rewardNone");
        $("buyNote").hidden = false;
      } else {
        save.coins = Number(data.balance) || 0;
        save.bonusAt = Date.parse(data.bonus_at) || Date.now();
      }
      persist();
      updateCoins();
      return;
    }
    save.coins += BONUS;
    save.bonusAt = Date.now();
    persist();
    updateCoins();
    $("buyNote").hidden = true;
  }

  async function sellOne(player) {
    if (!walletReady) return;
    if ((save.owned[player.id] || 0) < 2) return;
    if (cloudClient) {
      const { data, error } = await cloudClient.rpc("sell_league_duplicate", { p_player_id: player.id });
      if (error || !data) {
        console.error("Duplicate card sale failed:", error || new Error("No wallet data"));
        return;
      }
      save.owned[player.id] = Number(data.quantity) || 0;
      save.coins = Number(data.balance) || 0;
      persist();
      updateCoins();
      renderCollection();
      return;
    }
    save.owned[player.id] -= 1;
    save.coins += SELL_PRICE[tierOf(player)];
    persist();
    updateCoins();
    renderCollection();
  }

  function renderCollection() {
    const grid = $("collection");
    grid.replaceChildren();
    [...PLAYERS].sort((a, b) => b.rating - a.rating).forEach(player => {
      const count = save.owned[player.id] || 0;
      const item = el("div", `col-card${count ? "" : " locked"}`);
      item.append(buildCard(player));
      const foot = el("div", "col-foot");
      foot.append(el("span", "cnt", count ? `\u00d7${count}` : "\u2014"));
      if (count > 1) {
        const sell = el("button", "sell", tr("sell") + SELL_PRICE[tierOf(player)]);
        sell.type = "button";
        sell.addEventListener("click", () => sellOne(player));
        foot.append(sell);
      }
      item.append(foot);
      grid.append(item);
    });
    $("statCollected").textContent = String(PLAYERS.filter(player => save.owned[player.id]).length);
    $("statTotal").textContent = String(PLAYERS.length);
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $("backLink").textContent = tr("back");
    $("lblPacks").textContent = tr("packs");
    $("lblCollected").textContent = tr("collected");
    $("title").textContent = tr("title");
    document.title = tr("title");
    $("subtitle").textContent = tr("subtitle");
    $("tabPacks").textContent = tr("tabPacks");
    $("tabCollection").textContent = tr("tabCollection");
    $("againButton").textContent = tr("again");
    $("revealAllButton").textContent = tr("all");
    $("revealHint").textContent = tr("hint");
    $("packType").textContent = tr("pack");
    $("collectionTitle").textContent = tr("collection");
    if (!$("rewardNote").hidden) showReward();
    document.querySelectorAll(".pk-lang button").forEach(button =>
      button.classList.toggle("active", button.dataset.lang === lang));
    document.querySelectorAll(".card-tier").forEach(node => { node.textContent = tr(node.dataset.tier); });
    renderOdds();
    renderCollection();
    updateCoins();
  }

  function updateStats() {
    $("statPacks").textContent = String(save.opened);
    renderCollection();
  }

  // Each card rolls independently, so duplicates are possible and rare tiers stay rare.
  function drawCard() {
    let roll = Math.random() * TIERS.reduce((sum, tier) => sum + TIER_WEIGHT[tier], 0);
    const tier = TIERS.find(name => (roll -= TIER_WEIGHT[name]) < 0) || "gold";
    const pool = PLAYERS.filter(player => tierOf(player) === tier);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function drawPack() {
    return Array.from({ length: CARDS_PER_PACK }, drawCard).sort((a, b) => a.rating - b.rating);
  }

  function buildCard(player) {
    const tier = tierOf(player);
    const card = el("div", `card ${tier}`);
    if (tier === "ballon") card.append(el("div", "card-flame"));
    card.append(el("div", "card-shape"), el("div", "card-sheen"));
    if (tier === "ballon") {
      const fx = el("div", "card-fx");
      fx.innerHTML = '<i class="pulse"></i>' + [
        "M30 0 L22 30 L36 34 L18 70 L30 74 L10 120",
        "M78 0 L88 26 L74 32 L92 64 L80 70 L96 104",
        "M50 120 L58 92 L46 88 L60 56 L50 52 L64 18"
      ].map((d, n) => `<svg class="bolt b${n}" viewBox="0 0 100 120" preserveAspectRatio="none"><path d="${d}"/></svg>`).join("");
      card.append(fx);
    }
    const body = el("div", "card-body");

    const top = el("div", "card-top");
    const meta = el("div", "card-meta");
    meta.append(el("span", "card-rating", String(player.rating)), el("span", "card-pos", player.pos), el("span", "card-nation", player.nation));
    const photo = el("div", "card-photo");
    const image = new Image();
    image.alt = "";
    image.draggable = false;
    const sources = PHOTO_FILES[player.id] || [`${player.id}.webp`, `${player.id}.png`, `${player.id}.jpg`, `${player.id}.avif`];
    let attempt = 0;
    const [fx0, fx1, fy0] = PHOTO_CROP[player.id] || [0, 1, 0];
    image.onload = () => {
      const width = fx1 - fx0;
      const ratio = (image.naturalHeight / image.naturalWidth) * PHOTO_BOX / width;
      image.style.width = `${100 / width}%`;
      image.style.left = `${-100 * fx0 / width}%`;
      image.style.top = `${-100 * fy0 * ratio}%`;
      image.classList.add("ready");
    };
    image.onerror = () => {
      attempt += 1;
      if (attempt < sources.length) {
        image.src = `assets/card/${sources[attempt]}`;
        return;
      }
      image.remove();
      photo.append(el("span", "sil", "\uD83D\uDC64"));
    };
    image.src = `assets/card/${sources[0]}`;
    photo.append(image);
    top.append(meta, photo);

    const stats = el("div", "card-stats");
    player.stats.forEach((value, index) => {
      const row = el("div");
      row.append(el("b", "", String(value)), el("span", "", STAT_LABELS[index]));
      stats.append(row);
    });
    const tierLabel = el("div", "card-tier", tr(tier));
    tierLabel.dataset.tier = tier;

    body.append(top, el("div", "card-name", player.name), el("div", "card-line"), stats, tierLabel);
    card.append(body);
    return card;
  }

  function sparks(count, spread = 520, ambient = false) {
    const layer = $("particles");
    for (let i = 0; i < count; i += 1) {
      const spark = el("i", ambient ? "spark ambient" : "spark");
      if (ambient) {
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.bottom = "-10px";
        spark.style.setProperty("--d", `${6 + Math.random() * 6}s`);
        spark.style.animationDelay = `${-Math.random() * 8}s`;
      } else {
        const angle = Math.random() * Math.PI * 2;
        const distance = spread * (.3 + Math.random() * .7);
        spark.style.left = "50%";
        spark.style.top = "45%";
        spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
        spark.style.setProperty("--d", `${1 + Math.random() * 1.2}s`);
        spark.addEventListener("animationend", () => spark.remove());
      }
      layer.append(spark);
    }
  }

  function flash(kind = "") {
    const node = $("flash");
    node.className = `pk-flash ${kind}`;
    void node.offsetWidth;
    node.classList.add("go");
  }

  const fireworks = { rockets: [], parts: [], raf: 0, canvas: null, ctx: null };

  function fwResize() {
    const c = fireworks.canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = innerWidth * dpr;
    c.height = innerHeight * dpr;
    fireworks.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function fwFrame() {
    const { ctx, canvas } = fireworks;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,.22)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = "lighter";
    fireworks.rockets = fireworks.rockets.filter(r => {
      r.x += r.vx; r.y += r.vy; r.vy += .06; r.life -= 1;
      ctx.fillStyle = r.color;
      ctx.beginPath(); ctx.arc(r.x, r.y, 2.4, 0, 7); ctx.fill();
      if (r.vy >= -1 || r.life <= 0) { fwBurst(r.x, r.y, r.color, r.big); return false; }
      return true;
    });
    fireworks.parts = fireworks.parts.filter(p => {
      p.x += p.vx; p.y += p.vy; p.vx *= .985; p.vy = p.vy * .985 + .045; p.a -= p.fade;
      if (p.a <= 0) return false;
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      return true;
    });
    ctx.globalAlpha = 1;
    if (fireworks.rockets.length || fireworks.parts.length) {
      fireworks.raf = requestAnimationFrame(fwFrame);
    } else {
      fireworks.raf = 0;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  }

  function fwBurst(x, y, color, big) {
    const count = big ? 110 : 70;
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (big ? 1.5 : 1) * (1 + Math.random() * 4.5);
      fireworks.parts.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: 1.6 + Math.random() * 1.6, a: 1, fade: .008 + Math.random() * .012, color: Math.random() < .25 ? "#fff" : color });
    }
  }

  function launchFireworks(palette, count = 8) {
    if (reduceMotion) return;
    if (!fireworks.canvas) {
      fireworks.canvas = $("fireworks");
      fireworks.ctx = fireworks.canvas.getContext("2d");
      window.addEventListener("resize", fwResize);
    }
    fwResize();
    for (let i = 0; i < count; i += 1) {
      setTimeout(() => {
        const rise = innerHeight * (.4 + Math.random() * .3);
        fireworks.rockets.push({
          x: innerWidth * (.12 + Math.random() * .76), y: innerHeight + 10,
          vx: (Math.random() - .5) * 1.6, vy: -(rise + 91) / 55,
          life: 55, color: palette[Math.floor(Math.random() * palette.length)], big: Math.random() < .35
        });
        if (!fireworks.raf) fireworks.raf = requestAnimationFrame(fwFrame);
      }, i * 260 + Math.random() * 120);
    }
  }

  async function walkout(best) {
    const tier = tierOf(best);
    if (tier === "gold") return;
    const overlay = $("walkout");
    const text = $("walkoutText");
    overlay.className = `pk-walkout ${tier}`;
    overlay.hidden = false;
    const full = tier === "icon" || tier === "epic" || tier === "ballon";
    const lines = full
      ? [[best.country.toUpperCase(), "", ""], [best.pos, tr(tier), ""], [best.name.toUpperCase(), "", "name"], [String(best.rating), "", "rating"]]
      : [[tr(tier), "", ""]];
    for (const [big, small, extra] of lines) {
      text.replaceChildren(el("span", `wo-line ${extra}`.trim(), big));
      if (small) text.append(el("span", "wo-line small", small));
      overlay.append(el("i", "pk-ring"));
      overlay.classList.remove("shake");
      void overlay.offsetWidth;
      overlay.classList.add("shake");
      sparks(full ? 36 : 22, 460);
      flash(extra === "rating" ? (tier === "epic" ? "epic" : "gold") : "");
      await sleep(reduceMotion ? 200 : extra === "rating" ? 2300 : 1000);
      overlay.querySelectorAll(".pk-ring").forEach(node => node.remove());
    }
    await sleep(300);
    overlay.hidden = true;
  }

  const PHENOMENON_LINES = {
    messi: { en: ["91 GOALS", "HE'S INSANE"], ru: ["91 ГОЛ", "ОН СУМАСШЕДШИЙ"] },
    ronaldo: { en: ["HE WAS UNSTOPPABLE", "NOBODY COULD HOLD HIM"], ru: ["ЕГО БЫЛО НЕ УДЕРЖАТЬ", "НИКТО НЕ МОГ ОСТАНОВИТЬ"] },
    default: { en: ["UNSTOPPABLE", "A TRUE PHENOMENON"], ru: ["НЕУДЕРЖИМЫЙ", "НАСТОЯЩИЙ ФЕНОМЕН"] }
  };

  // Shared canvas scaffold for the Icon and Epic shows
  function startShow(overlay, cls, draw) {
    overlay.className = `pk-walkout ${cls}`;
    overlay.hidden = false;
    const canvas = el("canvas", "wo-show");
    overlay.append(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = innerWidth, H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const s = { run: true, t0: performance.now(), W, H, ctx };
    const loop = () => {
      if (!s.run) return;
      ctx.clearRect(0, 0, W, H);
      draw(s, (performance.now() - s.t0) / 1000);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    s.stop = () => { s.run = false; canvas.remove(); overlay.querySelectorAll(".pk-ring").forEach(n => n.remove()); overlay.hidden = true; };
    return s;
  }

  function showLine(overlay, text, big, small, extra, shake = true) {
    text.replaceChildren(el("span", `wo-line ${extra}`.trim(), big));
    if (small) text.append(el("span", "wo-line small", small));
    overlay.append(el("i", "pk-ring"));
    if (shake) {
      overlay.classList.remove("shake");
      void overlay.offsetWidth;
      overlay.classList.add("shake");
    }
  }

  // ICON: 5 seconds, calm golden show with respect
  async function iconWalkout(best) {
    if (reduceMotion) return walkout(best);
    const overlay = $("walkout"), text = $("walkoutText");
    text.replaceChildren();
    const motes = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), v: .05 + Math.random() * .12, r: 1 + Math.random() * 2.5 }));
    const show = startShow(overlay, "icon long", (s, t) => {
      const { ctx, W, H } = s;
      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * .6);
      g.addColorStop(0, `rgba(255,214,110,${.25 + .1 * Math.sin(t * 3)})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      motes.forEach(m => {
        m.y -= m.v / 60;
        if (m.y < 0) m.y = 1;
        ctx.fillStyle = "rgba(255,225,140,.8)";
        ctx.beginPath(); ctx.arc(m.x * W, m.y * H, m.r, 0, 7); ctx.fill();
      });
    });
    flash("gold");
    await sleep(500);
    showLine(overlay, text, best.country.toUpperCase(), "", "", false);
    sparks(24, 420);
    await sleep(1100);
    showLine(overlay, text, best.name.toUpperCase(), tr("icon"), "name", false);
    sparks(40, 520);
    await sleep(1500);
    showLine(overlay, text, String(best.rating), lang === "ru" ? "УВАЖЕНИЕ" : "RESPECT", "rating", false);
    flash("gold");
    sparks(70, 600);
    await sleep(1900);
    show.stop();
  }

  // EPIC: a black hole sucks everything in, then the player emerges
  async function epicWalkout(best) {
    if (reduceMotion) return walkout(best);
    const overlay = $("walkout"), text = $("walkoutText");
    text.replaceChildren();
    const parts = Array.from({ length: 220 }, () => ({ a: Math.random() * 6.28, d: .25 + Math.random() * .75, sp: .6 + Math.random(), c: Math.random() < .3 ? "#fff" : Math.random() < .5 ? "#c58bff" : "#8f4dff" }));
    let phase = 0;
    const show = startShow(overlay, "epic long", (s, t) => {
      const { ctx, W, H } = s;
      const cx = W / 2, cy = H / 2, M = Math.min(W, H);
      const pull = phase === 0 ? Math.min(1, t / 2.2) : 1;
      const R = M * (.04 + .17 * (phase === 0 ? pull : 1 - Math.min(1, (t - 2.2) * 1.5)));
      ctx.globalCompositeOperation = "lighter";
      parts.forEach(p => {
        p.d -= (.004 + pull * .012) * p.sp;
        p.a += .03 + (1 - p.d) * .12;
        if (p.d < .02) p.d = .9 + Math.random() * .1;
        const rad = p.d * Math.max(W, H) * .6;
        const x = cx + Math.cos(p.a) * rad, y = cy + Math.sin(p.a) * rad * .8;
        ctx.fillStyle = p.c;
        ctx.globalAlpha = Math.min(1, (1 - p.d) * 2 + .2);
        ctx.beginPath(); ctx.arc(x, y, 1.5 + (1 - p.d) * 2.5, 0, 7); ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      const g = ctx.createRadialGradient(cx, cy, R * .6, cx, cy, R * 2.4);
      g.addColorStop(0, "rgba(220,170,255,.95)");
      g.addColorStop(.3, "rgba(140,70,255,.6)");
      g.addColorStop(1, "rgba(60,0,120,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 2.4, 0, 7); ctx.fill();
      ctx.fillStyle = "#000";
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
    });
    overlay.classList.add("shake");
    await sleep(2200);
    phase = 1;
    flash("epic");
    sparks(80, 640);
    showLine(overlay, text, best.country.toUpperCase(), "", "");
    await sleep(900);
    showLine(overlay, text, best.name.toUpperCase(), best.pos + " \u00b7 " + tr("epic"), "name");
    sparks(50, 560);
    await sleep(1400);
    showLine(overlay, text, String(best.rating), tr("epic"), "rating");
    flash("epic");
    sparks(70, 600);
    await sleep(1700);
    show.stop();
  }

  // Synthesised sound for the Phenomenon show (needs a prior user gesture; silently skipped otherwise)
  function makeAudio() {
    let ac = null;
    try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
    if (ac.state === "suspended") ac.resume().catch(() => {});
    const master = ac.createGain();
    master.gain.value = .55;
    master.connect(ac.destination);
    const noiseBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i += 1) nd[i] = Math.random() * 2 - 1;
    const env = (g, t, a, peak, d) => {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + a);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    };
    const noise = (freq, dur, peak, type = "lowpass", attack = .02) => {
      const t = ac.currentTime;
      const src = ac.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
      const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq;
      const g = ac.createGain(); env(g, t, attack, peak, dur);
      src.connect(f); f.connect(g); g.connect(master);
      src.start(t); src.stop(t + dur + attack + .1);
      return f;
    };
    return {
      rumble(dur) {
        const f = noise(90, dur, .9, "lowpass", dur * .6);
        f.frequency.linearRampToValueAtTime(260, ac.currentTime + dur);
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = "sawtooth"; o.frequency.setValueAtTime(38, ac.currentTime);
        o.frequency.exponentialRampToValueAtTime(110, ac.currentTime + dur);
        env(g, ac.currentTime, dur * .7, .35, dur * .3);
        o.connect(g); g.connect(master); o.start(); o.stop(ac.currentTime + dur + .2);
      },
      boom() {
        noise(500, 1.8, 1.1, "lowpass", .01);
        const o = ac.createOscillator(), g = ac.createGain();
        o.frequency.setValueAtTime(120, ac.currentTime);
        o.frequency.exponentialRampToValueAtTime(28, ac.currentTime + 1.4);
        env(g, ac.currentTime, .01, 1, 1.5);
        o.connect(g); g.connect(master); o.start(); o.stop(ac.currentTime + 1.6);
      },
      whoosh(dur) {
        const f = noise(300, dur, .6, "bandpass", dur * .7);
        f.frequency.exponentialRampToValueAtTime(3500, ac.currentTime + dur);
      },
      // "Synthetic Deception" by JoelFazhari (Pixabay Content License), starts with the card and fades out at the end
      track(dur) {
        const a = new Audio("assets/sfx/synthetic-deception.mp3");
        a.volume = 0;
        a.play().catch(() => {});
        const t0 = performance.now();
        const tick = setInterval(() => {
          const s = (performance.now() - t0) / 1000;
          a.volume = Math.max(0, Math.min(.9, s / .4, (dur - s) / 1.2));
          if (s >= dur) { clearInterval(tick); a.pause(); }
        }, 50);
      },
      close() { setTimeout(() => ac.close().catch(() => {}), 1500); }
    };
  }

  // 15 second show reserved for the PHENOMENON tier
  async function phenomenonWalkout(best) {
    if (reduceMotion) return walkout(best);
    const overlay = $("walkout");
    const text = $("walkoutText");
    const audio = makeAudio();
    overlay.className = "pk-walkout ballon pheno";
    overlay.hidden = false;
    text.replaceChildren();
    const canvas = el("canvas", "wo-show");
    overlay.append(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = innerWidth, H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const t0 = performance.now();
    const st = { level: 0, glow: 0, fire: [], bolts: [], run: true, cracks: [], debris: [], burst: [], sparks: [], fireOn: false };
    const cx = W / 2, cy = H * .46, M = Math.min(W, H);
    const stars = Array.from({ length: 280 }, () => ({ a: Math.random() * 6.28, d: Math.random(), s: .6 + Math.random() * 1.8, tw: Math.random() * 6 }));
    const swarm = Array.from({ length: 260 }, () => ({ a: Math.random() * 6.28, d: .2 + Math.random() * .8, sp: .6 + Math.random(), c: Math.random() < .35 ? "#fff" : Math.random() < .5 ? "#ff9a2e" : "#ff3b1f" }));
    const WORDS = lang === "ru"
      ? ["ЛУЧШИЙ", "ФЕНОМЕН", "НЕРЕАЛЬНЫЙ", "ЛЕГЕНДА", "КОРОЛЬ", "ГЕНИЙ", "БЕССМЕРТНЫЙ", "МОНСТР", "КОЗЁЛ", "НЕУДЕРЖИМЫЙ", "ИНОПЛАНЕТЯНИН", "БОГ ФУТБОЛА", "ВЕЛИЧАЙШИЙ", "ВЕЧНЫЙ", "БЕЗ СЛАБЫХ МЕСТ", "АБСОЛЮТ", "ТИТАН", "НЕПОБЕДИМЫЙ", "ИКОНА", "ЛЕГЕНДА ВЕКА", "ВЛАСТЕЛИН ПОЛЯ", "ЖИВОЙ МИФ", "ВНЕ КОНКУРЕНЦИИ", "ИСТОРИЯ", "БЕЗУПРЕЧНЫЙ", "ОДИН ТАКОЙ", "ПОВЕЛИТЕЛЬ МЯЧА", "ЭПОХА", "СВЕРХЧЕЛОВЕК", "НЕЗАБЫВАЕМЫЙ"]
      : ["THE BEST", "PHENOMENON", "UNREAL", "LEGEND", "KING", "GENIUS", "IMMORTAL", "MONSTER", "G.O.A.T.", "UNSTOPPABLE", "ALIEN", "FOOTBALL GOD", "GREATEST", "ETERNAL", "FLAWLESS", "ABSOLUTE", "TITAN", "INVINCIBLE", "ICON", "LEGEND OF AGES", "MASTER OF THE PITCH", "LIVING MYTH", "BEYOND COMPARE", "HISTORY", "PERFECTION", "ONE OF A KIND", "LORD OF THE BALL", "AN ERA", "SUPERHUMAN", "UNFORGETTABLE"];
    const wordColors = ["#ffd75e", "#ff7a2e", "#ffffff", "#ff4a3a", "#ffb02e"];
    // one word every ~0.22s from 7.7s on, each drifting out for 2.6s, at golden-angle spread
    const words = WORDS.map((text, i) => ({
      text,
      a: i * 2.39996 + (Math.random() - .5) * .3,
      t0: 7.7 + i * .22,
      s: .8 + Math.random() * .5,
      rot: (Math.random() - .5) * .5,
      c: wordColors[i % wordColors.length]
    }));
    const inflow = Array.from({ length: 160 }, () => ({
      a: Math.random() * 6.28, r: Math.max(W, H) * (.25 + Math.random() * .6),
      c: Math.random() < .5 ? "#ffe9b0" : Math.random() < .5 ? "#ff9a2e" : "#b78bff"
    }));
    const explode = () => {
      for (let i = 0; i < 260; i += 1) {
        const a = Math.random() * 6.28, v = 3 + Math.random() * 17;
        st.burst.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: 14 + Math.random() * 46, life: 1 });
      }
      for (let i = 0; i < 420; i += 1) {
        const a = Math.random() * 6.28, v = 6 + Math.random() * 34;
        st.sparks.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 1 + Math.random() * 3, life: 1, dec: .006 + Math.random() * .014 });
      }
      setTimeout(() => {
        for (let i = 0; i < 160; i += 1) {
          const a = Math.random() * 6.28, v = 4 + Math.random() * 22;
          st.sparks.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 1 + Math.random() * 2.5, life: 1, dec: .008 + Math.random() * .012 });
        }
      }, 900);
    };
    const drawHole = (R, t) => {
      // the hole breathes and drifts; its disc tilts and precesses
      const hx = cx + Math.sin(t * 1.7) * M * .012, hy = cy + Math.cos(t * 1.3) * M * .012;
      R *= 1 + .035 * Math.sin(t * 6.5) + .02 * Math.sin(t * 2.3);
      const grav = Math.min(1, R / (M * .2));
      const tilt = .3 + .13 * Math.sin(t * .8), prec = Math.sin(t * .55) * .45;
      const cp = Math.cos(prec), sp = Math.sin(prec);
      const discXY = (r, a) => {
        const x = Math.cos(a) * r, y = Math.sin(a) * r * tilt;
        return [hx + x * cp - y * sp, hy + x * sp + y * cp];
      };
      ctx.globalCompositeOperation = "lighter";
      const glow = ctx.createRadialGradient(hx, hy, R * .8, hx, hy, R * (3.2 + .4 * Math.sin(t * 4)));
      glow.addColorStop(0, "rgba(255,140,40,.8)");
      glow.addColorStop(.4, "rgba(200,50,20,.35)");
      glow.addColorStop(1, "rgba(80,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(hx, hy, R * 3.6, 0, 7); ctx.fill();

      // gravity waves collapsing into the hole
      for (let k = 0; k < 4; k += 1) {
        const ph = (t * .45 + k / 4) % 1;
        ctx.strokeStyle = `rgba(190,120,255,${.5 * Math.sin(ph * Math.PI)})`;
        ctx.lineWidth = 2 + R * .03;
        ctx.beginPath(); ctx.arc(hx, hy, R * (5 - 3.8 * ph), 0, 7); ctx.stroke();
      }

      // stars and debris are stretched into streaks while spiralling in
      swarm.forEach(p => {
        const r0 = R + p.d * Math.max(W, H) * .6, a0 = p.a;
        p.d -= (.004 + .012 * grav) * p.sp * (1 + (1 - p.d) * 1.5);
        p.a += .05 + (1 - p.d) * .3;
        if (p.d < .03) { p.d = .95; p.a = Math.random() * 6.28; }
        const r1 = R + p.d * Math.max(W, H) * .6;
        ctx.strokeStyle = p.c;
        ctx.globalAlpha = Math.min(1, (1 - p.d) * 2.2 + .15);
        ctx.lineWidth = 1.2 + (1 - p.d) * 2.4;
        ctx.beginPath();
        ctx.moveTo(hx + Math.cos(a0) * r0, hy + Math.sin(a0) * r0 * .85);
        ctx.lineTo(hx + Math.cos(p.a) * r1, hy + Math.sin(p.a) * r1 * .85);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // relativistic jets along the spin axis
      const jl = R * (2.6 + .8 * Math.sin(t * 5) + .5 * Math.sin(t * 13));
      [-1, 1].forEach(d => {
        const jx = hx + sp * d * jl * .15, jy = hy - d * jl;
        const g = ctx.createLinearGradient(hx, hy, jx, jy);
        g.addColorStop(0, "rgba(255,240,210,.7)");
        g.addColorStop(.5, "rgba(170,110,255,.35)");
        g.addColorStop(1, "rgba(80,0,160,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.moveTo(hx - R * .3, hy); ctx.lineTo(jx, jy); ctx.lineTo(hx + R * .3, hy); ctx.fill();
      });

      // differentially rotating spiral arms
      ctx.save();
      ctx.translate(hx, hy);
      for (let arm = 0; arm < 5; arm += 1) {
        const base = t * 2.4 + arm * (Math.PI * 2 / 5);
        for (let pass = 0; pass < 2; pass += 1) {
          ctx.beginPath();
          for (let i = 0; i <= 60; i += 1) {
            const u = i / 60, r = R * (1.02 + u * 2.6);
            const a = base - t * u * .9 + u * 4.2 + pass * .08;
            const x = Math.cos(a) * r, y = Math.sin(a) * r;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = pass ? "rgba(255,230,170,.5)" : "rgba(255,90,25,.4)";
          ctx.lineWidth = pass ? R * .035 : R * .14;
          ctx.stroke();
        }
      }
      ctx.restore();

      // accretion disc made of orbiting matter (inner parts orbit faster, approaching side is brighter)
      const drawDisc = front => {
        disc.forEach(p => {
          if (Math.sin(p.a) >= 0 !== front) return;
          const [x, y] = discXY(R * p.r, p.a);
          const dop = .3 + .7 * (.5 + .5 * Math.cos(p.a + prec));
          ctx.fillStyle = `hsla(${18 + (p.r - 1) * 22},100%,${Math.max(45, 96 - (p.r - 1) * 24)}%,${Math.min(1, dop * (1.4 - (p.r - 1) * .3))})`;
          const s = 1.2 + dop * 1.8 + (2.6 - p.r) * .5;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        });
      };
      disc.forEach(p => {
        p.a += .09 * Math.pow(p.r, -1.5) * 3.2;
        p.r -= .0009 * grav;
        if (p.r < 1.08) { p.r = 3.7; p.a = Math.random() * 6.28; }
      });
      drawDisc(false);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#000";
      ctx.beginPath(); ctx.arc(hx, hy, R, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(255,200,120,.95)"; ctx.lineWidth = Math.max(2, R * .04);
      ctx.shadowColor = "#ff7a1a"; ctx.shadowBlur = 24;
      ctx.beginPath(); ctx.arc(hx, hy, R * (1.03 + .015 * Math.sin(t * 9)), 0, 7); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "lighter";
      // lensed light of the far side of the disc arching over the top of the hole
      ctx.strokeStyle = "rgba(255,190,100,.55)";
      ctx.lineWidth = R * .07;
      ctx.beginPath(); ctx.ellipse(hx, hy, R * 1.12, R * 1.12, prec, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
      drawDisc(true);
    };
    const disc = Array.from({ length: 1100 }, () => ({ r: 1.15 + Math.random() * 2.6, a: Math.random() * 6.28 }));
    const scene = t => {
      const u = Math.min(1, t / 2.5);
      ctx.globalCompositeOperation = "lighter";
      if (u > 0) {
        const nr = M * (.1 + 1.1 * u);
        const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, nr);
        neb.addColorStop(0, `rgba(90,50,200,${.55 * u})`);
        neb.addColorStop(.5, `rgba(40,20,110,${.35 * u})`);
        neb.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = neb;
        ctx.fillRect(0, 0, W, H);
      }
      stars.forEach(s => {
        const rad = s.d * Math.max(W, H) * .75 * Math.sqrt(u);
        ctx.globalAlpha = Math.min(1, u * 1.4) * (.55 + .45 * Math.sin(t * 3 + s.tw));
        ctx.fillStyle = "#e8e4ff";
        ctx.beginPath(); ctx.arc(cx + Math.cos(s.a) * rad, cy + Math.sin(s.a) * rad * .8, s.s, 0, 7); ctx.fill();
      });
      ctx.globalAlpha = 1;
      // implosion: energy streams into a single point before the blast
      if (t > 1.0 && t < 2.55) {
        const k = (t - 1.0) / 1.5;
        ctx.globalCompositeOperation = "lighter";
        inflow.forEach(p => {
          const r0 = p.r * (1 - k * k), r1 = p.r * (1 - Math.min(1, k + .12) ** 2);
          const a = p.a + k * 2.2;
          ctx.strokeStyle = p.c; ctx.globalAlpha = .35 + .6 * k;
          ctx.lineWidth = 1 + k * 1.6;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * .85);
          ctx.lineTo(cx + Math.cos(a + .08) * r1, cy + Math.sin(a + .08) * r1 * .85);
          ctx.stroke();
        });
        ctx.globalAlpha = 1;
        const pr = 4 + k * k * M * .05;
        const pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, pr * 4);
        pg.addColorStop(0, "rgba(255,255,255,1)");
        pg.addColorStop(.3, "rgba(255,210,120,.8)");
        pg.addColorStop(1, "rgba(255,80,20,0)");
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(cx, cy, pr * 4, 0, 7); ctx.fill();
      }
      const te = t - 2.5;
      if (te > 0 && te < 3.2) {
        ctx.globalCompositeOperation = "lighter";
        const maxR = Math.max(W, H);
        // white-hot core and blinding flash
        if (te < 1.6) {
          const k = te / 1.6, cr = M * (.1 + .6 * k);
          const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
          core.addColorStop(0, `rgba(255,255,255,${1 - k})`);
          core.addColorStop(.35, `rgba(255,190,70,${.85 * (1 - k)})`);
          core.addColorStop(.7, `rgba(230,60,20,${.5 * (1 - k)})`);
          core.addColorStop(1, "rgba(120,0,0,0)");
          ctx.fillStyle = core;
          ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 7); ctx.fill();
        }
        // rotating god rays
        const rayK = Math.max(0, 1 - te / 2.2);
        if (rayK > 0) {
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(te * .45);
          for (let i = 0; i < 28; i += 1) {
            const a = i * Math.PI * 2 / 28, wdt = .05 + .03 * Math.sin(i * 2.7);
            const rg = ctx.createLinearGradient(0, 0, Math.cos(a) * maxR, Math.sin(a) * maxR);
            rg.addColorStop(0, `rgba(255,230,170,${.5 * rayK})`);
            rg.addColorStop(1, "rgba(255,120,30,0)");
            ctx.fillStyle = rg;
            ctx.beginPath(); ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(a - wdt) * maxR, Math.sin(a - wdt) * maxR);
            ctx.lineTo(Math.cos(a + wdt) * maxR, Math.sin(a + wdt) * maxR);
            ctx.fill();
          }
          ctx.restore();
        }
        // layered shockwaves: gold, orange, violet, plus a delayed second pulse
        [[0, "255,225,150", 44], [.18, "255,120,40", 30], [.4, "170,90,255", 22], [.9, "255,200,120", 26]].forEach(([d, c, w]) => {
          const k = (te - d) / 2.2;
          if (k <= 0 || k >= 1) return;
          const rr = (1 - (1 - k) ** 3) * maxR * .85;
          ctx.strokeStyle = `rgba(${c},${.9 * (1 - k)})`;
          ctx.lineWidth = w * (1 - k) + 2;
          ctx.shadowColor = `rgb(${c})`; ctx.shadowBlur = 30;
          ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke();
          ctx.shadowBlur = 0;
        });
        // anamorphic lens flare
        if (te < 1.2) {
          const k = 1 - te / 1.2;
          const fl = ctx.createLinearGradient(cx - W, cy, cx + W, cy);
          fl.addColorStop(0, "rgba(255,170,60,0)");
          fl.addColorStop(.5, `rgba(255,240,200,${.9 * k})`);
          fl.addColorStop(1, "rgba(255,170,60,0)");
          ctx.fillStyle = fl;
          ctx.fillRect(0, cy - 5 * k - 1, W, 10 * k + 2);
        }
      }
      // sparks with motion trails
      ctx.globalCompositeOperation = "lighter";
      st.sparks = st.sparks.filter(p => {
        const px = p.x, py = p.y;
        p.x += p.vx; p.y += p.vy; p.vx *= .975; p.vy = p.vy * .975 + .08; p.life -= p.dec;
        if (p.life <= 0) return false;
        ctx.strokeStyle = `rgba(255,${Math.round(120 + 135 * p.life)},${Math.round(60 * p.life)},${p.life})`;
        ctx.lineWidth = p.w * p.life + .5;
        ctx.beginPath(); ctx.moveTo(px - p.vx * 1.5, py - p.vy * 1.5); ctx.lineTo(p.x, p.y); ctx.stroke();
        return true;
      });
      ctx.globalCompositeOperation = "source-over";
      st.burst = st.burst.filter(p => {
        p.x += p.vx; p.y += p.vy; p.vx *= .97; p.vy *= .97; p.life -= .012;
        if (p.life <= 0) return false;
        ctx.globalCompositeOperation = "lighter";
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(255,${Math.round(190 * p.life + 40)},60,${.5 * p.life})`);
        g.addColorStop(1, "rgba(150,10,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        return true;
      });
      ctx.globalCompositeOperation = "source-over";
      if (t > 4.2) {
        const grow = Math.min(1, (t - 4.2) / 1.6);
        const R = t < 9.2 ? M * .2 * grow : M * (.3 + .01 * Math.sin(t * 5));
        drawHole(R, t);
      }
      if (t > 7.7 && t < 15) {
        ctx.globalCompositeOperation = "source-over";
        words.forEach(w => {
          if (t < w.t0) return;
          const k = (t - w.t0) / 2.3;
          if (k > 1) return;
          const e = 1 - (1 - k) ** 2.2;
          const x = cx + Math.cos(w.a) * e * W * .62, y = cy + Math.sin(w.a) * e * H * .5;
          const sc = (.15 + e * 1.5) * w.s;
          ctx.save();
          ctx.translate(x, y); ctx.rotate(w.rot * e); ctx.scale(sc, sc);
          ctx.globalAlpha = Math.min(1, k * 7) * (1 - k * k * k);
          ctx.font = `700 ${Math.round(M * .07)}px Oswald, Impact, sans-serif`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.lineJoin = "round"; ctx.lineWidth = 7; ctx.strokeStyle = "rgba(60,0,0,.9)";
          ctx.shadowColor = w.c; ctx.shadowBlur = 26;
          ctx.strokeText(w.text, 0, 0);
          const tg = ctx.createLinearGradient(0, -M * .04, 0, M * .04);
          tg.addColorStop(0, "#fff7d6"); tg.addColorStop(.5, w.c); tg.addColorStop(1, "#c4500e");
          ctx.fillStyle = tg;
          ctx.fillText(w.text, 0, 0);
          ctx.restore();
        });
        ctx.globalAlpha = 1;
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const addCrack = (x, y) => {
      const arms = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < arms; i += 1) {
        let a = Math.random() * Math.PI * 2, px = x, py = y;
        const pts = [[px, py]];
        for (let s = 0; s < 7; s += 1) {
          a += (Math.random() - .5) * .9;
          const l = 20 + Math.random() * 55;
          px += Math.cos(a) * l; py += Math.sin(a) * l;
          pts.push([px, py]);
        }
        st.cracks.push({ pts, life: 1 });
      }
      for (let i = 0; i < 14; i += 1) {
        st.debris.push({ x, y, vx: (Math.random() - .5) * 9, vy: -2 - Math.random() * 7, s: 3 + Math.random() * 8, rot: Math.random() * 6, life: 1 });
      }
    };

    const makeBolt = (x1, y1, x2, y2, width, depth) => {
      const pts = [[x1, y1]];
      const steps = 14;
      const len = Math.hypot(x2 - x1, y2 - y1);
      for (let i = 1; i < steps; i += 1) {
        const k = i / steps;
        const off = (Math.random() - .5) * len * .09;
        pts.push([x1 + (x2 - x1) * k + off, y1 + (y2 - y1) * k + (Math.random() - .5) * len * .03]);
      }
      pts.push([x2, y2]);
      st.bolts.push({ pts, width, life: 1 });
      if (depth > 0) {
        for (let i = 3; i < steps; i += 3) {
          if (Math.random() < .55) {
            const [bx, by] = pts[i];
            const ang = Math.atan2(y2 - y1, x2 - x1) + (Math.random() - .5) * 1.6;
            const bl = len * (.12 + Math.random() * .2);
            makeBolt(bx, by, bx + Math.cos(ang) * bl, by + Math.sin(ang) * bl, width * .55, depth - 1);
          }
        }
      }
    };
    const strike = (n, power = .6) => {
      for (let i = 0; i < n; i += 1) {
        const x = W * (.05 + Math.random() * .9);
        makeBolt(x, -10, x + (Math.random() - .5) * W * .4, H * (.55 + Math.random() * .5), 3 + Math.random() * 2.5, 2);
      }
      if (power >= .5 && Math.random() < .7) addCrack(W * (.1 + Math.random() * .8), H * (.2 + Math.random() * .6));
      st.glow = Math.min(1, st.glow + power);
    };

    const frame = () => {
      if (!st.run) return;
      ctx.clearRect(0, 0, W, H);
      scene((performance.now() - t0) / 1000);
      ctx.globalCompositeOperation = "source-over";
      st.cracks = st.cracks.filter(c => {
        c.life -= .006;
        if (c.life <= 0) return false;
        ctx.beginPath();
        c.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.strokeStyle = `rgba(255,170,60,${c.life})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        return true;
      });
      st.debris = st.debris.filter(d => {
        d.x += d.vx; d.y += d.vy; d.vy += .35; d.rot += .2; d.life -= .012;
        if (d.life <= 0) return false;
        ctx.save();
        ctx.translate(d.x, d.y); ctx.rotate(d.rot);
        ctx.fillStyle = `rgba(255,${Math.round(90 + 120 * d.life)},40,${d.life})`;
        ctx.fillRect(-d.s / 2, -d.s / 2, d.s, d.s * .6);
        ctx.restore();
        return true;
      });
      ctx.globalCompositeOperation = "lighter";
      const emit = st.fireOn ? Math.round(10 + st.level * 16) : 0;
      for (let i = 0; i < emit; i += 1) {
        st.fire.push({
          x: Math.random() * W, y: H + 20, vx: (Math.random() - .5) * 1.4,
          vy: -(2 + Math.random() * 4.5) * (.7 + st.level * .5),
          r: 24 + Math.random() * 50, life: 1, ember: Math.random() < .18
        });
      }
      st.fire = st.fire.filter(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.ember ? .008 : .018;
        if (p.life <= 0) return false;
        if (p.ember) {
          ctx.fillStyle = `rgba(255,${Math.round(150 + 80 * p.life)},60,${p.life})`;
          ctx.fillRect(p.x, p.y, 2.5, 2.5);
          return true;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(255,${Math.round(200 * p.life + 30)},60,${.32 * p.life})`);
        g.addColorStop(.5, `rgba(255,70,20,${.2 * p.life})`);
        g.addColorStop(1, "rgba(120,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        return true;
      });
      st.bolts = st.bolts.filter(b => {
        b.life -= .07;
        if (b.life <= 0) return false;
        ctx.lineJoin = "round";
        ctx.beginPath();
        b.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.strokeStyle = `rgba(255,70,40,${.55 * b.life})`;
        ctx.lineWidth = b.width * 4;
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,255,255,${b.life})`;
        ctx.lineWidth = b.width;
        ctx.stroke();
        return true;
      });
      if (st.glow > .02) {
        ctx.fillStyle = `rgba(255,200,170,${st.glow * .5})`;
        ctx.fillRect(0, 0, W, H);
        st.glow *= .88;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    const line = (big, small, extra) => {
      text.replaceChildren(el("span", `wo-line ${extra}`.trim(), big));
      if (small) text.append(el("span", "wo-line small", small));
      overlay.classList.remove("shake");
      void overlay.offsetWidth;
      overlay.classList.add("shake");
    };
    const at = async sec => { await sleep(Math.max(0, sec * 1000 - (performance.now() - t0))); };
    const [p1, p2] = (PHENOMENON_LINES[best.id] || PHENOMENON_LINES.default)[lang];
    const arrived = lang === "ru" ? "ОНИ ЯВИЛИСЬ..." : "THEY HAVE ARRIVED...";

    // 1. the universe forms
    if (audio) audio.rumble(2.6);
    await at(2.5);
    // 2. fiery explosion
    explode();
    st.fireOn = true; st.level = 1;
    flash("red");
    overlay.classList.add("shake");
    await at(4.4);
    // 3. the black hole pulls everything in
    line(arrived, "", "stretch");
    if (audio) audio.rumble(3.4);
    await at(7.6);
    // 4. words burst out of the hole
    text.replaceChildren();
    st.fireOn = false;
    flash("red");
    await at(9.2);
    // 5. the card bursts out in front of the hunger of the black hole
    flash("gold");
    st.level = 1.5;
    const card = el("div", "wo-card");
    card.append(buildCard(best));
    overlay.append(card);
    overlay.classList.add("cap");
    overlay.classList.remove("shake");
    void overlay.offsetWidth;
    overlay.classList.add("shake");
    // 6. screams from the black hole
    if (audio) audio.boom();
    if (audio) audio.track(5.8);
    const storm = setInterval(() => { if (Math.random() < .5) strike(1, .3); }, 380);
    sparks(90, 620);
    await at(10.6);
    line(p1, "", "name");
    sparks(40, 520);
    await at(12.8);
    line(p2, "", "name");
    sparks(40, 520);
    await at(15);
    clearInterval(storm);
    if (audio) audio.close();
    st.run = false;
    canvas.remove();
    card.remove();
    overlay.classList.remove("cap");
    overlay.hidden = true;
  }

  function playWalkout(best) {
    const tier = tierOf(best);
    if (tier === "ballon") return phenomenonWalkout(best);
    if (tier === "icon") return iconWalkout(best);
    if (tier === "epic") return epicWalkout(best);
    return walkout(best);
  }

  function showCards(cards) {
    const container = $("cards");
    container.replaceChildren();
    $("reveal").hidden = false;
    $("actions").hidden = true;
    $("revealHint").hidden = false;
    $("revealAllButton").hidden = cards.length < 2;
    window.scrollTo({ top: 0 });
    let remaining = cards.length;

    const finish = () => {
      $("actions").hidden = false;
      $("revealHint").hidden = true;
      $("revealAllButton").hidden = true;
      busy = false;
    };

    const reveal = (slot, player) => {
      if (slot.classList.contains("revealed")) return;
      slot.classList.add("revealed");
      const tier = tierOf(player);
      if (tier === "icon" || tier === "epic" || tier === "ballon") {
        flash(tier === "epic" ? "epic" : "gold");
        sparks(tier === "ballon" ? 100 : tier === "icon" ? 70 : 45, 620);
        launchFireworks(tier === "epic" ? ["#c58bff", "#e8ccff", "#ffffff"] : ["#ffffff", "#ffe27a", "#f2c94c"], tier === "ballon" ? 12 : 6);
      } else if (tier === "rare") {
        sparks(28, 450);
      } else {
        sparks(12, 280);
      }
      save.owned[player.id] = (save.owned[player.id] || 0) + 1;
      persist();
      renderCollection();
      remaining -= 1;
      if (remaining === 0) setTimeout(finish, 900);
    };

    cards.forEach((player, index) => {
      const slot = el("button", "slot");
      slot.type = "button";
      slot.style.setProperty("--i", String(index));
      slot.setAttribute("aria-label", `Card ${index + 1}`);
      const flipper = el("div", "flipper");
      const back = el("div", "face back");
      back.append(el("span", "", "?"));
      const front = el("div", "face front");
      front.append(buildCard(player));
      flipper.append(back, front);
      slot.append(flipper);
      slot.addEventListener("click", () => reveal(slot, player));
      slot._reveal = () => reveal(slot, player);
      container.append(slot);
    });

    $("revealAllButton").onclick = async () => {
      const slots = [...container.querySelectorAll(".slot:not(.revealed)")];
      for (const slot of slots) {
        slot._reveal();
        await sleep(650);
      }
    };
  }

  async function openPack() {
    if (busy || !walletReady) return;
    if (!cloudClient && save.coins < PACK_PRICE) {
      const note = $("buyNote");
      note.textContent = tr("poor");
      note.hidden = false;
      const box = $("coinsBox");
      box.classList.remove("bump");
      void box.offsetWidth;
      box.classList.add("bump");
      return;
    }
    busy = true;
    $("openButton").disabled = true;
    $("buyNote").hidden = true;
    const pack = $("pack");
    let cards = drawPack();
    if (cloudClient) {
      const { data, error } = await cloudClient.rpc("open_league_pack", {
        p_initial_balance: save.coins,
        p_initial_inventory: save.owned
      });
      if (error || !data) {
        console.error("Pack purchase failed:", error || new Error("No wallet data"));
        $("buyNote").textContent = tr("walletError");
        $("buyNote").hidden = false;
        busy = false;
        $("openButton").disabled = false;
        return;
      }
      const awardedPlayer = PLAYERS.find(player => player.id === data.player_id);
      if (!data.purchased) {
        save.coins = Number(data.balance) || 0;
        updateCoins();
        $("buyNote").textContent = tr("poor");
        $("buyNote").hidden = false;
        busy = false;
        $("openButton").disabled = false;
        return;
      }
      if (!awardedPlayer) {
        console.error("Pack purchase returned an invalid card:", data);
        save.coins = Number(data.balance) || 0;
        persist();
        updateCoins();
        $("buyNote").textContent = tr("walletError");
        $("buyNote").hidden = false;
        busy = false;
        $("openButton").disabled = false;
        return;
      }
      save.coins = Number(data.balance) || 0;
      cards = [awardedPlayer];
    } else {
      save.coins -= PACK_PRICE;
    }
    save.opened += 1;
    persist();
    updateCoins();
    $("statPacks").textContent = String(save.opened);

    const phases = reduceMotion ? [] : [
      { d: ".14s", a: "2px", g: "30px", t: 900 },
      { d: ".1s", a: "4px", g: "50px", t: 900 },
      { d: ".07s", a: "7px", g: "80px", t: 800 }
    ];
    for (const phase of phases) {
      pack.classList.add("shaking");
      pack.style.setProperty("--sd", phase.d);
      pack.style.setProperty("--a", phase.a);
      pack.style.setProperty("--g", phase.g);
      sparks(10, 260);
      await sleep(phase.t);
    }
    pack.classList.remove("shaking");
    pack.classList.add("burst");
    flash();
    sparks(60, 700);
    await sleep(650);
    $("intro").classList.add("gone");
    const best = cards[cards.length - 1];
    await playWalkout(best);
    showCards(cards);
  }

  function reset() {
    $("reveal").hidden = true;
    $("openButton").disabled = false;
    $("pack").classList.remove("burst", "shaking");
    $("intro").classList.remove("gone");
    busy = false;
  }

  function setView(view) {
    const isPacks = view === "packs";
    $("stage").hidden = !isPacks;
    $("collectionView").hidden = isPacks;
    document.querySelectorAll(".pk-tabs button").forEach(button =>
      button.classList.toggle("active", button.dataset.view === view));
    window.scrollTo({ top: 0 });
  }

  $("pack").addEventListener("click", openPack);
  $("openButton").addEventListener("click", openPack);
  $("againButton").addEventListener("click", reset);
  $("bonusButton").addEventListener("click", claimBonus);
  document.querySelectorAll(".pk-tabs button").forEach(button =>
    button.addEventListener("click", () => setView(button.dataset.view)));
  document.querySelectorAll(".pk-lang button").forEach(button => {
    button.addEventListener("click", () => {
      lang = button.dataset.lang;
      localStorage.setItem("leagueLang", lang);
      applyLang();
    });
  });

  applyLang();
  updateStats();
  sparks(26, 0, true);

  // Signed-in accounts use shared server wallets; guests keep local saves.
  let cloudClient = null;
  let walletChannel = null;
  let walletReady = false;
  let rewardState = "signin";
  let rewardAmount = 0;
  function showReward() {
    const note = $("rewardNote");
    note.hidden = false;
    note.textContent = rewardState === "got" ? tr("rewardGot").replace("{0}", rewardAmount.toLocaleString())
      : rewardState === "none" ? tr("rewardNone")
        : rewardState === "noteam" ? tr("rewardNoTeam") : tr("rewardSignIn");
  }
  async function syncLeagueCoins() {
    try {
      const [{ createClient }, { SUPABASE_URL, SUPABASE_ANON_KEY }] = await Promise.all([
        import("https://esm.sh/@supabase/supabase-js@2"), import("./supabase-config.js")
      ]);
      const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data } = await client.auth.getSession();
      if (!data.session) {
        walletReady = true;
        showReward();
        return;
      }
      while (busy) await sleep(500);
      cloudClient = client;
      if (!walletChannel) {
        walletChannel = client.channel(`league-wallet-${data.session.user.id}`)
          .on("postgres_changes", {
            event: "UPDATE",
            schema: "public",
            table: "league_coin_wallets",
            filter: `user_id=eq.${data.session.user.id}`
          }, event => {
            save.coins = Number(event.new.balance) || 0;
            save.bonusAt = Date.parse(event.new.bonus_claimed_at) || 0;
            persist();
            updateCoins();
          })
          .subscribe();
      }
      storeKey = `${STORE_KEY}:${data.session.user.id}`;
      save = loadSave(storeKey, 0);
      const { data: res, error } = await client.rpc("claim_league_coins", {
        p_initial_balance: save.coins,
        p_initial_inventory: save.owned
      });
      if (error || !res) throw error || new Error("no reward data");
      save.coins = Number(res.balance) || 0;
      save.bonusAt = Date.parse(res.bonus_at) || 0;
      const { data: inventory, error: inventoryError } = await client
        .from("league_pack_inventory").select("player_id,quantity");
      if (inventoryError) throw inventoryError;
      save.owned = Object.fromEntries(inventory.map(item => [item.player_id, item.quantity]));
      if (res.team === null) rewardState = "noteam";
      else if (res.granted > 0) {
        rewardState = "got";
        rewardAmount = res.granted;
      } else rewardState = "none";
      persist();
      updateCoins();
      updateStats();
      walletReady = true;
      showReward();
    } catch (error) {
      console.error("League coins sync failed:", error);
      $("rewardNote").hidden = false;
      $("rewardNote").textContent = tr("walletError");
      walletReady = true;
    }
  }
  void syncLeagueCoins();
  window.addEventListener("focus", () => { if (cloudClient) void syncLeagueCoins(); });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && cloudClient) void syncLeagueCoins();
  });

  // ?demo=<player id> (e.g. messi, ronaldo, maradona, kane) plays that walkout without spending coins
  const demoId = new URLSearchParams(location.search).get("demo");
  const demoPlayer = demoId && PLAYERS.find(p => p.id === demoId);
  if (demoPlayer) {
    busy = true;
    $("intro").classList.add("gone");
    playWalkout(demoPlayer).then(() => {
      $("intro").classList.remove("gone");
      busy = false;
    });
  }
})();
