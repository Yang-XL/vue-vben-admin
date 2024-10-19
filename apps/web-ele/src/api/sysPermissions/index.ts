import type { SysPermissions } from '#/types';

import { requestClient } from '#/api/request';

/**
 * 获取所有菜单
 */
export async function getPermissionsPageList(): Promise<SysPermissions[]> {
  return await requestClient.get<SysPermissions[]>('/menu/getParentPageList');
}
