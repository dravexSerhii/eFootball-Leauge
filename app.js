import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

const initialState = {
  teams: [{ name: "FC Promashkov" }, { name: "FC Lionslav" }],
  matches: [],
  championships: { "0": 0, "1": 0 }
};

const TRANSLATIONS = {
  en: {
    authStatus: "Connecting to database…",
    authButton: "Sign in",
    eyebrow: "eFootball League",
    editTeams: "Teams",
    addMatch: "Add match",
    championshipTitle: "Championship Race",
    liveSimulation: "LIVE SIMULATION",
    raceDisclaimer: "Live estimate from season results with simulated momentum. Not live-match odds.",
    raceChartLabel: "Live championship chance cardiogram",
    chance: "Chance",
    newSeason: "New Season",
    championships: "Championships",
    headToHead: "Head to Head",
    winsLabel: "W",
    drawsLabel: "D",
    lossesLabel: "L",
    goalsLabel: "Goals: {0} — {1}",
    totalMatches: "Total: {0} matches",
    tableTitle: "Table",
    updatedAfterMatch: "UPDATED AFTER EACH MATCH",
    colPos: "#",
    colTeam: "Team",
    colForm: "Form",
    colPlayed: "Pld",
    colW: "W",
    colD: "D",
    colL: "L",
    colGD: "GD",
    colPts: "Pts",
    tableFooter: "Form: last five results (green — win · grey — draw · red — loss) · Pld — played · W — wins · D — draws · L — losses · GD — goal difference · Pts — points",
    latestMatches: "Latest matches",
    tipText: "A win earns <strong>3 points</strong>; a draw earns <strong>1</strong>. Sign in to save results to your shared league and keep them in sync.",
    leagueNews: "League news",
    newsSubtitle: "Stories, photos and updates from the league",
    addNews: "Add news",
    loadingNews: "Loading news…",
    footer1: "eFOOTBALL LEAGUE · YOUR CHAMPIONSHIP",
    footer2: "Every match counts.",
    matchDialogTitle: "Add match result",
    matchDialogDesc: "Enter the score for a match you played",
    homeTeam: "Home team",
    awayTeam: "Away team",
    goals: "Goals",
    matchStats: "Match statistics <span>Optional</span>",
    statsOptional: "Leave any statistic blank if you do not have it.",
    statistic: "Statistic",
    shots: "Shots",
    shotsOnTarget: "Shots on target",
    possession: "Possession (%)",
    passes: "Passes",
    cancel: "Cancel",
    saveResult: "Save result",
    teamsDialogTitle: "Your teams",
    teamsDialogDesc: "Choose names for your league",
    newsDialogTitle: "Publish league news",
    newsDialogDesc: "Add a photo and a story for everyone to see",
    headline: "Headline",
    description: "Description",
    photoLabel: "Photo (JPEG, PNG or WebP, up to 5 MB)",
    publishNews: "Publish news",
    authDialogTitle: "Sign in to your league",
    authDialogDesc: "Use an account created in Supabase",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    favorite: "Favorite: {0}",
    evenMatchup: "Even matchup",
    noData: "No data",
    noMatches: "No matches yet",
    newsDeleted: "News deleted",
    matchDeleted: "Match deleted",
    matchDeleteError: "Could not delete match: {0}",
    deleteNews: "Delete",
    favoriteLeads: "{0} leads the championship race.",
    newsPublished: "League news published",
    newsUploadError: "Could not upload the photo: {0}",
    newsInsertError: "Could not publish news: {0}",
    newsLoadError: "Could not load league news: {0}",
    newsDeleteError: "Could not delete news: {0}",
    matchSaveError: "Could not save the result: {0}",
    teamSaveError: "Could not save team names: {0}",
    seasonStartError: "Could not start new season: {0}",
    seasonLimit: "Season limit reached (36 matches). Start a new season to continue.",
    seasonStart: "New season started!",
    seasonStartBlocked: "Cannot start new season before 36 matches are played.",
    signInRequired: "Sign in to start a new season.",
    signInNews: "Sign in before publishing league news.",
    fillNews: "Enter a headline and description, and choose a photo.",
    invalidImage: "Choose a JPEG, PNG or WebP image up to 5 MB.",
    syncError: "Sync error",
    loadError: "Loading error",
    signInError: "Sign-in error",
    syncErrorToast: "Could not refresh the league: {0}",
    loadErrorToast: "Could not load the league: {0}",
    signOutError: "Could not sign out: {0}",
    signInCheckError: "Could not check sign-in: {0}",
    setupRequired: "Supabase setup required",
    signedOut: "Signed out",
    loadingLeague: "Loading league…",
    setup: "Setup",
    retry: "Retry",
    syncingPeriodically: "Syncing periodically",
    refreshNewsLabel: "News deleted",
    teamsInvalid: "The database has invalid team names. Check the league_settings table.",
    matchesInvalid: "The database contains a match with invalid data.",
    teamsSame: "Team names must be different.",
    teamsRequired: "Enter names for both teams.",
    teamsDiff: "Select two different teams.",
    scoreRange: "Enter a score between 0 and 99 goals.",
    statsWhole: "Enter whole numbers for match statistics.",
    sotLimit: "Shots on target cannot exceed total shots.",
    possessionRule: "Enter possession for both teams and make the total 100%.",
    matchSaved: "Match result saved to the server",
    teamsSaved: "Team names saved to the server",
    signInFailed: "Sign-in failed: {0}",
    imageSizeLimit: "The image must be 5 MB or smaller.",
    signInNews: "Sign in before publishing league news.",
    fillNews: "Enter a headline and description, and choose a photo.",
    invalidImageFile: "Choose a JPEG, PNG or WebP image up to 5 MB.",
    signOutError: "Could not sign out: {0}",
    signOut: "Sign out",
    seasonComplete: "Season Complete",
    addMatchBtn: "Add match",
    noMatchesPlayed: "No matches played yet. Add the first result to get your league started!",
    noNews: "No news yet. Check back soon for league updates."
  },
  ru: {
    authStatus: "Подключение к базе данных…",
    authButton: "Войти",
    eyebrow: "eFootball Лига",
    editTeams: "Команды",
    addMatch: "Добавить матч",
    championshipTitle: "Гонка за чемпионством",
    liveSimulation: "ЖИВАЯ СИМУЛЯЦИЯ",
    raceDisclaimer: "Оценка по результатам сезона с моделируемой динамикой. Это не шансы во время матча.",
    raceChartLabel: "Кардиограмма шансов на чемпионство в реальном времени",
    chance: "Шанс",
    newSeason: "Новый сезон",
    championships: "Чемпионства",
    headToHead: "История встреч",
    winsLabel: "П",
    drawsLabel: "Н",
    lossesLabel: "Ппр",
    goalsLabel: "Голы: {0} — {1}",
    totalMatches: "Всего матчей: {0}",
    tableTitle: "Таблица",
    updatedAfterMatch: "ОБНОВЛЯЕТСЯ ПОСЛЕ КАЖДОГО МАТЧА",
    colPos: "#",
    colTeam: "Команда",
    colForm: "Форма",
    colPlayed: "И",
    colW: "В",
    colD: "Н",
    colL: "П",
    colGD: "РМ",
    colPts: "О",
    tableFooter: "Форма: последние пять результатов (зелёный — जीत · серый — ничья · красный — поражение) · Pld — сыпл · W — побед · D — ничьих · L — поражений · GD — разница мячей · Pts — очков",
    latestMatches: "Последние матчи",
    tipText: "Победа приносит <strong>3 очка</strong>; ничья приносит <strong>1</strong>. Войдите, чтобы сохранять результаты в общей лиге и синхронизировать их.",
    leagueNews: "Новости лиги",
    newsSubtitle: "Истории, фото и обновления из лиги",
    addNews: "Добавить новость",
    loadingNews: "Загрузка новостей…",
    footer1: "eFOOTBALL ЛИГА · ВАШ ЧЕМПИОНАТ",
    footer2: "Каждый матч имеет значение.",
    matchDialogTitle: "Добавить результат матча",
    matchDialogDesc: "Введите счёт сыгранного матча",
    homeTeam: "Хозяева",
    awayTeam: "Гости",
    goals: "Голы",
    matchStats: "Статистика матча <span>Необязательно</span>",
    statsOptional: "Оставьте любую статистику пустой, если у вас её нет.",
    statistic: "Статистика",
    shots: "Удары",
    shotsOnTarget: "Удары в створ",
    possession: "Владение мячом (%)",
    passes: "Пасы",
    cancel: "Отмена",
    saveResult: "Сохранить результат",
    teamsDialogTitle: "Ваши команды",
    teamsDialogDesc: "Выберите названия для вашей лиги",
    newsDialogTitle: "Опубликовать новость лиги",
    newsDialogDesc: "Добавьте фото и историю для всех",
    headline: "Заголовок",
    description: "Описание",
    photoLabel: "Фото (JPEG, PNG или WebP, до 5 МБ)",
    publishNews: "Опубликовать",
    authDialogTitle: "Войти в свою лигу",
    authDialogDesc: "Используйте аккаунт, созданный в Supabase",
    email: "Электронная почта",
    password: "Пароль",
    signIn: "Войти",
    favorite: "Фаворит: {0}",
    evenMatchup: "Равные шансы",
    noData: "Нет данных",
    noMatches: "Ещё нет матчей",
    newsDeleted: "Новость удалена",
    matchDeleted: "Матч удалён",
    matchDeleteError: "Не удалось удалить матч: {0}",
    newsPublished: "Новость лиги опубликована",
    newsUploadError: "Не удалось загрузить фото: {0}",
    newsInsertError: "Не удалось опубликовать новость: {0}",
    newsLoadError: "Не удалось загрузить новости лиги: {0}",
    newsDeleteError: "Не удалось удалить новость: {0}",
    matchSaveError: "Не удалось сохранить результат: {0}",
    teamSaveError: "Не удалось сохранить названия команд: {0}",
    seasonStartError: "Не удалось начать новый сезон: {0}",
    seasonLimit: "Лимит сезона достигнут (36 матчей). Начните новый сезон для продолжения.",
    seasonStart: "Новый сезон начат!",
    seasonStartBlocked: "Нельзя начать новый сезон до сыграния 36 матчей.",
    signInRequired: "Войдите, чтобы начать новый сезон.",
    signInNews: "Войдите перед публикацией новости лиги.",
    fillNews: "Введите заголовок и описание, и выберите фото.",
    invalidImage: "Выберите фото JPEG, PNG или WebP до 5 МБ.",
    syncError: "Ошибка синхронизации",
    loadError: "Ошибка загрузки",
    signInError: "Ошибка входа",
    syncErrorToast: "Не удалось обновить лигу: {0}",
    loadErrorToast: "Не удалось загрузить лигу: {0}",
    signOutError: "Не удалось выйти: {0}",
    signOut: "Выйти",
    signInCheckError: "Не удалось проверить вход: {0}",
    setupRequired: "Требуется настройка Supabase",
    signedOut: "Вы вышли",
    loadingLeague: "Загрузка лиги…",
    setup: "Настройка",
    retry: "Повторить",
    syncingPeriodically: "Синхронизация…",
    refreshNewsLabel: "Новость удалена",
    teamsInvalid: "В базе данных неверные названия команд. Проверьте таблицу league_settings.",
    matchesInvalid: "В базе данных содержится матч с неверными данными.",
    teamsSame: "Названия команд должны быть разными.",
    teamsRequired: "Введите названия обеих команд.",
    teamsDiff: "Выберите две разные команды.",
    scoreRange: "Введите счёт от 0 до 99 голов.",
    statsWhole: "Введите целые числа для статистики матча.",
    sotLimit: "Удары в створ не могут превышать общее количество ударов.",
    possessionRule: "Введите владение для обеих команд и сделайте сумму 100%.",
    matchSaved: "Результат матча сохранён на сервер",
    teamsSaved: "Названия команд сохранены на сервер",
    signInFailed: "Ошибка входа: {0}",
    imageSizeLimit: "Изображение должно быть не более 5 МБ.",
    signInNews: "Войдите перед публикацией новости лиги.",
    fillNews: "Введите заголовок и описание, и выберите фото.",
    invalidImageFile: "Выберите фото JPEG, PNG или WebP до 5 МБ.",
    deleteNews: "Удалить",
    favoriteLeads: "{0} лидирует в гонке за чемпионством",
    seasonComplete: "Сезон завершён",
    addMatchBtn: "Добавить матч",
    noMatchesPlayed: "Ещё нет матчей. Добавьте первый результат, чтобы начать лигу!",
    noNews: "Пока новостей нет. Заглядывайте позже за обновлениями лиги."
  }
};
const TEAM_PHOTOS = [
  "img/logo-promashkov.webp",
  "img/logo-lionslav.webp"
];
const configReady = SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY.length > 20 &&
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-KEY");
const supabase = configReady ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

