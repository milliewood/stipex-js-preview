// services/ApiService.ts
import axios from 'axios';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_ORIGINSERVER || '';
    if (!this.baseURL) {
      throw new Error("Base URL is not defined in environment variables");
    }
  }

  private async request(method: string, url: string, data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${url}`,
        data,
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error making ${method} request to ${url}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  }

  // Authentication Endpoints
  login(email: string, password: string) {
    return this.request('POST', '/users/sign_in', { user: { email, password } });
  }

  register(email: string, password: string, passwordConfirmation: string) {
    return this.request('POST', '/users', { user: { email, password, password_confirmation: passwordConfirmation } });
  }

  logout() {
    return this.request('DELETE', '/users/sign_out');
  }

  // Token Endpoints
  revokeToken() {
    return this.request('POST', '/users/tokens/revoke');
  }

  refreshToken() {
    return this.request('POST', '/users/tokens/refresh');
  }

  // Balance Endpoints
  getBalance() {
    return this.request('GET', '/api/v1/balance');
  }

  updateBalance(data: any) {
    return this.request('PATCH', '/api/v1/balance', data);
  }
  
  getUserInfo() {
    return this.request('GET', '/users/tokens/info');
  }
}

export default new ApiService();
