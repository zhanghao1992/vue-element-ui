let express = require('express')
let multer = require('multer')
let axios = require('axios')
let vService = require('../../lib/vService')
// let session = require('../../lib/session')
const router = express.Router()
const upload = multer()
const qs = require('qs')

const NodeRSA = require('node-rsa')
const javaHTTP = 'http://172.21.120.207:18171'

// 获取图形验证码
router.get('/captcha', function (req, res) {
  // console.log(req.session.captcha)
  vService.post(req, res, {path: `/apply/createCaptcha?_=${new Date().getTime()}`}, function (json) {
    if (json.code === 0) {
      req.session.captcha = {
        value: json.response.token,
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
          base64String: json.response.base64String,
          publicKey: req.session.captcha.puplicKey
        }
      })
    } else {
      res.json(json)
    }
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

// 获取session
router.get('/getSession', function (req, res) {
  res.json({
    code: 0,
    response: {
      session: req.session,
      sessionID: req.sessionID
    }
  })
})
module.exports = router
