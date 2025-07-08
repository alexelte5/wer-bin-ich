import React from 'react';
import type { Player } from "../../types";
import Settings from "./dialogs/Settings";

type LobbyProps = {
  players: Player[];
  startGame: () => void;
};

const Lobby: React.FC<LobbyProps> = ({ players, startGame }) => {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div>
      <button onClick={() => setShowSettings(true)}>⚙️</button>
      <h2 className="header">Lobby</h2>
      <div>
        <h3 className="subheader">Spieler in der Lobby</h3>
        <div className="list">
          {players.map((p) => (
            <h4 key={p.id} className="player-name">{p.name}</h4>
          ))}
        </div>
        {players.length <= 1 && (
          <h4>Auf spieler warten...</h4>
        )}
      </div>
      <button onClick={startGame} disabled={players.length <= 1}>Spiel starten</button>
      {showSettings && <div className='dialog'><Settings onClose={() => setShowSettings(false)} /></div>}
    </div>
  );
};

export default Lobby;