let state = structuredClone(initialState);
let session = null;
let dataReady = false;
let sessionGeneration = 0;
let realtimeChannel = null;
let newsRealtimeChannel = null;
let pollTimer = null;
let toastTimer;
let newsPreviewUrl = null;
let newsItems = [];
let currentSeason = 1;
let currentLang = localStorage.getItem("leagueLang") || "en";

const standingsBody = document.getElementById("standingsBody");
const matchList = document.getElementById("matchList");
const matchDialog = document.getElementById("matchDialog");
const teamsDialog = document.getElementById("teamsDialog");
const authDialog = document.getElementById("authDialog");
const authButton = document.getElementById("authButton");
const authStatus = document.getElementById("authStatus");
const matchButton = document.getElementById("addMatchButton");
const editTeamsButton = document.getElementById("editTeamsButton");
const addNewsButton = document.getElementById("addNewsButton");
const newsDialog = document.getElementById("newsDialog");
const newsViewDialog = document.getElementById("newsViewDialog");
const newsList = document.getElementById("newsList");
const raceChartCanvas = document.getElementById("raceChart");
const seasonInfo = document.getElementById("seasonInfo");
const seasonBadge = document.getElementById("seasonBadge");
const matchCounter = document.getElementById("matchCounter");
const championshipList = document.getElementById("championshipList");
const h2hList = document.getElementById("h2hList");
const newSeasonBtn = document.getElementById("newSeasonBtn");

let championshipHistory = [];
let championshipRace = null;
let championshipBaseOdds = 50;
let liveOddsOne = 50;
let targetOddsOne = 50;
let nextOddsTick = 0;
let nextHistorySample = 0;
let nextRaceDraw = 0;
let lastRaceFrame = 0;
let nextOddsDelay = 1000;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function render() {
  renderStandings();
  renderMatches();
  renderNews();
  renderChampionshipRace();
  renderSeasonInfo();
}

