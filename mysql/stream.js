//按流的方式进行查询
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'koa_test'
})
const query = conn.query('select * from domain;');

query.on('error', (error) => {
    console.log(error);
});

query.on('fields', (fields) => {
    //console.log(fields);
});

query.on('result', (result) => {
    console.log('查询数据', result, '\n');
})

query.on('end', () => {
    console.log('查询结束')
})

conn.end();
/**
 * $ node mysql/stream.js
    查询数据 RowDataPacket { id: 1, name: 'n', status: 402 }

    查询数据 RowDataPacket { id: 2, name: 'a', status: 400 }

    查询数据 RowDataPacket { id: 3, name: 'a', status: 500 }

    查询数据 RowDataPacket { id: 5, name: 'a', status: 500 }

    查询数据 RowDataPacket { id: 6, name: 'a', status: 500 }

    查询数据 RowDataPacket { id: 7, name: 'a', status: 500 }

    查询数据 RowDataPacket { id: 8, name: 'a', status: 500 }

    查询数据 RowDataPacket { id: 9, name: 'a', status: 500 }

    查询数据 RowDataPacket { id: 10, name: 'a', status: 500 }

    查询结束
 * 
 */