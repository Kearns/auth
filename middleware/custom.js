const Company = require('./../models/company');

let company = async function (req, res, next) {
    let company_id, err, app;
    company_id = req.params.company_id;

    [err, company] = await to(Company.findOne({
        _id: company_id
    }));
    if (err) return ReError(res, "err finding company");

    if (!company) return ReError(res, "Company not found with id: " + company_id);
    let user, users_array;
    user = req.user;
    users_array = company.users.map(obj => String(obj.user));

    if (!users_array.includes(String(user._id))) return ReError(res, "User does not have permission to read app with id: " + app_id);

    req.company = company;
    next();
}
module.exports.company = company;