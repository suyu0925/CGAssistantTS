import { SystemFlag, cga } from '../cga'
import { Station } from '../database/map'
import * as move from '../move'
import * as player from '../player'
import { log } from '../utils'

const getDefaultTeamLeader = () => {
  const playerName = cga.GetPlayerInfo().name
  return playerName.slice(0, 1) + '一' + playerName.slice(2)
}

const waitForTeamFulfill = async () => {
  log('等待队伍人满...')
  while (cga.getTeamPlayers().length !== 5) {
    await cga.delay(1000)
  }
  log(`队伍人满：${cga.getTeamPlayers().map(p => p.name)}，开始执行任务。`)
}

const isTeamLeader = () => {
  return cga.getTeamPlayers().length > 0 && cga.getTeamPlayers()[0].name === cga.GetPlayerInfo().name
}

const buildTeam = async (teamLeader: string | null, station: Station) => {
  teamLeader = teamLeader ?? getDefaultTeamLeader()

  if (cga.GetPlayerInfo().name === teamLeader) {
    cga.EnableFlags(SystemFlag.ENABLE_FLAG_JOINTEAM, true) // 开启组队

    await move.walkToStation(station)
    await waitForTeamFulfill()
  } else {
    await move.faceToStation(station)
    log(`等待队长${teamLeader}出现`)
    await player.waitForPlayer(teamLeader)
    player.joinTeam()
    log(`加入队伍`)
  }

  cga.EnableFlags(SystemFlag.ENABLE_FLAG_TEAMCHAT, true) // 开启队聊
}

export {
  isTeamLeader,
  buildTeam
}

