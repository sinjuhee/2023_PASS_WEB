const express     = require('express');
const router      = express.Router();

const axios       = require('axios');
const cheerio     = require('cheerio'); //파싱 


router.get('/', async function(req, res) {
      //뉴스 요청 
      //기사제목 추출
      //데이터. . 단 
    url = "https://news.naver.com/main/ranking/popularDay.naver";
    
    
    try {
        var context = new Array();
        const result = await axios.get(url, {responseType: 'arraybuffer', responseEncoding: 'binary'});
        //const html = result.data;
        const decoder = new TextDecoder('euc-kr');   //디코더 euc kr 사용 
        const html = decoder.decode(result.data);

        //파싱 
        const $ = cheerio.load(html);
        const newsList = $('.rankingnews_list > li');  //rankingnews_list 클래스 이름 
        newsList.each(function(index, news) {       //each 인덱스 자동생성돼서 리스트로 하나하나 넣어줌 
            let title = $(news).find('div > a').text();
            let link = $(news).find('div > a').attr('href');
            context.push({title: title, link: link});   //array형식 
        });
        res.render('news', {context: context});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;