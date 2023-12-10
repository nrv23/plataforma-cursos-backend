
class JwtBody {

    constructor(_id, role, email) {
        this._id = _id;
        this.role = role;
        this.email = email;
    }
}

module.exports = JwtBody;