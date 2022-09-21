<template>
  <a-form-item label="提示文字-start" name="startPlaceholder">
    <a-input v-model:value="options.startPlaceholder" :placeholder="t('inputPlaceholder')" />
  </a-form-item>
</template>
<script lang="ts">
export default {
  name: "DateStartPlaceholderEditor",
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
const options = computed({
  get: () => {
    return props.element.options;
  },
  set: (value: any) => {
    emit("update:element", value);
  },
});
const emit = defineEmits(["update:element"])
</script>
