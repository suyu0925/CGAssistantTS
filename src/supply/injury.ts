import { HealthStatus, cga } from '../cga'
import { awaitWorkingResult, waitPlayerMenu, waitUnitMenu } from '../player'
import { log } from '../utils'

export const cureByself = async (): Promise<boolean> => {
  if (cga.GetPlayerInfo().health !== HealthStatus.Normal) {
    const cureSkill = cga.findPlayerSkill('治疗')
    if (!cureSkill) {
      log(`没有治疗技能，无法自己治疗`)
      return false
    }
    if (cga.GetPlayerInfo().health > HealthStatus.Yellow) {
      log(`紫色以上的伤势无法自己治疗`)
      return false
    }

    while (true) {
      const requireMp = 25 + cureSkill.lv * 5 // 1级治疗需要30魔，2级不知道
      if (cga.GetPlayerInfo().mp < requireMp) {
        log(`魔不足，无法自己治疗`)
        return false
      }
      // 点开治疗技能
      cga.StartWork(cureSkill.index, cureSkill.lv - 1)
      // 选择玩家
      const players = await waitPlayerMenu()
      // 自己总是第一个
      cga.PlayerMenuSelect(0)
      // 选择人或宠
      const units = await waitUnitMenu()
      // 自己总是第一个
      cga.UnitMenuSelect(0)
      // 等待治疗完成
      const result = await awaitWorkingResult()
      if (result.success) {
        return true
      }
    }
  } else {
    return true
  }
}
