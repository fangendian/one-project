// pages/components/authorize/authorize.js
const app = getApp()

// 登陆授权组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    fetchUserInfo(res) {
      console.log('authorize success: ', res)
      if (res.detail.errMsg === 'getUserInfo:fail auth deny') {
        app.utils.showToast('授权已拒绝')
      } else {
        // this.triggerEvent('fetchUserInfo')
        app.globalData.userInfo = res.userInfo
        // app.checkLogin(suc => {
        //   if (!suc) {
        //   } else {
            this.triggerEvent('authorizeSuccess')
        //   }
        // })
      }
      
    },
  }
})
