//index.js
//获取应用实例
var util = require('../../utils/util.js');
import common from '../../common/common';
import dateUtils from '../../utils/date';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reson:[],
    selectCompany:null,
    selectMember:null,
    startYear: 2000,
    endYear: 2050,
    phone:null,//被访人的手机号码
    send: '获取',
    btnStatus: false,
    fkName:null,
    fkPhone:null,
    code:null,
    company:false,
    resonActive:0,
    resonCon:null,
    date: '2016-09-01',
    tip: 'lkajkl ',
    tipStatus: false,
    type:null,
    memberId:null,
    btnStatus:false,
    regCode:'',
    address:'',
    startDate:'',
    endDateStart:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: dateUtils().format("yyyy-MM-dd"),
      startDate: dateUtils().format("yyyy-MM-dd"),
      endDateStart: parseInt(dateUtils().format("yyyy"))+1+'-12-31'
    });
    if(options.change){
      this.setData({
        selectCompany: app.globalData.selectCompany,
        selectMember: app.globalData.selectMember,
        company:true,
        phone: app.globalData.phone,
        resonCon: app.globalData.fkResonCon,
        date: app.globalData.fkTime,
        address: app.globalData.address,
        fkName:app.globalData.fkName,
        fkPhone: app.globalData.fkPhone,
        memberId:app.globalData.memberId
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(app.globalData.selectCompany);
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    let that = this;
    this.setData({
      selectCompany: app.globalData.selectCompany,
      selectmember: app.globalData.selectmember
    })
    wx.request({
      url: common.basePath + common.InterfaceUrl.reson, //仅为示例，并非真实的接口地址
      data: {
        token:wx.getStorageSync('token'),
      },
      method: 'GET',
      success(res) {
        // console.log(res);
        wx.hideLoading();
        that.setData({
          reson: res.data.body.accessPurposeList
        });
        res.data.body.accessPurposeList.forEach(function(item,index){

          if (item.label == that.data.resonCon){
            that.setData({
              resonActive:index
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //被访单位下一步
  next:function(){
    this.setData({
      nextStatus:true
    });
    let mobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    let name = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,5}$/;
    if (!mobile.test(this.data.phone)){
      this.tipShow('请输入被访人联系方式');
      return false
    }
    if (!this.data.selectCompany || !this.data.selectMember){
      this.tipShow('暂无此被访人员');
      return false
    }
    if(this.data.phone==this.data.fkPhone){
      this.tipShow('访客和被访人员不能一致');
      return false
    }
    if(!this.data.fkName){
      this.tipShow('请输入访客姓名');
      return false
    }
    if (!name.test(this.data.fkName)) {
      this.tipShow('访客名字格式有误，请输入中文名字');
      return false
    }
    if (!mobile.test(this.data.fkPhone)) {
      this.tipShow('请输入访客联系电话');
      return false
    }
    if (!this.data.code) {
      this.tipShow('请输入验证码');
      return false
    }
    if (this.data.code!=this.data.regCode){
      this.tipShow('验证码错误');
      return false
    }
    // if (!this.data.resonActive) {
    //   this.tipShow('请选择访问目的');
    //   return false
    // }
    app.globalData.selectCompany = this.data.selectCompany;
    app.globalData.selectMember = this.data.selectMember;
    app.globalData.memberId = this.data.memberId;
    app.globalData.phone = this.data.phone;
    app.globalData.fkName = this.data.fkName;
    app.globalData.fkPhone = this.data.fkPhone;
    app.globalData.fkTime = this.data.date;
    app.globalData.fkReson = this.data.reson[this.data.resonActive].value;
    app.globalData.fkResonCon = this.data.reson[this.data.resonActive].label;
    app.globalData.address = this.data.address;
    this.setData({
      nextStatus: false
    });
    wx.navigateTo({
      url: '../face/face',
    })
  },
  //收集信息
  getMessage:function(e){
    let str = e.currentTarget.dataset.type;
    let mobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
   
    let that = this;
    this.setData({
      [str]:e.detail.value,
    })
    if (str == 'phone' && mobile.test(e.detail.value)) {
      wx.showLoading({
        title: '正在查询...',
        mask:true
      })
      //这里获取被访人的单位信息
      wx.request({
        url: common.basePath + common.InterfaceUrl.checkMember, //仅为示例，并非真实的接口地址
        data: {
          token: wx.getStorageSync('token'),
          visitorPhone: that.data.phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method:'POST',
        success(res) {
          wx.hideLoading();
          if (!res.data.success){
            that.tipShow(res.data.msg);
            that.setData({
              selectCompany:null,
              selectMember: null
            })
          }else{
            that.setData({
              tipStatus: false,
              company: str == 'phone' && mobile.test(that.data.phone),
              selectCompany: res.data.body.interviewee.intervieweeCompanyName,
              selectMember: res.data.body.interviewee.intervieweeName,
              memberId: res.data.body.interviewee.id,
              address: res.data.body.interviewee.intervieweeCompanyArea
            })
          }
          console.log(res)
        }
      })
      
    } else if (str == 'phone' && !mobile.test(e.detail.value)){
      that.setData({
        tipStatus: false,
        company: str == 'phone' && mobile.test(that.data.phone),
      })
    } else if (str == "fkPhone" && mobile.test(e.detail.value) && e.detail.value==that.data.phone){
      this.tipShow('不能选择被访人员');
    } else if (str == "fkPhone" && !mobile.test(e.detail.value)){
      this.setData({
        code:'',
        regCode:''
      })
    }
  },
  //点击获取验证码
  sendCode: function () {
   
    console.log(this.data.fkPhone)
    let mobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (mobile.test(this.data.fkPhone)) {
      wx.showLoading({
        title: '发送中...',
        mask: true
      })
      let sendCon = this.data.send;
      let that = this;
      if (sendCon == "获取") {
        wx.request({
          url: common.basePath + common.InterfaceUrl.sendCode, //仅为示例，并非真实的接口地址
          data: {
            token: wx.getStorageSync('token'),
            phone: that.data.fkPhone
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            // console.log(res)
            if(res.data.success){
              that.tipShow('验证码发送到'+that.data.fkPhone+',请注意查收')
              that.setData({
                regCode: res.data.body.verificationCode
              })
              wx.hideLoading();
              that.secondTime();
            }else{
              that.tipShow(res.data.msg)
            }
           
          }
        })
      }
    } else {
      this.tipShow('请输入正确的手机号码')
    }

  },
  //发送验证码的倒计时
  secondTime: function () {
    wx.hideLoading();
    let that = this;
    let second = 60;
    that.setData({
      send: second + "S后重发"
    })
    let inter = setInterval(function () {
      second--;
      that.setData({
        send: second + "S后重发"
      })
      if (second == 0) {
        clearInterval(inter);
        that.setData({
          send: "获取",
          btnStatus: false
        })
      }
    }, 1000);
    that.setData({
      btnStatus: true
    })
  },
  //选择访问目的
  chooseReson:function(e){
    this.setData({
      resonActive: e.currentTarget.dataset.index,
      resonCon: e.currentTarget.dataset.con
    })
  },
  //时间选择器
  bindDateChange: function (e) {
    let date;
    date = e.detail.value.replace(/\//g, '-');
    this.setData({
      date: e.detail.value
    })
  },
  //关闭错误提示
  hideTip: function () {
    this.setData({
      tipStatus: false
    })
  },
  tipShow:function(title){
    let that = this;
      this.setData({
        tip:title,
        tipStatus:true
      });
      setTimeout(function(){
        that.setData({
          tipStatus: false,
          nextStatus:false
        });
      },2000)
  },
  //清空输入的名字
  clearName:function(){
    this.setData({
      fkName:null
    })
  },
  //清空输入的手机号码吗
  clearPhone: function () {
    this.setData({
      fkPhone: null
    })
  }
})
