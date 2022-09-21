<template>
  <vue-json-pretty :data="val" :deep="deep" :showDoubleQuotes="showDoubleQuotes" :showLength="true" lang="zh"
    :showSelectController="showSelectController" @selectOnClickNode="handleChange" />
</template>

<script lang="ts" setup>
// 具体属性参考官网 https://github.com/leezng/vue-json-pretty/tree/master
// Todo
// 添加其他属性配置
// 优化央视
import { defineComponent, toRefs, computed } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
const props = defineProps({
  value: Object,
  /** JSON数据 */
  data: Object,
  /** 数据深度, 大于该深度的数据将不被展开 */
  deep: {
    type: Number,
    default: 5,
  },
  /** 是否显示key上的双引号 */
  showDoubleQuotes: {
    type: Boolean,
    default: false,
  },
  showSelectController: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["change", "update:value"]);
const { value } = toRefs(props);
const val = computed({
  get: () => value?.value,
  set: (value: any) => emit("update:value", value),
});
function handleChange(newval: any) {
  val.value = newval;
  emit("change", newval);
  return newval;
}
</script>