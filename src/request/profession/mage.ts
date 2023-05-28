import { learnSkill } from '../../player/skill'

export const learnSingleTargetElementSpells = async () => {
  // 冰和地的NPC离太近了，需要走远点来消除对话框
  await learnSkill('冰冻魔法')
  await learnSkill('风刃魔法')
  await learnSkill('陨石魔法')
  await learnSkill('火焰魔法')
}
