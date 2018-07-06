const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/***
 * 校验手机号
 */
const isMobile = mobile => {
  return (/^1(3|4|5|7|8)\d{9}$/.test(mobile))
}

/***
 * 校验验证码
 */
const isYzm = yzm => {
  return (/^\d{6}$/.test(yzm))
}

/***
 * 提示错误
 */
const showError = error => {
  wx.showToast({
    icon: 'none',
    title: error,
    duration: 1000
  })
}

/***
 * 获取3rd_session key
 */
const getSessionKey = key => {
  return wx.getStorageSync("3rd_session")
}

/***
 * 获取定位信息location
 */
const getLocation = location => {
  return wx.getStorageSync('location');
}

const unique= arr=>{
  var array = arr.split(",")
  var result = [], hash = {};
  for (var i = 0, elem; (elem = array[i]) != null; i++) {
    if (!hash[elem] && elem) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result.join(',');
}
const arrToString=arr=>{
  var str='';
  for(var i in arr){
    if(str==''){
      str+='?'+i+"="+arr[i]
    }else{
      str += '&' + i + "=" + arr[i]
    }
  }
  return str;
}



module.exports = {
  formatTime: formatTime,
  isMobile: isMobile,
  isYzm: isYzm,
  showError: showError,
  getSessionKey: getSessionKey,
  getLocation: getLocation,
  unique: unique,
  arrToString: arrToString
}

