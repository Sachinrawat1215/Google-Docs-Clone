const DocumentModel = require('../../Schema/documentSchema');
const constants = require('../../utils/constants');

const createDocument = async (req, res) => {
  try {
    const { userId, title } = req.body;

    // Validate request parameters
    if (!userId || !title) {
      return res
        .status(400)
        .json({ status: false, message: constants.REQUIRED_FIELDS_MESSAGE });
    }

    // Create the document
    const document = await DocumentModel.create({ userId, title, data: '' });

    // Return success response
    res.status(201).json({
      status: true,
      message: constants.DOCUMENT_CREATED_MESSAGE,
      data: document._id,
    });
  } catch (error) {
    // Handle errors
    console.error('Error creating document:', error);
    res.status(500).json({
      status: false,
      message: constants.CREATE_DOCUMENT_FAILED_MESSAGE,
    });
  }
};

module.exports = createDocument;
