var express = require('express')
var multer = require('multer')
var axios = require('axios')
// var request = require('request')

const router = express.Router()

const upload = multer()

router.post('/upload', upload.single('file'), function (req, res) {
  // console.log(req.file.mimetype)
  // request.post({
  //   url: 'http://172.21.120.207:18171/admin/uploadFile',
  //   form: {
  //     contentType: req.file.mimetype,
  //     base64String: req.file.buffer.toString('base64'),
  //     fileName: req.file.originalname,
  //     suffix: req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1),
  //     size: req.file.size
  //   }
  // }, function (err, httpResponse, body) {
  //   if (err || httpResponse.statusCode !== 200) {
  //     console.log(httpResponse.statusCode)
  //     res.send(JSON.stringify({code: -1}))
  //     //                            res.end();
  //   } else {
  //     res.send(JSON.stringify({code: -2}))
  //   }
  // })
  axios({
    method: 'post',
    url: 'http://172.21.120.207:18171/admin/uploadFile',
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
      console.log('ssssssssssss')
      console.log(json.data)
      res.send(JSON.stringify(json.data))
    }
  }).catch(error => {
    console.log(error)
    res.send(JSON.stringify({code: -1}))
  })
})

module.exports = router
