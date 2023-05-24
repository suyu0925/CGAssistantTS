import { cga } from '../cga'
import * as move from '../move'
import { DefaultDialogStrategies, talkToNpc } from '../npc'
import { log } from '../utils'

type Skill =
  | '宠物强化' | '调教'
  | '冰冻魔法' | '陨石魔法' | '火焰魔法' | '风刃魔法'

const Teachers = [
  { skill: '陨石魔法', npc: '魔术师比尔艾特' },
  { skill: '冰冻魔法', npc: '魔术师班裘' },
  { skill: '火焰魔法', npc: '魔术师多萨德' },
  { skill: '风刃魔法', npc: '魔术师帕索比亚纳' },
]

const learnSkill = async (skill: Skill) => {
  if (cga.findPlayerSkill(skill)) {
    log(`已拥有技能: ${skill}`)
    return
  }

  const teacher = Teachers.find(t => t.skill === skill)
  await move.faceToNPC(teacher.npc)
  const dlg = await talkToNpc(teacher.npc, [DefaultDialogStrategies.FirstOnce, DefaultDialogStrategies.ConfirmOnce])
  log(dlg)

  if (cga.findPlayerSkill(skill)) {
    log(`成功学会技能: ${skill}`)
  } else {
    log(`学习技能失败: ${skill}`)
  }
}

export {
  Skill,
  learnSkill,
}

