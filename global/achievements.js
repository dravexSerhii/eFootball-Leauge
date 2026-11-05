const svg = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const longestStreak = (rows, test) => {
  let best = 0, run = 0;
  rows.forEach((row) => {
    run = test(row) ? run + 1 : 0;
    best = Math.max(best, run);
  });
  return best;
};
const count = (rows, test) => rows.filter(test).length;
const conversion = (row) => row.shots > 0 ? row.gf / row.shots : null;

export const ACHIEVEMENTS = [
  {
    id: "first-win", tier: "bronze", target: 1,
    icon: svg('<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>'),
    ru: ["Первая кровь", "Выиграть первый матч"], en: ["First Blood", "Win your first match"],
    measure: (rows) => count(rows, (r) => r.gf > r.ga)
  },
  {
    id: "veteran", tier: "bronze", target: 10,
    icon: svg('<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5 7 21l5-3 5 3-1.5-7.5"/>'),
    ru: ["Ветеран лиги", "Сыграть 10 матчей"], en: ["League Veteran", "Play 10 matches"],
    measure: (rows) => rows.length
  },
  {
    id: "draw-master", tier: "bronze", target: 3,
    icon: svg('<path d="M5 9h14"/><path d="M5 15h14"/><circle cx="12" cy="12" r="9"/>'),
    ru: ["Король ничьих", "Сыграть вничью 3 раза"], en: ["Draw Specialist", "Draw 3 matches"],
    measure: (rows) => count(rows, (r) => r.gf === r.ga)
  },
  {
    id: "win-streak", tier: "silver", target: 3,
    icon: svg('<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>'),
    ru: ["На огне", "3 победы подряд"], en: ["On Fire", "Win 3 matches in a row"],
    measure: (rows) => longestStreak(rows, (r) => r.gf > r.ga)
  },
  {
    id: "unbeaten", tier: "silver", target: 5,
    icon: svg('<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="m9 12 2 2 4-4"/>'),
    ru: ["Несокрушимые", "5 матчей без поражений"], en: ["Unbreakable", "5 matches unbeaten"],
    measure: (rows) => longestStreak(rows, (r) => r.gf >= r.ga)
  },
  {
    id: "clean-sheet", tier: "silver", target: 1,
    icon: svg('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    ru: ["Сухарь", "Не пропустить ни одного гола"], en: ["Clean Sheet", "Concede no goals in a match"],
    measure: (rows) => count(rows, (r) => r.ga === 0)
  },
  {
    id: "goals-25", tier: "silver", target: 25,
    icon: svg('<circle cx="12" cy="12" r="9"/><path d="M12 8l3.5 2.5-1.3 4h-4.4l-1.3-4z"/><path d="M12 8V3"/><path d="m15.5 10.5 5-1"/><path d="m14.2 14.5 3 4"/><path d="m9.8 14.5-3 4"/><path d="m8.5 10.5-5-1"/>'),
    ru: ["Бомбардиры", "Забить 25 голов за всё время"], en: ["Goal Machine", "Score 25 goals in total"],
    measure: (rows) => rows.reduce((sum, r) => sum + r.gf, 0)
  },
  {
    id: "five-goals", tier: "gold", target: 1,
    icon: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    ru: ["Голевой фестиваль", "Забить 5+ голов в одном матче"], en: ["Goal Festival", "Score 5+ goals in one match"],
    measure: (rows) => count(rows, (r) => r.gf >= 5)
  },
  {
    id: "thriller", tier: "gold", target: 1,
    icon: svg('<path d="M13 2 5 13h6l-1 9 8-12h-6z"/>'),
    ru: ["Как в кино", "Матч, где забито 10+ голов"], en: ["Thriller", "A match with 10+ goals in total"],
    measure: (rows) => count(rows, (r) => r.gf + r.ga >= 10)
  },
  {
    id: "rout", tier: "gold", target: 1,
    icon: svg('<path d="M13 3l8 8-3 3-8-8z"/><path d="M10.5 8.5 3 20"/><path d="m3 20 1-1"/>'),
    ru: ["Разгром", "Выиграть с разницей в 3+ мяча"], en: ["Demolition", "Win by 3 or more goals"],
    measure: (rows) => count(rows, (r) => r.gf - r.ga >= 3)
  },
  {
    id: "wins-10", tier: "gold", target: 10,
    icon: svg('<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>'),
    ru: ["Король лиги", "Одержать 10 побед"], en: ["League King", "Win 10 matches"],
    measure: (rows) => count(rows, (r) => r.gf > r.ga)
  },
  {
    id: "possession", tier: "silver", target: 1,
    icon: svg('<circle cx="12" cy="12" r="9"/><path d="M12 12V3"/><path d="m12 12 7.5 4.5"/>'),
    ru: ["Хозяин мяча", "Владение 60%+ в матче"], en: ["Ball Hog", "60%+ possession in a match"],
    measure: (rows) => count(rows, (r) => r.possession !== null && r.possession >= 60)
  },
  {
    id: "passes", tier: "silver", target: 1,
    icon: svg('<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="19" r="2"/><path d="M7 6h10"/><path d="m6 8 5 9"/><path d="m18 8-5 9"/>'),
    ru: ["Дирижёр", "200+ пасов за матч"], en: ["Playmaker", "200+ passes in a match"],
    measure: (rows) => count(rows, (r) => r.passes !== null && r.passes >= 200)
  },
  {
    id: "sniper", tier: "gold", target: 1,
    icon: svg('<circle cx="12" cy="12" r="7"/><path d="M12 2v5"/><path d="M12 17v5"/><path d="M2 12h5"/><path d="M17 12h5"/>'),
    ru: ["Снайпер", "Реализация 50%+ при 6+ ударах"], en: ["Sniper", "50%+ conversion with 6+ shots"],
    measure: (rows) => count(rows, (r) => r.shots !== null && r.shots >= 6 && conversion(r) >= 0.5)
  },
  {
    id: "wall", tier: "gold", target: 1,
    icon: svg('<rect x="3" y="5" width="18" height="14"/><path d="M3 9.7h18"/><path d="M3 14.3h18"/><path d="M9 5v4.7"/><path d="M15 9.7v4.6"/><path d="M9 14.3V19"/>'),
    ru: ["Стена", "Соперник бьёт не более 6 раз за матч"], en: ["The Wall", "Opponent takes 6 shots or fewer"],
    measure: (rows) => count(rows, (r) => r.oppShots !== null && r.oppShots <= 6)
  }
];

const stat = (value) => Number.isFinite(value) ? value : null;

function teamRows(matches, teamIndex) {
  const rows = Array.isArray(matches) ? matches : [];
  return rows
    .map((match, index) => ({ match, index }))
    .filter(({ match }) => {
      const home = match.home_team ?? match.home;
      const away = match.away_team ?? match.away;
      return home === teamIndex || away === teamIndex;
    })
    .sort((a, b) =>
      new Date(a.match.played_at ?? a.match.date) - new Date(b.match.played_at ?? b.match.date) ||
      a.index - b.index
    )
    .map(({ match }) => {
      const homeTeam = match.home_team ?? match.home;
      const awayTeam = match.away_team ?? match.away;
      const home = homeTeam === teamIndex;
      const own = match.stats?.[home ? "home" : "away"] || {};
      const opp = match.stats?.[home ? "away" : "home"] || {};
      return {
        gf: Number(home ? (match.home_goals ?? match.homeGoals) : (match.away_goals ?? match.awayGoals)) || 0,
        ga: Number(home ? (match.away_goals ?? match.awayGoals) : (match.home_goals ?? match.homeGoals)) || 0,
        shots: stat(own.shots),
        possession: stat(own.possession),
        passes: stat(own.passes),
        oppShots: stat(opp.shots)
      };
    });
}

export function evaluateAchievements(matches, teamIndex) {
  const rows = teamRows(matches, teamIndex);
  return ACHIEVEMENTS.map((achievement) => {
    const value = achievement.measure(rows);
    return {
      id: achievement.id,
      value: Math.min(value, achievement.target),
      target: achievement.target,
      unlocked: value >= achievement.target
    };
  });
}
