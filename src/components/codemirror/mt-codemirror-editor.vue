<template>
  <div class="codemirror-box relative !h-full w-full overflow-hidden" ref="el" :style="{
    height: !!height ? height + 'px !important' : 'auto',
  }"></div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
  watch,
  unref,
  nextTick,
  PropType,
} from "vue";
import CodeMirror from "codemirror";
// 主题
import "./codemirror.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/seti.css";
// 搜索功能
import 'codemirror/addon/search/search'
// 显示自动刷新
import 'codemirror/addon/display/autorefresh'
// modes
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
// 自动补全
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/javascript-hint"
import "codemirror/addon/hint/css-hint"
import "codemirror/addon/hint/html-hint"
// 括号补全
import "codemirror/addon/edit/matchbrackets"
// 代码段折叠功能
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/foldgutter.css'
// 高亮行功能
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'
// 调整scrollbar样式功能
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import { MODE } from "./typing";
import { computed } from "@vue/reactivity";
export default defineComponent({
  name: "MtCodemirrorEditor",
});
</script>
<script lang="ts" setup>
const props = defineProps({
  mode: {
    type: String as PropType<MODE>,
    default: MODE.JSON,
    validator(value: any) {
      // 这个值必须匹配下列字符串中的一个
      return Object.values(MODE).includes(value);
    },
  },
  value: { type: String, default: "" },
  readonly: { type: Boolean, default: false },
  height: { type: [String, Number], default: "" },
});
const emit = defineEmits(["change", 'update:value']);
const el = ref();
let editor: any;
watch(
  () => props.value,
  async (value) => {
    await nextTick();
    const oldValue = editor?.getValue();
    if (value !== oldValue) {
      editor?.setValue(value ? value : "");
    }
  },
  { flush: "post" }
);
const modelValue = computed({
  set(val) {
    emit('update:value', val)
  },
  get() {
    return props.value
  },
})
watchEffect(() => {
  editor?.setOption("mode", props.mode);
});
async function init() {
  const addonOptions = {
    line: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers"],
    // 括号匹配
    matchBrackets: true,
    hintOptions: {
      // 当匹配只有一项的时候是否自动补全
      completeSingle: false,
    },
    // 高亮行功能
    styleActiveLine: true,
    autoRefresh: true,
    extraKeys: {},
  };

  editor = CodeMirror(el.value!, {
    value: "",
    mode: props.mode,
    readOnly: props.readonly,
    tabSize: 4,
    indentUnit: 4,
    theme: "idea",
    lineWrapping: true,
    lineNumbers: true,
    // 调整scrollbar样式功能
    scrollbarStyle: 'overlay',
    ...addonOptions,
  });
  editor?.setValue(props.value);
  editor?.on("change", () => {
    emit("change", editor?.getValue());
    modelValue.value = editor?.getValue()
    // editor.showHint();
  });
}

onMounted(async () => {
  await nextTick();
  init();
});

onUnmounted(() => {
  editor = null;
});
</script>

<style lang="less" scoped>
.codemirror-box {
  min-height: 300px;
  height: 100% !important;

  .CodeMirror {
    height: 100%;
  }
}
</style>
