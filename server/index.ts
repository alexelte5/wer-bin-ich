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

type User = {
  id: string;
  name: string;
  word?: string;
}

let users: User[] = [];

io.on('connection', (socket) => {
  console.log('🔌 Neue Verbindung:', socket.id);

  socket.on('set-name', (name: string) => {
    console.log(`${socket.id} heißt jetzt ${name}`);
    const user = { id: socket.id, name };
    users.push(user);
    io.emit('update-users', users);
  });

  socket.on('disconnect', () => {
    let user = users.filter(user => user.id !== socket.id)[0];
    if (user) {
      users = users.filter(user => user.id !== socket.id);
      console.log('❌ Verbindung getrennt:', user.name);
      io.emit('update-users', users);
    }
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
