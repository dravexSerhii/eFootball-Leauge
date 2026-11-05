const average = (rows, key) => rows.length
  ? rows.reduce((total, row) => total + row[key], 0) / rows.length
  : 0;

const analystAdvice = [
  {
    id: "defensive-shape",
    when: s => s.recent.length >= 3 && average(s.recent, "ga") >= 2,
    en: ["The back line is giving opponents too many clean looks. Try keeping a holding midfielder behind the ball and avoid pulling both full-backs forward at once.", "I spent my best years building this club; let's make every attack earn its way through."],
    ru: ["Оборона слишком часто позволяет сопернику доводить атаки до удара. Оставляй опорника за мячом и не отправляй обоих крайних защитников вперёд одновременно.", "Я отдал этому клубу лучшие годы — давай заставим каждый гол соперника ещё заслужить." ]
  },
  {
    id: "attacking-output",
    when: s => s.recent.length >= 3 && average(s.recent, "gf") <= 1,
    en: ["The attack is producing too little over the recent run. Build through one extra pass and get a second runner into the box before crossing.", "I gave my best years to this badge; the next chance deserves a better plan."],
    ru: ["В последних матчах атака создаёт слишком мало голов. Добавь ещё один пас перед обострением и заводи в штрафную второго игрока до подачи.", "Я отдал этому клубу лучшие годы — следующий момент заслуживает более продуманной атаки."]
  },
  {
    id: "recent-losses",
    when: s => s.recent.length >= 4 && s.recent.filter(row => row.gf < row.ga).length >= 3,
    en: ["Three or more of the last five ended in defeat. Simplify the first phase: keep possession safe for a few minutes and make the opponent press before forcing the forward pass.", "I gave everything to this club; let's get back to winning the hard minutes first."],
    ru: ["Три или больше поражений в последних пяти матчах — повод упростить начало атак. Несколько минут разыгрывай надёжно и заставь соперника прессинговать, прежде чем отдавать рискованный пас вперёд.", "Я отдал этому клубу всё — сначала вернём себе самые трудные минуты матча."]
  },
  {
    id: "winless-run",
    when: s => s.recent.length >= 4 && s.recent.slice(-4).every(row => row.gf <= row.ga),
    en: ["There has been no win in four matches. Protect the middle first, then choose one side to overload instead of trying to attack everywhere.", "I gave my best years to this club; a calmer shape can turn the next draw into three points."],
    ru: ["Четыре матча без победы. Сначала закрой центр, а в атаке перегружай один фланг вместо попытки наступать везде сразу.", "Я отдал этому клубу лучшие годы — спокойная структура может превратить следующую ничью в три очка."]
  },
  {
    id: "losing-streak",
    when: s => s.lossStreak >= 2,
    en: ["The team has lost at least twice in a row. For the next match, lower the defensive line risk and keep a simple outlet pass available after winning the ball.", "I gave this club my best years; one disciplined response can change the mood."],
    ru: ["Команда проиграла как минимум дважды подряд. В следующем матче снизь риск за спиной защитников и заранее оставь простой адрес для первого паса после отбора.", "Я отдал этому клубу лучшие годы — один собранный матч способен изменить настроение."]
  },
  {
    id: "shot-volume",
    when: s => s.shotRows.length >= 3 && average(s.shotRows, "shots") < 5,
    en: ["Too few attempts are reaching the shot count. Use quick one-twos around the edge of the box and take the clear opening instead of forcing another pass.", "I gave my best years to this club; football rewards the side brave enough to finish the move."],
    ru: ["Команда слишком редко доводит атаки до удара. Используй короткие стенки у штрафной и бей из открытой позиции, а не ищи ещё один идеальный пас.", "Я отдал этому клубу лучшие годы — футбол вознаграждает тех, кто решается завершить атаку."]
  },
  {
    id: "shots-on-target",
    when: s => s.targetRows.length >= 3 && average(s.targetRows, "shotsOnTarget") < 1.5,
    en: ["Most recorded attempts are missing the target. Favor a composed finish across goal and avoid shooting while the striker is off balance.", "I gave my best years to this club; accuracy turns pressure into points."],
    ru: ["Большинство учтённых ударов не попадает в створ. Выбирай спокойный удар в дальний угол и не бей, когда нападающий потерял равновесие.", "Я отдал этому клубу лучшие годы — точность превращает давление в очки."]
  },
  {
    id: "possession-control",
    when: s => s.possessionRows.length >= 3 && average(s.possessionRows, "possession") < 45,
    en: ["The team is spending too little time on the ball. Give the nearest midfielder a safe passing option and resist sending the first pass forward under pressure.", "I gave my best years to this club; control starts with the next pass."],
    ru: ["Команда слишком мало времени проводит с мячом. Дай ближайшему полузащитнику надёжный вариант для паса и не отправляй первый мяч вперёд под давлением.", "Я отдал этому клубу лучшие годы — контроль начинается со следующего паса."]
  },
  {
    id: "passing-tempo",
    when: s => s.passRows.length >= 3 && average(s.passRows, "passes") < 150,
    en: ["The pass count points to rushed possessions. Recycle the ball through the pivot once before switching play; it can pull the press out of shape.", "I gave my best years to this club; patience with the ball is never wasted."],
    ru: ["Количество передач говорит о слишком поспешных владениях. Один раз разыграй через опорника и только потом переводи мяч на другой фланг — так прессинг легче растянуть.", "Я отдал этому клубу лучшие годы — терпение с мячом никогда не бывает лишним."]
  },
  {
    id: "finishing",
    when: s => s.shotRows.length >= 3 && s.shots >= 18 && s.goalsOnShotMatches / s.shots < 0.2,
    en: ["The team is creating attempts but converting fewer than one in five. In the box, take an extra touch to open the body and choose placement over power.", "I gave my best years to this club; the final touch must match the work before it."],
    ru: ["Команда создаёт моменты, но реализует меньше одного из пяти ударов. В штрафной сделай дополнительное касание, чтобы открыться, и выбери точность вместо силы.", "Я отдал этому клубу лучшие годы — последний удар должен соответствовать всей проделанной работе."]
  },
  {
    id: "heavy-concessions",
    when: s => s.recent.filter(row => row.ga >= 3).length >= 2,
    en: ["Two recent matches brought three or more goals conceded. When the opponent turns to face your goal, switch to the nearest defender early and protect the central lane.", "I gave my best years to this club; the middle of the pitch must stay ours."],
    ru: ["В двух недавних матчах команда пропустила по три и более мяча. Когда соперник разворачивается лицом к воротам, раньше переключайся на ближайшего защитника и закрывай центр.", "Я отдал этому клубу лучшие годы — центр поля должен оставаться за нами."]
  },
  {
    id: "goal-difference",
    when: s => s.recent.length >= 4 && s.recent.reduce((sum, row) => sum + row.gf - row.ga, 0) <= -5,
    en: ["The recent goal difference is sharply negative. Avoid trading chances when ahead or level: keep one extra player behind the ball and attack after the shape is set.", "I gave my best years to this club; balance is what lets talent decide games."],
    ru: ["Разница мячей в последних матчах заметно отрицательная. Не обменивайся атаками при равном счёте или преимуществе: оставляй ещё одного игрока за мячом и начинай выпад из собранной структуры.", "Я отдал этому клубу лучшие годы — именно баланс позволяет мастерству решать матчи."]
  },
  {
    id: "too-many-draws",
    when: s => s.recent.length >= 4 && s.recent.filter(row => row.gf === row.ga).length >= 3,
    en: ["The team is turning too many matches into draws. In the final phase, bring on a fresh runner and direct the attack toward the weaker side of the opposing back line.", "I gave my best years to this club; the final push has to mean something."],
    ru: ["Слишком много матчей заканчиваются вничью. В концовке выпускай свежего игрока с рывком и направляй атаки на более уязвимый край обороны соперника.", "Я отдал этому клубу лучшие годы — финальный штурм должен быть не для галочки."]
  },
  {
    id: "scoreless-matches",
    when: s => s.recent.length >= 4 && s.recent.filter(row => row.gf === 0).length >= 2,
    en: ["The side has drawn a blank more than once recently. Create a clear passing lane for the striker and use an early cut-back instead of crossing into a set defense.", "I gave my best years to this club; give the forward a chance worth taking."],
    ru: ["В недавних матчах команда не раз уходила без гола. Освободи линию передачи на нападающего и попробуй ранний прострел вместо навеса в готовую оборону.", "Я отдал этому клубу лучшие годы — создай форварду момент, которым стоит воспользоваться."]
  },
  {
    id: "home-form",
    when: s => s.homeRows.length >= 3 && s.homePoints / s.homeRows.length < 1,
    en: ["Home results are below a point per match. Start with a higher press for a short spell, but keep the center-backs covered so the opening energy does not become a counterattack.", "I gave my best years to this club; our home ground should feel like an advantage."],
    ru: ["Дома команда набирает меньше одного очка за матч. Начни с короткого отрезка высокого прессинга, но оставь страховку центральным защитникам, чтобы стартовый напор не обернулся контратакой.", "Я отдал этому клубу лучшие годы — домашнее поле должно быть нашим преимуществом."]
  },
  {
    id: "away-form",
    when: s => s.awayRows.length >= 3 && s.awayPoints / s.awayRows.length < 1,
    en: ["Away form needs more control. Keep the first pass after recovery short and make the opponent move across the pitch before committing numbers forward.", "I gave my best years to this club; away points are earned with a clear head."],
    ru: ["На выезде команде не хватает контроля. После отбора начинай с короткого паса и заставь соперника двигаться поперёк поля, прежде чем отправлять игроков вперёд.", "Я отдал этому клубу лучшие годы — очки на выезде берут с холодной головой."]
  },
  {
    id: "shot-duels",
    when: s => s.shotRows.length >= 3 && average(s.shotRows, "oppShots") - average(s.shotRows, "shots") >= 2,
    en: ["Opponents are getting at least two more attempts per match. Close the receiver before the ball arrives and defend the cut-back lane rather than chasing the ball carrier.", "I gave my best years to this club; make the opponent work for every shot."],
    ru: ["Соперники наносят в среднем минимум на два удара больше. Встречай адресата до приёма мяча и перекрывай прострел назад, а не бросайся всей командой за игроком с мячом.", "Я отдал этому клубу лучшие годы — пусть соперник заслужит каждый удар."]
  },
  {
    id: "game-management",
    when: s => s.recent.filter(row => row.gf >= 2 && row.gf <= row.ga).length >= 2,
    en: ["The team has failed to turn two multi-goal performances into wins. After scoring, reduce unnecessary risks for a few possessions and keep a midfielder close enough to stop the counter.", "I gave my best years to this club; protecting a lead is part of attacking well."],
    ru: ["Даже два и более забитых мяча не принесли победу в нескольких матчах. После гола на пару владений убери лишний риск и оставь полузащитника рядом для остановки контратаки.", "Я отдал этому клубу лучшие годы — умение удержать преимущество тоже часть хорошей атаки."]
  },
  {
    id: "clean-sheets",
    when: s => s.recent.length >= 4 && s.recent.every(row => row.ga > 0) && average(s.recent, "ga") >= 1.5,
    en: ["The team has conceded in every recent match. Keep the defensive line compact after losing possession and make the opponent play around the block instead of through it.", "I gave my best years to this club; a clean sheet gives every attacker a platform."],
    ru: ["Команда пропускала в каждом из последних матчей. После потери мяча сохраняй компактность линии и заставляй соперника обходить блок, а не проходить сквозь него.", "Я отдал этому клубу лучшие годы — сухой матч даёт атаке надёжную опору."]
  },
  {
    id: "record-match-stats",
    when: s => s.recent.length >= 4 && s.recent.slice(-4).filter(row => row.shots !== null).length <= 1,
    en: ["The staff cannot compare shot and possession trends because recent match stats are mostly missing. Record the match numbers after the next game so the next briefing can be specific.", "I gave my best years to this club; good decisions start with honest numbers."],
    ru: ["Штабу не хватает статистики ударов и владения, чтобы сравнить тенденции. Запиши показатели после следующего матча — тогда следующий разбор будет точнее.", "Я отдал этому клубу лучшие годы — хорошие решения начинаются с честных цифр."]
  }
];

