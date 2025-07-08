import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

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

type Phase = "login" | "lobby" | "assigning" | "game" | "end";

let users: User[] = [];
let phase: Phase = "login";

function broadcastState() {
  io.emit('sync-state', { phase, players: users });
}

io.on('connection', (socket) => {
  console.log("Neue Verbindung");

  socket.on("set-name", (name: string) => {
    const user: User = { id: socket.id, name };
    users.push(user);
    phase = "lobby";
    broadcastState();
  });

  socket.on("rejoin", (name: string) => {
    let exisitingUser = users.find(user => user.name === name);
    if (!exisitingUser) {
      users.push({ id: socket.id, name });
    } else  {
      exisitingUser.id = socket.id;
    }
    broadcastState();
  });

  socket.on("start-game", () => {
    phase = "assigning";
    users.forEach(user => {
      delete user.word;
    })
    broadcastState();
  });

  socket.on("assign-words", ({targetId, word}) => {
    const target = users.find(user => user.id === targetId);
    if (target) target.word = word;
    broadcastState();
    const allHaveWords = users.every(user => user.word);
    if (allHaveWords) {
      phase = "game";
      broadcastState();
    }
  });

  socket.on("end-game", () => {
    phase = "end";
    broadcastState();
  });

  socket.on("to-lobby", () => {
    phase = "lobby";
    users.forEach(user => {
      delete user.word;
    });
    broadcastState();
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user.id !== socket.id);
    broadcastState();
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
