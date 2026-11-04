const GROUPS = ["attack", "defense", "passes", "possession", "conversion"];
const UI = {
  en: {
    back: "← League",
    title: "Team Analytics",
    eyebrow: "LIVE LEAGUE INTELLIGENCE",
    hero: "Live team strength & match outlook",
    subtitle: "Ratings are recalculated from recorded match statistics as the league changes.",
    live: "LIVE · CONNECTING",
    liveConnected: "LIVE · CONNECTED",
    livePolling: "LIVE · 15S REFRESH",
    season: "Season",
    allSeasons: "All seasons",
    current: "current",
    favoriteEyebrow: "MATCH OUTLOOK",
    favoriteTitle: "Current favorite",
    teamsEyebrow: "PERFORMANCE REPORT",
    teamsTitle: "Team ratings & strengths",
    strengthsEyebrow: "SQUAD RATINGS",
    strengthsTitle: "Team strength",
    strengthsDescription: "Average player OVR by position in each current starting lineup · substitutes excluded.",
    strengthLead: (score, count, opponent, opponentScore, opponentCount) => `${score.toFixed(1)} avg OVR · ${count} players · ${opponent}: ${opponentScore.toFixed(1)} (${opponentCount})`,
    noStrengthData: "No current starting-lineup ratings are available.",
    noPositionData: "No rated starters in this line",
    strengthLine: "ATTACK",
    strengthMidfield: "MIDFIELD",
    strengthDefense: "DEFENSE",
    comparisonOf: "vs",
    mobileScaleTitle: "Mobile-game rating scale",
    mobileScale: "Radar values show actual per-match averages. Ratings use a strict mobile scale: shots are measured against 8 per match, goals against 3; defense scores higher for fewer opponent shots (up to 8) and goals conceded (up to 3). Passes are measured against 150 per match, possession is its actual team average, and conversion is goals ÷ shots measured against 40%. Each axis contributes equally; missing data is excluded. Recent form is graded A (70%+ of available table points), B (40–69%), or C (below 40%) over the last five matches.",
    summaryMatches: "MATCHES ANALYZED",
    summaryTeams: "TEAMS TRACKED",
    summaryLeader: "TOP RATING",
    summaryMedian: "MEDIAN RATING",
    perSelectedSeason: "for selected period",
    noMatches: "No matches in this period",
    noRatings: "Ratings appear after match statistics are recorded",
    noFavorite: "There is not enough match data to identify a favorite yet.",
    tier: "TIER",
    sample: (n) => `${n} match${n === 1 ? "" : "es"} in selected period`,
    lowSample: "Early read · fewer than 3 matches",
    median: "Median rating",
    played: "played",
    form: "FORM",
    formRecord: (results) => `LAST ${results.length}: ${results.join(" ") || "—"}`,
    formResults: { win: "W", draw: "D", loss: "L" },
    wins: "W",
    draws: "D",
    losses: "L",
    goals: "GF",
    conceded: "GA",
    attack: "ATTACK",
    defense: "DEFENSE",
    shotsAgainst: "SHOTS CONCEDED",
    goalsAgainst: "GOALS CONCEDED",
    passes: "PASSES",
    possession: "POSSESSION",
    conversion: "CONVERSION",
    radarLabels: ["ATTACK", "DEFENSE", "PASSES", "POSSESSION", "CONVERSION"],
    statsCoverage: (shots, against, passes, possession, conversion, played) => `Stats recorded in ${played} matches · shots ${shots} · shots conceded ${against} · passes ${passes} · possession ${possession} · conversion ${conversion}`,
    attackValue: (shots, goals) => `${shots} shots · ${goals} goals / match`,
    defenseValue: (shots, onTarget, goals) => `${shots} shots · ${goals} goals conceded / match${onTarget === null ? "" : ` · ${onTarget} on target`}`,
    passesValue: (value) => `${value} / match`,
    possessionValue: (value) => `${value}%`,
    conversionValue: (value) => `${value}% of shots`,
    liveTicker: "LIVE RESULTS",
    tickerStatus: "LIVE DATABASE · SCORES UPDATE AUTOMATICALLY",
    noLiveMatches: "Waiting for the first saved match",
    cardiogramTitle: "League points trend",
    cardiogramDescription: "All saved results from the start · both teams begin at 0 points · win 3, draw 1",
    matchTrendTitle: "Match probability trend",
    matchTrendDescription: (home, away) => "Percentages and lines move smoothly between model updates. Simulated movement is not new live-match data.",
    recentProbabilityTitle: "Last 5 matches used by the model",
    modelMethodTitle: "How the model calculates probabilities",
    modelMethod: "The latest five matches are weighted from 1 (oldest) to 5 (newest). Weighted shots × weighted conversion estimate goals; the opponent's shots conceded adjusts that estimate. A Poisson score model then calculates home win, draw, and away win probabilities.",
    recentShotStats: (own, allowed, conversion) => `${own} shots · ${allowed} allowed · ${conversion}% conversion`,
    noRecentMatches: "No saved matches yet.",
    probabilityWindowStart: "60 SEC AGO",
    probabilityWindowEnd: "NOW",
    liveModel: "LIVE MODEL · 1 SECOND",
    currentProbabilities: "CURRENT MATCH PROBABILITIES",
    currentFavoriteLabel: "FAVORITE",
    probabilityUnavailable: "Enter shots and match results for both teams to calculate probabilities.",
    drawFavorite: "Draw is the likeliest result",
    favoriteProbability: (value) => `Most likely result · ${value}%`,
    teamMatchup: (home, away) => `${home} vs ${away}`,
    goalsShort: "expected goals",
    expectedGoals: (homeName, homeGoals, awayName, awayGoals) => `Expected goals · ${homeName} ${homeGoals} – ${awayGoals} ${awayName}`,
    whyFavoriteTitle: "Why the model favors this outcome",
    whyTeamFavorite: (team, probability, goals, opponentGoals) => `${team} is the predicted winner (${probability}%). The model projects ${goals} expected goals against ${opponentGoals} for the opponent.`,
    whyTeamRecentStats: (team, shots, conversion, opponent, conceded) => `In the last five matches: ${team} averaged ${shots} shots with ${conversion}% conversion; ${opponent} conceded ${conceded} shots per match.`,
    whyDrawFavorite: (home, away, homeGoals, awayGoals) => `No clear winner: projected goals are close (${home} ${homeGoals}, ${away} ${awayGoals}), so a draw has the highest probability.`,
    drawDetails: "The model compares each team's average shots, conversion, and the opponent's shots conceded.",
    noForecastExplanation: "More recorded match statistics are needed to explain the forecast.",
    noStatHistory: "The chart appears once matches are available in the selected history.",
    noStats: "No recorded data",
    championship: "Championship estimate",
    seasonOutlook: "SEASON OUTLOOK",
    matchPredictions: "MATCH PREDICTIONS",
    matchForecast: "Next match forecast",
    forecastSubtitle: "Probabilities use shot creation, shot conversion and shots conceded. Home/away alternates because no fixture schedule is saved · estimates, not bookmaker odds.",
    home: "Home",
    draw: "Draw",
    away: "Away",
    rounds: "Next 5 match projections",
    favoritePick: "PICK",
    drawPick: "DRAW PICK",
    dimensionEdge: (name, value, opponentValue) => `${name}: ${value} / 100 vs ${opponentValue} / 100.`,
    even: "Even matchup",
    noForecast: "Not enough data for a reliable estimate.",
    strongest: "Strongest dimensions",
    strongestWith: (names) => `Leads in ${names}.`,
    favoriteMargin: (n) => `Overall rating advantage: ${n} points.`,
    closeRace: "No clear favorite: the top ratings are very close.",
    onlyOne: "Only one team has recorded match statistics in this period, so it cannot be compared yet.",
    method: "<b>Rating tiers:</b> S+ ≥95, S ≥90, A+ ≥85, A ≥80, B+ ≥75, B ≥70, C+ ≥65, C below 65. Match-performance ratings use mobile-scale statistics; defense scores higher for fewer opponent shots and goals conceded, so a stronger defense extends farther on the radar. Squad strength is calculated separately from the average OVR of rated starters by attack, midfield, and defense; substitutes and placeholder players are excluded. The probability model's base forecast uses recency-weighted data from the last five matches and recalculates when saved results or statistics change. Between database updates, the chart applies a clearly labeled simulated momentum that shifts the display once per second; this is a visual model simulation, not new live-match information. Estimates are not guaranteed outcomes.",
    loadError: "Could not load live league data. ",
    waiting: "Connecting to the league database…",
    noConfig: "Supabase configuration is unavailable.",
    updated: "Live rating updated",
    stoppedLive: "Realtime is unavailable; refreshing automatically."
  },
  ru: {
    back: "← Лига",
    title: "Аналитика команд",
    eyebrow: "АНАЛИТИКА ЛИГИ · ОНЛАЙН",
    hero: "Сила команд и прогноз в реальном времени",
    subtitle: "Оценки пересчитываются по внесённой статистике матчей при каждом обновлении лиги.",
    live: "LIVE · ПОДКЛЮЧЕНИЕ",
    liveConnected: "LIVE · ПОДКЛЮЧЕНО",
    livePolling: "LIVE · ОБНОВЛЕНИЕ 15 С",
    season: "Сезон",
    allSeasons: "Все сезоны",
    current: "текущий",
    favoriteEyebrow: "ПРЕДВАРИТЕЛЬНАЯ ОЦЕНКА",
    favoriteTitle: "Фаворит сейчас",
    teamsEyebrow: "ОТЧЁТ ПО ИГРЕ",
    teamsTitle: "Рейтинг и сильные стороны",
    strengthsEyebrow: "РЕЙТИНГ СОСТАВОВ",
    strengthsTitle: "Сила команд",
    strengthsDescription: "Средний рейтинг игроков по линиям в текущем стартовом составе · запасные не учитываются.",
    strengthLead: (score, count, opponent, opponentScore, opponentCount) => `${score.toFixed(1)} ср. OVR · игроков: ${count} · ${opponent}: ${opponentScore.toFixed(1)} (${opponentCount})`,
    noStrengthData: "Нет рейтингов игроков в текущих стартовых составах.",
    noPositionData: "Нет оценённых игроков на этой линии",
    strengthLine: "НАПАДЕНИЕ",
    strengthMidfield: "ПОЛУЗАЩИТА",
    strengthDefense: "ЗАЩИТА",
    comparisonOf: "против",
    mobileScaleTitle: "Шкала оценки для мобильной игры",
    mobileScale: "В ромбе показаны реальные средние за матч. Используется строгая мобильная шкала: ориентир для ударов — 8 за матч, для голов — 3; защита оценивается выше при меньшем числе ударов соперника (ориентир 8) и пропущенных голов (ориентир 3). Пасы оцениваются относительно 150 за матч, владение — по реальному среднему команды, реализация = голы ÷ удары с ориентиром 40%. Все оси имеют равный вес, отсутствующие данные исключаются. Форма за последние пять матчей: A — от 70% возможных очков, B — 40–69%, C — ниже 40%.",
    summaryMatches: "МАТЧЕЙ УЧТЕНО",
    summaryTeams: "КОМАНД В АНАЛИЗЕ",
    summaryLeader: "ЛУЧШИЙ РЕЙТИНГ",
    summaryMedian: "МЕДИАНА РЕЙТИНГА",
    perSelectedSeason: "за выбранный период",
    noMatches: "За этот период матчей нет",
    noRatings: "Рейтинг появится после внесения статистики матча",
    noFavorite: "Пока недостаточно матчей, чтобы определить фаворита.",
    tier: "ТИР",
    sample: (n) => `Матчей за период: ${n}`,
    lowSample: "Предварительная оценка · меньше 3 матчей",
    median: "Медианный рейтинг",
    played: "сыграно",
    form: "ФОРМА",
    formRecord: (results) => `ПОСЛЕДНИЕ ${results.length}: ${results.join(" ") || "—"}`,
    formResults: { win: "В", draw: "Н", loss: "П" },
    wins: "В",
    draws: "Н",
    losses: "П",
    goals: "ЗАБ",
    conceded: "ПРОП",
    attack: "АТАКА",
    defense: "ЗАЩИТА",
    shotsAgainst: "ПРОПУЩЕННЫЕ УДАРЫ",
    goalsAgainst: "ПРОПУЩЕННЫЕ ГОЛЫ",
    passes: "ПАСЫ",
    possession: "ВЛАДЕНИЕ",
    conversion: "РЕАЛИЗАЦИЯ",
    radarLabels: ["АТАКА", "ЗАЩИТА", "ПАСЫ", "ВЛАДЕНИЕ", "РЕАЛИЗАЦИЯ"],
    statsCoverage: (shots, against, passes, possession, conversion, played) => `Статы внесены в ${played} матчах · удары ${shots} · пропущенные удары ${against} · пасы ${passes} · владение ${possession} · реализация ${conversion}`,
    attackValue: (shots, goals) => `${shots} ударов · ${goals} гола / матч`,
    defenseValue: (shots, onTarget, goals) => `${shots} ударов · ${goals} голов пропущено / матч${onTarget === null ? "" : ` · ${onTarget} в створ`}`,
    passesValue: (value) => `${value} / матч`,
    possessionValue: (value) => `${value}%`,
    conversionValue: (value) => `${value}% от ударов`,
    liveTicker: "ЖИВЫЕ РЕЗУЛЬТАТЫ",
    tickerStatus: "БАЗА ОБНОВЛЯЕТСЯ · СЧЁТЫ ОБНОВЛЯЮТСЯ АВТОМАТИЧЕСКИ",
    noLiveMatches: "Ожидаем первый сохранённый матч",
    cardiogramTitle: "Динамика очков в таблице",
    cardiogramDescription: "Все сохранённые результаты с самого начала · обе команды начинают с 0 очков · победа 3, ничья 1",
    matchTrendTitle: "Динамика вероятностей матча",
    matchTrendDescription: (home, away) => "Проценты и линии плавно движутся между обновлениями модели. Симуляция не является новыми live-данными матча.",
    recentProbabilityTitle: "Последние 5 матчей в основе прогноза",
    modelMethodTitle: "Как модель считает вероятности",
    modelMethod: "Последние пять матчей получают веса от 1 (самый старый) до 5 (самый новый). Взвешенные удары × реализация дают ожидаемые голы; количество ударов, допускаемых соперником, корректирует оценку. Затем модель Пуассона рассчитывает вероятности победы хозяев, ничьей и победы гостей.",
    recentShotStats: (own, allowed, conversion) => `${own} ударов · допущено ${allowed} · реализация ${conversion}%`,
    noRecentMatches: "Сохранённых матчей пока нет.",
    probabilityWindowStart: "60 СЕК НАЗАД",
    probabilityWindowEnd: "СЕЙЧАС",
    liveModel: "МОДЕЛЬ LIVE · 1 СЕК",
    currentProbabilities: "ТЕКУЩИЕ ВЕРОЯТНОСТИ МАТЧА",
    currentFavoriteLabel: "ФАВОРИТ",
    probabilityUnavailable: "Для прогноза внесите удары и результаты обеих команд.",
    drawFavorite: "Наиболее вероятна ничья",
    favoriteProbability: (value) => `Самый вероятный исход · ${value}%`,
    teamMatchup: (home, away) => `${home} против ${away}`,
    goalsShort: "ожидаемых голов",
    expectedGoals: (homeName, homeGoals, awayName, awayGoals) => `Ожидаемые голы · ${homeName} ${homeGoals} – ${awayGoals} ${awayName}`,
    whyFavoriteTitle: "Почему модель выбрала этот исход",
    whyTeamFavorite: (team, probability, goals, opponentGoals) => `${team} — прогнозируемый победитель (${probability}%). Модель ожидает ${goals} гола против ${opponentGoals} у соперника.`,
    whyTeamRecentStats: (team, shots, conversion, opponent, conceded) => `За последние пять матчей: ${team} наносит в среднем ${shots} ударов с реализацией ${conversion}%; ${opponent} пропускает ${conceded} ударов за матч.`,
    whyDrawFavorite: (home, away, homeGoals, awayGoals) => `Явного победителя нет: ожидаемые голы близки (${home} — ${homeGoals}, ${away} — ${awayGoals}), поэтому ничья — самый вероятный исход.`,
    drawDetails: "Модель сравнивает средние удары команд, реализацию и удары, которые допускает соперник.",
    noForecastExplanation: "Для объяснения прогноза нужна дополнительная статистика матчей.",
    noStatHistory: "График появится, когда в выбранной истории будут матчи.",
    noStats: "Нет внесённых данных",
    championship: "Оценка чемпионства",
    seasonOutlook: "ПРОГНОЗ СЕЗОНА",
    matchPredictions: "ПРОГНОЗЫ МАТЧЕЙ",
    matchForecast: "Прогноз следующего матча",
    forecastSubtitle: "Вероятности основаны на создании ударов, реализации и пропущенных ударах. Дом/выезд чередуются, так как расписание не сохранено · это оценка, не коэффициенты букмекера.",
    home: "Дома",
    draw: "Ничья",
    away: "В гостях",
    rounds: "Прогноз следующих 5 матчей",
    favoritePick: "ФАВОРИТ",
    drawPick: "ПРОГНОЗ: НИЧЬЯ",
    dimensionEdge: (name, value, opponentValue) => `${name}: ${value} / 100 против ${opponentValue} / 100.`,
    even: "Равный матч",
    noForecast: "Пока недостаточно данных для надёжной оценки.",
    strongest: "Сильные стороны",
    strongestWith: (names) => `Лучше показатели: ${names}.`,
    favoriteMargin: (n) => `Преимущество по общему рейтингу: ${n} п.`,
    closeRace: "Явного фаворита нет: рейтинги команд почти равны.",
    onlyOne: "В этом периоде статистика записана только для одной команды — сравнить их пока нельзя.",
    method: "<b>Градация рейтинга:</b> S+ ≥95, S ≥90, A+ ≥85, A ≥80, B+ ≥75, B ≥70, C+ ≥65, C ниже 65. Рейтинг игры рассчитывается по мобильной статистике; защита выше при меньшем числе ударов соперника и пропущенных голов, поэтому сильная защита уходит дальше от центра ромба. Сила состава отдельно рассчитывается как средний OVR оценённых игроков стартового состава по линиям: нападение, полузащита и защита; запасные и шаблонные игроки исключены. Базовый прогноз вероятностей рассчитывается по взвешенным данным последних пяти матчей и меняется при обновлении результатов или статистики. Между обновлениями базы график раз в секунду применяет явно обозначенную симулированную динамику модели; это визуальная симуляция, а не новые live-данные матча. Оценка не гарантирует результат.",
    loadError: "Не удалось загрузить данные лиги. ",
    waiting: "Подключаемся к базе лиги…",
    noConfig: "Настройки Supabase недоступны.",
    updated: "Онлайн-рейтинг обновлён",
    stoppedLive: "Realtime недоступен; данные будут обновляться автоматически."
  }
};

