const { getListModel, addModel, deleteModel, updateModel, getinfoModel } = require('../models/listModel')
const listController = {
    // 获取表数据
    async getListController(ctx, next){
        let result = await getListModel(ctx);
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
    },
    // 添加一条记录
    async addController(ctx, next){
        let insertId = await addModel(ctx);
        ctx.body = {
            code: 200,
            data: {
                id: insertId
            },
            message: 'add success'
        };
    },
    // 删除一条记录
    async deleteController(ctx, next){
        await deleteModel(ctx);
        ctx.body = {
            code: 200,
            data: [],
            message: 'delete success'
        }
    },
    // 修改数据
    async updateController(ctx, next){
        await updateModel(ctx);
        ctx.body = {
            code: 200,
            data: [],
            message: 'update success'
        }
    },
    // 获取记录详细信息
    async getinfoController(ctx, next){
        let result = await getinfoModel(ctx);
        ctx.body = {
            code: 200,
            data: result[0],
            message: 'getInfo success'
        };
    }
}

module.exports = listController;