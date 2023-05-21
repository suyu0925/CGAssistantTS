export type TeamPlayerInfo = {
  // TODO:
}

export interface ITeamApi {
  isTeamLeader: boolean
  getTeamPlayers: () => TeamPlayerInfo[]
  isTeamLeaderEx: () => boolean
}
