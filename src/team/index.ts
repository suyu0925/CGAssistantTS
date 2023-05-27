import { RequestType, SystemFlag, cga } from '../cga'
import { Station } from '../database/map'
import * as move from '../move'
import { log } from '../utils'
import * as _ from 'lodash'

// 是否非战斗系全部缺魔
const isLackOfMana = () => {
  const teamPlayers = cga.getTeamPlayers()
  return teamPlayers.filter(p => p.maxmp > 400).every(p => p.mp < 40)
}

const isSomeoneInDanger = () => {
  const teamPlayers = cga.getTeamPlayers()
  return teamPlayers.some(p => p.hp < p.maxhp * 0.3)
}

const isSomeoneInjured = () => {
  const teamPlayers = cga.getTeamPlayers()
  return teamPlayers.some(p => p.injury !== 0)
}

const isInTeam = () => {
  return cga.getTeamPlayers().length > 0
}

// 将队员踢出队伍
const kickTeam = () => {
  if (isInTeam() && isTeamLeader()) {
    cga.DoRequest(RequestType.REQUEST_TYPE_KICKTEAM)
  }
}

// 加入队伍
const joinTeam = () => {
  if (!isInTeam()) {
    cga.DoRequest(RequestType.REQUEST_TYPE_JOINTEAM)
  }
}

const leaveTeam = () => {
  if (isInTeam()) {
    cga.DoRequest(RequestType.REQUEST_TYPE_LEAVETEAM)
    log('已离开队伍')
  }
}

const disbandTeam = () => {
  if (isInTeam() && isTeamLeader()) {
    cga.DoRequest(RequestType.REQUEST_TYPE_LEAVETEAM)
    log('已解散队伍')
  } else {
    log('不是队长，无法解散队伍，请使用leaveTeam单独离队')
  }
}

const getDefaultTeamLeader = () => {
  // 针对宇琴哲馨单独处理
  if (cga.GetPlayerInfo().name === '宇琴哲馨') {
    return '=一片帆='
  }
  // '=两把镐=='的名字多打了个=号
  const playerName = cga.GetPlayerInfo().name.replace('==', '=')
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

const waitForJoin = async (name: string) => {
  log(`等待队长${name}出现`)
  let waitingTicks = 0
  while (!isInTeam()) {
    const playerUnit = cga.findPlayerUnit(name)
    const mypos = cga.GetMapXY()
    if (playerUnit == null || !cga.isDistanceClose(playerUnit.xpos, playerUnit.ypos, mypos.x, mypos.y) || (playerUnit.xpos == mypos.x && playerUnit.ypos == mypos.y)) {
      waitingTicks += 1
      if ((waitingTicks % 10) === 0) {
        log(`继续等待……`)
      }
    } else {
      cga.turnTo(playerUnit.xpos, playerUnit.ypos)
      joinTeam()
    }
    await cga.delay(1000)
  }
  log(`已加入${cga.getTeamPlayers()[0].name}的队伍`)
}

const waitForDisbanding = async () => {
  while (isInTeam()) {
    await cga.delay(1000)
  }
}

const buildTeam = async (teamLeader: string | null, station: Station) => {
  teamLeader = teamLeader ?? getDefaultTeamLeader()

  if (cga.GetPlayerInfo().name === teamLeader) {
    cga.EnableFlags(SystemFlag.ENABLE_FLAG_JOINTEAM, true) // 开启组队

    await move.walkToStation(station)
    await waitForTeamFulfill()
  } else {
    await move.faceToStation(station)
    await waitForJoin(teamLeader)
  }

  cga.EnableFlags(SystemFlag.ENABLE_FLAG_TEAMCHAT, true) // 开启队聊
}

export {
  isLackOfMana,
  isSomeoneInDanger,
  isSomeoneInjured,
  isInTeam,
  joinTeam,
  disbandTeam,
  leaveTeam,
  kickTeam,
  isTeamLeader,
  buildTeam,
  waitForDisbanding,
}

