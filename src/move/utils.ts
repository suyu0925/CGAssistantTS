import { cga } from '../cga'
import { PositionXY } from '../cga/types/map'

export type Orientation =
  | 7 | 8 | 9
  | 4 | 6
  | 1 | 2 | 3

export const getOppositeOrientation = (o: Orientation): Orientation => {
  const OppositeTable: { [o in Orientation]: Orientation } = {
    7: 3,
    8: 2,
    9: 1,
    4: 6,
    6: 4,
    1: 9,
    2: 8,
    3: 7,
  }
  return OppositeTable[o]
}

export const AllOrientations: Orientation[] = [7, 8, 9, 4, 6, 1, 2, 3]

export const OrientationOffset: { [o in Orientation]: PositionXY } = {
  1: { x: -1, y: 0 },
  2: { x: -1, y: 1 },
  3: { x: 0, y: 1 },
  4: { x: -1, y: -1 },
  6: { x: 1, y: 1 },
  7: { x: 0, y: -1 },
  8: { x: 1, y: -1 },
  9: { x: 1, y: 0 },
}

export type MoveTarget = {
  x: number
  y: number
  orientation: Orientation
}

const isPositionMovable = (x: number, y: number) => {
  const walls = cga.buildMapCollisionMatrix()
  const entries = cga.getMapObjects().filter(e => e.cell === 3 || e.cell === 10)
  // 可以站人，并且不是地图出入口，就当作可以到达
  // TODO: 这里有个疑问：如果被障碍物隔开了呢，matrix也会是1吗？
  return walls.matrix[y][x] == 0 && entries.findIndex(e => e.mapx == x && e.mapy == y) < 0
}

const getMovablePositionsAround = (x: number, y: number): MoveTarget[] => {
  const result: MoveTarget[] = []
  for (const o of AllOrientations) {
    if (isPositionMovable(x + OrientationOffset[o].x, y + OrientationOffset[o].y)) {
      result.push({
        x: x + OrientationOffset[o].x,
        y: y + OrientationOffset[o].y,
        orientation: o,
      })
    }
  }
  return result
}

const getOrientationPosition = (orientation: Orientation, offset: number): PositionXY => {
  const current = cga.GetMapXY()
  return {
    x: current.x + OrientationOffset[orientation].x * offset,
    y: current.y + OrientationOffset[orientation].y * offset,
  }
}

const turnOrientation = (orientation: Orientation, offset = 2) => {
  const pos = getOrientationPosition(orientation, offset)
  cga.TurnTo(pos.x, pos.y)
}

export {
  isPositionMovable,
  getMovablePositionsAround,
  turnOrientation,
}

