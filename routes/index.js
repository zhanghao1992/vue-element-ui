var express = require('express')
var router = express.Router()
var captcha = require('../lib/captcha')
let session = require('../lib/session')
let vService = require('../lib/vService')
// var store = require('../src/store/store')

// 登录
router.post('/login', function (req, res) {
  var captchaResult = captcha.check(req, req.body.ruleForm.encryptedCaptcha)
  if (captchaResult.code === 0) {
    // console.log(req.session)
    // console.log(req.body.ruleForm)
    req.session.user = {
      'id': 1,
      'username': 'fc12',
      'password': '1328-67-109-1871-17-2933-445875361475-51877559-39-22-786122-119-126-30106-405636124',
      'status': null,
      'createTime': new Date().getTime(),
      'type': ''
    }
    req.session.user.type = 'admin'
    session.login(req)
    // store.state.user = userInfo
    res.json({
      code: 0,
      msg: '登陆成功',
      response: {}
    })
  } else {
    res.send(JSON.stringify(captchaResult))
  }
})
// 退出
router.post('/exit', function (req, res) {
  console.log(11)
  session.logout(req)
  res.send(JSON.stringify({code: 0, msg: '退出成功！'}))
})

// 获取图片
router.post('/user', function (req, res) {
  res.send(JSON.stringify({code: 0}))
})

// 获取商品列表
router.get('/product/getProductList', function (req, res) {
  vService.post(req, res, {
    url: 'http://172.21.122.192:17076',
    path: '/product/getProductList'
  }, function (json) {
    console.log(json)
    res.json(json)
  })
})
module.exports = router
