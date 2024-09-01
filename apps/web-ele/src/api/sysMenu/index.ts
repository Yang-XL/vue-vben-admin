import type { SysMenu } from '#/types';

import { requestClient } from '#/api/request';

/**
 * 获取所有菜单
 */
export async function getParentPageList(): Promise<SysMenu[]> {
  return await requestClient.get<SysMenu[]>('/menu/getParentPageList');
}

/**
 * 获取所有菜单
 */
export async function getChildPageList(pid: string): Promise<SysMenu[]> {
  return await requestClient.get<SysMenu[]>(
    `/menu/getChildPageList?pid=${pid}`,
  );
}
