import type { FormRules } from 'element-plus';

import type { SysRole } from './role';

interface SysUser {
  Id: string;
  LoginName: string;
  Password: string;
  RealName: string;
  Roles?: SysRole;
}

function useDefaultSysUser(): SysUser {
  return {
    Id: '',
    LoginName: '',
    Password: '',
    RealName: '',
  };
}

const sysUserRules: FormRules<SysUser> = {
  LoginName: [
    {
      message: '请输入登录名',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  Password: [
    {
      message: '请输入密码',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  RealName: [
    {
      message: '请输入真实姓名',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
};
export { type SysUser, sysUserRules, useDefaultSysUser };
