import {
  dataSourcesDataConfig,
  dataSourcesConfigTyping,
} from "/@/types/form-design/form/form-config-typing";
import { cloneDeep } from "lodash-es";
import { message } from 'ant-design-vue';

import axios from "axios";
import { httpFactory } from '/@/implements/service-proxies';
export function assembleAxiosConfig(arr: dataSourcesDataConfig[], DSV: string, GSV: string) {
  let result: any = {};
  if (!arr || arr.length <= 0) {
    return result;
  }
  arr.map((item: dataSourcesDataConfig) => {
    if (item.type === "String") {
      result[item.label] = String(item.value);
    } else if (item.type === "Number") {
      result[item.label] = Number(item.value);
    } else if (item.type === "Boolean") {
      if (item.value.toLowerCase() === "false" || item.value === "0") {
        result[item.label] = false;
      } else if (item.value.toLowerCase() === "true" || item.value === "1") {
        result[item.label] = true;
      } else {
        result[item.label] = null;
      }
    } else if (item.type === "Variable") {
      // 处理打包时DSV丢失
      if(!!DSV) {
        DSV = eval("(" + DSV + ")")
      }
      if(!!GSV) {
        GSV= eval("(" + GSV + ")")
      }
      result[item.label] = eval(item.value);
    }
  });

  return result;
}

function buildRequestConfig(dataSource: dataSourcesConfigTyping, DSV: string, GSV: string) {
  let config = {
    url: "" as any,
    method: "get", // default
    baseURL: httpFactory.getRemoteServiceBaseUrl(),
    // baseURL: 'http://baidu.com/',
    headers: {},
    params: {},
    data: {},
  };
  if (dataSource.requestURLType === "String") {
    config.url = dataSource.requestURL;
  } else {
    config.url = eval(dataSource.requestURL as any);
  }
  config.method = dataSource.requestMethod;
  //   config.baseURL = "";
  config.headers = assembleAxiosConfig(dataSource.headers, DSV, GSV);
  config.params = assembleAxiosConfig(dataSource.params, DSV, GSV);
  config.data = assembleAxiosConfig(dataSource.data, DSV, GSV);
  let fn = new Function("config", "DSV", "GSV", dataSource.configHandlerCode);
  const result = fn.call(null, config, DSV, GSV);
  return result;
}

export async function http(dataSource: dataSourcesConfigTyping, DSV: string, GSV: string) {
  return new Promise((resolve, reject) => {
    let requestConfig = buildRequestConfig(cloneDeep(dataSource), DSV, GSV);
    httpFactory.getApiClient().request(requestConfig).then((res: any) => {
      let fn = new Function("result", "DSV", dataSource.dataHandlerCode);
      const result = fn.call(null, res, DSV);
      resolve(result);
    }).catch((err: any) => {
      let fn = new Function("error", "DSV", dataSource.errorHandlerCode);
      const error = fn.call(null, err, DSV);
      message.error(error)
      reject(error);
    });
    // axios.request(requestConfig).then((res: any) => {
    //   let fn = new Function("result", "DSV", dataSource.dataHandlerCode);
    //   const result = fn.call(null, res, DSV);
    //   resolve(result);
    // }).catch((err: any) => {
    //   let fn = new Function("error", "DSV", dataSource.errorHandlerCode);
    //   const error = fn.call(null, err, DSV);
    //   message.error(error)
    //   reject(error);
    // });
  });
}

export function getDataSourceByApi(api: string | number | null, dataSources: Array<dataSourcesConfigTyping>) {
  if (!api) return null;
  let obj = dataSources.find((item) => {
    return item.dataSourceId === api
  })
  return !!obj ? obj : null
}
