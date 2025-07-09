import React from "react";
import type { Player } from "../../types";

type AssignWordProps = {
	players: Player[];
	username: string | null;
};

const AssignWord: React.FC<AssignWordProps> = ({ players, username }) => {
	const me = players.find(player => player.name === username);
	const target = players.find(player => player.id === me?.targetId);
	return (
		<>
			<h2>Bestimme ein Wort für: <strong>{target?.name}</strong></h2>
			<div className="assign-word">
				<input type="text" placeholder="Wort eingeben" />
				<button>Bestätigen</button>
			</div>
		</>
	);
};

export default AssignWord;
