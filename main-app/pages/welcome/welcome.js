// pages/welcome/welcome.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonelist: [{
        name: '回收客服热线',
        phoneNo: '18198575678'
      },
      {
        name: '销售客服热线',
        phoneNo: '18198576789'
      }
    ],
    imgUrls:[],
    // imgUrls: [{
    //     url: "../couponget/index",
    //     src: "../../img/activie.png"
    //   },
    //   {
    //     url: "../couponget/index",
    //     src: "../../img/banner.png"

    //   }
    // ],
    cateList: [{
      id: 1,
      bid: -1,
      text: "手机回收",
      imgSrc: "../../img/icon-mobile-1.png"
    }, {
      id: 2,
      bid: -1,
      text: "平板回收",
      imgSrc: "../../img/icon-pad-1.png"
    }, {
      id: 3,
      bid: -1,
      text: "笔记本回收",
      imgSrc: "../../img/icon-notebook-1.png"
    }],
    curModelInfo: null,
    commentData: [],
    iconSearch: "../../img/icon-search.svg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    wx.request({
      url: app.NEW_API + "/api/swiper_img.json",
      method: "post",
      data: {
        wx_appid: app.wx_appid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        that.setData({
          imgUrls: res.data.data.swiper_imgs
        })
      }
    })
  },
  //点击键盘上的搜索
  goSearch: function(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  goProducts: function(e) {
    wx.switchTab({
      url: '../products/products',
    })
  },
  goProductsP: function (e) {
    wx.setStorageSync('jump_id', e.currentTarget.dataset.id)
    wx.switchTab({
      url: '../products/products'
    })
  },
  phoneCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
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