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

export const loginUser = async(credentials: { email: string; password: string }) => {
  const request = await fetch(`${URL}/auth/login`, 
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

const result = await request.json();

return result;
}

export const createBooking = async (data: any, token: string) => {
  const response = await fetch(`${URL}/access/reserve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}