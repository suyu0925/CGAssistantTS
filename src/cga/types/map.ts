export type PositionXY = {
  x: number
  y: number
}

export type MapIndex = {
  index1: number
  index2: number
  index3: number
}

export type MapName = string

export type Unit = {}

export type MapInfo = {
  index: MapIndex
  name: MapName
} & PositionXY

export type CellType =
  | 3 // 可能是传送石？
  | 10 // 楼梯、大门等走过去会固定换地图的地方

export type RawCellType =
  | -16374 // 不知道什么意思

export type MapObject = {
  x: number
  y: number
  mapx: number
  mapy: number
  cell: CellType
  rawcell: RawCellType
}

export type MapCollisionMatrix = {
  matrix: (0 | 1)[][] // 0代表没东西可以站人
  x_bottom: number
  y_bottom: number
  x_size: number
  y_size: number
}

export interface IMapApi {
  GetMapXY: () => PositionXY
  GetMapName: () => MapName
  GetMapIndex: () => MapIndex
  getMapInfo: () => MapInfo

  GetMapUnits: () => Unit[]

  buildMapCollisionMatrix: () => MapCollisionMatrix
  getMapObjects: () => MapObject[]
}
