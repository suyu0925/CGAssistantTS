import { promisify } from 'util'
import { cga } from '../cga'
import { GuiSetting } from '../cga/types/gui'

export * from './log'
export * from './time'

export const loadSettings = async (settings: Partial<GuiSetting>) => {
  return await promisify(cga.gui.LoadSettings)(settings)
}

export const getSettings = async () => {
  return await promisify(cga.gui.GetSettings)()
}
