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

const fullSupply = async () => {
  await supplyHpMp()
  await curePetsInEastHospital()
}

export {
  supplyHpMp as hpmp,
  AutoSupplyOnTheRoadSettings,
  curePetsInEastHospital,
  fullSupply,
}
