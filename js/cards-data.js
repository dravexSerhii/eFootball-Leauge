// eFootball card database. To add or change a card, edit this list and push.
// photo: full card art from the /base folder, club: club name, type: card series,
// stats: [Offensive Awareness, Ball Control, Dribbling, Finishing, Speed, Physical Contact]
window.EF_CARDS = [
  {
    id: "kane", name: "Harry Kane", rating: 110, pos: "CF", nation: "England", club: "Bayern Munich",
    type: "Epic", playstyle: "Goal Poacher", skill: "Heading", photo: "assets/base/kane-card.png",
    stats: [110, 98, 92, 112, 84, 96], updated: "2026-11-03",
    detail: {
      attack: [[95, 5], [97, 6], 92, 94, 90, 85, [94, 5], 81, 81, 83],
      defense: [47, 60, 49, 58, 41, 41, 41, 41, 41],
      strength: [90, [89, 5], 93, 77, 88, 85, 87]
    }
  },
  {
    id: "mbappe", name: "Kylian Mbapp\u00e9", rating: 108, pos: "CF", nation: "France", club: "Real Madrid",
    type: "Epic", playstyle: "Goal Poacher", skill: "Acceleration", photo: "assets/base/mbappe.png",
    stats: [106, 100, 102, 106, 117, 88], updated: "2026-11-03",
    detail: {
      attack: [[97, 1], 91, 93, 90, 72, 70, [101, 7], 62, 81, 87],
      defense: [44, 44, 45, 44, 41, 41, 41, 41, 41],
      strength: [[96, 4], [99, 4], 91, 68, 81, [95, 4], [84, 4]]
    }
  },
  {
    id: "yamal", name: "Lamine Yamal", rating: 108, pos: "RWF", nation: "Spain", club: "FC Barcelona",
    type: "Epic", playstyle: "Creative Playmaker", skill: "Dribbling", photo: "assets/base/Yamal.png",
    stats: [100, 110, 112, 100, 108, 82], updated: "2026-11-03",
    // Detailed attributes in game order; [value, levelBoost] shows the green "+N" badge
    detail: {
      attack: [89, [99, 5], [99, 4], 99, 88, 83, [88, 4], 52, 70, [95, 6]],
      defense: [45, 52, 48, 51, 41, 41, 41, 41, 41],
      strength: [[94, 1], 97, 91, 61, 77, [98, 4], 84]
    }
  }
];
