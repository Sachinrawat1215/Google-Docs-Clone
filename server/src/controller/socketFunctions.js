const { Server } = require('socket.io');
const { getDocument, updateDocument } = require('./document-controller');

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
      const document = await getDocument(documentId);
      socket.join(documentId);
      socket.emit('load-document', document.data);

      socket.on('send-changes', (delta) => {
        socket.broadcast.to(documentId).emit('receive-changes', delta);
      });

      socket.on('save-document', async (data) => {
        await updateDocument(documentId, data);
      });
    });
  });
};
