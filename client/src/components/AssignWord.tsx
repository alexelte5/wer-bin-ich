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
			{assigned ? (
				<p>
					Du hast <strong>{word}</strong> für{" "}
					<strong>{target?.name}</strong> zugewiesen.
				</p>
			) : (
				<div className="assign-word">
					<h2>
						Bestimme ein Wort für: <strong>{target?.name}</strong>
					</h2>
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
		</>
	);
};

export default AssignWord;
