// npm init에서 적어준 app 진입점 


const express = require('express'); //import 
const app = express();    //app 객체 생성 

//템플릿 엔진?과 디렉토리 설정 .. 
app.set('views', __dirname + '/views');  //이 안에 템플릿을 모아두겟다 
app.set('view engine', 'ejs');  //ejs = 엔진이름 / 자바스크립트를 html에서 사용할 수 있게 해주는 엔진

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

//possport 모듈 
const passport          = require('passport');  //설치한 모듈 가져오는 거 
const passportConfig    = require('./passport');  //현재 디렉토리에 있는 passport.js 가져오겟다는 말 
const session           = require('express-session');   
const flash             = require('connect-flash');
const newsRouter    = require('./routes/news');
const wifiRouter        =require('./routes/wifi')
const maskRouter        =require('./routes/mask')
const tfjsRouter    = require('./routes/tfjs');
const sttRouter    = require('./routes/stt');

passportConfig()

//세션 설정 - 세션 유지 
//기본적으로 http 비연결성 - 연결 후 끊음(페이지 이동할때마다 초기화시킴)-> 때문에 세션을 만들어서 로그인 유지 
app.use(
    session({
       resave: false,
       saveUninitialized: false,
       secret: "sessionsecretsessionsecret",
    }),
);

//passport 초기화
app.use(passport.initialize()); //req에 passport 설정 추가
app.use(passport.session());    //req.session에 passport 데이터 추가
app.use(flash());




/*
//get 요청 
app.get('/main', function(req, res) {
    res.sendFile(__dirname+'/html/main.html')
	//res.sendFile('C:\works\web\html\main.html');
});

//request 사용자의 요청 정보 : ip주소 포트번호 
// response : request안에 들어 잇던 받는 사람의 정보 적어줘야 보낼 수 잇음 

app.get('/test', function(req, res) {
	res.sendFile(__dirname + '/test.html');
});

*/

//라우트 객체 생성
const mainRouter    = require('./routes/index');
const dustRouter    = require('./routes/dust');
const userRouter    = require('./routes/user');

//라우트 설정
app.use('/', mainRouter);
app.use('/dust', dustRouter);
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/wifi', wifiRouter);
app.use('/mask', maskRouter);
app.use('/tfjs', tfjsRouter);

app.use('/stt', sttRouter);

const PORT = 8080;       //로컬 포트  //80이 웹 디폴트 포트
app.listen(PORT, function() {      //8080포트에서 대기  
    console.log('Listening on port: ', PORT);
});

