const { async } = require('regenerator-runtime');
const Register = require('../models/UserModel');

exports.registerIndex = (req, res) => {
    res.render('register');
}

exports.registerUser = async (req, res) => {
    try {
        const register = new Register(req.body);
        await register.signUp();
        if(register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(function() {
                return res.redirect('/register');
            });
            return;
        }
        req.flash('success', 'Successfully created');
        req.session.save(function() {
            return res.redirect('/');
        })

    } catch(e) {
        console.log(e);
    }
};