const state = { teams: [], matches: [], lineups: {}, season: 1, selectedSeason: "current" };
let lang = localStorage.getItem("leagueLang") === "ru" ? "ru" : "en";
let client = null;
let channel = null;
let pollTimer = null;
let probabilityAnimationFrame = null;
let requestVersion = 0;
let liveAvailable = false;
let currentAnalysis = null;
let liveProbabilityBase = null;
let liveProbabilityBaseKey = "";
let shownFavoriteIndex = -1;
let liveProbabilityHistory = [];
let liveProbabilityStartedAt = 0;
let lastProbabilityRenderAt = 0;
const LIVE_PROBABILITY_WINDOW = 60;

const $ = (id) => document.getElementById(id);
const t = () => UI[lang];
const clamp = (n, low = 0, high = 100) => Math.min(high, Math.max(low, n));
const numeric = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;

function getLiveProbabilities(base, elapsedSeconds) {
  const seconds = elapsedSeconds;
  const raw = [
    base[0] * 100 + 5 * Math.sin(seconds * 0.23) + 3 * Math.sin(seconds * 0.71 + 1.1) + 1.5 * Math.sin(seconds * 1.37 + 0.8),
    base[1] * 100 + 2 * Math.sin(seconds * 0.31 + 2.8) + 1.4 * Math.sin(seconds * 0.83 + 0.3),
    base[2] * 100 + 5 * Math.sin(seconds * 0.19 + 2.2) + 3 * Math.sin(seconds * 0.57 + 0.4) + 1.5 * Math.sin(seconds * 1.21 + 1.7)
  ].map((value) => clamp(value, 1, 98));
  const total = raw.reduce((sum, value) => sum + value, 0);
  return raw.map((value) => value / total);
}

