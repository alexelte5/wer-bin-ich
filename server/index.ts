import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import type { Player } from "../client/types";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

type Phase = "assigning" | "game" | "end" | null;

let users: Player[] = [];
let phase: Phase = null;

function randomAssignment() {
  const shuffled = [...users];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  for (let i = 0; i < shuffled.length; i++) {
    const giver = shuffled[i];
    const receiver = shuffled[(i + 1) % shuffled.length];
    giver.targetId = receiver.id;
    giver.targetName = receiver.name;
  }
}

function customAssignment() {
  return;
}

function broadcastState() {
  io.emit("sync-state", { phase, players: users });
}

io.on("connection", (socket) => {
  console.log("Neue Verbindung");

  socket.on("set-name", (name: string) => {
    const user: Player = { id: socket.id, name };
    users.push(user);
    broadcastState();
  });

  socket.on("rejoin", (name: string) => {
    let exisitingUser = users.find((user) => user.name === name);
    if (!exisitingUser) {
      users.push({ id: socket.id, name });
    } else {
      exisitingUser.id = socket.id;
    }
    broadcastState();
  });

  socket.on("start-game", (toggled) => {
    console.log(toggled);
    phase = "assigning";

    users.forEach((user) => {
      delete user.word;
    });
    if (toggled === "random") {
      randomAssignment();
    }
    if (toggled === "custom") {
      customAssignment();
    }

    console.log(
      "Zuweisungen:",
      users.map((u) => `${u.name} ➝ ${u.targetName}`)
    );
    broadcastState();
  });

  socket.on("assign-words", ({ targetId, word }) => {
    const target = users.find((user) => user.id === targetId);
    if (target) target.word = word;
    broadcastState();
    const allHaveWords = users.every((user) => user.word);
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
    phase = null;
    users.forEach((user) => {
      delete user.word;
    });
    broadcastState();
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    broadcastState();
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
