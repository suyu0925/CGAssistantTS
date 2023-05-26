import { cga } from '../cga'
import { Stations } from '../database/map'
import * as npc from '../npc'
import * as team from '../team'
import { log } from '../utils'
import * as move from './'

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

// 开通维诺亚村的传送
const weinuoya = async (withTeam?: boolean) => {
  if (cga.GetPlayerInfo().level < 20) {
    log(`战斗系走熊洞去维诺亚村的最低等级是20级，当前${cga.GetPlayerInfo().level}级，等级不足`)
    return
  }

  const travel = async () => {
    await move.walkList([
      [20, 59, '维诺亚洞穴 地下2楼'],
      [24, 81, '维诺亚洞穴 地下3楼'],
      [26, 64, '芙蕾雅南边'],
      [330, 480, '维诺亚村'],
      [40, 36, '维村村长的家'],
      [18, 10, '维村村长家的小房间'],
      [8, 2, '维诺亚村的传送点'],
    ])
    await npc.faceToNPC(8645)
  }

  await move.falan.toStone('S')
  await move.walkList([
    [153, 241, '芙蕾雅'],
  ])
  await npc.talkToNpc('矿工潘丹', npc.DefaultDialogStrategies.Confirm)

  if (withTeam) {
    await team.buildTeam(null, { map: '维诺亚洞穴 地下1楼', x: 19, y: 14 })

    if (team.isTeamLeader()) {
      await travel()

      team.disbandTeam()
    } else {
      await team.waitForDisbanding()
    }
  } else {
    await travel()
  }

  await npc.talkToNpc(8645, npc.DefaultDialogStrategies.Confirm)
  log(`已开通维诺亚村的传送`)
}

// 开通圣拉鲁卡村传送
const shengcun = async (withTeam?: boolean) => {
  const travel = async () => {
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [134, 218, '圣拉鲁卡村'],
      [49, 81, '圣村村长的家'],
      [8, 10, '圣拉鲁卡村的传送点'],
    ])
    await npc.faceToNPC(8051)
  }

  await move.falan.toStone('S')
  await team.buildTeam(null, Stations['南门'])

  if (withTeam) {
    if (team.isTeamLeader()) {
      await travel()

      team.disbandTeam()
    } else {
      await team.waitForDisbanding()
    }
  } else {
    await travel()
  }

  await npc.talkToNpc(8051, npc.DefaultDialogStrategies.Confirm)
  log(`已开通圣拉鲁卡村的传送`)
}

const register = async (name: string) => {
  if (name === '伊尔' || name === '伊尔村') {
    await yier()
  } else if (name === '维诺亚' || name === '维村') {
    await weinuoya()
  } else if (name === '圣村' || name === '圣拉鲁卡村') {
    await shengcun()
  } else {
    throw new Error(`不认识的传送地点：${name}`)
  }
}

export default register