function renderNews() {
  newsList.replaceChildren();
  if (newsItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "news-empty";
    empty.textContent = t("noNews");
    newsList.append(empty);
    return;
  }
  newsItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "news-card";
    const image = document.createElement("img");
    image.className = "news-card-image";
    image.src = supabase.storage.from("news-images").getPublicUrl(item.image_path).data.publicUrl;
    image.alt = item.title;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.alt = `Photo unavailable: ${item.title}`;
      image.classList.add("news-image-unavailable");
    }, { once: true });
    const content = document.createElement("div");
    content.className = "news-card-content";
    const date = document.createElement("p");
    date.className = "news-card-date";
    const parsedDate = new Date(item.created_at);
    date.textContent = Number.isNaN(parsedDate.getTime()) ? "" :
      parsedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const title = document.createElement("h3");
    title.className = "news-card-title";
    title.textContent = item.title;
    const description = document.createElement("p");
    description.className = "news-card-description";
    description.textContent = item.description;
    content.append(date, title, description);
    card.append(image, content);
    const deleteButton = document.createElement("button");
    deleteButton.className = "button button-quiet news-delete";
    deleteButton.textContent = t("deleteNews");
    deleteButton.addEventListener("click", () => {
      if (confirm(`Удалить новость "${item.title}"?`)) {
        void deleteNews(item.id, item.image_path);
      }
    });
    card.append(deleteButton);
    card.addEventListener("click", event => {
      if (event.target.closest(".news-delete")) return;
      void openNewsView(item);
    });
    newsList.append(card);
  });
}

