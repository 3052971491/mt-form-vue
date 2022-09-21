<template>
  <a-form layout="vertical" :scrollToFirstError="true" autocomplete="off">
    <a-collapse v-model:activeKey="activeKey" forceRender>
      <a-collapse-panel key="1" :header="t('basicAttributes')">
        <template v-for="(item, index) in commonAttributes">
          <component v-if="hasAttributesEditor(item)" :is="getCommonAttributesEditor(item)" :central="central"
            v-model:element="element" :key="index" />
        </template>
        <mt-empty v-if="hasShowEmpty(commonAttributes)" />
      </a-collapse-panel>
      <a-collapse-panel key="2" :header="t('advancedProperties')">
        <template v-for="(item, index) in selfAttributes">
          <component v-if="hasAttributesEditor(item)" :is="getSelfAttributesEditor(item)" :central="central"
            v-model:element="element" :key="index" />
        </template>
        <mt-empty v-if="hasShowEmpty(selfAttributes)" />
      </a-collapse-panel>
      <a-collapse-panel key="3" :header="t('eventAttributes')">
        <template v-for="(item, index) in eventAttributes">
          <component v-if="hasAttributesEditor(item)" :is="getEventAttributesEditor(item)" :central="central"
            v-model:element="element" :key="index" />
        </template>
        <mt-empty v-if="hasShowEmpty(eventAttributes)" />
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, ref } from "vue";
import { attributesTyping } from '/@/types/attributes-typing';

import {
  COMMON_ATTRIBUTES,
  SELF_ATTRIBUTES,
} from "./attributes/element-attributes-config";
import { EVENT_ATTRIBUTES } from "./attributes/event-attributes-config";
import { elementEditors, eventEditors } from "./attributes-editors/index";
import MtEmpty from "/@/components/mt-empty.vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "FormSetting",
  components: { ...elementEditors, ...eventEditors, MtEmpty },
  props: {
    central: {
      type: Object,
      required: true,
    },
    formConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:element"],
  setup(props) {
    /**
     * 核心
     */
    const { central } = toRefs(props);
    /**
     * 当前选中组件
     */
    const element = computed(() => {
      if (!central.value.data.selectedId) return null;
      return central.value.data.selectedElement;
    });
    /**
     * 公共属性
     */
    const commonAttributes = COMMON_ATTRIBUTES;
    /**
     * 过滤高级属性
     */
    const selfAttributes = computed(() => {
      return SELF_ATTRIBUTES.filter((item) => {
        if (!element.value) return;
        return item.type == element.value.type;
      });
    });
    /**
     * 事件属性
     */
    const eventAttributes = EVENT_ATTRIBUTES;
    /**
     * 判断是否显示该属性编辑器
     */
    const hasAttributesEditor = (item: attributesTyping) => {
      if (!element.value) return false;
      if (item.name == "elementId" || item.name == "children") {
        return element.value.hasOwnProperty(item.name);
      }
      return element.value.options.hasOwnProperty(item.name);
    };
    /**
     * 公共属性
     * 获取该属性编辑器名称
     */
    const getCommonAttributesEditor = (item: attributesTyping) => {
      return item.editor;
    };
    /**
     * 高级属性
     * 获取该属性编辑器名称
     */
    const getSelfAttributesEditor = (item: attributesTyping) => {
      return item.editor;
    };
    /**
     * 事件属性
     * 获取该属性编辑器名称
     */
    const getEventAttributesEditor = (item: attributesTyping) => {
      return item.editor;
    };
    /**
     * 折叠面板
     */
    const activeKey = ref(["1", "2", "3"]);
    /**
     * 是否显示mt-empty
     */
    const hasShowEmpty = computed(() => (list: Array<attributesTyping>) => {
      if (!element.value) return true;
      const idx = list.findIndex((item) => {
        return element.value.options.hasOwnProperty(item.name)
      })
      return idx == -1;
    });
    return {
      t,
      commonAttributes,
      selfAttributes,
      eventAttributes,
      hasAttributesEditor,
      getCommonAttributesEditor,
      getSelfAttributesEditor,
      getEventAttributesEditor,
      activeKey,
      element,
      hasShowEmpty,
    };
  },
});
</script>

<style lang="less" scoped>
</style>
