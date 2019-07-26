// 创建服务器对象
var express=require('express');
var app=express();
// 引入外部模块表
var Message=require('./modules/db/message');

// 创建静态目录
app.use(express.static('public'));
// 引入模板引擎
app.engine('html',require('express-art-template'));
//post请求需要的模块
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    Message.find().exec((err,msgs)=>{     
        console.log('--------------');
        res.render('index.html',{msgs})
    }) 
});
//添加
app.get('/add',(req,res)=>{
    res.render('stulist.html')
})
// 提交信息
app.post('/infor',(req,res)=>{
    if(!req.body.username){
        res.send('请填写完整')
    }else{
        var m=new Message(req.body)
        console.log('----------------------');
        // Message.hobby=(req.body.hobby).join(',')
        // console.log(Message.hobby);
        // console.log(typeof Message.hobby);
        m.save((err)=>{
            if (err) {
                res.send('提交失败');
            } else {
              res.redirect('/')
            }
        });
    }
   
})

// 删除操作
app.post('/delete',(req,res)=>{
    var condition = {};
    if (req.body.name) {
        condition.name = req.body.name;
    }
    var _id=(req.body._id).slice(1,-1)
    Message.findOne({_id})
    .exec((err,msg)=>{
        msg.deleteOne(condition,(err)=>{
            if (err) {
                res.send('删除失败');
            } else {
                res.redirect('/')
            }
        })
    })
    console.log(_id);
})

// 编辑操作

app.post('/write',(req,res)=>{
   
    var _id=(req.body.write).slice(1,-1)
    console.log(_id);
    Message.findOne({_id})
    .exec((err,msg)=>{
        console.log(msg.username);
        console.log(typeof msg.username);
        res.render('bianji.html',{msg})
    })
   

})

// 查询
app.get('/search',(req,res)=>{
   var condition={}
    if(true){
        condition.username=req.query.xingming;
        condition.gender=req.query.xingbie
    }
    console.log(condition);
    // console.log(Message);
   Message.find(condition,(err,date)=>{
       console.log(date);
       if(err){
           res.send('查询失败')
       }else{
           res.render('index.html',{date})
       }
   })
})


app.listen(3000,()=>{
    console.log('The serve is running');
})