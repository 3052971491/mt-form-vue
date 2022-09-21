<template>
  <a-form-item label="flex 布局下的水平排列方式" name="justify">
    <a-select v-model:value="options.justify" :options="justifyOptions" placeholder="请选择"></a-select>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
export default defineComponent({
  name: "RowJustifyEditor",
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
    const justifyOptions = [
      {
        key: "start",
        value: "start",
      },
      {
        key: "end",
        value: "end",
      },
      {
        key: "center",
        value: "center",
      },
      {
        key: "space-around",
        value: "space-around",
      },
      {
        key: "space-between",
        value: "space-between",
      },
    ];
    return {
      options,
      justifyOptions,
    };
  },
});
</script>
