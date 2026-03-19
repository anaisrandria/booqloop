const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }
  return token;
};

export const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
