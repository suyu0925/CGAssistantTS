import { cga } from '../../cga'
import * as move from '../../move'
import * as npc from '../../npc'
import { getPlayerProfession } from '../../player/profession'
import { forgetSkillBy, learnSkill } from '../../player/skill'
import { fullSupply } from '../../supply'
import { log } from '../../utils'

const prepare = async () => {
  // 1. 学习伐木体验
  await move.falan.toStone('E')
  await move.walkList([
    [195, 50, '职业介绍所'],
  ])
  await learnSkill('锻造体验')
  await learnSkill('伐木体验')

  // 2. 砍20个孟宗竹
  await move.falan.toStone('E')
  await move.walkList([
    [281, 88, '芙蕾雅'],
    [483, 192, undefined],
  ])
  const choppingSkill = cga.findPlayerSkill('伐木体验')
  cga.StartWork(choppingSkill.index, 0)
  while (cga.getItemCount('孟宗竹') < 20) {
    await cga.delay(1000)
  }
  // TODO: 怎么停止伐木呢？不会呢，只能直接回城
  await move.falan.toStone('S')

  // 3. 找小号拿20个铜矿

  // 4. 找小号拿20个鹿皮

}

const craftWeapon = async () => {
  // 合成试炼剑
  const skill = cga.findPlayerSkill('锻造体验')
  const craftIndex = 0 // 0是试炼剑，1是试炼衣
  cga.StartWork(skill.index, craftIndex) // 0是试炼剑，1是试炼衣
  const items = ['孟宗竹', '铜', '鹿皮'].map(meterial =>
    cga.getInventoryItems().find(item => item.name === meterial && item.count >= 20))
  cga.CraftItem(skill.index, craftIndex, 0, items.map(item => item.pos))
  // 等待合成完成
  while (cga.getItemCount('试炼剑') < 1) {
    await cga.delay(1000)
  }
}

const craftArmor = async () => {
  // 合成试炼衣
  const skill = cga.findPlayerSkill('锻造体验')
  const craftIndex = 1 // 0是试炼剑，1是试炼衣
  cga.StartWork(skill.index, craftIndex) // 0是试炼剑，1是试炼衣
  const items = ['孟宗竹', '铜', '鹿皮'].map(meterial =>
    cga.getInventoryItems().find(item => item.name === meterial && item.count >= 20))
  cga.CraftItem(skill.index, craftIndex, 0, items.map(item => item.pos))
  // 等待合成完成
  while (cga.getItemCount('试炼衣') < 1) {
    await cga.delay(1000)
  }
}

const getRecommentLetter = async () => {
  // 拿试炼剑或试炼衣去冒险者旅馆找好眼力的霍伊换武器工推荐信或防具工推荐信
  await move.falan.toStone('E')
  await move.walkList([
    [238, 64, '冒险者旅馆'],
  ])
  await npc.talkToNpc('好眼力的霍依', npc.DefaultDialogStrategies.Confirm)
}

const incomingBowMaker = async () => {
  // 准备材料
  await prepare()
  // 合成试炼剑
  await craftWeapon()
  // 去冒险者旅馆找好眼力的霍伊换武器工推荐信
  await getRecommentLetter()
  // 去圣村地下工房
  await fullSupply()
  await move.falan.toShencun()
  await move.walkList([
    [32, 70, '圣村装备品店'],
    [14, 4, '圣村装备品店 1楼小房间'],
    [9, 3, '圣村装备品店 地下工房'],
  ])
  // 就职造弓师
  await npc.talkToNpc('造弓师傅梅葛拉', [npc.DefaultDialogStrategies.FirstOnce, npc.DefaultDialogStrategies.ConfirmOnce])
  if (getPlayerProfession().name === '造弓工') {
    log(`已就职造弓工`)
    // 扔掉武器工推荐信
    const letterPos = cga.getInventoryItems().find(item => item.name === '武器工推荐信').pos
    cga.DropItem(letterPos)
  }
  // 遗忘体验技能
  await forgetSkillBy('伐木体验', '造弓工飞利欧司')
  await forgetSkillBy('锻造体验', '造弓工飞利欧司')
  // 学习造弓技能
  await learnSkill('造弓')
}

// 造杖师
const incomingStaffMaker = async () => {
  // 准备材料
  await prepare()
  // 合成试炼剑
  await craftWeapon()
  // 去冒险者旅馆找好眼力的霍伊换武器工推荐信
  await getRecommentLetter()
  // 去圣村地下工房
  await fullSupply()
  await move.falan.toShencun()
  await move.walkList([
    [32, 70, '圣村装备品店'],
    [14, 4, '圣村装备品店 1楼小房间'],
    [9, 3, '圣村装备品店 地下工房'],
  ])
  // 就职造杖师
  await npc.talkToNpc('造杖师傅希葛斯', [npc.DefaultDialogStrategies.FirstOnce, npc.DefaultDialogStrategies.ConfirmOnce])
  if (getPlayerProfession().name === '造杖工') {
    log(`已就职造杖工`)
    // 扔掉武器工推荐信
    const letterPos = cga.getInventoryItems().find(item => item.name === '武器工推荐信').pos
    cga.DropItem(letterPos)
  }
  // 遗忘体验技能
  await forgetSkillBy('伐木体验', '造杖工泛吉翁')
  await forgetSkillBy('锻造体验', '造杖工泛吉翁')
  // 学习造杖技能
  await learnSkill('造杖')
}

// 长袍师傅
const imcomingRobeMaker = async () => {
  // 准备材料
  await prepare()
  // 合成试炼剑
  await craftArmor()
  // 去冒险者旅馆找好眼力的霍伊换防具工推荐信
  await getRecommentLetter()
  // 去圣村地下工房
  await fullSupply()
  await move.falan.toShencun()
  await move.walkList([
    [32, 70, '圣村装备品店'],
    [14, 4, '圣村装备品店 1楼小房间'],
    [9, 3, '圣村装备品店 地下工房'],
  ])
  // 就职长袍师傅
  // 遗忘体验技能
  // 学习长袍技能
}

const incomingMaker = async (name: string) => {
  if (name === '弓') {
    await incomingBowMaker()
  } else if (name === '杖') {
    await incomingStaffMaker()
  } else {
    throw new Error(`不支持的制造：${name}`)
  }
}

export {
  incomingMaker,
}
