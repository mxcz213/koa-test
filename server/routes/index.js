const Router = require('koa-router')()

//导入子路由
const api = require('./api')

// 注册子路由
Router.use('/api', api.routes(), api.allowedMethods());

module.exports = Router
