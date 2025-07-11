import React from "react";
import type { Player } from "../../types";

type GameProps = {
	players: Player[];
	username: string | null;
	endGame: () => void;
};

const Game: React.FC<GameProps> = ({ players, username, endGame }) => {
	const mates = players.filter((player) => player.name !== username);
	return (
		<>
			<h2>Game</h2>
			<ul>
				{mates.map((mate) => (
					<p key={mate.id}>
						{mate.name}: {mate.word}
					</p>
				))}
			</ul>
			<button onClick={endGame}>Spiel beenden</button>
		</>
	);
};

export default Game;
