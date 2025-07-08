// client/src/App.tsx
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import type { Player } from "../types";
import AssignWord from "./components/AssignWord";
import Login from "./components/Login";
import Lobby from "./components/Lobby";
import Game from "./components/Game";
import End from "./components/End";

// Typen
type Phase = "login" | "lobby" | "assigning" | "game" | "end";

// Socket verbinden
const socket: Socket = io("http://localhost:3000");

function App() {
	const [phase, setPhase] = useState<Phase>("login");
	const [name, setName] = useState("");
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		const savedName = localStorage.getItem("username");

		socket.on("connect", () => {
			if (savedName) {
				socket.emit("rejoin", savedName);
			} else {
				setPhase("login");
			}
		});

		socket.on("sync-state", ({ phase, players }: { phase: Phase; players: Player[] }) => {
			setName(savedName || "");
			setPlayers(players);
			setPhase(phase);
		});

		return () => {
			socket.off("connect");
			socket.off("sync-state");
		};
	}, []);

	const handleLogin = () => {
		if (!name.trim()) return;

		localStorage.setItem("username", name);
		socket.emit("set-name", name);
	};

	const startGame = () => socket.emit("start-game");
	const endGame = () => socket.emit("end-game");
	const toLobby = () => socket.emit("to-lobby");

	return (
		<div className="wrapper">
			{phase === "login" && (
				<Login
					name={name}
					setName={setName}
					handleLogin={handleLogin}
				/>
			)}

			{phase === "lobby" && (
				<Lobby players={players} startGame={startGame} />
			)}

			{phase === "assigning" && (
				<AssignWord />
			)}

			{phase === "game" && <Game players={players} endGame={endGame} />}

			{phase === "end" && <End toLobby={toLobby} />}
		</div>
	);
}

export default App;
