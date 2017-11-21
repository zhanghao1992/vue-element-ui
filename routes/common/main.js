let express = require('express')
let multer = require('multer')
let axios = require('axios')
const router = express.Router()
const upload = multer()
const javaHTTP = 'http://172.21.120.207:18171'

// 获取图片
router.post('/user', function (req, res) {
  res.send(JSON.stringify({code: 0}))
})

// 获取图形验证码
router.get('/captcha', function (req, res) {
  console.log(req.session.captcha)
  axios.get(`${javaHTTP}/apply/createCaptcha?_=${new Date().getTime()}`).then(json => {
    if (json.data.code === 0) {
      req.session.captcha = {value: json.data.response.token, createTime: new Date().getTime()}
      // res.end(new Buffer(json.data.response.base64String, 'base64').toString('binary'), 'binary')
      res.json({code: 0, response: {base64String: json.data.response.base64String}})
      // res.send(json.data.response)
    } else {
      res.send('')
    }
  }).catch((err) => {
    console.log(err)
    res.json({code: -1})
  })
})

// 获取图片
router.get('/getFile', function (req, res) {
  axios.get(`${javaHTTP}/admin/getFileInfo`, {
    params: req.query
  }).then(json => {
    if (json.data.code === 0) {
      res.json(json.data)
    } else {
      res.send('')
    }
  }).catch(() => {
    res.json({code: -1})
  })
})

// 上传
router.post('/upload', upload.single('file'), function (req, res) {
  axios({
    method: 'post',
    url: `${javaHTTP}/admin/uploadFile`,
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
      res.json({
        code: 0,
        response: {fileName: json.data.response.fileName, fileMD5: json.data.response.fileMD5}
      })
    } else {
      res.json(json.data)
    }
  }).catch(() => {
    res.json({code: -1})
  })
})

module.exports = router
