import { cga } from '../cga'
import { ItemType } from '../database/item'
import { prepare } from '../farm'
import * as move from '../move'
import { dropLowPriceItems, waitForBagFullSafely } from './utils'

const HuntingProducts = [
  { name: '蕃茄', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
  { name: '鸡蛋', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
]

const hunting = async (name: string) => {
  await prepare()

  if (name === '蕃茄') {
    await move.falan.toStone('E')
    await move.walkList([
      [281, 88, '芙蕾雅'],
      [551, 163, undefined],
    ])
  } else if (name === '鸡蛋') {
    await move.falan.toStone('E')
    await move.walkList([
      [281, 88, '芙蕾雅'],
      [551, 163, undefined],
    ])
  } else {
    throw new Error('not implemented')
  }

  await dropLowPriceItems()

  // 停3秒再开始采集，避免因自动吃血瓶打断采集
  await cga.delay(3000)
  const skill = cga.findPlayerSkill('狩猎')
  cga.StartWork(skill.index, 0)

  await waitForBagFullSafely('狩猎')
}

export {
  hunting,
}

