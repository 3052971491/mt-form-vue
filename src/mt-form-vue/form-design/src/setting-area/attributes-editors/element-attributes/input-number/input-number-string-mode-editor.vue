<template>
  <a-form-item label="字符值模式" name="stringMode">
    <a-switch v-model:checked="options.stringMode" />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
export default defineComponent({
  name: "InputNumberStringModeEditor",
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
