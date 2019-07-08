// pages/groom/groom.js
var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    list: [1, 2, 3, 4,5,6],
    groomList: [],
    groomitem: [],
    fruitNum: "",
  },
  /*
   * 从云数组库读取6条数组
   * 当用户下拉时再添加6条
   */
  getGroom() {
    for (var i = 0; i < 6; i++) {
      if (this.data.fruitNum >= 0) {
        db.collection("fruit").where({
          id: `${this.data.fruitNum--}`
        }).get().then(res => {
          console.log(res.data)
          this.data.groomitem.push(res.data[0]);
          this.setData({
            groomList: this.data.groomitem
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        wx.showToast({
          title: '已经加载所有的水果了',
          image: '/images/times.png'
        })
      }
    }

  },
  /*
   *数量变化就预加如购物车
   *判断购物车数组中有没有该水果的id
   *如果有 仅改变数量
   *如果没有就再购物车数组添加该水果
   */
  onStepperChange(e) {
    var result = [];
    getApp().cart.forEach((item, index) => {
      if (item.id == e.target.dataset.id) {
        result.push(true);
        result.push(index);
      }
    })
    console.log(result)
    if (result[0]) {
      getApp().cart[result[1]].num = e.detail
    } else {
      getApp().cart.unshift({
        id: e.target.dataset.id,
        num: e.detail,
        isCart: false
      })
    }
    console.log(getApp().cart)
  },
  /*
   *先判断触发函数img  还是tag
   *如果是img 就跳转到商品详情页并且将水果id传过去
   *如果是tag先判断 getApp 中 cart中是否存在
   *存在就把他的显示状态改为true
   *不存在就添加
   */
  groomNumChange(e) {
    if (e.target.dataset.classname == 'img') {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.target.dataset.id}`,
      })
    } else if (e.target.dataset.classname == 'tag') {
      var result = [];
      getApp().cart.forEach((value, index, arr) => {
        if (value.id == e.target.dataset.id) {
          result.push(true);
          result.push(index);
        }
        if (result[0]) {
          getApp().cart[index].isCart = true;
        } else {
          getApp().cart.unshift({
            id: e.target.dataset.id,
            num: 1,
            isCart: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      fruitNum: getApp().globalData.fruitNum
    });
    this.getGroom()
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
    this.getGroom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})