export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  role?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
