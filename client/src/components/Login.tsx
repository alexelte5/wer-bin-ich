import React from 'react'

type LoginProps = {
  name: string;
  setName: (name: string) => void;
  handleLogin: () => void;
};

const Login: React.FC<LoginProps> = ({ name, setName, handleLogin }) => {
  return (
    <div>
      <h1>Wer bin ich?</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Dein Name"
      />
      <button onClick={handleLogin}>Beitreten</button>
    </div>
  );
};

export default Login;