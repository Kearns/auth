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