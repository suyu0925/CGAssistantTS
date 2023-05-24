export type WalkNode = [
  number, number, // x, y
  string | number | undefined // optional map name or map index
]

// 0-7代表8个方向，0为右上，顺时针旋转。
export type Orientation =
  | 6 | 7 | 0
  | 5/**/ | 1
  | 4 | 3 | 2

export interface IMoveApi {
  // 高速移动。高速移动中不可丢东西。dir是cga的方向，与小键盘不一致。visiable为false时，自己不可见人物移动。
  ForceMove: (dir: Orientation, visiable: boolean) => void
  // 同上面的高速移动。x或者y可同时跨越最多+5格子
  ForceMoveTo: (x: number, y: number, visiable: boolean) => void
  // 朝向坐标且互动，相当于朝面前一格点击右键鼠标。
  TurnTo: (x: number, y: number) => void
  // turnTo 与 TurnTo 的区别是：turnTo会往前一格，避免与面前的单位互动。
  turnTo: (x: number, y: number) => void

  // 朝向，默认offset为2，避免与面前的单位互动。
  turnOrientation: (dir: Orientation, offset?: number) => void
  turnDir: (dir: Orientation, offset?: number) => void

  WalkTo: (x: number, y: number) => void

  AsyncWalkTo: (
    targetX: number, targetY: number, targetMapNameOrIndex3: string | number,
    dstX: number, dstY: number,
    cb: (err: Error, reason: string) => void) => void

  walkList: (list: WalkNode[], cb: (err: Error) => void) => void

  // 获取当前移动速度矢量
  GetMoveSpeed: () => { x: number, y: number }
  // 来回移动，快速遇敌
  freqMove: (dir: Orientation) => void
  // 获取周围空地的方向
  getRandomSpaceDir: (x: number, y: number) => Orientation
  // 判断坐标之间的距离是否小于等于1
  isDistanceClose: (x1: number, y1: number, x2: number, y2: number) => boolean
  // 获取坐标之间的直线距离
  getDistance: (x1: number, y1: number, x2: number, y2: number) => number
}
