document.addEventListener('DOMContentLoaded', function() {
    showPage('home-page');
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function submitVote() {
    const form = document.getElementById('poll-form');
    const selectedOption = form.querySelector('input[name="update"]:checked');
    if (selectedOption) {
        alert(`You voted for: ${selectedOption.value}`);
        // Here you would send the vote to the server and then update the results page.
        const API_KEY = 'neurelo_9wKFBp874Z5xFw6ZCfvhXbZJsLgzG5hlpiv1Zjwk+w3KvTL0gCA6KtvyK5TUHrKO8wlP9wMGC5KZyvo1ab54AYvhechTQQpwMELKGjVZt20hMQ/+5B2VAtUMqEEuEMCQHdnyIqX1S5vxSAnjqrWtcuo1IaO97OypU/two0TTcV7P5MyWYanOiaUFRLdgGObb_hL1QR6mTxi4T2N7J/yg5qYs8Z0DRO808yEyH4XKRnvo=';
        const pollForm = document.getElementById('poll-form');
    const formData = new FormData(pollForm);
    const selectedUpdate = formData.get('update');
    const userId = document.getElementById('user-id').value;
    const devName = document.getElementById('dev-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!selectedUpdate) {
        alert('Please select an option to vote.');
        return;
    }

    const voteData = {
        // update: selectedUpdate,
        voter_name: devName,
        // id: userId,
        email: email,
        password: password

    };

    fetch('https://us-west-2.aws.neurelo.com/rest/Voting_Table/__one', {
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

        // end here
        showPage('results-page');
        updateResultsChart();
    } else {
        alert('Please select an option before submitting.');
    }
}

function updateResultsChart() {
    // Example data - replace with real data from server
    const data = {
        labels: ['New Level', 'New Character', 'New Weapon'],
        datasets: [{
            label: 'Votes',
            data: [5, 3, 8], // Example data
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
        }]
    };

    const ctx = document.getElementById('results-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}
