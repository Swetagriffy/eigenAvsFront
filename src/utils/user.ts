import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://eigen-avs-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

export interface User {
  user_id?: number;
  public_address: string;
  private_address: string;
  ethereum_address: string;
}

export const createUser = async (user: User) => {
  const response = await apiClient.post('/users', user);
  return response.data;
};
