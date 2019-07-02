// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var num = 0;
// 云函数入口函数
exports.main = async (event, context) => {
  num++
  return {
    num
  }
}