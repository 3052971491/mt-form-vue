<template>
  <a-form-item :label="t('tabPosition')" name="tabPosition">
    <a-select
      v-model:value="options.tabPosition"
      :options="typeOptions"
      :placeholder="t('inputPlaceholder')"
    ></a-select>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "TabsTabPositionEditor",
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
    const typeOptions = [
      {
        key: "top",
        value: "top",
      },
      {
        key: "right",
        value: "right",
      },
      {
        key: "bottom",
        value: "bottom",
      },
      {
        key: "left",
        value: "left",
      },
    ];
    return {
      t,
      options,
      typeOptions,
    };
  },
});
</script>
