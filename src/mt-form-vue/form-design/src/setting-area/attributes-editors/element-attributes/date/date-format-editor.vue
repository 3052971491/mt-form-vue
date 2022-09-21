<template>
  <a-form-item label="格式化显示文本" name="dateFormat">
    <a-select v-model:value="options.dateFormat" :options="dateFormatType"></a-select>
  </a-form-item>
</template>
<script lang="ts">
export default {
  name: "DateDateFormatEditor",
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
const dateFormatType = computed(() => {
  const time = [
    { label: 'HH:mm:ss', value: 'HH:mm:ss' },
    { label: 'hh:mm:ss', value: 'hh:mm:ss' },
    { label: 'HH时mm分ss秒', value: 'HH时mm分ss秒' },
  ];
  const date = [
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
    { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' },
    { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
    { label: 'YYYY-MM-DD hh:mm:ss', value: 'YYYY-MM-DD hh:mm:ss' },
  ];
  return options.value.dateConfig.type == 'time-picker' || options.value.dateConfig.type == 'time-range-picker'
    ? time
    : date;
})
</script>