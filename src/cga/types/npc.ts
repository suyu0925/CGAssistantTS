import { Unit } from './map'

export type NpcId = number

export type NpcInfo = {
  valid: number // 2
  type: number // 1
  model_id: number // 14152,
  unit_id: NpcId // 9403
  xpos: number // 6
  ypos: number // 33
  item_count: number // 0
  injury: number // 0,
  icon: number // 0,
  level: number // 1,
  flags: number // 4096,
  unit_name: string // '资深护士菲儿',
  nick_name: string // '',
  title_name: string // '',
  item_name: string // ''
}

export interface INpcApi {
  findNPCEx: (filter: ((u: Unit) => boolean)) => NpcInfo | null
  findNPC: (name: string) => NpcInfo | null
  findNPCByPosition: (name: string, x: number, y: number) => NpcInfo | null
}
