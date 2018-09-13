//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    showSex:null,
    age:'',
    items: [
      { name: '1', value: '男'},
      { name: '2', value: '女'},
    ],
    constellationIndex: 0,
    constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座','双鱼座'],
    animation1Action:{},
    animation2Action: {},
  },

  onLoad: function (){
    var that=this
    var gender = app.globalData.userInfo.gender
    // var gender = that.getStorageUserId("userInfo").gender
    console.log(gender)
    if (gender != 1 && gender != 2){
      that.setData({
        showSex:true,
      })
    } else if (gender == 1 || gender == 2){
      that.setData({
        showSex: false,
        sex: gender
      })
    }
  },


  ageInput:function(e){
    this.setData({
      age: e.detail.value
    })
    //console.log(this.data.age)
  },

  radioChange: function (e) {
    //this.data.sex = e.detail.value
    //return this.data.sex
    app.globalData.sex = e.detail.value
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },

  constellationChioce: function (e) {
    this.setData({
      constellationIndex: e.detail.value
    })
  },  
  start:function(){
    app.globalData.age = this.data.age;
    app.globalData.sex=this.data.sex;
    app.globalData.constellation = Number(this.data.constellationIndex)+1;
    console.log(app.globalData.constellation);
    console.log(app.globalData.age, app.globalData.constellation)
    if (this.data.age == '' || this.data.age == undefined){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      this.animation = animation
      animation.translate(100, 0).step({ duration: 100 }).translate(-100, 0).step({ duration: 100 }).translate(50, 0).step({ duration: 150 }).translate(0, 0).step({ duration: 150 })
      this.setData({
        animation1Action: animation.export()
      })
    }else if (this.data.sex == '' || this.data.sex == undefined){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      this.animation = animation
      animation.translate(100, 0).step({ duration: 100 }).translate(-100, 0).step({ duration: 100 }).translate(50, 0).step({ duration: 150 }).translate(0, 0).step({ duration: 150 })
      this.setData({
        animation2Action: animation.export()
      })
    }
    else{
      wx.redirectTo({
        url: '/pages/test/test'
      });
      this.setData({
        age:'',
        sex:''
      })  
    }
  },

  // getStorageUserId: function (user) {
  //   try {
  //     var value = wx.getStorageSync(user)
  //     if (value) {
  //       return value
  //     }
  //   } catch (e) {
  //     //console.log(e)
  //   }
  // },


})
