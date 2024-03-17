const DocumentModel = require('../../Schema/documentSchema');
const constants = require('../../utils/constants');

const getAllUserDocuments = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming user ID is available from JWT

    const documents = await DocumentModel.find({ userId });

    res.json({
      status: true,
      message: constants.DOCUMENTS_RETRIEVED_SUCCESSFULLY,
      data: documents,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: constants.FAILED_TO_FETCH_DOCUMENTS });
  }
};

module.exports = { getAllUserDocuments };
