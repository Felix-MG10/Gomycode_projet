function handleSignup(e) {
  e.preventDefault();
  
  // Get form values
  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;
  
  // Validate inputs
  if (!fullname || !email || !password || !confirmPassword) {
      alert('Veuillez remplir tous les champs');
      return;
  }
  
  if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
  }
  
  if (!terms) {
      alert('Veuillez accepter les conditions d\'utilisation');
      return;
  }
  
  // Create user object
  const user = {
      fullname,
      email,
      password
  };
  
  // Get existing users or initialize empty array
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
      alert('Cette adresse email est déjà utilisée');
      return;
  }
  
  // Add new user
  users.push(user);
  
  // Save to localStorage
  localStorage.setItem('users', JSON.stringify(users));
  
  alert('Inscription réussie!');
  window.location.href = 'login.html';
}

function handleLogin(e) {
  e.preventDefault();
  
  // Get form values
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Find user with matching email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
      // Successful login
      window.location.href = 'index.html';
  } else {
      // Check if email exists to give appropriate message
      const emailExists = users.some(u => u.email === email);
      if (emailExists) {
          alert('Mot de passe incorrect');
      } else {
          alert('Utilisateur non trouvé. Veuillez vous inscrire.');
          window.location.href = 'signup.html';
      }
  }
}