async function refreshNews() {
  try {
    const { data, error } = await supabase.from("league_news")
      .select("id, title, description, image_path, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    newsItems = data;
    renderNews();
  } catch (error) {
    console.error("Failed to load league news:", error);
    const message = document.createElement("p");
    message.className = "news-empty";
    message.textContent = t("newsLoadError", error.message);
    newsList.replaceChildren(message);
  }
}

async function deleteNews(id, imagePath) {
  try {
    const { error } = await supabase.from("league_news").delete().eq("id", id);
    if (error) throw error;
    if (imagePath) {
      const { error: storageError } = await supabase.storage.from("news-images").remove([imagePath]);
      if (storageError) console.error("Could not remove the news photo:", storageError);
    }
    await refreshNews();
    showToast(t("newsDeleted"));
  } catch (error) {
    console.error("Failed to delete league news:", error);
    showToast(t("newsDeleteError", error.message));
  }
}

function openNewsView(item) {
  const titleEl = document.getElementById("newsViewTitle");
  const descEl = document.getElementById("newsViewDescription");
  const dateEl = document.getElementById("newsViewDialog").querySelector(".news-view-date");
  const imgEl = document.getElementById("newsViewImage");
  titleEl.textContent = item.title;
  descEl.textContent = item.description;
  const parsedDate = new Date(item.created_at);
  dateEl.textContent = Number.isNaN(parsedDate.getTime()) ? "" :
    parsedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  imgEl.src = supabase.storage.from("news-images").getPublicUrl(item.image_path).data.publicUrl;
  imgEl.alt = item.title;
  newsViewDialog.showModal();
}

function calculateChampionshipOdds() {
  const matches = state.matches;
  const teams = [0, 1].map(idx => {
    const name = state.teams[idx].name;
    let points = 0;
    let goalsFor = 0;
    let goalsAgainst = 0;
    let shotsFor = 0;
    let shotsAgainst = 0;
    let sotFor = 0;
    let sotAgainst = 0;
    let possSum = 0;
    let possCount = 0;
    let passesFor = 0;
    let passesAgainst = 0;
    let games = 0;
    matches.forEach(m => {
      const isHome = m.home === idx;
      const opponent = isHome ? m.away : m.home;
      const myGoals = isHome ? m.homeGoals : m.awayGoals;
      const oppGoals = isHome ? m.awayGoals : m.homeGoals;
      games++;
      if (myGoals > oppGoals) points += 3;
      else if (myGoals === oppGoals) points += 1;
      goalsFor += myGoals;
      goalsAgainst += oppGoals;
      const st = m.stats;
      if (st && st.home && st.away) {
        const mySt = isHome ? st.home : st.away;
        const oppSt = isHome ? st.away : st.home;
        if (mySt.shots != null) shotsFor += mySt.shots;
        if (oppSt.shots != null) shotsAgainst += oppSt.shots;
        if (mySt.shotsOnTarget != null) sotFor += mySt.shotsOnTarget;
        if (oppSt.shotsOnTarget != null) sotAgainst += oppSt.shotsOnTarget;
        if (mySt.possession != null && oppSt.possession != null) {
          possSum += mySt.possession;
          possCount++;
        }
        if (mySt.passes != null) passesFor += mySt.passes;
        if (oppSt.passes != null) passesAgainst += oppSt.passes;
      }
    });
    const gd = goalsFor - goalsAgainst;
    const gdPerGame = games ? gd / games : 0;
    const ptsPerGame = games ? points / games : 0;
    const shotDiff = shotsFor - shotsAgainst;
    const shotRatio = (shotsFor + shotsAgainst) ? shotsFor / (shotsFor + shotsAgainst) : 0.5;
    const sotRatio = (sotFor + sotAgainst) ? sotFor / (sotFor + sotAgainst) : 0.5;
    const avgPoss = possCount ? possSum / possCount : 50;
    const passRatio = (passesFor + passesAgainst) ? passesFor / (passesFor + passesAgainst) : 0.5;
    return { index: idx, name, points, games, gd, gdPerGame, ptsPerGame, shotDiff, shotRatio, sotRatio, avgPoss, passRatio };
  });
  const t0 = teams[0];
  const t1 = teams[1];
  const allGd = Math.max(Math.abs(t0.gdPerGame), Math.abs(t1.gdPerGame)) || 1;
  const allPts = Math.max(t0.ptsPerGame, t1.ptsPerGame) || 1;
  const score = t => {
    const ptsScore = (t.ptsPerGame / allPts) * 100;
    const gdScore = 50 + (t.gdPerGame / allGd) * 25;
    const shotScore = t.shotRatio * 100;
    const sotScore = t.sotRatio * 100;
    const possScore = t.avgPoss;
    const passScore = t.passRatio * 100;
    return ptsScore * 0.35 + gdScore * 0.20 + shotScore * 0.15 + sotScore * 0.10 + possScore * 0.10 + passScore * 0.10;
  };
  const s0 = score(t0);
  const s1 = score(t1);
  const total = s0 + s1;
  let oddsOne, oddsTwo;
  if (total === 0) {
    oddsOne = 50;
    oddsTwo = 50;
  } else {
    oddsOne = Math.round((s0 / total) * 100);
    oddsTwo = Math.round((s1 / total) * 100);
    if (oddsOne + oddsTwo !== 100) {
      if (s0 > s1) oddsOne = 100 - oddsTwo;
      else oddsTwo = 100 - oddsOne;
    }
  }
  let favorite = null;
  let statusText = "";
  if (matches.length === 0) {
    statusText = "No matches yet";
  } else {
    const diff = Math.abs(s0 - s1);
    if (s0 > s1 + 2) {
      favorite = t0;
      statusText = `Favorite: ${t0.name}`;
    } else if (s1 > s0 + 2) {
      favorite = t1;
      statusText = `Favorite: ${t1.name}`;
    } else {
      favorite = null;
      statusText = "Even matchup";
    }
  }
  return { one: { ...t0, score: s0 }, two: { ...t1, score: s1 }, oddsOne, oddsTwo, favorite, statusText };
}

function renderChampionshipRace() {
  const race = calculateChampionshipOdds();
  const raceGrid = document.getElementById("raceGrid");
  const raceStatus = document.getElementById("raceStatus");
  const raceFooter = document.getElementById("raceFooter");
  if (!race) {
    raceGrid.replaceChildren();
    raceStatus.textContent = t("noData");
    raceFooter.textContent = "";
    return;
  }
  championshipRace = race;
  championshipBaseOdds = race.oddsOne;
  if (championshipHistory.length === 0) {
    liveOddsOne = targetOddsOne = championshipBaseOdds;
    const now = performance.now();
    championshipHistory.push(
      { t: now - 60000, one: liveOddsOne, two: 100 - liveOddsOne },
      { t: now, one: liveOddsOne, two: 100 - liveOddsOne }
    );
  }
  raceChartCanvas.setAttribute("aria-label", t("raceChartLabel"));
  const badgeOne = document.getElementById("raceTeamOneBadge");
  const badgeTwo = document.getElementById("raceTeamTwoBadge");
  document.getElementById("raceTeamOneName").textContent = race.one.name;
  document.getElementById("raceTeamTwoName").textContent = race.two.name;
  document.getElementById("raceTeamOnePts").textContent = `${race.one.points} pts`;
  document.getElementById("raceTeamTwoPts").textContent = `${race.two.points} pts`;
  const photoOne = TEAM_PHOTOS[race.one.index];
  const photoTwo = TEAM_PHOTOS[race.two.index];
  setRaceBadge(badgeOne, race.one.index, photoOne);
  setRaceBadge(badgeTwo, race.two.index, photoTwo);
  updateRaceOddsDisplay();
}

function updateRaceOddsDisplay() {
  if (!championshipRace) return;
  const displayedOddsOne = Math.round(liveOddsOne * 10) / 10;
  const displayedOddsTwo = Math.round((100 - liveOddsOne) * 10) / 10;
  const displayedFavorite = state.matches.length === 0
    ? null
    : displayedOddsOne - displayedOddsTwo > 4
      ? championshipRace.one
      : displayedOddsTwo - displayedOddsOne > 4
        ? championshipRace.two
        : null;
  document.getElementById("raceTeamOneOdds").textContent = `${displayedOddsOne.toFixed(1)}%`;
  document.getElementById("raceTeamTwoOdds").textContent = `${displayedOddsTwo.toFixed(1)}%`;
  document.getElementById("raceTeamOneOdds").className =
    displayedFavorite?.index === championshipRace.one.index ? "race-odds-value favorite" : "race-odds-value";
  document.getElementById("raceTeamTwoOdds").className =
    displayedFavorite?.index === championshipRace.two.index ? "race-odds-value favorite" : "race-odds-value";
  const raceStatus = document.getElementById("raceStatus");
  const raceFooter = document.getElementById("raceFooter");
  raceStatus.textContent = state.matches.length === 0
    ? t("noMatches")
    : displayedFavorite
      ? t("favorite", displayedFavorite.name)
      : t("evenMatchup");
  if (displayedFavorite) {
    raceStatus.className = "race-status race-favorite";
    raceFooter.textContent = t("favoriteLeads", displayedFavorite.name);
  } else {
    raceStatus.className = "race-status";
    raceFooter.textContent = state.matches.length === 0 ? t("noMatches") : t("evenMatchup");
  }
}

function animateChampionshipRace(now) {
  const elapsed = lastRaceFrame ? Math.min(now - lastRaceFrame, 100) : 16;
  lastRaceFrame = now;
  if (championshipRace && !prefersReducedMotion) {
    if (now >= nextOddsTick) {
      const currentOdds = liveOddsOne;
      const marketNoise = (Math.random() - 0.5) * 2.4;
      const meanReversion = (championshipBaseOdds - currentOdds) * 0.12;
      const maxDeviation = 9;
      const minOdds = Math.max(0, championshipBaseOdds - maxDeviation);
      const maxOdds = Math.min(100, championshipBaseOdds + maxDeviation);
      targetOddsOne = Math.max(
        minOdds,
        Math.min(maxOdds, currentOdds + marketNoise + meanReversion)
      );
      nextOddsDelay = 650 + Math.random() * 850;
      nextOddsTick = now + nextOddsDelay;
    }
    liveOddsOne += (targetOddsOne - liveOddsOne) * (1 - Math.exp(-elapsed / 650));
  } else if (championshipRace) {
    liveOddsOne = targetOddsOne = championshipBaseOdds;
  }

  if (championshipRace && now >= nextHistorySample) {
    championshipHistory.push({ t: now, one: liveOddsOne, two: 100 - liveOddsOne });
    const cutoff = now - 60000;
    while (championshipHistory.length > 2 && championshipHistory[1].t < cutoff) {
      championshipHistory.shift();
    }
    nextHistorySample = now + 100;
    updateRaceOddsDisplay();
  }
  if (championshipRace && now >= nextRaceDraw) {
    drawRaceChart(now);
    nextRaceDraw = now + 33;
  }
  window.requestAnimationFrame(animateChampionshipRace);
}

function setRaceBadge(badge, teamIndex, photo) {
  const currentPhoto = badge.dataset.photo ?? "";
  if (currentPhoto === photo) return;
  badge.dataset.photo = photo;
  badge.replaceChildren();
  if (!photo) {
    badge.textContent = teamIndex === 0 ? "01" : "02";
    return;
  }
  const image = document.createElement("img");
  image.src = photo;
  image.alt = "";
  badge.append(image);
}

function drawRaceChart(now = performance.now()) {
  const ctx = raceChartCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = raceChartCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const pixelWidth = Math.round(rect.width * dpr);
  const pixelHeight = Math.round(rect.height * dpr);
  if (raceChartCanvas.width !== pixelWidth || raceChartCanvas.height !== pixelHeight) {
    raceChartCanvas.width = pixelWidth;
    raceChartCanvas.height = pixelHeight;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);
  const left = 34;
  const right = 12;
  const top = 12;
  const bottom = 20;
  const innerW = Math.max(1, w - left - right);
  const innerH = Math.max(1, h - top - bottom);
  const startTime = now - 60000;
  for (let y = 0; y <= 100; y += 25) {
    const yy = top + innerH - (y / 100) * innerH;
    ctx.beginPath();
    ctx.moveTo(left, yy);
    ctx.lineTo(w - right, yy);
    ctx.strokeStyle = y === 50 ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.055)";
    ctx.lineWidth = 1;
    ctx.setLineDash(y === 50 ? [4, 5] : []);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,255,255,.45)";
    ctx.font = "9px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${y}%`, 5, yy + 3);
  }

  ctx.fillStyle = "rgba(255,255,255,.4)";
  ctx.font = "9px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("-60s", left, h - 5);
  ctx.textAlign = "center";
  ctx.fillText("-30s", left + innerW / 2, h - 5);
  ctx.textAlign = "right";
  ctx.fillText("now", w - right, h - 5);

  const history = championshipHistory.length
    ? championshipHistory
    : [{ t: now - 60000, one: 50, two: 50 }];
  const traces = [
    { key: "one", color: "#d3ff57" },
    { key: "two", color: "#9c78ff" }
  ];
  traces.forEach(trace => {
    ctx.beginPath();
    history.forEach((point, index) => {
      const x = left + ((point.t - startTime) / 60000) * innerW;
      const y = top + innerH - (point[trace.key] / 100) * innerH;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    const currentY = top + innerH - ((trace.key === "one" ? liveOddsOne : 100 - liveOddsOne) / 100) * innerH;
    ctx.lineTo(w - right, currentY);
    ctx.strokeStyle = trace.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = trace.color;
    ctx.shadowBlur = 9;
    ctx.stroke();
    ctx.shadowBlur = 0;
  });

}

function getMatchesInSeason(season) {
  return state.matches.filter(m => m.season === season);
}

function getChampionships() {
  return state.championships || { "0": 0, "1": 0 };
}

function getHeadToHead() {
  const matches = state.matches;
  let t0Wins = 0, t0Draws = 0, t0Losses = 0;
  let t0GoalsFor = 0, t0GoalsAgainst = 0;
  matches.forEach(m => {
    const isHome0 = m.home === 0;
    const myGoals = isHome0 ? m.homeGoals : m.awayGoals;
    const oppGoals = isHome0 ? m.awayGoals : m.homeGoals;
    t0GoalsFor += myGoals;
    t0GoalsAgainst += oppGoals;
    if (myGoals > oppGoals) t0Wins++;
    else if (myGoals === oppGoals) t0Draws++;
    else t0Losses++;
  });
  return {
    team0Wins: t0Wins,
    team0Draws: t0Draws,
    team0Losses: t0Losses,
    team0GoalsFor: t0GoalsFor,
    team0GoalsAgainst: t0GoalsAgainst,
    team1Wins: t0Losses,
    team1Draws: t0Draws,
    team1Losses: t0Wins,
    team1GoalsFor: t0GoalsAgainst,
    team1GoalsAgainst: t0GoalsFor,
    total: matches.length
  };
}

async function startNewSeason() {
  if (!session) {
    showToast(t("signInRequired"));
    return;
  }
  const matchesInSeason = getMatchesInSeason(currentSeason);
  if (matchesInSeason.length < 36) {
    showToast(t("seasonStartBlocked"));
    return;
  }
  const standings = getStandings().filter(t => t.index === 0 || t.index === 1);
  const winnerIdx = standings[0].points > standings[1].points ? 0 : 1;
  const championships = { ...getChampionships() };
  championships[String(winnerIdx)] = (championships[String(winnerIdx)] || 0) + 1;
  try {
    const { error } = await supabase.from("league_settings")
      .update({ season: currentSeason + 1, championships })
      .eq("id", true);
    if (error) throw error;
    currentSeason++;
    showToast(t("seasonStart"));
    await refreshFromServer();
  } catch (error) {
    console.error("Failed to start new season:", error);
    showToast(t("seasonStartError", error.message));
  }
}

function renderSeasonInfo() {
  if (!seasonBadge || !matchCounter) return;
  const matchesInSeason = getMatchesInSeason(currentSeason);
  const seasonLimit = 36;
  const remaining = Math.max(0, seasonLimit - matchesInSeason.length);
  const seasonComplete = matchesInSeason.length >= seasonLimit;
  const champs = getChampionships();
  const h2h = getHeadToHead();

  seasonBadge.textContent = `Season ${currentSeason}`;
  matchCounter.textContent = `${matchesInSeason.length}/${seasonLimit}`;

  if (seasonComplete) {
    matchButton.disabled = true;
    matchButton.textContent = t("seasonComplete");
    if (newSeasonBtn) {
      newSeasonBtn.disabled = false;
      newSeasonBtn.style.display = "inline-flex";
    }
  } else {
    matchButton.disabled = !configReady || !session || !dataReady;
    matchButton.textContent = t("addMatchBtn");
    if (newSeasonBtn) {
      newSeasonBtn.style.display = "none";
    }
  }

  const champTeam0 = document.getElementById("champTeam0");
  const champCount0 = document.getElementById("champCount0");
  const champTeam1 = document.getElementById("champTeam1");
  const champCount1 = document.getElementById("champCount1");
  if (champTeam0) champTeam0.textContent = state.teams[0]?.name || "Team 1";
  if (champCount0) champCount0.textContent = champs["0"] || 0;
  if (champTeam1) champTeam1.textContent = state.teams[1]?.name || "Team 2";
  if (champCount1) champCount1.textContent = champs["1"] || 0;

  const h2hTeam0Wins = document.getElementById("h2hTeam0Wins");
  const h2hTeam0Draws = document.getElementById("h2hTeam0Draws");
  const h2hTeam0Losses = document.getElementById("h2hTeam0Losses");
  const h2hTeam1Wins = document.getElementById("h2hTeam1Wins");
  const h2hTeam1Draws = document.getElementById("h2hTeam1Draws");
  const h2hTeam1Losses = document.getElementById("h2hTeam1Losses");
  const h2hTotal = document.getElementById("h2hTotal");
  const h2hTeam0GF = document.getElementById("h2hTeam0GF");
  const h2hTeam0GA = document.getElementById("h2hTeam0GA");
  const h2hTeam1GF = document.getElementById("h2hTeam1GF");
  const h2hTeam1GA = document.getElementById("h2hTeam1GA");
  if (h2hTeam0Wins) h2hTeam0Wins.textContent = h2h.team0Wins;
  if (h2hTeam0Draws) h2hTeam0Draws.textContent = h2h.team0Draws;
  if (h2hTeam0Losses) h2hTeam0Losses.textContent = h2h.team0Losses;
  if (h2hTeam1Wins) h2hTeam1Wins.textContent = h2h.team1Wins;
  if (h2hTeam1Draws) h2hTeam1Draws.textContent = h2h.team1Draws;
  if (h2hTeam1Losses) h2hTeam1Losses.textContent = h2h.team1Losses;
  if (h2hTotal) h2hTotal.textContent = h2h.total;
  if (h2hTeam0GF) h2hTeam0GF.textContent = h2h.team0GoalsFor;
  if (h2hTeam0GA) h2hTeam0GA.textContent = h2h.team0GoalsAgainst;
  if (h2hTeam1GF) h2hTeam1GF.textContent = h2h.team1GoalsFor;
  if (h2hTeam1GA) h2hTeam1GA.textContent = h2h.team1GoalsAgainst;
}

async function deleteMatch(id) {
  try {
    const { error } = await supabase.from("league_matches").delete().eq("id", id);
    if (error) throw error;
    await refreshFromServer();
    showToast(t("matchDeleted"));
  } catch (error) {
    console.error("Failed to delete match:", error);
    showToast(t("matchDeleteError", error.message));
  }
}

function subscribeToNews() {
  if (newsRealtimeChannel) void supabase.removeChannel(newsRealtimeChannel);
  newsRealtimeChannel = supabase.channel("public-league-news")
    .on("postgres_changes", { event: "*", schema: "public", table: "league_news" }, () => {
      void refreshNews();
    })
    .subscribe(status => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error(`League news Realtime is unavailable: ${status}`);
      }
    });
}

