let Model = require("./model");
/**
 * account for web login
 */
class Account extends Model{
    // mobile: string; //uniq
    // name: string;
    // cname: string;
    // password: string;
    // role: Admin | Staff;
    constructor(){
        super();
        this.classname = 'accounts';   //mongodb collection name
    }
    //check a account has a role (admin);
    isAdmin(data){
        if (data && data.role && data.role.rolename){
            if (typeof data.role.rolename == 'string'){
                if (data.role.rolename.toLowerCase() == 'admin'){
                    return true;
                }
            }
        }
        return false;
    }
    createAdmin(){
        return {
            mobile: undefined,
            name: undefined,
            cname: undefined,
            role: {
                rolename: 'admin'
            }
        }
    }
    createStaff(){
        return {
            mobile: undefined,
            name: undefined,
            cname: undefined,
            role: {
                rolename: 'staff',
                position: undefined,
                store: ['HQ'],    //default = Headquarters, or Array<String>
                // isManager: false
            }            
        }
    }
    setpassword(data, password){
        let f = require('../common/function');
        data.password = f.hashPassword(password);
        return data;
    }
}

class Role{
    // rolename: string;   //admin, staff
}

class Admin extends Role{

}

class Staff extends Role{
    // position: string;   //职位
    // store: Array<string>;   // [门店] | 总部 | 加盟？
    // isManager: boolean; //店长？//remove it
}

module.exports = Account;