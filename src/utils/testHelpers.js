// Quick login test helpers
// Dùng để test nhanh các role khác nhau

export const testAccounts = {
  admin: {
    role: 'admin',
    name: 'Admin User',
    email: 'admin@example.com',
    dashboardUrl: '/dashboard'
  },
  hr: {
    role: 'hr',
    name: 'HR Manager',
    email: 'hr@example.com',
    dashboardUrl: '/dashboard'
  },
  interviewer: {
    role: 'interviewer',
    name: 'Interviewer',
    email: 'interviewer@example.com',
    dashboardUrl: '/dashboard'
  },
  candidate: {
    role: 'candidate',
    name: 'Candidate User',
    email: 'candidate@example.com',
    dashboardUrl: '/dashboard'
  }
};

export const quickLoginAsRole = (role) => {
  const account = testAccounts[role] || testAccounts.candidate;
  
  localStorage.setItem('user', JSON.stringify({
    id: 1,
    name: account.name,
    email: account.email,
    role: account.role
  }));
  
  localStorage.setItem('userRole', account.role);
  
  // Reload app to reflect changes
  window.location.href = account.dashboardUrl;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userRole');
  window.location.href = '/';
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getCurrentRole = () => {
  return localStorage.getItem('userRole') || 'candidate';
};
