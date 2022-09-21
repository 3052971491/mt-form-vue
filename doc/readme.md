# 如何二次开发引入mt-form-vue

main.ts

引入mt-form-vue组件
import MtForm from '/@/test/lib/mt-form-vue.es';
引入mt-form-vue样式
import '/@/test/lib/style.css';

接口代理类
import { implementsProxy } from '/@/test/implements';
implementsProxy();


代理类型实现
import {HttpProxyFactory} from './lib/mt-form-vue.es';
import apiHttpClient from '/@/shared/utils/api-http-client';
import { AppConsts } from '/@/abpPro/AppConsts';
export const implementsProxy = () => {
  HttpProxyFactory.prototype.getRemoteServiceBaseUrl = function () {
    return AppConsts.remoteServiceBaseUrl;
  };
  HttpProxyFactory.prototype.getApiClient = function () {
    return apiHttpClient;
  };
};