<template>
  <a-form layout="vertical" :scrollToFirstError="true" autocomplete="off">
    <a-collapse v-model:activeKey="activeKey" forceRender>
      <a-collapse-panel key="1" :header="t('basicAttributes')">
        <template v-for="(item, index) in commonAttributes">
          <component
            v-if="hasAttributesEditor(item)"
            :is="getAttributesEditor(item)"
            :central="central"
            v-model:element="options"
            :key="index"
          />
        </template>
      </a-collapse-panel>
      <a-collapse-panel key="2" :header="t('eventAttributes')">
        <template v-for="(item, index) in eventAttributes">
          <component
            v-if="hasAttributesEditor(item)"
            :is="getAttributesEditor(item)"
            :central="central"
            v-model:element="options"
            :key="index"
          />
        </template>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script lang="ts">
  import { defineComponent, toRefs, computed, ref } from 'vue';
  import { attributesTyping } from '/@/types/attributes-typing';
  import { COMMON_ATTRIBUTES } from './attributes/form-attributes-config';
  import { EVENT_ATTRIBUTES } from './attributes/event-attributes-config';
  import { fromEditors, eventEditors, } from './attributes-editors/index';
  import MtEmpty from '/@/components/mt-empty.vue';
  import { t } from "/@/utils/i18n";
  export default defineComponent({
    name: 'FormSetting',
    components: { ...fromEditors, ...eventEditors, MtEmpty },
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
    emits: ['update:element'],
    setup(props, { emit }) {
      const commonAttributes = COMMON_ATTRIBUTES;
      const eventAttributes = EVENT_ATTRIBUTES;
      const { formConfig } = toRefs(props);
      const options = computed({
        get: () => {
          return formConfig.value;
        },
        set: (value: any) => {
          emit('update:element', value);
        },
      });
      const hasAttributesEditor = (item: attributesTyping) => {
        return options.value.hasOwnProperty(item.name);
      };
      const getAttributesEditor = (item: attributesTyping) => {
        return item.editor;
      };
      /**
       * 展开
       */
      const activeKey = ref(['1', '2']);
      return {
        t,
        commonAttributes,
        eventAttributes,
        options,
        hasAttributesEditor,
        getAttributesEditor,
        activeKey,
      };
    },
  });
</script>

<style lang="less" scoped></style>
