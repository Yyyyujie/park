// pages/selectCompany/selectCompany.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList: [
      {
        name: '于世芳',
        row: '前端',
        icon: '',
        id: 111
      },
      {
        name: '秦宇宏',
        row: '测试',
        icon: '',
        id: 222
      }
    ],
    newCompany:[
      {
        name: '于世芳',
        row: '前端',
        icon: '',
        id: 111
      },
      {
        name: '秦宇宏',
        row: '测试',
        icon: '',
        id: 222
      }
    ],
    selectCompany: {},
    selectActive: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      selectActive: app.globalData.memberActive
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
  //选择企业
  select: function (e) {
    let index = e.currentTarget.dataset.index;
    let obj = {
      name: this.data.companyList[index].name,
      id: this.data.companyList[index].id
    }
    this.setData({
      selectCompany: obj,
      selectActive: index
    })

  },
  //点击确认
  chooseSure: function () {

    app.globalData.selectmember = this.data.selectCompany;
    app.globalData.memberActive = this.data.selectActive;
    console.log(app.globalData.selectCompany);
    wx.navigateBack({
      delta: 1
    })
  },
  search: function (e) {
    console.log(e.detail.value);
    var newList = this.data.companyList.map(function (item) {
      if (item.name.indexOf(e.detail.value) > -1) {
        return item
      }
    })
    this.setData({
      newCompany: newList
    })
    console.log(newList)
  }
})