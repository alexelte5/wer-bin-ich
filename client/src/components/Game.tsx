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
			<div className="main-wrapper">
				<h2>Spiel</h2>
				{mates.map((mate) => (
					<h3 key={mate.id} className="player-name">
						{mate.name}: {mate.word}
					</h3>
				))}
				<button onClick={endGame}>Spiel beenden</button>
			</div>
		</>
	);
};

export default Game;
