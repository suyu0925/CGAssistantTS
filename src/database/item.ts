export enum ItemType {
  Helm = 8,  // 绿头盔是8。8可能是丢地上会消失的东西？
  Request = 18, // 任务物品。如：死者的戒指。可能是指登出会消失的物品？
  Food = 23, // 料理
  Item = 26, // 物品
  Mine = 29, // 矿石类
  Wood = 30, // 木头类
  Fruit = 34, // 水果？目前只有蕃茄是这个类型。
  FoodMeterial = 35, // 食材
  Vanilla = 36, // 香草类
  Card = 41, // 图鉴卡片。如果assessed为false，名字会是`卡片？`。
  Posion = 43, // 血瓶
}

export type Item = {
  name: string
  id: number
  maxStackCount: number // 最大堆叠数量，不能堆叠为0或1均可。
  sellStackCount?: number // 卖店时一组的堆叠数量，大部分采集材料卖店一组以20为单位，但背包里是40。
  sellPrice: number // 卖出价格，不能卖为0。-1代表不知道价格需要收集。
  type: ItemType // 物品类型
  description?: string
  level?: number
}

const Items: Item[] = [
  { name: '铜', id: 9600, maxStackCount: 40, sellStackCount: 20, sellPrice: 28, type: ItemType.Mine, },
  { name: '铜条', id: 9611, maxStackCount: 20, sellStackCount: 20, sellPrice: 560, type: ItemType.Mine, },
  { name: '印度轻木', id: 10000, maxStackCount: 40, sellStackCount: 20, sellPrice: 28, type: ItemType.Wood, },
  { name: '蕃茄', id: 12006, maxStackCount: 40, sellStackCount: 20, sellPrice: 28, type: ItemType.Fruit, },
  { name: '小麦粉', id: 12400, maxStackCount: 40, sellStackCount: 20, sellPrice: 28, type: ItemType.FoodMeterial, },
  { name: '牛奶', id: 12401, maxStackCount: 40, sellStackCount: 20, sellPrice: 36, type: ItemType.FoodMeterial, },
  { name: '鸡蛋', id: 12404, maxStackCount: 40, sellStackCount: 20, sellPrice: 28, type: ItemType.FoodMeterial, },
  { name: '苹果薄荷', id: 12800, maxStackCount: 40, sellStackCount: 20, sellPrice: 28, type: ItemType.Vanilla, },
  { name: '柠檬草', id: 12801, maxStackCount: 40, sellStackCount: 20, sellPrice: 36, type: ItemType.Vanilla, },
  { name: '蝴蝶花', id: 12802, maxStackCount: 40, sellStackCount: 20, sellPrice: 41, type: ItemType.Vanilla, },
  { name: '小石像怪的卡片', id: 14836, maxStackCount: 0, sellPrice: 40, type: ItemType.Card, }, // 卡片的卖价是（等级+1）**2 * 10
  { name: '卡片？', id: 14848, maxStackCount: 0, sellPrice: -1, type: ItemType.Card, description: '未鉴定的卡片，不知道是哪个的' },
  { name: '树精的卡片', id: 14875, maxStackCount: 0, sellPrice: 90, type: ItemType.Card, level: 2, },
  { name: '恶魔螃蟹的卡片', id: 14925, maxStackCount: 0, sellPrice: 90, type: ItemType.Card, level: 2, },
  { name: '蜥蜴战士的卡片', id: 14929, maxStackCount: 0, sellPrice: 160, type: ItemType.Card, level: 3, },
  { name: '水龙晰的卡片', id: 14939, maxStackCount: 0, sellPrice: 250, type: ItemType.Card, level: 4, },
  { name: '盗贼的卡片', id: 14952, maxStackCount: 0, sellPrice: -1, type: ItemType.Card, },
  { name: '面包', id: 15201, maxStackCount: 3, sellPrice: -1, type: ItemType.Food, },
  { name: '生命力回复药（75）', id: 15605, maxStackCount: 3, sellPrice: -1, type: ItemType.Posion, },
  { name: '生命力回复药（100）', id: 15606, maxStackCount: 3, sellPrice: 150, type: ItemType.Posion, },
  { name: '生命力回复药（150）', id: 15607, maxStackCount: 3, sellPrice: 225, type: ItemType.Posion, },
  { name: '生命力回复药（200）', id: 15608, maxStackCount: 3, sellPrice: 300, type: ItemType.Posion, },
  { name: '锥形水晶', id: 17200, maxStackCount: 0, sellPrice: 200, type: ItemType.Item, },
  { name: '魔石', id: 18005, maxStackCount: 0, sellPrice: 12, type: ItemType.Item, description: '绿色的12块钱魔石' },
  { name: '魔石', id: 18026, maxStackCount: 0, sellPrice: 12, type: ItemType.Item, description: '蓝色的12块钱魔石' },
  { name: '魔石', id: 18027, maxStackCount: 0, sellPrice: 12, type: ItemType.Item, description: '蓝色的12块钱魔石' },
  { name: '魔石', id: 18047, maxStackCount: 0, sellPrice: 12, type: ItemType.Item, description: '红色的12块钱魔石' },
  { name: '魔石', id: 18068, maxStackCount: 0, sellPrice: 12, type: ItemType.Item, description: '黄色的12块钱魔石' },
  { name: '魔术师推荐信', id: 18107, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: '药剂师推荐信', id: 18132, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: '矿工推荐信', id: 18133, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: '樵夫推荐信', id: 18141, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: '红头盔', id: 18194, maxStackCount: 0, sellPrice: 0, type: ItemType.Helm, },
  { name: '绿头盔', id: 18195, maxStackCount: 0, sellPrice: 0, type: ItemType.Helm, },
  { name: '碎石头', id: 18209, maxStackCount: 40, sellStackCount: 20, sellPrice: 28, type: ItemType.Mine, },
  { name: '鹿皮', id: 18211, maxStackCount: 40, sellStackCount: 20, sellPrice: 24, type: ItemType.Item, },
  { name: '死者的戒指', id: 18218, maxStackCount: 0, sellPrice: 0, type: ItemType.Request, },
  { name: '赏赐状', id: 18219, maxStackCount: 0, sellPrice: 0, type: ItemType.Item, },
  { name: 'OK绷', id: 18220, maxStackCount: 0, sellPrice: 0, type: ItemType.Posion, },
  { name: '地的水晶碎片', id: 18310, maxStackCount: 99, sellPrice: 0, type: ItemType.Item, },
  { name: '水的水晶碎片', id: 18311, maxStackCount: 99, sellPrice: 0, type: ItemType.Item, },
  { name: '火的水晶碎片', id: 18312, maxStackCount: 99, sellPrice: 0, type: ItemType.Item, },
  { name: '风的水晶碎片', id: 18313, maxStackCount: 99, sellPrice: 0, type: ItemType.Item, },
  { name: '竹子', id: 18204, maxStackCount: 20, sellStackCount: 20, sellPrice: 24, type: ItemType.Wood, },
  { name: '孟宗竹', id: 18206, maxStackCount: 20, sellStackCount: 20, sellPrice: 28, type: ItemType.Wood, },
  { name: '矿山钥匙', id: 18423, maxStackCount: 0, sellPrice: -1, type: ItemType.Item, },
]

export {
  Items,
}

