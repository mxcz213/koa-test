const router = require('koa-router')()
const { getListController, addController, deleteController, updateController, getinfoController } = require('../controllers/list')

const routers = router
.get('/getList', getListController)
.post('/add', addController)
.post('/delete', deleteController)
.post('/update', updateController)
.get('/getInfo/:id', getinfoController)


module.exports = routers;