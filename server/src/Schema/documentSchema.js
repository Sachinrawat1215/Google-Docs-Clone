const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

const DocumentModel = mongoose.model('document', documentSchema);

module.exports = DocumentModel;