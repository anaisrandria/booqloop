export default async function Home() {
  const name = 'Rachel'
  const user = await fetchUser(name);

  return (
    <>
      <div>{`${user.username} lives at ${user.address}, ${user.postal_code} ${user.country}.`}</div>
    </>
  );
}

async function fetchUser(username: string) {
 
  const baseUrl = 'http://127.0.0.1:8000';

  try {
    const response = await fetch(
      `${baseUrl}/get-user/${username}`
    );
    if (!response.ok) {
      console.log('⛔️ Response:', response) // TO DO: get error code 
      throw new Error("Failed to fetch data");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// TO DO: if 404, user not found