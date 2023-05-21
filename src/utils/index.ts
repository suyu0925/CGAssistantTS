import { promisify } from 'util'
import { cga } from '../cga'
import { GuiSetting } from '../cga/types/gui'

export * from './log'

export const loadSettings = async (settings: Partial<GuiSetting>) => {
  return await promisify(cga.gui.LoadSettings)(settings)
}
