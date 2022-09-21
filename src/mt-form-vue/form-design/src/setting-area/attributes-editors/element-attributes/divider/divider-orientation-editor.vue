<template>
  <a-form-item :label="'分割线标题的位置'" name="orientation">
    <a-radio-group v-model:value="options.orientation">
      <a-radio-button value="left">left</a-radio-button>
      <a-radio-button value="right">right</a-radio-button>
      <a-radio-button value="center">center</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "DividerOrientationEditor",
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
      t,
      options,
    };
  },
});
</script>