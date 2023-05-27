import { cga } from '../cga'
import { ItemType } from '../database/item'
import * as npc from '../npc'
import * as move from '../move'
import { log } from '../utils'
import { dropLowPriceItems, prepare, waitForBagFullSafely } from './utils'

const MiningProducts = [
  { name: '铜', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
]

type MiningProduct = typeof MiningProducts[number]['name']

// 压条
const zip = async (name: MiningProduct) => {
  let npcName: string
  if (name === '铜') {
    npcName = `交换${name}`
  } else {
    log(`不支持交换${name}`)
    return
  }
  const productName = `${name}条`

  const zipCount = Math.floor(cga.getItemCount(name) / 20)
  if (zipCount === 0) {
    log(`没有要压的${productName}`)
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

export {
  mining,
  zip,
}

