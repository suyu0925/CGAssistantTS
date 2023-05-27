import { cga } from '../cga'
import { ItemType } from '../database/item'
import * as move from '../move'
import * as npc from '../npc'
import * as player from '../player'
import { log } from '../utils'
import { dropLowPriceItems, prepare, waitForBagFullSafely } from './utils'

const MiningProducts = [
  { name: '铜', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
]

type MiningProduct = typeof MiningProducts[number]['name']

// 压条
const zip = async (name: MiningProduct) => {
  let npcName: string
  if (name === '铜'
    || name === '铁'
    || name === '银'
    || name === '纯银'
    || name === '金'
    || name === '白金'
    || name === '幻之钢'
    || name === '幻之银') {
    npcName = `交换${name}`
  } else {
    log(`不支持交换${name}`)
    return
  }
  const productName = `${name}条`

  const zipCount = Math.floor(cga.getItemCount(name) / 20)
  if (zipCount === 0) {
    log(`没有要压的${productName}`)
    return
  }

  await move.falan.toStone('W')
  await move.walkList([
    [100, 61, '米克尔工房'],
  ])
  await npc.talkToNpc(npcName, npc.DefaultDialogStrategies.FirstOnce)
  cga.BuyNPCStore([{ index: 0, count: zipCount }])
  log(`压好了${productName}：${cga.getItemCount(productName)}根`)
}

const mining = async (name: MiningProduct) => {
  await prepare()

  if (name === '铜') {
    await move.falan.toStone('W')
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [351, 145, '国营第24坑道 地下1楼'],
    ])
  } else if (name === '铁') {
    await move.falan.toStone('W')
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [351, 145, '国营第24坑道 地下1楼'],
      [22, 22, '国营第24坑道 地下2楼'],
    ])
    // 身上有钥匙的话，可以直接开门通过
    await move.walkList([
      [22, 21, undefined],
    ])
    cga.turnTo(22, 20)
    await player.waitForPositionChange(22, 19)
    await move.walkList([
      [23, 13, '国营第24坑道 地下3楼'],
      [29, 3, '国营第24坑道 地下4楼 东北区'],
      [35, 37, undefined],
    ])
  } else if (name === '银') {
    await move.falan.toStone('W')
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [351, 145, '国营第24坑道 地下1楼'],
      [22, 22, '国营第24坑道 地下2楼'],
    ])
    // 身上有钥匙的话，可以直接开门通过
    await move.walkList([
      [22, 21, undefined],
    ])
    cga.turnTo(22, 20)
    await player.waitForPositionChange(22, 19)
    await move.walkList([
      [23, 13, '国营第24坑道 地下3楼'],
      [6, 3, '国营第24坑道 地下4楼 西北区'],
      [25, 20, undefined],
    ])
  } else {
    throw new Error('not implemented')
  }

  await dropLowPriceItems()

  // 停3秒再开始采集，避免因自动吃血瓶打断采集
  await cga.delay(3000)
  const skill = cga.findPlayerSkill('挖掘')
  cga.StartWork(skill.index, 0)

  await waitForBagFullSafely('挖掘')
}

// 不断的挖铜压成条，直到身上放不下
const recursiveMining = async (name: MiningProduct) => {
  while (true) {
    await zip(name)
    await mining(name)
    await zip(name)

    await cga.delay(1000) // 这里需要加延时，压完条后需要一点时间才会改变getInventoryItems
    if (cga.getInventoryItems().length > 16) {
      log('背包满了，在做好银行接口前先到此为止')
      break
    }
  }
}

export {
  mining,
  zip,
  recursiveMining,
}

