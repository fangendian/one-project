// pages/launching.js
var questions = require("../../utils/questions.js")
const config = require('../../utils/config.js')
const app = getApp()
Page({
  data: {
    timer: null,
    miniprogramVersion: app.globalData.miniprogramVersion,
    showAthorize: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!this.rec) {
      this.rec = this.selectComponent('#joinUs')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLogin()
  },
  getLogin: function(){
    //console.log(this)
    //app.globalData.scene = options.scene
    var that = this
    var userId = app.globalData.userId
    var wxSessionKey = app.globalData.wxSessionKey
    var sessionId = app.globalData.sessionId
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: config.apiUrl.getMinAppJump,
      data: {
        isDelete: '0',
        limit: '0',
        pageCode: '0'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        var that = this
        if (res.data.code == 0) {
          if (res.data.appChainList[0]) {
            app.globalData.jumpInfor = res.data.appChainList[0]
          }
        }
      }
    })
    app.globalData.questionLoading = true
    questions.getQuestions((suc, data) => {
      if (suc) {
        app.globalData.questionData = data
      }
      app.globalData.questionLoading = false
    })
    wx.request({
      url: config.apiUrl.showRedenvelope,
      method: 'POST',
      success: function (res) {
        if (res && res.data && res.data['0'] === "1") {
          app.globalData.showRedenvelope = true
        }
      }
    })

    that.data.timer = setTimeout(function () {
      if (wxSessionKey == "" || wxSessionKey == undefined || sessionId == "" || sessionId == undefined || userId == "" || userId == undefined) {
        console.log("未登陆过！")
        //登录态过期,重新登录
        wx.login({
          success: res => {
            const code = res.code
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                wx.request({
                  url: config.apiUrl.login,
                  method: "POST",
                  data: {
                    code: code,
                    avatarUrl: res.userInfo.avatarUrl,
                    city: res.userInfo.city,
                    country: res.userInfo.country,
                    sex: res.userInfo.gender,
                    language: res.userInfo.language,
                    nickName: res.userInfo.nickName,
                    province: res.userInfo.province
                  },
                  success: function (res) {
                    console.log(res.data.data)
                    // 保存返回的userId和expired到storage
                    app.globalData.userId = res.data.data.userId
                    // wx.setStorageSync(
                    //   "userId",
                    //   res.data.data.userId
                    // )
                    app.globalData.wxSessionKey = res.data.data.wxSessionKey
                    // wx.setStorageSync(
                    //   "wxSessionKey",
                    //   res.data.data.wxSessionKey
                    // )
                    app.globalData.expired = res.data.data.expired
                    // wx.setStorageSync(
                    //   "expired",
                    //   res.data.data.expired
                    // )
                    app.globalData.sessionId = {
                      'Cookie': 'JSESSIONID=' + res.data.data.sessionId
                    }
                    // wx.setStorageSync(
                    //   "sessionId",
                    //   {
                    //     'Cookie': 'JSESSIONID=' + res.data.data.sessionId
                    //   }
                    // )
                    that.checkNextPage(res.data.data.userId)
                  }
                })
              },
              fail: err => {
                that.checkLogin(err)
              }
            })
          },
          fail: function (res) {
            console.log(JSON.stringify(res))
            console.log("--------------" + res)
          }
        })
      } else {
        wx.checkSession({
          success: function () {
            //session 未过期，并且在本生命周期一直有效

            // 判断sessionId是否有效
            console.log('检查是否过期：', userId)
            wx.request({
              url: config.apiUrl.isOverdue,
              method: "POST",
              header: sessionId,
              data: {
                userId: userId,
                wxSessionKey: wxSessionKey
              },
              success: function (res) {
                console.log("是否过期：" + res.data)
                //console.log("isOverdue:" + res)
                if (res.data == true) {
                  console.log("未过期！")
                  that.checkNextPage(userId)
                } else {
                  console.log("过期！")
                  //console.log("false:" + res.data)
                  wx.login({
                    success: res => {
                      const code = res.code
                      wx.getUserInfo({
                        success: res => {
                          //app.globalData.userInfo = res.userInfo
                          wx.request({
                            url: config.apiUrl.login,
                            method: "POST",
                            data: {
                              code: code,
                              avatarUrl: res.userInfo.avatarUrl,
                              city: res.userInfo.city,
                              country: res.userInfo.country,
                              sex: res.userInfo.gender,
                              language: res.userInfo.language,
                              nickName: res.userInfo.nickName,
                              province: res.userInfo.province
                            },
                            success: function (res) {
                              // 保存返回的userId和expired到storage
                              app.globalData.userId = res.data.data.userId
                              // wx.setStorageSync(
                              //   "userId",
                              //   res.data.data.userId
                              // )
                              app.globalData.wxSessionKey = res.data.data.wxSessionKey
                              // wx.setStorageSync(
                              //   "wxSessionKey",
                              //   res.data.data.wxSessionKey
                              // )
                              app.globalData.expired = res.data.data.expired
                              // wx.setStorageSync(
                              //   "expired",
                              //   res.data.data.expired
                              // )
                              app.globalData.sessionId = {
                                'Cookie': 'JSESSIONID=' + res.data.data.sessionId
                              }
                              // wx.setStorageSync(
                              //   "sessionId",
                              //   {
                              //     'Cookie': 'JSESSIONID=' + res.data.data.sessionId
                              //   }
                              // )
                              that.checkNextPage(res.data.data.userId)
                            }
                          })
                        },
                        fail: res => {
                          that.checkLogin(res)
                        }
                      })
                    },
                    fail: function (res) {
                      console.log("--------------" + res)
                    }
                  })
                }
              }
            })
          },
          fail: function () {
            //登录态过期,重新登录
            wx.login({
              success: res => {
                const code = res.code
                wx.getUserInfo({
                  success: res => {
                    //app.globalData.userInfo = res.userInfo
                    wx.request({
                      url: config.apiUrl.login,
                      method: "POST",
                      data: {
                        code: code,
                        avatarUrl: res.userInfo.avatarUrl,
                        city: res.userInfo.city,
                        country: res.userInfo.country,
                        sex: res.userInfo.gender,
                        language: res.userInfo.language,
                        nickName: res.userInfo.nickName,
                        province: res.userInfo.province
                      },
                      success: function (res) {
                        // 保存返回的userId和expired到storage
                        app.globalData.userId = res.data.data.userId
                        // wx.setStorageSync(
                        //   "userId",
                        //   res.data.data.userId
                        // )
                        app.globalData.wxSessionKey = res.data.data.wxSessionKey
                        // wx.setStorageSync(
                        //   "wxSessionKey",
                        //   res.data.data.wxSessionKey
                        // )
                        app.globalData.expired = res.data.data.expired
                        // wx.setStorageSync(
                        //   "expired",
                        //   res.data.data.expired
                        // )
                        app.globalData.sessionId = {
                          'Cookie': 'JSESSIONID=' + res.data.data.sessionId
                        }
                        // wx.setStorageSync(
                        //   "sessionId",
                        //   {
                        //     'Cookie': 'JSESSIONID=' + res.data.data.sessionId
                        //   }
                        // )
                        that.checkNextPage(res.data.data.userId)
                      }
                    })
                  },
                  fail: err => {
                    that.checkLogin(err)
                  }
                })
              }
            })
          }
        })
      }
    }, 1000)
  },
  checkLogin: function(res) {
    console.log(res)
    wx.hideLoading()
    if (res.errMsg.indexOf("getUserInfo:fail") != -1 && (res.errMsg.indexOf("auth deny") != -1 || res.errMsg.indexOf("scope unauthorized") != -1)) {
      this.setData({ showAthorize: true })
    }
  },
  // 用户授权
  authorizeSuccess: function (userInfo) {
    this.setData({ showAthorize: false })
    this.getLogin()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearTimeout(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  checkNextPage: function (user) {
    //是否已经测试过
    var that = this
    if (app.globalData.questionLoading) {
      setTimeout(()=>{
        that.checkNextPage(user)
      },300)
      return
    }
    if (!app.globalData.questionData) {
      wx.showToast({
        title: '数据获取失败',
        duration: 2000,
        icon: 'loading',
      })
      return
    }
    // console.log("user Info: " + user)
    // wx.navigateTo({
    //   url: '/pages/index/index'
    // })
    // return
    
    wx.request({
      url: config.apiUrl.hasTested,
      method: "POST",
      data: {
        userId: user,
      },
      success: function (res) {
        console.log('test result: ', res.data)
        
        app.globalData.countUser = res.data.data.countUser
        if (res.data.code != 200 || !res.data.data.hasTested){//|| !(res.data.data.hasTested || res.data.data.testscore)) {
          // 尚未测试过，跳转到测试首页
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/index/index'
          })
        }
        else {
          that.dealHasTested(res)
        }
      }
    })
  },

  dealHasTested: function(res) {
    app.globalData.hasTestResult = true
    app.globalData.testResultIndex = res.data.data.result//res.data.data.testscore ? res.data.data.testResult : res.data.data.result
    if (res.data.data.result == 1) {
      app.globalData.testResults = questions.answers.A.allInformation
    } else if (res.data.data.result == 2) {
      app.globalData.testResults = questions.answers.B.allInformation
    } else if (res.data.data.result == 3) {
      app.globalData.testResults = questions.answers.C.allInformation
    } else if (res.data.data.result == 4) {
      app.globalData.testResults = questions.answers.D.allInformation
    } else { // res.data.data.result == 0 // 新题库
      var data = res.data.data.remark
      data = JSON.parse(data)
      for (var key in data) {
        data = data[key]
        app.globalData.testResults = data.allInformation
      }
      if (!data) {
        wx.showToast({
          title: '测试结果数据获取失败...',
          icon: 'loading',
          duration: 1500
        })
      }
    }
    if (app.globalData.scene == 1044 || app.globalData.scene == "1044") {
      //点击小程序消息卡片启动,获取群信息
      var userId = app.globalData.userId
      var wxSessionKey = app.globalData.wxSessionKey
      var sessionId = app.globalData.sessionId
      console.log(userId, wxSessionKey, sessionId)
      wx.getShareInfo({
        shareTicket: app.globalData.shareTicket,
        complete: function (res) {
          console.log('群信息', res)
          wx.request({
            url: config.apiUrl.userMatch,
            //header: header, //请求时带上这个请求头
            header: sessionId,
            method: "POST",
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              userId: userId,
              wxSessionKey: wxSessionKey
            },
            success: function (res) {
              console.log('--userMatch=', res)
              //同一个人再次在群聊里进入小程序，但其他人未测试，也即0人匹配情形
              if (res.data.code == 2007 || res.data.code == "2007") {
                wx.hideLoading()
                wx.navigateTo({
                  url: '/pages/friendlyAdvice/friendlyAdvice'
                })
              } else {
                //app.globalData.matchResults = res.data.data
                console.log("匹配结果：" + res.data.data)
                app.globalData.matchResults = res.data.data
                // wx.setStorageSync(
                //   "matchResults",
                //   res.data.data
                // )
                wx.hideLoading()
                wx.navigateTo({
                  url: '/pages/matching/matching'
                })
              }
            },
            fail: function () {

            }
          })
        },
      })
    } else {
      //已经测试过，且不是点击小程序消息卡片启动，则跳转到测试结果界面
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/testResult/testResult'
      })
    }
  },

  CooperationcConsultation: function () {
    wx.hideLoading()
    this.rec.hide(false)
  },

  submit: function (e) {
    console.log('~~~~~submit', e)
  },
})
