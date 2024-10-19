import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:settings-2',
      order: -1,
      title: $t('page.sysUserPermissions.title'),
    },
    name: $t('page.sysUserPermissions.title'),
    path: '/sysUser',
    children: [
      {
        name: $t('page.sysUserPermissions.user'),
        path: '/sysUser',
        component: () => import('#/views/sysUser/user.vue'),
        meta: {
          icon: 'lucide:menu',
          title: $t('page.sysUserPermissions.user'),
        },
      },
      {
        name: $t('page.sysUserPermissions.company'),
        path: '/company',
        component: () => import('#/views/sysUser/user.vue'),
        meta: {
          icon: 'lucide:menu',
          title: $t('page.sysUserPermissions.company'),
        },
      },
      {
        name: $t('page.sysUserPermissions.role'),
        path: '/role',
        component: () => import('#/views/sysUser/user.vue'),
        meta: {
          icon: 'lucide:menu',
          title: $t('page.sysUserPermissions.role'),
        },
      },
      {
        name: $t('page.sysUserPermissions.permissions'),
        path: '/permissions',
        component: () => import('#/views/sysPermissions/index.vue'),
        meta: {
          icon: 'lucide:menu',
          title: $t('page.sysUserPermissions.permissions'),
        },
      },
    ],
  },
];

export default routes;
