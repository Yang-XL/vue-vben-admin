import type { FormRules } from 'element-plus';

interface SysMenu {
  id: string;
  name: string;
  title: string;
  orderIndex: number;
  remark: string;
  parentId: string;
  path: string;
  component: string;
  icon?: string;
  keepAlive: boolean;
  link: string;
  affixTab: boolean;
}

const sysMenuRules: FormRules<SysMenu> = {
  component: [
    {
      message: '请输入vue路径地址',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  name: [
    {
      message: '请输入模块名',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  orderIndex: [
    {
      message: '请输入序号',
      required: true,
      trigger: 'blur',
      type: 'number',
    },
  ],
  parentId: [
    {
      message: '请选择父级模块',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
  remark: [
    {
      message: '请输入备注',
      required: true,
      trigger: 'change',
      type: 'string',
    },
  ],
};
export { type SysMenu, sysMenuRules };
