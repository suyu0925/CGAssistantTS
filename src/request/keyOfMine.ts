import { cga } from '../cga'
import * as move from '../move'
import * as npc from '../npc'
import { log } from '../utils'

export const keyOfMine = async () => {
  if (cga.getItemCount('矿山钥匙') !== 0) {
    log(`已经持有矿山钥匙`)
    return
  }

  // 1. 去灵堂监狱拿“给好朋友的信”
  await move.falan.toCastle()
  await move.walkList([
    [47, 85, '召唤之间'],
    [27, 8, '回廊'],
    [23, 19, '灵堂'],
    [7, 52, '灵堂地下牢房'],
  ])
  await npc.talkToNpc('乔尔凯夫', npc.DefaultDialogStrategies.Confirm)

  // 2. 去法兰城仓库找德米特夫拿矿山钥匙
  await move.falan.toStone('W')
  await move.walkList([
    [61, 63, '仓库内部'],
  ])
  await npc.talkToNpc('德米特夫', npc.DefaultDialogStrategies.Confirm)

  // 3. 拿到钥匙
  while (cga.getItemCount('矿山钥匙') !== 1) {
    await cga.delay(1000)
  }
  log(`拿到矿山钥匙，任务完成`)
}
