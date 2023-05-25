import { prepare } from '.'
import { cga } from '../cga'
import * as item from '../item'
import * as move from '../move'

const LoggingProducts = [
  { name: '竹子', station: { name: '芙蕾雅', x: 483, y: 192 }, level: 0 },
  { name: '孟宗竹', station: { name: '芙蕾雅', x: 483, y: 192 }, level: 0 },
  { name: '印度轻木', station: { name: '芙蕾雅西边', x: 362, y: 184 }, level: 1 },
]

const LoggingZhuzi = async () => {
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

const LoggingYinduQingmu = async () => {
  await prepare()

  // 去印度轻木点砍满包
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [362, 184, undefined],
  ])
  const skill = cga.findPlayerSkill('伐木')
  cga.StartWork(skill.index, 0)
  while (!item.isBagFull() && cga.GetPlayerInfo().mp > 10) {
    await cga.delay(1000)
  }
}

export {
  LoggingYinduQingmu,
}
