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

function submitPoll() {
    const form = document.getElementById('create-poll-form');
    const formData = new FormData(form);

    const pollData = {
        poll_name: formData.get('poll_name'),
        game: formData.get('game'),
        user: formData.get('user'),
        poll_question: formData.get('poll_question'),
        date_made: formData.get('date_made'),
        date_ended: formData.get('date_ended'),
        poll_option1: formData.get('poll_option1'),
        poll_option2: formData.get('poll_option2'),
        poll_option3: formData.get('poll_option3'),
        poll_option4: formData.get('poll_option4')
    };

    console.log("Poll Created:", pollData);
    console.log("Poll Question:", pollData.poll_question);
    console.log("Poll Question:", pollData.poll_question);
    console.log("Poll Question:", pollData.poll_question);
    console.log("Poll Question:", pollData.poll_question);

       // Add functionality to save the poll data to the server or local storage
    alert(pollData.poll_question);
    showPage('home-page');
}
