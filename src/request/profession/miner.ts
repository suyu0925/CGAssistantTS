import { cga } from '../../cga'
import * as item from '../../item'
import * as move from '../../move'
import * as npc from '../../npc'
import { sayWords } from '../../player'
import { getPlayerProfession } from '../../player/profession'
import { forgetSkillBy, learnSkill } from '../../player/skill'
import { log } from '../../utils'

const incomingMiner = async () => {
  if (getPlayerProfession().name !== '游民') {
    log(`已有职业${getPlayerProfession().name}`)
    return
  }

  // 1. 先去圣村学`挖矿体验`技能
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [134, 218, '圣拉鲁卡村'],
    [39, 70, '赛杰利亚酒吧'],
  ])
  await learnSkill('挖掘体验')

  // 2. 去矿洞挖20个铜，不是铜条哦
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [351, 145, '国营第24坑道 地下1楼'],
  ])
  const skillIndex = cga.findPlayerSkill('挖掘体验').index
  cga.StartWork(skillIndex, 0)
  while (true) {
    if (cga.getInventoryItems().some(item => item.name === '铜' && item.count >= 20)) {
      break
    }
    await cga.delay(1000)
  }

  // 3. 去毕夫鲁之家换便当？
  await move.falan.toStone('E')
  await move.walkList([
    [206, 37, '毕夫鲁的家'],
  ])
  await npc.talkToNpc('那尔薇', npc.DefaultDialogStrategies.Confirm)

  // 4. 把便当？换矿石？和有关矿石的纸条
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [351, 145, '国营第24坑道 地下1楼'],
  ])
  await npc.talkToNpc('矿工毕夫鲁', npc.DefaultDialogStrategies.Confirm)

  // 5. 鉴定矿石？、有关矿石的纸条
  await move.falan.toStone('E')
  await move.walkList([
    [196, 78, '凯蒂夫人的店'],
    [15, 12, undefined],
  ])
  // 这一步鉴定可以跳过，直接交给鉴定师马尔弗就行
  if (false) {
    // npc.talkToNPC不支持距离两步对话。
    cga.TurnTo(17, 12)
    const dlg = await npc.waitNPCDialog()
    // 鉴定使用的是SellNPCStore函数，需要30金币。
    const stones = cga.getInventoryItems().filter(i => i.name === '矿石？').map(item => ({
      itempos: item.pos,
      itemid: item.itemid,
      count: 1,
    }))
    cga.SellNPCStore(stones)
  }
  // 直接交给鉴定师马尔弗，不需要鉴定。换得`给那尔薇的信`
  await npc.talkToNpc('鉴定师马尔弗', npc.DefaultDialogStrategies.Confirm)

  // 6. 信换饮料
  await move.falan.toStone('E')
  await move.walkList([
    [206, 37, '毕夫鲁的家'],
  ])
  await npc.talkToNpc('那尔薇', npc.DefaultDialogStrategies.Confirm)

  // 7. 饮料换矿工推荐信
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [351, 145, '国营第24坑道 地下1楼'],
  ])
  await npc.talkToNpc('矿工毕夫鲁', npc.DefaultDialogStrategies.Confirm)

  // 8. 圣村2楼就职矿工
  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [134, 218, '圣拉鲁卡村'],
    [49, 81, '圣村村长的家'],
    [6, 14, '圣村村长的家 2楼'],
  ])
  await npc.talkToNpc('矿工吉拉瓦特', [npc.DefaultDialogStrategies.FirstOnce, npc.DefaultDialogStrategies.ConfirmOnce])
  if (getPlayerProfession().name === '矿工') {
    log(`已就职矿工`)
    // 扔掉矿工推荐信
    const letterPos = cga.getInventoryItems().find(item => item.name === '矿工推荐信').pos
    cga.DropItem(letterPos)
  }

  // 9. 挖掘体验换正版挖掘技能
  await item.trade.sellStones() // 先卖点钱，要100学技能
  await move.falan.toStone('S')
  await move.walkList([
    [200, 132, '基尔的家'],
  ])
  await forgetSkillBy('挖掘体验', '传说的矿工基尔')
  await cga.delay(1000) // 遗忘技能和学习技能需要有一个间隔，否则容易出错
  await learnSkill('挖掘')

  // 有多余的钱就学点必备技能
  if (cga.GetPlayerInfo().gold > 400) {
    // 10. 学急救和治疗
    await move.falan.toWestHospital()
    await learnSkill('急救')
    await learnSkill('治疗')

    // 11. 学2个单体魔法
    await move.falan.toStone('W')
    await move.walkList([
      [22, 88, '芙蕾雅西边'],
      [298, 148, undefined],
    ])
    await npc.waitForNpc('神木')
    await npc.faceToNPC('神木')
    sayWords('魔术')
    await move.waitForMapChanged('魔女之家')

    await learnSkill('火焰魔法')
    await learnSkill('陨石魔法')
  }

  log(`就职矿工结束`)
}

export {
  incomingMiner,
}