function percentageHundredths(probabilities) {
  const exact = probabilities.map((value) => value * 10000);
  const rounded = exact.map(Math.floor);
  let remainder = 10000 - rounded.reduce((sum, value) => sum + value, 0);
  const fractions = exact.map((value, index) => ({ index, fraction: value - rounded[index] }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index += 1) rounded[fractions[index].index] += 1;
  return rounded;
}

function formatProbability(value) {
  return `${value.toFixed(2)}%`;
}

function teamLogoPath(index) {
  return index === 0 ? "../assets/img/logo-promashkov.webp"
    : index === 1 ? "../assets/img/logo-lionslav.webp" : "";
}

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = text;
  return element;
}

function tierFor(rating) {
  if (rating >= 95) return "S+";
  if (rating >= 90) return "S";
  if (rating >= 85) return "A+";
  if (rating >= 80) return "A";
  if (rating >= 75) return "B+";
  if (rating >= 70) return "B";
  if (rating >= 65) return "C+";
  return "C";
}

function selectedMatches() {
  if (state.selectedSeason === "all") return state.matches;
  const season = Number(state.selectedSeason === "current" ? state.season : state.selectedSeason);
  return state.matches.filter((match) => Number(match.season || 1) === season);
}

function chronologicalMatches(matches) {
  return matches
    .map((match, index) => ({ match, index }))
    .sort((a, b) => new Date(a.match.played_at) - new Date(b.match.played_at) || a.index - b.index)
    .map(({ match }) => match);
}

function getTeamForm(teamIndex, matches) {
  const results = chronologicalMatches(matches)
    .filter((match) => match.home_team === teamIndex || match.away_team === teamIndex)
    .map((match) => {
      const home = match.home_team === teamIndex;
      const goalsFor = numeric(home ? match.home_goals : match.away_goals);
      const goalsAgainst = numeric(home ? match.away_goals : match.home_goals);
      return goalsFor > goalsAgainst ? "win" : goalsFor === goalsAgainst ? "draw" : "loss";
    })
    .slice(-5);
  const points = results.reduce((sum, result) => sum + (result === "win" ? 3 : result === "draw" ? 1 : 0), 0);
  const rate = results.length ? points / (results.length * 3) : null;
  return {
    grade: rate === null ? "—" : rate >= 0.7 ? "A" : rate >= 0.4 ? "B" : "C",
    points,
    results
  };
}

function getTeamMetrics(teamIndex, matches) {
  const teamMatches = chronologicalMatches(matches.filter((match) =>
    match.home_team === teamIndex || match.away_team === teamIndex
  ));
  const stat = {
    played: teamMatches.length, wins: 0, draws: 0, losses: 0, goals: 0, goalsAgainst: 0,
    shotsForTotal: 0, shotsForMatches: 0,
    shotsAgainstTotal: 0, shotsAgainstMatches: 0,
    shotsOnTargetAgainstTotal: 0, shotsOnTargetAgainstMatches: 0,
    goalsAgainstMatches: 0,
    goalsOnShotMatches: 0, goalsWithShots: 0,
    passesTotal: 0, passesMatches: 0,
    possessionTotal: 0, possessionMatches: 0
  };
  teamMatches.forEach((match) => {
    const home = match.home_team === teamIndex;
    const gf = numeric(home ? match.home_goals : match.away_goals);
    const ga = numeric(home ? match.away_goals : match.home_goals);
    const ownStats = match.stats?.[home ? "home" : "away"] || {};
    const opponentStats = match.stats?.[home ? "away" : "home"] || {};
    stat.goals += gf;
    stat.goalsAgainst += ga;
    stat.goalsAgainstMatches++;
    if (gf > ga) stat.wins++;
    else if (gf === ga) stat.draws++;
    else stat.losses++;
    if (Number.isFinite(ownStats.shots)) {
      stat.shotsForTotal += ownStats.shots;
      stat.shotsForMatches++;
      stat.goalsWithShots += gf;
      stat.goalsOnShotMatches++;
    }
    if (Number.isFinite(opponentStats.shots)) {
      stat.shotsAgainstTotal += opponentStats.shots;
      stat.shotsAgainstMatches++;
    }
    if (Number.isFinite(opponentStats.shotsOnTarget)) {
      stat.shotsOnTargetAgainstTotal += opponentStats.shotsOnTarget;
      stat.shotsOnTargetAgainstMatches++;
    }
    if (Number.isFinite(ownStats.passes)) {
      stat.passesTotal += ownStats.passes;
      stat.passesMatches++;
    }
    if (Number.isFinite(ownStats.possession)) {
      stat.possessionTotal += ownStats.possession;
      stat.possessionMatches++;
    }
  });
  const avgShotsFor = stat.shotsForMatches ? stat.shotsForTotal / stat.shotsForMatches : null;
  const avgShotsAgainst = stat.shotsAgainstMatches ? stat.shotsAgainstTotal / stat.shotsAgainstMatches : null;
  const avgShotsOnTargetAgainst = stat.shotsOnTargetAgainstMatches
    ? stat.shotsOnTargetAgainstTotal / stat.shotsOnTargetAgainstMatches
    : null;
  const avgGoalsFor = stat.played ? stat.goals / stat.played : null;
  const avgGoalsAgainst = stat.goalsAgainstMatches ? stat.goalsAgainst / stat.goalsAgainstMatches : null;
  const avgPasses = stat.passesMatches ? stat.passesTotal / stat.passesMatches : null;
  const avgPossession = stat.possessionMatches ? stat.possessionTotal / stat.possessionMatches : null;
  const conversionRate = stat.shotsForTotal > 0 ? stat.goalsWithShots / stat.shotsForTotal * 100 : null;
  const recentMatches = teamMatches.slice(-5);
  const recentValues = recentMatches.map((match, index) => {
    const home = match.home_team === teamIndex;
    const ownStats = match.stats?.[home ? "home" : "away"] || {};
    const opponentStats = match.stats?.[home ? "away" : "home"] || {};
    return {
      weight: index + 1,
      goalsFor: numeric(home ? match.home_goals : match.away_goals),
      shotsFor: Number.isFinite(ownStats.shots) ? ownStats.shots : null,
      goalsAgainst: numeric(home ? match.away_goals : match.home_goals),
      shotsAgainst: Number.isFinite(opponentStats.shots) ? opponentStats.shots : null
    };
  });
  const weightedAverage = (key) => {
    const available = recentValues.filter((item) => item[key] !== null);
    const totalWeight = available.reduce((sum, item) => sum + item.weight, 0);
    return totalWeight
      ? available.reduce((sum, item) => sum + item[key] * item.weight, 0) / totalWeight
      : null;
  };
  const weightedShotsFor = weightedAverage("shotsFor");
  const weightedGoalsFor = weightedAverage("goalsFor");
  const weightedShotsAgainst = weightedAverage("shotsAgainst");
  const weightedGoalsAgainst = weightedAverage("goalsAgainst");
  const weightedShotRecords = recentValues.filter((item) => item.shotsFor !== null);
  const weightedShotCount = weightedShotRecords.reduce((sum, item) => sum + item.shotsFor * item.weight, 0);
  const weightedConversionRate = weightedShotCount > 0
    ? weightedShotRecords.reduce((sum, item) => sum + item.goalsFor * item.weight, 0) / weightedShotCount * 100
    : null;
  const forecastMetrics = {
    avgShotsFor: weightedShotsFor,
    avgGoalsFor: weightedGoalsFor,
    avgShotsAgainst: weightedShotsAgainst,
    avgGoalsAgainst: weightedGoalsAgainst,
    conversionRate: weightedConversionRate
  };
  const attackScores = [
    avgShotsFor === null ? null : clamp(avgShotsFor / 8 * 100),
    avgGoalsFor === null ? null : clamp(avgGoalsFor / 3 * 100)
  ].filter((value) => value !== null);
  const attackScore = attackScores.length
    ? attackScores.reduce((sum, value) => sum + value, 0) / attackScores.length
    : null;
  const defenseScores = [
    avgShotsAgainst === null ? null : 100 - clamp(avgShotsAgainst / 8 * 100),
    avgGoalsAgainst === null ? null : 100 - clamp(avgGoalsAgainst / 3 * 100)
  ].filter((value) => value !== null);
  const defenseScore = defenseScores.length
    ? defenseScores.reduce((sum, value) => sum + value, 0) / defenseScores.length
    : null;
  const axes = [
    attackScore,
    defenseScore,
    avgPasses === null ? null : clamp(avgPasses / 150 * 100),
    avgPossession === null ? null : clamp(avgPossession),
    conversionRate === null ? null : clamp(conversionRate / 40 * 100)
  ];
  const weights = [0.2, 0.2, 0.2, 0.2, 0.2];
  const activeWeight = axes.reduce((sum, value, i) => sum + (value === null ? 0 : weights[i]), 0);
  const rating = activeWeight
    ? Math.round(axes.reduce((sum, value, i) => sum + (value === null ? 0 : value * weights[i]), 0) / activeWeight)
    : null;
  return {
    ...stat,
    avgShotsFor, avgShotsAgainst, avgShotsOnTargetAgainst, avgGoalsFor, avgGoalsAgainst,
    avgPasses, avgPossession, conversionRate, forecastMetrics,
    axes, rating, tier: rating === null ? "—" : tierFor(rating)
  };
}

