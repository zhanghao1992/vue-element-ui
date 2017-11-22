export default {
  getQueryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return decodeURIComponent(r[2])
    }
    return null
  },
  setCookie: function (c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + '=' + encodeURIComponent(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  },
  getCookie: function (c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + '=')
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(';', c_start)
        if (c_end === -1) {
          c_end = document.cookie.length
        }
        return decodeURIComponent(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  }
}
