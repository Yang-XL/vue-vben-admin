import type { SysMenu } from '#/types';
import type { PageResponse } from '#/types/PageRecord';

import { requestPageClient } from '#/api/request';
import { defaultUUID } from '#/types';

/**
 * 获取所有菜单
 */
export async function getParentPageList(
  page: number,
  size: number,
  queryStr: string,
): Promise<PageResponse<SysMenu>> {
  return await requestPageClient.get<PageResponse<SysMenu>>(
    `/user-service/Menu/List?NameOrCode=${queryStr}&Size=${size}&Page=${page}&ParentId=${defaultUUID}`,
  );
}

/**
 * 获取所有菜单
 */
export async function getChildPageList(
  pid: string,
): Promise<PageResponse<SysMenu>> {
  return await requestPageClient.get<PageResponse<SysMenu>>(
    `/user-service/Menu/List?Size=${1000}&Page=${1}&ParentId=${pid}`,
  );
}
