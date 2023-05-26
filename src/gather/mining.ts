import { cga } from '../cga'
import { ItemType } from '../database/item'
import { prepare } from '../farm'
import * as move from '../move'
import { dropLowPriceItems, waitForBagFullSafely } from './utils'

const MiningProducts = [
  { name: '铜', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
]

type MiningProduct = typeof MiningProducts[number]['name']

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
}

