const DocumentModel = require('../../Schema/documentSchema');
const constants = require('../../utils/constants');

const updateDocumentById = async (id, data) => {
  try {
    // Check if ID and data are provided
    if (!id || !data) {
      throw { status: false, message: constants.REQUIRED_FIELDS_MESSAGE };
    }

    // Update document by ID
    const updatedDocument = await DocumentModel.findByIdAndUpdate(id, { data });

    // Check if document was updated
    if (!updatedDocument) {
      throw { status: false, message: constants.UPDATE_DOCUMENT_FAILED_MESSAGE };
    }

    return updatedDocument;
  } catch (error) {
    // Handle errors
    console.error('Error updating document:', error);
    throw { status: false, message: constants.UPDATE_DOCUMENT_FAILED_MESSAGE };
  }
};

module.exports = updateDocumentById;
