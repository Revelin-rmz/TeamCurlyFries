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
    
    fetch('https://api.neurelo.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user));
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            document.querySelector('.landing-page').style.display = 'none';
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
    });
});

document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    fetch('https://api.neurelo.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful. Please login.');
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error registering:', error);
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
    fetch('https://api.neurelo.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post saved:', data);
    })
    .catch(error => {
        console.error('Error saving post:', error);
    });
}
