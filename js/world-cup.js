const copy = {
  en: {
    intro: "Six matches. Two clubs. One trophy. The eLeague begins after the World Cup.",
    season: "SEASON", stats: "World Cup Analytics ↗", standings: "Standings", club: "Club",
    played: "P", wins: "W", draws: "D", losses: "L", goals: "Goals", points: "Pts",
    history: "The journey", round: "Match", decider: "Deciding match", save: "Save result",
    home: "Home", away: "Away", signIn: "Sign in as a team owner to save a result.",
    champion: "{0} are World Cup champions!", tie: "The table is level. Play deciding matches until one team wins.",
    pending: "Complete the World Cup before adding eLeague matches.",
    loadError: "World Cup data could not be loaded: {0}", score: "Score",
    shots: "Shots", shotsOnTarget: "Shots on target", possession: "Possession (%)", passes: "Passes",
    optional: "Match statistics (optional)", delete: "Delete latest match", confirm: "Delete the latest World Cup match?",
    invalid: "Check the score and statistics. Possession must total 100 and shots on target cannot exceed shots.",
    saveError: "Could not save result: {0}", deleteError: "Could not delete match: {0}", noMatches: "No matches played yet."
  },
  ru: {
    intro: "Шесть встреч. Два клуба. Один трофей. eЛига начнётся после завершения турнира.",
    season: "СЕЗОН", stats: "Статистика World Cup ↗", standings: "Турнирная таблица", club: "Клуб",
    played: "И", wins: "В", draws: "Н", losses: "П", goals: "Мячи", points: "Очки",
    history: "Путь к трофею", round: "Матч", decider: "Решающая встреча", save: "Сохранить результат",
    home: "Хозяева", away: "Гости", signIn: "Войдите как владелец клуба, чтобы сохранить результат.",
    champion: "{0} — победитель World Cup!", tie: "В таблице полное равенство. Играйте решающие матчи до победы.",
    pending: "Завершите World Cup, прежде чем добавлять матчи eЛиги.",
    loadError: "Не удалось загрузить World Cup: {0}", score: "Счёт",
    shots: "Удары", shotsOnTarget: "Удары в створ", possession: "Владение (%)", passes: "Пасы",
    optional: "Статистика матча (необязательно)", delete: "Удалить последний матч", confirm: "Удалить последний матч World Cup?",
    invalid: "Проверьте счёт и статистику: владение должно составлять 100%, а удары в створ не превышать общее число ударов.",
    saveError: "Не удалось сохранить результат: {0}", deleteError: "Не удалось удалить матч: {0}", noMatches: "Матчей пока нет."
  }
};

