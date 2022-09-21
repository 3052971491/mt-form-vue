<template>
  <a-form-item label="格式化绑定值" name="dateValueFormat">
    <a-select v-model:value="options.dateValueFormat" :options="dateValueFormatType"></a-select>
  </a-form-item>
</template>
<script lang="ts">
export default {
  name: "DateDateValueFormatEditor",
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
const dateValueFormatType = computed(() => {
  return [
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
  ];
})
</script>
