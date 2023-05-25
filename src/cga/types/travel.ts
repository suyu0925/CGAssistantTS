export type FalanPortal =
  | 'S' | 'S1' | 'S2' // 东门
  | 'W' | 'W1' | 'W2' // 西门
  | 'E' | 'E1' | 'E2' // 南门
  | 'M1' // 道具服-市场1楼
  | 'M3' // 道具服-市场3楼

export interface ITravelApi {
  travel: {
    falan: {
      toStone: (stone: FalanPortal, cb: Function) => void
      toEastHospital: (cb: Function) => void
      toWestHospital: (cb: Function) => void
      toCastle: (cb: Function) => void
    }
  }
}
