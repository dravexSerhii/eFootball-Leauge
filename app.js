import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

const initialState = {
  teams: [{ name: "FC Promashkov" }, { name: "FC Lionslav" }],
  matches: []
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

let championshipHistory = [];

function render() {
  renderStandings();
  renderMatches();
  renderNews();
  renderChampionshipRace();
}

function renderNews() {
  newsList.replaceChildren();
  if (newsItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "news-empty";
    empty.textContent = "No news yet. Check back soon for league updates.";
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
    deleteButton.textContent = "Удалить";
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
    message.textContent = `Could not load league news: ${error.message}`;
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
    showToast("Новость удалена");
  } catch (error) {
    console.error("Failed to delete league news:", error);
    showToast(`Не удалось удалить новость: ${error.message}`);
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
  const stats = getStandings();
  if (stats.length < 2) return null;
  const one = stats[0];
  const two = stats[1];
  const total = one.points + two.points;
  let oddsOne, oddsTwo;
  if (total === 0) {
    oddsOne = 50;
    oddsTwo = 50;
  } else {
    oddsOne = Math.round((one.points / total) * 100);
    oddsTwo = Math.round((two.points / total) * 100);
    if (oddsOne + oddsTwo !== 100) {
      if (one.points > two.points) oddsOne = 100 - oddsTwo;
      else oddsTwo = 100 - oddsOne;
    }
  }
  let favorite = null;
  let statusText = "";
  if (one.points > two.points) {
    favorite = one;
    statusText = `Favorite: ${one.name}`;
  } else if (two.points > one.points) {
    favorite = two;
    statusText = `Favorite: ${two.name}`;
  } else {
    favorite = null;
    statusText = "Equal chances";
  }
  return { one, two, oddsOne, oddsTwo, favorite, statusText };
}

function renderChampionshipRace() {
  const race = calculateChampionshipOdds();
  const raceGrid = document.getElementById("raceGrid");
  const raceStatus = document.getElementById("raceStatus");
  const raceFooter = document.getElementById("raceFooter");
  if (!race) {
    raceGrid.replaceChildren();
    raceStatus.textContent = "No data";
    raceFooter.textContent = "";
    return;
  }
  const now = Date.now();
  const last = championshipHistory[championshipHistory.length - 1];
  if (!last || last.one !== race.oddsOne || last.two !== race.oddsTwo) {
    championshipHistory.push({ t: now, one: race.oddsOne, two: race.oddsTwo });
    if (championshipHistory.length > 50) championshipHistory.shift();
  }
  drawRaceChart();
  raceChartCanvas.classList.remove("live-pulse");
  void raceChartCanvas.offsetWidth;
  raceChartCanvas.classList.add("live-pulse");
  const badgeOne = document.getElementById("raceTeamOneBadge");
  const badgeTwo = document.getElementById("raceTeamTwoBadge");
  document.getElementById("raceTeamOneName").textContent = race.one.name;
  document.getElementById("raceTeamTwoName").textContent = race.two.name;
  document.getElementById("raceTeamOnePts").textContent = `${race.one.points} pts`;
  document.getElementById("raceTeamTwoPts").textContent = `${race.two.points} pts`;
  document.getElementById("raceTeamOneOdds").textContent = `${race.oddsOne}%`;
  document.getElementById("raceTeamTwoOdds").textContent = `${race.oddsTwo}%`;
  document.getElementById("raceTeamOneOdds").className = race.favorite?.index === race.one.index ? "race-odds-value favorite" : "race-odds-value";
  document.getElementById("raceTeamTwoOdds").className = race.favorite?.index === race.two.index ? "race-odds-value favorite" : "race-odds-value";
  raceStatus.textContent = race.statusText;
  const photoOne = TEAM_PHOTOS[race.one.index];
  const photoTwo = TEAM_PHOTOS[race.two.index];
  if (photoOne) {
    badgeOne.innerHTML = `<img src="${photoOne}" alt="" style="width:100%;height:100%;object-fit:contain;border-radius:inherit">`;
  } else {
    badgeOne.textContent = race.one.index === 0 ? "01" : "02";
  }
  if (photoTwo) {
    badgeTwo.innerHTML = `<img src="${photoTwo}" alt="" style="width:100%;height:100%;object-fit:contain;border-radius:inherit">`;
  } else {
    badgeTwo.textContent = race.two.index === 0 ? "01" : "02";
  }
  if (race.favorite) {
    raceStatus.className = "race-status race-favorite";
    raceFooter.textContent = `${race.favorite.name} leads the championship race.`;
  } else {
    raceStatus.className = "race-status";
    raceFooter.textContent = "Teams are even, winner is open.";
  }
}

function drawRaceChart() {
  const ctx = raceChartCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = raceChartCanvas.getBoundingClientRect();
  raceChartCanvas.width = rect.width * dpr;
  raceChartCanvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);
  if (championshipHistory.length < 2) return;
  const pad = 26;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const minX = championshipHistory[0].t;
  const maxX = championshipHistory[championshipHistory.length - 1].t;
  const rangeX = maxX - minX || 1;
  const rangeY = 100;
  const pts = championshipHistory.map(p => ({
    x: pad + ((p.t - minX) / rangeX) * innerW,
    yOne: pad + innerH - (p.one / rangeY) * innerH,
    yTwo: pad + innerH - (p.two / rangeY) * innerH
  }));
  const last = pts[pts.length - 1];
  const gradOne = ctx.createLinearGradient(0, pad, 0, pad + innerH);
  gradOne.addColorStop(0, "rgba(211,255,87,.35)");
  gradOne.addColorStop(1, "rgba(211,255,87,.02)");
  const gradTwo = ctx.createLinearGradient(0, pad, 0, pad + innerH);
  gradTwo.addColorStop(0, "rgba(156,120,255,.35)");
  gradTwo.addColorStop(1, "rgba(156,120,255,.02)");
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pad + innerH);
  pts.forEach(p => ctx.lineTo(p.x, p.yOne));
  ctx.lineTo(w - pad, pad + innerH);
  ctx.closePath();
  ctx.fillStyle = gradOne;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pad + innerH);
  pts.forEach(p => ctx.lineTo(p.x, p.yTwo));
  ctx.lineTo(w - pad, pad + innerH);
  ctx.closePath();
  ctx.fillStyle = gradTwo;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].yOne);
  pts.forEach(p => ctx.lineTo(p.x, p.yOne));
  ctx.strokeStyle = "#d3ff57";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].yTwo);
  pts.forEach(p => ctx.lineTo(p.x, p.yTwo));
  ctx.strokeStyle = "#9c78ff";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
  pts.forEach((p, i) => {
    if (i === 0 || i === pts.length - 1) {
      ctx.beginPath();
      ctx.arc(p.x, p.yOne, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#d3ff57";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.yTwo, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#9c78ff";
      ctx.fill();
    }
  });
  ctx.beginPath();
  ctx.moveTo(pad, pad + innerH);
  ctx.lineTo(w - pad, pad + innerH);
  ctx.strokeStyle = "rgba(255,255,255,.06)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, pad + innerH);
  ctx.strokeStyle = "rgba(255,255,255,.06)";
  ctx.lineWidth = 1;
  ctx.stroke();
  for (let y = 25; y <= 100; y += 25) {
    const yy = pad + innerH - (y / 100) * innerH;
    ctx.beginPath();
    ctx.moveTo(pad, yy);
    ctx.lineTo(w - pad, yy);
    ctx.strokeStyle = "rgba(255,255,255,.03)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,255,255,.35)";
    ctx.font = "9px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(y + "%", pad + 4, yy - 4);
  }
  const lastHist = championshipHistory[championshipHistory.length - 1];
  ctx.fillStyle = "#d3ff57";
  ctx.font = "bold 12px Inter, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${lastHist.one}%`, w - pad - 8, last.yOne - 8);
  ctx.fillStyle = "#9c78ff";
  ctx.fillText(`${lastHist.two}%`, w - pad - 8, last.yTwo + 14);
  ctx.beginPath();
  ctx.arc(last.x, last.yOne, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#d3ff57";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(last.x, last.yTwo, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#9c78ff";
  ctx.fill();
}

async function deleteMatch(id) {
  try {
    const { error } = await supabase.from("league_matches").delete().eq("id", id);
    if (error) throw error;
    await refreshFromServer();
    showToast("Матч удалён");
  } catch (error) {
    console.error("Failed to delete match:", error);
    showToast(`Не удалось удалить матч: ${error.message}`);
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
    empty.textContent = "No matches played yet. Add the first result to get your league started!";
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
    deleteButton.textContent = "Удалить";
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
  title.textContent = "Match statistics";
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
    authStatus.textContent = "Supabase setup required";
    authButton.textContent = "Setup";
    authButton.disabled = true;
  } else if (!session) {
    authStatus.textContent = "Signed out";
    authButton.textContent = "Sign in";
    authButton.disabled = false;
  } else if (!dataReady) {
    authStatus.textContent = "Loading league…";
    authButton.textContent = "Retry";
    authButton.disabled = false;
  } else {
    authStatus.textContent = session.user.email;
    authButton.textContent = "Sign out";
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
    stats: row.stats ?? { home: {}, away: {} }
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
    supabase.from("league_settings").select("teams").eq("id", true).maybeSingle(),
    supabase.from("league_matches")
      .select("id, home_team, away_team, home_goals, away_goals, played_at, stats")
      .order("played_at", { ascending: true })
  ]);
  if (settingsResponse.error) throw settingsResponse.error;
  if (matchesResponse.error) throw matchesResponse.error;
  if (!settingsResponse.data) {
    throw new Error("League settings were not found. Run the SQL in supabase.sql.");
  }
  validateServerState(settingsResponse.data, matchesResponse.data);
  state = {
    teams: settingsResponse.data.teams,
    matches: matchesResponse.data.map(mapMatch)
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
    authStatus.textContent = "Sync error";
    showToast(`Could not refresh the league: ${error.message}`);
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
        if (session && dataReady) authStatus.textContent = "Syncing periodically";
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
    authStatus.textContent = "Loading error";
    authButton.textContent = "Retry";
    authButton.disabled = false;
    showToast(`Could not load the league: ${error.message}`);
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
      showToast(`Could not sign out: ${error.message}`);
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
    errorElement.textContent = `Sign-in failed: ${error.message}`;
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
    errorElement.textContent = "Choose a JPEG, PNG or WebP image.";
    event.target.value = "";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    errorElement.textContent = "The image must be 5 MB or smaller.";
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
    errorElement.textContent = "Sign in before publishing league news.";
    return;
  }
  if (!title || !description || !file) {
    errorElement.textContent = "Enter a headline and description, and choose a photo.";
    return;
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 5 * 1024 * 1024) {
    errorElement.textContent = "Choose a JPEG, PNG or WebP image up to 5 MB.";
    return;
  }

  publishButton.disabled = true;
  const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type];
  const imagePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  let photoUploaded = false;
  try {
    const { error: uploadError } = await supabase.storage.from("news-images")
      .upload(imagePath, file, { contentType: file.type, cacheControl: "3600", upsert: false });
    if (uploadError) throw new Error(`Could not upload the photo: ${uploadError.message}`);
    photoUploaded = true;
    const { error: insertError } = await supabase.from("league_news").insert({
      title,
      description,
      image_path: imagePath
    });
    if (insertError) throw new Error(`Could not publish news: ${insertError.message}`);
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
  showToast("League news published");
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
    errorElement.textContent = "Select two different teams.";
    return;
  }
  if (!Number.isInteger(homeGoals) || !Number.isInteger(awayGoals) ||
    homeGoals < 0 || awayGoals < 0 || homeGoals > 99 || awayGoals > 99) {
    errorElement.textContent = "Enter a score between 0 and 99 goals.";
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
    errorElement.textContent = "Enter whole numbers for match statistics.";
    return;
  }
  if (stats.home.shotsOnTarget !== null && stats.home.shots !== null &&
    stats.home.shotsOnTarget > stats.home.shots ||
    stats.away.shotsOnTarget !== null && stats.away.shots !== null &&
    stats.away.shotsOnTarget > stats.away.shots) {
    errorElement.textContent = "Shots on target cannot exceed total shots.";
    return;
  }
  const hasHomePossession = stats.home.possession !== null;
  const hasAwayPossession = stats.away.possession !== null;
  if (hasHomePossession !== hasAwayPossession ||
    hasHomePossession && stats.home.possession + stats.away.possession !== 100) {
    errorElement.textContent = "Enter possession for both teams and make the total 100%.";
    return;
  }
  const { data, error } = await supabase.from("league_matches").insert({
    home_team: home,
    away_team: away,
    home_goals: homeGoals,
    away_goals: awayGoals,
    stats
  }).select("id, home_team, away_team, home_goals, away_goals, played_at, stats").single();
  if (error) {
    console.error("Failed to save the result to the server:", error);
    errorElement.textContent = `Could not save the result: ${error.message}`;
    return;
  }
  state.matches.push(mapMatch(data));
  state.matches.sort((a, b) => new Date(a.date) - new Date(b.date));
  render();
  matchDialog.close();
  showToast("Match result saved to the server");
});

