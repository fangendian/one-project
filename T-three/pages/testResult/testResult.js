//index.js
//获取应用实例
const app = getApp()
var questions = require("../../utils/questions.js")
const config = require('../../utils/config.js')

Page({
  data: {
    showCardBtn: true,
    testNumbers: null,
    buttonFont: "18px",
    question: questions.first,
    testResults: "",
    logoText: "靠谱小程序 提供技术支持",
    view: {
      Width: null,
      fontSize: null,
      marginTop: null,
      top1: null
    },
    // 生成卡片 -begin
    imagePath: "/images/2.jpg",
    title: "",
    result: "",
    phoneWidth: 414,
    phoneHeight: "",
    canvasWidth: "",
    canvasHeight: "",
    canvasHidden: true,//初始时显示canvas
    previewHidden: true,
    uploadFlag: false,//卡片是否上传成功
    jumpInfor: null,
    // 生成卡片 -end
    freeLoop: []
  },
  onLoad: function () {
    var that = this
    var res = wx.getSystemInfoSync()
    that.setData({
      jumpInfor: app.globalData.jumpInfor
    })
    that.data.screenWidth = res.screenWidth
    that.data.screenHeight = res.screenHeight
    that.data.windowWidth = res.windowWidth
    that.data.windowHeight = res.windowHeight
    that.data.phoneVresion = res.system
    if (that.data.screenWidth > 320 && that.data.screenWidth < 414) {

    } else if (that.data.screenWidth >= 414) {

    } else {
      if (that.data.screenWidth < 375) {
        that.setData({
          buttonFont: "14px"
        })
      }
      that.setData({
        view: {
          fontSize: "18px"
        }
      })
    }
    if (that.data.screenHeight <= 480) {
      that.setData({
        view: {
          fontSize: "16px",
          marginTop: "-26px",
          top1: "86vh"
        }
      })
    }
    var firstNUm = that.data.phoneVresion.substr(0,1)
    if (firstNUm=="i"){
      that.data.phoneVresion = that.data.phoneVresion.substr(4, 9)
      console.log(that.data.phoneVresion)
      //that.cpr_version(that.data.phoneVresion, '10.3.3')
      that.cpr_version(that.data.phoneVresion, '10.3.3')
    }else{
      that.setData({
        showCardBtn: true
      })
    }
    if (!this.rec) {
      this.rec = this.selectComponent('#joinUs')
    }
  },

  initCanvas: function(){
    // 生成卡片
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var res = wx.getSystemInfoSync()
    console.log(res)

    if (res.brand == "iPhone") {
      that.data.phoneWidth = res.windowWidth
      that.data.phoneHeight = res.windowHeight
    } else {
      that.data.phoneWidth = res.windowWidth
      that.data.phoneHeight = res.windowHeight
    }
    if (app.globalData.testResultIndex == 1) {
      app.globalData.singleIndex = questions.answers.A.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.A.detailedAnalysisSeparate
    } else if (app.globalData.testResultIndex == 2) {
      app.globalData.singleIndex = questions.answers.B.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.B.detailedAnalysisSeparate
    } else if (app.globalData.testResultIndex == 3) {
      app.globalData.singleIndex = questions.answers.C.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.C.detailedAnalysisSeparate
    } else if (app.globalData.testResultIndex == 4) {
      app.globalData.singleIndex = questions.answers.D.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.D.detailedAnalysisSeparate
    } else { //app.globalData.testResults = 0 //新题库
      if (app.globalData.allTestResults) {
        app.globalData.singleIndex = app.globalData.allTestResults.singleIndex
        app.globalData.detailedAnalysisSeparate = app.globalData.detailedAnalysisSeparate.singleIndex
      } else{
        app.globalData.singleIndex = ''
        app.globalData.detailedAnalysisSeparate = ['']
      }
    }
    that.setData({
      phoneWidth: that.data.phoneWidth,
      phoneHeight: that.data.phoneHeight,
      title: app.globalData.singleIndex,
      result: app.globalData.detailedAnalysisSeparate,
      // canvasHidden: false,//初始时显示canvas
      canvasHidden: false,//初始时显示canvas
      previewHidden: true,
      uploadFlag: false, //上传标志清空
    });
    // that.createNewImg();
  },
  //假定字符串的每节数都在5位以下
  toNum: function (a) {
    var a = a.toString();
    //也可以这样写 var c=a.split(/\./);
    var c = a.split('.');
    var num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
    for (var i = 0; i < c.length; i++) {
      var len = c[i].length;
      c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
  }, 
  cpr_version: function (a, b) {
    var that=this
    console.log(that)
    var _a = that.toNum(a), _b = that.toNum(b);
      if (_a == _b){
        //console.log("版本号相同！版本号为：" + a);
        that.setData({
          showCardBtn:false
        })
      }
      if (_a > _b) {
        //console.log("版本号" + a + "是新版本！");
        that.setData({
          showCardBtn: false
        })
        console.log(11)
      }
      if (_a < _b){
        //console.log("版本号" + b + "是新版本！"); 
        that.setData({
          showCardBtn: true
        })
      }
    },
  onShow: function () {
    let that = this
    console.log('---userInfo=', app.globalData.userId)
    var testResults = app.globalData.testResults
    var starLevel = (testResults.split('★')).length - 1;
    var flag = testResults.indexOf('\n')
    var testContent = testResults.substr(flag+1,testResults.length-flag)
    this.setData({
      testResults: testResults,
      testNumbers: app.globalData.countUser,
      starLevel: starLevel, 
      testContent: testContent,
      showRedenvelope: app.globalData.showRedenvelope
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.request({
      url: config.apiUrl.indexPageInterface,
      success: function (res) {
        that.setData({
          freeLoop: res.data.data
        })
        console.log(that.data.freeLoop)
      }
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '看看和谁是绝配',
      imageUrl: "http://static-1253586872.file.myqcloud.com/shop/2284/0874a59e-3d44-48f8-8e72-6ec759bf510c.jpg",
      path: '/pages/launching/launching',
      success: function (res) {
        // 转发成功
        const shareTicket = res.shareTickets[0]
        wx.getShareInfo({
          shareTicket: shareTicket,
          complete: function (res) {
            var userId = app.globalData.userId
            var wxSessionKey = app.globalData.wxSessionKey
            //var header = getApp().globalData.header; //获取app.js中的请求头(李金梁)
            var sessionId = app.globalData.sessionId
            wx.request({
              url: config.apiUrl.userLottery,
              //header: header, //请求时带上这个请求头
              header: sessionId, //请求时带上这个请求头
              method: "POST",
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
                userId: userId,
                wxSessionKey: wxSessionKey
              },
              success: function (res) {
                console.log(res)
              },
              fail: function () {

              }
            })
          },
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  generateCard: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    // console.log('generateCard')
    // this.createNewImg();

    wx.navigateToMiniProgram({
      appId: 'wxf40e662f1b2ad97b',
      path: 'pages/reward/reward',
    })
  },
  transferring: function () {
    wx.navigateTo({
      url: '../turntable/turntable',
    })
  },
  getStorageUserId: function (user) {
    try {
      var value = app.globalData.user
      if (value) {
        return value
      }
    } catch (e) {
      console.log(e)
    }
  },
  CooperationcConsultation: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    this.rec.hide(false)
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  submit: function (e) {
    console.log('~~~~~submit', e)
  },

  // 生成卡片 
   //将金额绘制到canvas的固定位置
  setTitle: function (context) {
    var title = this.data.title;
    console.log(title);
    context.setFontSize(23);
    context.setFillStyle("#f2721c");
    context.fillText(title, (this.data.phoneWidth) * 0.23, (this.data.phoneHeight) * 0.37);
    context.stroke();
  },
  setResult: function (context) {
    var result = this.data.result;
    console.log(result);
    if (this.data.phoneWidth > 320 && this.data.phoneWidth < 414) {
      for (var index in result) {
        context.setFontSize(17);
        context.setFillStyle("#000000");
        context.fillText(result[index], 65, 245 + 26 * index);
        context.stroke();
      }
    } else if (this.data.phoneWidth >= 414) {
      for (var index in result) {
        context.setFontSize(17);
        context.setFillStyle("#000000");
        context.fillText(result[index], 80, 280 + 30 * index);
        context.stroke();
      }
    }
    else {
      for (var index in result) {
        context.setFontSize(15);
        context.setFillStyle("#000000");
        context.fillText(result[index], 50, 220 + 28 * index);
        context.stroke();
      }
    }
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    this.initCanvas();
    console.log('createNewImg')
    var that = this;
    var context = wx.createCanvasContext("mycanvas");
    var path = "/images/2.jpg";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, -10, this.data.phoneWidth, this.data.phoneHeight);
    that.setTitle(context);
    that.setResult(context);
    //绘制图片
    wx.drawCanvas({
      canvasId: "mycanvas",
      actions: context.getActions()
    });

    wx.showLoading({
      title: '卡片生成中...',
      mask: true,
    })

    setTimeout(function () {
      // wx.hideLoading()
      //将生成好的图片保存到本地
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas', 
        success: function (res) {
          console.log("hjx" + res.tempFilePath)
         // 上传卡片到后台
          // try{
            var userId = app.globalData.userId
            that.uploadImage(userId,that);
          // }catch(e){
          //   console.log(e)
          // }
        },
        fail: function (res) {
          console.log("hjx1234" + res.tempFilePath)
        },
        complete: function (res) {
          wx.hideLoading()
          var savedFilePath1 = res.tempFilePath
          console.log(res);
          wx.saveFile({
            tempFilePath: savedFilePath1,
            success: function (res) {
              var savedFilePath2 = res.savedFilePath
              console.log(savedFilePath2)
              that.setData({
                imagePath: savedFilePath2,
                canvasHidden: true,//生成完图片后将画布隐藏
                previewHidden: false
              })
            },
            fail: function () {
              //var savedFilePath3 = res.tempFilePath
              console.log("fail:" + savedFilePath1)
              that.setData({
                imagePath: savedFilePath1,
                canvasHidden: true,//生成完图片后将画布隐藏
                previewHidden: false
              })
            },
            complete: function (res) {
            }
          })
        }
      })
    }, 3000)
  },
//  上传图片
  uploadImage: (userId,that)=>{
  wx.uploadFile({
    url: config.apiUrl.fileUpload,
    header: {
      'content-type': 'multipart/form-data'
    },
    filePath: that.data.imagePath,
    name: 'file_data',
    formData: {
      userId: userId,
    },
    success: function (res) {
      //修改上传成功标志 
      that.setData({ uploadFlag: true })
      console.log(res)
    },
    fail: function (err) {
      console.error(err)
    },
  })
},
// 关闭卡片预览界面
  hidePreview: function(){
    this.setData({
      previewHidden: true,
      canvasHidden: true,
    })
  },

// 卡片保存
  saveImg: function(){
    var that = this;
    console.log(that.data.imagePath)
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success: function(){
        wx.showToast({
          title: '保存成功',
        })
        that.setData({
          previewHidden: true,
          canvasHidden: true,
        })
      },
      fail: (err)=>{
        console.log(err)
        that.setData({
          previewHidden: true,
          canvasHidden: true,
        })
      }
    })
  },

// 卡片分享
  shareImg: function(){
    var that = this
    // wx.uploadFile({
    //   url: config.apiUrl.fileUpload,
    //   header: {
    //    'content-type':'multipart/form-data'
    //    },
    //   filePath: that.data.imagePath,
    //   name: 'file_data',
    //   success: function(res){
    //     wx.showToast({
    //       title: '上传成功',
    //     })
    //     console.log(res)
    //   },
    //   fail: function(err){
    //     console.error(err)
    //   }
    // }) 
  },
  shareSomething: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    var fid = event.detail.formId
    app.addFormId(fid)
    wx.navigateToMiniProgram({
      appId: this.data.jumpInfor.appId,
      path: this.data.jumpInfor.appChainUrl,
    })
  },
  loadSomething: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    wx.navigateToMiniProgram({
      // appId: 'wxa064ddc7c17de7e2',
      // path: 'pages/today/today',
      appId: this.data.jumpInfor.appId,
      path: this.data.jumpInfor.appChainUrl,
    })
  },
  jumpMiniprogram: function (e) {
    let id = e.currentTarget.id, productId = e.currentTarget.dataset.productionid
    wx.navigateToMiniProgram({
      appId: 'wxa064ddc7c17de7e2',
      path: 'pages/MFQ/today/today?fromMini=1&productid=' + productId,
      envVersion: 'release',
      success(res) {
        console.log('---success---')
      }
    })
  }
})
  