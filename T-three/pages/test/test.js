//index.js
//获取应用实例
const app = getApp()
var questions=require("../../utils/questions.js")
const config = require('../../utils/config.js')

Page({
  data: {
    number: 1,
    question: questions.first,
    questionLength: 0,
    logoText:"靠谱小程序 提供技术支持",
    view: {
      Width: null,
      fontSize: null,
      marginTop: null,
      top1:null,
      paddingTop1:null,
    },
    saving:false, //保存数据中
  },
  onLoad:function(){
    var that=this
    var res = wx.getSystemInfoSync()
    console.log(res)
    that.data.screenWidth = res.screenWidth
    that.data.screenHeight = res.screenHeight
    that.data.windowWidth = res.windowWidth
    that.data.windowHeight = res.windowHeight
    if (that.data.screenWidth > 320 && that.data.screenWidth < 414) {

    } else if (that.data.screenWidth >= 414) {

    }
    else {
      that.setData({
        view: {
          fontSize: "16px",
        }
      })
    }
    if (that.data.screenHeight <= 480) {
      that.setData({
        view: {
          marginTop: "20px",
          top1: "86vh",
          fontSize: "16px",
          paddingTop1:"0px"
        }
      })
    }

    var list = app.globalData.questionData
    if (list && list.length > 0) {
      that.setData({question: list[0],questionLength:list.length})
    }

    if (!this.rec) {
      this.rec = this.selectComponent('#joinUs')
    }
  },
  onShow: function(){
    this.setData({ number:1 })
  },

  optionChange: function (e){
    var fid = e.detail.formId
    app.addFormId(fid)
    var that=this;
    var answerid = e.currentTarget.dataset.answerid;
    var item = e.currentTarget.dataset.item
    var questionid = answerid;
    if (app.globalData.questionType === 'old') {
      questionid = that.data.question.questionid;
    } else {
      answerid = item.score
    }
    var result = questions.next(questionid, answerid)
    console.log("---result:" + JSON.stringify(result) + 'question=',that.data.question,'end=',result.end)
    if(that.data.saving) {
      return
    }
    if (result.end && !that.data.saving){
      if (app.globalData.questionType === 'old') {
        that.checkResult(result, -1)
      } else {
          wx.request({
            url: config.apiUrl.checkScoreResult,
            method: 'POST',
            data: {
              userId: app.globalData.userId,
              testscore: questions.getScore.score
            },
            success: (res)=> {
              console.log(res)
              if (res.statusCode === 200 && res.data.code === 200 && res.data.data) {
                var data = res.data.data.remark
                data = JSON.parse(data)
                for(var key in data) {
                  data = data[key]
                }
                result.result = data
                // console.log('---config.result=',result)
                that.checkResult(result, questions.getScore.score)
              } else {

              }
            },
            complete:function(){
              that.setData({ saving:true })
            }
          })
      }
    } else {
      that.data.number++
      that.setData({
        number:that.data.number,
        question: result.question,
      })
    }
  },

  checkResult: function(result, score) {
    var that = this
    if (result.id == "A") {
      result.id = 1
      app.globalData.testResultIndex = 1
    } else if (result.id == "B") {
      result.id = 2
      app.globalData.testResultIndex = 2
    } else if (result.id == "C") {
      result.id = 3
      app.globalData.testResultIndex = 3
    } else if (result.id == "D") {
      result.id = 4
      app.globalData.testResultIndex = 4
    } else { // 新题库
      result.id = 0
      app.globalData.testResultIndex = 0
    }

    
    console.log("测试结果id：" + result.id)
    var userId = app.globalData.userId
    app.globalData.allTestResults = result.result
    app.globalData.testResults = result.result.allInformation
    //var header = getApp().globalData.header; //获取app.js中的请求头(李金梁)
    var wxSessionKey = app.globalData.wxSessionKey
    var sessionId = app.globalData.sessionId
    var userInfo = app.globalData.userInfo
    var encryptedData = ""
    var iv = ""
    if (app.globalData.scene == 1044) {
      wx.getShareInfo({
        shareTicket: app.globalData.shareTicket,
        complete: function (res) {
          encryptedData = res.encryptedData
          iv = res.iv
        }
      })
    }

    var param = {
      //shareTicket: app.globalData.shareTicket,
      encryptedData: encryptedData,
      iv: iv,
      userId: userId,
      testResults: result.id,
      age: app.globalData.age,
      sex: app.globalData.sex,
      constellation: app.globalData.constellation,
      wxSessionKey: wxSessionKey
    }
    if (score > 0) {
      param.testscore = score
    }
    wx.request({
      url: config.apiUrl.saveResults,
      data: param,
      method: 'POST',
      // header: header, //请求时带上这个请求头
      header: sessionId, //请求时带上这个请求头
      success: function (res) {
        console.log('----saveTestResult',res)
        if (res.statusCode === 200 && res.data.code === 200) {
          app.globalData.hasTestResult = true
          wx.redirectTo({
            url: '../testResult/testResult'
          })
          that.setData({ saving: false })
        } else {
          if (res.data.message) {
            wx.showToast({
              title: res.data.message,
              duration: 2000,
              icon: 'loading'
            })
          } else {
            wx.showToast({
              title: '匹配失败...',
              duration: 2000,
              icon: 'loading',
            })
          }
          setTimeout(()=>{
            wx.navigateBack({
              delta: 2
            })
          },2000)
        }
        
      },
      fail: function (res) {
        //console.log('submit fail');
      },
      complete: function (res) {
        //console.log('submit complete');
      }
    })
  },

  CooperationcConsultation: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    // wx.navigateTo({
    //   url: '/pages/CooperationcConsultation/CooperationcConsultation'
    // })

    this.rec.hide(false)
  },

  submit: function (e) {
    console.log('~~~~~submit', e)
  },
})
