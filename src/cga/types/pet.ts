export type PetId = number

export type PetInfo = {
  // TODO:
}

export type PetState =
  | 1 // 待命
  | 2 // 战斗
  | 3 // 休息
  | 16 // 宠物散步

export interface IPetApi {
  GetPetInfo: (petId: PetId) => PetInfo
  ChangePetState: (pos: number, state: PetState) => void
}
