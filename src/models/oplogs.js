const db = require('./db');
/**
 * account for web login
 */
class OpLogs{
    // date: date;          //时间
    // userId: require('mongodb').ObjectID; //用户ID
    // usercname: string;   //用户姓名
    // action: string;      //用户行为
    // olddata: any;        //原数据 (update\delete)
    constructor(){
        this.db = db;
        this.classname = 'oplogs';   //mongodb collection name
    }
    //check a account has a role (admin);

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
            throw new Error(`Db create ${this.classname} failed.`);
        }
        return ops;
    }
    async saveOp(type, operater, ori, action, result){
        return await this.create(
            {
                type: type.toLowerCase(),
                operater: operater,
                ori: ori,
                date: new Date(),
                action: action,
                result:result
            }
        );
    }
    async update(){    
        throw new Error('OpLogs only save logs');
    }
    async read(){
        throw new Error('OpLogs only save logs');        
    }
    async readOnce(){
        throw new Error('OpLogs only save logs');
    }
    async delete(){
        throw new Error('OpLogs only save logs');        
    }

}


module.exports = OpLogs;