import React from 'react'

type SettingsProps = {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  return (
    <div>Settings
      <button onClick={onClose}>❌</button>
    </div>
  )
}

export default Settings