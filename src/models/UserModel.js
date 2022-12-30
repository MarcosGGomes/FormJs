const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const sendMail = require('./PassRecoveryModel');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true},
    password: {type: String, required: true},
    password2: {type: String, required: true}
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel

class User {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.validateLogin();
        if(this.errors.length > 0) return;
        this.user = await UserModel.findOne({email: this.body.email});
        if(!this.user) {
            this.errors.push('User no exists');
            return;
        }
        if(!bcrypt.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Invalid password');
            this.user = null;
            return;
        }
    }

    async signUp() {
        this.validate();
        if(this.errors.length > 0) return;
        await this.userExists();
        if(this.errors.length > 0) return;
        const salt = bcrypt.genSaltSync();
        
        this.body.password = bcrypt.hashSync(this.body.password, salt);
        this.body.password2 = bcrypt.hashSync(this.body.password2, salt);
        this.user = await UserModel.create(this.body);
    }


    async recoveryPass(email) {
        this.user = await UserModel.findOne({email: this.body.email})
        const mail = new sendMail(email);
        if(this.user) {
            console.log('check your box');
            return await mail.sendMail();
        } if (!this.user) {
            console.log('Usuario nao existe');
        }
            
        
    }

    validate() {
        this.clean();
        if(!validator.isEmail(this.body.email)) this.errors.push('invalid email');
        if(this.body.password.length < 5 || this.body.password.length > 30) {
            this.errors.push('Password must be between 5 and 30 characters long: ');
        }
        if(this.body.password !== this.body.password2)   this.errors.push('Passwords must be equals');
    }

    validateLogin() {
        this.clean();
        if(!validator.isEmail(this.body.email)) this.errors.push('invalid email');
        if(this.body.password.length < 5 || this.body.password.length > 30) {
            this.errors.push('Password must be between 5 and 30 characters long: ');
        }
        
    }

    async userExists() {
        this.user = await UserModel.findOne({email: this.body.email})
        if(this.user) this.errors.push('User alredy exists');
    }
    
    async clean() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password,
            password2: this.body.password2
        };
    }
}

module.exports = User;