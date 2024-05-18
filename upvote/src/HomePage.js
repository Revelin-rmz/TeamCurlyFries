import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = "1062647599098-ej4k921vbj1cuak2o8ks2n6e3hg7udtf.apps.googleusercontent.com";

const HomePage = () => {
  const [action, setAction] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response.profileObj);
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    if (action === 'gameDev') {
      navigate('/developer-dashboard');
    } else if (action === 'voter') {
      navigate('/voter-dashboard');
    }
  };

  const handleLoginFailure = (response) => {
    console.log('Login Failed:', response);
  };

  const handleButtonClick = (selectedAction) => {
    setAction(selectedAction);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Home Page</h1>
      <GoogleLogin
        clientId={clientId}
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <>
            <button
              style={styles.button}
              onClick={() => {
                handleButtonClick('gameDev');
                renderProps.onClick();
              }}
              disabled={renderProps.disabled}
            >
              Game Dev
            </button>
            <button
              style={styles.button}
              onClick={() => {
                handleButtonClick('voter');
                renderProps.onClick();
              }}
              disabled={renderProps.disabled}
            >
              Voter
            </button>
          </>
        )}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  }
};

export default HomePage;
