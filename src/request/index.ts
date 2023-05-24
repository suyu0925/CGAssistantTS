import { talkToNpc } from "../npc"
import { DefaultDialogStrategies } from "../npc/dialog"
import { loadSettings } from "../utils"
import * as battle from '../battle'
import * as move from '../move'
import * as profession from './profession'

// 死者的戒指
const ringOfDeath = async () => {
  // 开启自动战斗
  await loadSettings(battle.settings.NormalAttack)

  // 1. 接任务
  await talkToNpc('王宫召唤士盖兹', DefaultDialogStrategies.Confirm)
  // 接完任务有可能被传送珐回廊，也有可能不会
  if (!await move.waitForMapChanged('回廊')) {
    await move.walkList([[27, 8, '回廊']])
  }

  // 2. 拿死者的戒指
  await move.walkList([[23, 19, '灵堂']])
  await talkToNpc('测试者', DefaultDialogStrategies.Confirm)

  // 3. 拿回给王宫召唤士盖兹
  await move.walkList([
    [31, 48, '回廊'],
    [44, 15, '召唤之间'],
  ])
  await talkToNpc('王宫召唤士盖兹', DefaultDialogStrategies.Confirm)

  // TODO: 需补充NPC国王和士兵亚瑟尔，以及地图偈见之间和里谢里雅堡 2楼
  // 4. 拿给国王，交换赏赐状
  await move.waitForMapChanged('偈见之间')
  await talkToNpc('国王', DefaultDialogStrategies.Confirm)

  // 5. 拿给士兵，得到宠物
  await move.walkList([
    [8, 19, '里谢里雅堡 2楼'],
    [47, 78, ''], // 士兵面前
  ])
  await talkToNpc('士兵亚瑟尔', DefaultDialogStrategies.Confirm)
}

const doRequest = async (requestName: string) => {
  switch (requestName) {
    case '死者的戒指':
      await ringOfDeath()
      break
    case '就职药剂师':
      await profession.incomingPharmacist()
      break
    default:
      throw new Error(`未知的任务名：${requestName}`)
  }
}

export {
  doRequest,
}
