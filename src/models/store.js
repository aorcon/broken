let Model = require("./model");
/**
 * account for web login
 */
class Store extends Model{
    // name: string;    //uniq 2-3char城市名 + 店名全拼， 最好不变名称
    // cname: string;   //中文名称，可以改变
    // location: [longitude, latitude];
    // status: number;  //状态 0关闭 1正常 2暂停
    // time_create: date;
    // alias: string;   //别名, 分号分隔。
    // tel: string;     //电话
    // city: string;    // BJ-CY
    // address: string; //
    // logo: string;    //upload image
    // manager:[number,string]  //_id, cname
    // workingtime: {}  //need to design //TODO
    // introduce:string;//article
    // star:string;     //门店等级 
    // is_del:number;   //default 0, 是否删除 0否 1是
    // pid:[number,string]|null;    //上级门店（主要用户合作或直营品牌）  

    constructor(){
        super();
        this.classname = 'store';   //mongodb collection name
    }
    //check a account has a role (admin);
    default(){
        return {
            name:null,
            cname:null,
            location:null,
            status:1,
            time_create:new Date(),
            alias:'',
            tel:'',
            address:'',
            logo:null,
            manager:null,
            workingtime:{},
            introduce:'',
            star:null,
            is_del:0,
            pid:null
        }
    }
}

module.exports = Store;