import React from "react";
import type { Player } from "../../types";

type AssignWordProps = {
	players: Player[];
	username: string | null;
	handleAssignWord: (targetId: string | undefined, word: string) => void;
};

const AssignWord: React.FC<AssignWordProps> = ({
	players,
	username,
	handleAssignWord,
}) => {
	const [word, setWord] = React.useState("");
	const [assigned, setAssigned] = React.useState(false);

	const me = players.find((player) => player.name === username);
	const target = players.find((player) => player.id === me?.targetId);
	return (
		<>
			<div className="main-wrapper">
				{assigned ? (
					<div>
						<p className="assigned-text">
							<strong>{target?.name}</strong> hat das Wort: <strong>{word}</strong>
							{/* <strong>Nina</strong> hat das Wort: <strong>Apfel</strong> */}
						</p>
						<p className="muted">Warte bis alle ein Wort zugewiesen haben</p>
					</div>
				) : (
					<div className="assign-word">
						<h2>Bestimme ein Wort für:</h2>
						<p className="target-name">{target?.name}</p>
						{/* <p className="target-name">Nina</p> */}
						<input
							type="text"
							placeholder="Wort eingeben"
							value={word}
							onChange={(e) => setWord(e.target.value)}
						/>
						<button
							onClick={() => {
								handleAssignWord(target?.id, word);
								setAssigned(true);
							}}
						>
							Bestätigen
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default AssignWord;
