<template>
  <a-form-item label="设置按钮形状" name="shape">
    <a-radio-group v-model:value="options.shape">
      <a-radio-button value="default">default</a-radio-button>
      <a-radio-button value="circle">circle</a-radio-button>
      <a-radio-button value="round">round</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: 'TemplateButtonShapeEditor',
  components: {},
  props: {
    central: {
      type: Object,
      required: true,
      default: () => { },
    },
    element: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  emits: ["update:element"],
  setup(props, { emit }) {
    const { element } = toRefs(props);
    const options = computed({
      get: () => {
        return element.value.options;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    return {
      t,
      options,
    };
  },
});
</script>
