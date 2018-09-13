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

function notNull(target) {
  if (target == null) {
    return false;
  }

  if (typeof (target) == "undefined") {
    return false;
  }

  if (Object.prototype.toString.call(target) === "[object String]") {
    if (target == "") {
      return false;
    }
  }
  else if (Object.prototype.toString.call(target) === "[object Array]") {
    if (target.length == 0) {
      return false;
    }
  }
  else if (Object.prototype.toString.call(target) == '[object Object]') {
    for (var key in target) {
      return true;
    }
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  notNull: notNull,
}
