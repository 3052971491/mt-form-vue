<template>
  <div
    :class="[
      element.options.customStyles,
      'static-item-wrapper',
      hasRedact ? 'static-item-wrapper-redact' : '',
      selected ? 'static-item-wrapper-select' : '',
    ]"
    @click.stop="handleSelectedElementClick"
  >
    <template v-if="!element.formItemFlag && isHidden">
      <slot></slot>
    </template>
    <div v-if="redactState" class="wrapper-mask-box"></div>
    <template v-if="selected">
      <div class="element-action-group">
        <delete-filled class="opt-icon" @click.stop="handleDelElementClick" />
      </div>
      <div class="element-drag-btn">
        <drag-outlined :style="{ fontSize: '20px', color: '#ffffff' }" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, nextTick, inject } from "vue";
import {
  DeleteFilled,
  DragOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "StaticItemWrapper",
  components: { DeleteFilled, DragOutlined, EyeInvisibleOutlined },
  props: {
    element: {
      type: Object,
      default: () => {},
    },
    central: {
      type: Object,
      default: () => {},
    },
    redactState: {
      type: Boolean,
      default: false,
    },
    parentList: {
      type: Array,
      default: () => [],
    },
    indexOfParentList: {
      type: Number,
      default: -1,
    },
    parentElement: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update: parentList"],
  setup(props, { emit }) {
    const {
      element,
      central,
      redactState,
      parentList,
      indexOfParentList,
      parentElement,
    } = toRefs(props);
    /**
     * 是否是编辑状态
     */
    const hasRedact = computed(() => {
      return !!central.value && redactState.value;
    });
    /**
     * 是否选中状态
     */
    const selected = computed(() => {
      if (!hasRedact.value) return false;
      return element.value.elementId == central.value.data.selectedId;
    });
    /**
     * 删除当前组件
     */
    const handleDelElementClick = () => {
      if (!redactState.value) return;
      if (parentList.value.length > 0) {
        let nextSelectedElement: any;
        if (parentList.value.length == 1) {
          if (!!parentElement.value) {
            nextSelectedElement = parentElement.value;
          }
        } else if (parentList.value.length == indexOfParentList.value + 1) {
          nextSelectedElement = parentList.value[indexOfParentList.value - 1];
        } else {
          nextSelectedElement = parentList.value[indexOfParentList.value + 1];
        }
        nextTick(() => {
          const arr = parentList.value;
          arr.splice(indexOfParentList.value, 1);
          emit("update: parentList", arr);
          central.value.selected(nextSelectedElement);
        });
      }
    };
    /**
     * 选中当前组件
     */
    const handleSelectedElementClick = () => {
      if (!redactState.value) return;
      central.value.selected(element.value);
    };
    /**
     * 表单配置
     */
    const config = computed(() => {
      return central.value.data.formConfig;
    });
    /**
     * 组件是否显示
     */
     const isHidden = computed(() => {
      if (redactState.value) return true;
      return !element.value.options.hidden;
    });
    return {
      hasRedact,
      selected,
      handleDelElementClick,
      handleSelectedElementClick,
      config,
      isHidden,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../../../styles/common.less";
.static-item-wrapper {
  position: relative;
}
.static-item-wrapper-redact {
  width: 100%;
  padding: 6px;
  border: 1px dashed @primary-border-color;
  .ant-form-item {
    margin-bottom: 0;
  }
}
.static-item-wrapper-select {
  border: 1px solid @primary-theme-color;
}
.element-action-group {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 20px;
  line-height: 20px;
  z-index: 9;
  .opt-icon {
    font-size: 16px;
    color: @primary-theme-color;
    margin: 0 4px;
    cursor: pointer;
  }
}
.element-drag-btn {
  position: absolute;
  left: 0px;
  top: 0;
  bottom: -18px;
  height: 28px;
  width: 28px;
  font-size: 20px;
  line-height: 28px;
  background: @primary-theme-color;
  z-index: 9;
  text-align: center;
  cursor: move;
}

.wrapper-mask-box {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: transparent;
}
</style>

