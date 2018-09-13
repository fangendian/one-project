// pages/mine/joinUs/joinUs.js
const app = getApp()
const utils = require('../../utils/util.js')
const config = require('../../utils/config.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasTab: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: '',
    phone: '',
    desc: '',
    hideMe: true,
  },

  ready() {
    this.setData({
      name: '',
      phone: '',
      desc: '',
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submit(e) {
      var fid = e.detail.formId
      app.addFormId(fid)

      this.triggerEvent('submit', e)

      var name = this.data.name
      var phone = this.data.phone
      var desc = this.data.desc
      
      var userName = ''
      var userAvatar = ''

      try {
        // var userInfo = wx.getStorageSync('userInfo')
        var userInfo = app.globalData.userInfo
        userName = userInfo.nickName
        userAvatar = userInfo.avatarUrl
      } catch(e) {

      }

      var _this = this

      if (!(utils.notNull(name) && utils.notNull(phone) && utils.notNull(desc))) {
        wx.showToast({
          title: '信息尚未填写完整',
          icon: 'none'
        })
        return
      }
      if (!(/^1[345789]\d{9}$/.test(phone))) {// && !(/^0[\d]{2,3}-[\d]{7,8}$/.test(phone))) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }
      
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: config.apiUrl.cooperation,
        data: {
          headPortrait: userAvatar,
          nickName: userName,
          customerName: name,
          customerPhone: phone,
          cooperationContent: desc
        },
        method: 'POST',
        success: (res)=>{
          console.log('~~~suc=', res)
          if (res.statusCode != 200 || res.data.code != 200) {
            wx.showToast({
              title: res.data.message || res.errMsg,
              icon: 'loading'
            })
          } else {
            wx.showToast({
              title: '数据上传成功',
              icon: 'success'
            })

            setTimeout(() => {
              _this.cancel()
            }, 1500)
          }
        },
        fail: (err)=>{
          console.log('~~~err=',err)
          wx.showToast({
            title: err.errMsg,
            icon: 'loading'
          })
        }, complete: ()=> {
          setTimeout(()=>{
            wx.hideLoading()
          },1500)
          
        }
      })
    },

    cancel(event) {
      if(event){
        var fid = event.detail.formId
        app.addFormId(fid)
      }
      this.setData({
        hideMe: true,
        name: '',
        phone: '',
        desc: '',
      })
    },

    inputEnd(e) {
      var value = e.detail.value
      var type = e.currentTarget.dataset.type
      switch(type) {
        case '1':
            this.data.name = value
          break
        case '2':
            this.data.phone = value
          break
        case '3':
          this.data.desc = value
          break
        default: break
      }
    },

    hide(hide) {
      this.setData({
        hideMe: hide,
      })
    }
  }
})
