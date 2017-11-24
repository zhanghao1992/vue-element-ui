var axios = require('axios')

module.exports = {
  debug: true,
  init (req, res, option, callback) {
    var me = this
    me.option = Object.assign({}, option)
  },
  getUrl (req) {
    return 'http://172.21.120.207:18171'
  },
  get (req, res, option, callback) {
    this.init(req, res, option, callback)
    var me = this
    axios.get(`${me.getUrl()}${me.option.path}`, {
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
  },
  post () {}
}
