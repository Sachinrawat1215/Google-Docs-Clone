const DocumentModel = require('../Schema/documentSchema');

const getDocument = async (id) => {
    if(id === null) return;

    const document = await DocumentModel.findById(id);

    if(document) return document;

    return await Document.create({_id: id, data: ''});
}

const updateDocument = async (id, data) => {
    return await DocumentModel.findByIdAndUpdate(id, {data});
}
 
module.exports = {getDocument, updateDocument};