export type User = {
  id: number;
  username: string;
};

export const getUserById = async (userId: number): Promise<User | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
