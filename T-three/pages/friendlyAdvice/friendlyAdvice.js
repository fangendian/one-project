//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    logoText: "靠谱小程序 提供技术支持"
  },
  onLoad: function (options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    var scene = decodeURIComponent(options.scene);
    console.log(scene);

    if (!this.rec) {
      this.rec = this.selectComponent('#joinUs')
    }
  },  
  onShow:function(){
    wx.showModal({
      title: '温馨提示',
      showCancel:false,
      content: '其他小伙伴正在测试路上\n匹配结果要稍等片刻哦~~',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '/pages/testResult/testResult'
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  CooperationcConsultation: function (event) {
    var fid = event.detail.formId
    app.addFormId(fid)
    this.rec.hide(false)
  },

  submit: function (e) {
    console.log('~~~~~submit', e)
  },
})
