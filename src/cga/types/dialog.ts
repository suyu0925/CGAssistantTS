import { NpcId } from './npc'

export type DialogType =
  | 0 // 单一个确认按钮。此时options为1。(1, -1)代表确认。
  | 5 // 买、卖、不用了
  | 17 // 学习人物技能。此时options为2。(0, -1)代表学习，(2, -1)代表取消。

export type DialogOptions =
  | 0 // 列表选择, (0, 2)，0无用，2代表选择第3项
  | 1 // 确定按钮，(1, -1)，1代表确定，后面的-1无用
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
