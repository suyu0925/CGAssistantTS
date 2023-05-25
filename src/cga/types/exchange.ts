export enum MoveGoldDirection {
  MOVE_GOLD_TOBANK = 1,
  MOVE_GOLD_FROMBANK = 2,
  MOVE_GOLD_DROP = 3,
}

export interface IExchangeApi {
  MoveGold: (gold: number, dir: MoveGoldDirection) => void
  MoveItem: (src: number, dst: number, count: number) => void // count为-1代表全部
}
