import { GuiSetting } from '../cga/types/gui'

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

export {
  NormalAttack,
}
