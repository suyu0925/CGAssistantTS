import { NpcId } from './npc'

export type DialogType =
  | 0

export type DialogOptions =
  | 0 // 列表选择, (0, 2)，0无用，2代表选择第3项
  | 1 // 确定按钮，(1, -1)，-1无用，1代表确定
  | 2 // 取消按钮, (2, -1)
  | 3 // 确定、取消, (1, -1), 1确定 2取消
  | 12 // 是、否，(4, -1)，4是 8否
  | 32 // 下一步，(32, -1)，32代表下一步

export type DialogId = number

export type Dialog = {
  type: DialogType
  options: DialogOptions
  dialog_id: DialogId
  npc_id: NpcId
  message: string
}

export interface IDialogApi {
  AsyncWaitNPCDialog: (cb: (err: Error, result: Dialog) => void) => void
  ClickNPCDialog: (type: number, index: number) => void
}
