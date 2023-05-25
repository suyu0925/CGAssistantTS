import { cga } from '../cga'
import * as trade from './trade'
import * as exchange from './exchange'

const ItemWeakListSettings = {
  itemtweaklist: [
    '地的水晶碎片|999',
    '水的水晶碎片|999',
    '火的水晶碎片|999',
    '风的水晶碎片|999',
    '神之金|20',
    '龙角|20',
    '隐秘的徽记（地）|20',
    '隐秘的徽记（水）|20',
    '隐秘的徽记（火）|20',
    '隐秘的徽记（风）|20',
    '阿尔卡迪亚古钱|999',
    '魔族的水晶|5',
    '钢骑之矿|5',
    '德特家的布|5',
    '誓言之证|5',
    '能量结晶|99',
    '巨石|20',
    '长老之证|7',
    '生命力回复药（75）|3',
    '生命力回复药（100）|3',
    '生命力回复药（150）|3',
    '生命力回复药（200）|3',
    '生命力回复药（250）|3',
    '生命力回复药（300）|3',
  ]
}

const isBagFull = () => {
  return cga.getInventoryItems().length === 20
}

export {
  ItemWeakListSettings,
  isBagFull,
  trade,
  exchange,
}

