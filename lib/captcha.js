var NodeRSA = require('node-rsa')
module.exports = {
  expirationTime: 60,
  check: function (req, s) {
    console.log(req.session.captcha)
    console.log(s)
    var key = new NodeRSA(req.session.captcha.privateKey)
    key.setOptions({encryptionScheme: 'pkcs1'})
    var decryptCapycha = key.decrypt(s, 'utf8')
    // console.log(s)
    // console.log(decryptCapycha)
    // console.log(req.session.captcha)
    if (!req.session.captcha || !req.session.captcha.value) {
      return {code: 1, msg: '无图形验证码'}
    }
    if (req.session.captcha.createTime + (this.expirationTime * 1000) < new Date().getTime()) {
      return {code: 2, msg: '图形验证码过期'}
    }
    if (req.session.captcha.value.toLowerCase() !== decryptCapycha.toLowerCase()) {
      return {code: 3, msg: '图形验证码不正确'}
    }
    if (req.session.captcha.value.toLowerCase() === decryptCapycha.toLowerCase()) {
      return {code: 0, msg: '图形验证通过'}
    }
    return {code: -1, msg: '未知错误'}
  }
}
