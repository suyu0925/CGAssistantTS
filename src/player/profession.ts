import { cga } from '../cga'

const Professions = [
  {
    name: '游民',
    titles: ['游民'],
    category: '游民'
  }, {
    name: '暗黑骑士',
    titles: ['见习暗黑骑士', '暗黑骑士', '高阶暗黑骑士', '暗黑领主', '暗黑之魂', '漆黑之影'],
    category: '物理系'
  }, {
    name: '盗贼',
    titles: ['见习盗贼', '盗贼', '小偷', '诈欺师', '偷窃高手', '盗贼头目'],
    category: '物理系'
  }, {
    name: '格斗士',
    titles: ['见习格斗士', '格斗士', '格斗专家', '格斗家师范', '格斗王', '斗圣'],
    category: '物理系'
  }, {
    name: '弓箭手',
    titles: ['见习弓箭手', '弓箭手', '王宫弓箭手', '弓术师范', '弓术大师', '神射手'],
    category: '物理系'
  }, {
    name: '教团骑士',
    titles: ['见习教团骑士', '教团骑士', '高阶教团骑士', '圣骑士', '光明骑士', '仲裁者'],
    category: '物理系'
  }, {
    name: '骑士',
    titles: ['见习骑士', '骑士', '王宫骑士', '近卫骑士', '枪术大师', '枪圣'],
    category: '物理系'
  }, {
    name: '忍者',
    titles: ['初级忍者', '中级忍者', '上级忍者', '影', '忍术大师', '鬼'],
    category: '物理系'
  }, {
    name: '士兵',
    titles: ['见习士兵', '士兵', '王宫士兵', '士兵长', '重战士', '指挥官'],
    category: '物理系'
  }, {
    name: '舞者',
    titles: ['见习舞者', '串场艺人', '舞者', '超级巨星', '天王巨星', '舞圣'],
    category: '物理系'
  }, {
    name: '战斧斗士',
    titles: ['见习战斧斗士', '战斧斗士', '王宫战斧斗士', '战斧师范', '战斧大师', '斧圣'],
    category: '物理系'
  }, {
    name: '剑士',
    titles: ['见习剑士', '剑士', '王宫剑士', '剑术师范', '剑术大师', '剑圣'],
    category: '物理系'
  }, {
    name: '传教士',
    titles: ['见习传教士', '传教士', '牧师', '主教', '大主教', '圣使'],
    category: '魔法系'
  }, {
    name: '魔术师',
    titles: ['见习魔术师', '魔术师', '王宫魔法师', '魔导士', '大魔术师', '狂魔导师'],
    category: '魔法系'
  }, {
    name: '巫师',
    titles: ['见习巫师', '巫师', '王宫巫师', '巫术大师', '巫王', '幻之巫王'],
    category: '魔法系'
  }, {
    name: '咒术师',
    titles: ['见习咒术师', '咒术师', '王宫咒术师', '降头师', '咒术大师', '咒缚者'],
    category: '魔法系'
  }, {
    category: '宠物系',
    name: '封印师',
    titles: ['见习封印师', '封印师', '王宫封印师', '封印术师范', '封印大师', '召唤师']
  }, {
    category: '宠物系',
    name: '饲养师',
    titles: ['见习饲养师', '饲养师', '王宫饲养师', '高级饲养师', '饲养大师', '星之饲养师']
  }, {
    category: '宠物系',
    name: '驯兽师',
    titles: ['见习驯兽师', '驯兽师', '王宫驯兽师', '驯兽师范', '驯兽大师', '兽王']
  }, {
    category: '制造系',
    name: '裁缝工',
    titles: ['裁缝学徒', '裁缝工', '资深裁缝师傅', '御用裁缝师傅', '裁缝名师']
  }, {
    category: '制造系',
    name: '长袍工',
    titles: ['长袍学徒', '长袍工', '资深长袍师傅', '御用长袍师傅', '长袍名师']
  }, {
    category: '制造系',
    name: '厨师',
    titles: ['料理学徒', '厨师', '资深大厨师', '御用厨师', '料理达人']
  }, {
    category: '制造系',
    name: '铠甲工',
    titles: ['铠甲学徒', '铠甲工', '资深铠甲师傅', '御用铠甲师傅', '铠甲名师']
  }, {
    category: '制造系',
    name: '帽子工',
    titles: ['帽子学徒', '帽子工', '资深帽子师傅', '御用帽子师傅', '帽子名师']
  }, {
    category: '制造系',
    name: '头盔工',
    titles: ['头盔学徒', '头盔工', '资深头盔师傅', '御用头盔师傅', '头盔名师']
  }, {
    category: '制造系',
    name: '投掷武器工',
    titles: ['投掷武器学徒', '投掷武器工', '资深投掷武器师傅', '御用投掷武器师傅', '投掷武器名师']
  }, {
    category: '制造系',
    name: '小刀工',
    titles: ['小刀学徒', '小刀工', '资深小刀师傅', '御用小刀师傅', '小刀名师']
  }, {
    category: '制造系',
    name: '药剂师',
    titles: ['实习药剂师', '药剂师', '资深药剂大师', '御用药剂师', '炼金术士']
  }, {
    category: '制造系',
    name: '造盾工',
    titles: ['造盾学徒', '造盾工', '资深造盾师傅', '御用造盾师傅', '造盾名师']
  }, {
    category: '制造系',
    name: '造斧工',
    titles: ['造斧学徒', '造斧工', '资深造斧师傅', '御用造斧师傅', '造斧名师']
  }, {
    category: '制造系',
    name: '造弓工',
    titles: ['造弓学徒', '造弓工', '资深造弓师傅', '御用造弓师傅', '造弓名师']
  }, {
    category: '制造系',
    name: '造枪工',
    titles: ['造枪学徒', '造枪工', '资深造枪师傅', '御用造枪师傅', '造枪名师']
  }, {
    category: '制造系',
    name: '造杖工',
    titles: ['造杖学徒', '造杖工', '资深造杖师傅', '御用造杖师傅', '造杖名师']
  }, {
    category: '制造系',
    name: '制鞋工',
    titles: ['制鞋学徒', '制鞋工', '资深制鞋师傅', '御用制鞋师傅', '制鞋名师']
  }, {
    category: '制造系',
    name: '制靴工',
    titles: ['制靴学徒', '制靴工', '资深制靴师傅', '御用制靴师傅', '制靴名师']
  }, {
    category: '制造系',
    name: '铸剑工',
    titles: ['铸剑学徒', '铸剑工', '资深铸剑师傅', '御用铸剑师傅', '铸剑名师']
  }, {
    category: '服务系',
    name: '防具修理工',
    titles: ['防具修理学徒', '防具修理工', '资深防具修理师', '御用防具修理师', '修理防具专家']
  }, {
    category: '服务系',
    name: '护士',
    titles: ['见习护士', '护士', '资深护士', '护士长', '护理专家', '白衣天使']
  }, {
    category: '服务系',
    name: '鉴定师',
    titles: ['鉴定学徒', '鉴定士', '资深鉴定师傅', '御用鉴定师傅', '鉴定专家']
  }, {
    category: '服务系',
    name: '武器修理工',
    titles: ['武器修理学徒', '武器修理工', '资深武器修理师', '御用武器修理师', '修理武器专家']
  }, {
    category: '服务系',
    name: '仙人',
    titles: ['道童', '道士', '半仙', '仙人', '歌仙']
  }, {
    category: '服务系',
    name: '侦探',
    titles: ['见习侦探', '侦探', '名侦探', '大侦探', '超级侦探']
  }, {
    name: '医生',
    titles: ['见习医生', '医生', '资深医生', '御医', '超级医生', '神医'],
    category: '服务系'
  }, {
    category: '采集系',
    name: '矿工',
    titles: ['见习矿工', '矿工', '资深矿工', '御用矿工', '超级矿工']
  }, {
    category: '采集系',
    name: '猎人',
    titles: ['见习猎人', '猎人', '资深猎人', '御用猎人', '超级猎人']
  }, {
    category: '采集系',
    name: '樵夫',
    titles: ['见习樵夫', '樵夫', '资深樵夫', '御用樵夫', '超级樵夫']
  }
]

type Profession = typeof Professions[number]

const getPlayerProfession = (): Profession => {
  const job = cga.GetPlayerInfo().job
  return Professions.find(profession => profession.titles.includes(job))!
}

const isMageClass = () => {
  return getPlayerProfession().category === '魔法系'
}

const isBattleClass = () => {
  const category = getPlayerProfession().category
  return category === '魔法系'
    || category === '物理系'
    || category === '宠物系'
}

export {
  isMageClass,
  isBattleClass,
  getPlayerProfession
}

