import { InventoryItem, cga } from '../cga'
import { log } from '../utils'
import { Dialog } from '../cga/types/dialog'
import { Items } from '../database/item'
import * as move from '../move'
import * as npc from '../npc'

// 获得背包中血瓶的累计回复量
const getPotionRecoveryAmount = (): number => {
  return cga.getInventoryItems()
    .filter(item => item.name.startsWith('生命力回复药'))
    .map(item => parseInt(item.name.match(/^生命力回复药（(\d+)）/)[1]) * item.count)
    .reduce((acc, cur) => acc + cur, 0)
}

const buyPotions = async (amount: number) => {
  const shortage = amount - getPotionRecoveryAmount()
  if (shortage <= 0) {
    return
  }

  const count = Math.min(Math.ceil(shortage / 75), Math.floor(cga.GetPlayerInfo().gold / 75))
  if (count === 0) {
    log('没钱买药')
    return
  }
  log(`买${count}瓶药`)
  const targetAmount = getPotionRecoveryAmount() + count * 75

  await move.falan.toEastHospital()
  await npc.talkToNpc('药剂师波洛姆', npc.DefaultDialogStrategies.FirstOnce)
  cga.BuyNPCStore([{ index: 0, count, }])

  let retry = 0
  while (getPotionRecoveryAmount() !== targetAmount && retry < 5) {
    await cga.delay(1000)
    retry += 1
  }
  if (retry === 5) {
    log(`买药失败，当前血瓶回复量: ${getPotionRecoveryAmount()}，目标回复量是${targetAmount}`)
  }
}

const getSellStoneItems = () => {
  return cga.getInventoryItems()
    .filter(item => item.name === '魔石' || item.name === '锥形水晶')
    .map(item => ({
      itempos: item.pos,
      itemid: item.itemid,
      count: 1,
    }))
}

export const getSellPosionItems = () => {
  return cga.getInventoryItems()
    .filter(item => item.name.startsWith('生命力回复药') && item.name !== '生命力回复药（75）' && item.count === 3)
    .map(item => ({
      itempos: item.pos,
      itemid: item.itemid,
      count: 1,
    }))
}

const sellPosions = async () => {
  if (getSellPosionItems().length === 0) {
    log('没有药水要卖')
    return
  }
  await move.falan.toEastHospital()
  let dlg = await npc.talkToNpc('药剂师波洛姆')
  const numOpt = dlg.message.charAt(dlg.message.length - 1)
  cga.ClickNPCDialog(0, numOpt == '3' ? 1 : 0)

  dlg = await npc.waitNPCDialog()
  cga.SellNPCStore(getSellPosionItems())

  while (getSellPosionItems().length > 0) {
    await cga.delay(1000)
  }
  log('卖完药瓶啦')
}

export const sellNpcStone = async (dlg: Dialog) => {
  const numOpt = dlg.message.charAt(dlg.message.length - 1)
  cga.ClickNPCDialog(0, numOpt == '3' ? 1 : 0)

  dlg = await npc.waitNPCDialog()
  cga.SellNPCStore(getSellStoneItems())

  // 有时候会卡在这里，设个最大重试次数吧
  let retry = 0
  while (getSellStoneItems().length > 0 && retry < 3) {
    await cga.delay(1000)
    retry += 1
  }

  if (getSellStoneItems().length > 0) {
    log(`卡住了，没卖成`)
  } else {
    log('卖完魔石啦')
  }
}

const getSellCount = (item: InventoryItem) => {
  const itemDb = Items.find(i => i.name === item.name)
  // 无法堆叠的物品，卖店组数为1
  if (itemDb.maxStackCount <= 1) {
    return 1
  } else {
    if (itemDb.sellStackCount) {
      return Math.floor(item.count / itemDb.sellStackCount)
    } else {
      throw new Error(`物品${item}允许堆叠，但未给出卖店折叠数`)
    }
  }
}

const sellNpcItems = async (dlg: Dialog, filter: (item: InventoryItem) => boolean) => {
  const numOpt = dlg.message.charAt(dlg.message.length - 1)
  cga.ClickNPCDialog(0, numOpt == '3' ? 1 : 0)

  dlg = await npc.waitNPCDialog()
  const itemsForSell = cga.getInventoryItems()
    .filter(filter)
    .map(item => ({
      itempos: item.pos,
      itemid: item.itemid,
      count: getSellCount(item),
    }))
  cga.SellNPCStore(itemsForSell)

  while (cga.getInventoryItems().filter(filter).length > 0) {
    await cga.delay(1000)
  }
}

const sellStones = async () => {
  if (getSellStoneItems().length === 0) {
    log('没有东西要卖')
    return
  }
  if (cga.GetMapName() !== '法兰城' || cga.getDistance(155, 125, cga.GetMapXY().x, cga.GetMapXY().y) > 30) {
    await move.falan.toStone('S')
  }
  await move.walkList([[155, 125, '法兰城']])
  const dlg = await npc.talkToNpc('平民防具贩售处')
  await sellNpcStone(dlg)
}

const sellItems = async (items: string[]) => {
  const filter = (item: InventoryItem) => {
    const itemDb = Items.find(i => i.name === item.name)
    if (!itemDb) {
      // 不在道具数据库中的物品不卖
      return false
    }
    if (itemDb.sellPrice <= 0) {
      // 数据库里没标价格的不卖
      return false
    }
    if (itemDb.sellStackCount && item.count < itemDb.sellStackCount) {
      // 不到卖店数量的不卖
      return false
    }
    return items.includes(item.name)
  }
  const filteredItems = cga.getInventoryItems().filter(filter)
  if (filteredItems.length === 0) {
    log(`没有${items}要卖`)
    return
  } else {
    log(`要卖${filteredItems.length}组${items}`)
  }
  if (cga.GetMapName() !== '法兰城' || cga.getDistance(155, 125, cga.GetMapXY().x, cga.GetMapXY().y) > 30) {
    await move.falan.toStone('S')
  }
  await move.walkList([[155, 125, '法兰城']])
  const dlg = await npc.talkToNpc('平民防具贩售处')
  await sellNpcItems(dlg, filter)
  log(`卖完${items}啦`)
}

export {
  sellPosions,
  sellItems,
  sellStones,
  getPotionRecoveryAmount,
  buyPotions,
}
