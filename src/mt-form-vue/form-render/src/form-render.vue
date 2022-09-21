<template>
  <a-form ref="formRenderRef" autocomplete="off" :class="[formJson.formConfig.customStyles]" v-bind="{
    layout: formJson.formConfig.layout,
    'label-align': formJson.formConfig.labelAlign,
    'hide-required-mark': formJson.formConfig.hideRequiredMark,
    'label-col': {
      style: {
        width: formJson.formConfig.labelWidth && formJson.formConfig.labelWidth > 0 ? formJson.formConfig.labelWidth + 'px' : 'auto',
      },
    },
  }" :model="global.globalData">
    <template v-for="(element, index) in formJson.elementList" :key="index">
      <component :is="getElementName(element.type, element.category)" :central="null" :element="element"
        :config="formJson.formConfig" :parent-list="formJson.elementList" :index-of-parent-list="index"
        :parent-element="null" :redactState="false" />
    </template>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import elementComponents from "../../form-design/src/form-area/element";
import { insertGlobalCssToHead } from "/@/mt-form-vue/form-design/src/event/css-event"
import { insertGlobalFunctionsToHtml } from "/@/mt-form-vue/form-design/src/event/function-event"
export default defineComponent({
  components: { ...elementComponents }
})
</script>
<script lang="ts" setup>
import {
  onMounted,
  provide,
  reactive,
  toRefs,
  getCurrentInstance
} from "vue";
import useRenderApi from "./hooks/useRenderApi";
import useExposeRenderApi from "./hooks/useExposeRenderApi";
const props = defineProps({
  formJson: {
    type: Object,
    required: true,
    default: () => { },
  },
  formData: {
    type: Object,
    required: true,
    default: () => { },
  },
  DSV: {
    type: Object,
    default: () => { },
  },
})
const { formData, formJson, DSV } = toRefs(props);
let global = reactive({
  globalData: formData.value,
  refList: {} as any,
});
const formRenderRef = ref();
/**
 * 向子组件暴露相关信息
 */
provide("globalData", global.globalData);
provide("refList", global.refList);
const _this: any = getCurrentInstance()
const {
  getElementName,
  handleFormChange,
  buildFormOnCreated,
  buildFormOnMounted,
} = useRenderApi(formRenderRef, _this, global, formJson.value, DSV.value);
const {
  getGolbalCss,
  getGolbalFunction,
} =useExposeRenderApi(formRenderRef, global, formJson.value, DSV.value)

buildFormOnCreated();
handleFormChange();

insertGlobalCssToHead(getGolbalCss.value);
insertGlobalFunctionsToHtml(getGolbalFunction.value);

onMounted(() => {
  buildFormOnMounted();
});

defineExpose({
  ...useExposeRenderApi(formRenderRef, global, formJson.value, DSV.value)
})

</script>
