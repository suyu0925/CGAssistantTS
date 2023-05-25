import { cga } from '../cga'
import { Stations } from '../database/map'
import * as item from '../item'
import * as move from '../move'
import { profession } from '../player'
import * as supply from '../supply'
import * as team from '../team'
import { getSettings, loadSettings } from '../utils'
import { shujing } from './shujing'

const CommonItemDropList = [
  '#18195', // 人见人嫌的绿头盔
]

// 非战斗系不要留水晶碎片占格子
const ItemDropListForNotBattleClass = [
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

  await loadingItemDropList()
}

const farm = async (name: string) => {
  await prepare()

  if (name === '树精') {
    await move.falan.toStone('E')
    await team.buildTeam(null, Stations['东门'])
    if (team.isTeamLeader()) {
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

