<template>
  <a-form-item label="非选中时的值" name="unCheckedValue">
    <mt-input
      v-model:value="options.unCheckedValue"
      placeholder="请输入"
      style="width: 100%"
      @change="handleChange"
    />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import MtInput from "/@/components/mt-input.vue";
export default defineComponent({
  name: "SwitchUnCheckedValueEditor",
  components: { MtInput },
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
    function handleChange(val: any) {
      options.value.defaultValue = val;
    }
    return {
      options,
      handleChange,
    };
  },
});
</script>
