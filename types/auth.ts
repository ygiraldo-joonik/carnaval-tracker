export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
}

export function isUser(user: any): user is User {
  return (
    user &&
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}
