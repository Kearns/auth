const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/UserController');
const OrgController = require('./../controllers/OrgController');
const custom = require('./../middleware/custom');
const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport)

router.post('/users', UserController.create);

router.get('/users', passport.authenticate('jwt', {
    session: false
}), UserController.get);

router.put('/users', passport.authenticate('jwt', {
    session: false
}), UserController.update);

router.delete('/users', passport.authenticate('jwt', {
    session: false
}), UserController.remove);

router.post('/users/login', UserController.login);

router.post('/orgs', passport.authenticate('jwt', {
    session: false
}), OrgController.create);

router.get('/orgs', passport.authenticate('jwt', {
    session: false
}), OrgController.getAll);

router.get('/orgs/:org_id', passport.authenticate('jwt', {
    session: false
}), custom.org, OrgController.get);

router.put('/orgs/:org_id', passport.authenticate('jwt', {
    session: false
}), custom.org, OrgController.update);

router.delete('/orgs/:org_id', passport.authenticate('jwt', {
    session: false
}), custom.org, OrgController.remove);

module.exports = router;