var express = require('express')
var router = express.Router()

router.post('/login', function (req, res) {
  res.json({
    code: 0,
    msg: '登陆成功',
    response: {}
  })
})

module.exports = router
