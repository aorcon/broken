module.exports = {
    port: 3000,
    db: {
        url: 'mongodb://127.0.0.1:27017/jifit',
        options: {
                poolSize: 2,
                sslValidate: false,
        }
    }
};
