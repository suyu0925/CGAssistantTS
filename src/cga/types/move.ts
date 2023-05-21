export type WalkNode = [
  number, number, // x, y
  string | number | undefined // optional map name or map index
]

export interface IMoveApi {
  WalkTo: (x: number, y: number) => void
  TurnTo: (x: number, y: number) => void
  AsyncWalkTo: (
    targetX: number, targetY: number, targetMapNameOrIndex3: string | number,
    dstX: number, dstY: number,
    cb: (err: Error, reason: string) => void) => void
  walkList: (list: WalkNode[], cb: (err: Error) => void) => void
}
