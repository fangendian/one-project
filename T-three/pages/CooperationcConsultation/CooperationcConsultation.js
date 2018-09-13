//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    text1:"微信小程序",
    text2:"下一个风口，你不能错过",
    btn1:"合作咨询",
    text3:"靠谱小程序",
    text4:"提供更好的技术和服务",
    text5:"立即注册",
    text6:"抓住机遇 搭上微信小程序的大浪潮",
    btn2:"合作咨询",
    phoneNumber1:"400-821-6086",
    img1:"http://img.zcool.cn/community/019ca25a0c2b64a80121985c9f8f49.png@1280w_1l_2o_100sh.png",
  },
  onLoad: function (options) {
    
  },  
  onShow:function(){
    
  },
  alertPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '4008216086',
      success: function () {
        //console.log("拨打电话成功！")
      },
      fail: function () {
        //console.log("拨打电话失败！")
      }
    })  
  }
})
