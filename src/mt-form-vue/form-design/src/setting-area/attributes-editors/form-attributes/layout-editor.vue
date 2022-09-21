<template>
  <a-form-item :label="t('fromLayout')" name="layout">
    <a-radio-group v-model:value="options.layout">
      <a-radio-button value="horizontal">Horizontal</a-radio-button>
      <a-radio-button value="vertical">Vertical</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "LayoutEditor",
  components: {},
  props: {
    central: {
      type: Object,
      required: true,
      default: () => {},
    },
    element: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  emits: ["update:element"],
  setup(props, { emit }) {
    const { element } = toRefs(props);
    const options = computed({
      get: () => {
        return element.value;
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
