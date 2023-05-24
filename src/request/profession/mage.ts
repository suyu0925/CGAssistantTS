import { learnSkill } from '../../player/skill'

export const learnSingleTargetElementSpells = async () => {
  await learnSkill('冰冻魔法')
  await learnSkill('陨石魔法')
  await learnSkill('火焰魔法')
  await learnSkill('风刃魔法')
}
