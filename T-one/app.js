//app.js
App({
  onLaunch: function () {

  },
  onShow: function (options){
    // console.log(options)
    this.globalData.scene = options.scene
    if (options.scene == 1044) {
      this.globalData.shareTicket = options.shareTicket
    }
  },
  isString: function (target, isEmpty) {
    if (target == null || typeof (target) == "undefined") {
      return false;
    }
    var isString = (Object.prototype.toString.call(target) == "[object String]");
    if (isString) {
      if (isEmpty) {
        if (target != "") {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  },
  // 搜集formId
  addFormId: function (id) {
    if (!this.isString(id)) return
    var list = this.globalData.formIds
    if (!list) list = []
    var timestamp = (new Date().getTime())
    var item = { 'formTime': timestamp, 'formId': id }
    list.push(item)
    this.globalData.formIds = list
    console.log(this.globalData.formIds)
  },
  globalData: {
    userInfo:'',    //存放用户头像
    selectedFlagId: '',       //存放用户选择的某个个国旗的id
    selectedCountryName: '伊朗',
    worldCup: '../../img/selected.png',
    scene: null,
    shareTicket: null,
    formIds: []
  }
})