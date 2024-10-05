const URL = 'http://localhost:3000'

export const registerUser = async (credentials: { email: string; password: string }) => {
  const request = await fetch(`${URL}/auth/register`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
  );

  const result = await request.json();
  return result;
}