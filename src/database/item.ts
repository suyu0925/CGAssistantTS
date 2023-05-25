export enum ItemType {
  Helm = 8,  // 头盔
  Food = 23, // 料理
  Item = 26, // 物品
  Wood = 30, // 木头
  Card = 41, // 图鉴卡片。如果assessed为false，名字会是`卡片？`。
  Posion = 43, // 血瓶
}

export type Item = {
  name: string
  id: number
  maxStackCount: number // 最大堆叠数量，不能堆叠为0或1均可。
  sellPrice: number // 卖出价格，不能卖为0。-1代表不知道价格需要收集。
  type: ItemType // 物品类型
  description?: string
}

const Items: Item[] = [
  { name: '印度轻木', id: 10000, maxStackCount: 40, sellPrice: 28, type: ItemType.Wood, },
  { name: '小石像怪的卡片', id: 14836, maxStackCount: 0, sellPrice: -1, type: ItemType.Card, },
  { name: '卡片？', id: 14848, maxStackCount: 0, sellPrice: -1, type: ItemType.Card, description: '未鉴定的卡片，不知道是哪个的' },
  { name: '树精的卡片', id: 14875, maxStackCount: 0, sellPrice: -1, type: ItemType.Card, },
  { name: '面包', id: 15201, maxStackCount: 3, sellPrice: -1, type: ItemType.Food, },
  { name: '生命力回复药（75）', id: 15605, maxStackCount: 3, sellPrice: -1, type: ItemType.Posion, },
  { name: '魔石', id: 18005, maxStackCount: 0, sellPrice: -1, type: ItemType.Item, description: '绿色的魔石' },
  { name: '魔石', id: 18026, maxStackCount: 0, sellPrice: -1, type: ItemType.Item, description: '蓝色的魔石' },
  { name: '魔石', id: 18047, maxStackCount: 0, sellPrice: -1, type: ItemType.Item, description: '红色的魔石' },
  { name: '魔石', id: 18068, maxStackCount: 0, sellPrice: 12, type: ItemType.Item, description: '黄色的12块钱魔石' },
  { name: '魔术师推荐信', id: 18107, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: '药剂师推荐信', id: 18132, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: '樵夫推荐信', id: 18141, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: '绿头盔', id: 18195, maxStackCount: 0, sellPrice: 0, type: ItemType.Helm, },
  { name: 'OK绷', id: 18220, maxStackCount: 0, sellPrice: 0, type: ItemType.Posion, },
  { name: '水的水晶碎片', id: 18311, maxStackCount: 99, sellPrice: 0, type: ItemType.Item, },
  { name: '火的水晶碎片', id: 18312, maxStackCount: 99, sellPrice: 0, type: ItemType.Item, },
  { name: '风的水晶碎片', id: 18313, maxStackCount: 99, sellPrice: 0, type: ItemType.Item, },
  { name: '竹子', id: 18204, maxStackCount: 20, sellPrice: 24, type: ItemType.Wood, },
  { name: '孟宗竹', id: 18206, maxStackCount: 20, sellPrice: 28, type: ItemType.Wood, },
]

export {
  Items,
}

