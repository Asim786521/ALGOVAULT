import { Role } from "src/common/constants/roles.constant";

export interface JwtPayload {
  sub: string;  // This is typically the user ID or a unique identifier
  email: string;
  role: Role;  // The role of the user (e.g., 'USER', 'ADMIN')
  iat: number;   // Issued at (optional)
  exp: number;   // Expiration (optional)
}