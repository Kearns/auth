const User = require('./../models').User;
const validator = require('validator');

const getUniqueKeyFromBody = function (body) { // this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if (typeof unique_key === 'undefined') {
        if (typeof body.email != 'undefined') {
            unique_key = body.email
        } else if (typeof body.phone != 'undefined') {
            unique_key = body.phone
        } else {
            unique_key = null;
        }
    }
    return unique_key;
}

const createUser = async function (userInfo) {
    let unique_key, auth_info, err;
    auth_info = {}
    auth_info.status = 'create';
    unique_key = getUniqueKeyFromBody(userInfo);
    if (!unique_key) ThrowError('An email or phone number was not entered.');
    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';
        userInfo.email = unique_key;
        [err, user] = await ProcessPromise(User.create(userInfo));
        if (err) ThrowError(err.message)
        return user;
    } else if (validator.isMobilePhone(unique_key, 'any')) {
        auth_info.method = 'phone';
        userInfo.phone = unique_key;
        [err, user] = await ProcessPromise(User.create(userInfo));
        if (err) ThrowError('user already exists with that phone number');
        return user;
    } else {
        ThrowError('A valid email or phone number was not entered.');
    }
}


const authUser = async function (userInfo) { //returns token
    let unique_key;
    let auth_info = {};
    let user;
    
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);
    
    if (!unique_key) ThrowError('Please enter an email or phone number to login');
    if (!userInfo.password) ThrowError('Please enter a password to login');
    
    
    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';
        [err, user] = await ProcessPromise(User.findOne({
            email: unique_key
        }));
        if (err) ThrowError(err.message);
    } else if (validator.isMobilePhone(unique_key, 'any')) {
        auth_info.method = 'phone';
        [err, user] = await ProcessPromise(User.findOne({
            phone: unique_key
        }));
        if (err) ThrowError(err.message);
    } else {
        ThrowError('A valid email or phone number was not entered');
    }
    if (!user) ThrowError('Not registered');
    [err, user] = await ProcessPromise(user.comparePassword(userInfo.password));
    if (err) ThrowError(err.message);
    return user;
}

module.exports = {
    getUniqueKeyFromBody,
    createUser,
    authUser
};