function getLineupStrength(lineup) {
  const positions = {
    attack: new Set(["CF", "ST", "LW", "RW"]),
    midfield: new Set(["CDM", "CM", "CAM", "LM", "RM"]),
    defense: new Set(["GK", "CB", "LB", "RB"])
  };
  const ratings = { attack: [], midfield: [], defense: [] };
  if (!lineup || !Array.isArray(lineup.players)) return Object.fromEntries(
    Object.keys(ratings).map((group) => [group, { average: null, count: 0 }])
  );
  lineup.players.forEach((player) => {
    if (!player || player.sub || !Number.isFinite(player.rating) ||
      player.rating < 0 || player.rating > 112 || typeof player.name !== "string" ||
      !player.name.trim() || /^(?:player|игрок)\s+\d+$/i.test(player.name.trim())) return;
    const group = Object.keys(positions).find((key) => positions[key].has(player.pos));
    if (group) ratings[group].push(player.rating);
  });
  return Object.fromEntries(Object.entries(ratings).map(([group, values]) => [
    group,
    {
      average: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null,
      count: values.length
    }
  ]));
}

function analyze() {
  const matches = selectedMatches();
  const teams = state.teams.map((team, index) => ({
    ...team,
    index,
    metrics: { ...getTeamMetrics(index, matches), form: getTeamForm(index, state.matches) }
  }));
  const rated = teams.filter((team) => team.metrics.rating !== null)
    .sort((a, b) => b.metrics.rating - a.metrics.rating || a.index - b.index);
  const ratings = rated.map((team) => team.metrics.rating).sort((a, b) => a - b);
  const median = ratings.length
    ? ratings.length % 2 ? ratings[(ratings.length - 1) / 2] : (ratings[ratings.length / 2 - 1] + ratings[ratings.length / 2]) / 2
    : null;
  return { matches, teams, rated, median };
}

function showStatus(message, visible = true) {
  const status = $("status");
  status.textContent = message;
  status.classList.toggle("visible", visible);
}

function logoFor(index, name) {
  const wrapper = node("span", "team-logo");
  const logo = teamLogoPath(index);
  if (logo) {
    const img = document.createElement("img");
    img.src = logo;
    img.alt = "";
    img.onerror = () => { wrapper.textContent = name.trim().split(/\s+/).map((part) => part[0] || "").join("").slice(0, 3).toUpperCase(); };
    wrapper.append(img);
  } else {
    wrapper.textContent = name.trim().split(/\s+/).map((part) => part[0] || "").join("").slice(0, 3).toUpperCase();
  }
  return wrapper;
}

function addTeamCrest(svg, x, y, teamIndex, className = "chart-team-crest", size = 22) {
  const logo = teamLogoPath(teamIndex);
  if (!logo) return;
  const image = document.createElementNS(svg.namespaceURI, "image");
  image.setAttribute("class", className);
  image.setAttribute("href", logo);
  image.setAttribute("x", String(x - size / 2));
  image.setAttribute("y", String(y - size / 2));
  image.setAttribute("width", String(size));
  image.setAttribute("height", String(size));
  image.setAttribute("preserveAspectRatio", "xMidYMid meet");
  image.setAttribute("aria-label", state.teams[teamIndex]?.name || "");
  svg.append(image);
}

function renderSummary(analysis) {
  const { matches, teams, rated, median } = analysis;
  const best = rated[0];
  const items = [
    [t().summaryMatches, String(matches.length), t().perSelectedSeason],
    [t().summaryTeams, String(teams.length), t().perSelectedSeason],
    [t().summaryLeader, best ? `${best.metrics.rating} · ${best.metrics.tier}` : "—", best ? best.name : t().noRatings],
    [t().summaryMedian, median === null ? "—" : String(Math.round(median)), t().median]
  ];
  $("summary").replaceChildren(...items.map(([label, value, note]) => {
    const card = node("article", "summary-card");
    card.append(node("div", "summary-label", label), node("div", "summary-value", value), node("div", "summary-note", note));
    return card;
  }));
}

function renderFavorite(analysis, liveProbabilities = null) {
  const { teams, matches } = analysis;
  const content = $("favoriteContent");
  const sample = $("sampleBadge");
  const probabilitiesHost = $("currentMatchProbabilities");
  const explanationHost = $("forecastExplanation");
  sample.textContent = t().sample(matches.length);
  const [home, away] = teams;
  const forecast = home && away ? forecastMatch(home, away, teams) : null;
  if (!forecast) {
    content.replaceChildren(node("p", "favorite-empty", t().noFavorite));
    probabilitiesHost.replaceChildren(node("p", "chart-empty", t().probabilityUnavailable));
    explanationHost.replaceChildren();
    return;
  }
  const probabilities = liveProbabilities || forecast.probabilities;
  const displayedProbabilities = percentageHundredths(probabilities);
  const favoriteIndex = probabilities.indexOf(Math.max(...probabilities));
  const favoriteProbability = (displayedProbabilities[favoriteIndex] / 100).toFixed(2);
  shownFavoriteIndex = favoriteIndex;
  const layout = node("div", "favorite-layout");
  const favorite = node("div", `favorite-team${favoriteIndex === 1 ? " is-draw-favorite" : ""}`);
  if (favoriteIndex !== 1) favorite.append(logoFor(favoriteIndex === 0 ? home.index : away.index, favoriteIndex === 0 ? home.name : away.name));
  const description = node("div");
  const favoriteName = favoriteIndex === 1 ? t().drawFavorite : favoriteIndex === 0 ? home.name : away.name;
  description.append(
    node("div", "favorite-name", favoriteName),
    node("div", "favorite-tier", t().favoriteProbability(favoriteProbability))
  );
  favorite.append(description);
  const reasons = node("ul", "favorite-reasons");
  reasons.append(node("li", "", t().teamMatchup(home.name, away.name)));
  reasons.append(node("li", "", t().expectedGoals(
    home.name,
    forecast.homeGoals.toFixed(1),
    away.name,
    forecast.awayGoals.toFixed(1)
  )));
  layout.append(favorite, reasons);
  content.replaceChildren(layout);

  const labels = [home.name, t().draw, away.name];
  const cells = labels.map((label, index) => {
    const cell = node("div", `probability-cell${index === favoriteIndex ? " is-match-favorite" : ""}${index === 1 ? " forecast-draw" : ""}`);
    cell.append(node("span", "probability-label", label));
    const value = node("strong", "probability-value", formatProbability(displayedProbabilities[index] / 100));
    value.dataset.probabilityValue = String(index);
    cell.dataset.probabilityCell = String(index);
    cell.append(value);
    if (index === favoriteIndex) cell.append(node("span", "probability-pick", index === 1 ? t().drawPick : t().currentFavoriteLabel));
    return cell;
  });
  probabilitiesHost.replaceChildren(...cells);

  const explanation = node("div", `forecast-explanation-card${favoriteIndex === 1 ? " is-draw" : ""}`);
  const explanationTitle = node("h4", "", t().whyFavoriteTitle);
  const explanationCopy = node("p", "forecast-explanation-lead");
  const explanationDetails = node("p", "forecast-explanation-detail");
  if (favoriteIndex === 1) {
    explanationCopy.textContent = t().whyDrawFavorite(
      home.name,
      away.name,
      forecast.homeGoals.toFixed(1),
      forecast.awayGoals.toFixed(1)
    );
    explanationDetails.textContent = t().drawDetails;
  } else {
    const winner = favoriteIndex === 0 ? home : away;
    const opponent = favoriteIndex === 0 ? away : home;
    const winnerGoals = favoriteIndex === 0 ? forecast.homeGoals : forecast.awayGoals;
    const opponentGoals = favoriteIndex === 0 ? forecast.awayGoals : forecast.homeGoals;
    explanationCopy.textContent = t().whyTeamFavorite(
      winner.name,
      favoriteProbability,
      winnerGoals.toFixed(1),
      opponentGoals.toFixed(1)
    );
    const winnerStats = winner.metrics.forecastMetrics || winner.metrics;
    const opponentStats = opponent.metrics.forecastMetrics || opponent.metrics;
    const shots = winnerStats.avgShotsFor;
    const conversion = winnerStats.conversionRate;
    const conceded = opponentStats.avgShotsAgainst;
    explanationDetails.textContent = shots === null || conversion === null || conceded === null
      ? t().noForecastExplanation
      : t().whyTeamRecentStats(winner.name, shots.toFixed(1), conversion.toFixed(1), opponent.name, conceded.toFixed(1));
  }
  explanation.append(explanationTitle, explanationCopy, explanationDetails);
  explanationHost.replaceChildren(explanation);
}

