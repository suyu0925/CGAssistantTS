import { cga } from '../cga'
import { Dialog } from '../cga/types/dialog'
import { DehydratedNpc, hydrateNpc } from '../database/npc'
import { faceToNPC } from '../move'
import { log } from '../utils'
import { DefaultDialogStrategies, DialogStrategy, waitNPCDialog } from './dialog'


class StrategyPool {
  private strategyList: DialogStrategy[]
  private curIndex: number = 0
  private curCount: number

  constructor(arrayOrNot: DialogStrategy[] | DialogStrategy) {
    this.strategyList = Array.isArray(arrayOrNot) ? arrayOrNot : [arrayOrNot]
    this.curCount = this.current ? this.current.count : 0
  }

  async solve(dlg: Dialog) {
    log('solve', this.current)
    if (this.current === null) {
      return false
    }

    const solved = await this.current.func(dlg)
    if (solved) {
      if (this.curCount > 0) {
        this.curCount -= 1
        if (this.curCount === 0) {
          this.moveNext()
        }
      }
      return true
    } else {
      this.moveNext()
      return this.solve(dlg)
    }
  }

  private get current(): DialogStrategy | null {
    if (this.curIndex === this.strategyList.length) {
      return null
    } else {
      return this.strategyList[this.curIndex]
    }
  }

  private moveNext() {
    this.curIndex += 1
    if (this.curIndex < this.strategyList.length) {
      this.curCount = this.current.count
    } else {
      this.curCount = 0
    }
  }
}

const talkToNpc = async (hydratedNpc: DehydratedNpc, strategy?: DialogStrategy[] | DialogStrategy): Promise<Dialog | undefined> => {
  const npc = hydrateNpc(hydratedNpc)
  await faceToNPC(npc)
  cga.TurnTo(npc.station.x, npc.station.y)

  const pool = strategy ? new StrategyPool(strategy) : undefined

  while (true) {
    try {
      const dlg = await waitNPCDialog()
      log(dlg)
      let solved = false
      if (pool) {
        solved = await pool.solve(dlg)
      }
      if (!solved) {
        return dlg
      }
    } catch (err) {
      if (err.message === 'Async callback timeout.') {
        // ignore
      } else {
        log(err.message)
      }
      break
    }
  }
}

const waitForNpc = async (name: string) => {
  while (!cga.findNPC(name)) {
    await cga.delay(1000)
  }
}

export {
  waitForNpc,
  faceToNPC,
  talkToNpc,
  waitNPCDialog,
  DefaultDialogStrategies,
}

