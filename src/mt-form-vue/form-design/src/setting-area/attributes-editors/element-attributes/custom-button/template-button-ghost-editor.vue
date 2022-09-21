<template>
  <a-form-item label="设置背景透明" name="ghost">
    <a-switch v-model:checked="options.ghost" />
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: 'TemplateButtonGhostEditor',
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
