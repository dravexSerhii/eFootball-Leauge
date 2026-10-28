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
let pollTimer = null;
let toastTimer;

const standingsBody = document.getElementById("standingsBody");
const matchList = document.getElementById("matchList");
const matchDialog = document.getElementById("matchDialog");
const teamsDialog = document.getElementById("teamsDialog");
const authDialog = document.getElementById("authDialog");
const authButton = document.getElementById("authButton");
const authStatus = document.getElementById("authStatus");
const matchButton = document.getElementById("addMatchButton");
const editTeamsButton = document.getElementById("editTeamsButton");

function render() {
  renderStandings();
  renderMatches();
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

[matchDialog, teamsDialog, authDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

render();
updateAuthUi();

if (configReady) {
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
