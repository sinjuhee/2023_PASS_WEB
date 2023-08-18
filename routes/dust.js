const express     = require('express');
const router      = express.Router();
const axios       = require('axios');
const cheerio     = require('cheerio');
const auth        = require('./auth')

//node js 비동기 방식으로 작동 --->안기다려주고 아래까지 파싱.. 
//async await -> 기다림.. 


router.get('/', auth.CheckAuth, async function(req, res) {
  console(req)
		//파라미터 설정
    url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    serviceKey = "QdrZ%2FP8MUGQj1T8v9bFFr8nJ1YOu1G7a5titXf3cU87akbRks5DPlcpm2t1tt3%2FHCdflpGdvR4Qq6KDUurAfjA%3D%3D";
    returnType = encodeURI("xml");
    numOfRows = encodeURI("100");
    pageNo = encodeURI("1");
    sidoName = encodeURI("대구");
    ver= encodeURI("1.0");

		//파라미터를 query로 변환
    queryParams = '?' + encodeURI('serviceKey') + '=' + serviceKey;
    queryParams += '&' + encodeURI('returnType') + '=' + returnType;
    queryParams += '&' + encodeURI('numOfRows') + '=' + numOfRows;
    queryParams += '&' + encodeURI('pageNo') + '=' + pageNo;
    queryParams += '&' + encodeURI('sidoName') + '=' + sidoName;
    queryParams += '&' + encodeURI('ver') + '=' + ver;
    
    console.log('queryParams: ', queryParams);  //print 

    try {
        var context = new Array();
                //let(변동) / const(변동x) 권장 

                //axios로 HTTP GET 요청
        const result = await axios.get(url + queryParams);
				//응답 데이터 저장
        const xml = result.data;
				//cheerio 객체 생성
        const $ = cheerio.load(xml);
				//태그가 item인 모든 항목 추출
        const itemList = $('item');
				//전체 item 항목에서 측정소, 미세먼지, 초미세먼지 값 추출
        itemList.each(function(index, item) {
            let stationName = $(item).find('stationName').text();
            let pm10Value = $(item).find('pm10Value').text();
            let pm25Value = $(item).find('pm25Value').text();
						//추출된 데이터를 JSON 형식의 배열에 저장
            context.push({stationName: stationName, pm10Value: pm10Value, pm25Value: pm25Value})
        });
        res.render('dust', {context: context});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;