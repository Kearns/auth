const mongoose = require('mongoose');

let OrgSchema = mongoose.Schema({
    name: {
        type: String
    },
    users: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        permissions: [{
            type: String
        }]
    }],
}, {
    timestamps: true
});

OrgSchema.method('toWeb', function () {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
});

let org = module.exports = mongoose.model('Org', OrgSchema);