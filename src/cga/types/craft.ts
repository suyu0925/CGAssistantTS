export type WorkingResult = {
  type: 3 // 治疗是3
  success: boolean // 治疗结果：true成功，false失败
  levelup: boolean // 治疗结果：true成功，false失败
  xp: number // 获取的技能经验值
  endurance: 0
  skillful: 0
  intelligence: 0
  status: 0 // 治疗结果：0失败，4成功
}

export interface ICraftApi {
  SetImmediateDoneWork: (isImmediate: boolean) => void
  AsyncWaitWorkingResult: (cb: (err: Error, result: WorkingResult) => void) => void
}
