const Koa = require('koa');
const static = require('koa-static');
const { join } = require('path');
const koaBody = require('koa-body');

const app = new Koa();
//const routers = require('./routes/index')
const routers = require('./routes/index')

const staticPath = '../static';
app.use(koaBody());
app.use(static(
    join(__dirname, staticPath)
));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(4455);
console.log('listen at 4455');