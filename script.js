let votes = {
    fortnite: 0,
    overwatch: 0,
    pubg: 0
};

function vote(game) {
    votes[game]++;
    document.getElementById(game + '-votes').textContent = 'Votes: ' + votes[game];
}
