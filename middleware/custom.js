const Org = require('./../models/org');

let org = async function (req, res, next) {
    let org_id, err, app;
    org_id = req.params.org_id;

    [err, org] = await ProcessPromise(Org.findOne({
        _id: org_id
    }));
    if (err) return ReError(res, "err finding org");

    if (!org) return ReError(res, "Org not found with id: " + org_id);
    let user, users_array;
    user = req.user;
    users_array = org.users.map(obj => String(obj.user));

    if (!users_array.includes(String(user._id))) return ReError(res, "User does not have permission to read app with id: " + app_id);

    req.org = org;
    next();
}
module.exports.org = org;