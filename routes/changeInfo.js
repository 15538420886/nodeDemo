// var express = require('express');
// var router = express.Router();
// //mysql交互
// var mysql = require('mysql')
// var config = require('../model/config')
// //链接池
// var pool = mysql.createPool(config.mysql)
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     console.log(__dirname)
//     res.sendFile('/oyyf/node/express/express-demo/views/'+'chnageUserInfo.html')
// });
//
// // router.post('/userLogin',function(req,res,next){
// //     console.log(req.body)
// //     console.log(req.query)
// //     console.log(req.params)
//
// // var username = req.query.username
// // var name = req.query.name
// // var password = req.query.password
// // pool.getConnection(function(err,connection){
// //     //是否存在此账号
// //     var $sql = "select * from  users where username=?";
// //     connection.query($sql,[username],function(err,result){
// //         if(result.length !== 0){
// //             result = {
// //                 code:300,
// //                 msg:"该账号已经存在！"
// //             }
// //             res.json(result)
// //             connection.release()
// //         }else{
// //             var $sql1 = "INSERT INTO users(id, username, password, name) VALUES(0,?,?,?)";
// //             connection.query($sql1, [username, password, name], function (err, result) {
// //                 console.log(result);
// //                 if(result){
// //                     result = {
// //                         code:200,
// //                         msg:"注册成功！"
// //                     }
// //                 }else{
// //                     result = {
// //                         code:400,
// //                         msg:"注册失败！"
// //                     }
// //                 }
// //                 res.json(result)
// //                 connection.release()
// //             })
// //         }
// //     })
// // })
// // })
//
// module.exports = router;
