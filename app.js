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
    teamStatsTitle: "Team statistics",
    teamStatsDescription: "Detailed performance for a season or all seasons",
    teamStatsCompare: "Team comparison",
    teamStatsSingleMode: "One team",
    teamStatsCompareMode: "Compare teams",
    teamStatsView: "Statistics view",
    teamStatsBetter: "Leader",
    teamStatsTie: "Equal",
    teamStatsInsufficientData: "Not enough data to compare",
    teamStatsTeam: "Team",
    teamStatsPeriod: "Period",
    allSeasons: "All seasons",
    seasonOption: "Season {0}",
    statsRecord: "{0} matches · {1} W · {2} D · {3} L",
    statPlayed: "Matches played",
    statWinRate: "Win rate",
    statHomeWinRate: "Home win rate",
    statAwayWinRate: "Away win rate",
    statLocationWinsOutOf: "{0} wins from {1} matches",
    statGoals: "Goals scored",
    statGoalsPerMatch: "Goals per match",
    statPossession: "Average possession",
    statPasses: "Average passes",
    statShots: "Average shots",
    statShotsOnTarget: "Average shots on target",
    statShotConversion: "Shot conversion",
    statAllMatches: "All matches in period",
    statWinsOutOf: "{0} wins from {1} matches",
    statRecordedIn: "Recorded in {0} of {1} matches",
    teamStatsFootnote: "Averages use only matches where each statistic was recorded. Shot conversion = goals in matches with shot data divided by recorded shots.",
    noTeamStats: "No matches for this selection yet.",
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
    upcomingMatchTitle: "Upcoming match",
    upcomingMatchSubtitle: "Match odds are separate from championship chances",
    upcomingMatchDisclaimer: "Historical match statistics with simulated movement. Not live-match data.",
    upcomingMatchSamples: "Previous matches used: {0}",
    forecastFiveTitle: "Next 5 match forecast",
    forecastFiveSubtitle: "Uses average goals and actual outcome frequency from the latest 10 matches",
    forecastDataModel: "DATA MODEL",
    forecastMatch: "Match {0}",
    forecastHomeWin: "Home",
    forecastAwayWin: "Away",
    forecastDraw: "Draw",
    forecastScore: "Projected score",
    forecastDataNote: "Forecast based on the last {0} played matches (up to 10), using actual scores. Estimates are not guarantees.",
    forecastNoHistory: "No match history yet. A forecast will appear after the first match is recorded.",
    forecastUnavailable: "No past match with this home/away setup — not enough data to forecast.",
    forecastDrawPick: "Draw is the most likely outcome",
    forecastWinnerPick: "{0} is the most likely winner",
    forecastUndecided: "No clear predicted outcome",
    upcomingMatchChartLabel: "{0} and {1} match outcome probabilities",
    versus: "VS",
    lastMatchTitle: "Last match",
    noLastMatch: "No matches have been played yet.",
    matchHistoryShow: "Show all match history ({0})",
    matchHistoryHide: "Show latest matches",
    noMatchStats: "No statistics were recorded for this match.",
    statEdge: "Statistical edge: {0}",
    statsEven: "Stats are even",
    matchDialogTitle: "Add match result",
    matchDialogDesc: "Enter the score for a match you played",
    predictionDraw: "Draw",
    predictionNoHistory: "No previous matches — equal starting estimate",
    homeTeam: "Home team",
    awayTeam: "Away team",
    swapTeams: "Swap home and away teams",
    goals: "Goals",
    matchStats: "Match statistics",
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
    teamStatsTitle: "Статистика команды",
    teamStatsDescription: "Подробные показатели за сезон или за все сезоны",
    teamStatsCompare: "Сравнение команд",
    teamStatsSingleMode: "Одна команда",
    teamStatsCompareMode: "Сравнить команды",
    teamStatsView: "Режим статистики",
    teamStatsBetter: "Лидер",
    teamStatsTie: "Равенство",
    teamStatsInsufficientData: "Недостаточно данных для сравнения",
    teamStatsTeam: "Команда",
    teamStatsPeriod: "Период",
    allSeasons: "Все сезоны",
    seasonOption: "Сезон {0}",
    statsRecord: "{0} матчей · {1} В · {2} Н · {3} П",
    statPlayed: "Сыграно матчей",
    statWinRate: "Процент побед",
    statHomeWinRate: "Процент побед дома",
    statAwayWinRate: "Процент побед в гостях",
    statLocationWinsOutOf: "{0} побед из {1} матчей",
    statGoals: "Забито голов",
    statGoalsPerMatch: "Голов за матч",
    statPossession: "Среднее владение",
    statPasses: "Среднее количество пасов",
    statShots: "Среднее количество ударов",
    statShotsOnTarget: "Удары в створ в среднем",
    statShotConversion: "Реализация ударов",
    statAllMatches: "Все матчи периода",
    statWinsOutOf: "{0} побед из {1} матчей",
    statRecordedIn: "Статистика есть в {0} из {1} матчей",
    teamStatsFootnote: "Средние значения учитывают только матчи, где показатель был записан. Реализация = голы в матчах со статистикой ударов / общее число записанных ударов.",
    noTeamStats: "За выбранный период матчей пока нет.",
    winsLabel: "П",
    drawsLabel: "Н",
    lossesLabel: "П",
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
    tableFooter: "Форма: последние 5 матчей (зелёный — победа · серый — ничья · красный — поражение) · И — сыграно · В — победы · Н — ничьи · П — поражения · РМ — разница мячей · О — очки",
    latestMatches: "Последние матчи",
    tipText: "Победа приносит <strong>3 очка</strong>; ничья приносит <strong>1</strong>. Войдите, чтобы сохранять результаты в общей лиге и синхронизировать их.",
    leagueNews: "Новости лиги",
    newsSubtitle: "Истории, фото и обновления из лиги",
    addNews: "Добавить новость",
    loadingNews: "Загрузка новостей…",
    footer1: "eFOOTBALL ЛИГА · ВАШ ЧЕМПИОНАТ",
    footer2: "Каждый матч имеет значение.",
    upcomingMatchTitle: "Предстоящий матч",
    upcomingMatchSubtitle: "Шансы на матч рассчитываются отдельно от чемпионства",
    upcomingMatchDisclaimer: "История матчей и симуляция колебаний. Это не данные матча в реальном времени.",
    upcomingMatchSamples: "Учтено предыдущих матчей: {0}",
    forecastFiveTitle: "Прогноз на следующие 5 матчей",
    forecastFiveSubtitle: "Среднее число голов и частота исходов за последние 10 матчей",
    forecastDataModel: "РАСЧЁТ ПО ДАННЫМ",
    forecastMatch: "Матч {0}",
    forecastHomeWin: "Хозяева",
    forecastAwayWin: "Гости",
    forecastDraw: "Ничья",
    forecastScore: "Прогноз счёта",
    forecastDataNote: "Прогноз рассчитан на основе последних {0} сыгранных матчей (до 10) и их фактических результатов. Это оценка, а не гарантия.",
    forecastNoHistory: "Истории матчей пока нет. Прогноз появится после добавления первого результата.",
    forecastUnavailable: "Матчей с таким распределением ролей хозяев и гостей не было — данных для прогноза недостаточно.",
    forecastDrawPick: "Наиболее вероятный исход — ничья",
    forecastWinnerPick: "Наиболее вероятная победа команды {0}",
    forecastUndecided: "Нет однозначного прогноза исхода",
    upcomingMatchChartLabel: "Вероятности исхода матча {0} и {1}",
    versus: "ПРОТИВ",
    lastMatchTitle: "Последний матч",
    noLastMatch: "Матчи ещё не сыграны.",
    matchHistoryShow: "Вся история матчей ({0})",
    matchHistoryHide: "Показать последние матчи",
    noMatchStats: "Статистика этого матча не записана.",
    statEdge: "Статистическое преимущество: {0}",
    statsEven: "По статистике равенство",
    matchDialogTitle: "Добавить результат матча",
    matchDialogDesc: "Введите счёт сыгранного матча",
    predictionDraw: "Ничья",
    predictionNoHistory: "Предыдущих матчей нет — начальная оценка поровну",
    homeTeam: "Хозяева",
    awayTeam: "Гости",
    swapTeams: "Поменять хозяев и гостей местами",
    goals: "Голы",
    matchStats: "Статистика матча",
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
let showAllMatches = false;
let teamStatsMode = "single";

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
const matchOddsChartCanvas = document.getElementById("matchOddsChart");
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
let upcomingMatchOdds = null;
let upcomingBaseProbabilities = [1 / 3, 1 / 3, 1 / 3];
let liveUpcomingProbabilities = [1 / 3, 1 / 3, 1 / 3];
let targetUpcomingProbabilities = [1 / 3, 1 / 3, 1 / 3];
let upcomingMatchHistory = [];
let upcomingMatchSignature = "";
let nextUpcomingOddsTick = 0;
let nextUpcomingSample = 0;
let nextUpcomingDraw = 0;
let lastUpcomingFrame = 0;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function render() {
  renderStandings();
  renderMatches();
  renderLastMatch();
  renderNews();
  renderChampionshipRace();
  renderUpcomingMatch();
  renderFiveMatchForecast();
  renderSeasonInfo();
  renderTeamStats();
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
  if (championshipRace && state.matches.length > 0 && !prefersReducedMotion) {
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
  animateUpcomingMatch(now);
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
  const matches = state.matches.filter(m =>
    (m.home === 0 && m.away === 1) || (m.home === 1 && m.away === 0)
  );
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
  const h2hTeam0Name = document.getElementById("h2hTeam0Name");
  const h2hTeam1Name = document.getElementById("h2hTeam1Name");
  const h2hGoalsSummary = document.getElementById("h2hGoalsSummary");
  const h2hMatchesSummary = document.getElementById("h2hMatchesSummary");
  if (h2hTeam0Name) h2hTeam0Name.textContent = state.teams[0]?.name || "Team 1";
  if (h2hTeam1Name) h2hTeam1Name.textContent = state.teams[1]?.name || "Team 2";
  if (h2hTeam0Wins) h2hTeam0Wins.textContent = h2h.team0Wins;
  if (h2hTeam0Draws) h2hTeam0Draws.textContent = h2h.team0Draws;
  if (h2hTeam0Losses) h2hTeam0Losses.textContent = h2h.team0Losses;
  if (h2hTeam1Wins) h2hTeam1Wins.textContent = h2h.team1Wins;
  if (h2hTeam1Draws) h2hTeam1Draws.textContent = h2h.team1Draws;
  if (h2hTeam1Losses) h2hTeam1Losses.textContent = h2h.team1Losses;
  if (h2hGoalsSummary) {
    h2hGoalsSummary.textContent = t("goalsLabel", h2h.team0GoalsFor, h2h.team1GoalsFor);
  }
  if (h2hMatchesSummary) {
    h2hMatchesSummary.textContent = t("totalMatches", h2h.total);
  }
}

function calculateTeamSeasonStats(teamIndex, selectedSeason) {
  const matches = state.matches.filter(match =>
    (match.home === teamIndex || match.away === teamIndex) &&
    (selectedSeason === "all" || (match.season ?? 1) === Number(selectedSeason))
  );
  const stats = {
    played: matches.length,
    wins: 0,
    homePlayed: 0,
    homeWins: 0,
    awayPlayed: 0,
    awayWins: 0,
    draws: 0,
    losses: 0,
    goals: 0,
    possessionTotal: 0,
    possessionMatches: 0,
    passesTotal: 0,
    passesMatches: 0,
    shotsTotal: 0,
    shotsMatches: 0,
    shotsOnTargetTotal: 0,
    shotsOnTargetMatches: 0,
    goalsInShotMatches: 0
  };

  matches.forEach(match => {
    const isHome = match.home === teamIndex;
    const goalsFor = isHome ? match.homeGoals : match.awayGoals;
    const goalsAgainst = isHome ? match.awayGoals : match.homeGoals;
    const teamMatchStats = match.stats?.[isHome ? "home" : "away"] ?? {};
    stats.goals += goalsFor;
    if (isHome) stats.homePlayed++;
    else stats.awayPlayed++;
    if (goalsFor > goalsAgainst) {
      stats.wins++;
      if (isHome) stats.homeWins++;
      else stats.awayWins++;
    } else if (goalsFor === goalsAgainst) stats.draws++;
    else stats.losses++;

    if (Number.isFinite(teamMatchStats.possession)) {
      stats.possessionTotal += teamMatchStats.possession;
      stats.possessionMatches++;
    }
    if (Number.isFinite(teamMatchStats.passes)) {
      stats.passesTotal += teamMatchStats.passes;
      stats.passesMatches++;
    }
    if (Number.isFinite(teamMatchStats.shots)) {
      stats.shotsTotal += teamMatchStats.shots;
      stats.shotsMatches++;
      stats.goalsInShotMatches += goalsFor;
    }
    if (Number.isFinite(teamMatchStats.shotsOnTarget)) {
      stats.shotsOnTargetTotal += teamMatchStats.shotsOnTarget;
      stats.shotsOnTargetMatches++;
    }
  });

  return stats;
}

function formatTeamStat(value) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString(currentLang === "ru" ? "ru-RU" : "en-GB", {
    maximumFractionDigits: 1
  });
}

