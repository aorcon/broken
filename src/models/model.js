const db = require('./db');
const OpLogs = require('./oplogs');

class Model {
    constructor(){
        this.db = db;
        this.classname = 'model';   //mongodb collection name
        // this.cache = [];
    }

    // cache db return data like a queue, too heave to remove this
    /*
    data(){
        return this.deQueue();
    }
    getData(){
        return this.data();
    }
    setData(data){
        this.emptyQueue();
        if (Array.isArray(data)){
            data.forEach((x) => {this.cache.push(x)});
        }else{
            this.cache[0] = data;
        }
    }
    enQueue(data){
        this.cache.push(data);
    }
    deQueue(){
        return this.cache.splice(0, 1);
    }
    emptyQueue(){
        this.cache = [];
    }
    size(){
        return this.cache.length;
    }
    */

    // CRUD access method
    async create(data){
        const result = await db.db().collection(this.classname).insertOne(data, {w:1});
        const ops = {
            result: result.result,
            ops: result.ops,
            insertedCount: result.insertedCount,
            insertedId: result.insertedId
        }
        if (ops.result.ok !== 1 || ops.ops.length !== 1) {
            ops.data = data;
            ops.message = `Db create ${this.classname} failed.`;
            console.log(ops);
            // throw new Error(`Db create ${this.classname} failed.`);
        }
        return ops;
    }
    async update(data){
        let result = {};
        let ops = {};
        if (data._id){
            result = await db.db().collection(this.classname).update({_id:data._id}, data, {w:1});
        }else{
            ops = {
                message: `DB update ${this.classname} need data._id value.`,
                data: data,
                result:{
                    ok: 0,
                    n: 0
                }
            }
            console.log(ops);
            // throw new Error(`DB update ${this.classname} need data._id value.`);
            return ops;
        }
        ops = {
            result: result.result,
        }
        if (ops.result.ok != 1){
            ops.data = data;
            ops.message = `Db update ${this.classname} failed.`;
            console.log(ops);
            // throw new Error(`DB update ${this.classname} failed.`);
        }
        return ops;
    }
    async read(query){
        const result = await db.db().collection(this.classname).find(query).toArray();
        return result;
    }
    async readOne(query){
        const result = await db.db().collection(this.classname).findOne(query);
        return result;
    }
    async delete(data){
        let result = {};
        let ops = {};
        console.log(this.classname);
        if (data._id){
            result = await db.db().collection(this.classname).deleteOne({_id:data._id});
        }else{
            ops = {
                message: `DB delete ${this.classname} need data._id value.`,
                data: data,
                result:{
                    ok: 0,
                    n: 0
                }

            }
            console.log(ops);
            // throw new Error(`DB delete ${this.classname} need data._id value.`);
            return ops;
        }
        ops = {
            result: result.result,
        }
        if (ops.result.ok != 1){
            ops.data = data;
            ops.message = `Db delete ${this.classname} failed.`;
            console.log(ops);
            // throw new Error(`DB delete ${this.classname} failed.`);
        }
        return ops;
    }
    async createWithLogs(data, operater){
        const oplogs = new OpLogs();
        let result = await this.create(data);
        let r = await oplogs.saveOp('create', operater, undefined, data, result);
        return result;
    }
    async updateWithLogs(data, operater){
        const oplogs = new OpLogs();
        let ori = null;
        if (data._id){ ori = await this.readOne({_id:data._id}); }
        let result = await this.create(data);
        let r = await oplogs.saveOp('update', operater, undefined, data, result);
        return result;
    }
    async deleteWithLogs(data, operater){
        const oplogs = new OpLogs();
        let ori = null;
        if (data._id){ ori = await this.readOne({_id:data._id}); }
        let result = await this.create(data);
        let r = await oplogs.saveOp('delete', operater, ori, data, result);
        return result;
    }
}
module.exports = Model;
