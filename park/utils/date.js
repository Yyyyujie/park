const padStart = (string, length, pad) => {
    const s = String(string)
    if (!s || s.length >= length) return string
    return `${Array((length + 1) - s.length).join(pad)}${string}`
}

const REGEX_FORMAT = /y{2,4}|M{1,2}|d{1,2}|h{1,2}|m{1,2}|s{1,2}/g

class DateUtils {
    constructor(date) {
        this.defaultFormat = 'yyyy-MM-dd'
        this._date = this.parseDate(date)
        this.init()
    }

    parseDate(date) {
        if (!date) {
            return new Date()
        }
        if (date instanceof Date) {
            return date
        }

        return new Date(date)
    }

    init() {
        this._y = this._date.getFullYear()
        this._M = this._date.getMonth()
        this._d = this._date.getDate()
        this._h = this._date.getHours()
        this._m = this._date.getMinutes()
        this._s = this._date.getSeconds()
    }

    format(fmt = this.defaultFormat) {
        return fmt.replace(REGEX_FORMAT, match => {
            switch (match) {
                case 'yy':
                    return String(this._y).slice(-2)
                case 'yyyy':
                    return this._y
                case 'M':
                    return this._M + 1
                case 'MM':
                    return padStart(this._M + 1, 2, 0)
                case 'd':
                    return this._d
                case 'dd':
                    return padStart(this._d, 2, 0)
                case 'h':
                    return this._h
                case 'hh':
                    return padStart(this._h, 2, 0)
                case 'm':
                    return this._m
                case 'mm':
                    return padStart(this._m, 2, 0)
                case 's':
                    return this._s 
                case 'ss': 
                    return padStart(this._s, 2, 0)
            }
        })
    }

    countDown(date, setCountDown, doneCb) {
        const second = 1000
        const minute = 1000 * 60
        const hour = 1000 * 60 * 60
        const day = 1000 * 60 * 60 * 24

        let timeStamp = this.parseDate(date).getTime()
        let timer = setInterval( () => {
            let leftTime = timeStamp - Date.now()
            if (leftTime <= 1000) {
                clearInterval(timer)
                return doneCb && doneCb()
            }
            let leftDays = Math.floor(leftTime / day)
            let leftHours = Math.floor(leftTime / hour % 24)
            let leftMinutes = Math.floor(leftTime / minute % 60)
            let leftSeconds = Math.floor(leftTime / second % 60)

          let ret = leftDays > 0 ? leftDays + '天' + padStart(leftHours, 2, 0) + '小时' + padStart(leftMinutes, 2, 0) + '分钟' + padStart(leftSeconds, 2, 0) + '秒' : ''+ padStart(leftHours, 2, 0) + '小时'+ padStart(leftMinutes, 2, 0) + '分钟'+ padStart(leftSeconds, 2, 0) + '秒'
            setCountDown && setCountDown(ret)
        }, 1000)

        return timer
    }

    add(time, type) {
      time = parseInt(time)
      switch (type) {
        case 'year':
          this._date.setYear(this._y + time)
          break
        case 'month':
          this._date.setMonth(this._M + time)
          break
        case 'day':
          this._date.setDate(this._d + time)
          break
        case 'hour':
          this._date.setHours(this._h + time)
          break
      }
      this.init()
      return this
    }

    getWeek() {
        return this._date.getDay() === 0 ? 7 : this._date.getDay()
    }
    getChinese () {
        let str = '星期'
        switch(this.getWeek()){
            case 1:
                return str + '一'
                break;
                case 2:
                return str + '二'
                break;
                case 3:
                return str + '三'
                break;
                case 4:
                return str + '四'
                break;
                case 5:
                return str + '五'
                break;
                case 6:
                return str + '六'
                break;
                case 7:
                return str + '日'
                break;
        }
    }
}

const dateUtils = (date) => {
    return new DateUtils(date)
}

export default dateUtils
