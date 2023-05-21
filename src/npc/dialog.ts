import { promisify } from 'util'
import { cga } from '../cga'
import { Dialog } from '../cga/types/dialog'

export type DialogStrategy = {
  count: number // 策略可用次数，<0代表无限次数，直到无法处理；0代表略过；
  func: (dlg: Dialog) => Promise<boolean>
}

const waitNPCDialog = async () => {
  return await promisify(cga.AsyncWaitNPCDialog)()
}

const skipDialog = async (dlg: Dialog): Promise<boolean> => {
  switch (dlg.options) {
    case 1:
      cga.ClickNPCDialog(1, -1)
      return true
    case 2:
      cga.ClickNPCDialog(2, -1)
      return true
    case 32:
      cga.ClickNPCDialog(32, -1)
      return true
    default:
      return false
  }
}

const confirmDialog = async (dlg: Dialog): Promise<boolean> => {
  switch (dlg.options) {
    case 3:
      cga.ClickNPCDialog(1, -1)
      return true
    case 12:
      cga.ClickNPCDialog(4, -1)
      return true
    default:
      return await skipDialog(dlg)
  }
}

const denyDialog = async (dlg: Dialog) => {
  switch (dlg.options) {
    case 3:
      cga.ClickNPCDialog(2, -1)
      return true
    case 12:
      cga.ClickNPCDialog(8, -1)
      return true
    default:
      return await skipDialog(dlg)
  }
}

const DefaultDialogStrategies = {
  Next: { count: -1, func: skipDialog },
  Confirm: { count: -1, func: confirmDialog },
  Deny: { count: -1, func: denyDialog },
  NextOnce: { count: 1, func: skipDialog },
  ConfirmOnce: { count: 1, func: confirmDialog },
  DenyOnce: { count: 1, func: denyDialog },
}

export {
  waitNPCDialog,
  DefaultDialogStrategies,
}

