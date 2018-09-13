var app = getApp()
Page({
  data: {
    userImg: '',
    stv: {
      offsetX: 0,
      offsetY: 0,
      zoom: false, //是否缩放状态
      distance: 0,  //两指距离
      scale: 1,  //缩放倍数
      offsetLeft: 0, //双指缩放后的offsetLeft值
      offsetTop: 0 //双指缩放后的offsetTop值
    },
    deviceWidth: 0,
    moveLeft: 0,
    moveTop: 0,
    height: 0,
    width: 0
  },
  onLoad: function () {
    let that = this
    this.setData({
      width: 300,
      height: 300,
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceWidth: res.windowWidth
        })
      }
    })
    let img = app.globalData.userInfo
    let newImg = img.replace('132', '0')
    this.setData({
      userImg: newImg
    })
    wx.downloadFile({
      url: newImg,
      success: function (res) {
        that.setData({
          userImg: res.tempFilePath
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
  onShow: function () {
    
  },
  changeImg: function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          userImg: res.tempFilePaths.join('')
        })
        wx.getImageInfo({
          src: res.tempFilePaths.join(''),
          success: function(succ){
            if (that.data.deviceWidth > succ.width) {
              that.setData({
                width: succ.width,
                height: succ.height
              })
            } else {
              that.setData({
                width: that.data.deviceWidth,
                height: succ.height * that.data.deviceWidth / succ.width
              })
            }
          }
        })
      },
    })
  },
  keepImgs: function(){
    let that = this
    const ctx = wx.createCanvasContext('canvas')
    let pathOne = that.data.userImg
    ctx.clearRect(0,0,300,300)
    ctx.save()
    if (that.data.stv.scale != 1){
      ctx.drawImage(pathOne, that.data.moveLeft, that.data.moveTop, that.data.width * that.data.stv.scale, that.data.height * that.data.stv.scale);
    }else {
      ctx.drawImage(pathOne, that.data.stv.offsetX, that.data.stv.offsetY, that.data.width * that.data.stv.scale, that.data.height * that.data.stv.scale);
    }
    ctx.draw(true, setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        quality: 1,
        success: function (res) {
          setTimeout(function () {
            wx.navigateTo({
              url: '../logs/logs',
            })
          }, 500)
          app.globalData.userInfo = res.tempFilePath
        },
        fail: function (res) {
          console.log('fail')
        }
      })
    }, 100))
    wx.showToast({
      title: '跳转中....',
      icon: 'loading',
      duration: 500
    })
  },
  touchstartCallback: function (e) {
    //触摸开始
    if (e.touches.length === 1) {
      let { clientX, clientY } = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;
      this.touchStartEvent = e.touches;
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      this.setData({
        'stv.distance': distance,
        'stv.zoom': true, //缩放状态
      })
    }
  },
  touchmoveCallback: function (e) {
    //触摸移动中
    let that = this
    if (e.touches.length === 1) {
      if (this.data.stv.zoom) {
        return;
      }
      let { clientX, clientY } = e.touches[0];
      let offsetX = clientX - this.startX;
      let offsetY = clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
      let { stv } = this.data;
      stv.offsetX += offsetX;
      stv.offsetY += offsetY;
      this.setData({
        stv: stv
      });
    } 
    else {
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      let distanceDiff = distance - this.data.stv.distance;
      let newScale = this.data.stv.scale + 0.005 * distanceDiff;
      this.setData({
        'stv.distance': distance,
        'stv.scale': newScale,
      })
    }
    wx.createSelectorQuery().select('.move-img').boundingClientRect(function (rect) {
      that.setData({
        moveLeft: rect.left,
        moveTop: rect.top
      })
    }).exec()
  },
  touchendCallback: function (e) {
    //触摸结束
    if (e.touches.length === 0) {
      this.setData({
        'stv.zoom': false, //重置缩放状态
      })
    }
  }
})