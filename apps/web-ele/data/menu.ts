interface SysMenu {
  Icon?: string;
  Name: string;
  Order?: number;
  Code: string;
  CreateTime: string;
  HasChildren?: boolean;
  Id: string;
  PId: string;
  Remark: string;
  children?: SysMenu[];
}

export const FirstLevelMenuData: SysMenu[] = [
  {
    Code: 'sys',
    CreateTime: '2016-05-01 12:25:00',
    HasChildren: true,
    Id: 'F3FBFE37-F445-431F-8649-50732AB7A3F1',
    Name: '系统管理',
    PId: '00000000-0000-0000-0000-000000000000',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'user',
    CreateTime: '2016-05-01 12:25:00',
    HasChildren: false,
    Id: 'F3FBFE37-F445-431F-8649-50732AB7A3F2',
    Name: '用户管理',
    PId: '00000000-0000-0000-0000-000000000000',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'role',
    CreateTime: '2016-05-01 12:25:00',
    HasChildren: false,
    Id: 'F3FBFE37-F445-431F-8649-50732AB7A3F3',
    Name: '角色权限',
    PId: '00000000-0000-0000-0000-000000000000',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
];
export const SecondLevelMenuData: SysMenu[] = [
  {
    Code: 'sys_menu',
    CreateTime: '2016-05-01 12:25:00',
    Id: 'F3FBFE37-F445-431F-1000-50732AB7A3F1',
    Name: '菜单管理',
    PId: 'F3FBFE37-F445-431F-8649-50732AB7A3F1',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'sys_setting',
    CreateTime: '2016-05-01 12:25:00',
    Id: 'F3FBFE37-F445-431F-1002-50732AB7A3F1',
    Name: '系统配置',
    PId: 'F3FBFE37-F445-431F-8649-50732AB7A3F1',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'sys_logs',
    CreateTime: '2016-05-01 12:25:00',
    Id: 'F3FBFE37-F445-431F-1003-50732AB7A3F1',
    Name: '系统日志',
    PId: 'F3FBFE37-F445-431F-8649-50732AB7A3F1',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'user_company',
    CreateTime: '2016-05-01 12:25:00',
    Id: 'F3FBFE37-F445-431F-2000-50732AB7A3F2',
    Name: '公司管理',
    PId: 'F3FBFE37-F445-431F-8649-50732AB7A3F2',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
  {
    Code: 'user_user',
    CreateTime: '2016-05-01 12:25:00',
    Id: 'F3FBFE37-F445-431F-2001-50732AB7A3F2',
    Name: '用户管理',
    PId: 'F3FBFE37-F445-431F-8649-50732AB7A3F2',
    Remark: 'No. 189, Grove St, Los Angeles',
  },
];
