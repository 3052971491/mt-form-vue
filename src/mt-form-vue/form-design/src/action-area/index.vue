<template>
  <ul class="action-menu">
    <div>
      <li class="logo">
        <div class="aside-list-item">
          <img alt="" src="/@/assets/logo.png" />
        </div>
      </li>
      <div class="action-area-container">
        <li :key="item.value" v-for="item in elementAreaList">
        <span class="aside-list-item" :class="{ active: menuLabel === item.label }"
          @click="navComponent(item.component, item.label)">
          <appstore-outlined :style="{fontSize: '20px',}" v-if="item.label == 'componentLib'" />
          <star-outlined :style="{fontSize: '20px',}" v-else-if="item.label == 'templateLib'" />
          <block-outlined :style="{fontSize: '20px',}" v-else-if="item.label == 'modalLib'" />
          <font-size-outlined :style="{fontSize: '20px',}" v-else-if="item.label == 'CSS'" />
          <function-outlined :style="{fontSize: '20px',}" v-else-if="item.label == 'Func'" />
          <global-outlined  :style="{fontSize: '20px',}" v-else-if="item.label == 'GSV'" />
        </span>
      </li>
      </div>
    </div>
  </ul>
  <nav class="slider-menu" :class="openNav">
    <div class="title">{{ t(menuLabel) }}</div>
    <component class="content" :is="component" :central="central" :form-config="formConfig" />
  </nav>
  <event-handler-drawer title="全局CSS" ref="eventCssRef" v-model:value="formConfig.GCSS" :mode="MODE.CSS"
    @success="handleSuccessGcss"></event-handler-drawer>
  <event-handler-drawer title="全局函数" ref="eventFuncRef" v-model:value="formConfig.GFUNC" :mode="MODE.JS"
    @success="handleSuccessGfunc"></event-handler-drawer>
  <event-handler-drawer title="全局变量" ref="eventGsvRef" v-model:value="formConfig.GSV" :mode="MODE.JSON"
    @success="handleSuccessGcss"></event-handler-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ElementLibrary from "../element-area/element-library.vue";
import { t } from "/@/utils/i18n";
import { AppstoreOutlined, StarOutlined, FunctionOutlined, FontSizeOutlined, BlockOutlined, GlobalOutlined } from '@ant-design/icons-vue';
import EventHandlerDrawer from '../components/popup-area/event-handler-drawer.vue';
import { MODE } from "/@/components/codemirror/typing";
import { getGolbalCssList, insertGlobalCssToHead } from "/@/mt-form-vue/form-design/src/event/css-event"
import { getGlobalFunctions, insertGlobalFunctionsToHtml } from "/@/mt-form-vue/form-design/src/event/function-event"
import mittEvent from "/@/utils/mitt/mitt";
const props = defineProps({
  central: {
    type: Object,
    required: true,
  },
  formConfig: Object,
  value: String,
})
const emit = defineEmits(['change', 'update:value']);
const elementAreaList = [
  { label: "componentLib", value: "element-library", component: ElementLibrary },
  // { label: "templateLib", value: "template-library", component: TemplateLibrary },
  // { label: "modalLib", value: "modal-library", component: ModalLibrary },
  { label: "CSS", value: "global-css-library" },
  { label: "Func", value: "global-func-library" },
  { label: "GSV", value: "global-variable-library" },
  // { label: "结构", value: "structure-tree-library", component: StructureTreeLibrary },
];
const component = ref();
let openNav = ref('slider-menu-left');
const menuLabel = ref();
// 全局Css
const eventCssRef = ref();
const eventFuncRef = ref()
const eventGsvRef = ref()
function navComponent(el: object, label: string) {
  emit('change', el)
  if (label == 'CSS') {
    openNav.value = 'slider-menu-left'
    eventCssRef.value.onShow();
    menuLabel.value = ''
    return;
  }
  if (label == 'Func') {
    openNav.value = 'slider-menu-left'
    eventFuncRef.value.onShow();
    menuLabel.value = ''
    return;
  }
  if (label == 'GSV') {
    openNav.value = 'slider-menu-left'
    eventGsvRef.value.onShow();
    menuLabel.value = ''
    return;
  }
  if (menuLabel.value === label) {
    openNav.value = 'slider-menu-left'
  } else {
    openNav.value = 'slider-menu-open'
    component.value = el;
  }
  if (openNav.value == 'slider-menu-open') {
    menuLabel.value = label
  } else {
    menuLabel.value = ''
  }
}
function handleSuccessGcss() {
  mittEvent.emit("mitt-golbal-css", getGolbalCssList(props.formConfig?.GCSS ?? ''));
  insertGlobalCssToHead(props.formConfig?.GCSS ?? '')
}
function handleSuccessGfunc() {
  mittEvent.emit("mitt-golbal-function", getGlobalFunctions(props.formConfig?.GFUNC ?? ''));
  insertGlobalFunctionsToHtml(props.formConfig?.GFUNC ?? '')
}
</script>
<style lang="less" scoped>
@import "../styles/aside.less";
</style>