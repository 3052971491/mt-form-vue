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
     * ??????
     */
    const { central } = toRefs(props);
    /**
     * ??????????????????
     */
    const element = computed(() => {
      if (!central.value.data.selectedId) return null;
      return central.value.data.selectedElement;
    });
    /**
     * ????????????
     */
    const commonAttributes = COMMON_ATTRIBUTES;
    /**
     * ??????????????????
     */
    const selfAttributes = computed(() => {
      return SELF_ATTRIBUTES.filter((item) => {
        if (!element.value) return;
        return item.type == element.value.type;
      });
    });
    /**
     * ????????????
     */
    const eventAttributes = EVENT_ATTRIBUTES;
    /**
     * ????????????????????????????????????
     */
    const hasAttributesEditor = (item: attributesTyping) => {
      if (!element.value) return false;
      if (item.name == "elementId" || item.name == "children") {
        return element.value.hasOwnProperty(item.name);
      }
      return element.value.options.hasOwnProperty(item.name);
    };
    /**
     * ????????????
     * ??????????????????????????????
     */
    const getCommonAttributesEditor = (item: attributesTyping) => {
      return item.editor;
    };
    /**
     * ????????????
     * ??????????????????????????????
     */
    const getSelfAttributesEditor = (item: attributesTyping) => {
      return item.editor;
    };
    /**
     * ????????????
     * ??????????????????????????????
     */
    const getEventAttributesEditor = (item: attributesTyping) => {
      return item.editor;
    };
    /**
     * ????????????
     */
    const activeKey = ref(["1", "2", "3"]);
    /**
     * ????????????mt-empty
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
