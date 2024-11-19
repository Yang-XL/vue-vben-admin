import type { ComponentSize } from 'element-plus';

interface PageInfo {
  PageSize: number;
  total: number;
  currentPage: number;
  SizeStype: ComponentSize;
  Background: boolean;
  Disabled: boolean;
  Size: number[];
  PageDiplayCount: number;
}

function useDefaultPage(): PageInfo {
  return {
    Background: true,
    currentPage: 1,
    Disabled: false,
    PageDiplayCount: 10,
    PageSize: 30,
    Size: [30, 50, 100, 150],
    SizeStype: 'default',
    total: 0,
  };
}

export { type PageInfo, useDefaultPage };
