export type Injury =
  | 0 // 无伤

export type TeamPlayerInfo = {
  unit_id: number // 人物id。如：16759
  hp: number
  maxhp: number
  mp: number
  maxmp: number
  xpos: number
  ypos: number
  name: string // 人物名称。如：'=两条柴=',
  nick: string // 人物昵称。如：''
  injury: Injury, // 受伤状态。如：0。代表健康
  level: number // 人物等级。如：7
}

export interface ITeamApi {
  isTeamLeader: boolean
  getTeamPlayers: () => TeamPlayerInfo[]
  isTeamLeaderEx: () => boolean
}
