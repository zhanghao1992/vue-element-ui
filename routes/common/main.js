let express = require('express')
let multer = require('multer')
let axios = require('axios')
let vService = require('../../lib/vService')
const router = express.Router()
const upload = multer()
const qs = require('qs')

const NodeRSA = require('node-rsa')
const javaHTTP = 'http://172.21.120.207:18171'

// 获取图形验证码
router.get('/captcha', function (req, res) {
  // console.log(req.session.captcha)
  axios.get(`${javaHTTP}/apply/createCaptcha?_=${new Date().getTime()}`).then(json => {
    if (json.data.code === 0) {
      req.session.captcha = {
        value: json.data.response.token,
        createTime: new Date().getTime(),
        privateKey: (req.session.captcha && req.session.captcha.privateKey) || '',
        puplicKey: (req.session.captcha && req.session.captcha.puplicKey) || ''
      }
      // 设置公钥私钥
      if (!req.session.captcha.privateKey) {
        const key = new NodeRSA({b: 1024}, {signingScheme: 'pkcs1'})
        const publicDer = key.exportKey('pkcs8-public-der').toString('base64')
        const privateDer = key.exportKey('pkcs1').toString('base64')
        req.session.captcha.privateKey = privateDer
        req.session.captcha.puplicKey = publicDer
      }
      res.json({
        code: 0,
        response: {
          base64String: json.data.response.base64String,
          publicKey: req.session.captcha.puplicKey
        }
      })
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
  vService.get(req, res, {path: '/admin/getFileInfo'}, function (json) {
    // console.log('获取图片成功！')
    res.send(json)
  })
})

// 上传
router.post('/upload', upload.single('file'), function (req, res) {
  // console.log(req.file)
  const fileData = {
    contentType: req.file.mimetype,
    base64String: req.file.buffer.toString('base64'),
    fileName: req.file.originalname,
    suffix: req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1),
    size: req.file.size
  }
  vService.post(req, res, {
    path: '/admin/uploadFile',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data: fileData
  }, function (json) {
    // console.log('上传图片成功！')
    res.json({
      code: 0,
      response: {fileName: json.response.fileName, fileMD5: json.response.fileMD5}
    })
  })
  // axios({
  //   method: 'post',
  //   url: `${javaHTTP}/admin/uploadFile`,
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   // 发送请求点对data进行处理qs模块代替
  //   transformRequest: [function (data) {
  //     // Do whatever you want to transform the data
  //     let ret = ''
  //     for (let it in data) {
  //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //     }
  //     return ret
  //   }],
  //   data: qs.stringify(fileData)
  // }).then(json => {
  //   if (json.data.code === 0) {
  //     res.json({
  //       code: 0,
  //       response: {fileName: json.data.response.fileName, fileMD5: json.data.response.fileMD5}
  //     })
  //   } else {
  //     res.json(json.data)
  //   }
  // }).catch(() => {
  //   res.json({code: -1})
  // })
})

module.exports = router
