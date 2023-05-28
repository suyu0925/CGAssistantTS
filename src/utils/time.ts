import { log } from '.'
import { cga } from '../cga'
import { isSameMap } from '../database/map'
import * as move from '../move'
import { fullSupply } from '../supply'

export type TimeOfDay = 'day' | 'night' | 'noon' | 'dawn' | 'twilight'

export const getTimeOfDay = (): TimeOfDay => {
  const lineIndex = cga.GetMapIndex().index2
  // 现实中的2小时为游戏中的一天
  // 以1线为基准。2线比1线推迟10分钟。
  // 观察：
  // 这里记录的时间都是比真实时间+6分钟的，电脑的时间有问题。
  // 1线：
  //    01:45-02:00为黎明，可以进灵堂
  //    12:45-13:00为黄昏，可以进灵堂
  //    13:00-13:45为晚上，可以进魔女之家
  //    14:00-14:45为白天
  // 2线：
  //    12:46-13:01为黄昏，可以进灵堂。似乎与1线差1分钟
  // 3线：
  //    13:15-13:30为黄昏，可以进灵堂。似乎与1线差了30分钟
  // 各线时间差别：
  //    第一组：1、2、7
  //    第二组：3、4、5、9、10
  // 第二组的时间相当于第一组的时间 - 30分。
  // 根据经验，2、3线比如好登录。两个服务器差30分钟，这样做任务就灵活多了。
  const oddHours = !!(new Date().getHours() % 2)
  const minutes = new Date().getMinutes()
  throw new Error('not implemented')
}

export const waitForDayOfTime = async (time: TimeOfDay) => {
  while (getTimeOfDay() !== time) {
    await cga.delay(1000)
  }
}

export type ObserveTimeOptions = {
  name: string
  travel: () => Promise<void>
  npc: string
}

export const observeTime = async (options: ObserveTimeOptions) => {
  await fullSupply()
  await options.travel()
  log(`开始监控${options.name}开门时间：`)

  let isOpened = !!cga.findNPC(options.npc)
  log(`[${cga.GetMapIndex().index2}线]${options.name}开启: ${isOpened}`)
  while (true) {
    const newIsOpened = !!cga.findNPC(options.npc)
    if (isOpened !== newIsOpened) {
      isOpened = newIsOpened
      log(`[${cga.GetMapIndex().index2}线]${options.name}开启: ${isOpened}`)
    }
    await cga.delay(1000)
  }
}

export const observeLingtangTime = async () => {
  observeTime({
    name: '灵堂',
    travel: async () => {
      if (cga.GetMapName() === '灵堂') {
        await move.walkList([
          [9, 8, undefined],
        ])
      } else {
        await move.falan.toCastle()
        await move.walkList([
          [47, 85, '召唤之间'],
          [27, 8, '回廊'],
          [23, 19, '灵堂'],
          [9, 8, undefined],
        ])
      }
    },
    npc: '士兵伊岱鲁',
  })
}

export const observeShenmu = async () => {
  observeTime({
    name: '魔女之家',
    travel: async () => {
      if (isSameMap(move.getCurrentMap(), '芙蕾雅西边')) {
        await move.walkList([
          [298, 148, undefined],
        ])
      } else {
        await move.falan.toStone('W')
        await move.walkList([
          [22, 88, '芙蕾雅西边'],
          [298, 148, undefined],
        ])
      }
    },
    npc: '神木',
  })
}
