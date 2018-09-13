const app = getApp()
const config = require('../../utils/config.js')
Page({
  data: {
    src: "",
    flagArr: [],
    flagImg: '',   //用于存放国家对应的脸谱
    flagId: null,
    ImgArr:[],
    countryFlag: '',
    firstCan: '',
    item: {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
    },
    touch: {
      delete: -1,
      method: '',
      element: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1
      },
      start: {
        index: 0,
        x: 0,
        y: 0
      },
      move: {
        x: 0,
        y: 0
      }
    },
    num: 0
  },
  onLoad:function(){
    let that = this
    that.setData({
      src: app.globalData.userInfo
    })
    wx.downloadFile({
      url: app.globalData.userInfo,
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
    if (!this.data.src) return
  },
  onShareAppMessage: function (opt) {
    console.log(opt)
    if (opt.from === 'button') {
      console.log(opt.target)
    }
    return {
      title: '来！有你就是主场，给喜欢的球队疯狂打call',
      path: '/pages/index/index',
      // imageUrl: '../../img/share.jpg'
    }
  },
  onShow: function(){
    let result = []
    let that = this
    wx.request({
      url: config.apiUrl.findFlag,
      success: function (res) {
        let arr = res.data.data.slice(1);
        arr.map(item => {
          item.countryFacialPictureUrl = item.countryFacialPictureUrl.replace('http', 'https')
          item.countryFlagUrl = item.countryFlagUrl.replace('http', 'https')
        })
        that.setData({
          ImgArr: res.data.data,
          countryFlag: arr[0].countryFlagUrl
        })
        if (that.data.flagImg === '') {
          wx.downloadFile({
            url: arr[0].countryFacialPictureUrl,
            success: function (suc) {
              that.setData({
                flagImg: suc.tempFilePath
              })
            }
          })
        }
        for (let i = 0; i < arr.length; i += 2) {
          result.push(arr.slice(i, i + 2));
        }
        that.setData({
          flagArr: result
        }) 
        app.globalData.faceCountry = arr[0].countryFacialPictureUrl
        app.globalData.selectedFlagId = '1';
      },
      fail: function () {
        console.log('fail')
      }
    })
    this.drawOne()
  },
  selectFlag:function(e){
    let that = this
    this.setData({
      flagId: e.currentTarget.id,
      countryFlag: this.data.ImgArr[e.currentTarget.id].countryFlagUrl,
      flagImg: that.data.ImgArr[e.currentTarget.id].countryFacialPictureUrl,
      num: 1
    })
    app.globalData.selectedFlagId = parseInt(e.currentTarget.id)
    app.globalData.selectedCountryName = this.data.ImgArr[e.currentTarget.id].countryName
    app.globalData.faceCountry = this.data.ImgArr[e.currentTarget.id].countryFacialPictureUrl
    wx.downloadFile({
      url: that.data.ImgArr[e.currentTarget.id].countryFacialPictureUrl,
      success: function (res) {
        that.setData({
          flagImg: res.tempFilePath
        })
        that.drawimage()
      }
    })
  },
  touchstart(e) {
    // 判断是偏移, 旋转还是放大
    // 触摸的开始值
    this.data.touch.start.x = e.touches[0].x
    this.data.touch.start.y = e.touches[0].y
    // 初始化触摸的元素
    this.data.touch.method = ''
    this.data.touch.element.width = 0
    this.data.touch.element.height = 0
    this.data.touch.element.x = 0
    this.data.touch.element.y = 0
    this.data.touch.element.scale = 1
    this.data.touch.element.rotate = 0
    let item = this.data.item
    let r = Math.sqrt(2) * (item.width / 2)
    let center = {
      x: 0,
      y: 0
    }
    let del = {
      x: 0,
      y: 0
    }
    let move = {
      x: 0,
      y: 0
    }
    center.x = item.x + item.width / 2
    center.y = item.y + item.height / 2
    del.x = center.x + r * Math.sin(Math.PI / 180 * (-45 - item.rotate))
    del.y = center.y - r * Math.cos(Math.PI / 180 * (-45 - item.rotate))
    move.y = center.y + r * Math.sin(Math.PI / 180 * (135 - item.rotate))
    move.x = center.x - r * Math.cos(Math.PI / 180 * (135 - item.rotate))
    if (e.touches[0].x > (move.x - 16) &&
      e.touches[0].x < (move.x + 16) &&
      e.touches[0].y > (move.y - 16) &&
      e.touches[0].y < (move.y + 16)) {
      this.data.touch.method = 'scale'
      this.data.touch.element.width = item.width
      this.data.touch.element.height = item.height
      this.data.touch.element.x = item.x
      this.data.touch.element.y = item.y
      this.data.touch.element.scale = item.scale
      this.data.touch.element.rotate = item.rotate
      return
    }
    if (e.touches[0].x > center.x - r &&
      e.touches[0].x < center.x + r &&
      e.touches[0].y > center.y - r &&
      e.touches[0].y < center.y + r) {
      this.data.touch.method = 'drag'
      this.data.touch.element.width = item.width
      this.data.touch.element.height = item.height
      this.data.touch.element.x = item.x
      this.data.touch.element.y = item.y
      this.data.touch.element.scaleX = item.scaleX
      this.data.touch.element.scaleY = item.scaleY
      this.data.touch.element.rotate = item.rotate
    }
    this.drawimage()
  },
  touchmove(e) {
    if (this.data.touch.method === 'drag') {
      if (e.touches[0].x > 0 && e.touches[0].x < 300 && e.touches[0].y > 0 && e.touches[0].y < 300) {
        this.data.touch.move.x = e.touches[0].x
        this.data.touch.move.y = e.touches[0].y
        this.data.item.x = this.data.touch.element.x + this.data.touch.move.x - this.data.touch.start.x
        this.data.item.y = this.data.touch.element.y + this.data.touch.move.y - this.data.touch.start.y
      }
    } else if (this.data.touch.method === 'scale') {
      this.data.touch.move.x = e.touches[0].x
      this.data.touch.move.y = e.touches[0].y
      this.data.item.x = this.data.touch.element.x - this.data.touch.move.x + this.data.touch.start.x
      this.data.item.y = this.data.touch.element.y - this.data.touch.move.x + this.data.touch.start.x
      this.data.item.width = (this.data.touch.move.x - this.data.touch.start.x) * 2 + this.data.touch.element.width
      this.data.item.height = (this.data.touch.move.x - this.data.touch.start.x) * 2 + this.data.touch.element.height
      let centerX = this.data.touch.element.x + this.data.touch.element.width / 2
      let centerY = this.data.touch.element.y + this.data.touch.element.height / 2
      this.data.item.translateX = centerX
      this.data.item.translateY = centerY
      let diffXBefore = this.data.touch.start.x - centerX
      let diffYBefore = this.data.touch.start.y - centerY
      let diffXAfter = this.data.touch.move.x - centerX
      let diffYAfter = this.data.touch.move.y - centerY
      let angleBefore = Math.atan2(diffYBefore, diffXBefore) / Math.PI * 180
      let angleAfter = Math.atan2(diffYAfter, diffXAfter) / Math.PI * 180
      this.data.item.rotate = angleAfter - angleBefore + this.data.touch.element.rotate
    }
    this.drawimage()
  },
  touchend(e) {
    if (this.data.touch.method === 'drag') {
      console.log('------drag-----')
    } else if (this.data.touch.method === 'clear') {
      console.log('------clear----')
    } else if (this.data.touch.method === 'scale') {
      console.log('------scale----')
    }
  },
  touchcancel(e) {
    console.log('----cancel-----')
  },
  drawimage() {
    let pathOne = this.data.src
    let pathTwo = this.data.flagImg
    const ctx = wx.createCanvasContext('canvas')
    var item = this.data.item
    // ctx.beginPath()
    // ctx.setStrokeStyle('transparent')
    // ctx.setLineWidth(0)
    // ctx.arc(150, 150, 150, 0, 2 * Math.PI, true)
    // ctx.closePath()
    // ctx.stroke()
    // ctx.clip()
    ctx.drawImage(pathOne, 0, 0, 300, 300)
    ctx.save()
    ctx.translate(item.translateX, item.translateY)
    ctx.rotate(item.rotate * Math.PI / 180)
    ctx.translate(-item.translateX, -item.translateY)
    ctx.drawImage(pathTwo, item.x, item.y, item.width, item.height * 0.625)
    ctx.setLineDash([5, 10], 10)
    ctx.setStrokeStyle('#fb5534')
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
    ctx.setLineWidth(2)
    ctx.strokeRect(item.x - 1, item.y - 1, item.width + 2, item.height + 2)
    ctx.drawImage('../../img/change.png', item.x + item.width - 14, item.y + item.height - 14, 28, 28)
    ctx.restore()
    ctx.drawImage('../../img/cover.png', 0, 0, 300, 300)
    ctx.draw()
  },
  drawOne: function(){
    let pathOne = this.data.src
    const ctx = wx.createCanvasContext('canvas')
    var item = this.data.item
    // ctx.beginPath()
    // ctx.setStrokeStyle('transparent')
    // ctx.setLineWidth(0)
    // ctx.arc(150, 150, 150, 0, 2 * Math.PI, true)
    // ctx.closePath()
    // ctx.stroke()
    // ctx.clip()
    ctx.drawImage(pathOne, 0, 0, 300, 300)
    ctx.save()
    ctx.drawImage('../../img/cover.png',0,0,300,300)
    ctx.draw()
  },
  keepImg: function(){
    let pathOne = this.data.src
    let pathTwo = this.data.flagImg
    const ctx = wx.createCanvasContext('canvas-one')
    var item = this.data.item,num = this.data.num
    if(num === 1){
      ctx.drawImage(pathOne, 0, 0, 300, 300)
      ctx.save()
      ctx.translate(item.translateX, item.translateY)
      ctx.rotate(item.rotate * Math.PI / 180)
      ctx.translate(-item.translateX, -item.translateY)
      ctx.drawImage(pathTwo, item.x, item.y, item.width, item.height * 0.625)
      ctx.restore()
      ctx.drawImage('../../img/cover.png', 0, 0, 300, 300)
      wx.showToast({
        title: '图片生成中...',
        icon: 'loading',
        duration: 500
      })
      ctx.draw(true, function () {
        wx.canvasToTempFilePath({
          canvasId: 'canvas-one',
          quality: 1,
          success: function (succ) {
            // return 
            app.globalData.userInfo = succ.tempFilePath
            wx.saveImageToPhotosAlbum({
              filePath: succ.tempFilePath,
              success: function (res) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 300
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../user-preview/user-preview',
                  })
                }, 500)
              },
              fail: function (err) {
                console.log(err);
                if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                  console.log("用户一开始拒绝了，我们想再次发起授权")
                  wx.openSetting({
                    success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                        wx.showToast({
                          title: '保存成功',
                          icon: 'success',
                          duration: 300
                        })
                        setTimeout(function () {
                          wx.navigateTo({
                            url: '../user-preview/user-preview',
                          })
                        }, 500)
                      } else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })
                }
              }
            })
          }
        }, this)
      })
    }else {
      wx.showToast({
        title: '请选择国家',
        icon: 'none',
        duration: 400
      })
    }
  }
})
