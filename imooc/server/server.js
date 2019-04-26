const express = require('express')
const mongoose = require('mongoose')
const app = express()
//连接mongodb
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){//监听是否连接成功
  console.log('mongodb success')
})
//操作mongodb
const user = mongoose.model('user',new mongoose.Schema({  //数据模型
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))
// user.create({ //创建数据
//   user:'opo',
//   age:23
// },function(err,doc){
//   if(!err){
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })
// user.remove({age:21},function(err,doc){  //删除数据
//   console.log(doc)
// })
user.update({'user':'opo'},{'$set':{age:9}},function(err,doc){  //更新数据
  console.log(doc)
})


app.get('/',function(req,res){
  res.send('<h1>ssss</h1>')
})
app.get('/data',function(req,res){
  user.find({},function(err,doc){
    res.json(doc)
  })
})
app.listen(9090,function(){
  console.log('node 9090')
})