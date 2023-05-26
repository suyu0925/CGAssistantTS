import { cga } from '../cga'
import * as move from '../move'
import { dropLowPriceItems, prepare, waitForBagFullSafely } from './utils'

export enum ChopType {
  Wood = 1,
  Vanilla = 2,
}

const ChoppingProducts = [
  { name: '竹子', type: ChopType.Wood, station: { name: '芙蕾雅', x: 483, y: 192 }, level: 0 },
  { name: '孟宗竹', type: ChopType.Wood, station: { name: '芙蕾雅', x: 483, y: 192 }, level: 0 },
  { name: '印度轻木', type: ChopType.Wood, station: { name: '芙蕾雅西边', x: 362, y: 184 }, level: 1 },

  { name: '苹果薄荷', type: ChopType.Vanilla, station: { name: '芙蕾雅西边', x: 500, y: 85 }, level: 1 },
  { name: '柠檬草', type: ChopType.Vanilla, station: { name: '芙蕾雅西边', x: 515, y: 100 }, level: 2 },
  { name: '蝴蝶花', type: ChopType.Vanilla, station: { name: '芙蕾雅西边', x: 503, y: 118 }, level: 3 },
]

const chopZhuzi = async () => {
  // 去竹子点砍满包
  await move.falan.toStone('E')
  await move.walkList([
    [281, 88, '芙蕾雅'],
    [483, 192, undefined],
  ])
  const skill = cga.findPlayerSkill('伐木体验')
  cga.StartWork(skill.index, 0)
}

const chopYinduQingmu = async () => {
  // 去印度轻木点砍满包
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [362, 184, undefined],
  ])
  const skill = cga.findPlayerSkill('伐木')
  cga.StartWork(skill.index, 0)
}

const chopWood = async (level: number) => {
  await prepare()

  if (level === 1) {
    await chopYinduQingmu()
  } else {
    throw new Error('not implemented')
  }

  await waitForBagFullSafely('伐木')
}

const chopVanilla = async (level: number) => {
  await prepare()

  if (level === 1) {
    // 去苹果薄荷砍满包
    await move.falan.toStone('W')
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [500, 85, undefined],
    ])
  } else if (level === 2) {
    // 去柠檬草点砍满包
    await move.falan.toStone('W')
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [515, 100, undefined],
    ])
  } else if (level === 3) {
    // 去蝴蝶点砍满包
    await move.falan.toStone('W')
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [503, 118, undefined],
    ])
  } else {
    throw new Error('not implemented')
  }

  await dropLowPriceItems()

  // 停3秒再开始采集，避免因自动吃血瓶打断采集
  await cga.delay(3000)
  const skill = cga.findPlayerSkill('伐木')
  cga.StartWork(skill.index, 0)

  await waitForBagFullSafely('伐木')
}

export {
  ChoppingProducts,
  chopWood,
  chopVanilla,
}

