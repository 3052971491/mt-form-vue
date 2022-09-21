<template>
  <a-form-item label="是否展示今天按钮" name="showToday">
    <a-switch v-model:checked="options.showToday" />
  </a-form-item>
</template>
<script lang="ts">
export default {
  name: "DateShowTodayEditor",
}
</script>
<script lang="ts" setup>
import { computed } from "vue";
import { t } from "/@/utils/i18n";
interface Props {
  central: any;
  element: any;
}
const props = withDefaults(defineProps<Props>(), {
  central: {},
  element: {},
})
const emit = defineEmits(["update:element"])
const options = computed({
  get: () => {
    return props.element.options;
  },
  set: (value: any) => {
    emit("update:element", value);
  },
});
</script>
