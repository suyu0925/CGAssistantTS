export enum RequestType {
  REQUEST_TYPE_PK = 1,
  REQUEST_TYPE_JOINTEAM = 3,
  REQUEST_TYPE_EXCAHNGECARD = 4,
  REQUEST_TYPE_TRADE = 5,
  REQUEST_TYPE_KICKTEAM = 11,
  REQUEST_TYPE_LEAVETEAM = 12,
  REQUEST_TYPE_TRADE_CONFIRM = 13,
  REQUEST_TYPE_TRADE_REFUSE = 14,
  REQUEST_TYPE_REBIRTH_ON = 16,
  REQUEST_TYPE_REBIRTH_OFF = 17,
}

export enum SystemFlag {
  ENABLE_FLAG_PK = 0,
  ENABLE_FLAG_TEAMCHAT = 1,
  ENABLE_FLAG_JOINTEAM = 2,
  ENABLE_FLAG_CARD = 3,
  ENABLE_FLAG_TRADE = 4,
  ENABLE_FLAG_FAMILY = 5,
  ENABLE_FLAG_SHOWPETS = 6,
  ENABLE_FLAG_AVATAR_PUBLIC = 100,
  ENABLE_FLAG_BATTLE_POSITION = 101,
}

export enum WorldStatus {
  Idle = 9,
  Battle = 10,
  Offline = 11,
}

export enum GameStatus {
  Unkown = 1,
  StuckInBattle = 2,
  Idle = 3,
  ChooseBattle = 4,
  InBattle = 5,
  BattleEnd = 8,
  SwitchBattle = 11,
  SwitchMap = 202,
  SwtichMap2 = 205,
}
// * cga.GetGameStatus
// *     202 | 205  切图
// *     1 未知
// *     2 卡住战斗 4 战斗选择 5 战斗中 8 战斗结束一瞬间的状态 11 战斗切图，不能用来判断战斗，因为战斗中会有小瞬间是3空闲状态
// *     3 空闲

export interface ISystemApi {
  REQUEST_TYPE_PK: Request
  REQUEST_TYPE_JOINTEAM: Request
  REQUEST_TYPE_EXCAHNGECARD: Request
  REQUEST_TYPE_TRADE: Request
  REQUEST_TYPE_KICKTEAM: Request
  REQUEST_TYPE_LEAVETEAM: Request
  REQUEST_TYPE_TRADE_CONFIRM: Request
  REQUEST_TYPE_TRADE_REFUSE: Request
  REQUEST_TYPE_REBIRTH_ON: Request
  REQUEST_TYPE_REBIRTH_OFF: Request

  DoRequest: (request: RequestType) => void
  EnableFlags: (flag: SystemFlag, open: boolean) => void
  GetWorldStatus: () => WorldStatus
  GetGameStatus: () => GameStatus
}
