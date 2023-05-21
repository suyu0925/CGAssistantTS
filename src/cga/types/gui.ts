export type BattleAction = {
  "condition": 0,
  "condition2": 0,
  "condition2rel": 0,
  "condition2val": "",
  "conditionrel": 0,
  "conditionval": "",
  "index": 0,
  "petaction": 100,
  "petskillname": "攻击",
  "pettarget": 0,
  "pettargetsel": 0,
  "playeraction": 1,
  "playertarget": 0,
  "playertargetsel": 0
}

export type GuiSetting = {
  battle: Partial<{
    autobattle: true,
    beep: false,
    bossprot: false,
    delayfrom: number, // 每回合自动战斗额外等待时间
    delayto: number, // 战斗结束后强制等待时间
    highspeed: false,
    list: BattleAction[],
    lockcd: false,
    lv1prot: false,
    pet2action: false,
    r1nodelay: true,
    waitafterbattle: false
  }>,
  chat: {},
  itemdroplist: [],
  itemidmap: {},
  itemtweaklist: ['火的水晶碎片|999', '水的水晶碎片|999', '风的水晶碎片|999', '地的水晶碎片|999'],
  player: Partial<{
    antiafkkick: boolean, // 是否打开：说话防掉线
    autosupply: boolean, // 是否打开：自动补给
    gametextui: false, // 是否打开：显示游戏内文本
    movespd: number, // 移动速度，100为100%，超过105会被踢
    noswitchanim: false,
    petfood: false, // 是否打开：宠吃料理
    petfoodat: '0',
    petmed: true, // 是否打开：宠吃药水
    petmedat: '40',
    usefood: false, // 是否打开：人吃料理
    usefoodat: '0',
    usemed: true, // 是否打开：人吃药水
    usemedat: '100', // 人血瓶血量，可以是绝对值也可以是百分比，比如'150'和'50%'
    workacc: 100,
    workdelay: number // 采集时间，6500为默认值
  }>
}

export interface IGuiApi {
  gui: {
    GetSettings: () => GuiSetting
    LoadSettings: (settings: Partial<GuiSetting>, cb: (err: Error, result: GuiSetting) => void) => void
  }
}
