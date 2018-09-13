const app = getApp()
var questions=require("../../utils/questions.js")
Page({
  data:{
    imagePath: "/images/2.jpg",
    title:"",
    result:"",
    phoneWidth:"",
    phoneHeight:"",
    canvasWidth:"",
    canvasHeight:"",
    /*
    官网说hidden只是简单的控制显示与隐藏，组件始终会被渲染，
    但是将canvas转化成图片走的居然是fail，hidden为false就是成功的
    所以这里手动控制显示隐藏canvas
    */
    canvasHidden:false,//初始时显示canvas
    previewHidden:true
  },
  onLoad:function(){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var res = wx.getSystemInfoSync()
    console.log(res)

    if(res.brand=="iPhone"){
      that.data.phoneWidth = res.windowWidth
      that.data.phoneHeight = res.windowHeight
    }else{
      that.data.phoneWidth = res.windowWidth
      that.data.phoneHeight = res.windowHeight
    }
    if (app.globalData.testResultIndex==1){
      app.globalData.singleIndex = questions.answers.A.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.A.detailedAnalysisSeparate
    }else if (app.globalData.testResultIndex == 2){
      app.globalData.singleIndex = questions.answers.B.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.B.detailedAnalysisSeparate
    }else if (app.globalData.testResultIndex == 3){
      app.globalData.singleIndex = questions.answers.C.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.C.detailedAnalysisSeparate
    } else if (app.globalData.testResultIndex == 4){
      app.globalData.singleIndex = questions.answers.D.singleIndex
      app.globalData.detailedAnalysisSeparate = questions.answers.D.detailedAnalysisSeparate
    } else { //app.globalData.testResults = 0 //新题库
      if (app.globalData.allTestResults) {
        app.globalData.singleIndex = app.globalData.allTestResults.singleIndex
        app.globalData.detailedAnalysisSeparate = app.globalData.detailedAnalysisSeparate.singleIndex
      } else {
        app.globalData.singleIndex = ''
        app.globalData.detailedAnalysisSeparate = ['']
      }
    }
    that.setData({
      phoneWidth: that.data.phoneWidth,
      phoneHeight: that.data.phoneHeight,
      title: app.globalData.singleIndex,
      result: app.globalData.detailedAnalysisSeparate,
      canvasHidden: false,//初始时显示canvas
      previewHidden: true
    });
    that.createNewImg();
  },
  onReady:function(){
    //页面渲染完成
    //this.createNewImg();
    //创建初始化图片
  },
  onShow:function(){
    //页面显示
  },
  onHide:function(){
    //页面隐藏
  },
  onUnload:function(){
    //页面关闭
  },
 //将金额绘制到canvas的固定位置
  setTitle:function(context){
    var title=this.data.title;
    console.log(title);
    context.setFontSize(23);
    context.setFillStyle("#f2721c");
    context.fillText(title, (this.data.phoneWidth)*0.23, (this.data.phoneHeight)*0.37);
    context.stroke();
  },
  setResult: function (context) {
    var result = this.data.result;
    console.log(result);
    if (this.data.phoneWidth > 320 && this.data.phoneWidth<414){
      for (var index in result) {
        context.setFontSize(17);
        context.setFillStyle("#000000");
        context.fillText(result[index], 65, 245 + 26 * index);
        context.stroke();
      }
    } else if (this.data.phoneWidth>=414){
        for (var index in result) {
          context.setFontSize(17);
          context.setFillStyle("#000000");
          context.fillText(result[index], 80, 280 + 30 * index);
          context.stroke();
        }
      }
    else{
      for (var index in result) {
        context.setFontSize(15);
        context.setFillStyle("#000000");
        context.fillText(result[index], 50, 220 + 28 * index);
        context.stroke();
      }
    }
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg:function(){
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
    })

    setTimeout(function() {
      wx.hideLoading()
      //将生成好的图片保存到本地
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          console.log("hjx" +res.tempFilePath)
        },
        fail:function(res){
          console.log("hjx1234"+res.tempFilePath)
        },
        complete:function(res){
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
            fail: function (){
              //var savedFilePath3 = res.tempFilePath
              console.log("fail:" + savedFilePath1)
              that.setData({
                imagePath: savedFilePath1,
                canvasHidden: true,//生成完图片后将画布隐藏
                previewHidden: false
              })
            },
            complete:function(res){
            }
          })
        }
      })
    },3000)
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    var img = this.data.imagePath
    console.log("img:"+img)
    this.setData({
      imagePath:img,
      canvasHidden: true,
      previewHidden: false,
      canvasWidth:0,
      canvasHeight:0
    });
    console.log(this.data.canvasWidth, this.data.canvasHeight)
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
})