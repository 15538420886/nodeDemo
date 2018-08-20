const webPageCtorl = {
    index: (req,res)=>{
        res.render('index.html')
    },
    LoginPage: (req, res) => {
      res.render('login.html')
    },
    UserList: (req, res) => {

    },
    UserDetail: (req, res) => {
        res.render('chnageUserInfo.html')
    }
}
module.exports = webPageCtorl;