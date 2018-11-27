// pages/auth/auth.js
import common from '../../common/common';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      // setTimeout(function(){
      //     wx.reLaunch({
      //       url: '../index/index',
      //     })
      // },2000)
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
    let that = this;
    wx.login({
      success: function (res) {
        // console.log(res.code);
        wx.request({
          url: common.basePath + common.InterfaceUrl.login,
          data: {
            code: res.code
          }, 
          method: 'GET',
          success(res) {
            console.log(res)
            wx.setStorageSync('token', res.data.body.token);
            // app.globalData.visitorId = res.data.body.visitorId;
            wx.request({
              url: common.basePath + common.InterfaceUrl.again,
              data: {
                token: wx.getStorageSync('token'),
                // visitorId: app.globalData.visitorId
              },
              method: 'GET',
              // header: {
              //   'content-type': 'application/x-www-form-urlencoded' // 默认值
              // },
              success(ret) {
                // console.log(ret)
                if (ret.data.errorCode == -2004 || ret.data.errorCode == -2003) {
                  that.setData({
                    url:'index'
                  })
                  // setTimeout(function () {
                  //   wx.reLaunch({
                  //     url: '../index/index',
                  //   })
                  // }, 5000)
                } else if (ret.data.errorCode == 1) {
                  app.globalData.fkResonCon = ret.data.body.accessPurpose;
                  app.globalData.phone = ret.data.body.intervieweeCompanyPhone;
                  app.globalData.address = ret.data.body.intervieweeCompanyArea;
                  app.globalData.fkPhone = ret.data.body.visitor.contactNumber;
                  app.globalData.fkName = ret.data.body.visitor.name;
                  app.globalData.selectCompany = ret.data.body.visitor.visitCompanyName;
                  app.globalData.memberId = ret.data.body.visitor.visitPerson.id;
                  app.globalData.selectMember = ret.data.body.visitor.visitPerson.name;
                  app.globalData.fkTime = ret.data.body.visitor.visitTime.substring(0, ret.data.body.visitor.visitTime.indexOf(" "));
                  app.globalData.visitorId=ret.data.body.visitor.id;
                  that.setData({
                    url: 'success'
                  })
                  // setTimeout(function () {
                  //   wx.reLaunch({
                  //     url: '../success/success?success=' + true,
                  //   })
                  // }, 5000)
                } else {
                  wx.showToast({
                    title: '未知错误',
                    icon:'none'
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  jump:function(){
    if(this.data.url){
      if(this.data.url=='index'){
        wx.reLaunch({
          url: '../index/index',
        })
      }else{
        wx.reLaunch({
          url: '../success/success?success=' + true,
        })
      }
    }else{
      console.log("还没判断")
    }
  }
})