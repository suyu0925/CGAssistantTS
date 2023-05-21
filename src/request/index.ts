import { talkToNpc } from "../npc"
import { DefaultDialogStrategies } from "../npc/dialog"
import { loadSettings } from "../utils"
import * as battle from '../battle'

// TODO: dehydrate request resolver to simple config
// 死者的戒指
const ringOfDeath = async () => {
  // 开启自动战斗
  await loadSettings(battle.settings.NormalAttack)
  // 1. 接任务
  await talkToNpc('王宫召唤士盖兹', DefaultDialogStrategies.Confirm)
  // 2. 拿死者的戒指
  await talkToNpc('测试者', DefaultDialogStrategies.Confirm)
  // 3. 拿给国王，交换赏赐状

  // 4. 拿给士兵，得到宠物
}

export {
  ringOfDeath,
}
