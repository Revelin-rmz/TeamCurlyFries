const API_KEY = 'neurelo_9wKFBp874Z5xFw6ZCfvhXbZJsLgzG5hlpiv1Zjwk+w3KvTL0gCA6KtvyK5TUHrKO8wlP9wMGC5KZyvo1ab54AYvhechTQQpwMELKGjVZt20hMQ/+5B2VAtUMqEEuEMCQHdnyIqX1S5vxSAnjqrWtcuo1IaO97OypU/two0TTcV7P5MyWYanOiaUFRLdgGObb_hL1QR6mTxi4T2N7J/yg5qYs8Z0DRO808yEyH4XKRnvo=';

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'none';
});

document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch(`https://us-west-2.aws.neurelo.com/rest/Dev_Table?filter={"email":"${email}"}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data:', data);
        if (!data || data.length === 0) {
            throw new Error('No user found with this email.');
        }

        const user = data[0];
        if (!user.password) {
            throw new Error('User data does not contain a password.');
        }

        if (user.password === password) {
            localStorage.setItem('user', JSON.stringify(user));
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            document.querySelector('.landing-page').style.display = 'none';
            fetchPosts();
        } else {
            throw new Error('Invalid password.');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert('Error logging in: ' + error.message);
    });
});

document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const Dev_name = document.getElementById('registerName').value;

    fetch('https://us-west-2.aws.neurelo.com/rest/Dev_Table/__one', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify({ email, password, Dev_name })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        if (data.errors) {
            alert('Registration failed: ' + data.errors[0].error);
        } else {
            alert('Registration successful. Please login.');
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error registering:', error);
        alert('Error registering: ' + error.message);
    });
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;

        const post = {
            title,
            description,
            imageUrl
        };

        savePostToDatabase(post);
        displayPost(post);
        document.getElementById('postForm').reset();
    };
    reader.readAsDataURL(imageFile);
});

function displayPost(post) {
    const postsContainer = document.getElementById('postsContainer');

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <img src="${post.imageUrl}" alt="${post.title}">
    `;

    postsContainer.appendChild(postDiv);
}

function savePostToDatabase(post) {
    fetch('https://us-west-2.aws.neurelo.com/rest/Dev_Table/__one', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify(post)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        console.log('Post saved:', data);
    })
    .catch(error => {
        console.error('Error saving post:', error);
        alert('Error saving post: ' + error.message);
    });
}

function fetchPosts() {
    fetch(`https://us-west-2.aws.neurelo.com/rest/Dev_Table`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        data.forEach(post => displayPost(post));
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
        alert('Error fetching posts: ' + error.message);
    });
}
