import React from "react";
import type { Player } from "../../types";

type EndProps = {
	toLobby: () => void;
	players: Player[];
};

const end: React.FC<EndProps> = ({ toLobby, players }) => {
	return (
		<div className="main-wrapper">
			<h2>Übersicht</h2>
			<div className="list">
				{players.map((player) => (
					<h3 key={player.id} className="player-name">
						{player.name}: {player.word}
					</h3>
				))}
			</div>
			<button onClick={toLobby}>Zurück zur Lobby</button>
		</div>
	);
};

export default end;
