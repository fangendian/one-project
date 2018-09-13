// const baseUrl = 'https://test.mp.koopoo.top/worldcup'
const baseUrl = 'https://mp.koopoo.top/worldcup'
const apiInterWorldCup = {
  indexPageInterface: baseUrl + '/promotionproduction',
  findFlag: baseUrl + '/country/selectCountry',
  findHugePoster: baseUrl + '/poster/selectPoster',
  findFacePoster: baseUrl + '/poster/selectFacialPoster',
  faceImgHy: baseUrl + '/File/Upload',
  login: baseUrl + '/login/login'
}
module.exports = {
  apiUrl: apiInterWorldCup
}