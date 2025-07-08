import React from 'react'

type EndProps = {
    toLobby: () => void;
}

const end: React.FC<EndProps> = ({ toLobby }) => {
  return (
    <div>
      <h2>End</h2>
      <button onClick={toLobby}>Zurück zur Lobby</button>
    </div>
  )
}

export default end