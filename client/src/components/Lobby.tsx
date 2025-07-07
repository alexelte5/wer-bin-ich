import React from 'react'
import type { Player } from "../../types"

type LobbyProps = {
  players: Player[];
  startGame: () => void;
};

const Lobby: React.FC<LobbyProps> = ({ players, startGame }) => {
  return (
    <div>
      <h2>Lobby</h2>
      <ul>
        {players.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <button onClick={startGame}>Spiel starten</button>
    </div>
  );
};

export default Lobby;