// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname: '', //保存用户名
    uImg: '', //保存用户头像地址
  },
  skipManage() {
    wx.navigateTo({
      url: '/pages/manage/manage',
    })
  },
  testSubmit: function(e) {
    let _access_token = "23_KNnxFsgTxbNf67A1oI6zv4ek3a237Y54cL--de3YqECm104F2RN7x8SAXKT63SKEiuBsCYYoXxnKhXkUpq6k1kU6AQ3LlDJ_cFussS4VfessH7ZVKOKnYRP1zg2JBRQnizFgYtB-hvFJIAl9ZATcAGAOPI";
    let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token;
    let _jsonData = {
      access_token: _access_token,
      touser: "oDOEN5O4iB_3VLlf6-LK4_-_EvIw",
      template_id: '0qPDjvhLqTSb4gz66e5Sj-z3QN-Ge0oSvV41PAvUg3c',
      form_id: e.detail.formId,
      data: {
        "keyword1": {
          "value": "测试数据一",
          "color": "#173177"
        },
        "keyword2": {
          "value": "测试数据二",
          "color": "#173177"
        },
        "keyword3": {
          "value": "测试数据三",
          "color": "#173177"
        },
        "keyword4": {
          "value": "测试数据四",
          "color": "#173177"
        }
      }
    }
    wx.request({
      url: url,
      data: _jsonData.data,
      method: "POST",
      success: function(res) {
        console.log(res)
      },
      fail: function(err) {
        console.log('request fail ', err);
      },
      complete: function(res) {
        console.log("request completed!");
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uname: getApp().globalData.uname,
      uImg: getApp().globalData.uImg
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(getApp().user.openId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})