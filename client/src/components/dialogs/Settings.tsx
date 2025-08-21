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
      <div className="settings-upper-wrapper">
        <h2>Einstellungen</h2>
        <button onClick={onClose} className='icon-button'>❌</button>
      </div>
      <div className="game-settings">
        <h3 className='sub-header'>Spiel Einstellungen</h3>
        <div className="slider">
          <span className='sub-header'>{toggled ? 'Zufällig' : 'Benutzerdefiniert'}</span>
          <button className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => {
            setToggled(!toggled);
          }}>
            <div className='thumb'></div>
          </button>
        </div>

      </div>
      <button onClick={signout} className='signout'>Abmelden</button>
    </>
  )
}

export default Settings