var app = getApp()
const in_first = {
    id: "1",
    question: "你会主动跟喜欢的人搭讪吗？",
    questiontype: 'old',
    option: {
        "1": {
            title: "会",
            next: "2"
        },
        "2": {
            title: "不会",
            next: "3"
        }
    }
}
const questions = {
    "1": {
        id: "1",
        question: "你会主动跟喜欢的人搭讪吗？",
        answer: {
            "1": {
                title: "会",
                next: "2"
            },
            "2": {
                title: "不会",
                next: "3"
            }
        }
    },
    "2":{
      id: "2",
      question:"发生以下哪种事情，你会放弃暗恋的对象呢?",
      answer:{
        "1":{
          title:"发现对方有喜欢的对象",
          next:"3"
        },
        "2":{
          title:"告白后，被对方婉拒",
          next:"4"
        }
      }
    },
    "3": {
      id: "3",
      question: "你至今为止有谈过恋爱吗？",
      answer: {
        "1": {
          title: "谈过",
          next: "4"
        },
        "2": {
          title: "没谈过",
          next: "4"
        }
      }
    },
    "4": {
      id: "4",
      question: "烛光晚餐和草地野餐哪一个更加浪漫？",
      answer: {
        "1": {
          title: "草地野餐",
          next: "5"
        },
        "2": {
          title: "烛光晚餐",
          next: "6"
        }
      }
    },
    "5": {
      id: "5",
      question: "你认为人生的每个阶段都会有不同的心境吗?",
      answer: {
        "1": {
          title: "是的",
          next: "6"
        },
        "2": {
          title: "不是",
          next: "6"
        }
      }
    },
    "6": {
      id: "6",
      question: "你常常怀念少年时候的日子?",
      answer: {
        "1": {
          title: "是的",
          next: "8"
        },
        "2": {
          title: "不是",
          next: "7"
        }
      }
    },
    "7": {
      id: "7",
      question: "你觉得自己的直觉很准吗?",
      answer: {
        "1": {
          title: "是的",
          next: "9"
        },
        "2": {
          title: "不是",
          next: "8"
        }
      }
    },
    "8": {
      id: "8",
      question: "你小时候想当一个画家吗?",
      answer: {
        "1": {
          title: "是的",
          next: "9"
        },
        "2": {
          title: "不是",
          next: "9"
        }
      }
    },
    "9": {
      id: "9",
      question: "如果你准备用一幅画来装饰房间的话，会选以下哪一种风格的画呢?",
      answer: {
        "1": {
          title: "风景画或花卉画",
          next: "10"
        },
        "2": {
          title: "卡通画或明星画",
          next: "11"
        }
      }
    },
    "10": {
      id: "10",
      question: "你最常换的是什么?",
      answer: {
        "1": {
          title: "发饰",
          next: "12"
        },
        "2": {
          title: "包包",
          next: "11"
        }
      }
    },
    "11": {
      id: "11",
      question: "你面前有一杯柠檬水和一杯冰激凌，如果只能拿其中一样的话，你会选哪个呢?",
      answer: {
        "1": {
          title: "冰淇淋",
          next: "12"
        },
        "2": {
          title: "柠檬水",
          next: "13"
        }
      }
    },
    "12": {
      id: "12",
      question: "你认为童年时代最值得回味的游戏是什么?",
      answer: {
        "1": {
          title: "捉迷藏或跳橡皮筋",
          next: "13"
        },
        "2": {
          title: "过家家或扮医生",
          next: "14"
        }
      }
    },
    "13": {
      id: "13",
      question: "你迷恋星座分析吗?",
      answer: {
        "1": {
          title: "感觉一般",
          next: "14"
        },
        "2": {
          title: "非常迷恋",
          next: "14"
        }
      }
    },
    "14": {
      id: "14",
      question: "你认为蓝色给你的感觉是?",
      answer: {
        "1": {
          title: "忧郁",
          next: "16"
        },
        "2": {
          title: "平静",
          next: "15"
        },
        "3": {
          title: "浪漫",
          next: "A"
        }
      }
    },
    "15": {
      id: "15",
      question: "毕业之后，你还会向往校园恋情吗?",
      answer: {
        "1": {
          title: "会，校园恋情单纯美好",
          next: "A"
        },
        "2": {
          title: "一般不会，毕竟都毕业了",
          next: "B"
        }
      }
    },
    "16": {
      id: "16",
      question: "你想象中“月上柳梢头，人约黄昏后”的月亮该是什么样子?",
      answer: {
        "1": {
          title: "圆月",
          next: "C"
        },
        "2": {
          title: "弦月",
          next: "D"
        }
      }
    }
}
const answers = {
  "A": {
    singleIndex:"脱单指数：★★★★",
    detailedAnalysis:"生性乐观、对未来有着美好期待\的你，天生有着不错的运气。你\自身散发的魅力不由自主地吸引\身边的异性，桃花运很旺哦！好\好打理下自己的情绪，准备迎接\爱情吧！",
    detailedAnalysisSeparate:
    ["生性乐观、对未来有着美好期待", "的你，天生有着不错的运气。你", "自身散发的魅力不由自主地吸引", "身边的异性，桃花运很旺哦！好", "好打理下自己的情绪，准备迎接","爱情吧！"] ,
    allInformation:"脱单指数：★★★★\n生性乐观、对未来有着美好期待的你，天生有着不错的运气。你自身散发的魅力不由自主地吸引身边的异性，桃花运很旺哦！好好打理下自己的情绪，准备迎接爱情吧！"
},
  "B": {
    singleIndex: "脱单指数：★★★",
    detailedAnalysis: "你是一个乐观的人，并不是因为\环境的变化，年龄的增长，就觉\得人生没有什么美好的。事实上\，只要你乐意，你在任何时候都\可以美好。你有很多兴趣爱好，\有很多的乐子可以找，人生也不\是为了爱情而活的，没有爱情的\时候，你还能更加逍遥自在呢。",
    detailedAnalysisSeparate:
    ["你是一个乐观的人，并不 年龄的增长，就觉", "得人生没有什么美好的。事实上", "，只要你乐意，你在任何时候都", "可以美好。你有很多兴趣爱好，", "有很多的乐子可以找，人生也不", "是为了爱情而活的，没有爱情的","时候，你还能更加逍遥自在呢。"] ,
    allInformation: "脱单指数：★★★\n你是一个乐观的人，并不是因为环境的变化，年龄的增长，就觉得人生没有什么美好的。事实上，只要你乐意，你在任何时候都可以美好。你有很多兴趣爱好，有很多的乐子可以找，人生也不是为了爱情而活的，没有爱情的时候，你还能更加逍遥自在呢。"
  },
  "C": {
    singleIndex: "脱单指数：★★",
    detailedAnalysis: "桃花虽不明朗，但也有那么一小\朵在悄然绽放。也许你并不能彻\底脱单，但却能遇到可以发展的\对象。平日注意仪容仪表，多参\看时尚杂志来打扮，会为你增加\不少眼缘，和异性一起时，大方\的举止和幽默的谈吐都能够为你\吸引异性的目光，增加好感度。",
    detailedAnalysisSeparate:
    ["桃花虽不明朗，但也有那么一小", "朵在悄然绽放。也许你并不能彻", "底脱单，但却能遇到可以发展的", "对象。平日注意仪容仪表，多参", "看时尚杂志来打扮，会为你增加", "不少眼缘，和异性一起时，大方", "的举止和幽默的谈吐都能够为你", "吸引异性的目光，增加好感度。"] ,
    allInformation: "脱单指数：★★\n桃花虽不明朗，但也有那么一小朵在悄然绽放。也许你并不能彻底脱单，但却能遇到可以发展的对象。平日注意仪容仪表，多参看时尚杂志来打扮，会为你增加不少眼缘，和异性一起时，大方的举止和幽默的谈吐都能够为你吸引异性的目光，增加好感度。"
  },
  "D": {
    singleIndex: "脱单指数：★",
    detailedAnalysis: "脱单困难，未来的那个人或许只\是在寻找的过程中迷了路，不要\着急灰心，多参加朋友聚会、户\外活动，闲暇时多出去走走，去\认识接触新的朋友，那个ta说不\定就会出现了。",
    detailedAnalysisSeparate:
    ["脱单困难，未来的那个人或许只", "是在寻找的过程中迷了路，不要", "着急灰心，多参加朋友聚会、户", "外活动，闲暇时多出去走走，去", "认识接触新的朋友，那个ta说不","定就会出现了。"] ,
    allInformation: "脱单指数：★\n脱单困难，未来的那个人或许只是在寻找的过程中迷了路，不要着急灰心，多参加朋友聚会、户外活动，闲暇时多出去走走，去认识\接触新的朋友，那个ta说不定就会出现了。"
  }
}
// const answers = {
//     "A": "脱单指数：★★★★\n生性乐观、对未来有着美好期待的你，天生有着不错的运气。你自身散发的魅力不由自主地吸引身边的异性，桃花运很旺哦！\
//           好好打理下自己的情绪，准备迎接爱情吧！桃花可以说是相当的旺，追求者一大堆，可有得让你挑了，很容易就可以让你脱离了单身的苦海的，平时\
//           除了经常出去聚会以外，也可以多留在家里，看看书啊什么的，这样既可以丰富你的知识，还可以，让对方觉得你更有魅力而被你深深的吸引了。",
//     "B": "脱单指数：★★★\n你是一个乐观的人，并不是因为环境的变化，年龄的增长，就觉得人生没有什么美好的。事实上，只要你乐意，你在任何时候都\
//           可以美好。你有很多兴趣爱好，有很多的乐子可以找，人生也不是为了爱情而活的，没有爱情的时候，你还能更加逍遥自在呢。",
//     "C": "脱单指数：★★\n桃花虽不明朗，但也有那么一小朵在悄然绽放。也许你并不能彻底脱单，但却能遇到可以发展的对象。平日随时都要注意仪容仪表，\
//           多参看时尚杂志来打扮，会为你增加不少眼缘，和异性一起时，大方的举止和幽默的谈吐都能够为你吸引异性的目光，增加好感度。",
//     "D": "脱单指数：★\n脱单困难，未来的那个人或许只是在寻找的过程中迷了路，不要着急灰心，多参加朋友聚会、户外活动，闲暇时多出去走走，去认识\
//           接触新的朋友，那个ta说不定就会出现了。"
// }
const newQuestionResult = {
  index: 0,
  score: 0,
}
function in_next(questionId, answerId) { // 新题 questionId为选项的数组下标 answerId为分数
  const quesList = app.globalData.questionData
  console.log('---in_next','questionId=', questionId, 'answerId=',answerId)
  if (app.globalData.questionType === 'old') {
    var item = null
    for(var i = 0; i < quesList.length; i ++) {
      item = quesList[i]
      if (item.questionid === questionId) {
          break
      }
    }
    const a = item.option[answerId].next
    console.log('---loop1.item=',item,'--a=',a)
    if (a == "A" || a == "B" || a == "C" || a == "D") {
      return {
        end: true,
        id: a,
        result: answers[a]
      }
    } else {
      for (var j = 0; j < quesList.length; j++) {
        item = quesList[j]
        console.log('---loop2.item=', item, '--a=', a)
        if (item.questionid === parseFloat(a)) {
          break
        }
      }
      
      return {
        end: false,
        id: a,
        question: item
      }
    }
  } else {
    var item = null
    console.log(newQuestionResult.index,'--',newQuestionResult.score)
    newQuestionResult.index += 1
    newQuestionResult.score += parseFloat(answerId)

    if (newQuestionResult.index < quesList.length) {
      item = quesList[newQuestionResult.index]
      return {
        end: false,
        id: questionId,
        question: item
      }
    } else {
      return {
        end: true,
        id: questionId,
        result: {}
      }
    }
  }
    
}

function getQuestions(callBack) {
  const config = require('config.js')
  var promise = new Promise(function(resolve, reject) {
    wx.request({
      url: config.apiUrl.questions,
      success: (res)=> {
        console.log('---question.data=', res)
        if (res.statusCode === 200 && res.data.code === 200 && res.data.data && res.data.data.length > 0) {
          let first = res.data.data[0]
          app.globalData.questionType = first.questiontype 
          resolve(res.data.data)
        } else {
          reject(new Error('数据错误...'))
        }
      },
      fail: (err)=> {
        reject(err)
      }
    })
  })

  promise.then((data)=> {
    callBack(true, data)
  }, (err)=> {
    callBack(false, err)
  })
}

function getScore() {
  if (app.globalData.questionType != 'old') {
    return newQuestionResult.score
  }
  return 0
}

function initScore(){
  newQuestionResult.score = 0
  newQuestionResult.index = 0
}

module.exports = {
    initScore:initScore,
    first: in_first,
    next: in_next,
    answers: answers,
    getQuestions: getQuestions,
    getScore: newQuestionResult
}
