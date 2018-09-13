const app = getApp()
const config = require('../../utils/config.js')
Page({
  data: {
    posterArrOne:[],  //存放选中国家的具体海报
    poster:[],
    str: 0,    //用于判断获取海报类型
    posterId: 0,    //判断是否选中
    userSelectedImg: '',
    countryId: 0,
    firstImg: '',
    posterWidth: 0,
    posterHeight: 0,
    topFlag: ''
  },
  onLoad: function () {
    let that = this
    this.setData({
      userSelectedImg: app.globalData.userInfo,
      countryId: app.globalData.selectedFlagId,
      topFlag: app.globalData.faceCountry
    })
    wx.downloadFile({
      url: app.globalData.userInfo,
      success: function(res){
        console.log(res)
        that.setData({
          userSelectedImg: res.tempFilePath
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        let str = res.screenHeight / res.screenWidth
        if (str < 1.9) {
          that.setData({
            posterWidth: res.screenWidth,
            posterHeight: res.screenHeight,
            str: res.screenHeight / res.screenWidth
          })
        } else {
          that.setData({
            posterWidth: res.screenWidth,
            posterHeight: res.screenWidth * 2,
            str: res.screenHeight / res.screenWidth
          })
        }
      }
    })
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
    let that = this,str = that.data.str
    if (that.data.posterArrOne.length === 0){
      wx.request({
        url: config.apiUrl.findFacePoster + '?countryId=' + that.data.countryId,
        success: function (res) {
          let forArr = res.data.data
          forArr.map(item => {
            item.posterUrl = item.posterUrl.replace('http', 'https')
          })
          console.log(res.data.data)
          that.setData({
            firstImg: forArr[0].posterUrl
          })
          for (let i = 0; i < forArr.length; i++) {
            if (str < 1.9) {
              if (i % 2 == 0) {
                that.data.poster.push(forArr[i])
                that.setData({
                  posterArrOne: that.data.poster
                })
              }
            } else {
              if (i % 2 == 1) {
                that.data.poster.push(forArr[i])
                that.setData({
                  posterArrOne: that.data.poster
                })
              }
            }
          }
          wx.showToast({
            icon: 'loading',
            duration: 400
          })
          wx.downloadFile({
            url: forArr[0].posterUrl,
            success: function (succ) {
              that.setData({
                firstImg: succ.tempFilePath
              })
            }
          })
        }
      })
    }
  },
  selectedPoster:function(e){
    let that = this, selPoster = this.data.posterArrOne, ctx = wx.createCanvasContext('canvas')
    for (let i = 0; i < selPoster.length; i++) {
      if (selPoster[i].posterId == e.currentTarget.id) {
        that.setData({
          posterId: e.currentTarget.id,
          firstImg: selPoster[i].posterUrl
        })
        wx.showToast({
          icon: 'loading',
          duration: 200
        })
        wx.downloadFile({
          url: selPoster[i].posterUrl,
          success: function(res){
            that.setData({
              firstImg: res.tempFilePath
            })
            ctx.drawImage(that.data.firstImg, 0, 0, that.data.posterWidth, that.data.posterHeight)
            ctx.draw()
          }
        })
      } 
    }
  },
  keepCountryPoster: function(){
    let that = this, ctx = wx.createCanvasContext('canvas'), width = that.data.posterWidth, height = that.data.posterHeight
    let pathOne = that.data.firstImg, pathTwo = that.data.userSelectedImg
    ctx.stroke()
    ctx.drawImage(pathOne, 0, 0, width, height);
    ctx.restore()
    ctx.save()
    ctx.beginPath()
    ctx.arc(51, 51, 28, 0, 2 * Math.PI)
    ctx.setLineWidth(3)
    ctx.setStrokeStyle("#fff")
    ctx.closePath()
    ctx.stroke()
    ctx.clip()
    ctx.drawImage(pathTwo, 23, 23, 56, 56);
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
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (succ) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 300
              })
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
                    } else {
                      console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                    }
                  }
                })
              }
            }
          })
        },
        fail: function (res) {
          console.log('fail')
        }
      })
    }, 100))
  },
  shareFriends: function(e){
    console.log(e)
    var fid = e.detail.formId
    app.addFormId(fid)
  }
})
