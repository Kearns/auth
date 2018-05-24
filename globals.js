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

ProcessPromise = promise => promise
    .then(data => {
        return [null, data];
    }).catch(err => [ParseError(err)]);


ParseError = require('parse-error');

ThrowError = (err_message, log) => { // ThrowError stands for Throw Error
    if (log === true) {
        console.error(err_message);
    }
    throw new Error(err_message);
}

ReError = (res, err, code) => { // Error Web Response
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }
    if (typeof code !== 'undefined') {
        res.statusCode = code;
    }
    return res.json({
        success: false,
        error: err
    });
}

ReSuccess = (res, data = {}, code) => { // Success Web Response
    if (typeof code !== 'undefined') {
        res.statusCode = code;
    }
    return res.json({
        success: true,
        ...data
    })
};

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error =>
    console.error('Uncaught Error', ParseError(error))
);