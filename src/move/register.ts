import { Stations } from '../database/map'
import * as npc from '../npc'
import { log } from '../utils'
import * as move from './'
import * as team from '../team'

// 开通伊尔村传送石
const yier = async (withTeam?: boolean) => {
  const travel = async () => {
    await move.walkList([
      [281, 87, '芙蕾雅'],
      [681, 343, '伊尔村'],
      [47, 83, '伊尔村长的家'],
      [14, 17, '伊尔村的传送点'],
    ])
    await npc.faceToNPC(8083)
  }

  await move.falan.toStone('E')

  if (withTeam) {
    await team.buildTeam(null, Stations['东门'])
    if (team.isTeamLeader()) {
      await travel()

      team.disbandTeam()
    } else {
      await team.waitForDisbanding()
    }
  } else {
    await travel()
  }

  await npc.talkToNpc(8083, npc.DefaultDialogStrategies.Confirm)
  log(`已开通伊尔村的传送`)
}

const register = async (name: string) => {
  if (name === '伊尔' || name === '伊尔村') {
    await yier()
  } else {
    throw new Error(`不认识的传送地点：${name}`)
  }
}

export default register
