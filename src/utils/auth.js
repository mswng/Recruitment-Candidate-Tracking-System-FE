// Simulate login/logout
export const loginUser = (role = 'candidate') => {
  localStorage.setItem('user', JSON.stringify({
    id: 1,
    name: 'User',
    email: 'user@example.com',
    role: role
  }));
  localStorage.setItem('userRole', role);
  
  // Trigger custom event to notify AppRouter of role change
  window.dispatchEvent(new Event('userRoleChanged'));
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userRole');
  
  // Trigger custom event when user logs out
  window.dispatchEvent(new Event('userRoleChanged'));
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('user');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'candidate';
};
