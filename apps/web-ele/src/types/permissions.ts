import type { FormRules } from 'element-plus';

interface SysPermissions {
  Id: string;
  Name: string;
  Code: string;
  Remark: string;
  IsAction: boolean;
  ServerUri?: string;
  LastModifier?: string;
  LastModificationTime?: string;
  Creator: string;
  CreateTime: string;
}

interface SysPermissionsQuery {
  NameOrCode?: string;
}

function useDefaultSysPermissions(): SysPermissions {
  return {
    Code: '',
    CreateTime: '',
    Creator: '',
    Id: '',
    IsAction: false,
    LastModificationTime: '',
    LastModifier: '',
    Name: '',
    Remark: '',
  };
}

const sysPermissionsRules: FormRules<SysPermissions> = {
  Code: [
    {
      message: '请输入权限编号',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  Name: [
    {
      message: '请输入权限名',
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
export {
  type SysPermissions,
  type SysPermissionsQuery,
  sysPermissionsRules,
  useDefaultSysPermissions,
};