function renderTeamStats() {
  const seasonSelect = document.getElementById("teamStatsSeasonSelect");
  const teamSelect = document.getElementById("teamStatsTeamSelect");
  if (!seasonSelect || !teamSelect) return;

  const previousSeason = seasonSelect.value || String(currentSeason);
  const previousTeam = teamSelect.value || "0";
  teamSelect.replaceChildren();
  state.teams.forEach((team, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = team.name;
    teamSelect.append(option);
  });
  teamSelect.value = state.teams[Number(previousTeam)] ? previousTeam : "0";

  const seasons = [...new Set([
    Number.isInteger(currentSeason) && currentSeason >= 1 ? currentSeason : 1,
    ...state.matches.map(match => Number.isInteger(match.season) && match.season >= 1 ? match.season : 1)
  ])].sort((a, b) => a - b);
  seasonSelect.replaceChildren();
  const allSeasonsOption = document.createElement("option");
  allSeasonsOption.value = "all";
  allSeasonsOption.textContent = t("allSeasons");
  seasonSelect.append(allSeasonsOption);
  seasons.forEach(season => {
    const option = document.createElement("option");
    option.value = String(season);
    option.textContent = t("seasonOption", season);
    seasonSelect.append(option);
  });
  seasonSelect.value = previousSeason === "all" || seasons.includes(Number(previousSeason))
    ? previousSeason
    : String(currentSeason);

  const allTeamStats = state.teams.map((team, index) => ({
    team,
    index,
    stats: calculateTeamSeasonStats(index, seasonSelect.value)
  }));
  const selectedTeamIndex = Number(teamSelect.value);
  const teamStats = teamStatsMode === "compare"
    ? allTeamStats
    : [allTeamStats[selectedTeamIndex]];
  document.getElementById("teamStatsTeamFilter").hidden = teamStatsMode === "compare";
  document.querySelector(".team-stats-compare-label").hidden = teamStatsMode !== "compare";
  document.querySelectorAll(".team-stats-mode-button").forEach(button => {
    const active = button.dataset.statsMode === teamStatsMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const clubs = document.getElementById("teamStatsClubs");
  clubs.replaceChildren();
  clubs.classList.toggle("single", teamStatsMode !== "compare");
  teamStats.forEach(({ team, index, stats }) =>
    clubs.append(createTeamStatsClub(team, index, stats))
  );

  const cardsByTeam = teamStats.map(({ stats }) => createTeamStatCards(stats));
  const cards = teamStatsMode === "compare"
    ? cardsByTeam[0].map((card, index) => ({
      ...card,
      values: [card, cardsByTeam[1][index]]
    }))
    : cardsByTeam[0].map(card => ({ ...card, values: [card] }));
  const grid = document.getElementById("teamStatsGrid");
  grid.replaceChildren();
  grid.classList.toggle("single", teamStatsMode !== "compare");
  cards.forEach(card => {
    const element = document.createElement("article");
    element.className = "team-stat-card";
    element.dataset.tone = card.tone;
    const label = document.createElement("span");
    label.className = "team-stat-label";
    label.textContent = t(card.label);
    const comparison = document.createElement("div");
    comparison.className = "team-stat-comparison";
    const availableValues = card.values.map(item => item.numeric).filter(Number.isFinite);
    const max = Math.max(...availableValues, 0);
    const winner = teamStatsMode !== "compare"
      ? -2
      : card.values[0].numeric === null || card.values[1].numeric === null
        ? -2
        : Math.abs(card.values[0].numeric - card.values[1].numeric) < 0.0001
          ? -1
          : card.values[0].numeric > card.values[1].numeric ? 0 : 1;
    card.values.forEach((valueInfo, teamIndex) => {
      const side = document.createElement("div");
      side.className = `team-stat-side ${teamIndex === 0 ? "one" : "two"}${winner === teamIndex ? " winner" : ""}`;
      const value = document.createElement("strong");
      value.className = "team-stat-value";
      value.textContent = valueInfo.value;
      const note = document.createElement("span");
      note.className = "team-stat-note";
      note.textContent = valueInfo.note;
      const track = document.createElement("span");
      track.className = "team-stat-track";
      const fill = document.createElement("span");
      fill.className = "team-stat-fill";
      fill.style.width = valueInfo.numeric === null
        ? "0%"
        : `${max === 0 ? 50 : valueInfo.numeric / max * 100}%`;
      track.append(fill);
      side.append(value, note, track);
      comparison.append(side);
    });
    const verdict = document.createElement("span");
    verdict.className = "team-stat-verdict";
    if (teamStatsMode !== "compare") {
      verdict.hidden = true;
    } else if (winner === -2) {
      verdict.textContent = "—";
      verdict.setAttribute("aria-label", t("teamStatsInsufficientData"));
    } else if (winner === -1) {
      verdict.textContent = t("teamStatsTie");
    } else {
      const badge = document.createElement("img");
      badge.src = TEAM_PHOTOS[winner];
      badge.alt = "";
      badge.className = "team-stat-winner-badge";
      const winnerName = document.createElement("span");
      winnerName.textContent = state.teams[winner].name;
      const winnerLabel = document.createElement("small");
      winnerLabel.textContent = t("teamStatsBetter");
      verdict.append(badge, winnerName, winnerLabel);
      verdict.classList.add(winner === 0 ? "one" : "two");
    }
    element.append(label, comparison, verdict);
    grid.append(element);
  });
  document.getElementById("teamStatsEmpty").hidden = teamStats.some(({ stats }) => stats.played > 0);
}

function createTeamStatsClub(team, index, stats) {
  const club = document.createElement("div");
  club.className = `team-stats-club ${index === 0 ? "one" : "two"}`;
  const badge = document.createElement("span");
  badge.className = "team-stats-club-badge";
  const image = document.createElement("img");
  image.src = TEAM_PHOTOS[index];
  image.alt = "";
  image.loading = "lazy";
  badge.append(image);
  const name = document.createElement("strong");
  name.textContent = team.name;
  const record = document.createElement("span");
  record.textContent = t("statsRecord", stats.played, stats.wins, stats.draws, stats.losses);
  club.append(badge, name, record);
  return club;
}

function createTeamStatCards(stats) {
  const recordedNote = count => t("statRecordedIn", count, stats.played);
  return [
    { label: "statPlayed", value: String(stats.played), numeric: null, note: t("statAllMatches"), tone: "results" },
    {
      label: "statWinRate",
      value: stats.played ? `${formatTeamStat(stats.wins / stats.played * 100)}%` : "—",
      numeric: stats.played ? stats.wins / stats.played * 100 : null,
      note: t("statWinsOutOf", stats.wins, stats.played),
      tone: "results"
    },
    {
      label: "statHomeWinRate",
      value: stats.homePlayed ? `${formatTeamStat(stats.homeWins / stats.homePlayed * 100)}%` : "—",
      numeric: stats.homePlayed ? stats.homeWins / stats.homePlayed * 100 : null,
      note: t("statLocationWinsOutOf", stats.homeWins, stats.homePlayed),
      tone: "results"
    },
    {
      label: "statAwayWinRate",
      value: stats.awayPlayed ? `${formatTeamStat(stats.awayWins / stats.awayPlayed * 100)}%` : "—",
      numeric: stats.awayPlayed ? stats.awayWins / stats.awayPlayed * 100 : null,
      note: t("statLocationWinsOutOf", stats.awayWins, stats.awayPlayed),
      tone: "results"
    },
    { label: "statGoals", value: String(stats.goals), numeric: stats.goals, note: t("statAllMatches"), tone: "goals" },
    {
      label: "statGoalsPerMatch",
      value: stats.played ? formatTeamStat(stats.goals / stats.played) : "—",
      numeric: stats.played ? stats.goals / stats.played : null,
      note: t("statAllMatches"),
      tone: "goals"
    },
    {
      label: "statPossession",
      value: stats.possessionMatches
        ? `${formatTeamStat(stats.possessionTotal / stats.possessionMatches)}%`
        : "—",
      numeric: stats.possessionMatches ? stats.possessionTotal / stats.possessionMatches : null,
      note: recordedNote(stats.possessionMatches),
      tone: "possession"
    },
    {
      label: "statPasses",
      value: stats.passesMatches ? formatTeamStat(stats.passesTotal / stats.passesMatches) : "—",
      numeric: stats.passesMatches ? stats.passesTotal / stats.passesMatches : null,
      note: recordedNote(stats.passesMatches),
      tone: "possession"
    },
    {
      label: "statShots",
      value: stats.shotsMatches ? formatTeamStat(stats.shotsTotal / stats.shotsMatches) : "—",
      numeric: stats.shotsMatches ? stats.shotsTotal / stats.shotsMatches : null,
      note: recordedNote(stats.shotsMatches),
      tone: "shots"
    },
    {
      label: "statShotsOnTarget",
      value: stats.shotsOnTargetMatches
        ? formatTeamStat(stats.shotsOnTargetTotal / stats.shotsOnTargetMatches)
        : "—",
      numeric: stats.shotsOnTargetMatches ? stats.shotsOnTargetTotal / stats.shotsOnTargetMatches : null,
      note: recordedNote(stats.shotsOnTargetMatches),
      tone: "shots"
    },
    {
      label: "statShotConversion",
      value: stats.shotsTotal
        ? `${formatTeamStat(stats.goalsInShotMatches / stats.shotsTotal * 100)}%`
        : "—",
      numeric: stats.shotsTotal ? stats.goalsInShotMatches / stats.shotsTotal * 100 : null,
      note: recordedNote(stats.shotsMatches),
      tone: "goals"
    }
  ];
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
  const historyToggle = document.getElementById("matchHistoryToggle");
  document.getElementById("matchesCount").textContent =
    `${state.matches.length} ${pluralize(state.matches.length, "match", "matches")}`;
  if (state.matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-matches";
    empty.textContent = t("noMatchesPlayed");
    matchList.append(empty);
    historyToggle.hidden = true;
    historyToggle.setAttribute("aria-expanded", "false");
    return;
  }
  const matches = state.matches.slice().reverse();
  const visibleMatches = showAllMatches ? matches : matches.slice(0, 6);
  historyToggle.hidden = matches.length <= 6;
  historyToggle.setAttribute("aria-expanded", String(showAllMatches));
  historyToggle.textContent = showAllMatches
    ? t("matchHistoryHide")
    : t("matchHistoryShow", matches.length);
  visibleMatches.forEach(match => {
    const item = document.createElement("details");
    item.className = "match-item match-item-details";
    const teams = document.createElement("div");
    teams.className = "match-teams";
    const first = createMatchTeamDisplay(match.home);
    const second = createMatchTeamDisplay(match.away);
    const date = document.createElement("span");
    date.className = "match-date";
    const parsedDate = new Date(match.date);
    date.textContent = Number.isNaN(parsedDate.getTime()) ? "" :
      parsedDate.toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB", {
        day: "numeric",
        month: "short"
      });
    teams.append(first, second, date);
    const score = document.createElement("span");
    score.className = "match-score";
    const scoreHome = document.createElement("span");
    scoreHome.textContent = String(match.homeGoals);
    const scoreSeparator = document.createElement("span");
    scoreSeparator.className = "match-score-separator";
    scoreSeparator.textContent = ":";
    const scoreAway = document.createElement("span");
    scoreAway.textContent = String(match.awayGoals);
    score.append(scoreHome, scoreSeparator, scoreAway);
    score.setAttribute("aria-label", `Score ${match.homeGoals} to ${match.awayGoals}`);
    const summary = document.createElement("summary");
    summary.className = "match-summary";
    summary.append(teams, score);
    item.append(summary, renderMatchStats(match));
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

function createMatchTeamDisplay(teamIndex) {
  const team = document.createElement("span");
  team.className = "match-team";
  const badge = document.createElement("span");
  badge.className = `match-team-badge ${teamIndex === 0 ? "one" : "two"}`;
  const photo = TEAM_PHOTOS[teamIndex];
  if (photo) {
    const image = document.createElement("img");
    image.src = photo;
    image.alt = "";
    image.loading = "lazy";
    badge.append(image);
  } else {
    badge.textContent = teamIndex === 0 ? "01" : "02";
  }
  const name = document.createElement("span");
  name.className = "match-team-name";
  name.textContent = state.teams[teamIndex]?.name ?? `Team ${teamIndex + 1}`;
  team.append(badge, name);
  return team;
}

function renderLastMatch() {
  const panel = document.getElementById("lastMatchPanel");
  const result = document.getElementById("lastMatchResult");
  const stats = document.getElementById("lastMatchStats");
  const dateLabel = document.getElementById("lastMatchDate");
  panel.hidden = false;
  panel.classList.toggle("has-match", state.matches.length > 0);
  if (!state.matches.length) {
    result.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "last-match-empty";
    empty.textContent = t("noLastMatch");
    result.append(empty);
    dateLabel.textContent = "";
    stats.replaceChildren();
    return;
  }
  const lastMatch = state.matches.reduce((latest, match) =>
    new Date(match.date) > new Date(latest.date) ? match : latest
  );
  const parsedDate = new Date(lastMatch.date);
  dateLabel.textContent = Number.isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toLocaleDateString(currentLang === "ru" ? "ru-RU" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  result.replaceChildren();
  const homeTeam = createMatchTeamDisplay(lastMatch.home);
  homeTeam.classList.add("last-match-team");
  const awayTeam = createMatchTeamDisplay(lastMatch.away);
  awayTeam.classList.add("last-match-team");
  const score = document.createElement("strong");
  score.className = "last-match-score";
  score.textContent = `${lastMatch.homeGoals} : ${lastMatch.awayGoals}`;
  result.append(homeTeam, score, awayTeam);
  stats.replaceChildren(renderMatchStats(lastMatch));
}

function renderMatchStats(match) {
  const section = document.createElement("div");
  section.className = "match-stats";
  const rows = [
    ["shotsOnTarget", 4, ""],
    ["shots", 2.5, ""],
    ["possession", 1.5, "%"],
    ["passes", 0.5, ""]
  ];
  let visibleRows = 0;
  let homeEdge = 0;
  let awayEdge = 0;
  rows.forEach(([key, weight, suffix]) => {
    const rawValues = [match.stats?.home?.[key], match.stats?.away?.[key]];
    const values = rawValues.map(value => {
      if (value === null || value === undefined || value === "") return null;
      const number = Number(value);
      return Number.isFinite(number) ? number : null;
    });
    if (values.some(value => value === null)) return;
    visibleRows += 1;
    const total = values[0] + values[1];
    if (total > 0) {
      homeEdge += weight * values[0] / total;
      awayEdge += weight * values[1] / total;
    }
    const row = document.createElement("div");
    row.className = "match-stat-row";
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", `${t(key)}: ${values[0] ?? "—"}${values[0] === null ? "" : suffix} – ${values[1] ?? "—"}${values[1] === null ? "" : suffix}`);
    const valueLine = document.createElement("div");
    valueLine.className = "match-stat-values";
    const homeValue = document.createElement("strong");
    homeValue.textContent = values[0] === null ? "—" : `${values[0]}${suffix}`;
    const label = document.createElement("span");
    label.textContent = t(key);
    const awayValue = document.createElement("strong");
    awayValue.textContent = values[1] === null ? "—" : `${values[1]}${suffix}`;
    valueLine.append(homeValue, label, awayValue);

    const max = Math.max(...values.filter(value => value !== null), 0);
    const makeTrack = (value, side) => {
      const track = document.createElement("span");
      track.className = `match-stat-track ${side}`;
      const fill = document.createElement("span");
      fill.className = `match-stat-fill ${side}`;
      fill.style.width = value === null ? "0%" : `${max === 0 ? 50 : value / max * 100}%`;
      track.append(fill);
      return track;
    };
    const bars = document.createElement("div");
    bars.className = "match-stat-bars";
    bars.setAttribute("aria-hidden", "true");
    bars.append(makeTrack(values[0], "home"), makeTrack(values[1], "away"));
    row.append(valueLine, bars);
    section.append(row);
  });
  if (visibleRows === 0) {
    const empty = document.createElement("p");
    empty.className = "match-stats-empty";
    empty.textContent = t("noMatchStats");
    section.append(empty);
  } else {
    const edge = document.createElement("p");
    edge.className = "match-stat-edge";
    if (Math.abs(homeEdge - awayEdge) < 0.0001) {
      edge.textContent = t("statsEven");
    } else {
      const strongerTeam = homeEdge > awayEdge ? match.home : match.away;
      edge.textContent = t("statEdge", state.teams[strongerTeam]?.name ?? `Team ${strongerTeam + 1}`);
    }
    section.append(edge);
  }
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
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    el.title = t(el.getAttribute("data-i18n-title"));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
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
  updateMatchTeamBadges();
}

function updateMatchTeamBadges() {
  [["homeTeam", "homeTeamBadge"], ["awayTeam", "awayTeamBadge"]].forEach(([selectId, badgeId]) => {
    const teamIndex = Number(document.getElementById(selectId).value);
    const badge = document.getElementById(badgeId);
    badge.replaceChildren();
    badge.className = `match-team-picker-badge ${teamIndex === 0 ? "one" : "two"}`;
    const photo = TEAM_PHOTOS[teamIndex];
    if (photo) {
      const image = document.createElement("img");
      image.src = photo;
      image.alt = "";
      badge.append(image);
    } else {
      badge.textContent = String(teamIndex + 1).padStart(2, "0");
    }
  });
}

function calculateUpcomingMatchOdds() {
  const history = state.matches.filter(match =>
    (match.home === 0 && match.away === 1) ||
    (match.home === 1 && match.away === 0)
  );
  if (history.length === 0) return { probabilities: [1 / 3, 1 / 3, 1 / 3], count: 0 };

  const predictions = history.map(match => {
    const teamZeroHome = match.home === 0;
    const homeGoals = teamZeroHome ? match.homeGoals : match.awayGoals;
    const awayGoals = teamZeroHome ? match.awayGoals : match.homeGoals;
    const teamZeroStats = match.stats?.[teamZeroHome ? "home" : "away"] ?? {};
    const teamOneStats = match.stats?.[teamZeroHome ? "away" : "home"] ?? {};
    const signals = [[Math.tanh((homeGoals - awayGoals) / 1.5), 0.45]];
    const addShareSignal = (homeValue, awayValue, weight) => {
      if (Number.isFinite(homeValue) && Number.isFinite(awayValue) &&
        homeValue + awayValue > 0) {
        signals.push([(homeValue - awayValue) / (homeValue + awayValue), weight]);
      }
    };
    addShareSignal(teamZeroStats.shots, teamOneStats.shots, 0.12);
    addShareSignal(teamZeroStats.shotsOnTarget, teamOneStats.shotsOnTarget, 0.18);
    if (Number.isFinite(teamZeroStats.possession) && Number.isFinite(teamOneStats.possession)) {
      signals.push([(teamZeroStats.possession - teamOneStats.possession) / 100, 0.12]);
    }
    addShareSignal(teamZeroStats.passes, teamOneStats.passes, 0.08);

    const totalWeight = signals.reduce((sum, [, weight]) => sum + weight, 0);
    const performanceEdge = signals.reduce((sum, [value, weight]) =>
      sum + value * weight, 0) / totalWeight + 0.06;
    const drawChance = 0.08 + 0.38 * Math.exp(-3 * Math.abs(performanceEdge));
    const homeShare = 1 / (1 + Math.exp(-4 * performanceEdge));
    return [
      (1 - drawChance) * homeShare,
      drawChance,
      (1 - drawChance) * (1 - homeShare)
    ];
  });

  const priorWeight = 2;
  const probabilities = [0, 1, 2].map(index =>
    (predictions.reduce((sum, prediction) => sum + prediction[index], 0) +
      priorWeight / 3) / (history.length + priorWeight)
  );
  return { probabilities, count: history.length };
}

function renderUpcomingMatch() {
  const prediction = calculateUpcomingMatchOdds();
  upcomingMatchOdds = prediction;
  upcomingBaseProbabilities = prediction.probabilities;
  const homeName = state.teams[0]?.name ?? t("homeTeam");
  const awayName = state.teams[1]?.name ?? t("awayTeam");
  document.getElementById("upcomingHomeName").textContent = homeName;
  document.getElementById("upcomingAwayName").textContent = awayName;
  document.getElementById("upcomingHomeLabel").textContent = homeName;
  document.getElementById("upcomingAwayLabel").textContent = awayName;
  setRaceBadge(document.getElementById("upcomingHomeBadge"), 0, TEAM_PHOTOS[0]);
  setRaceBadge(document.getElementById("upcomingAwayBadge"), 1, TEAM_PHOTOS[1]);
  matchOddsChartCanvas.setAttribute("aria-label", t("upcomingMatchChartLabel", homeName, awayName));
  document.getElementById("upcomingMatchNote").textContent = prediction.count === 0
    ? t("predictionNoHistory")
    : t("upcomingMatchSamples", prediction.count);

  const signature = JSON.stringify(state.matches.map(match => [
    match.id, match.home, match.away, match.homeGoals, match.awayGoals, match.stats
  ]));
  if (signature !== upcomingMatchSignature) {
    upcomingMatchSignature = signature;
    liveUpcomingProbabilities = [...upcomingBaseProbabilities];
    targetUpcomingProbabilities = [...upcomingBaseProbabilities];
    const now = performance.now();
    upcomingMatchHistory = [
      { t: now - 60000, probabilities: [...liveUpcomingProbabilities] },
      { t: now, probabilities: [...liveUpcomingProbabilities] }
    ];
  }
  updateUpcomingOddsDisplay();
}

function getFiveMatchForecast() {
  const history = state.matches
    .filter(match => (match.home === 0 || match.home === 1) &&
      match.away === 1 - match.home &&
      match.homeGoals != null && match.awayGoals != null &&
      match.homeGoals !== "" && match.awayGoals !== "" &&
      Number.isFinite(Number(match.homeGoals)) &&
      Number.isFinite(Number(match.awayGoals)))
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const lastMatch = history[history.length - 1];
  const knownFixtures = new Map();
  history.forEach(match => {
    knownFixtures.set(`${match.home}:${match.away}`, { homeTeam: match.home, awayTeam: match.away });
  });
  const fixtures = [...knownFixtures.values()];
  if (!fixtures.length) return [];
  const recentMatches = history.slice(-10);

  const nextHomeTeam = lastMatch && (lastMatch.home === 0 || lastMatch.home === 1)
    ? 1 - lastMatch.home
    : fixtures[0].homeTeam;
  let fixtureIndex = fixtures.findIndex(fixture => fixture.homeTeam === nextHomeTeam);
  if (fixtureIndex < 0) fixtureIndex = 0;

  return Array.from({ length: 5 }, (_, index) => {
    const fixture = fixtures[fixtureIndex];
    const prediction = calculateForecastFromRecentMatches(
      recentMatches,
      fixture.homeTeam,
      fixture.awayTeam
    );
    fixtureIndex = (fixtureIndex + 1) % fixtures.length;
    return {
      number: index + 1,
      ...fixture,
      available: true,
      ...prediction
    };
  });
}

function calculateForecastFromRecentMatches(matches, homeTeam, awayTeam) {
  const outcomeCounts = [0, 0, 0];
  let homeGoalsTotal = 0;
  let awayGoalsTotal = 0;

  matches.forEach(match => {
    const homeTeamGoals = match.home === homeTeam
      ? Number(match.homeGoals)
      : Number(match.awayGoals);
    const awayTeamGoals = match.home === awayTeam
      ? Number(match.homeGoals)
      : Number(match.awayGoals);
    homeGoalsTotal += homeTeamGoals;
    awayGoalsTotal += awayTeamGoals;
    outcomeCounts[homeTeamGoals > awayTeamGoals ? 0 : homeTeamGoals === awayTeamGoals ? 1 : 2]++;
  });

  const sampleSize = matches.length;
  const probabilities = outcomeCounts.map(count => count / sampleSize);
  const maxProbability = Math.max(...probabilities);
  const leaders = probabilities
    .map((probability, index) => probability === maxProbability ? index : -1)
    .filter(index => index >= 0);

  return {
    homeGoals: Math.round(homeGoalsTotal / sampleSize),
    awayGoals: Math.round(awayGoalsTotal / sampleSize),
    probabilities,
    predictedOutcome: leaders.length === 1 ? leaders[0] : null,
    sampleSize
  };
}

function renderFiveMatchForecast() {
  const list = document.getElementById("forecastFiveList");
  if (!list) return;
  list.replaceChildren();
  const forecasts = getFiveMatchForecast();
  forecasts.forEach(forecast => {
    const item = document.createElement("article");
    item.className = "forecast-five-item";

    const number = document.createElement("span");
    number.className = "forecast-five-number";
    number.textContent = String(forecast.number).padStart(2, "0");

    const fixture = document.createElement("div");
    fixture.className = "forecast-five-fixture";
    [forecast.homeTeam, forecast.awayTeam].forEach(teamIndex => {
      const team = document.createElement("span");
      team.className = `forecast-five-team ${teamIndex === 0 ? "one" : "two"}`;
      const badge = document.createElement("img");
      badge.src = TEAM_PHOTOS[teamIndex];
      badge.alt = "";
      badge.loading = "lazy";
      const name = document.createElement("span");
      name.textContent = state.teams[teamIndex]?.name ?? `Team ${teamIndex + 1}`;
      team.append(badge, name);
      if (forecast.available && forecast.predictedOutcome === (teamIndex === forecast.homeTeam ? 0 : 2)) {
        const crown = document.createElement("span");
        crown.className = "forecast-five-mark";
        crown.textContent = "👑";
        crown.setAttribute("aria-label", t("forecastWinnerPick", name.textContent));
        team.append(crown);
      }
      fixture.append(team);
    });

    const score = document.createElement("strong");
    score.className = `forecast-five-score${forecast.available ? "" : " forecast-five-unavailable"}`;
    score.textContent = forecast.available
      ? `${forecast.homeGoals} : ${forecast.awayGoals}`
      : t("forecastUnavailable");
    if (forecast.available) {
      score.setAttribute("aria-label", `${t("forecastScore")}: ${forecast.homeGoals} to ${forecast.awayGoals}`);
    }

    const pick = document.createElement("div");
    pick.className = "forecast-five-pick";
    if (!forecast.available) {
      pick.textContent = "";
    } else if (forecast.predictedOutcome === 1) {
      const drawMark = document.createElement("span");
      drawMark.className = "forecast-five-draw";
      drawMark.textContent = "X";
      drawMark.setAttribute("aria-label", t("forecastDrawPick"));
      pick.append(drawMark, document.createTextNode(t("forecastDrawPick")));
    } else if (forecast.predictedOutcome === 0 || forecast.predictedOutcome === 2) {
      const winnerIndex = forecast.predictedOutcome === 0
        ? forecast.homeTeam
        : forecast.awayTeam;
      pick.textContent = t("forecastWinnerPick", state.teams[winnerIndex]?.name ?? `Team ${winnerIndex + 1}`);
    } else {
      pick.textContent = t("forecastUndecided");
    }

    if (forecast.available) {
      const outcomes = document.createElement("div");
      outcomes.className = "forecast-five-outcomes";
      const labels = ["forecastHomeWin", "forecastDraw", "forecastAwayWin"];
      const displayedProbabilities = getRoundedForecastProbabilities(forecast.probabilities);
      displayedProbabilities.forEach((percentValue, index) => {
        const outcome = document.createElement("div");
        outcome.className = `forecast-five-outcome outcome-${index}`;
        const label = document.createElement("span");
        label.textContent = t(labels[index]);
        const percent = document.createElement("strong");
        percent.textContent = `${percentValue}%`;
        outcome.append(label, percent);
        outcomes.append(outcome);
      });

      const bar = document.createElement("div");
      bar.className = "forecast-five-bar";
      forecast.probabilities.forEach((probability, index) => {
        const segment = document.createElement("span");
        segment.className = `forecast-five-segment outcome-${index}`;
        segment.style.width = `${probability * 100}%`;
        bar.append(segment);
      });
      item.append(number, fixture, score, pick, outcomes, bar);
    } else {
      item.append(number, fixture, score);
    }
    list.append(item);
  });
  document.getElementById("forecastFiveNote").textContent =
    forecasts.length
      ? t("forecastDataNote", forecasts[0].sampleSize)
      : t("forecastNoHistory");
}

function getRoundedForecastProbabilities(probabilities) {
  const percentages = probabilities.map(probability => probability * 100);
  const rounded = percentages.map(Math.floor);
  let remainder = 100 - rounded.reduce((sum, value) => sum + value, 0);
  const order = percentages
    .map((value, index) => ({ index, fraction: value - rounded[index] }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index++) {
    rounded[order[index].index]++;
  }
  return rounded;
}

function getDisplayedMatchProbabilities(probabilities) {
  const totalTenths = 1000;
  const exactTenths = probabilities.map(probability => probability * totalTenths);
  const displayedTenths = exactTenths.map(Math.floor);
  let remainder = totalTenths - displayedTenths.reduce((sum, value) => sum + value, 0);
  const order = exactTenths
    .map((value, index) => ({ index, fraction: value - displayedTenths[index] }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index++) {
    displayedTenths[order[index].index]++;
  }
  return displayedTenths.map(value => value / 10);
}

function updateUpcomingOddsDisplay() {
  if (!upcomingMatchOdds) return;
  const percentages = getDisplayedMatchProbabilities(liveUpcomingProbabilities);
  ["upcomingHomeOdds", "upcomingDrawOdds", "upcomingAwayOdds"].forEach((id, index) => {
    document.getElementById(id).textContent = `${percentages[index].toFixed(1)}%`;
  });
}

function animateUpcomingMatch(now) {
  const elapsed = lastUpcomingFrame ? Math.min(now - lastUpcomingFrame, 100) : 16;
  lastUpcomingFrame = now;
  if (upcomingMatchOdds && upcomingMatchOdds.count > 0 && !prefersReducedMotion) {
    if (now >= nextUpcomingOddsTick) {
      const maxDeviation = 0.06;
      const homeTarget = Math.max(
        Math.max(0.02, upcomingBaseProbabilities[0] - maxDeviation),
        Math.min(Math.min(0.96, upcomingBaseProbabilities[0] + maxDeviation), liveUpcomingProbabilities[0] +
          (Math.random() - 0.5) * 0.08 +
          (upcomingBaseProbabilities[0] - liveUpcomingProbabilities[0]) * 0.16)
      );
      const maxDrawTarget = Math.min(0.75, 0.98 - homeTarget, upcomingBaseProbabilities[1] + maxDeviation);
      const drawTarget = Math.max(Math.min(0.02, maxDrawTarget),
        Math.min(maxDrawTarget, liveUpcomingProbabilities[1] +
          (Math.random() - 0.5) * 0.05 +
          (upcomingBaseProbabilities[1] - liveUpcomingProbabilities[1]) * 0.16)
      );
      targetUpcomingProbabilities = [homeTarget, drawTarget, 1 - homeTarget - drawTarget];
      nextUpcomingOddsTick = now + 700 + Math.random() * 900;
    }
    const easing = 1 - Math.exp(-elapsed / 700);
    liveUpcomingProbabilities = liveUpcomingProbabilities.map((value, index) =>
      value + (targetUpcomingProbabilities[index] - value) * easing
    );
    const total = liveUpcomingProbabilities.reduce((sum, value) => sum + value, 0);
    liveUpcomingProbabilities = liveUpcomingProbabilities.map(value => value / total);
  } else if (upcomingMatchOdds) {
    liveUpcomingProbabilities = [...upcomingBaseProbabilities];
    targetUpcomingProbabilities = [...upcomingBaseProbabilities];
  }

  if (upcomingMatchOdds && now >= nextUpcomingSample) {
    upcomingMatchHistory.push({ t: now, probabilities: [...liveUpcomingProbabilities] });
    const cutoff = now - 60000;
    while (upcomingMatchHistory.length > 2 && upcomingMatchHistory[1].t < cutoff) {
      upcomingMatchHistory.shift();
    }
    nextUpcomingSample = now + 100;
    updateUpcomingOddsDisplay();
  }
  if (upcomingMatchOdds && now >= nextUpcomingDraw) {
    drawMatchOddsChart(now);
    nextUpcomingDraw = now + 50;
  }
}

function drawMatchOddsChart(now = performance.now()) {
  const ctx = matchOddsChartCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = matchOddsChartCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const pixelWidth = Math.round(rect.width * dpr);
  const pixelHeight = Math.round(rect.height * dpr);
  if (matchOddsChartCanvas.width !== pixelWidth || matchOddsChartCanvas.height !== pixelHeight) {
    matchOddsChartCanvas.width = pixelWidth;
    matchOddsChartCanvas.height = pixelHeight;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);
  const left = 34;
  const right = 12;
  const top = 8;
  const bottom = 18;
  const chartWidth = Math.max(1, width - left - right);
  const chartHeight = Math.max(1, height - top - bottom);
  const startTime = now - 60000;

  [0, 50, 100].forEach(value => {
    const y = top + chartHeight - (value / 100) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(width - right, y);
    ctx.strokeStyle = value === 50 ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.06)";
    ctx.lineWidth = 1;
    ctx.setLineDash(value === 50 ? [3, 4] : []);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,255,255,.42)";
    ctx.font = "9px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${value}%`, 3, y + 3);
  });
  ctx.fillStyle = "rgba(255,255,255,.4)";
  ctx.font = "9px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("-60s", left, height - 4);
  ctx.textAlign = "center";
  ctx.fillText("-30s", left + chartWidth / 2, height - 4);
  ctx.textAlign = "right";
  ctx.fillText("now", width - right, height - 4);

  const traces = [
    { index: 0, color: "#d3ff57" },
    { index: 1, color: "#9c78ff" },
    { index: 2, color: "#55c5ff" }
  ];
  traces.forEach(trace => {
    ctx.beginPath();
    upcomingMatchHistory.forEach((point, index) => {
      const x = left + ((point.t - startTime) / 60000) * chartWidth;
      const y = top + chartHeight - point.probabilities[trace.index] * chartHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    const currentY = top + chartHeight -
      liveUpcomingProbabilities[trace.index] * chartHeight;
    ctx.lineTo(width - right, currentY);
    ctx.strokeStyle = trace.color;
    ctx.lineWidth = 1.8;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = trace.color;
    ctx.shadowBlur = 7;
    ctx.stroke();
    ctx.shadowBlur = 0;
  });
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

document.getElementById("teamStatsTeamSelect").addEventListener("change", renderTeamStats);
document.getElementById("teamStatsSeasonSelect").addEventListener("change", renderTeamStats);
document.querySelectorAll(".team-stats-mode-button").forEach(button => {
  button.addEventListener("click", () => {
    teamStatsMode = button.dataset.statsMode;
    renderTeamStats();
  });
});
document.getElementById("matchHistoryToggle").addEventListener("click", () => {
  showAllMatches = !showAllMatches;
  renderMatches();
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

document.getElementById("swapMatchTeams").addEventListener("click", () => {
  const homeSelect = document.getElementById("homeTeam");
  const awaySelect = document.getElementById("awayTeam");
  const previousHome = homeSelect.value;
  homeSelect.value = awaySelect.value;
  awaySelect.value = previousHome;
  [
    ["homeGoals", "awayGoals"],
    ["homeShots", "awayShots"],
    ["homeShotsOnTarget", "awayShotsOnTarget"],
    ["homePossession", "awayPossession"],
    ["homePasses", "awayPasses"]
  ].forEach(([homeId, awayId]) => {
    const homeInput = document.getElementById(homeId);
    const previousValue = homeInput.value;
    homeInput.value = document.getElementById(awayId).value;
    document.getElementById(awayId).value = previousValue;
  });
  updateStatsTeamLabels();
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
window.addEventListener("resize", () => {
  const now = performance.now();
  drawRaceChart(now);
  drawMatchOddsChart(now);
});

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
