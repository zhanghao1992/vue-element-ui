var express = require('express')
var router = express.Router()
var page = require('../lib/page')
var vService = require('../lib/vService')
var captcha = require('../lib/captcha')
var session = require('../lib/session')

// 图片查看
router.get('/check/img_detail', function (req, res) {
  page.load(req, res, {
    path: 'pages/check/img_detail',
    data: {
      fileMD5: req.query.fileMD5
    }
  })
})

module.exports = router
