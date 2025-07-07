import React from 'react'

type EndProps = {
    startGame: () => void;
}

const end: React.FC<EndProps> = ({ startGame }) => {
  return (
    <div>
      <h2>End</h2>
      <button onClick={startGame}>Spiel starten</button>
    </div>
  )
}

export default end