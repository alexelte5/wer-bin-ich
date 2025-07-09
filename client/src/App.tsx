// client/src/App.tsx
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { Player } from "../types";
import AssignWord from "./components/AssignWord";
import End from "./components/End";
import Game from "./components/Game";
import Lobby from "./components/Lobby";
import Login from "./components/Login";

// Typen
type Phase = "login" | "lobby" | "assigning" | "game" | "end";

// Socket verbinden
const socket: Socket = io("http://localhost:3000");

function App() {
	const [phase, setPhase] = useState<Phase>("login");
	const [name, setName] = useState("");
	const [players, setPlayers] = useState<Player[]>([]);
	const [toggled, setToggled] = useState(false);
	let savedName: string | null = null;

	useEffect(() => {
		savedName = localStorage.getItem("username");

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

	const startGame = () => socket.emit("start-game", toggled ? "random" : "custom");
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
				<Lobby players={players} startGame={startGame} toggled={toggled} setToggled={setToggled} />
			)}

			{phase === "assigning" && (
				<AssignWord players={players} username={savedName} />
			)}

			{phase === "game" && <Game players={players} endGame={endGame} />}

			{phase === "end" && <End toLobby={toLobby} />}
		</div>
	);
}

export default App;
