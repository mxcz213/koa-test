const { query } = require('../db')
const userModel = {
    async getListModel(ctx){
        let result = await query('SELECT * FROM domain;');
        return result;
    },
    async addModel(ctx){
        let result = await query('INSERT INTO domain SET ?', JSON.parse(ctx.request.body));
        return result.insertId;
    },
    async deleteModel(ctx){
        await query('DELETE FROM domain where id=' + JSON.parse(ctx.request.body).id);
    },
    async updateModel(ctx){
        const postData = ctx.request.body;
        const pdata = JSON.parse(postData);
        await query('UPDATE domain SET name = ?, status = ? WHERE id = ?;', [pdata.name, pdata.status, pdata.id]);
    },
    async getinfoModel(ctx){
        let info = await query('SELECT * FROM domain WHERE id = ?;', ctx.params.id);
        return info;
    }
}
module.exports = userModel;