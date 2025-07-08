import React from 'react';
import type { Player } from "../../types";
import Settings from "./dialogs/Settings";

type LobbyProps = {
  players: Player[];
  startGame: () => void;
};

function homepage() {
  window.location.href = 'https://kysfrfr.de';
}

const Lobby: React.FC<LobbyProps> = ({ players, startGame }) => {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="wrapper">
      <div className="upper-wrapper">
        <button onClick={homepage} className='top-left icon-button'>🏠</button>
        <button onClick={() => setShowSettings(true)} className='top-right icon-button'>⚙️</button>
      </div>
      <div className="main-wrapper">
        <div>
          <h3 className="subheader">Spieler in der Lobby</h3>
          <div className="list">
            {players.map((p) => (
              <h4 key={p.id} className="player-name">{p.name}</h4>
            ))}
          </div>
          {players.length <= 1 && (
            <h4 className="waiting">Auf spieler warten...</h4>
          )}
        </div>
        <button onClick={startGame} disabled={players.length <= 1} className={players.length <= 1 ? 'disabled' : ''}>Spiel starten</button>
        {showSettings && <div className='dialog'><Settings onClose={() => setShowSettings(false)} /></div>}
      </div>
    </div>
  );
};

export default Lobby;