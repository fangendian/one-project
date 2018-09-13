const app = getApp()
const config = require('../../utils/config.js')
Page({
  data: {
    posterArr: [],  //存放选中国家的具体海报
    poster: [],
    posterId: null,    //判断是否选中
    userSuredImg: '',
    firstImg: '',
    posterWidth: 0,
    posterHeight: 0,
    str: 0,
    userSelectedFlageId: null,
    userSelectCountry: ''
  },
  onLoad: function(){
    let that = this
    this.setData({
      userSuredImg: app.globalData.userInfo,
      userSelectedFlageId: parseInt(app.globalData.selectedFlagId),
      userSelectCountry: app.globalData.worldCup
    })
    console.log(app.globalData.userInfo)
    that.drawImg(app.globalData.userInfo)
    // return
    wx.downloadFile({
      url: app.globalData.userInfo,
      success: function (succ) {
        that.setData({
          userSuredImg: succ.tempFilePath
        })
        that.drawImg(app.globalData.userInfo) 
      },
      fail: function(err) {
        console.log(JSON.stringify(err), err)
        wx.showToast({
          title: err.errMsg,
        })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        let str = res.screenHeight / res.screenWidth
        if(str < 1.9){
          that.setData({
            posterWidth: res.screenWidth,
            posterHeight: res.screenHeight,
            str: res.screenHeight / res.screenWidth
          })
        }else {
          that.setData({
            posterWidth: res.screenWidth,
            posterHeight: res.screenWidth * 2,
            str: res.screenHeight / res.screenWidth
          })
        }
      },
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
  onShow: function () {
    let that = this
    wx.showToast({
      icon: 'loading',
      duration: 400
    })
    if (that.data.posterArr.length === 0){
      if (that.data.userSelectedFlageId === 33) {
        wx.request({
          url: config.apiUrl.findHugePoster,
          success: function (res) {
            let allPoster = res.data.data
            allPoster.map(item => {
              item.posterUrl = item.posterUrl.replace('http', 'https')
            })
            if (that.data.str < 1.9) {
              that.setData({
                posterArr: allPoster.slice(0, allPoster.length / 2),
                firstImg: allPoster[0].posterUrl
              })
            } else {
              that.setData({
                posterArr: allPoster.slice(allPoster.length / 2, allPoster.length),
                firstImg: allPoster[0].posterUrl
              })
            }
            wx.downloadFile({
              url: allPoster[0].posterUrl,
              success: function (succ) {
                that.setData({
                  firstImg: succ.tempFilePath
                })
                console.log(succ)
              }
            })
          }
        })
      } else {
        wx.request({
          url: config.apiUrl.findFacePoster + '?countryId=' + that.data.userSelectedFlageId,
          success: function (res) {
            let forArr = res.data.data
            forArr.map(item => {
              item.posterUrl = item.posterUrl.replace('http', 'https')
            })
            that.setData({
              firstImg: forArr[0].posterUrl
            })
            for (let i = 0; i < forArr.length; i++) {
              if (that.data.str < 1.9) {
                if (i % 2 == 0) {
                  that.data.poster.push(forArr[i])
                  that.setData({
                    posterArr: that.data.poster
                  })
                }
              } else {
                if (i % 2 == 1) {
                  that.data.poster.push(forArr[i])
                  that.setData({
                    posterArr: that.data.poster
                  })
                }
              }
            }
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
    }
  },
  selectedPoster: function (e) {
    let that = this, selPoster = that.data.posterArr, ctx = wx.createCanvasContext('canvas')
    for(let i = 0; i < selPoster.length; i++){
      if (selPoster[i].posterId == e.currentTarget.id){
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
  drawImg: function(url){
    const ctxOne = wx.createCanvasContext('userImg')
    ctxOne.clearRect(0,0,60,60)
    ctxOne.beginPath()
    ctxOne.arc(60, 60, 28, 0.33 * Math.PI, 2.1 * Math.PI, false)
    ctxOne.arc(81.5, 81.5, 8.5, 1.58 * Math.PI, 0.93 * Math.PI, false)
    ctxOne.setStrokeStyle('#fff')
    ctxOne.setLineWidth(3)
    ctxOne.stroke()
    ctxOne.clip()
    ctxOne.drawImage(url, 30, 30, 250 * 0.24, 250 * 0.24)
    ctxOne.draw()
  },
  keepYourLikePoster:function(){
    let that = this, ctx = wx.createCanvasContext('canvas'), width = that.data.posterWidth, height = that.data.posterHeight
    let pathOne = that.data.firstImg, pathTwo = that.data.userSuredImg
    ctx.stroke()
    ctx.drawImage(pathOne, 0, 0, width, height);
    ctx.restore()
    ctx.beginPath()
    ctx.arc(60, 60, 28, 0.33 * Math.PI, 2.1 * Math.PI, false)
    ctx.arc(81.5, 81.5, 8.5, 1.58 * Math.PI, 0.93 * Math.PI, false)
    ctx.setStrokeStyle('#fff')
    ctx.setLineWidth(3)
    ctx.stroke()
    ctx.clip()
    ctx.drawImage(pathTwo, 30, 30, 250 * 0.24, 250 * 0.24)
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
          console.log('fail',res)
        }
      })
    }, 100))
  },
  shareFriends: function (e) {
    console.log(e)
    var fid = e.detail.formId
    app.addFormId(fid)
  }
})
