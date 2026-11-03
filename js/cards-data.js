// Built-in eFootball cards (shown to everyone). Cards edited or added on the site are stored in Supabase
// (table efootball_cards) and override these by id.
// tier: card grade shown in the corner (S+, S, ...), category: group shown as a filter chip (e.g. "Ballon d'Or")
// photo: full card art from assets/base
// detail: attributes in game order; a plain number or [value, levelBoost] (levelBoost shows the green "+N" badge)
window.EF_CARDS = [
  {
    id: "kane", name: "Harry Kane", rating: 110, tier: "S+", pos: "CF", nation: "England", club: "Bayern Munich",
    category: "Ballon d'Or", type: "Epic", playstyle: "Goal Poacher", skill: "Heading",
    photo: "assets/base/kane-card.png", updated: "2026-11-03",
    detail: {
      attack: [[95, 5], [97, 6], 92, 94, 90, 85, [94, 6], 81, 82, 83],
      defense: [47, 60, 49, 58, 41, 41, 41, 41, 41],
      strength: [90, [89, 5], 93, 77, 88, 85, 87]
    }
  },
  {
    id: "mbappe", name: "Kylian Mbapp\u00e9", rating: 108, tier: "S+", pos: "CF", nation: "France", club: "Real Madrid",
    category: "Ballon d'Or", type: "Epic", playstyle: "Goal Poacher", skill: "Acceleration",
    photo: "assets/base/mbappe.png", updated: "2026-11-03",
    detail: {
      attack: [[97, 1], 91, 93, 90, 72, 70, [101, 7], 62, 81, 87],
      defense: [44, 44, 45, 44, 41, 41, 41, 41, 41],
      strength: [[96, 4], [99, 4], 91, 68, 81, [95, 4], [84, 4]]
    }
  },
  {
    id: "yamal", name: "Lamine Yamal", rating: 108, tier: "S+", pos: "RWF", nation: "Spain", club: "FC Barcelona",
    category: "Ballon d'Or", type: "Epic", playstyle: "Creative Playmaker", skill: "Dribbling",
    photo: "assets/base/Yamal.png", updated: "2026-11-03",
    detail: {
      attack: [89, [99, 5], [99, 4], 99, 88, 83, [88, 4], 52, 70, [95, 6]],
      defense: [45, 52, 48, 51, 41, 41, 41, 41, 41],
      strength: [[94, 1], 97, 91, 61, 77, [98, 4], 84]
    }
  },
  {
    id: "inzaghi", name: "Filippo Inzaghi", rating: 107, tier: "S", pos: "CF", nation: "Italy", club: "Juventus",
    category: "", type: "Epic", playstyle: "Goal Poacher", skill: "Finishing",
    photo: "assets/base/inzaghi.png", updated: "2026-11-03",
    detail: {
      attack: [[106, 7], [85, 4], 82, 78, 64, 60, [97, 5], 76, 76, 82],
      defense: [48, 57, 47, 60, 42, 41, 41, 41, 41],
      strength: [90, 97, [90, 4], 78, [80, 4], 88, 86]
    }
  }
];
