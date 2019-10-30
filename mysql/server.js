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

//插入数据
conn.query('insert into domain(name, status) values ("a", "500");', (error, result, fileds) => {
    if(error){
        throw error;
    }
    console.log('插入数据', result, '\n');
});

//删除数据
conn.query('delete from domain where id<=6;',  (error, result, fileds) => {
    if(error){
        throw error;
    }
    console.log('删除数据', result, '\n');
});
//查询数据
conn.query('select * from domain;', (error, result, fileds) => {
    if(error){
        throw error;
    }
    let data = [];
    result.forEach(item => {
        data.push({
            id: item.id,
            name: item.name,
            status: item.status
        })
    });
    console.log('查询数据', data, '\n');
});

//关闭连接
conn.end();