export function evaluateAnalystAdvice(matches, teamIndex) {
  if (teamIndex === null || teamIndex === undefined || teamIndex === "") return [];
  const index = Number(teamIndex);
  if (!Number.isInteger(index) || index < 0 || !Array.isArray(matches)) return [];
  const rows = matches
    .map((match, order) => ({ match, order }))
    .filter(({ match }) => (match.home ?? match.home_team) === index || (match.away ?? match.away_team) === index)
    .sort((a, b) => new Date(a.match.date ?? a.match.played_at) - new Date(b.match.date ?? b.match.played_at) || a.order - b.order)
    .map(({ match }) => {
      const home = (match.home ?? match.home_team) === index;
      const stats = match.stats?.[home ? "home" : "away"] || {};
      const opponentStats = match.stats?.[home ? "away" : "home"] || {};
      return {
        home,
        gf: Number(home ? (match.homeGoals ?? match.home_goals) : (match.awayGoals ?? match.away_goals)) || 0,
        ga: Number(home ? (match.awayGoals ?? match.away_goals) : (match.homeGoals ?? match.home_goals)) || 0,
        shots: Number.isFinite(stats.shots) ? stats.shots : null,
        shotsOnTarget: Number.isFinite(stats.shotsOnTarget) ? stats.shotsOnTarget : null,
        possession: Number.isFinite(stats.possession) ? stats.possession : null,
        passes: Number.isFinite(stats.passes) ? stats.passes : null,
        oppShots: Number.isFinite(opponentStats.shots) ? opponentStats.shots : null
      };
    });
  const recent = rows.slice(-5);
  let lossStreak = 0;
  for (let i = recent.length - 1; i >= 0 && recent[i].gf < recent[i].ga; i -= 1) lossStreak += 1;
  const recentForVenue = rows.slice(-10);
  const homeRows = recentForVenue.filter(row => row.home);
  const awayRows = recentForVenue.filter(row => !row.home);
  const points = list => list.reduce((sum, row) => sum + (row.gf > row.ga ? 3 : row.gf === row.ga ? 1 : 0), 0);
  const shotRows = recent.filter(row => row.shots !== null && row.oppShots !== null);
  const targetRows = recent.filter(row => row.shotsOnTarget !== null);
  const scoredShotRows = recent.filter(row => row.shots !== null);
  const stats = {
    recent,
    lossStreak,
    homeRows,
    awayRows,
    homePoints: points(homeRows),
    awayPoints: points(awayRows),
    shotRows,
    targetRows,
    shots: scoredShotRows.reduce((sum, row) => sum + row.shots, 0),
    goalsOnShotMatches: scoredShotRows.reduce((sum, row) => sum + row.gf, 0),
    possessionRows: recent.filter(row => row.possession !== null),
    passRows: recent.filter(row => row.passes !== null)
  };
  return analystAdvice.filter(advice => advice.when(stats));
}

export function getAnalystAdviceCopy(advice, language) {
  if (!advice) return null;
  const [message, signoff] = language === "ru" ? advice.ru : advice.en;
  return { id: advice.id, message, signoff };
}

export function getAnalystAdviceById(id) {
  return analystAdvice.find(advice => advice.id === id) || null;
}
