import { cga } from '../cga'
import * as move from '../move'
import { DefaultDialogStrategies, talkToNpc, waitNPCDialog } from '../npc'
import { log } from '../utils'

type Skill =
  | '宠物强化' | '调教'
  | '冰冻魔法' | '陨石魔法' | '火焰魔法' | '风刃魔法'
  | '治疗' | '急救'
  | '制药'
  | '伐木' | '伐木体验'
  | '挖掘' | '挖掘体验'
  | '狩猎' | '狩猎体验'
  | '锻造体验'
  | '造杖' | '造弓'

export type GatheringSKill =
  | '伐木' | '伐木体验'
  | '挖掘' | '挖掘体验'
  | '狩猎' | '狩猎体验'

const Teachers: { skill: Skill, npc: string }[] = [
  { skill: '陨石魔法', npc: '魔术师比尔艾特' },
  { skill: '冰冻魔法', npc: '魔术师班裘' },
  { skill: '火焰魔法', npc: '魔术师多萨德' },
  { skill: '风刃魔法', npc: '魔术师帕索比亚纳' },
  { skill: '急救', npc: '护士娜芝' },
  { skill: '伐木', npc: '山男波波思' },
  { skill: '治疗', npc: '伯舒医师' },
  { skill: '制药', npc: '见习药剂师吉可' },
  { skill: '伐木体验', npc: '募集樵夫的阿空' },
  { skill: '挖掘体验', npc: '募集矿工的洛伊' },
  { skill: '锻造体验', npc: '募集打铁工的阿黑' },
  { skill: '挖掘', npc: '传说的矿工基尔' },
  { skill: '造弓', npc: '造弓工飞利欧司' },
  { skill: '造杖', npc: '造杖工泛吉翁' },
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

const forgetSkillBy = async (skill: Skill, npcName: string) => {
  if (!cga.findPlayerSkill(skill)) {
    log(`未拥有技能: ${skill}`)
    return
  }

  let dlg = await talkToNpc(npcName, DefaultDialogStrategies.SecondOnce)
  const forgetSkillInfo = cga.parseForgetSkillStoreMsg(dlg)
  const skillIndex = forgetSkillInfo.skills.find(s => s.name === skill).index
  log(forgetSkillInfo, `选择${skillIndex}`)

  cga.ClickNPCDialog(0, skillIndex) // 选择要遗忘的技能
  dlg = await waitNPCDialog()
  log(dlg)
  cga.ClickNPCDialog(4, -1) // 确认遗忘

  // 弹出已成功遗忘的单确认框
  dlg = await waitNPCDialog()
  log(dlg)
  cga.ClickNPCDialog(1, -1) // 确认

  while (cga.findPlayerSkill(skill)) {
    await cga.delay(1000)
  }
  log(`成功遗忘技能: ${skill}`)
}

export {
  Skill,
  learnSkill,
  forgetSkillBy,
}

