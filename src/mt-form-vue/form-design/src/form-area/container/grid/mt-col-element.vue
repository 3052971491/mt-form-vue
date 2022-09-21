<template>
  <a-col
    :class="[
      hasRedact ? 'col-container' : '',
      hasRedact ? 'form-item-wrapper-redact' : '',
      selected ? 'form-item-wrapper-select' : '',
    ]"
    v-bind="{
      flex: options.flex,
      offset: options.offset,
      order: options.order,
      pull: options.pull,
      push: options.push,
      span: options.span,
      xxxl: options.xxxl,
      xs: options.xs,
      sm: options.sm,
      md: options.md,
      lg: options.lg,
      xl: options.xl,
      xxl: options.xxl,
    }"
    @click.stop="handleSelectedElementClick"
  >
    <col-draggable
      :element="element"
      :central="central"
      :redact-state="true"
      :config="config"
      :parent-list="parentList"
      :index-of-parent-list="indexOfParentList"
      :parent-element="parentElement"
      itemKey="elementId"
      @add="(evt) => handleAddElementClick(evt, element.list)"
      @update="handleUpdateElementClick"
    />
    <template v-if="selected">
      <div class="element-action-group">
        <delete-filled class="opt-icon" @click.stop="handleDelElementClick" />
      </div>
    </template>
  </a-col>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, nextTick } from "vue";
import ColDraggable from "../../../components/col-draggable.vue";
import { DeleteFilled, DragOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "MtColElement",
  components: { ColDraggable, DeleteFilled, DragOutlined },
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
    config: {
      type: Object,
      default: () => {},
    },
    parentList: {
      type: Array,
      default: () => [],
    },
    indexOfParentList: {
      type: Number,
      default: -1,
    },
    parentElement: Object,
  },
  setup(props, { emit }) {
    const {
      element,
      central,
      parentList,
      indexOfParentList,
      parentElement,
      redactState,
    } = toRefs(props);
    const options = element.value.options;
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
     * 新增组件
     */
    const handleAddElementClick = (evt, list) => {
      const newIndex = evt.newIndex;
      if (!!list[newIndex]) {
        central.value.selected(list[newIndex]);
      }
    };
    /**
     * 选中当前组件
     */
    const handleSelectedElementClick = () => {
      if (!hasRedact.value) return;
      central.value.selected(element.value);
    };
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
          central.value.selected(nextSelectedElement);
        });
      }
    };
    /**
     * 移动组件
     */
    const handleUpdateElementClick = () => {
      return true;
    };
    return {
      hasRedact,
      selected,
      handleSelectedElementClick,
      handleDelElementClick,
      options,
      handleAddElementClick,
      handleUpdateElementClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../../../styles/common.less";
.col-container {
  min-height: 38px !important;
  //margin: 6px 0;  /* 设置了margin，栅格列的offset、push、pull会失效！！ */
  box-sizing: border-box;
  border: 1px dashed @primary-border-color;
  padding: 2px 2px !important;
  position: relative;
}

.form-item-wrapper-redact {
  width: 100%;
  padding: 6px;
  border: 1px dashed @primary-border-color;
  .ant-form-item {
    margin-bottom: 0;
  }
}
.form-item-wrapper-select {
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
</style>
