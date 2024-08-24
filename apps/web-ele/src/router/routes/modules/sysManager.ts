import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:settings-2',
      order: -1,
      title: $t('page.sysManager.title'),
    },
    name: $t('page.sysManager.title'),
    path: '',
    children: [
      {
        name: $t('page.sysManager.menu'),
        path: '/sysManager',
        component: () => import('#/views/sysManager/menu.vue'),
        meta: {
          icon: 'lucide:menu',
          title: $t('page.sysManager.menu'),
        },
      },
    ],
  },
];

export default routes;
