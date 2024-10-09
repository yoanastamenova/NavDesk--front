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

export const getUserBookings = async (token: string) => {
  const response = await fetch(`${URL}/access/user_bookings`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`An error has occured: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
};

export const getRoomStatus = async (roomId: string) => {
  const response = await fetch(`${URL}/rooms/${roomId}/current-state`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
};

export const checkIn = async (id: string, token: string) => {
  const response = await fetch(`${URL}/access/check-in/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const checkOut = async (id: string, token: string) => {
  const response = await fetch(`${URL}/access/check-out/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

export const getProfile = async (token: string) => {
  const response = await fetch(`${URL}/users/profile`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`An error has occured: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
};

export const updateProfile = async (token: string, profileData: Record<string, any>): Promise<any> => {
  const response = await fetch(`${URL}/users/profile/update`, { 
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(`An error has occurred: ${response.status} - ${errorResponse.message}`);
  }

  return await response.json();
};