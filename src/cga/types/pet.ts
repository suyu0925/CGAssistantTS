import { HealthStatus } from './player'

export type PetId = number

export type PetInfo = {
  name: string // 玩家取的宠物名。如果没改过名，为空字符串''
  realname: string // 宠物名称。如：'小蝙蝠'
  level: number // 等级。如：5
  race: number // 种族。如：3
  loyality: number // 忠诚度。如：60
  skillslots: number // 技能栏的数量。如：10
  health: HealthStatus // 健康状态，如：0 
  hp: number // 当前血量。如：84
  maxhp: 159,
  mp: 164,
  maxmp: 194,
  xp: 783,
  maxxp: 1296,
  flags: 65537,
  battle_flags: 2,
  state: 2,
  index: 0,
  detail: {
    points_remain: 1,
    points_endurance: 4,
    points_strength: 14,
    points_defense: 7,
    points_agility: 12,
    points_magical: 9,
    value_attack: 68,
    value_defensive: 53,
    value_agility: 51,
    value_spirit: 105,
    value_recovery: 101,
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
    element_earth: 60,
    element_water: 40,
    element_fire: 0,
    element_wind: 0
  }
}

export type PetState =
  | 1 // 待命
  | 2 // 战斗
  | 3 // 休息
  | 16 // 宠物散步

export interface IPetApi {
  GetPetInfo: (petId: PetId) => PetInfo
  ChangePetState: (pos: number, state: PetState) => void
}
