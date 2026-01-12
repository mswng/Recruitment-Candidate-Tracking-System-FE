// Simulate login/logout
export const loginUser = (role = 'candidate') => {
  localStorage.setItem('user', JSON.stringify({
    id: 1,
    name: 'User',
    email: 'user@example.com',
    role: role
  }));
  localStorage.setItem('userRole', role);
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userRole');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('user');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'candidate';
};
