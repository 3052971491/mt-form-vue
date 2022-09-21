<template>
  <a-form-item label="设置按钮类型" name="buttonType">
    <a-select v-model:value="options.buttonType">
      <a-select-option value="default">default</a-select-option>
      <a-select-option value="primary">primary</a-select-option>
      <a-select-option value="ghost">ghost</a-select-option>
      <a-select-option value="dashed">dashed</a-select-option>
      <a-select-option value="link">link</a-select-option>
      <a-select-option value="text">text</a-select-option>
    </a-select>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: 'TemplateButtonTypeEditor',
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
