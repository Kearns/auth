const Org = require('../models').Org;

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, org;
    let user = req.user;

    let org_info = req.body;
    org_info.users = [{
        user: user._id
    }];

    [err, org] = await ProcessPromise(Org.create(org_info));
    if (err) return ReError(res, err, 422);

    return ReSuccess(res, {
        org: org.toWeb()
    }, 201);
}
const getAll = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, orgs;
    [err, orgs] = await ProcessPromise(user.Orgs());

    let orgs_json = []
    for (let i in orgs) {
        let org = orgs[i];
        orgs_json.push(org.toWeb())
    }
    return ReSuccess(res, {
        orgs: orgs_json
    });
}

const get = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let org = req.org;
    return ReSuccess(res, {
        org: org.toWeb()
    });
}

const update = async (req, res) => {
    let err, org, data;
    org = req.user;
    data = req.body;
    org.set(data);

    [err, org] = await ProcessPromise(org.save());
    if (err) {
        return ReError(res, err);
    }
    return ReSuccess(res, {
        org: org.toWeb()
    });
}

const remove = async (req, res) => {
    let org, err;
    org = req.org;

    [err, org] = await ProcessPromise(org.remove());
    if (err) return ReError(res, 'error occured trying to delete the org');

    return ReSuccess(res, {
        message: 'Deleted Org'
    }, 204);
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove
}