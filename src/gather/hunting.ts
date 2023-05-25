import { cga } from '../cga'
import { ItemType } from '../database/item'
import { prepare } from '../farm'
import * as move from '../move'
import { waitForBagFullSafely } from './utils'

const HuntingProducts = [
  { name: '番茄', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
  { name: '鸡蛋', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
]

const hunting = async (name: string) => {
  await prepare()

  if (name === '番茄') {
    await move.falan.toStone('E')
    await move.walkList([
      [281, 88, '芙蕾雅'],
      [551, 163, undefined],
    ])
    const skill = cga.findPlayerSkill('狩猎')
    cga.StartWork(skill.index, 0)
  } else {
    throw new Error('not implemented')
  }

  await waitForBagFullSafely('狩猎')
}

export {
  hunting,
}

