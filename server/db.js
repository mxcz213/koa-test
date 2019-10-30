const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'koa_test'
})

conn.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql 连接成功');
});
//查询数据
let getList = [];
conn.query('select * from domain;', (error, result, fileds) => {
    if(error){
        throw error;
    }
    result.forEach(item => {
        getList.push({
            id: item.id,
            name: item.name,
            status: item.status
        })
    });
});

//关闭连接
conn.end();
module.exports = getList;