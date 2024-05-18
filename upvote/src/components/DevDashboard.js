import React, { useState } from 'react';
import axios from 'axios';

const DevDashboard = ({ location }) => {
  const { email } = location.state;
  const [poll, setPoll] = useState({ question: '', options: ['', ''] });

  const handleOptionChange = (index, event) => {
    const newOptions = poll.options.slice();
    newOptions[index] = event.target.value;
    setPoll({ ...poll, options: newOptions });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/create-poll', {
        ...poll,
        createdBy: email
      });
      alert('Poll created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create poll.');
    }
  };

  return (
    <div>
      <h1>Developer Dashboard</h1>
      <input
        type="text"
        placeholder="Poll Question"
        value={poll.question}
        onChange={(e) => setPoll({ ...poll, question: e.target.value })}
      />
      {poll.options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e)}
        />
      ))}
      <button onClick={handleSubmit}>Create Poll</button>
    </div>
  );
};

export default DevDashboard;
