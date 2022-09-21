<template>
  <a-form-item label="设置危险按钮" name="danger">
    <a-switch v-model:checked="options.danger" />
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: 'TemplateButtonDangerEditor',
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