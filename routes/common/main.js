var express = require('express')
var multer = require('multer')
var axios = require('axios')
const router = express.Router()
const upload = multer()

// 获取图形验证码
router.get('/captcha', function (req, res) {
  axios({
    method: 'get',
    url: 'http://172.21.120.207:18171/apply/createCaptcha'
  }).then(json => {
    if (json.data.code === 0) {
      // req.session.captcha = {value: json.data.response.token, createTime: new Date().getTime()}
      // res.end(new Buffer(json.data.response.base64String, 'base64').toString('binary'), 'binary')
      res.send(JSON.stringify({code: 0, response: {base64String: json.data.response.base64String}}))
      // res.send(json.data.response)
    } else {
      res.send('')
    }
  }).catch(error => {
    // console.log(error)
    res.send(JSON.stringify({code: -1}))
  })
})

router.post('/upload', upload.single('file'), function (req, res) {
  axios({
    method: 'post',
    url: 'http://172.21.120.207:18171/admin/uploadFile',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    data: {
      contentType: req.file.mimetype,
      base64String: req.file.buffer.toString('base64'),
      fileName: req.file.originalname,
      suffix: req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1),
      size: req.file.size
    }
  }).then(json => {
    if (json.data.code === 0) {
      res.send(JSON.stringify({
        code: 0,
        response: {fileName: json.data.response.fileName, fileMD5: json.data.response.fileMD5}
      }))
    } else {
      console.log(json.data)
      res.send(JSON.stringify(json.data))
    }
  }).catch(error => {
    console.log(error)
    res.send(JSON.stringify({code: -1}))
  })
})

module.exports = router
