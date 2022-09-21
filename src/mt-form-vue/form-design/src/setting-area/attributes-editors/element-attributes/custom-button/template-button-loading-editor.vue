<template>
  <a-form-item label="设置按钮载入状态" name="loading">
    <a-switch v-model:checked="options.loading" />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: 'TemplateButtonLoadingEditor',
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
