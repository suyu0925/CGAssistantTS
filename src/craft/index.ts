import { cga } from '../cga'
import * as item from '../item'
import { waitWorkingResult } from '../player'
import { supplyHpMp } from '../supply/hpmp'
import { log } from '../utils'
import * as _ from 'lodash'

const PosionCrafts = [
  { craftIndex: 0, name: '生命力回复药（100）', meterials: [{ name: '苹果薄荷', count: 10 }, { name: '柠檬草', count: 1 }], mana: 20 },
  { craftIndex: 1, name: '生命力回复药（150）', meterials: [{ name: '苹果薄荷', count: 10 }, { name: '柠檬草', count: 10 }], mana: 40 },
]

const craftPosions = async (level?: number) => {
  const skill = cga.findPlayerSkill('制药')
  if (!skill) {
    throw new Error(`玩家没有制药技能，脚本弄错了啦`)
  }
  const craftIndex = level ? level - 1 : skill.lv - 1
  const craft = PosionCrafts.find(craft => craft.craftIndex === craftIndex)
  if (!craft) {
    throw new Error(`未找到制造${craftIndex + 1}级药水的配方`)
  }
  log(`开始制造${craftIndex + 1}级药水${craft.name}`)
  while (true) {
    if (cga.GetPlayerInfo().mp < craft.mana) {
      await supplyHpMp()
    }

    if (cga.getInventoryItems().length >= 20) {
      await item.trade.sellPosions()
      if (cga.getInventoryItems().length >= 20) {
        log(`背包已满，停止制药`)
        break
      }
    }

    if (cga.StartWork(skill.index, craftIndex)) {
      const items = craft.meterials.map(meterial => cga.getInventoryItems().find(item => item.name === meterial.name && item.count >= meterial.count))
      if (_.every(items, item => !!item)) {
        cga.CraftItem(skill.index, craftIndex, 0, items.map(item => item.pos))
        const result = await waitWorkingResult()
      } else {
        log(`材料用完，停止制药`)
        break
      }
    } else {
      throw new Error(`未能成功使用${skill.lv}级制药技能制造${craftIndex + 1}级药水`)
    }
  }

}

export {
  craftPosions,
}