function renderStrengths(analysis) {
  const host = $("strengthsGrid");
  const [first, second] = analysis.teams;
  if (!first || !second) {
    host.replaceChildren(node("p", "strength-empty", t().noStrengthData));
    return;
  }
  const labels = [
    ["attack", t().strengthLine],
    ["midfield", t().strengthMidfield],
    ["defense", t().strengthDefense]
  ];
  const rows = [first, second].map((team, teamIndex) => {
    const opponent = analysis.teams[teamIndex === 0 ? 1 : 0];
    const card = node("article", "strength-report-card");
    const heading = node("div", "strength-report-heading");
    heading.append(logoFor(team.index, team.name), node("h3", "", team.name));
    const list = node("ul", "strength-report-list");
    const teamStrength = getLineupStrength(state.lineups?.[team.index]);
    const opponentStrength = getLineupStrength(state.lineups?.[opponent.index]);
    const hasStrength = labels.some(([key]) => teamStrength[key].average !== null);
    if (!hasStrength) {
      list.append(node("li", "strength-balanced", t().noStrengthData));
    } else {
      labels.forEach(([key, label]) => {
        const { average, count } = teamStrength[key];
        const opponentRating = opponentStrength[key];
        const item = node("li", "strength-report-item");
        const copy = node("div", "strength-report-copy");
        copy.append(node("strong", "", label));
        if (average === null) {
          copy.append(node("span", "", t().noPositionData));
        } else if (opponentRating.average === null) {
          copy.append(node("span", "", `${average.toFixed(1)} avg OVR · ${count} players`));
        } else {
          copy.append(node("span", "", t().strengthLead(
            average,
            count,
            opponent.name,
            opponentRating.average,
            opponentRating.count
          )));
        }
        const bar = node("div", "strength-difference-track");
        const fill = node("span", "strength-difference-fill");
        fill.style.width = average === null ? "0%" : `${clamp(average / 112 * 100)}%`;
        bar.append(fill);
        item.append(copy, node("b", "strength-difference", average === null ? "—" : average.toFixed(1)), bar);
        list.append(item);
      });
    }
    card.append(heading, list);
    return card;
  });
  host.replaceChildren(...rows);
}