function getStandings() {
  const stats = state.teams.map((team, index) => ({
    index, name: team.name, played: 0, wins: 0, draws: 0, losses: 0,
    goalsFor: 0, goalsAgainst: 0, points: 0
  }));
  state.matches.forEach(match => {
    const home = stats[match.home];
    const away = stats[match.away];
    home.played++;
    away.played++;
    home.goalsFor += match.homeGoals;
    home.goalsAgainst += match.awayGoals;
    away.goalsFor += match.awayGoals;
    away.goalsAgainst += match.homeGoals;
    if (match.homeGoals > match.awayGoals) {
      home.wins++; home.points += 3; away.losses++;
    } else if (match.homeGoals < match.awayGoals) {
      away.wins++; away.points += 3; home.losses++;
    } else {
      home.draws++; away.draws++; home.points++; away.points++;
    }
  });
  return stats.sort((a, b) => b.points - a.points ||
    (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) ||
    b.goalsFor - a.goalsFor || a.index - b.index);
}

function renderStandings() {
  standingsBody.replaceChildren();
  getStandings().forEach((team, position) => {
    const row = document.createElement("tr");
    const difference = team.goalsFor - team.goalsAgainst;
    const values = [
      { text: String(position + 1), className: "position" },
      { team: true },
      { form: team.index },
      { text: String(team.played) }, { text: String(team.wins) },
      { text: String(team.draws) }, { text: String(team.losses) },
      {
        text: difference > 0 ? `+${difference}` : String(difference),
        className: difference > 0 ? "positive" : difference < 0 ? "negative" : ""
      },
      { text: String(team.points), className: "points" }
    ];
    values.forEach((value, cellIndex) => {
      const cell = document.createElement("td");
      if (value.team) {
        const teamCell = document.createElement("div");
        teamCell.className = "team-cell";
        const badge = document.createElement("span");
        badge.className = `team-badge ${team.index === 0 ? "one" : "two"}`;
        const photo = TEAM_PHOTOS[team.index];
        if (photo) {
          const image = document.createElement("img");
          image.className = "team-badge-image";
          image.src = photo;
          image.alt = "";
          image.width = 35;
          image.height = 35;
          badge.append(image);
        } else {
          badge.textContent = team.index === 0 ? "FP" : "FL";
        }
        const name = document.createElement("span");
        name.textContent = team.name;
        teamCell.append(badge, name);
        cell.append(teamCell);
      } else if (value.form !== undefined) {
        cell.className = "form-cell";
        const form = getTeamForm(value.form);
        const formList = document.createElement("div");
        formList.className = "team-form";
        formList.setAttribute("aria-label", form.length
          ? `Last ${form.length} matches: ${form.map(result => result.label).join(", ")}`
          : "No match results yet");
        form.forEach((result, index) => {
          const marker = document.createElement("span");
          marker.className = `form-marker form-${result.outcome}${index === form.length - 1 ? " latest" : ""}`;
          marker.textContent = result.symbol;
          marker.title = result.label;
          marker.setAttribute("aria-hidden", "true");
          formList.append(marker);
        });
        cell.append(formList);
      } else {
        cell.textContent = value.text;
        if (value.className) cell.className = value.className;
      }
      if (cellIndex === 0) cell.setAttribute("aria-label", `Position ${position + 1}`);
      row.append(cell);
    });
    standingsBody.append(row);
  });
}

