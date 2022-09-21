<template>
  <a-form-item label="默认行数" name="rows">
    <a-input-number
      v-model:value="options.rows"
      placeholder="请输入"
      style="width: 100%"
    />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
export default defineComponent({
  name: "TextareaRowsEditor",
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
    return {
      options,
    };
  },
});
</script>