function radarSvg(team) {
  const labels = t().radarLabels;
  const scores = team.metrics.axes;
  const rawValues = [
    t().attackValue(
      team.metrics.avgShotsFor === null ? t().noStats : team.metrics.avgShotsFor.toFixed(1),
      team.metrics.avgGoalsFor === null ? t().noStats : team.metrics.avgGoalsFor.toFixed(1)
    ),
    t().defenseValue(
      team.metrics.avgShotsAgainst === null ? t().noStats : team.metrics.avgShotsAgainst.toFixed(1),
      team.metrics.avgShotsOnTargetAgainst === null ? null : team.metrics.avgShotsOnTargetAgainst.toFixed(1),
      team.metrics.avgGoalsAgainst === null ? t().noStats : team.metrics.avgGoalsAgainst.toFixed(1)
    ),
    team.metrics.avgPasses === null ? t().noStats : t().passesValue(team.metrics.avgPasses.toFixed(1)),
    team.metrics.avgPossession === null ? t().noStats : t().possessionValue(team.metrics.avgPossession.toFixed(1)),
    team.metrics.conversionRate === null ? t().noStats : t().conversionValue(team.metrics.conversionRate.toFixed(1))
  ];
  const cx = 120, cy = 105, radius = 70;
  const point = (index, scale) => {
    const angle = -Math.PI / 2 + index * 2 * Math.PI / scores.length;
    return [cx + Math.cos(angle) * radius * scale, cy + Math.sin(angle) * radius * scale];
  };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "radar");
  svg.setAttribute("viewBox", "0 0 240 220");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${team.name}. ${labels.map((label, i) =>
    `${label} rating ${scores[i] === null ? t().noStats : Math.round(scores[i])} / 100; ${rawValues[i]}`
  ).join(". ")}`);
  [0.25, 0.5, 0.75, 1].forEach((scale) => {
    const polygon = document.createElementNS(svg.namespaceURI, "polygon");
    polygon.setAttribute("class", "radar-grid");
    polygon.setAttribute("points", scores.map((_, i) => point(i, scale).join(",")).join(" "));
    svg.append(polygon);
  });
  scores.forEach((_, i) => {
    const [x, y] = point(i, 1);
    const line = document.createElementNS(svg.namespaceURI, "line");
    line.setAttribute("class", "radar-axis");
    line.setAttribute("x1", String(cx)); line.setAttribute("y1", String(cy));
    line.setAttribute("x2", String(x)); line.setAttribute("y2", String(y));
    svg.append(line);
  });
  const polygon = document.createElementNS(svg.namespaceURI, "polygon");
  polygon.setAttribute("class", "radar-poly");
  polygon.setAttribute("points", scores.map((score, i) => point(i, (score ?? 0) / 100).join(",")).join(" "));
  svg.append(polygon);
  scores.forEach((score, i) => {
    const [x, y] = point(i, (score ?? 0) / 100);
    const dot = document.createElementNS(svg.namespaceURI, "circle");
    dot.setAttribute("class", "radar-dot"); dot.setAttribute("cx", String(x)); dot.setAttribute("cy", String(y)); dot.setAttribute("r", score === null ? "2" : "3");
    if (score === null) dot.setAttribute("opacity", "0.35");
    svg.append(dot);
    const [lx, ly] = point(i, 1.22);
    const label = document.createElementNS(svg.namespaceURI, "text");
    label.setAttribute("class", "radar-label"); label.setAttribute("x", String(lx)); label.setAttribute("y", String(ly));
    label.setAttribute("text-anchor", lx < cx - 8 ? "end" : lx > cx + 8 ? "start" : "middle");
    label.textContent = `${labels[i]}${score === null ? " —" : ""}`;
    svg.append(label);
  });
  return svg;
}

function renderTeamCard(team, ratedTeams) {
  const tt = t();
  const m = team.metrics;
  const card = node("article", "team-card");
  const head = node("div", "team-card-head");
  const identity = node("div", "team-title");
  identity.append(logoFor(team.index, team.name));
  const text = node("div");
  text.append(node("div", "team-name", team.name));
  text.append(node("div", "team-record", `${m.played} ${tt.played} · ${m.wins}${tt.wins} ${m.draws}${tt.draws} ${m.losses}${tt.losses}`));
  identity.append(text);
  const rating = node("div", "rating-bubble");
  rating.append(node("span", "rating-number", m.rating === null ? "—" : String(m.rating)));
  rating.append(node("span", "rating-tier", m.tier));
  head.append(identity, rating);
  card.append(head);
  const form = node("div", `team-form form-${m.form.grade.toLowerCase()}`);
  const translatedResults = m.form.results.map((result) => tt.formResults[result]);
  form.append(
    node("span", "form-label", tt.form),
    node("b", "form-grade", m.form.grade),
    node("span", "form-details", tt.formRecord(translatedResults))
  );
  card.append(form);
  if (m.rating !== null) {
    const body = node("div", "team-body");
    const radar = node("div", "radar-wrap");
    radar.append(radarSvg(team));
    const metrics = node("div", "metric-list");
    const labels = [tt.attack, tt.defense, tt.passes, tt.possession, tt.conversion];
    const values = [
      m.avgShotsFor === null ? "—" : tt.attackValue(m.avgShotsFor.toFixed(1), m.avgGoalsFor === null ? "—" : m.avgGoalsFor.toFixed(1)),
      m.avgShotsAgainst === null && m.avgGoalsAgainst === null ? "—" : tt.defenseValue(
        m.avgShotsAgainst === null ? "—" : m.avgShotsAgainst.toFixed(1),
        m.avgShotsOnTargetAgainst === null ? null : m.avgShotsOnTargetAgainst.toFixed(1),
        m.avgGoalsAgainst === null ? "—" : m.avgGoalsAgainst.toFixed(1)
      ),
      m.avgPasses === null ? "—" : tt.passesValue(m.avgPasses.toFixed(1)),
      m.avgPossession === null ? "—" : tt.possessionValue(m.avgPossession.toFixed(1)),
      m.conversionRate === null ? "—" : tt.conversionValue(m.conversionRate.toFixed(1))
    ];
    m.axes.forEach((score, i) => {
      const row = node("div", "metric-row");
      row.append(node("span", "metric-label", labels[i]), node("b", "metric-value", values[i]));
      const track = node("div", "metric-track");
      const fill = node("div", "metric-fill");
      fill.style.width = `${score ?? 0}%`;
      track.append(fill); row.append(track); metrics.append(row);
    });
    body.append(radar, metrics);
    card.append(body);
    const coverage = node("p", "stats-coverage", tt.statsCoverage(
      m.shotsForMatches,
      m.shotsAgainstMatches,
      m.passesMatches,
      m.possessionMatches,
      m.goalsOnShotMatches,
      m.played
    ));
    card.append(coverage);
    const maxAxis = GROUPS.map((_, i) => ({
      i,
      count: ratedTeams.filter((candidate) => candidate.metrics.axes[i] !== null && m.axes[i] !== null && candidate.metrics.axes[i] < m.axes[i]).length
    })).filter((item) => item.count > 0);
    const strongest = node("div", "strengths");
    strongest.append(node("span", "strength-chip", tt.strongest));
    maxAxis.forEach(({ i }) => strongest.append(node("span", "strength-chip", [tt.attack, tt.defense, tt.passes, tt.possession, tt.conversion][i])));
    card.append(strongest);
  } else {
    card.append(node("p", "favorite-empty", tt.noMatches));
  }
  if (m.played > 0 && m.played < 3) card.append(node("p", "team-record", tt.lowSample));
  return card;
}

function poisson(lambda, goals) {
  let probability = Math.exp(-lambda);
  for (let i = 1; i <= goals; i++) probability *= lambda / i;
  return probability;
}

function forecastMatch(home, away, teams) {
  const homeStats = home.metrics.forecastMetrics || home.metrics;
  const awayStats = away.metrics.forecastMetrics || away.metrics;
  if (homeStats.avgShotsFor === null || homeStats.conversionRate === null ||
      awayStats.avgShotsFor === null || awayStats.conversionRate === null) return null;
  const leagueConcededShots = teams
    .map((team) => (team.metrics.forecastMetrics || team.metrics).avgShotsAgainst)
    .filter((value) => value !== null);
  const averageConceded = leagueConcededShots.length
    ? leagueConcededShots.reduce((sum, value) => sum + value, 0) / leagueConcededShots.length
    : 20;
  const estimateGoals = (attacker, defender) => {
    const attackerStats = attacker.metrics.forecastMetrics || attacker.metrics;
    const defenderStats = defender.metrics.forecastMetrics || defender.metrics;
    const defensiveMultiplier = defenderStats.avgShotsAgainst === null || averageConceded <= 0
      ? 1
      : clamp(defenderStats.avgShotsAgainst / averageConceded, 0.5, 1.5);
    return clamp(
      attackerStats.avgShotsFor * attackerStats.conversionRate / 100 * defensiveMultiplier,
      0.1,
      8
    );
  };
  const homeGoals = estimateGoals(home, away);
  const awayGoals = estimateGoals(away, home);
  let homeWin = 0, draw = 0, awayWin = 0;
  for (let homeScore = 0; homeScore <= 10; homeScore++) {
    for (let awayScore = 0; awayScore <= 10; awayScore++) {
      const probability = poisson(homeGoals, homeScore) * poisson(awayGoals, awayScore);
      if (homeScore > awayScore) homeWin += probability;
      else if (homeScore === awayScore) draw += probability;
      else awayWin += probability;
    }
  }
  const total = homeWin + draw + awayWin;
  return {
    homeGoals, awayGoals,
    probabilities: [homeWin / total, draw / total, awayWin / total]
  };
}

function standingsPointsHistory(matches) {
  const points = state.teams.map(() => 0);
  const history = state.teams.map(() => [0]);
  chronologicalMatches(matches).forEach((match) => {
    if (match.home_goals > match.away_goals) points[match.home_team] += 3;
    else if (match.home_goals < match.away_goals) points[match.away_team] += 3;
    else {
      points[match.home_team] += 1;
      points[match.away_team] += 1;
    }
    history.forEach((values, teamIndex) => values.push(points[teamIndex]));
  });
  return history;
}

function drawTrendChart(host, series, emptyText, labelSuffix = "%", maxValue = 100, firstXLabel = 1) {
  const width = 720, height = 220;
  const padding = { top: 20, right: 24, bottom: 32, left: 36 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "trend-chart");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  const validSeries = series.filter((item) => item.values.some((value) => value !== null));
  if (!validSeries.length) {
    host.replaceChildren(node("p", "chart-empty", emptyText));
    return;
  }
  svg.setAttribute("aria-label", validSeries.map((item) => {
    let latest = null;
    item.values.forEach((value) => { if (value !== null) latest = value; });
    return `${item.name}: ${latest === null ? "—" : latest.toFixed(1)}${labelSuffix}`;
  }).join("; "));
  [0, 25, 50, 75, 100].forEach((percentage) => {
    const value = maxValue * percentage / 100;
    const y = padding.top + innerHeight * (1 - percentage / 100);
    const line = document.createElementNS(svg.namespaceURI, "line");
    line.setAttribute("class", "chart-grid-line");
    line.setAttribute("x1", String(padding.left));
    line.setAttribute("x2", String(width - padding.right));
    line.setAttribute("y1", String(y));
    line.setAttribute("y2", String(y));
    svg.append(line);
    const text = document.createElementNS(svg.namespaceURI, "text");
    text.setAttribute("class", "chart-axis-label");
    text.setAttribute("x", "4");
    text.setAttribute("y", String(y + 3));
    text.textContent = `${Number.isInteger(value) ? value : value.toFixed(1)}${labelSuffix}`;
    svg.append(text);
  });
  const maxLength = Math.max(...validSeries.map((item) => item.values.length));
  const x = (index) => padding.left + (maxLength <= 1 ? innerWidth : innerWidth * index / (maxLength - 1));
  validSeries.forEach((item, seriesIndex) => {
    const color = `var(--chart-${seriesIndex % 4})`;
    const defined = item.values.map((value, index) => value === null ? null : `${x(index)},${padding.top + innerHeight * (1 - Math.min(maxValue, Math.max(0, value)) / maxValue)}`).filter(Boolean);
    if (!defined.length) return;
    const polyline = document.createElementNS(svg.namespaceURI, "polyline");
    polyline.setAttribute("class", `chart-line${item.isFavorite ? " chart-line-favorite" : ""}`);
    polyline.setAttribute("stroke", color);
    polyline.setAttribute("points", defined.join(" "));
    svg.append(polyline);
    let finalIndex = -1;
    item.values.forEach((value, index) => { if (value !== null) finalIndex = index; });
    if (finalIndex < 0) return;
    const finalValue = item.values[finalIndex];
    addTeamCrest(
      svg,
      x(finalIndex),
      padding.top + innerHeight * (1 - Math.min(maxValue, Math.max(0, finalValue)) / maxValue),
      item.teamIndex,
      "chart-team-crest points-team-crest",
      24
    );
  });
  const firstLabel = document.createElementNS(svg.namespaceURI, "text");
  firstLabel.setAttribute("class", "chart-axis-label");
  firstLabel.setAttribute("x", String(padding.left));
  firstLabel.setAttribute("y", String(height - 7));
  firstLabel.textContent = String(firstXLabel);
  svg.append(firstLabel);
  const lastLabel = document.createElementNS(svg.namespaceURI, "text");
  lastLabel.setAttribute("class", "chart-axis-label");
  lastLabel.setAttribute("x", String(width - padding.right));
  lastLabel.setAttribute("y", String(height - 7));
  lastLabel.setAttribute("text-anchor", "end");
  lastLabel.textContent = String(firstXLabel + maxLength - 1);
  svg.append(lastLabel);
  const legend = node("div", "chart-legend");
  validSeries.forEach((item, index) => {
    const entry = node("span", "chart-legend-item");
    const swatch = node("i", "chart-legend-swatch");
    swatch.style.setProperty("--series-color", `var(--chart-${index % 4})`);
    entry.append(swatch, node("span", "", item.name));
    if (Number.isFinite(item.currentValue)) {
      entry.append(node("b", `chart-current-value${item.isFavorite ? " is-favorite" : ""}`, `${Math.round(item.currentValue)}%${item.isFavorite ? ` · ${t().favoritePick}` : ""}`));
    }
    if (Number.isFinite(item.total)) entry.append(node("b", "chart-series-total", `${item.total}${labelSuffix}`));
    legend.append(entry);
  });
  host.replaceChildren(svg, legend);
}

function drawProbabilityChart(host, series, emptyText) {
  const width = 820, height = 300;
  const padding = { top: 24, right: 58, bottom: 36, left: 48 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "trend-chart probability-chart");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  const validSeries = series.filter((item) => item.points.some((point) => point.value !== null));
  if (!validSeries.length) {
    host.replaceChildren(node("p", "chart-empty", emptyText));
    return;
  }
  svg.setAttribute("aria-label", validSeries.map((item) =>
    `${item.name}: ${item.currentValue === null ? "—" : formatProbability(item.currentValue)}`
  ).join("; "));

  const windowEnd = performance.now();
  const windowStart = windowEnd - LIVE_PROBABILITY_WINDOW * 1000;
  const x = (time) => padding.left + plotWidth * clamp((time - windowStart) / (windowEnd - windowStart));
  const y = (value) => padding.top + plotHeight * (1 - clamp(value) / 100);
  for (let value = 0; value <= 100; value += 5) {
    const level = y(value);
    const line = document.createElementNS(svg.namespaceURI, "line");
    line.setAttribute("class", `probability-grid-line${value % 20 === 0 ? " is-major" : ""}`);
    line.setAttribute("x1", String(padding.left));
    line.setAttribute("x2", String(width - padding.right));
    line.setAttribute("y1", String(level));
    line.setAttribute("y2", String(level));
    svg.append(line);
    if (value % 10 !== 0) continue;
    const label = document.createElementNS(svg.namespaceURI, "text");
    label.setAttribute("class", "probability-axis-label");
    label.setAttribute("x", String(padding.left - 10));
    label.setAttribute("y", String(level + 4));
    label.setAttribute("text-anchor", "end");
    label.textContent = `${value}%`;
    svg.append(label);
  }

  validSeries.forEach((item, seriesIndex) => {
    const points = item.points
      .map((point) => point.value === null ? null : [x(point.time), y(point.value)])
      .filter(Boolean);
    if (!points.length) return;
    const colorIndex = seriesIndex % 3;
    const line = document.createElementNS(svg.namespaceURI, "path");
    line.setAttribute("class", `probability-line probability-line-${colorIndex}`);
    line.setAttribute("d", `M ${points.map(([pointX, pointY]) => `${pointX},${pointY}`).join(" L ")}`);
    svg.append(line);
    const latest = points[points.length - 1];
    if (item.teamIndex !== null) {
      addTeamCrest(svg, latest[0], latest[1], item.teamIndex, `chart-team-crest probability-team-crest probability-team-crest-${colorIndex}`, 24);
    }
  });

  const firstLabel = document.createElementNS(svg.namespaceURI, "text");
  firstLabel.setAttribute("class", "probability-axis-label");
  firstLabel.setAttribute("x", String(padding.left));
  firstLabel.setAttribute("y", String(height - 10));
  firstLabel.textContent = t().probabilityWindowStart;
  svg.append(firstLabel);
  const lastLabel = document.createElementNS(svg.namespaceURI, "text");
  lastLabel.setAttribute("class", "probability-axis-label");
  lastLabel.setAttribute("x", String(width - padding.right));
  lastLabel.setAttribute("y", String(height - 10));
  lastLabel.setAttribute("text-anchor", "end");
  lastLabel.textContent = t().probabilityWindowEnd;
  svg.append(lastLabel);

  const legend = node("div", "chart-legend probability-chart-legend");
  validSeries.forEach((item, index) => {
    const entry = node("span", "chart-legend-item");
    const swatch = node("i", `chart-legend-swatch probability-swatch-${index % 3}`);
    entry.append(swatch, node("span", "", item.name));
    entry.append(node("b", "chart-current-value", formatProbability(item.currentValue)));
    legend.append(entry);
  });
  host.replaceChildren(svg, legend);
}

function renderCardiograms(analysis) {
  currentAnalysis = analysis;
  const teams = state.teams;
  const pointsHistory = state.matches.length ? standingsPointsHistory(state.matches) : teams.map(() => []);
  const maxPoints = Math.max(0, ...pointsHistory.map((values) => values[values.length - 1] || 0));
  const pointChartMax = Math.max(4, Math.ceil(maxPoints / 4) * 4);
  const pointsSeries = teams.map((team, teamIndex) => ({
    name: team.name,
    values: pointsHistory[teamIndex],
    total: pointsHistory[teamIndex][pointsHistory[teamIndex].length - 1],
    teamIndex
  }));
  drawTrendChart($("standingsPointsChart"), pointsSeries, t().noStatHistory, " pts", pointChartMax, 0);

  const [home, away] = teams;
  const matchLabels = home && away ? [home.name, t().draw, away.name] : [];
  const currentForecast = home && away ? forecastMatch(analysis.teams[0], analysis.teams[1], analysis.teams) : null;
  const baseKey = currentForecast ? currentForecast.probabilities.map((value) => value.toFixed(6)).join(":") : "";
  if (baseKey !== liveProbabilityBaseKey) {
    liveProbabilityBaseKey = baseKey;
    liveProbabilityBase = currentForecast ? currentForecast.probabilities : null;
    liveProbabilityStartedAt = performance.now();
    liveProbabilityHistory = [];
    if (liveProbabilityBase) {
      for (let second = LIVE_PROBABILITY_WINDOW; second >= 0; second -= 1) {
        liveProbabilityHistory.push({
          time: liveProbabilityStartedAt - second * 1000,
          values: [...liveProbabilityBase]
        });
      }
    }
  }
  const liveProbabilities = liveProbabilityBase
    ? getLiveProbabilities(liveProbabilityBase, (performance.now() - liveProbabilityStartedAt) / 1000)
    : null;
  renderLiveProbabilityChart(matchLabels, liveProbabilities, performance.now());
  $("matchTrendDescription").textContent = home && away
    ? t().matchTrendDescription(home.name, away.name)
    : t().noStatHistory;
  renderRecentForecastMatches(analysis);
}

function renderLiveProbabilityChart(labels, probabilities, now = performance.now()) {
  if (!probabilities || !labels.length) {
    drawProbabilityChart($("matchTrendChart"), [], t().probabilityUnavailable);
    return;
  }
  const currentValues = percentageHundredths(probabilities);
  const series = labels.map((name, resultIndex) => ({
    name,
    points: [
      ...liveProbabilityHistory.map((point) => ({ time: point.time, value: point.values[resultIndex] * 100 })),
      { time: now, value: probabilities[resultIndex] * 100 }
    ],
    currentValue: currentValues[resultIndex] / 100,
    teamIndex: resultIndex === 0 ? 0 : resultIndex === 2 ? 1 : null
  }));
  drawProbabilityChart($("matchTrendChart"), series, t().probabilityUnavailable);
}

function updateFavoriteProbabilities(probabilities) {
  const values = percentageHundredths(probabilities);
  const favoriteIndex = probabilities.indexOf(Math.max(...probabilities));
  $("currentMatchProbabilities").querySelectorAll("[data-probability-value]").forEach((value) => {
    const index = Number(value.dataset.probabilityValue);
    value.textContent = formatProbability(values[index] / 100);
    value.closest(".probability-cell").classList.toggle("is-match-favorite", index === favoriteIndex);
  });
  if (favoriteIndex !== shownFavoriteIndex && currentAnalysis) {
    renderFavorite(currentAnalysis, probabilities);
    return;
  }
  const favoriteLabel = $("favoriteContent").querySelector(".favorite-tier");
  if (favoriteLabel) favoriteLabel.textContent = t().favoriteProbability((values[favoriteIndex] / 100).toFixed(2));
}

function animateLiveProbabilities(now) {
  if (liveProbabilityBase && currentAnalysis && now - lastProbabilityRenderAt >= 33) {
    const elapsed = (now - liveProbabilityStartedAt) / 1000;
    const probabilities = getLiveProbabilities(liveProbabilityBase, elapsed);
    const lastSample = liveProbabilityHistory[liveProbabilityHistory.length - 1];
    if (now - lastSample.time >= 1000) {
      liveProbabilityHistory.push({ time: now, values: probabilities });
    }
    const cutoff = now - LIVE_PROBABILITY_WINDOW * 1000;
    while (liveProbabilityHistory.length > 2 && liveProbabilityHistory[1].time < cutoff) {
      liveProbabilityHistory.shift();
    }
    updateFavoriteProbabilities(probabilities);
    renderLiveProbabilityChart(
      [currentAnalysis.teams[0]?.name, t().draw, currentAnalysis.teams[1]?.name].filter(Boolean),
      probabilities,
      now
    );
    lastProbabilityRenderAt = now;
  }
  probabilityAnimationFrame = window.requestAnimationFrame(animateLiveProbabilities);
}

function renderRecentForecastMatches(analysis) {
  const host = $("recentProbabilityMatches");
  const chronological = chronologicalMatches(analysis.matches);
  const cards = analysis.teams.map((team) => {
    const matches = chronological
      .filter((match) => match.home_team === team.index || match.away_team === team.index)
      .slice(-5)
      .reverse();
    const card = node("article", "recent-match-team");
    const heading = node("h4", "recent-match-heading");
    heading.append(logoFor(team.index, team.name), node("span", "", team.name));
    const list = node("ol", "recent-match-list");
    matches.forEach((match) => {
      const isHome = match.home_team === team.index;
      const opponentIndex = isHome ? match.away_team : match.home_team;
      const goalsFor = isHome ? match.home_goals : match.away_goals;
      const goalsAgainst = isHome ? match.away_goals : match.home_goals;
      const ownStats = match.stats?.[isHome ? "home" : "away"] || {};
      const againstStats = match.stats?.[isHome ? "away" : "home"] || {};
      const result = goalsFor > goalsAgainst ? "W" : goalsFor === goalsAgainst ? "D" : "L";
      const item = node("li", `recent-match-item result-${result.toLowerCase()}`);
      const matchup = node("div", "recent-match-result");
      matchup.append(
        node("b", "recent-match-outcome", t().formResults[result === "W" ? "win" : result === "D" ? "draw" : "loss"]),
        node("span", "recent-match-opponent", state.teams[opponentIndex]?.name || "—"),
        node("strong", "recent-match-score", `${goalsFor}–${goalsAgainst}`)
      );
      const ownShots = Number.isFinite(ownStats.shots) ? ownStats.shots : "—";
      const againstShots = Number.isFinite(againstStats.shots) ? againstStats.shots : "—";
      const conversion = Number.isFinite(ownStats.shots) && ownStats.shots > 0
        ? (goalsFor / ownStats.shots * 100).toFixed(1)
        : "—";
      item.append(matchup, node("span", "recent-match-stats", t().recentShotStats(ownShots, againstShots, conversion)));
      list.append(item);
    });
    if (!matches.length) list.append(node("li", "recent-match-empty", t().noRecentMatches));
    card.append(heading, list);
    return card;
  });
  host.replaceChildren(...cards);
}

function renderTicker(matches) {
  const track = $("liveTickerTrack");
  if (!matches.length) {
    const text = `${t().liveTicker} · ${t().tickerStatus} · ${t().noLiveMatches}`;
    track.replaceChildren(node("span", "", text), node("span", "", text));
    return;
  }
  const recent = [...matches].sort((a, b) => new Date(b.played_at) - new Date(a.played_at)).slice(0, 8);
  const entries = recent.map((match) =>
    `${state.teams[match.home_team]?.name ?? "—"} ${match.home_goals} : ${match.away_goals} ${state.teams[match.away_team]?.name ?? "—"}`
  );
  const line = `${t().liveTicker} · ${t().tickerStatus} · ${entries.join("     ◆     ")}`;
  track.replaceChildren(node("span", "", line), node("span", "", line));
}

function renderForecasts(analysis) {
  const championship = $("championshipList");
  const fixtures = $("fixtureForecastList");
  const teams = analysis.teams;
  if (!teams.length || !analysis.matches.length) {
    championship.replaceChildren(node("p", "favorite-empty", t().noForecast));
    fixtures.replaceChildren(node("p", "favorite-empty", t().noForecast));
    $("forecastNote").textContent = t().forecastSubtitle;
    return;
  }
  if (!teams.some((team) => team.metrics.rating !== null)) {
    championship.replaceChildren(node("p", "favorite-empty", t().noForecast));
    fixtures.replaceChildren(node("p", "favorite-empty", t().noForecast));
    $("forecastNote").textContent = t().forecastSubtitle;
    return;
  }
  const scores = teams.map((team) => team.metrics.rating ?? 50);
  const baseline = Math.max(...scores);
  const weights = scores.map((score) => Math.exp((score - baseline) / 12));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  championship.replaceChildren(...teams.map((team, index) => {
    const row = node("div", "championship-row");
    if (index === weights.indexOf(Math.max(...weights))) row.classList.add("is-championship-favorite");
    const header = node("div", "championship-row-head");
    header.append(node("strong", "", team.name));
    if (row.classList.contains("is-championship-favorite")) header.append(node("span", "favorite-badge", t().favoritePick));
    header.append(node("b", "", `${Math.round(weights[index] / total * 100)}%`));
    const track = node("div", "championship-track");
    const fill = node("span");
    fill.style.width = `${weights[index] / total * 100}%`;
    track.append(fill);
    row.append(header, track);
    return row;
  }));
  const [first, second] = teams;
  if (!first || !second) {
    fixtures.replaceChildren(node("p", "favorite-empty", t().noForecast));
    return;
  }
  const rounds = Array.from({ length: 5 }, (_, index) => {
    const home = index % 2 === 0 ? first : second;
    const away = index % 2 === 0 ? second : first;
    const forecast = forecastMatch(home, away, teams);
    const row = node("article", "fixture-forecast-row");
    const fixture = node("div", "fixture-forecast-teams");
    fixture.append(node("strong", "", home.name), node("span", "", "vs"), node("strong", "", away.name));
    const probabilities = node("div", "fixture-forecast-probabilities");
    const favoriteIndex = forecast ? forecast.probabilities.indexOf(Math.max(...forecast.probabilities)) : -1;
    if (favoriteIndex === 0) row.classList.add("is-home-favorite");
    else if (favoriteIndex === 2) row.classList.add("is-away-favorite");
    else if (favoriteIndex === 1) row.classList.add("is-draw-favorite");
    const values = forecast ? forecast.probabilities.map((value) => `${Math.round(value * 100)}%`) : ["—", "—", "—"];
    [t().home, t().draw, t().away].forEach((label, i) => {
      const classes = ["forecast-probability"];
      if (i === 1) classes.push("forecast-draw");
      if (i === favoriteIndex) classes.push("is-match-favorite");
      const cell = node("span", classes.join(" "), `${label} ${values[i]}`);
      if (i === favoriteIndex) {
        cell.setAttribute("aria-label", `${label} ${values[i]} · ${i === 1 ? t().drawPick : t().favoritePick}`);
        cell.append(node("b", "favorite-pick-label", i === 1 ? t().drawPick : t().favoritePick));
      }
      probabilities.append(cell);
    });
    const expected = forecast ? node("span", "forecast-score", `${forecast.homeGoals.toFixed(1)} — ${forecast.awayGoals.toFixed(1)} ${t().goalsShort}`) : null;
    row.append(fixture, probabilities);
    if (expected) row.append(expected);
    return row;
  });
  fixtures.replaceChildren(...rounds);
}

function render() {
  const analysis = analyze();
  renderTicker(state.matches);
  renderSummary(analysis);
  renderCardiograms(analysis);
  renderFavorite(
    analysis,
    liveProbabilityBase
      ? getLiveProbabilities(liveProbabilityBase, (performance.now() - liveProbabilityStartedAt) / 1000)
      : null
  );
  renderStrengths(analysis);
  renderForecasts(analysis);
  $("medianBadge").textContent = analysis.median === null ? t().noRatings : `${t().median}: ${Math.round(analysis.median)} / 100`;
  $("teamGrid").replaceChildren(...analysis.teams.map((team) => renderTeamCard(team, analysis.teams.filter((item) => item.metrics.rating !== null))));
}

function setLanguage(nextLang) {
  lang = nextLang;
  localStorage.setItem("leagueLang", lang);
  document.documentElement.lang = lang;
  const tt = t();
  document.title = `eFootball League — ${tt.title}`;
  $("backLink").textContent = tt.back;
  $("pageTitle").textContent = tt.title;
  $("eyebrow").textContent = tt.eyebrow;
  $("heroTitle").textContent = tt.hero;
  $("heroSubtitle").textContent = tt.subtitle;
  $("liveLabel").textContent = liveAvailable ? tt.liveConnected : tt.live;
  $("seasonLabel").textContent = tt.season;
  $("favoriteEyebrow").textContent = tt.favoriteEyebrow;
  $("favoriteTitle").textContent = tt.favoriteTitle;
  $("strengthsEyebrow").textContent = tt.strengthsEyebrow;
  $("strengthsTitle").textContent = tt.strengthsTitle;
  $("strengthsDescription").textContent = tt.strengthsDescription;
  $("tickerLabel").textContent = tt.liveTicker;
  $("cardiogramEyebrow").textContent = tt.live;
  $("cardiogramTitle").textContent = tt.cardiogramTitle;
  $("cardiogramDescription").textContent = tt.cardiogramDescription;
  $("matchTrendEyebrow").textContent = tt.liveModel;
  $("matchTrendTitle").textContent = tt.matchTrendTitle;
  $("currentProbabilityTitle").textContent = tt.currentProbabilities;
  $("modelMethodTitle").textContent = tt.modelMethodTitle;
  $("modelMethodText").textContent = tt.modelMethod;
  $("recentProbabilityTitle").textContent = tt.recentProbabilityTitle;
  $("championshipTitle").textContent = tt.championship;
  $("matchForecastTitle").textContent = tt.rounds;
  $("forecastEyebrow").textContent = tt.seasonOutlook;
  $("matchForecastEyebrow").textContent = tt.matchPredictions;
  $("forecastNote").textContent = tt.forecastSubtitle;
  $("teamsEyebrow").textContent = tt.teamsEyebrow;
  $("teamsTitle").textContent = tt.teamsTitle;
  $("method").innerHTML = tt.method;
  $("mobileScaleTitle").textContent = tt.mobileScaleTitle;
  $("mobileScale").textContent = tt.mobileScale;
  document.querySelectorAll(".ga-lang button").forEach((button) => button.classList.toggle("active", button.dataset.lang === lang));
  updateSeasonOptions();
  render();
}

function updateSeasonOptions() {
  const select = $("seasonSelect");
  const current = state.selectedSeason;
  const seasons = [...new Set([state.season, ...state.matches.map((match) => Number(match.season || 1))])]
    .filter((season) => Number.isInteger(season) && season > 0)
    .sort((a, b) => b - a);
  select.replaceChildren(new Option(t().allSeasons, "all"), ...seasons.map((season) => new Option(
    `${t().season} ${season}${season === state.season ? ` · ${t().current}` : ""}`,
    String(season)
  )));
  if (current === "all") select.value = "all";
  else if (seasons.includes(Number(current === "current" ? state.season : current))) select.value = String(current === "current" ? state.season : current);
  else select.value = seasons.length ? String(seasons[0]) : "all";
  state.selectedSeason = select.value;
}

function mapData(settings, rows) {
  if (!settings || !Array.isArray(settings.teams) || !settings.teams.every((team) => team && typeof team.name === "string")) {
    throw new Error("League settings are invalid.");
  }
  if (!Array.isArray(rows) || !rows.every((match) =>
    Number.isInteger(match.home_team) && match.home_team >= 0 && match.home_team < settings.teams.length &&
    Number.isInteger(match.away_team) && match.away_team >= 0 && match.away_team < settings.teams.length &&
    match.home_team !== match.away_team && Number.isFinite(match.home_goals) && Number.isFinite(match.away_goals) &&
    typeof match.played_at === "string")) {
    throw new Error("League match data is invalid.");
  }
  state.teams = settings.teams;
  state.matches = rows;
  state.season = Number(settings.season) || 1;
  state.lineups = settings.lineups && typeof settings.lineups === "object" ? settings.lineups : {};
  updateSeasonOptions();
  render();
}

async function loadData(version = ++requestVersion) {
  if (!client) return;
  const [settingsResponse, matchesResponse] = await Promise.all([
    client.from("league_settings").select("teams,season,lineups").eq("id", true).maybeSingle(),
    client.from("league_matches").select("home_team,away_team,home_goals,away_goals,played_at,season,stats").order("played_at", { ascending: true })
  ]);
  if (version !== requestVersion) return;
  if (settingsResponse.error) throw settingsResponse.error;
  if (matchesResponse.error) throw matchesResponse.error;
  if (!settingsResponse.data) throw new Error("League settings were not found.");
  mapData(settingsResponse.data, matchesResponse.data || []);
  showStatus("", false);
}

async function start() {
  showStatus(t().waiting);
  try {
    const [{ createClient }, config] = await Promise.all([
      import("https://esm.sh/@supabase/supabase-js@2"),
      import("../js/supabase-config.js")
    ]);
    if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) throw new Error(t().noConfig);
    client = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
    await loadData();
    if (probabilityAnimationFrame) window.cancelAnimationFrame(probabilityAnimationFrame);
    probabilityAnimationFrame = window.requestAnimationFrame(animateLiveProbabilities);
    channel = client.channel("team-global-analytics")
      .on("postgres_changes", { event: "*", schema: "public", table: "league_settings" }, () => {
        void loadData().catch((error) => showStatus(`${t().loadError}${error.message}`));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "league_matches" }, () => {
        void loadData().catch((error) => showStatus(`${t().loadError}${error.message}`));
      })
      .subscribe((status) => {
        liveAvailable = status === "SUBSCRIBED";
        $("liveLabel").textContent = liveAvailable ? t().liveConnected : t().livePolling;
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") showStatus(t().stoppedLive);
      });
    pollTimer = window.setInterval(() => {
      if (!liveAvailable) void loadData().catch((error) => showStatus(`${t().loadError}${error.message}`));
    }, 15000);
  } catch (error) {
    showStatus(`${t().loadError}${error.message}`);
  }
}

$("seasonSelect").addEventListener("change", (event) => {
  state.selectedSeason = event.target.value;
  render();
});
document.querySelectorAll(".ga-lang button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
window.addEventListener("beforeunload", () => {
  if (pollTimer) window.clearInterval(pollTimer);
  if (probabilityAnimationFrame) window.cancelAnimationFrame(probabilityAnimationFrame);
  if (channel && client) void client.removeChannel(channel);
});

if (localStorage.getItem("leagueTheme") === "halloween") document.documentElement.dataset.theme = "halloween";
setLanguage(lang);
void start();
