import { HealthStatus, cga } from '../cga'
import { isSameMap } from '../database/map'
import { getCurrentMap } from '../move'
import { talkToNpc } from '../npc'
import { waitWorkingResult, waitPlayerMenu, waitUnitMenu } from '../player'
import { log } from '../utils'

// 东医治疗宠物
export const curePetsInEastHospital = async () => {
  const injuredPetsIndex = cga.GetPetsInfo()
    .filter(pet => pet.health !== HealthStatus.Normal)
    .map(pet => pet.index)

  if (injuredPetsIndex.length === 0) {
    log(`没有受伤的宠物`)
    return
  }

  if (!isSameMap(getCurrentMap(), '东医')) {
    log(`请先走到东医`)
    return
  }

  const dlg = await talkToNpc('贝特里夫医师')
  // Health | LV | 治疗对象 | Gold
  //     0  | 29 | =两片帆= |    0
  //     58 | 30 | 使魔     |    0
  // {
  //   type: 19,
  //   options: 0,
  //   dialog_id: 336,
  //   npc_id: 9256,
  //   message: '29|0|=两片帆=|0|30|58|使魔|0'
  // }
  // log(dlg)
  cga.ClickNPCDialog(0, 1 + injuredPetsIndex[0])

  if (injuredPetsIndex.length > 1) {
    await curePetsInEastHospital()
  }
}

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
      // 点开治疗技能，选最高级的治疗
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
      const result = await waitWorkingResult()
      if (result.success && cga.GetPlayerInfo().health === HealthStatus.Normal) {
        return true
      }
    }
  } else {
    return true
  }
}
