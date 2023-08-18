const express     = require('express');   //import 
const router      = express.Router();
const auth = require('./auth')


router.get('/', auth.CheckAuth, function(req, res) {
    //res.send('라우트를 사용한 메인 페이지입니다.');
    res.render('index')   ///index.ejs 파일 -> html 파일로 바꿔서 듸워줌 
});


module.exports = router;  //외부에서 사용할 수 잇도록 모듈을 export 해줌