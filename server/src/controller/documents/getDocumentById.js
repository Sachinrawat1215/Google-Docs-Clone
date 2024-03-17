const DocumentModel = require('../../Schema/documentSchema');
const constants = require('../../utils/constants');

const getDocumentById = async (id) => {
  try {
    // Check if ID is null
    if (id === null) return null; // Return null if ID is null

    // Find document by ID
    const document = await DocumentModel.findById(id);

    // If document exists, return it
    if (document) return document;

    // If document does not exist, throw an error
    throw { status: false, message: constants.NO_DOCUMENT_FOUND_MESSAGE };
  } catch (error) {
    console.error('Error fetching document:', error);
    throw { status: false, message: constants.FAILED_TO_FETCH_DOCUMENT };
  }
};

module.exports = getDocumentById;