function getTeamForm(teamIndex) {
  return state.matches
    .filter(match => match.home === teamIndex || match.away === teamIndex)
    .slice(-5)
    .map(match => {
      const teamGoals = match.home === teamIndex ? match.homeGoals : match.awayGoals;
      const opponentGoals = match.home === teamIndex ? match.awayGoals : match.homeGoals;
      if (teamGoals === opponentGoals) return { outcome: "draw", symbol: "–", label: "Draw" };
      return teamGoals > opponentGoals
        ? { outcome: "win", symbol: "✓", label: "Win" }
        : { outcome: "loss", symbol: "×", label: "Loss" };
    });
}

function renderMatches() {
  matchList.replaceChildren();
  document.getElementById("matchesCount").textContent =
    `${state.matches.length} ${pluralize(state.matches.length, "match", "matches")}`;
  if (state.matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-matches";
    empty.textContent = t("noMatchesPlayed");
    matchList.append(empty);
    return;
  }
  state.matches.slice().reverse().slice(0, 6).forEach(match => {
    const hasStats = match.stats && Object.values(match.stats.home ?? {})
      .concat(Object.values(match.stats.away ?? {})).some(value => value !== null);
    const item = document.createElement(hasStats ? "details" : "div");
    item.className = hasStats ? "match-item match-item-details" : "match-item";
    const teams = document.createElement("div");
    teams.className = "match-teams";
    const first = document.createElement("span");
    first.textContent = state.teams[match.home].name;
    const second = document.createElement("span");
    second.textContent = state.teams[match.away].name;
    const date = document.createElement("span");
    date.className = "match-date";
    const parsedDate = new Date(match.date);
    date.textContent = Number.isNaN(parsedDate.getTime()) ? "" :
      parsedDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    teams.append(first, second, date);
    const score = document.createElement("span");
    score.className = "match-score";
    score.textContent = `${match.homeGoals} : ${match.awayGoals}`;
    score.setAttribute("aria-label", `Score ${match.homeGoals} to ${match.awayGoals}`);
    if (hasStats) {
      const summary = document.createElement("summary");
      summary.className = "match-summary";
      summary.append(teams, score);
      item.append(summary, renderMatchStats(match));
    } else {
      item.append(teams, score);
    }
    const deleteButton = document.createElement("button");
    deleteButton.className = "button button-quiet match-delete";
    deleteButton.textContent = t("deleteNews");
    deleteButton.addEventListener("click", () => {
      if (confirm("Удалить этот матч?")) {
        void deleteMatch(match.id);
      }
    });
    item.append(deleteButton);
    matchList.append(item);
  });
}

function renderMatchStats(match) {
  const section = document.createElement("div");
  section.className = "match-stats";
  const title = document.createElement("h3");
  title.className = "match-stats-title";
  title.innerHTML = t("matchStats");
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["", state.teams[match.home].name, state.teams[match.away].name].forEach(label => {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = label;
    headerRow.append(cell);
  });
  head.append(headerRow);
  const body = document.createElement("tbody");
  const rows = [
    ["Shots", "shots", ""],
    ["Shots on target", "shotsOnTarget", ""],
    ["Possession", "possession", "%"],
    ["Passes", "passes", ""]
  ];
  rows.forEach(([label, key, suffix]) => {
    const row = document.createElement("tr");
    const name = document.createElement("th");
    name.scope = "row";
    name.textContent = label;
    row.append(name);
    [match.stats.home, match.stats.away].forEach(teamStats => {
      const value = document.createElement("td");
      value.textContent = teamStats[key] === null || teamStats[key] === undefined
        ? "—"
        : `${teamStats[key]}${suffix}`;
      row.append(value);
    });
    body.append(row);
  });
  table.append(head, body);
  section.append(title, table);
  return section;
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang];
  let text = dict && dict[key] ? dict[key] : TRANSLATIONS.en[key] || key;
  if (args.length) {
    args.forEach((arg, i) => {
      text = text.replace(`{${i}}`, arg);
    });
  }
  return text;
}

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });
  document.getElementById("authStatus").textContent = t("authStatus");
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.classList.toggle("lang-active", btn.getAttribute("data-lang") === currentLang);
  });
  document.documentElement.lang = currentLang;
  render();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function updateAuthUi() {
  const enabled = configReady && Boolean(session) && dataReady;
  matchButton.disabled = !enabled;
  editTeamsButton.disabled = !enabled;
  addNewsButton.disabled = !configReady || !session;
  if (!configReady) {
    authStatus.textContent = t("setupRequired");
    authButton.textContent = t("setup");
    authButton.disabled = true;
  } else if (!session) {
    authStatus.textContent = t("signedOut");
    authButton.textContent = t("signIn");
    authButton.disabled = false;
  } else if (!dataReady) {
    authStatus.textContent = t("loadingLeague");
    authButton.textContent = t("retry");
    authButton.disabled = false;
  } else {
    authStatus.textContent = session.user.email;
    authButton.textContent = t("signOut");
    authButton.disabled = false;
  }
}

