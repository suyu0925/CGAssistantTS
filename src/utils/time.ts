import { cga } from '../cga'

export type TimeOfDay = 'day' | 'night' | 'noon' | 'dawn' | 'twilight'

export const getTimeOfDay = (): TimeOfDay => {
  const lineIndex = cga.GetMapIndex().index2
  // 现实中的2小时为游戏中的一天
  // 以1线为基准。2线比1线推迟10分钟。
  // 观察：
  // 1线：
  //    1:45-2:00为黎明
  // 2:00-?为白天
  // 太阳和月亮正中间是几点？
  // 3线：
  //    在02:23分还能进，还算黎明。02:24分不能进了。
  //    在03:13分又出现了，算是黄昏。
  const minutes = new Date().getMinutes()
  throw new Error('not implemented')
}

export const waitForDayOfTime = async (time: TimeOfDay) => {
  while (getTimeOfDay() !== time) {
    await cga.delay(1000)
  }
}

