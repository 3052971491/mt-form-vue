<template>
  <a-form-item :label="t('expandIconPosition')" name="expandIconPosition">
    <a-select
      v-model:value="options.expandIconPosition"
      :options="expandIconPositionOptions"
      :placeholder="t('inputPlaceholder')"
    ></a-select>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "CollapseExpandIconPositionEditor",
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
        return element.value.options;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    const expandIconPositionOptions = [
      {
        key: "left",
        value: "left",
      },
      {
        key: "right",
        value: "right",
      },
    ];
    return {
      t,
      options,
      expandIconPositionOptions,
    };
  },
});
</script>
