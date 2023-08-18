const express     = require('express');
const router      = express.Router();
const passport = require('passport');

const UserModel   = require('../models/user')
const bkfd2Password = require("pbkdf2-password");
const hasher        = bkfd2Password();

router.get('/signup', async function(req, res) {
	res.render('signup');
});
router.get('/signin', async function(req, res) {
	res.render('signin');
});


//post는 추가 create 할 때 사용? 

router.post('/signup', async function(req, res) {   
	const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    console.log(id, password, name, email);

    hasher( {password: password } , async function(error, pass, salt, hash) { //async 콜백함수 await 쓰려고!!
        //순서 유지가 됨 . .콜백함수 . .비동기기때문에 .. 가만두면 지혼자 반복됨.. 그래서 return 할 수가 없듬. .
        //해시 함수에 넣으면.. 암호화됨 (단방향)
        //salt 소금뿌려서. . 암호화 강화 
        var user = {
            id: id,
            password: hash,
            salt: salt,
            name: name,
            email: email,
        };
        const result = await UserModel.AddUser(user);
        if (result.error) {
            console.log(result.error);
            res.redirect('/user/signup');
        }
        else {
            console.log('USER CREATED');
            res.redirect('/user/signin');
        }
    }); //hasher
});

router.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/user/signin'
}));

router.get('/signout', function(req, res, next) {
	req.logout(function(error) {
        if (error) {
            return next(error);
        }
        res.redirect('/');
    });
});

module.exports = router;