document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  // Simulate auth
  localStorage.setItem('user', user);
  window.location.href = '/index.html';
});

document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Registration simulated.');
  window.location.href = '/login.html';
});
