export interface IJwtUser {
  iat: number;
  user: {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    created_at: Date | string;
  };
}
