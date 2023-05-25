import { HealthStatus, cga } from '../cga'
import { trade } from '../item'
import { log } from '../utils'
import { ChopType, chopVanilla, chopWood } from './chopping'
import { hunting } from './hunting'

const honeSkill = async (skill: string, subtype?: any) => {
  if (!cga.findPlayerSkill(skill)) {
    throw new Error(`没有技能：${skill}`)
  }

  while (true) {
    if (skill === '伐木') {
      if (subtype === ChopType.Wood) {
        await trade.sellItems(['印度轻木'])
        await chopWood(1)
      } else if (subtype === ChopType.Vanilla) {
        await trade.sellItems(['苹果薄荷', '柠檬草'])
        await chopVanilla(1)
      } else {
        throw new Error(`请指定伐木的ChopType`)
      }
    } else if (skill === '狩猎') {
      await trade.sellItems(['蕃茄', '鸡蛋'])
      await hunting('蕃茄')
    }

    if (cga.GetPlayerInfo().health !== HealthStatus.Normal) {
      log(`受伤了，收手吧阿祖`)
      break
    }
  }
}

export * from './utils'
export {
  honeSkill,
}

