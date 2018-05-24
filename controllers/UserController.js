const User = require('../models').User;
const authService = require('./../services/AuthService');

const create = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    console.log(body)
    if (!body.unique_key && !body.email && !body.phone) {
        return ReError(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReError(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) return ReError(res, err, 422);
        return ReSuccess(res, {
            message: 'Successfully created new user.',
            user: user.toWeb(),
            token: user.getJWT()
        }, 201);
    }
}


const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReSuccess(res, {
        user: user.toWeb()
    });
}


const update = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        console.log(err, user);

        if (err.message.includes('E11000')) {
            if (err.message.includes('phone')) {
                err = 'This phone number is already in use';
            } else if (err.message.includes('email')) {
                err = 'This email address is already in use';
            } else {
                err = 'Duplicate Key Entry';
            }
        }

        return ReError(res, err);
    }
    return ReSuccess(res, {
        message: 'Updated User: ' + user.email
    });
}


const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) return ReError(res, 'error occured trying to delete user');

    return ReSuccess(res, {
        message: 'Deleted User'
    }, 204);
}


const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReError(res, err, 422);

    return ReSuccess(res, {
        token: user.getJWT(),
        user: user.toWeb()
    });
}

module.exports = {
    create,
    get,
    update,
    remove,
    login,
};