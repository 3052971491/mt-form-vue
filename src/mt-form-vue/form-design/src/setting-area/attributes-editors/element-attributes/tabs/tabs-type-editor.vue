<template>
  <a-form-item :label="t('basicStyleOfTab')" name="type">
    <a-select
      v-model:value="options.type"
      :options="typeOptions"
      :placeholder="t('inputPlaceholder')"
    ></a-select>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "TabsTypeEditor",
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
        key: "line",
        value: "line",
      },
      {
        key: "card",
        value: "card",
      },
      {
        key: "editable-card",
        value: "editable-card",
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
