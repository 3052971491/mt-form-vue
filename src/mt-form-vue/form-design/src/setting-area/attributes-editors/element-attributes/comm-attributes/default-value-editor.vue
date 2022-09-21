<template>
  <a-form-item :label="t('defaultValue')" name="defaultValue">
    <component
      v-if="componentType == 'a-switch'"
      :is="componentType"
      v-model:checked="options.defaultValue"
    />
    <!-- 颜色选择器 -->
    <input
      v-else-if="componentType == 'color'"
      v-model="options.defaultValue"
      type="color"
    />
    <!-- HTML 文本 -->
    <component
      v-else-if="element.type == 'html-text'"
      :is="componentType"
      v-model:value="options.defaultValue"
      :auto-size="{ minRows: 4, maxRows: 4 }"
    />
    <component
      v-else-if="element.type == 'date'"
      :is="componentType"
      v-model:value="options.defaultValue"
      :placeholder="placeholder"
      style="width: 100%"
      v-bind="{
        format: options.dateFormat,
        valueFormat: options.dateValueFormat,
      }"
    />
    <component
      v-else
      :is="componentType"
      v-model:value="options.defaultValue"
      :placeholder="placeholder"
      style="width: 100%"
    />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "DefaultValueEditor",
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
    // 计算输入组件类型
    const componentType = computed(() => {
      const inputType: string | any[] = ["input", "textarea"];
      const selectType: string | any[] = ["radio", "checkbox", "select"];
      const inputNumberType: string | any[] = ["input-number", "rate"];
      const switchType: string | any[] = ["switch"];
      const colorType: string | any[] = ["color-picker"];
      const dateType: string | any[] = ["date"];
      if (inputType.includes(element.value.type)) {
        return "a-input";
      } else if (selectType.includes(element.value.type)) {
        return "a-select";
      } else if (inputNumberType.includes(element.value.type)) {
        return "a-input-number";
      } else if (switchType.includes(element.value.type)) {
        return "a-switch";
      } else if (colorType.includes(element.value.type)) {
        return "color";
      } else if (dateType.includes(element.value.type)) {
        return `a-${element.value.options.dateConfig.type}`;
      } else if (element.value.type == 'html-text') {
        return "a-textarea";
      } else {
        return "a-input";
      }
    });
    // 计算提示语类型
    const placeholder = computed(() => {
      switch (componentType.value) {
        case "a-input":
          return "请输入";
        case "a-select":
          return "请选择";
        default:
          return "请输入";
      }
    });
    return {
      t,
      options,
      componentType,
      placeholder,
    };
  },
});
</script>
