const axios = require('axios')
const qs = require('qs')

module.exports = {
  debug: true,
  getUrl (req) {
    return 'http://172.21.120.207:18171'
  },
  get (req, res, option, callback) {
    let me = this
    axios.get(`${me.getUrl()}${option.path}`, {
      params: req.query
    }).then(json => {
      callback(json.data)
    }).catch(() => {
      res.json({code: -1})
    })
  },
  post (req, res, option, callback) {
    let me = this
    axios.post(`${me.getUrl()}${option.path}`, qs.stringify(option.data), {
      headers: option.headers || {'content-type': 'application/json'}
    }).then(json => {
      callback(json.data)
    }).catch(() => {
      res.json({code: -1})
    })
  }
}
