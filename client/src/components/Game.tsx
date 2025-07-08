import React from 'react'
import type { Player } from "../../types"

type GameProps = {
    players: Player[];
    endGame: () => void;
}

const Game: React.FC<GameProps> = ({ players, endGame }) => {
  return (
    <>
      <h2>Game</h2>
      <ul>
        {players.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <button onClick={endGame}>Spiel beenden</button>
    </>
  )
}

export default Game