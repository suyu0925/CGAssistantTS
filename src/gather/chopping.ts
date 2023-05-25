import { prepare } from '.'
import { HealthStatus, cga } from '../cga'
import * as item from '../item'
import * as move from '../move'
import { cureByself } from '../supply/injury'
import { log } from '../utils'

export enum ChopType {
  Wood = 1,
  Vanilla = 2,
}

const ChoppingProducts = [
  { name: '竹子', type: ChopType.Wood, station: { name: '芙蕾雅', x: 483, y: 192 }, level: 0 },
  { name: '孟宗竹', type: ChopType.Wood, station: { name: '芙蕾雅', x: 483, y: 192 }, level: 0 },
  { name: '印度轻木', type: ChopType.Wood, station: { name: '芙蕾雅西边', x: 362, y: 184 }, level: 1 },

  { name: '柠檬草', type: ChopType.Vanilla, station: { name: '芙蕾雅西边', x: 500, y: 85 }, level: 1 },
]

const waitForBagFullSafely = async () => {
  while (true) {
    if (cga.GetPlayerInfo().health !== HealthStatus.Normal) {
      if (!await cureByself()) {
        log(`受伤治不好了，回城吧！`)
        break
      } else {
        log(`治疗成功，继续伐木`)
        const skill = cga.findPlayerSkill('伐木')
        cga.StartWork(skill.index, 0)
      }
    }

    if (item.isBagFull() || cga.GetPlayerInfo().mp <= 10) {
      log(`没魔了，回城吧！`)
      break
    }

    await cga.delay(1000)
  }
}

const chopZhuzi = async () => {
  await prepare()

  // 去竹子点砍满包
  await move.falan.toStone('E')
  await move.walkList([
    [281, 88, '芙蕾雅'],
    [483, 192, undefined],
  ])
  const skill = cga.findPlayerSkill('伐木体验')
  cga.StartWork(skill.index, 0)
  while (!item.isBagFull() && cga.GetPlayerInfo().mp > 10) {
    await cga.delay(1000)
  }
}

const chopYinduQingmu = async () => {
  await prepare()

  // 去印度轻木点砍满包
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [362, 184, undefined],
  ])
  const skill = cga.findPlayerSkill('伐木')
  cga.StartWork(skill.index, 0)

  await waitForBagFullSafely()
}

const chopWood = async (level: number) => {
  if (level === 1) {
    await chopYinduQingmu()
  } else {
    throw new Error('not implemented')
  }
}

const chopLemonGrass = async () => {
  await prepare()

  // 去柠檬草点砍满包
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [500, 85, undefined],
  ])
  const skill = cga.findPlayerSkill('伐木')
  cga.StartWork(skill.index, 0)

  await waitForBagFullSafely()
}

const chopVanilla = async (level: number) => {
  if (level === 1) {
    await chopLemonGrass()
  } else {
    throw new Error('not implemented')
  }
}

export {
  ChoppingProducts,
  chopWood,
  chopVanilla,
}

