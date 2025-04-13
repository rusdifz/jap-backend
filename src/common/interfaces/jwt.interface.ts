export interface IJwtUser {
  iat: number;
  user: {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    created_at: Date | string;
  };
}
