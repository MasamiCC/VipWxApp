//根据开始时间生成数据
const datePickByStartTime = function (startTime){
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[], [], [], [], []];
  //开始时间的数组
  var startYear = startTime.getFullYear(); //开始的年份
  var startMouth = startTime.getMonth() + 1; //开始的月份
  var startDay = startTime.getDate(); //开始的日期

  //默认显示的数据
  var defaultDate = getNowDate(startTime);
  dateTimeArray[0] = loopArray(startYear, startYear,'年');//设置年份
  dateTimeArray[1] = loopArray(startMouth, 12, '月');//设置月份
  dateTimeArray[2] = getMonthDayNum(startYear, startMouth, startDay, '日');//设置日期
  dateTimeArray[3] = loopArray(0, 23, '时'); //设置小时
  dateTimeArray[4] = loopArray(0, 59, '分'); //设置分钟

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  //把数据返回
  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }

}

//得到现在的时间
const getNowDate = function (date) {
  var dateTime = [];
  dateTime.push(date.getFullYear() + '年')//放入年 
  dateTime.push(date.getMonth() + 1 + '月')//放入月
  dateTime.push(date.getDate() + '日')//放入日
  dateTime.push(date.getHours() + '时')//放入时
  dateTime.push(date.getMinutes() + '分')//放入分
  return dateTime;
}

//加载数据的函数
const loopArray = function (start, end, word) {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(i + word);
  }
  return array;
}


//得到每个月有多少天
const getMonthDayNum = function (year, month, startDay, word) {
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
  //遍历月份得到一个月有多少天
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      array = loopArray(startDay, 31, word)
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      array = loopArray(startDay, 30, word)
      break;
    case 2:
      array = flag ? loopArray(startDay, 29, word) : loopArray(startDay, 28, word)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}

//得到该月有多少天
const changeMonthDay = function(year,month,startTime,word){
  var startTime = getNowDate(startTime);

  //如果是当前年的当前月
  if (startTime[0] == year && startTime[1] == month){
    var startYear = parseInt(startTime[0])
    var startMouth = parseInt(startTime[1]);
    var startDay = parseInt(startTime[2]);
    array = getMonthDayNum(startYear, startMouth, startDay, '日');
    return array;
  }

  //截取年中的数字
  var year = parseInt(year);
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
  //遍历月份得到一个月有多少天
  switch (month) {
    case "1月":
    case "3月":
    case "5月":
    case "6月":
    case "8月":
    case "10月":
    case "12月":
      array = loopArray(1, 31, word)
      break;
    case "4月":
    case "6月":
    case "9月":
    case "11月":
      array = loopArray(1, 30, word)
      break;
    case "2月":
      array = flag ? loopArray(startDay, 29, word) : loopArray(startDay, 28, word)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;

}


module.exports = {
  datePickByStartTime: datePickByStartTime,
  changeMonthDay: changeMonthDay,
}