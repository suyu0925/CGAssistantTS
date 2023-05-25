import { InventoryItem, cga } from '../cga'
import { Dialog } from '../cga/types/dialog'
import { Items } from '../database/item'
import * as move from '../move'
import * as npc from '../npc'
import { log } from '../utils'

const ItemWeakListSettings = {
  itemtweaklist: [
    '地的水晶碎片|999',
    '水的水晶碎片|999',
    '火的水晶碎片|999',
    '风的水晶碎片|999',
    '神之金|20',
    '龙角|20',
    '隐秘的徽记（地）|20',
    '隐秘的徽记（水）|20',
    '隐秘的徽记（火）|20',
    '隐秘的徽记（风）|20',
    '阿尔卡迪亚古钱|999',
    '魔族的水晶|5',
    '钢骑之矿|5',
    '德特家的布|5',
    '誓言之证|5',
    '能量结晶|99',
    '巨石|20',
    '长老之证|7',
    '生命力回复药（75）|3',
  ]
}

const getSellStoneItems = () => {
  return cga.getInventoryItems()
    .filter(item => item.name === '魔石')
    .map(item => ({
      itempos: item.pos,
      itemid: item.itemid,
      count: Math.max(item.count, 1),
    }))
}

// 获得背包中血瓶的累计回复量
const getPotionRecoveryAmount = (): number => {
  return cga.getInventoryItems()
    .filter(item => item.name.startsWith('生命力回复药'))
    .map(item => parseInt(item.name.match(/^生命力回复药（(\d+)）/)[1]) * item.count)
    .reduce((acc, cur) => acc + cur, 0)
}

const sellNpcStone = async (dlg: Dialog) => {
  const numOpt = dlg.message.charAt(dlg.message.length - 1)
  cga.ClickNPCDialog(0, numOpt == '3' ? 1 : 0)

  dlg = await npc.waitNPCDialog()
  cga.SellNPCStore(getSellStoneItems())

  while (getSellStoneItems().length > 0) {
    await cga.delay(1000)
  }
  log('卖完魔石啦')
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
  await move.falan.toStone('S')
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
  if (cga.getInventoryItems().filter(filter).length === 0) {
    log(`没有${items}要卖`)
    return
  }

  if (cga.GetMapName() !== '法兰城' || cga.getDistance(155, 125, cga.GetMapXY().x, cga.GetMapXY().y) > 30) {
    await move.falan.toStone('S')
  }
  await move.walkList([[155, 125, '法兰城']])
  const dlg = await npc.talkToNpc('平民防具贩售处')
  await sellNpcItems(dlg, filter)
  log(`卖完${items}啦`)
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

const isBagFull = () => {
  return cga.getInventoryItems().length === 20
}

export {
  ItemWeakListSettings,
  sellItems,
  sellStones,
  getPotionRecoveryAmount,
  buyPotions,
  isBagFull,
}

