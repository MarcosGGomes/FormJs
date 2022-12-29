const IndexModel = require('../models/IndexModel');


// Cria os dados
/*
IndexModel.create({
    
});
*/

exports.index = (req, res) => {
    res.render('index');
};

