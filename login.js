document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'emmanuel' && password === 'toboyyy') {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'admin.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
