import { Skill } from '../../player/skill'
import { NpcId } from './npc'

export type DialogType =
  | 0 // 单确认、单取消或是否。当为单确认时，options为1。当为确认+取消时，options为12。
  | 2 // 我想就职、我想转职、我想提升阶级。此时options为2。
  | 5 // 买、卖、不用了
  | 17 // 学习人物技能。此时options为2。(0, -1)代表学习，(2, -1)代表取消。
  | 18 // 遗忘人物技能。此时options为0。(0, index)代表遗忘第和个。
  | 19 // 治疗。此时options为0。(0, 1)代表选择第2个。
  | 27 // 交易、不用了。比如：交换铜。此时options为0。（0, 0)代表交易？（0, 1)代表不用了？

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

export type ForgetSkillInfo = {
  storeid: string // 如：'14121'
  name: string // npc的名字。如：'山男波波思'
  welcome: string // 欢迎词。如：'\\n想忘记哪个技能？'
  skills: {
    index: number // 序号，从0开始。
    name: Skill // 技能名字。如：'伐木体验'
    level: number // 技能当前等级。如：1
    slots: number // 技能占格子数。如：3
  }[]
}

export interface IDialogApi {
  AsyncWaitNPCDialog: (cb: (err: Error, result: Dialog) => void) => void
  ClickNPCDialog: (type: number, index: number) => void
  parseForgetSkillStoreMsg: (dlg: Dialog) => ForgetSkillInfo
}
