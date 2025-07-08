// client/src/App.tsx
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import type { Player } from "../types";
import Login from "./components/Login";
import Lobby from "./components/Lobby";
import Game from "./components/Game";
import End from "./components/End";

// Typen
type Phase = "login" | "lobby" | "game" | "end";

// Socket verbinden
const socket: Socket = io("http://localhost:3000");

function App() {
	const [phase, setPhase] = useState<Phase>("login");
	const [name, setName] = useState("");
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		socket.on("user-joined", (player: Player) => {
			setPlayers((prev) => [...prev, player]);
		});

		socket.on("user-left", (id: string) => {
			setPlayers((prev) => prev.filter((p) => p.id !== id));
		});

		socket.on("update-users", (updatedPlayers: Player[]) => {
			setPlayers(updatedPlayers);
		});

		return () => {
			socket.off("user-joined");
			socket.off("user-left");
			socket.off("update-users");
		};
	}, []);

	const handleLogin = () => {
		if (!name.trim()) return;
		socket.emit("set-name", name);
		setPhase("lobby");
	};

	const startGame = () => setPhase("game");
	const endGame = () => setPhase("end");

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

			{phase === "game" && <Game players={players} endGame={endGame} />}

			{phase === "end" && <End startGame={startGame} />}
		</div>
	);
}

export default App;
