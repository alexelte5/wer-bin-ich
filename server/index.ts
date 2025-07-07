import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Neue Verbindung:', socket.id);

  socket.on('set-name', (name: string) => {
    console.log(`${socket.id} heißt jetzt ${name}`);
    io.emit('user-joined', { id: socket.id, name });
  });

  socket.on('disconnect', () => {
    console.log('❌ Verbindung getrennt:', socket.id);
    io.emit('user-left', socket.id);
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
