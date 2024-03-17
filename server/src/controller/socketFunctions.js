const { Server } = require('socket.io');
const getDocumentById = require('./documents/getDocumentById');
const updateDocumentById = require('./documents/updateDocumentById');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://getdocs.vercel.app',
      ],
      method: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
      socket.on('get-document', async (documentId) => {
        console.log('connection established')
      const document = await getDocumentById(documentId);
      socket.join(documentId);
      socket.emit('load-document', document.data);

      socket.on('send-changes', (delta) => {
        socket.broadcast.to(documentId).emit('receive-changes', delta);
      });

      socket.on('save-document', async (data) => {
        await updateDocumentById(documentId, data);
      });
    });
  });
};
