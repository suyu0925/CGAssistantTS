import { GuiSetting } from '../cga/types/gui'
import { supplyHpMp } from './hpmp'
import { curePetsInEastHospital } from './injury'

const AutoSupplyOnTheRoadSettings: Partial<GuiSetting> = {
  player: {
    autosupply: true,
    petmed: true,
    petmedat: '30%',
    usemed: true,
    usemedat: '50%',
  }
}

export {
  supplyHpMp as hpmp,
  AutoSupplyOnTheRoadSettings,
  curePetsInEastHospital,
}
