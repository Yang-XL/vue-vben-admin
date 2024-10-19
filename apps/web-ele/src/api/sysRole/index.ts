import type { SysRole } from '#/types';

import { requestClient } from '#/api/request';

/**
 * 获取所有菜单
 */
export async function getRolePageList(): Promise<SysRole[]> {
  return await requestClient.get<SysRole[]>('/menu/getParentPageList');
}
