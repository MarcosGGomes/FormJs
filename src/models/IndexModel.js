const mongoose = require('mongoose');

const IndexSchema = new mongoose.Schema({
    titulo: {type: String, required: true}
});

const IndexModel = mongoose.model('Index', IndexSchema);

module.exports = IndexModel;