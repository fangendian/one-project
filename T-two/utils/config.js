const baseUrl = "https://api.koopoo.com.cn/koopoo-AG/"
// const baseUrl = "https://dev.koopoo.top/koopoo-AG/"
// const baseUrl = "https://test.mp.koopoo.top/koopoo-AG/"
// const baseUrl = "https://test.mp.koopoo.top/koopoo-AG/"

const in_apiUrl = {
  login: baseUrl + "user/login",
  hasTested: baseUrl + "user/testResults",
  saveResults: baseUrl + "user/saveResults",
  userLottery: baseUrl + "user/userLottery",
  userMatch: baseUrl + "user/userMatch",
  isOverdue: baseUrl + "user/isOverdue",
  fileUpload: baseUrl + "File/Upload", 
  questions: baseUrl + "user/queryquestion", 
  checkScoreResult: baseUrl + 'user/queryScore',
  cooperation: baseUrl + 'Customer/save',
  getMinAppJump: baseUrl + 'appchain/select',
  indexPageInterface: baseUrl + '/promotionproduction'
}

module.exports = {
  apiUrl: in_apiUrl
}