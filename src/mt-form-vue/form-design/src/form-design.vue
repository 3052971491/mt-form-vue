<template>
  <a-config-provider :lang="getLocale()">
    <a-layout class="form-design-layout">
      <Aside :central="central" :form-config="central.data.formConfig"></Aside>
      <a-layout style="min-width: 680px; margin-left: 70px;">
        <a-layout-content>
          <toolbar-area class="toolbar-area-container" :central="central" />
          <form-area class="form-area-container" :central="central" />
        </a-layout-content>
      </a-layout>

      <a-layout-sider width="300" class="setting-area-container">
        <a-tabs v-model:activeKey="settingActiveKey" centered destroyInactiveTabPane>
          <a-tab-pane v-for="item in settingAreaList" :key="item.value">
            <template #tab>
              <span>{{ t(item.label) }}</span>
            </template>
            <setting-area :central="central" :type="currentSettingComponent" :form-config="central.data.formConfig"
              class="setting-area-content" />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { reactive, ref, provide, computed } from "vue";
import ToolbarArea from "./toolbar-area/index.vue";
import FormArea from "./form-area/index.vue";
import SettingArea from "./setting-area/index.vue";
import Aside from "./action-area/index.vue";
import { createFormcentral } from "./central";
import { t, getLocale } from "/@/utils/i18n";
import DatasourceSetting from "./setting-area/datasource-setting.vue";
import ElementSetting from "./setting-area/element-setting.vue";
import FormSetting from "./setting-area/form-setting.vue";
import { FormDesignElementTyping } from "/@/types/form-design/index-typing";
import mittEvent from "/@/utils/mitt/mitt";
import { getGolbalCssList } from "/@/mt-form-vue/form-design/src/event/css-event"
import { getGlobalFunctions } from "/@/mt-form-vue/form-design/src/event/function-event"
/** 表单核心 */
const central = createFormcentral();
central.buildCentral();
central.buildHistoryData();
/** 当前setting-area区域显示组件 */
let settingActiveKey = ref("element-setting");
/**  当前setting-area区域组件列表 */
const settingAreaList = [
  { label: 'componentSetting', value: "element-setting", component: ElementSetting },
  { label: "formSetting", value: "form-setting", component: FormSetting },
  { label: "dataSourcesSetting", value: "datasource-setting", component: DatasourceSetting },
];
const currentSettingComponent: any = computed(() => {
  const idx = settingAreaList.findIndex((item) => {
    return item.value == settingActiveKey.value
  })
  if (idx != -1) {
    return settingAreaList[idx].component
  }
  return '';
})
/** 表单数据 */
let global = reactive({
  globalData: {} as any,
  refList: {} as any,
});
provide("globalData", global.globalData);
provide("refList", global.refList);

/**
 * 开启全局CSS监听
 */
function mittGolbalCss() {
  mittEvent.off("mitt-golbal-css");
  mittEvent.on("mitt-golbal-css", (info: any) => {
    central.setCssClassList(info)
  });
  // 初始化
  mittEvent.emit("mitt-golbal-css", getGolbalCssList(central.data.formConfig?.GCSS ?? ''));
}
mittGolbalCss();
/**
 * 开启全局方法监听
 */
 function mittGolbalFunction() {
  mittEvent.off("mitt-golbal-function");
  mittEvent.on("mitt-golbal-function", (info: any) => {
    central.setFunctionList(info)
  });
  // 初始化
  mittEvent.emit("mitt-golbal-function", getGlobalFunctions(central.data.formConfig?.GFUNC ?? ''));
}
mittGolbalFunction();
/**********外部调用API 开始*************************************************************************************************************************************************************** */

const exposeObj = {
  elementList: central.data.elementList,
  formConfig: central.data.formConfig,
  DSV: central.data.formConfig.DSV,
  global,
  getFromJson,
  getElementRef,
  fieldNameValidate,
}
defineExpose(exposeObj)

/** 获取表单JSON */
function getFromJson() {
  return central.getStoredData();
}

/** 获取组件实例 */
function getElementRef(elementId: any) {
  if (global.refList.hasOwnProperty(elementId)) {
    return global.refList[elementId]
  }
  return null;
}

/** 校验字段是否为空 */
function fieldNameValidate() {
  return new Promise((resolve, reject) => {
    const loop = (list: Array<FormDesignElementTyping>) => {
      list.map((item) => {
        if (!!item.category && item.category == 'container') {
          if (item.internal) {
            loop(item?.children ?? [])
          } else {
            loop(item?.list ?? [])
          }
        } else {
          /** 跳过校验的组件列表 */
          const arr: Array<string> = [];
          if (!arr.includes(item.type) && !item.options.__fieldName__) {
            reject(`请选择${item.options.label}的字段名`);
          } else {
            return
          }
        }
      })
    };
    loop(getFromJson()?.elementList ?? []);
    resolve(getFromJson())
  })
}

/**********外部调用API 结束*************************************************************************************************************************************************************** */
</script>

<style lang="less" scoped>
@import "./styles/index.less";

:deep(.ant-tabs-centered) {
  display: flex;
  flex-direction: column;
  height: 100%;

  .ant-tabs-content-holder {
    overflow: auto;
    flex: 1;
  }
}
</style>
