var db = wx.cloud.database();
// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGotUserInfo(e) {
    getApp().globalData.uname = e.detail.userInfo.nickName;
    getApp().globalData.uImg = e.detail.userInfo.avatarUrl;
    wx.reLaunch({
      url: '/pages/fruit/fruit',
    })
    // console.log(getApp().globalData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //自动获取到leaveNum中村的评论总数量保存再getApp中
    db.collection("leaveNum").get().then(res => {
      // console.log(res)
      if (res.data.length == 0) {
        db.collection("leaveNum").add({
          data: {
            num: 0
          }
        }).then(res => {
          // console.log(res)
          getApp().globalData.leaveNum = 0;
        }).catch(err => {
          // console.log(res)
        })
      } else {
        getApp().globalData.leaveNum = res.data[0].num
      }
    }).catch(err => {
      console.log(err)
    });
    //将水果商品数获取出来保存到getApp中
    db.collection("fruitNum").get().then(res => {
      if (res.data.length == 0) {
        db.collection('fruitNum').add({
          data: {
            num: 0
          }
        }).then(res => {
          console.log(res)
          getApp().globalData.fruitNum = 0;
          getApp().globalData.fruit_id = res.data[0]._id;
        }).catch(err => {
          // console.log(err)
        })
      } else {
        db.collection('fruitNum').where({
          _id: res.data[0]._id
        }).get().then(res => {
          console.log(res.data[0]._id)
          getApp().globalData.fruitNum = res.data[0].num;
          getApp().globalData.fruit_id = res.data[0]._id;
        })
      }
    }).catch(err => {
      // console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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