function mapMatch(row) {
  return {
    id: row.id,
    home: row.home_team,
    away: row.away_team,
    homeGoals: row.home_goals,
    awayGoals: row.away_goals,
    date: row.played_at,
    stats: row.stats ?? { home: {}, away: {} },
    season: row.season ?? 1
  };
}

function isValidMatchStats(stats) {
  if (stats === null || stats === undefined) return true;
  if (typeof stats !== "object" || Array.isArray(stats)) return false;
  const keys = ["shots", "shotsOnTarget", "possession", "passes"];
  for (const team of ["home", "away"]) {
    const teamStats = stats[team] ?? {};
    if (typeof teamStats !== "object" || Array.isArray(teamStats)) return false;
    for (const key of keys) {
      const value = teamStats[key];
      const maximum = key === "possession" ? 100 : key === "passes" ? 9999 : 999;
      if (value !== undefined && value !== null &&
        (!Number.isInteger(value) || value < 0 || value > maximum)) return false;
    }
    if (teamStats.shotsOnTarget != null && teamStats.shots != null &&
      teamStats.shotsOnTarget > teamStats.shots) return false;
  }
  const homePossession = stats.home?.possession;
  const awayPossession = stats.away?.possession;
  return (homePossession == null && awayPossession == null) ||
    (homePossession != null && awayPossession != null && homePossession + awayPossession === 100);
}

function validateServerState(settings, matchRows) {
  if (!settings || !Array.isArray(settings.teams) || settings.teams.length !== 2 ||
    !settings.teams.every(team => team && typeof team.name === "string")) {
    throw new Error("The database has invalid team names. Check the league_settings table.");
  }
  if (!Array.isArray(matchRows) || !matchRows.every(match =>
    [0, 1].includes(match.home_team) && [0, 1].includes(match.away_team) &&
    match.home_team !== match.away_team &&
    Number.isInteger(match.home_goals) && match.home_goals >= 0 &&
    Number.isInteger(match.away_goals) && match.away_goals >= 0 &&
    isValidMatchStats(match.stats) &&
    typeof match.played_at === "string")) {
    throw new Error("The database contains a match with invalid data.");
  }
}

async function fetchServerState() {
  const [settingsResponse, matchesResponse] = await Promise.all([
    supabase.from("league_settings").select("*").eq("id", true).maybeSingle(),
    supabase.from("league_matches")
      .select("*")
      .order("played_at", { ascending: true })
  ]);
  if (settingsResponse.error) throw settingsResponse.error;
  if (matchesResponse.error) throw matchesResponse.error;
  if (!settingsResponse.data) {
    throw new Error("League settings were not found. Run the SQL in supabase.sql.");
  }
  const settings = settingsResponse.data;
  validateServerState(settings, matchesResponse.data);
  currentSeason = settings.season || 1;
  state = {
    teams: settings.teams,
    matches: matchesResponse.data.map(mapMatch),
    championships: settings.championships || { "0": 0, "1": 0 }
  };
  dataReady = true;
  render();
  updateAuthUi();
}

async function refreshFromServer() {
  if (!session) return;
  try {
    await fetchServerState();
    await refreshNews();
  } catch (error) {
    console.error("Failed to refresh the league from the server:", error);
    authStatus.textContent = t("syncError");
    showToast(t("syncErrorToast", error.message));
  }
}

function subscribeToChanges(generation) {
  if (realtimeChannel) supabase.removeChannel(realtimeChannel);
  realtimeChannel = supabase.channel("liga-druzei-updates")
    .on("postgres_changes", { event: "*", schema: "public", table: "league_settings" }, () => {
      if (generation === sessionGeneration) void refreshFromServer();
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "league_matches" }, () => {
      if (generation === sessionGeneration) void refreshFromServer();
    })
    .subscribe(status => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error(`Supabase Realtime is unavailable: ${status}`);
        if (session && dataReady) authStatus.textContent = t("syncingPeriodically");
      }
    });
}

async function handleSession(nextSession) {
  const generation = ++sessionGeneration;
  session = nextSession;
  dataReady = false;
  if (pollTimer) clearInterval(pollTimer);
  if (realtimeChannel) {
    await supabase.removeChannel(realtimeChannel);
    realtimeChannel = null;
  }
  updateAuthUi();
  if (!session) {
    state = structuredClone(initialState);
    render();
    return;
  }
  try {
    await fetchServerState();
    if (generation !== sessionGeneration) return;
    await refreshNews();
    subscribeToNews();
    subscribeToChanges(generation);
    pollTimer = setInterval(() => {
      if (generation === sessionGeneration) void refreshFromServer();
    }, 15000);
  } catch (error) {
    if (generation !== sessionGeneration) return;
    console.error("Failed to load the league from the server:", error);
    authStatus.textContent = t("loadError");
    authButton.textContent = t("retry");
    authButton.disabled = false;
    showToast(t("loadErrorToast", error.message));
  }
}

function populateTeamSelects() {
  ["homeTeam", "awayTeam"].forEach(id => {
    const select = document.getElementById(id);
    select.replaceChildren();
    state.teams.forEach((team, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = team.name;
      select.append(option);
    });
  });
  document.getElementById("awayTeam").value = "1";
  updateStatsTeamLabels();
}

function updateStatsTeamLabels() {
  const home = Number(document.getElementById("homeTeam").value);
  const away = Number(document.getElementById("awayTeam").value);
  document.getElementById("homeStatsTeam").textContent = state.teams[home]?.name ?? "Home";
  document.getElementById("awayStatsTeam").textContent = state.teams[away]?.name ?? "Away";
}

authButton.addEventListener("click", async () => {
  if (session && !dataReady) {
    await handleSession(session);
    return;
  }
  if (session) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Failed to sign out:", error);
      showToast(t("signOutError", error.message));
    }
    return;
  }
  document.getElementById("authError").textContent = "";
  authDialog.showModal();
});

document.getElementById("authForm").addEventListener("submit", async event => {
  event.preventDefault();
  const errorElement = document.getElementById("authError");
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Sign-in failed:", error);
    errorElement.textContent = t("signInFailed", error.message);
    return;
  }
  authDialog.close();
  document.getElementById("authForm").reset();
});

matchButton.addEventListener("click", () => {
  if (!dataReady) return;
  populateTeamSelects();
  document.getElementById("matchError").textContent = "";
  document.getElementById("homeGoals").value = "";
  document.getElementById("awayGoals").value = "";
  ["homeShots", "awayShots", "homeShotsOnTarget", "awayShotsOnTarget",
    "homePossession", "awayPossession", "homePasses", "awayPasses"]
    .forEach(id => { document.getElementById(id).value = ""; });
  matchDialog.showModal();
});

addNewsButton.addEventListener("click", () => {
  if (!session) return;
  document.getElementById("newsError").textContent = "";
  document.getElementById("newsForm").reset();
  clearNewsPreview();
  newsDialog.showModal();
});

if (newSeasonBtn) {
  newSeasonBtn.addEventListener("click", () => {
    void startNewSeason();
  });
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.getAttribute("data-lang");
    localStorage.setItem("leagueLang", currentLang);
    applyLang();
  });
});

function clearNewsPreview() {
  if (newsPreviewUrl) URL.revokeObjectURL(newsPreviewUrl);
  newsPreviewUrl = null;
  const preview = document.getElementById("newsImagePreview");
  preview.removeAttribute("src");
  preview.hidden = true;
}

