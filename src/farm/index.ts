import { encounter } from '../battle'
import { cga } from '../cga'
import { Stations } from '../database/map'
import * as item from '../item'
import * as move from '../move'
import * as npc from '../npc'
import { profession } from '../player'
import * as supply from '../supply'
import * as team from '../team'
import { getSettings, loadSettings, log } from '../utils'

const CommonItemDropList = [
  '#18194', // 人见人嫌的红头盔
  '#18195', // 人见人嫌的绿头盔
]

// 非战斗系不要留水晶碎片占格子
const ItemDropListForNotBattleClass = [
  '#18310', // 地的水晶碎片
  '#18311', // 水的水晶碎片
  '#18312', // 火的水晶碎片
  '#18313', // 风的水晶碎片
]

const loadingItemDropList = async () => {
  let itemDropList = CommonItemDropList
  if (!profession.isBattleClass()) {
    itemDropList = itemDropList.concat(ItemDropListForNotBattleClass)
  }
  const { itemdroplist } = await getSettings()
  await loadSettings({
    itemdroplist:
      Array.from(new Set(itemdroplist.concat(itemDropList)))
  })
}

const prepare = async () => {
  await item.trade.sellStones()
  await item.trade.buyPotions(cga.GetPlayerInfo().maxhp)
  await supply.hpmp()
  await supply.curePetsInEastHospital()

  await loadingItemDropList()
}

const shujing = async () => {
  await move.falan.toStone('E')
  await team.buildTeam(null, Stations['东门'])
  if (team.isTeamLeader()) {
    await move.walkList([
      [281, 87, '芙蕾雅'],
      [566, 233, '芙蕾雅'],
    ])
  }
}

const xiongdong = async () => {
  if (cga.GetPlayerInfo().level < 20) {
    log(`熊洞练级最低等级是20级，当前${cga.GetPlayerInfo().level}级，等级不足`)
    return
  }

  await move.falan.toStone('S')
  await move.walkList([
    [153, 241, '芙蕾雅'],
  ])
  await npc.talkToNpc('矿工潘丹', npc.DefaultDialogStrategies.Confirm)
  await team.buildTeam(null, { map: '维诺亚洞穴 地下1楼', x: 19, y: 14 })
}

const haidi = async () => {
  if (cga.GetPlayerInfo().level < 20) {
    log(`熊洞练级最低等级是20级，当前${cga.GetPlayerInfo().level}级，等级不足`)
    return
  }

  await move.falan.toStone('S')
  await move.walkList([
    [153, 241, '芙蕾雅'],
  ])
  await npc.talkToNpc('矿工潘丹', npc.DefaultDialogStrategies.Confirm)
  await team.buildTeam(null, { map: '维诺亚洞穴 地下1楼', x: 19, y: 14 })

  if (team.isTeamLeader()) {
    await move.walkList([
      [20, 59, '维诺亚洞穴 地下2楼'],
      [24, 81, '维诺亚洞穴 地下3楼'],
      [26, 64, '芙蕾雅南边'],
      [343, 497, '索奇亚海底洞窟 地下1楼'],
    ])
  }
}

const farm = async (name: string) => {
  while (true) {
    await prepare()

    log(`出发去${name}练级`)
    if (name === '树精') {
      await shujing()
    } else if (name === '熊洞') {
      await xiongdong()
    } else if (name === '海底') {
      await haidi()
    } else {
      throw new Error(`找不到练级地点：${name}`)
    }

    if (team.isTeamLeader()) {
      await encounter()
    } else {
      await team.waitForDisbanding()
    }

    if (team.isSomeoneInjured()) {
      log(`有人受伤啦，停止练级`)
      break
    }

    log(`回补，再来一次`)
  }
}

export {
  farm,
  prepare,
}

