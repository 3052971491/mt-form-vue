import { buildUUID } from "/@/utils/common";
import {
  formConfigTyping,
  dataSourcesConfigTyping,
} from "/@/types/form-design/form/form-config-typing";
import { Layout } from '/@/enums/form-design/form-enum'
import { ElementSizeEnum } from '/@/enums/form-design/size-enum'
import { Position } from '/@/enums/form-design/element-enum'
/**
 * 默认表单配置
 */
export const defaultFormConfig: formConfigTyping = {
  formId: buildUUID(),
  // name: null,
  size: ElementSizeEnum.DEFAULT,
  hideRequiredMark: false,
  labelAlign: Position.LEFT,
  labelWidth: null,
  layout: Layout.HORIZONTAL,
  customStyles: [],
  dataSources: [],
  DSV: "{ test: 'test' } ",
  GSV: "{ test: 'test' } ",
  GCSS: '',
  GFUNC: '',
  onCreated: "",
  onMounted: "",
  onChange: "",
};

/**
 * 默认数据源配置
 */
export const defaultDataSourcesConfig: dataSourcesConfigTyping = {
  dataSourceId: buildUUID(),
  uniqueName: null,
  requestURL: null,
  requestURLType: "String",
  requestMethod: "get",
  description: null,
  headers: [],
  params: [],
  data: [],
  configHandlerCode: "return config",
  dataHandlerCode: "return result.data.data;",
  errorHandlerCode: "return error.message;",
};