document.getElementById("newsImageInput").addEventListener("change", event => {
  const file = event.target.files[0];
  const errorElement = document.getElementById("newsError");
  errorElement.textContent = "";
  clearNewsPreview();
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    errorElement.textContent = t("invalidImage");
    event.target.value = "";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    errorElement.textContent = t("imageSizeLimit");
    event.target.value = "";
    return;
  }
  newsPreviewUrl = URL.createObjectURL(file);
  const preview = document.getElementById("newsImagePreview");
  preview.src = newsPreviewUrl;
  preview.hidden = false;
});

document.getElementById("newsForm").addEventListener("submit", async event => {
  event.preventDefault();
  const errorElement = document.getElementById("newsError");
  const publishButton = document.getElementById("publishNewsButton");
  const title = document.getElementById("newsTitleInput").value.trim();
  const description = document.getElementById("newsDescriptionInput").value.trim();
  const file = document.getElementById("newsImageInput").files[0];
  if (!session) {
    errorElement.textContent = t("signInNews");
    return;
  }
  if (!title || !description || !file) {
    errorElement.textContent = t("fillNews");
    return;
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 5 * 1024 * 1024) {
    errorElement.textContent = t("invalidImageFile");
    return;
  }

  publishButton.disabled = true;
  const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type];
  const imagePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  let photoUploaded = false;
  try {
    const { error: uploadError } = await supabase.storage.from("news-images")
      .upload(imagePath, file, { contentType: file.type, cacheControl: "3600", upsert: false });
    if (uploadError) throw new Error(t("newsUploadError", uploadError.message));
    photoUploaded = true;
    const { error: insertError } = await supabase.from("league_news").insert({
      title,
      description,
      image_path: imagePath
    });
    if (insertError) throw new Error(t("newsInsertError", insertError.message));
  } catch (error) {
    console.error("Failed to publish league news:", error);
    if (photoUploaded) {
      try {
        const { error: cleanupError } = await supabase.storage.from("news-images").remove([imagePath]);
        if (cleanupError) console.error("Could not remove the unused news photo:", cleanupError);
      } catch (cleanupError) {
        console.error("Could not remove the unused news photo:", cleanupError);
      }
    }
    errorElement.textContent = error.message;
    publishButton.disabled = false;
    return;
  }

  publishButton.disabled = false;
  clearNewsPreview();
  document.getElementById("newsForm").reset();
  newsDialog.close();
  await refreshNews();
  showToast(t("newsPublished"));
});

["homeTeam", "awayTeam"].forEach(id => {
  document.getElementById(id).addEventListener("change", updateStatsTeamLabels);
});

editTeamsButton.addEventListener("click", () => {
  if (!dataReady) return;
  document.getElementById("teamNameOne").value = state.teams[0].name;
  document.getElementById("teamNameTwo").value = state.teams[1].name;
  document.getElementById("teamsError").textContent = "";
  teamsDialog.showModal();
});

document.getElementById("matchForm").addEventListener("submit", async event => {
  event.preventDefault();
  const home = Number(document.getElementById("homeTeam").value);
  const away = Number(document.getElementById("awayTeam").value);
  const homeGoals = Number(document.getElementById("homeGoals").value);
  const awayGoals = Number(document.getElementById("awayGoals").value);
  const errorElement = document.getElementById("matchError");
  if (home === away) {
    errorElement.textContent = t("teamsDiff");
    return;
  }
  if (!Number.isInteger(homeGoals) || !Number.isInteger(awayGoals) ||
    homeGoals < 0 || awayGoals < 0 || homeGoals > 99 || awayGoals > 99) {
    errorElement.textContent = t("scoreRange");
    return;
  }
  const readStat = id => {
    const value = document.getElementById(id).value;
    return value === "" ? null : Number(value);
  };
  const stats = {
    home: {
      shots: readStat("homeShots"),
      shotsOnTarget: readStat("homeShotsOnTarget"),
      possession: readStat("homePossession"),
      passes: readStat("homePasses")
    },
    away: {
      shots: readStat("awayShots"),
      shotsOnTarget: readStat("awayShotsOnTarget"),
      possession: readStat("awayPossession"),
      passes: readStat("awayPasses")
    }
  };
  if ([...Object.values(stats.home), ...Object.values(stats.away)]
    .some(value => value !== null && !Number.isInteger(value))) {
    errorElement.textContent = t("statsWhole");
    return;
  }
  if (stats.home.shotsOnTarget !== null && stats.home.shots !== null &&
    stats.home.shotsOnTarget > stats.home.shots ||
    stats.away.shotsOnTarget !== null && stats.away.shots !== null &&
    stats.away.shotsOnTarget > stats.away.shots) {
    errorElement.textContent = t("sotLimit");
    return;
  }
  const hasHomePossession = stats.home.possession !== null;
  const hasAwayPossession = stats.away.possession !== null;
  if (hasHomePossession !== hasAwayPossession ||
    hasHomePossession && stats.home.possession + stats.away.possession !== 100) {
    errorElement.textContent = t("possessionRule");
    return;
  }
  const matchesInSeason = state.matches.filter(m => m.season === currentSeason);
  if (matchesInSeason.length >= 36) {
    errorElement.textContent = t("seasonLimit");
    return;
  }
  const { data, error } = await supabase.from("league_matches").insert({
    home_team: home,
    away_team: away,
    home_goals: homeGoals,
    away_goals: awayGoals,
    stats,
    season: currentSeason
  }).select("id, home_team, away_team, home_goals, away_goals, played_at, stats, season").single();
  if (error) {
    console.error("Failed to save the result to the server:", error);
    errorElement.textContent = t("matchSaveError", error.message);
    return;
  }
  state.matches.push(mapMatch(data));
  state.matches.sort((a, b) => new Date(a.date) - new Date(b.date));
  render();
  matchDialog.close();
  showToast(t("matchSaved"));
});

document.getElementById("teamsForm").addEventListener("submit", async event => {
  event.preventDefault();
  const first = document.getElementById("teamNameOne").value.trim();
  const second = document.getElementById("teamNameTwo").value.trim();
  const errorElement = document.getElementById("teamsError");
  if (!first || !second) {
    errorElement.textContent = t("teamsRequired");
    return;
  }
  if (first.localeCompare(second, "en", { sensitivity: "base" }) === 0) {
    errorElement.textContent = t("teamsSame");
    return;
  }
  const teams = [{ name: first }, { name: second }];
  const { error } = await supabase.from("league_settings")
    .update({ teams }).eq("id", true).select("teams").single();
  if (error) {
    console.error("Failed to save team names to the server:", error);
    errorElement.textContent = t("teamSaveError", error.message);
    return;
  }
  state.teams = teams;
  render();
  teamsDialog.close();
  showToast(t("teamsSaved"));
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => document.getElementById(button.dataset.close).close());
});

[matchDialog, teamsDialog, authDialog, newsDialog, newsViewDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

newsDialog.addEventListener("close", clearNewsPreview);

updateAuthUi();
try {
  applyLang();
} catch (error) {
  console.error("Language initialization error:", error);
}

window.requestAnimationFrame(animateChampionshipRace);
window.addEventListener("resize", () => drawRaceChart(performance.now()));

if (configReady) {
  void refreshNews();
  subscribeToNews();
  window.setInterval(() => void refreshNews(), 30000);
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Failed to check the Supabase session:", error);
    authStatus.textContent = t("signInError");
    showToast(t("signInCheckError", error.message));
  } else {
    await handleSession(data.session);
    supabase.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => void handleSession(nextSession), 0);
    });
  }
} else {
  authStatus.textContent = t("setupRequired");
}