export function createWorldCup({ client, getContext, refreshAll, notify }) {
  let firstSeason = null;
  let matches = [];
  let loadError = null;
  let loaded = false;
  let signature = "";
  const section = document.getElementById("worldCup");
  const content = document.getElementById("worldCupContent");
  const tr = (key, value) => (copy[getContext().lang] || copy.en)[key].replace("{0}", value ?? "");
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const seasonMatches = () => matches.filter(match => Number(match.season) === getContext().season);
  function standings(rows) {
    const teams = [0, 1].map(index => ({ index, played: 0, wins: 0, draws: 0, losses: 0, goals: 0, against: 0, points: 0 }));
    rows.filter(match => match.round <= 6).forEach(match => {
      const home = teams[match.home_team], away = teams[match.away_team];
      home.played++; away.played++;
      home.goals += match.home_goals; home.against += match.away_goals;
      away.goals += match.away_goals; away.against += match.home_goals;
      if (match.home_goals > match.away_goals) { home.wins++; away.losses++; home.points += 3; }
      else if (match.home_goals < match.away_goals) { away.wins++; home.losses++; away.points += 3; }
      else { home.draws++; away.draws++; home.points++; away.points++; }
    });
    return teams.sort((a, b) => b.points - a.points || (b.goals - b.against) - (a.goals - a.against) || b.goals - a.goals || a.index - b.index);
  }
  function winner(rows, table) {
    if (rows.filter(match => match.round <= 6).length < 6) return null;
    const [a, b] = table;
    if (a.points !== b.points || a.goals - a.against !== b.goals - b.against || a.goals !== b.goals) return a.index;
    const decider = rows.find(match => match.round > 6 && match.home_goals !== match.away_goals);
    return decider ? (decider.home_goals > decider.away_goals ? decider.home_team : decider.away_team) : null;
  }
  function blocksLeague() {
    const context = getContext();
    if (!loaded || loadError) return true;
    if (context.season < firstSeason) return false;
    const rows = seasonMatches();
    return winner(rows, standings(rows)) === null;
  }
  async function refresh() {
    const [config, results] = await Promise.all([
      client.from("world_cup_config").select("first_season").eq("id", true).maybeSingle(),
      client.from("world_cup_matches").select("*").order("round", { ascending: true })
    ]);
    const error = config.error || results.error;
    if (error || !config.data) {
      loadError = error?.message || "World Cup configuration is missing";
      console.error("World Cup loading failed:", loadError);
      loaded = false;
    } else {
      firstSeason = Number(config.data.first_season);
      matches = results.data || [];
      loadError = null;
      loaded = true;
    }
    render();
  }
  function render() {
    const context = getContext();
    const rows = seasonMatches();
    const nextSignature = JSON.stringify([firstSeason, rows, loadError, loaded, context.season, context.lang, context.teams, context.logos, context.team, Boolean(context.session), context.leagueStarted]);
    if (signature === nextSignature) return;
    signature = nextSignature;
    section.hidden = !loadError && (!loaded || context.season < firstSeason);
    if (section.hidden) return;
    document.getElementById("worldCupSubtitle").textContent = tr("intro");
    document.getElementById("worldCupSeason").textContent = `${tr("season")} ${context.season}`;
    document.getElementById("worldCupAnalytics").textContent = tr("stats");
    content.replaceChildren();
    if (loadError) { content.append(el("p", "world-cup-error", tr("loadError", loadError))); return; }
    const table = standings(rows);
    const champion = winner(rows, table);
    const grid = el("div", "world-cup-grid");
    const panel = el("section", "world-cup-panel");
    panel.append(el("p", "world-cup-kicker", "THE STANDINGS"), el("h3", "", tr("standings")));
    const wrap = el("div", "world-cup-table-wrap"), tableEl = el("table", "world-cup-table"), head = el("tr");
    ["club", "played", "wins", "draws", "losses", "goals", "points"].forEach(key => head.append(el("th", "", tr(key))));
    const thead = document.createElement("thead"); thead.append(head); tableEl.append(thead);
    const tbody = document.createElement("tbody");
    table.forEach(team => {
      const row = document.createElement("tr");
      const club = el("td", "world-cup-club");
      if (context.logos?.[team.index]) {
        const logo = document.createElement("img");
        logo.src = context.logos[team.index]; logo.alt = "";
        club.append(logo);
      }
      club.append(document.createTextNode(context.teams[team.index]?.name || `#${team.index}`));
      row.append(club);
      [team.played, team.wins, team.draws, team.losses, `${team.goals}:${team.against}`, team.points]
        .forEach(value => row.append(el("td", "", String(value))));
      tbody.append(row);
    });
    tableEl.append(tbody); wrap.append(tableEl); panel.append(wrap);
    panel.append(el("p", "world-cup-status", champion !== null ? tr("champion", context.teams[champion]?.name) :
      rows.length >= 6 ? tr("tie") : tr("pending")));
    grid.append(panel);
    const history = el("section", "world-cup-panel");
    history.append(el("p", "world-cup-kicker", "THE JOURNEY"), el("h3", "", tr("history")));
    if (!rows.length) history.append(el("p", "world-cup-status", tr("noMatches")));
    rows.forEach(match => {
      const item = el("div", "world-cup-result");
      item.append(el("span", "", `${match.round > 6 ? tr("decider") : tr("round")} ${match.round}`),
        el("strong", "", `${context.teams[match.home_team]?.name}  ${match.home_goals} : ${match.away_goals}  ${context.teams[match.away_team]?.name}`));
      history.append(item);
    });
    if (context.session && context.team !== null && rows.length && !context.leagueStarted) {
      const button = el("button", "world-cup-delete", tr("delete"));
      button.type = "button";
      button.addEventListener("click", async () => {
        if (!confirm(tr("confirm"))) return;
        button.disabled = true;
        const { error } = await client.rpc("delete_world_cup_match", { p_id: rows[rows.length - 1].id });
        if (error) { notify(tr("deleteError", error.message)); button.disabled = false; return; }
        await refreshAll();
      });
      history.append(button);
    }
    grid.append(history); content.append(grid);
    if (champion === null && !context.leagueStarted) {
      if (!context.session || context.team === null) content.append(el("p", "world-cup-status", tr("signIn")));
      else content.append(makeForm(rows, context));
    }
  }
  function makeForm(rows, context) {
    const form = el("form", "world-cup-form");
    const round = rows.length + 1, home = round % 2 ? 0 : 1, away = 1 - home;
    form.append(el("h3", "", `${round > 6 ? tr("decider") : tr("round")} ${round} · ${context.teams[home]?.name} — ${context.teams[away]?.name}`));
    const fields = el("div", "world-cup-fields");
    function input(label, name, max, required = false) {
      const wrapper = el("label", "", label), field = document.createElement("input");
      field.type = "number"; field.name = name; field.min = "0"; field.max = String(max); field.step = "1"; field.required = required;
      wrapper.append(field); fields.append(wrapper);
    }
    input(`${context.teams[home]?.name} · ${tr("score")}`, "homeGoals", 99, true);
    input(`${context.teams[away]?.name} · ${tr("score")}`, "awayGoals", 99, true);
    const details = document.createElement("details"), summary = el("summary", "", tr("optional"));
    details.append(summary);
    const statsFields = el("div", "world-cup-fields");
    const scoreFields = fields;
    for (const side of ["home", "away"]) {
      for (const key of ["shots", "shotsOnTarget", "possession", "passes"]) {
        const label = el("label", "", `${context.teams[side === "home" ? home : away]?.name} · ${tr(key)}`);
        const field = document.createElement("input");
        field.type = "number"; field.name = `${side}_${key}`; field.min = "0"; field.step = "1";
        field.max = String(key === "possession" ? 100 : key === "passes" ? 9999 : 999);
        label.append(field); statsFields.append(label);
      }
    }
    details.append(statsFields);
    const message = el("p", "world-cup-error"); message.setAttribute("role", "alert");
    const button = el("button", "world-cup-submit", tr("save")); button.type = "submit";
    form.append(scoreFields, details, message, button);
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const values = new FormData(form);
      const stats = {};
      for (const side of ["home", "away"]) {
        stats[side] = {};
        for (const key of ["shots", "shotsOnTarget", "possession", "passes"]) {
          const value = values.get(`${side}_${key}`);
          stats[side][key] = value === "" ? null : Number(value);
        }
      }
      const hp = stats.home.possession, ap = stats.away.possession;
      if ((hp === null) !== (ap === null) || (hp !== null && hp + ap !== 100) ||
        ["home", "away"].some(side => stats[side].shots !== null && stats[side].shotsOnTarget !== null && stats[side].shotsOnTarget > stats[side].shots)) {
        message.textContent = tr("invalid"); return;
      }
      button.disabled = true;
      const { error } = await client.rpc("save_world_cup_match", {
        p_season: context.season, p_home_goals: Number(values.get("homeGoals")), p_away_goals: Number(values.get("awayGoals")), p_stats: stats
      });
      if (error) { message.textContent = tr("saveError", error.message); button.disabled = false; return; }
      await refreshAll();
    });
    return form;
  }
  return { refresh, render, blocksLeague, message: () => loadError ? tr("loadError", loadError) : tr("pending") };
}
