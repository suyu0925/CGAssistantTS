import { Skill } from '../../player/skill'

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
  "playeraction": 1 | 100, // 1是普攻，100代表使用技能
  playerskilllevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 // 0代表使用最高级的技能
  playerskillname?: Skill
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
  itemdroplist: string[], // 自动丢弃的道具。楸式为`#${item.id}`。如：'#18047'
  itemidmap: {},
  itemtweaklist: string[] // 堆叠的道具。格式为`${item}|${number}`。如：['火的水晶碎片|999', '水的水晶碎片|999', '风的水晶碎片|999', '地的水晶碎片|999'],
  player: Partial<{
    antiafkkick: boolean // 是否打开：说话防掉线
    autosupply: boolean // 是否打开：自动补给
    gametextui: false // 是否打开：显示游戏内文本
    movespd: number // 移动速度，100为100%，超过105会被踢
    noswitchanim: false,
    petfood: boolean // 是否打开：宠吃料理
    petfoodat: '0'
    petmed: boolean // 是否打开：宠吃药水
    petmedat: string // 保持血线到多少，可为具体血量或百分比。如：'100', '30%'
    usefood: boolean // 是否打开：人吃料理
    usefoodat: '0',
    usemed: boolean // 是否打开：人吃药水
    usemedat: string // 人血瓶血量，可以是绝对值也可以是百分比，比如'150'和'50%'
    workacc: number // 人物移动速度。100为100%，超过105会被踢。建议103-104
    workdelay: number // 采集时间，6500为默认值
  }>
}

export interface IGuiApi {
  gui: {
    GetSettings: (cb: (err: Error, result: GuiSetting) => void) => void
    LoadSettings: (settings: Partial<GuiSetting>, cb: (err: Error, result: GuiSetting) => void) => void
  }
}
