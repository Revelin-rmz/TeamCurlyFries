const API_KEY = 'neurelo_9wKFBp874Z5xFw6ZCfvhXbZJsLgzG5hlpiv1Zjwk+w3KvTL0gCA6KtvyK5TUHrKO8wlP9wMGC5KZyvo1ab54AYvhechTQQpwMELKGjVZt20hMQ/+5B2VAtUMqEEuEMCQHdnyIqX1S5vxSAnjqrWtcuo1IaO97OypU/two0TTcV7P5MyWYanOiaUFRLdgGObb_hL1QR6mTxi4T2N7J/yg5qYs8Z0DRO808yEyH4XKRnvo=';

function submitVote() {
    const pollForm = document.getElementById('poll-form');
    const formData = new FormData(pollForm);
    const selectedUpdate = formData.get('update');
    const userId = document.getElementById('user-id').value;

    if (!selectedUpdate) {
        alert('Please select an option to vote.');
        return;
    }

    const voteData = {
        update: selectedUpdate,
        userId: userId
    };

    fetch('https://us-west-2.aws.neurelo.com/rest/Dev_Table/__one', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify(voteData)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        alert('Vote submitted successfully.');
        showPage('results-page'); // Redirect to the results page after submitting the vote
    })
    .catch(error => {
        console.error('Error submitting vote:', error);
        alert('Error submitting vote: ' + error.message);
    });
}
