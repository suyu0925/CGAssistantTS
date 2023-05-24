import { cga } from '../cga'
import { Stations } from '../database/map'
import * as item from '../item'
import * as move from '../move'
import { profession } from '../player'
import * as supply from '../supply'
import * as team from '../team'
import { loadSettings } from '../utils'
import { shujing } from './shujing'

const ItemDropListSettings = {
  itemdroplist: [
  ]
}

// 非战斗系不要留水晶碎片占格子
const ItemDropListForNotBattleClassSettings = {
  itemdroplist: [
    '#18311', // 水的水晶碎片
    '#18313', // 风的水晶碎片
  ]
}

const loadingItemDropList = async () => {
  await loadSettings(ItemDropListSettings)
  if (!profession.isBattleClass()) {
    await loadSettings(ItemDropListForNotBattleClassSettings)
  }
}

const prepare = async () => {
  await item.sellStones()
  await item.buyPotions(cga.GetPlayerInfo().maxhp)
  await supply.hpmp()

  await loadingItemDropList()
}

const farm = async (name: string) => {
  await prepare()

  if (name === '树精') {
    await move.falan.toStone('E')
    await team.buildTeam(null, Stations['东门'])
    if (team.isTeamLeader) {
      await shujing()
    }
  } else {
    throw new Error(`找不到练级地点：${name}`)
  }
}

export {
  farm,
  prepare,
}

