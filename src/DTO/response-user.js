 class ResponseUser {

    constructor(name, surname, email,avatar=null) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.avatar = avatar;
    }
}

module.exports = ResponseUser;