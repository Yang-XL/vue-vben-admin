import type { SysRole } from './role';

interface UserRole {
  Id: string;
  LoginName: string;
  Password: string;
  RealName: string;
  Roles: SysRole[];
}

export { type UserRole };