document.getElementById("teamsForm").addEventListener("submit", async event => {
  event.preventDefault();
  const first = document.getElementById("teamNameOne").value.trim();
  const second = document.getElementById("teamNameTwo").value.trim();
  const errorElement = document.getElementById("teamsError");
  if (!first || !second) {
    errorElement.textContent = "Enter names for both teams.";
    return;
  }
  if (first.localeCompare(second, "en", { sensitivity: "base" }) === 0) {
    errorElement.textContent = "Team names must be different.";
    return;
  }
  const teams = [{ name: first }, { name: second }];
  const { error } = await supabase.from("league_settings")
    .update({ teams }).eq("id", true).select("teams").single();
  if (error) {
    console.error("Failed to save team names to the server:", error);
    errorElement.textContent = `Could not save team names: ${error.message}`;
    return;
  }
  state.teams = teams;
  render();
  teamsDialog.close();
  showToast("Team names saved to the server");
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

render();
updateAuthUi();

if (configReady) {
  void refreshNews();
  subscribeToNews();
  window.setInterval(() => void refreshNews(), 30000);
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Failed to check the Supabase session:", error);
    authStatus.textContent = "Sign-in error";
    showToast(`Could not check sign-in: ${error.message}`);
  } else {
    await handleSession(data.session);
    supabase.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => void handleSession(nextSession), 0);
    });
  }
} else {
  authStatus.textContent = "Supabase setup required";
}
