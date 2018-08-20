var express = require('express');
var router = express.Router();
var $ = require('jquery')
//mysql交互
var mysql = require('mysql')
var config = require('../model/config')
//链接池
var pool = mysql.createPool(config.mysql)

var path = require('path')
var fs = require('fs')
let formidable = require('formidable');
//放置路径
var cacheFolder = 'public/images/'

var webPageCtorl = require('../controller/webPageCtrol/index')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.sendFile('/oyyf/node/express/express-demo/views/'+'index.html')
// });
router.get('/', webPageCtorl.index);
router.get('/login', webPageCtorl.LoginPage);

router.get('/user/list', webPageCtorl.UserList);
// router.get('/user/detail?id', webPageCtorl.UserDetail);

router.get('/changeInfo',webPageCtorl.UserDetail)
//修改头像
router.post('/modifyPic',function(req,res,next){
    let userDirPath = cacheFolder +'Img'
    if(!fs.existsSync(userDirPath)){
        fs.mkdirSync(userDirPath)
    }

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'
    form.uploadDir = userDirPath;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 *1024 * 1024;
    form.type = true;

    form.parse(req)
    form.on('end',function(){
        console.log('success')
    })

    form.on('file',function(field,file){
        fs.renameSync(file.path,path.join(form.uploadDir,'/icon.png'))
    })
    res.send('./uploads/icon.png')
    // form.parse(req,function(err,fields,files){
    //     if(err){
    //         return res.json(err)
    //     }
    //     let extName = '';
    //     switch (files.file.type){
    //         case 'image/pjpeg':
    //             extName = 'jpg'
    //             break;
    //         case 'image/jpeg':
    //             extName = 'jpg';
    //             break;
    //         case 'image/png':
    //             extName = 'png';
    //             break;
    //         case 'image/x-png':
    //             extName = 'png';
    //             break;
    //     }
    //     if(extName.length === 0){
    //         return res.json({
    //             msg:"支持持png和jpg格式图片"
    //         })
    //     }else{
    //         let avatarName = '/'+Date.now() + '.' + extName;
    //         let newPath = form.uploadDir+'avatarName';
    //         fs.renameSync(files.file.path,newPath)
    //         Users.update({
    //             picture:newPath
    //         },{
    //             where:{
    //                 username:req.session.user.username
    //             }
    //         }).then(function(data){
    //             if(data[0] !== undefined){
    //                 User.findAll({
    //                     where:{
    //                         username:req.session.user.username
    //                     }
    //                 }).then(function(data){
    //                     if(data[0] !== undefined){
    //                         req.session.user.picture = data[0].dataValues.picture;
    //                         res.send(true)
    //                     }else{
    //                         res.send(false)
    //                     }
    //                 })
    //             }
    //         }).catch(function(err){
    //             console.log(err)
    //         })
    //     }
    // })
})

//修改信息
router.get('/changeUserInfo',function(req,res,next){
    var username = req.query.username;
    var password = req.query.password;
    var name = req.query.name;
    pool.getConnection(function (err,connection){
            var $sql = 'select * from users where name = ?';
            connection.query($sql,[name],function (err,result){
                console.log(result[0].id)
                if(result.length == 0){
                    result = {
                        code:300,
                        msg:"该账号不存在！"
                    }
                    res.json(result);
                    connection.release()
                }else{
                    var $sql1 = 'UPDATE users SET username = ? WHERE id = ?';
                    connection.query($sql1, [username,result[0].id], function (err, result) {
                        console.log(result);
                        if(result){
                            result = {
                                code:200,
                                msg:"修改成功！"
                            }
                        }
                            else{
                            result = {
                                code:400,
                                msg:"修改失败！"
                            }
                        }
                        res.json(result)
                        connection.release()
                    })
                }
            })
    })
})


router.post('/userLogin',function(req,res,next){
    var username = req.body.username
    // var name = req.body.name
    var password = req.body.password
    pool.getConnection(function(err,connection){
        //是否存在此账号
        var $sql = "select * from  users where username=?";
        connection.query($sql,[username],function(err,result){
            if(result.length === 0){
                result = {
                    code:300,
                    msg:"该账号不存在！"
                }
                res.json(result)
                connection.release()
            }else{
                var $sql1 = "select password from users where username=?";
                connection.query($sql1, [username], function (err, result) {
                    console.log(result);
                    var temp = result[0].password;
                    if(temp == password){
                        result = {
                            code:200,
                            msg:"密码正确！"
                        }
                    }else{
                        result = {
                            code:400,
                            msg:"密码错误！"
                        }
                    }
                    res.json(result)
                    connection.release()
                })
            }
        })
    })
})

//注册
router.post('/userRegister',function(req,res,next){
    console.log(req.body)
    // console.log(req.query)
    // console.log(req.params)

  var username = req.body.username
  var name = req.body.name
  var password = req.body.password
    pool.getConnection(function(err,connection){
      //是否存在此账号
        var $sql = "select * from  users where username=?";
        connection.query($sql,[username],function(err,result){
            if(result.length !== 0){
              result = {
                code:300,
                  msg:"该账号已经存在！"
              }
              res.json(result)
              connection.release()
            }else{
                // console.log(parseInt(Math.random(1000) * 1000 + 1))
                var $sql1 = "INSERT INTO users(username, password, name) VALUES(?,?,?)";
                connection.query($sql1, [username, password, name], function (err, result) {
                    console.log(result);
                if(result){
                    result = {
                    code:200,
                      msg:"注册成功！"
                  }
                }else{
                    result = {
                    code:400,
                      msg:"注册失败！"
                  }
                }
                res.json(result)
                connection.release()
              })
            }
        })
    })
})


// function postFun(index){
//     if(index >= array.length) return;
//     var currParam = array[index]
//     var req = http.request(options,function(res){
//         console.log('STATUS'+ res.statusCode)
//         console.log('HEADERS'+ JSON.stringify(res.headers))
//         res.setEncoding('utf-8')
//         res.on('data',function(body){
//             console.log('body'+body)
//         })
//         res.on('end',function(){
//             postFun(index+1)
//         })
//     })
//
//     req.on('err',function(err){
//         if(e){
//             console.info(e)
//         }
//     })
//     console.log(currParam)
//     req.write(currParam,'utf-8')
//     req.end()
// }
// postFun(0)

module.exports = router;
