export type HealthStatus =
  | 0 // 正常
  | 100 // 黄伤？

export type PlayerInfo = {
  hp: 205,
  maxhp: 205,
  mp: 168,
  maxmp: 168,
  xp: 21160,
  maxxp: 28561,
  health: HealthStatus,
  souls: 0,
  level: 12,
  gold: 251,
  score: 870,
  skillslots: 10,
  use_title: -1,
  avatar_id: 38000,
  image_id: 100051,
  unitid: 20559,
  petid: 0, // -1代表没有作战宠，0代表第1只宠
  direction: 6,
  battle_position: 0,
  punchclock: 0,
  usingpunchclock: false,
  petriding: false,
  name: '=一片帆=',
  job: '见习弓箭手',
  nick: '',
  titles: [
    '无名的旅人', '见习弓箭手', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    '', '', '', '', '',
    ''
  ],
  detail: {
    points_remain: 0,
    points_endurance: 0,
    points_strength: 37,
    points_defense: 0,
    points_agility: 37,
    points_magical: 0,
    value_attack: 117,
    value_defensive: 35,
    value_agility: 101,
    value_spirit: 92,
    value_recovery: 103,
    resist_poison: 0,
    resist_sleep: 0,
    resist_medusa: 0,
    resist_drunk: 0,
    resist_chaos: 0,
    resist_forget: 0,
    fix_critical: 0,
    fix_strikeback: 0,
    fix_accurancy: 0,
    fix_dodge: 0,
    element_earth: 50,
    element_water: 0,
    element_fire: 0,
    element_wind: 50,
    manu_endurance: 50,
    manu_skillful: 50,
    manu_intelligence: 50,
    value_charisma: 82
  },
  persdesc: {
    sell_icon: 0,
    sell_string: '未设定',
    buy_icon: 0,
    buy_string: '未设定',
    want_icon: 0,
    want_string: '未设定',
    desc_string: '未设定'
  }
}

export type PlayerUnitInfo = {
  valid: 2,
  type: 8,
  model_id: 100152,
  unit_id: 26780,
  xpos: number // 玩家x坐标。如：564,
  ypos: number // 玩家y坐标。如：232,
  item_count: 0,
  injury: 0,
  icon: 0,
  level: 7,
  flags: 256,
  unit_name: string // 玩家名称。如：'=一条柴=',
  nick_name: '',
  title_name: '',
  item_name: '鼠娃娃兑换券'
}

export type PlayerSkill = {
  
}

export interface IPlayerApi {
  GetPlayerInfo: () => PlayerInfo
  findPlayerUnit: (name: string) => PlayerUnitInfo
  findPlayerSkill: (name: string) => PlayerSkill
}
