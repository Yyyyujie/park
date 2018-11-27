// pages/uploadPic/uploadPic.js
const app = getApp();
import common from '../../common/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    camera:false,
    picStatus:false,
    tip:'',
    tipStatus:false,
    faceId:null,
    faceUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.src){
      this.setData({
        camera: false,
        src: options.src
      })
      this.sub();
    }else{
      this.setData({
        camera:true
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
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          camera:false,
          src: res.tempImagePath
        })
        this.sub();
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  again:function(){
    this.setData({
      camera: true,
      src: '',
      tipStatus:false
    })
  },
  //选择图片
  choosePic:function(){
    let that = this;
    wx.chooseImage({
      count:1,
      sourceType: ['album'],
      success: function(res) {
        // console.log(res)
        that.setData({
          camera: false,
          src: res.tempFiles[0].path
        })
        that.sub();
      },
    })
  },
  sub:function(){
    wx.showLoading({
      title: '正在校验图片...',
      mask:true
    })
    let that = this;
    wx.uploadFile({
      url: common.basePath + common.InterfaceUrl.upload, //仅为示例，非真实的接口地址
      filePath: that.data.src,
      name: 'facePicture',
      formData: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        wx.hideLoading();
        let data = JSON.parse(res.data);
        // console.log(data);
        if (data.errorCode==1){
          that.setData({
            picStatus:true,
          });
          app.globalData.faceUrl = data.body.faceUrl;
          app.globalData.faceId = data.body.faceId;
        } else if (data.errorCode == -2011 || data.errorCode == -2010){
          that.setData({
            picStatus: false,
            tip: data.msg,
            tipStatus: true
          })
        }else{
          that.setData({
            picStatus: false,
            tip:data.body.desc,
            tipStatus:true
          })
        }
        // const data = res.data
        //do something
      }
    })
  },
  //关闭错误提示
  hideTip:function(){
    this.setData({
      tipStatus:false
    })
  },
  next:function(){
   wx.showLoading({
     title: '提交中...',
     mask:true
   })
   let that = this;
    wx.request({
      url: common.basePath + common.InterfaceUrl.save, //仅为示例，并非真实的接口地址
      data: {
        visitorPhone: app.globalData.fkPhone,
        visitorName: app.globalData.fkName,
        accessPurpose: app.globalData.fkReson,
        visitDate: app.globalData.fkTime,
        visitorFacePicture: app.globalData.faceUrl,
        intervieweeId: app.globalData.memberId,
        visitorFaceId: app.globalData.faceId,
        token: wx.getStorageSync('token'),
        parkVisitorId: app.globalData.visitorId ? app.globalData.visitorId:''
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.success){
          app.globalData.visitorId = res.data.body.parkVisitorId;
          wx.reLaunch({
            url: '../success/success',
          })
        }else{
          wx.hideLoading();
          that.tipShow(res.data.msg)
        }
      }
    })
      
  },
  //返回
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  tipShow: function (title) {
    let that = this;
    this.setData({
      tip: title,
      tipStatus: true
    });
    setTimeout(function () {
      that.setData({
        tipStatus: false,
        nextStatus: false
      });
    }, 2000)
  },
})