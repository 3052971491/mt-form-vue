<template>
  <a-form-item label="flex 布局下的垂直对齐方式" name="align">
    <a-select v-model:value="options.align" :options="alignOptions" placeholder="请选择"></a-select>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
export default defineComponent({
  name: "RowAlignEditor",
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
    const alignOptions = [
      {
        key: "top",
        value: "top",
      },
      {
        key: "middle",
        value: "middle",
      },
      {
        key: "bottom",
        value: "bottom",
      },
    ];
    return {
      options,
      alignOptions,
    };
  },
});
</script>
