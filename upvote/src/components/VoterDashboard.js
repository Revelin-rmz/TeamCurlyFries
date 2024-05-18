import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoterDashboard = ({ location }) => {
  const { email } = location.state;
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchPolls = async () => {
      const result = await axios.get('/api/active-polls');
      setPolls(result.data);
    };
    fetchPolls();
  }, []);

  const handleVote = async () => {
    try {
      await axios.post('/api/vote', {
        pollId: selectedPoll.id,
        option: selectedOption,
        voter: email
      });
      alert('Vote submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit vote.');
    }
  };

  return (
    <div>
      <h1>Voter Dashboard</h1>
      <div>
        {polls.map((poll) => (
          <div key={poll.id}>
            <h2>{poll.question}</h2>
            {poll.options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="pollOption"
                  value={option}
                  onChange={() => setSelectedOption(option)}
                />
                {option}
              </div>
            ))}
            <button onClick={() => setSelectedPoll(poll)}>Vote</button>
          </div>
        ))}
      </div>
      {selectedPoll && (
        <div>
          <h2>Voting for: {selectedPoll.question}</h2>
          <button onClick={handleVote}>Submit Vote</button>
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;
