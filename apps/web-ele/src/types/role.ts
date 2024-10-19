import type { FormRules } from 'element-plus';

import type { SysPermissions } from './permissions';

interface SysRole {
  Id: string;
  Name: string;
  Code: string;
  Remark: string;
  LastModifier?: string;
  LastModificationTime?: string;
  Creator: string;
  CreateTime: string;
  Permissions?: SysPermissions[];
}

interface SysRoleQuery {
  NameOrCode?: string;
}

function useDefaultSysRole(): SysRole {
  return {
    Code: '',
    CreateTime: '',
    Creator: '',
    Id: '',
    LastModificationTime: '',
    LastModifier: '',
    Name: '',
    Remark: '',
  };
}

const sysRoleRules: FormRules<SysRole> = {
  Code: [
    {
      message: '请输入角色编号',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  Name: [
    {
      message: '请输入角色名',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],

  Remark: [
    {
      message: '请输入备注',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
};
export { type SysRole, type SysRoleQuery, sysRoleRules, useDefaultSysRole };
