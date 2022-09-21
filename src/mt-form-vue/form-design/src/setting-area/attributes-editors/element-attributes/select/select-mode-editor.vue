<template>
  <a-form-item :label="t('mode')" name="mode">
    <a-select
      v-model:value="options.mode"
      :options="modeOptions"
      :placeholder="t('selectPlaceholder')"
    ></a-select>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "SelectModeEditor",
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
    const modeOptions = [
      {
        label: "Default",
        value: "default",
      },
      {
        label: "Multiple",
        value: "multiple",
      },
      {
        label: "Tags",
        value: "tags",
      },
      {
        label: "Combobox",
        value: "combobox",
      },
    ];
    return {
      t,
      options,
      modeOptions,
    };
  },
});
</script>
