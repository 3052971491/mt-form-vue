<template>
  <div
    :class="[
      element.options.customStyles,
      hasRedact ? 'container-item-wrapper' : '',
      hasRedact ? 'container-item-wrapper-redact' : '',
      selected ? 'container-item-wrapper-select' : '',
    ]"
    @click.stop="handleSelectedElementClick"
  >
    <slot></slot>
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
import { defineComponent, computed, toRefs, nextTick } from "vue";
import { DeleteFilled, DragOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "ContainerItemWrapper",
  components: { DeleteFilled, DragOutlined },
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
          console.log(nextSelectedElement);
          central.value.selected(nextSelectedElement);
        });
      }
    };
    /**
     * 选中当前组件
     */
    const handleSelectedElementClick = () => {
      if (!hasRedact.value) return false;
      central.value.selected(element.value);
    };
    /**
     * 组件显示label
     */
    const label = computed(() => {
      return element.value.options.hiddenLabel
        ? ""
        : element.value.options.label;
    });
    /**
     * 表单配置
     */
    const config = computed(() => {
      return central.value.data.formConfig;
    });
    return {
      hasRedact,
      selected,
      handleDelElementClick,
      handleSelectedElementClick,
      label,
      config,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../../../styles/common.less";
.container-item-wrapper {
  position: relative;
  box-sizing: border-box;
  border: 1px dashed @primary-border-color;
  padding: 2px;
  width: 100%;
  // min-height: 38px !important;
}
.container-item-wrapper-redact {
  border: 1px dashed @primary-border-color;
}
.container-item-wrapper-select {
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
</style>
