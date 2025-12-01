// User API service for handling user-related requests

export interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
  balance: number;
  profileImageUrl?: string | null;
}

// Upload profile image for current user
export const uploadProfileImage = async (file: File): Promise<string> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:3001/users/profile-picture', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload profile image');
  }
  const data = await response.json();
  return data.imageUrl;
};

export const getUserProfile = async (): Promise<User> => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('http://localhost:3001/users/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      throw new Error('Authentication expired');
    }
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  return response.json();
};

export const updateUserEmail = async (newEmail: string, currentPassword: string) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('http://localhost:3001/users/email', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newEmail, currentPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update email');
  }

  return response.json();
};

export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('http://localhost:3001/users/password', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update password');
  }

  return response.json();
};

export const updateUserName = async (newName: string, currentPassword: string) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('http://localhost:3001/users/name', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newName, currentPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update name');
  }

  return response.json();
};