var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({
  data: {
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },
  onLoad() {
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  changeDateTime1(e) {
    console.log("change")
    this.setData({ dateTime1: e.detail.value });
  },
  changecancel:function(){
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  changeDateTimeColumn1(e) {
    console.log(e.detail.value)
    console.log(this.data.dateTime1)
    var arr = this.data.dateTime1;
    
     var dateArr = this.data.dateTimeArray1;
    
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    
    // this.setData({
    //   dateTimeArray1: dateArr,
    //   dateTime1: arr
    // });
  }
})