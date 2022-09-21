<template>
  <a-drawer
    width="50%"
    v-bind="{
      title,
      closable: false,
      visible,
      placement,
      height: placement == 'top' || placement == 'bottom' ? '60%' : 378
    }"
    destroy-on-close
    @close="onClose"
  >
      <div class="hanlder-container">
        <slot name="header"></slot>
      </div>
      <mt-codemirror-editor
        v-model:value="val"
        :mode="mode"
        @change="handleChange"
      ></mt-codemirror-editor>
      <div  class="hanlder-container"><slot name="footer"></slot></div>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onSave">保存</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, toRefs, unref } from "vue";
import MtCodemirrorEditor from "/@/components/codemirror/mt-codemirror-editor.vue";
import { MODE } from "/@/components/codemirror/typing";
export default defineComponent({
  name: "EventHandlerDrawer",
  components: { MtCodemirrorEditor },
  props: {
    title: {
      type: String,
      default: '事件处理',
    },
    value: {
      type: [String],
      required: true,
      default: '',
    },
    // 'top' | 'right' | 'bottom' | 'left'
    placement: {
      type: [String],
      default: 'bottom',
    },
    mode: {
      type: [String],
      default: MODE.JS,
    }
  },
  emits: ["update:value", "success"],
  setup(props, { emit }) {
    const { value } = toRefs(props);
    const code = computed({
      get: () => {
        return value.value;
      },
      set: (val: any) => {
        emit("update:value", val);
      },
    });
    const val = ref('');
    const visible = ref(false);
    /**
     * 打开
     */
    const onShow = () => {
      visible.value = true;
      val.value = !!code.value ? code.value : '';
    };
    /**
     * 关闭
     */
    const onClose = () => {
      unref(val)
      visible.value = false;
    };
    const onSave = () => {
      code.value = val.value;
      emit("success", code.value);
      onClose();
    }
    function handleChange(e: string) {
      val.value = e;
    }
    return {
      visible,
      onShow,
      onClose,
      onSave,
      MODE,
      val,
      handleChange,
    };
  },
});
</script>

<style lang="less" scoped>
  .hanlder-container {
    font-size: 18px;
  }
</style>
