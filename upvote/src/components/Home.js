import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const [role, setRole] = useState(null);

  const responseGoogle = (response) => {
    const { profileObj } = response;
    const { email } = profileObj;

    if (email) {
      if (role === 'dev') {
        history.push('/dev-dashboard', { email });
      } else if (role === 'voter') {
        history.push('/voter-dashboard', { email });
      }
    }
  };

  return (
    <div>
      <h1>Welcome to Game Polls</h1>
      <div>
        <button onClick={() => setRole('dev')}>Login as Game Dev</button>
        <button onClick={() => setRole('voter')}>Login as Voter</button>
      </div>
      {role && (
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};

export default Home;
