//인증 정보 
//request session에 저장 . .해주는데 그게 잇는지 없는지 확인해주는 것 


module.exports = {
    CheckAuth: async function(req, res, next) {
        console.log('req' );
        if(req.isAuthenticated()) {
            console.log(req);
            console.log(2);
            next();  //만약에 인증 확인 성공햇다면 다음 미들웨어로 넘겨주겠다 
        }
        else {
            res.redirect('/user/signin');    //로그인 안 되어 잇으니까 메인화면으로 돌아가기 
        }
    },
}