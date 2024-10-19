import type { ComponentSize } from 'element-plus';

interface PageInfo {
  PageSize: number;
  CurrentPage: number;
  SizeStype: ComponentSize;
  Background: boolean;
  Disabled: boolean;
  Size: number[];
}

function useDefaultPage(): PageInfo {
  return {
    Background: true,
    CurrentPage: 1,
    Disabled: false,
    PageSize: 30,
    Size: [30, 50, 100, 150],
    SizeStype: 'default',
  };
}

export { type PageInfo, useDefaultPage };
