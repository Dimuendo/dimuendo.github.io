import ahri from './ahri.jpg'
import annie from './annie.jpg'
import ashe from './ashe.jpg'
import aurelionsol from './aurelionsol.jpg'
import bard from './bard.jpg'
import blitzcrank from './blitzcrank.jpg'
import caitlyn from './caitlyn.jpg'
import cassiopeia from './cassiopeia.jpg'
import darius from './darius.jpg'
import ekko from './ekko.jpg'
import ezreal from './ezreal.jpg'
import fiora from './fiora.jpg'
import fizz from './fizz.jpg'
import gangplank from './gangplank.jpg'
import gnar from './gnar.jpg'
import graves from './graves.jpg'
import illaoi from './illaoi.jpg'
import irelia from './irelia.jpg'
import janna from './janna.jpg'
import jarvaniv from './jarvaniv.jpg'
import jayce from './jayce.jpg'
import jhin from './jhin.jpg'
import jinx from './jinx.jpg'
import karma from './karma.jpg'
import kogmaw from './kogmaw.jpg'
import leona from './leona.jpg'
import lucian from './lucian.jpg'
import lulu from './lulu.jpg'
import malphite from './malphite.jpg'
import masteryi from './masteryi.jpg'
import mordekaiser from './mordekaiser.jpg'
import nautilus from './nautilus.jpg'
import neeko from './neeko.jpg'
import nocturne from './nocturne.jpg'
import poppy from './poppy.jpg'
import rakan from './rakan.jpg'
import riven from './riven.jpg'
import rumble from './rumble.jpg'
import shaco from './shaco.jpg'
import shen from './shen.jpg'
import soraka from './soraka.jpg'
import syndra from './syndra.jpg'
import teemo from './teemo.jpg'
import thresh from './thresh.jpg'
import twistedfate from './twistedfate.jpg'
import urgot from './urgot.jpg'
import vayne from './vayne.jpg'
import vi from './vi.jpg'
import viktor from './viktor.jpg'
import wukong from './wukong.jpg'
import xayah from './xayah.jpg'
import xerath from './xerath.jpg'
import xinzhao from './xinzhao.jpg'
import yasuo from './yasuo.jpg'
import zed from './zed.jpg'
import ziggs from './ziggs.jpg'
import zoe from './zoe.jpg'

const champImages = {
    'TFT3_Ahri': ahri,
    'TFT3_Annie': annie,
    'TFT3_Ashe': ashe,
    'TFT3_AurelionSol': aurelionsol,
    'TFT3_Bard': bard,
    'TFT3_Blitzcrank': blitzcrank,
    'TFT3_Caitlyn': caitlyn,
    'TFT3_Cassiopeia': cassiopeia,
    'TFT3_Darius': darius,
    'TFT3_Ekko': ekko,
    'TFT3_Ezreal': ezreal,
    'TFT3_Fiora': fiora,
    'TFT3_Fizz': fizz,
    'TFT3_Gangplank': gangplank,
    'TFT3_Gnar': gnar,
    'TFT3_Graves': graves,
    'TFT3_Illaoi': illaoi,
    'TFT3_Irelia': irelia,
    'TFT3_Janna': janna,
    'TFT3_JarvanIV': jarvaniv,
    'TFT3_Jayce': jayce,
    'TFT3_Jhin': jhin,
    'TFT3_Jinx': jinx,
    'TFT3_Karma': karma,
    'TFT3_KogMaw': kogmaw,
    'TFT3_Leona': leona,
    'TFT3_Lucian': lucian,
    'TFT3_Lulu': lulu,
    'TFT3_Malphite': malphite,
    'TFT3_MasterYi': masteryi,
    'TFT3_Mordekaiser': mordekaiser,
    'TFT3_Nautilus': nautilus,
    'TFT3_Neeko': neeko,
    'TFT3_Nocturne': nocturne,
    'TFT3_Poppy': poppy,
    'TFT3_Rakan': rakan,
    'TFT3_Riven': riven,
    'TFT3_Rumble': rumble,
    'TFT3_Shaco': shaco,
    'TFT3_Shen': shen,
    'TFT3_Soraka': soraka,
    'TFT3_Syndra': syndra,
    'TFT3_Teemo': teemo,
    'TFT3_Thresh': thresh,
    'TFT3_TwistedFate': twistedfate,
    'TFT3_Urgot': urgot,
    'TFT3_Vayne': vayne,
    'TFT3_Vi': vi,
    'TFT3_Viktor': viktor,
    'TFT3_WuKong': wukong,
    'TFT3_Xayah': xayah,
    'TFT3_Xerath': xerath,
    'TFT3_XinZhao': xinzhao,
    'TFT3_Yasuo': yasuo,
    'TFT3_Zed': zed,
    'TFT3_Ziggs': ziggs,
    'TFT3_Zoe': zoe,
}

