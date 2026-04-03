export const getDefaultOptions = (
  method: string = 'GET',
  body?: object,
): RequestInit => ({
  method,
  credentials: 'include', // envoie le cookie automatiquement
  headers: { 'Content-Type': 'application/json' },
  ...(body && { body: JSON.stringify(body) }),
});
