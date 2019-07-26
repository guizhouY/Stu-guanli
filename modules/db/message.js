//负责创建表 及 表的操作模型
var mongoose=require('./connection');

var stuinfo=new mongoose.Schema({
    username:String,
    age:Number,
    gender:String,
    major:String,
    hobby:Array
});
// 创建一张表
var Message=mongoose.model('stuglsys',stuinfo)
module.exports=Message;
