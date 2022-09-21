<template>
  <a-form-item label="风格样式" name="buttonStyle">
    <a-radio-group v-model:value="options.buttonStyle">
      <!-- 描边和填色 -->
      <a-radio-button value="outline">{{ t("Outline") }}</a-radio-button>
      <a-radio-button value="solid">{{ t("Solid") }}</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "RadioButtonStyleEditor",
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
