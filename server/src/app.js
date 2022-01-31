const { Server } = require('socket.io');
const Connection = require('./database/db');
const { getDocument, updateDocument } = require('./controller/document-controller');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;

const URL = process.env.MONGODB_URI;

Connection(URL);

const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        });
    });
});