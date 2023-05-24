import { cga } from '../cga'
import { GuiSetting } from '../cga/types/gui'
import { getPlayerProfession } from '../player/profession'
import { Skill } from '../player/skill'
import { loadSettings } from '../utils'

// 人宠普攻
const NormalAttack: Partial<GuiSetting> = {
  battle: {
    autobattle: true,
    delayfrom: 500,
    delayto: 1000,
    list: [
      {
        condition: 0,
        condition2: 0,
        condition2rel: 0,
        condition2val: '',
        conditionrel: 0,
        conditionval: '',
        index: 0,
        petaction: 100,
        petskillname: '攻击',
        pettarget: 0,
        pettargetsel: 0,
        playeraction: 1,
        playertarget: 0,
        playertargetsel: 0
      }
    ]
  }
}

// 使用随机单体魔法
const useRandomSingleTargetSpell = async () => {
  const skill = ['冰冻魔法', '陨石魔法', '火焰魔法', '风刃魔法'][Math.floor(Math.random() * 4)] as Skill
  if (!cga.findPlayerSkill(skill)) {
    // no single target spell
    return
  }
  const settings: Partial<GuiSetting> = {
    battle: {
      list: [
        {
          condition: 0,
          condition2: 0,
          condition2rel: 0,
          condition2val: '',
          conditionrel: 0,
          conditionval: '',
          index: 0,
          petaction: 100,
          petskillname: '攻击',
          pettarget: 0,
          pettargetsel: 0,
          playeraction: 100,
          playerskilllevel: 0,
          playerskillname: skill,
          playertarget: 0,
          playertargetsel: 0
        }
      ]
    }
  }
  await loadSettings(settings)
}

const loadAutoBattleSettings = async () => {
  await loadSettings(NormalAttack)

  if (getPlayerProfession().category === '魔法系' || getPlayerProfession().category === '采集系') {
    await useRandomSingleTargetSpell()
  }
}

export {
  NormalAttack,
  loadAutoBattleSettings,
}

