const express     = require('express');
const router      = express.Router();

const tf = require('@tensorflow/tfjs');

router.get('/regression1', function(req, res) {
    res.render('tfjs/regression1');
});
router.get('/regression2', function(req, res) {
    res.render('tfjs/regression2');
});

router.post('/regression2', async function(req, res) {
    let model = await tf.loadLayersModel('https://raw.githubusercontent.com/oralcoder/2023_PASS/main/reg_model.json');
    model.summary();
    const data = req.body.data;
    let testX = data.split(',').map(function(x) {
        return parseInt(x);
    });
    testX = tf.tensor(testX, [testX.length]);
    const preds = model.predict(testX).arraySync();
    res.send(preds);
});

router.post('/regression2', async function(req, res) {
		//모델 로드
		//예측
    res.send('예측결과');
});

//inference #1
router.get('/inference1', async function(req, res) {
    res.render('tfjs/inference1');
});
//inference #2
router.get('/inference2', async function(req, res) {
    res.render('tfjs/inference2');
});
//inference #3
router.get('/inference3', async function(req, res) {
    res.render('tfjs/inference3');
});
//inference #4
router.get('/inference4', async function(req, res) {
    res.render('tfjs/inference4');
});

// transfer #1
router.get('/transfer1', async function(req, res) {
    res.render('tfjs/transfer1');
});

// transfer #2
router.get('/transfer2', async function(req, res) {
    res.render('tfjs/transfer2');
});

// transfer #3
router.get('/transfer3', async function(req, res) {
    res.render('tfjs/transfer3');
});

module.exports = router;



