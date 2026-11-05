const dialogueRows = [
  ["defensive-shape", ["Оставлю опорника и сыграю компактнее.", "Не согласен: хочу защищаться выше."], ["I'll keep a holding midfielder back and stay compact.", "I disagree; I want to defend higher."], [-10, 8]],
  ["attacking-output", ["Добавлю ещё один пас и второго игрока в штрафную.", "Буду быстрее обострять и чаще бить."], ["I'll add another pass and a second runner into the box.", "I'll attack quicker and shoot more often."], [-8, 10]],
  ["recent-losses", ["Сначала вернём контроль, потом пойдём вперёд.", "Нужно рискнуть и переломить серию."], ["We'll regain control first, then move forward.", "We need to take a risk and turn this run around."], [-10, 12]],
  ["winless-run", ["Закрою центр и выберу один фланг для атак.", "Оставлю план смелым, нам нужна победа."], ["I'll protect the middle and attack down one side.", "I'll keep the plan bold; we need a win."], [-8, 12]],
  ["losing-streak", ["Сыграю дисциплинированно и без лишнего риска.", "Не буду отступать от своей атакующей игры."], ["I'll stay disciplined and avoid unnecessary risk.", "I'll stick with my attacking style."], [-12, 8]],
  ["shot-volume", ["Буду чаще завершать хорошие атаки ударом.", "Сначала создам момент получше, не буду торопиться."], ["I'll finish good attacks with a shot more often.", "I'll create a better opening instead of rushing."], [8, -8]],
  ["shots-on-target", ["Выберу точность и удар в дальний угол.", "Попробую пробить мощнее, когда будет пространство."], ["I'll focus on placement and aim across goal.", "I'll hit it harder when the space is there."], [-8, 8]],
  ["possession-control", ["Сохраню короткий пас и помогу полузащитнику.", "Пусть владение будет меньше, зато атаки быстрее."], ["I'll keep the short pass on and support the midfielder.", "We'll have less possession, but attack faster."], [-10, 6]],
  ["passing-tempo", ["Сделаю дополнительный розыгрыш через опорника.", "Буду искать вертикальный пас сразу."], ["I'll recycle through the pivot once more.", "I'll look for the vertical pass straight away."], [-8, 8]],
  ["finishing", ["В штрафной добавлю касание и пробью точнее.", "Буду бить первым касанием, пока защита не накрыла."], ["I'll take a touch in the box and place the shot.", "I'll shoot first time before the defense closes."], [-8, 8]],
  ["heavy-concessions", ["Буду раньше закрывать центр и прострелы.", "Подниму прессинг, чтобы не подпускать к штрафной."], ["I'll protect the middle and cut-backs earlier.", "I'll press higher to keep them away from the box."], [-10, 10]],
  ["goal-difference", ["Оставлю больше игроков за мячом.", "Продолжу атаковать, но буду быстрее возвращаться."], ["I'll keep more players behind the ball.", "I'll keep attacking but recover faster."], [-10, 8]],
  ["too-many-draws", ["В концовке добавлю свежего игрока в атаку.", "Не буду раскрываться ради одного гола."], ["I'll bring on a fresh attacker late in the game.", "I won't open up just to chase one goal."], [10, -8]],
  ["scoreless-matches", ["Попробую ранний прострел на нападающего.", "Сначала растяну оборону короткими передачами."], ["I'll try an early cut-back to the striker.", "I'll stretch the defense with short passes first."], [8, -8]],
  ["home-form", ["Начну активно и встречу соперника выше.", "Сначала сыграю спокойно, без давления результата."], ["I'll start aggressively and press higher.", "I'll settle into the match without forcing it."], [8, -8]],
  ["away-form", ["Сначала закрепимся в матче короткими передачами.", "Постараюсь сразу забрать инициативу."], ["We'll settle into the match with short passes first.", "I'll try to take control straight away."], [-8, 8]],
  ["shot-duels", ["Закрою прострел назад и встречу игрока до приёма.", "Буду прессинговать владельца мяча вдвоём."], ["I'll block the cut-back and close the receiver early.", "We'll double-team the player on the ball."], [-10, 10]],
  ["game-management", ["После гола сыграю надёжнее несколько владений.", "Продолжу давить, пока соперник не оправился."], ["After scoring, I'll keep it safe for a few possessions.", "I'll keep pressing while they're still shaken."], [-10, 10]],
  ["clean-sheets", ["Сохраню компактность после потери мяча.", "Попробую выше встречать соперника."], ["I'll stay compact when we lose the ball.", "I'll try to meet them higher up the pitch."], [-10, 8]],
  ["record-match-stats", ["Буду записывать статистику после каждого матча.", "Сосредоточусь на игре, цифры добавлю после важных матчей."], ["I'll record the stats after every match.", "I'll focus on playing and log the numbers after key matches."], [-6, 4]],
  ["welcome-message", ["Спасибо, рад быть в команде!", "Готов работать и доказать себя на поле."], ["Thanks, I'm glad to be part of the team!", "I'm ready to work and prove myself on the pitch."], [-8, 8]]
];

const finalReplies = {
  ru: [
    "Договорились. Зафиксируем этот план и проверим, как команда справится в следующем матче.",
    "Понял твою позицию. Штаб учтёт этот выбор, а после следующего матча вернёмся к цифрам."
  ],
  en: [
    "Agreed. We'll note the plan and see how the team responds in the next match.",
    "Understood. The staff will respect your call; we'll review the numbers after the next match."
  ]
};

export const ANALYST_DIALOGUES = Object.fromEntries(dialogueRows.map(([id, ruChoices, enChoices, tensionChanges]) => [
  id,
  {
    ru: { choices: ruChoices, replies: tensionChanges.map(change => finalReplies.ru[change > 0 ? 1 : 0]) },
    en: { choices: enChoices, replies: tensionChanges.map(change => finalReplies.en[change > 0 ? 1 : 0]) },
    tensionChanges
  }
]));
