import { cga } from '../cga'
import { ItemType } from '../database/item'
import * as move from '../move'
import { dropLowPriceItems, prepare, waitForBagFullSafely } from './utils'

const HuntingProducts = [
  { name: '蕃茄', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
  { name: '鸡蛋', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 551, y: 163 }, level: 1 },
  { name: '小麦粉', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 724, y: 235 }, level: 1 },
  { name: '牛奶', type: ItemType.FoodMeterial, station: { name: '芙蕾雅', x: 684, y: 334 }, level: 2 },
  {
    name: '盐', type: ItemType.FoodMeterial, station: [
      { name: '芙蕾雅', x: 715, y: 134 }, // 亚村海边，纯点
      { name: '芙蕾雅', x: 697, y: 334 }, // 伊尔海边，杂点
    ], level: 3
  },
  { name: '鹿皮', type: ItemType.Item, station: { name: '芙蕾雅', x: 596, y: 247 }, level: 1 }, // 鹿皮、蕃茄、鸡蛋混点，比例大概1：1：1
]

const hunting = async (name: string) => {
  await prepare()

  if (name === '鹿皮') {
    await move.falan.toStone('E')
    await move.walkList([
      [281, 88, '芙蕾雅'],
      [596, 247, undefined],
    ])
  } else if (name === '蕃茄') {
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
  } else if (name === '小麦粉') {
    throw new Error('not implemented')
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

const huntingOnThePost = async () => {
  const skill = cga.findPlayerSkill('狩猎')
  cga.StartWork(skill.index, 0)

  await waitForBagFullSafely('狩猎')
}

export {
  hunting,
  huntingOnThePost,
}

