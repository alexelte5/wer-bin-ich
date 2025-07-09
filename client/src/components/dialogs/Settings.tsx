import React from 'react';

type SettingsProps = {
  onClose: () => void;
  signout: () => void;
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose, signout, toggled, setToggled }) => {

  return (
    <>
      <div className="upper-wrapper">
        <h2 className='header'>Einstellungen</h2>
        <button onClick={onClose} className='icon-button'>❌</button>
      </div>
      <div className="game-settings">
        <h3 className='subheader'>Spiel Einstellungen</h3>
        <div className="slider">
          <span>{toggled ? 'Zufällig' : 'Benutzerdefiniert'}</span>
          <button className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => {
            setToggled(!toggled);
          }}>
            <div className='thumb'></div>
          </button>
        </div>

      </div>
      <button onClick={signout}>Abmelden</button>
    </>
  )
}

export default Settings