import { cga } from '../../cga'
import * as move from '../../move'
import * as npc from '../../npc'
import { forgetSkillBy, learnSkill } from '../../player/skill'
import { log } from '../../utils'

const getMengZongZhuCount = () => {
  const items = cga.getInventoryItems()
  const count = items
    .filter(i => i.name === '孟宗竹')
    .reduce((acc, cur) => {
      acc += cur.count
      return acc
    }, 0)
  return count
}

/**
 * 没有实现断点续做，只能从头一次性做到尾。
 * 樵夫就职只有东门一小段路要走，运气好1级就能完成。
 * 注意任务NPC只有白天出现。
 */
export const incomingWoodcutter = async () => {
  // 1. 学习伐木体验
  await move.falan.toStone('E')
  await move.walkList([
    [195, 50, '职业介绍所'],
  ])
  await learnSkill('伐木体验')

  // 2. 砍20个孟宗竹
  await move.falan.toStone('E')
  await move.walkList([
    [281, 88, '芙蕾雅'],
    [483, 192, undefined],
  ])
  const skill = cga.findPlayerSkill('伐木体验')
  cga.StartWork(skill.index, 0)
  while (getMengZongZhuCount() < 20) {
    await cga.delay(1000)
  }
  // TODO: 怎么停止伐木呢？不会呢，只能直接回城

  // 3. 将孟宗竹换成手斧
  await move.falan.toStone('S')
  await move.walkList([
    [216, 148, '艾文蛋糕店'],
  ])
  await npc.talkToNpc('蛋糕店的艾文', npc.DefaultDialogStrategies.Confirm)

  // 4. 在白天，将手斧换成树苗
  await move.falan.toStone('S')
  await move.walkList([
    [106, 190, undefined],
  ])
  await npc.waitForNpc('樵夫弗伦')
  await npc.talkToNpc('樵夫弗伦', npc.DefaultDialogStrategies.Confirm)

  // 5. 在中午时，将树苗换水色的花？
  await move.falan.toStone('W')
  await move.walkList([
    [133, 36, undefined],
  ])
  await npc.waitForNpc('种树的阿姆罗斯')
  await npc.talkToNpc('种树的阿姆罗斯', npc.DefaultDialogStrategies.Confirm)

  // 6. 将水色的花换成木材？
  await move.falan.toStone('S')
  await move.walkList([
    [106, 190, undefined],
  ])
  await npc.waitForNpc('樵夫弗伦')
  await npc.talkToNpc('樵夫弗伦', npc.DefaultDialogStrategies.Confirm)

  // 7. 将木材？换成饼干
  await move.falan.toStone('S')
  await move.walkList([
    [216, 148, '艾文蛋糕店'],
  ])
  await npc.talkToNpc('蛋糕店的艾文', npc.DefaultDialogStrategies.Confirm)
  
  // 8. 用饼干换樵夫推荐信
  await move.falan.toStone('S')
  await move.walkList([
    [106, 190, undefined],
  ])
  await npc.waitForNpc('樵夫弗伦')
  await npc.talkToNpc('樵夫弗伦', npc.DefaultDialogStrategies.Confirm)

  // 9. 去职业介绍所找樵夫荷拉巴斯就职
  await move.falan.toStone('E')
  await move.walkList([
    [195, 50, '职业介绍所'],
  ])
  await npc.talkToNpc('樵夫荷拉巴斯', [npc.DefaultDialogStrategies.FirstOnce, npc.DefaultDialogStrategies.ConfirmOnce])

  // 10. 把伐木体验换成正牌的伐木
  await move.falan.toStone('E')
  await move.walkList([
    [281, 88, '芙蕾雅'],
    [509, 153, '山男的家'],
  ])
  await forgetSkillBy('伐木体验', '山男波波思')
  await learnSkill('伐木')

  // 11. 学习急救和治伤
  await move.falan.toEastHospital()
  await learnSkill('急救')
  await learnSkill('治疗')

  log(`就职樵夫结束`)
}
