import type { RouteMeta as IRouteMeta } from '@vben-core/typings';
import type { FormRules } from 'element-plus';

interface SysMenu {
  Id: string;
  Name: string;
  Code: string;
  OrderIndex: number;
  CreateTime: string;
  Remark: string;
  PId: string;
  RoutName?: string;
  Path?: string;
  redirect?: '';
  Icon?: string;
  HasChildren: boolean;
  children?: SysMenu[];
  meta?: IRouteMeta;
}

function useDefaultSysMenu(): SysMenu {
  return {
    Code: '',
    CreateTime: '',
    HasChildren: false,
    Id: '',
    Name: '',
    OrderIndex: 0,
    PId: '',
    Remark: '',
  };
}

const sysMenuRules: FormRules<SysMenu> = {
  Code: [
    {
      message: '请输入模块编号',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  Name: [
    {
      message: '请输入模块名',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  OrderIndex: [
    {
      message: '请输入序号',
      required: true,
      trigger: 'blur',
      type: 'number',
    },
  ],
  PId: [
    {
      message: '请选择父级模块',
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
export { type SysMenu, sysMenuRules, useDefaultSysMenu };
