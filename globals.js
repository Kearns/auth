require('dotenv').config(); //instatiate environment variables

CONFIG = {
    app: process.env.APP,
    port: process.env.PORT,

    db_dialect: process.env.DB_DIALECT,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,

    jwt_encryption: process.env.JWT_ENCRYPTION,
    jwt_expiration: process.env.JWT_EXPIRATION,
}


to = function(promise) {
    return promise
    .then(data => {
        return [null, data];
    }).catch(err =>
        [pe(err)]
    );
}
pe = require('parse-error');
TE = function(err_message, log){ // TE stands for Throw Error
    if(log === true){
        console.error(err_message);
    }
    throw new Error(err_message);
}
ReError = function(res, err, code){ // Error Web Response
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }
    if(typeof code !== 'undefined') res.statusCode = code;
    return res.json({success:false, error: err});
}
ReSuccess = function(res, data, code){ // Success Web Response
    let send_data = {success:true};
    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }
    if(typeof code !== 'undefined') res.statusCode = code;
    return res.json(send_data)
};


//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});