import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function App() {
  const [loginType, setLoginType] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);

    // Send the data to the backend
    axios.post('/api/login', {
      type: loginType,
      credentials: credentialResponseDecoded
    })
    .then(response => {
      console.log('Server response:', response.data);
    })
    .catch(error => {
      console.error('Error sending data to the server:', error);
    });
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <h1>Login</h1>
      {!loginType ? (
        <div>
          <button onClick={() => setLoginType('dev')}>Dev Login</button>
          <button onClick={() => setLoginType('voter')}>Voter Login</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      )}
    </div>
  );
}

export default App;
