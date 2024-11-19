/**
 * 该文件可自行根据业务逻辑进行调整
 */
import type { HttpPageResponse, HttpResponse } from '@vben/request';

import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import { RequestClient } from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { ElMessage } from 'element-plus';

import { useAuthStore } from '#/store';

export * from './baseType';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    baseURL,
    // 为每个请求携带 Authorization
    makeAuthorization: () => {
      return {
        // 默认
        key: 'Authorization',
        tokenHandler: () => {
          const accessStore = useAccessStore();
          return {
            refreshToken: `${accessStore.refreshToken}`,
            token: `${accessStore.accessToken}`,
          };
        },
        unAuthorizedHandler: async () => {
          await unAuthorized();
        },
      };
    },
    makeErrorMessage: (msg) => ElMessage.error(msg),

    makeRequestHeaders: () => {
      return {
        // 为每个请求携带 Accept-Language
        'Accept-Language': preferences.app.locale,
      };
    },
  });

  return client;
}

function userPageResponse(client: RequestClient) {
  client.addResponseInterceptor<HttpPageResponse>(async (response) => {
    const { data: responseData, status } = response;

    const { code, data, msg, state } = responseData;

    if (status >= 200 && status < 400 && code.toString() === '200' && state) {
      return data;
    }
    if (code.toString() === '401') {
      await unAuthorized();
    }
    if (data.msg !== '') {
      throw new Error(data.msg);
    }
    throw new Error(`Error ${status}: ${msg}`);
  });
  return client;
}

function userResponse(client: RequestClient) {
  client.addResponseInterceptor<HttpResponse>(async (response) => {
    const { data: responseData, status } = response;

    const { code, data, msg, state } = responseData;

    if (status >= 200 && status < 400 && code.toString() === '200' && state) {
      return data;
    }
    if (code.toString() === '401') {
      await unAuthorized();
    }
    if (data.msg !== '') {
      throw new Error(data.msg);
    }

    throw new Error(`Error ${status}: ${msg}`);
  });
  return client;
}

async function unAuthorized() {
  const accessStore = useAccessStore();
  const authStore = useAuthStore();
  accessStore.setAccessToken(null);

  if (preferences.app.loginExpiredMode === 'modal') {
    accessStore.setLoginExpired(true);
  } else {
    // 退出登录
    await authStore.logout();
  }
}

export const requestClient = userResponse(createRequestClient(apiURL));
export const requestPageClient = userPageResponse(createRequestClient(apiURL));
