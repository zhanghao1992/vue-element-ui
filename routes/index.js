var express = require('express')
var router = express.Router()
var captcha = require('../lib/captcha')

router.post('/login', function (req, res) {
  var captchaResult = captcha.check(req, req.body.ruleForm.encryptedCaptcha)
  if (captchaResult.code === 0) {
    res.json({
      code: 0,
      msg: '登陆成功',
      response: {}
    })
  } else {
    res.send(JSON.stringify(captchaResult))
  }
})

// 获取图片
router.post('/user', function (req, res) {
  console.log(req.body)
  res.send(JSON.stringify({code: 0}))
})

module.exports = router
