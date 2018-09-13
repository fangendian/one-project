//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
Page({
  data: {
    src:"",
    stv: {
      offsetX: 0,
      offsetY: 0,
      zoom: false, //是否缩放状态
      distance: 0,  //两指距离
      scale: 1,  //缩放倍数
    },
    imgInfo: {
      width:0,
      height:0
    },
    canvasImg: {
      offsetTop: 0,
      offsetLeft: 0
    },
    deviceWidth: null,
    flagImg: '',
    flagId: '33',
    flagArr: [],
    ImgArr: [],
    one: '33',
    moveLeft: 0,
    moveTop: 0
  },
  onLoad: function () {
    let img = app.globalData.userInfo
    let newImg = img.replace('132','0')
    let that = this
    this.setData({
      src: newImg
    })
    wx.downloadFile({
      url: newImg,
      success: function(res){
        that.setData({
          src: res.tempFilePath
        })
      }
    })
    this.setData({
      'imgInfo.width': 250,
      'imgInfo.height': 250
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
  onShow:function(){
    let that = this, result = []
    wx.request({
      url: config.apiUrl.findFlag,
      success: function (res) {
        let arr = res.data.data;
        arr.map(item=>{
          item.countryFacialPictureUrl = item.countryFacialPictureUrl.replace('http', 'https')
          item.countryFlagUrl = item.countryFlagUrl.replace('http', 'https')
        })
        that.setData({
          imgUrl: arr[0].countryFlagUrl
        })
        if (that.data.flagImg === ''){
          that.setData({
            ImgArr: res.data.data
          })
          wx.downloadFile({
            url: arr[0].countryFacialPictureUrl,
            success: function (succ) {
              that.setData({
                flagImg: succ.tempFilePath
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
        console.log(that.data.flagArr)
        that.setData({
          'flagArr[0][0].countryName': ''
        })
        app.globalData.selectedFlagId = 33
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  selectFlag: function (e) {
    let that = this
    that.setData({
      flagId: e.currentTarget.id,
    })
    if (e.currentTarget.id == 33){
      that.setData({
        flagImg: that.data.ImgArr[0].countryFlagUrl,
        imgUrl: that.data.ImgArr[0].countryFlagUrl
      })
    }else {
      that.setData({
        flagImg: that.data.ImgArr[e.currentTarget.id].countryFlagUrl,
        imgUrl: that.data.ImgArr[e.currentTarget.id].countryFlagUrl
      })
    }
    wx.downloadFile({
      url: that.data.flagImg,
      success: function(succ){
        that.setData({
          flagImg: succ.tempFilePath
        })
      }
    })
    app.globalData.selectedFlagId = e.currentTarget.id
  },
  changeUserImg: function () {
    let that = this;
    let timeOne = new Date()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceWidth: res.windowWidth
        })
      }
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        that.setData({
          src: tempFilePaths.join('')
        })
        wx.getImageInfo({
          src: tempFilePaths.join(''),
          success: function (imgInfo) {
            if (that.data.deviceWidth > res.width) {
              that.setData({
                'imgInfo.width': imgInfo.width,
                'imgInfo.height': imgInfo.height
              })
            } else {
              that.setData({
                'imgInfo.width': that.data.deviceWidth,
                'imgInfo.height': imgInfo.height * that.data.deviceWidth / imgInfo.width
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
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
    let that = this
    //触摸移动中
    if (e.touches.length === 1) {
      //单指移动,无法缩放
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
      stv.offsetLeftX = -stv.offsetX;
      stv.offsetLeftY = -stv.offsetLeftY;
      this.setData({
        stv: stv
      });
    } else {
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
    let that = this
    if (e.touches.length === 0) {
      this.setData({
        'stv.zoom': false, //重置缩放状态
      })
    }
  },
  loadImg(){
    const that = this
    wx.downloadFile({
      url:that.data.imgUrl,
      success:function(res){
        that.keepImg(res)
      },
      fail:function(fail){
        console.log(fail)
      }
    })
  },
  keepImg(res){
    let that = this
    const ctx = wx.createCanvasContext('canvas')
    let path = that.data.src, pathOne = res.tempFilePath, num = that.data.flagId, scale = 1 / that.data.stv.scale
    ctx.clearRect(0, 0, 250, 250)
    // ctx.beginPath()
    // ctx.setStrokeStyle('#FFED97')
    // ctx.setLineWidth(10)
    // ctx.save()
    // ctx.arc(130, 130, 125, 0, 2 * Math.PI, true)
    // ctx.closePath()
    // ctx.stroke()
    // ctx.clip()
    if (scale !== 1) {
      ctx.drawImage(path, that.data.moveLeft, that.data.moveTop, that.data.imgInfo.width * that.data.stv.scale, that.data.imgInfo.height * that.data.stv.scale);
    } else {
      ctx.drawImage(path, that.data.stv.offsetX, that.data.stv.offsetY, that.data.imgInfo.width, that.data.imgInfo.height);
    }
    ctx.restore()
    if(num === '33'){
      ctx.drawImage(pathOne, 180, 159, 70, 91)
      ctx.restore()
      ctx.drawImage('../../img/cover-two.png', 0, 0, 250, 250)
    }else {
      ctx.beginPath()
      ctx.arc(215, 215, 34, 0, 2 * Math.PI, true)
      ctx.setLineWidth(5)
      ctx.setStrokeStyle("#fff")
      ctx.closePath()
      ctx.stroke()
      ctx.drawImage(pathOne, 181, 181, 68, 68)
      ctx.restore()
      ctx.drawImage('../../img/cover-two.png', 0, 0, 250, 250)
    }
    wx.showToast({
      title: '图片生成中...',
      icon: 'loading',
      duration: 800
    })
    ctx.draw(true, setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        quality: 1,
        success: function (res) {
          // return 
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 300
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '../world-cup-preview/world-cup-preview',
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
                          url: '../world-cup-preview/world-cup-preview',
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
          app.globalData.userInfo = res.tempFilePath
        },
        fail: function (res) {
          console.log('fail')
        }
      })
    }, 100))
  }
})
