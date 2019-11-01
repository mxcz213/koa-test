const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const { join } = require('path');
const koaBody = require('koa-body');
const { conn, query } = require('./db');

const app = new Koa();
const router = new Router();

const staticPath = '../static';
app.use(koaBody());
app.use(static(
    join(__dirname, staticPath)
));
app.use(router.routes()).use(router.allowedMethods());

router.get('/getList', async (ctx, next) => {
    ctx.type = 'Content-Type: application/json;charset=utf-8';
    let result = await query('SELECT * FROM domain;');
    let list = [];
    result.forEach(item => {
        list.push({
            id: item.id,
            name: item.name,
            status: item.status
        })
    });
    console.log(list);
    ctx.body = {
        code: 200,
        data: list,
        message: 'getList success'
    };
});

router.post('/add', async (ctx, next) => {
    const postData = ctx.request.body;
    //const postData = await parsePostData(ctx);
    console.log('postData：',JSON.parse(postData));
    ctx.type = 'Content-Type: application/json;charset=utf-8';
    await query('INSERT INTO domain SET ?', JSON.parse(postData));

    ctx.body = {
        code: 200,
        data: [],
        message: 'add success'
    };
})

router.post('/delete', async (ctx, next) => {
    ctx.type = 'Content-Type: application/json;charset=utf-8';
    const postData = ctx.request.body;
    //const postData = await parsePostData(ctx);
    console.log('delete postData：', JSON.parse(postData));
    await query('DELETE FROM domain where id=' + JSON.parse(postData).id);
    
    ctx.body = {
        code: 200,
        data: [],
        message: 'delete success'
    }
});

router.post('/update', async (ctx, next) => {  
    //const postData = await parsePostData(ctx);
    const postData = ctx.request.body;
    console.log('update postData：', JSON.parse(postData));
    const pdata = JSON.parse(postData);
    await query('UPDATE domain SET name = ?, status = ? WHERE id = ?;',[pdata.name, pdata.status, pdata.id]);

    ctx.type = 'Content-Type: application/json;charset=utf-8';
    ctx.body = {
        code: 200,
        data: [],
        message: 'update success'
    }
})

router.get('/getInfo/:id', async (ctx, next) => {
    ctx.type = 'Content-Type: application/json;charset=utf-8';
    let result = await query('SELECT * FROM domain WHERE id = ?;', ctx.params.id);
    console.log('详情数据：',result);
    ctx.body = {
        code: 200,
        data: result[0],
        message: 'getInfo success'
    };
})

function parsePostData(ctx){
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.addListener('data', (data) => {
                postData += data;
            })
            ctx.req.addListener('end', () => {
                resolve(postData);
            })
        } catch (e){
            reject(e);
        }   
    })
}

app.listen(4455);
console.log('listen at 4455');