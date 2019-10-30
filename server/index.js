const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const { join } = require('path');
const getList = require('./db')

const app = new Koa();
const router = new Router();

const staticPath = '../static';

app.use(static(
    join(__dirname, staticPath)
));
app.use(router.routes()).use(router.allowedMethods());

router.get('/getList', async (ctx, next) => {
    ctx.type = 'Content-Type: application/json;charset=utf-8';
    ctx.body = {
        code: 200,
        data: await getList,
        message: 'success'
    };
    next();
});

app.listen(4455);
console.log('listen at 4455');