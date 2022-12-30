const Login = require('./../models/UserModel');


exports.index = (req, res) => {
    res.render('index');
};

exports.recoveryIndex = (req, res) => {
    res.render('recovery');
}

//fix tomorrow
exports.recovery = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.recoveryPass(req.body.email)
        
    } catch (error) {
        // 
    }        
    
}

exports.home = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/');
            });
            return;
        }
        req.flash('success', `Welcome, ${login.user.name}`);
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/');
        });
    } catch(e) {
        console.log(e);
    }
}

