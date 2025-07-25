import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { Player } from "../types";
import AssignWord from "./components/AssignWord";
import End from "./components/End";
import Game from "./components/Game";
import Lobby from "./components/Lobby";
import Login from "./components/Login";

// Typen
type ClientPhase = "login" | "lobby";
type ServerPhase = "assigning" | "game" | "end";

// Socket verbinden
const socket: Socket = io("http://192.168.0.118:5004");

function App() {
	const [clientPhase, setClientPhase] = useState<ClientPhase>("login");
	const [serverPhase, setServerPhase] = useState<ServerPhase | null>(null);
	const [name, setName] = useState("");
	const [players, setPlayers] = useState<Player[]>([]);
	const [toggled, setToggled] = useState(true);
	const [savedName, setSavedName] = useState<string | null>(() =>
		localStorage.getItem("username")
	);

	useEffect(() => {
		socket.on("connect", () => {
			if (savedName) {
				socket.emit("rejoin", savedName);
				setClientPhase("lobby");
			} else {
				setClientPhase("login");
			}
		});

		socket.on(
			"sync-state",
			({ phase, players }: { phase: ServerPhase; players: Player[] }) => {
				setName(savedName || "");
				setPlayers(players);
				setServerPhase(phase);

				if (phase === null && savedName) {
					setClientPhase("lobby");
				}
			}
		);

		return () => {
			socket.off("connect");
			socket.off("sync-state");
		};
	}, [savedName]);

	const handleLogin = () => {
		if (!name.trim()) return;

		localStorage.setItem("username", name);
		setSavedName(name);
		socket.emit("set-name", name);
		setClientPhase("lobby");
	};

	const startGame = () => {
		socket.emit("start-game", toggled ? "random" : "custom");
	};
	const endGame = () => socket.emit("end-game");
	const toLobby = () => {
		socket.emit("to-lobby");
		setClientPhase("lobby");
	};

	const handleAssignWord = (targetId: string | undefined, word: string) => {
		socket.emit("assign-words", { targetId, word });
	};

	return (
		<div className="wrapper">
			{clientPhase === "login" && (
				<Login
					name={name}
					setName={setName}
					handleLogin={handleLogin}
				/>
			)}

			{clientPhase === "lobby" && serverPhase === null && (
				<Lobby
					players={players}
					startGame={startGame}
					toggled={toggled}
					setToggled={setToggled}
				/>
			)}

			{serverPhase === "assigning" && (
				<AssignWord
					players={players}
					username={savedName}
					handleAssignWord={handleAssignWord}
				/>
			)}

			{serverPhase === "game" && (
				<Game
					players={players}
					username={savedName}
					endGame={endGame}
				/>
			)}

			{serverPhase === "end" && <End toLobby={toLobby} players={players}/>}
		</div>
	);
}
export default App;
