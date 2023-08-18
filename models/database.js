const mysql =  require('mysql2/promise');

require("dotenv").config();   //dotenv의 config = dotenv를 읽어서 환경변수로 저장 / 컴퓨터가 종료되면 사라짐 /

//process.env 안에 저장해둔다 .. ? 
//1. db에 연결하는 방식 -> 데베 필요할 때마다 연결하고 연결 끊음 (시간이 좀 걸림)
//2. createpool을 만드는 방식 -> 음.? 암튼 무 ㅓ저장해두고 사용한다 ...
const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = db