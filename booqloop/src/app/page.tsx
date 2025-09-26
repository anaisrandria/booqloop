export default async function Home() {
  const title = 'Fullstack Developer'
  const role = await fetchEngineerRole(title);

  return (
    <>
      <div>{`The main skill of a ${role.title} is ${role.mainskill}.`}</div>
    </>
  );
}

async function fetchEngineerRole(t: string) {
 
  const baseUrl = "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/py/engineer-roles?title=${t}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const role = await response.json();
    return role;
  } catch (error) {
    console.error("Error fetching engineer role:", error);
    return null;
  }
}