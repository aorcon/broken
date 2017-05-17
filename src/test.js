const db = require('./models/db');
const ObjectId = require('mongodb').ObjectID;
const Model = require('./models/model');

var find = async function(){
        const cursor = await db.db().collection('birds').find({color:"black"}, {name:1, color:1}).toArray();
        console.log(cursor);

}

class Birds extends Model{
    constructor(){
        super();
        this.classname = 'birds';   //mongodb collection name
    }
    async create(data){
        let result = await super.create(data);
        return result;
    }
    async update(data){
        let result = await super.update(data);
        return result;
    }
    async read(query){
        let result = await super.read(query);
        return result;
    }
    // async delete(data){
    //     let result = await super.delete(data);
    //     return result;
    // }
}

const Account = require('./models/account');
db.connect().then(async () => {
    let account = new Account();
    let result = await account.readOne();
    console.log(result);
    // let result = await bird.create({name: 'bird',color: 'red',});
    // console.log(result);
    // let mini = await bird.readOne();
    // console.log(mini);
    // mini.mini = true;
    // mini.color = 'red';
    // // mini._id = undefined;
    // result = await bird.delete(mini);
    // console.log(result);
})
