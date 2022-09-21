<template>
  <modal v-bind="$props" :maskClosable="maskClosable" cancelText="取消" okText="确认" :width="fullscreen ? '100%' : width"
    :wrap-class-name="fullscreen ? 'full-modal' : ''">
    <slot></slot>
  </modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Modal } from "ant-design-vue";
const props = defineProps({
  ...Modal.props,
  /** 点击蒙层是否允许关闭 */
  maskClosable: {
    type: Boolean,
    default: false,
  },
  /** 大小设置 mini / small / medium */
  size: {
    type: String,
    default: "medium",
  },
  /** 宽度 520 / 650 / 750 / 900 */
  width: {
    type: Number,
    default: 900,
  },
  /**  是否全屏 */
  fullscreen: {
    type: Boolean,
    default: false,
  },
})
const visible = ref(false);
</script>
<style lang="less">
.full-modal {
  width: 100%;

  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
    padding: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    overflow: hidden;
  }

  .ant-modal-body {
    flex: 1;
    padding: 16px 24px;
    overflow: auto;
  }
}
</style>