const champNames = {
    'TFT3_Ahri': 'Ahri',
    'TFT3_Annie': 'Annie',
    'TFT3_Ashe': 'Ashe',
    'TFT3_AurelionSol': 'Aurelion Sol',
    'TFT3_Bard': 'Bard',
    'TFT3_Blitzcrank': 'Blitzcrank',
    'TFT3_Caitlyn': 'Caitlyn',
    'TFT3_Cassiopeia': 'Cassiopeia',
    'TFT3_Darius': 'Darius',
    'TFT3_Ekko': 'Ekko',
    'TFT3_Ezreal': 'Ezreal',
    'TFT3_Fiora': 'Fiora',
    'TFT3_Fizz': 'Fizz',
    'TFT3_Gangplank': 'Gangplank',
    'TFT3_Gnar': 'Gnar',
    'TFT3_Graves': 'Graves',
    'TFT3_Illaoi': 'Illaoi',
    'TFT3_Irelia': 'Irelia',
    'TFT3_Janna': 'Janna',
    'TFT3_JarvanIV': 'Jarvan IV',
    'TFT3_Jayce': 'Jayce',
    'TFT3_Jhin': 'Jhin',
    'TFT3_Jinx': 'Jinx',
    'TFT3_Karma': 'Karma',
    'TFT3_KogMaw': 'Kog\'Maw',
    'TFT3_Leona': 'Leona',
    'TFT3_Lucian': 'Lucian',
    'TFT3_Lulu': 'Lulu',
    'TFT3_Malphite': 'Malphite',
    'TFT3_MasterYi': 'Master Yi',
    'TFT3_Mordekaiser': 'Mordekaiser',
    'TFT3_Nautilus': 'Nautilus',
    'TFT3_Neeko': 'Neeko',
    'TFT3_Nocturne': 'Nocturne',
    'TFT3_Poppy': 'Poppy',
    'TFT3_Rakan': 'Rakan',
    'TFT3_Riven': 'Riven',
    'TFT3_Rumble': 'Rumble',
    'TFT3_Shaco': 'Shaco',
    'TFT3_Shen': 'Shen',
    'TFT3_Soraka': 'Soraka',
    'TFT3_Syndra': 'Syndra',
    'TFT3_Teemo': 'Teemo',
    'TFT3_Thresh': 'Thresh',
    'TFT3_TwistedFate': 'Twisted Fate',
    'TFT3_Urgot': 'Urgot',
    'TFT3_Vayne': 'Vayne',
    'TFT3_Vi': 'Vi',
    'TFT3_Viktor': 'Viktor',
    'TFT3_WuKong': 'Wukong',
    'TFT3_Xayah': 'Xayah',
    'TFT3_Xerath': 'Xerath',
    'TFT3_XinZhao': 'Xin Zhao',
    'TFT3_Yasuo': 'Yasuo',
    'TFT3_Zed': 'Zed',
    'TFT3_Ziggs': 'Ziggs',
    'TFT3_Zoe': 'Zoe',
}

const champCosts = {
    'TFT3_Ahri': 2,
    'TFT3_Annie': 2,
    'TFT3_Ashe': 3,
    'TFT3_AurelionSol': 5,
    'TFT3_Bard': 3,
    'TFT3_Blitzcrank': 2,
    'TFT3_Caitlyn': 1,
    'TFT3_Cassiopeia': 3,
    'TFT3_Darius': 2,
    'TFT3_Ekko': 5,
    'TFT3_Ezreal': 3,
    'TFT3_Fiora': 1,
    'TFT3_Fizz': 4,
    'TFT3_Gangplank': 5,
    'TFT3_Gnar': 4,
    'TFT3_Graves': 1,
    'TFT3_Illaoi': 1,
    'TFT3_Irelia': 4,
    'TFT3_Janna': 5,
    'TFT3_JarvanIV': 1,
    'TFT3_Jayce': 3,
    'TFT3_Jhin': 4,
    'TFT3_Jinx': 4,
    'TFT3_Karma': 3,
    'TFT3_KogMaw': 2,
    'TFT3_Leona': 1,
    'TFT3_Lucian': 2,
    'TFT3_Lulu': 5,
    'TFT3_Malphite': 1,
    'TFT3_MasterYi': 3,
    'TFT3_Mordekaiser': 2,
    'TFT3_Nautilus': 2,
    'TFT3_Neeko': 3,
    'TFT3_Nocturne': 1,
    'TFT3_Poppy': 1,
    'TFT3_Rakan': 2,
    'TFT3_Riven': 4,
    'TFT3_Rumble': 3,
    'TFT3_Shaco': 3,
    'TFT3_Shen': 2,
    'TFT3_Soraka': 4,
    'TFT3_Syndra': 3,
    'TFT3_Teemo': 4,
    'TFT3_Thresh': 5,
    'TFT3_TwistedFate': 1,
    'TFT3_Urgot': 5,
    'TFT3_Vayne': 3,
    'TFT3_Vi': 3,
    'TFT3_Viktor': 4,
    'TFT3_WuKong': 4,
    'TFT3_Xayah': 1,
    'TFT3_Xerath': 5,
    'TFT3_XinZhao': 2,
    'TFT3_Yasuo': 2,
    'TFT3_Zed': 2,
    'TFT3_Ziggs': 1,
    'TFT3_Zoe': 1,
}

export {
    champImages,
    champNames,
    champCosts,
}
