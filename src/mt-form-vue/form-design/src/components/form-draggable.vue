<template>
  <draggable
    :list="list"
    v-bind="{
      group: {
        name: 'mutou-form',
        pull: true,
      },
      ghostClass: 'ghost',
      tag: 'ul',
      move: handleMoveElementClick,
      animation: 300,
      'component-data': { name: 'fade' },
    }"
    @add="add"
    @update="update"
    handle=".element-drag-btn"
    style="height: 100%"
    item-key="elementId"
  >
    <template #item="{ element, index }">
      <component
        :is="getElementName(element)"
        :central="central"
        :element="element"
        :key="element.elementId"
        :redactState="true"
        :config="central.data.formConfig"
        :parent-list="list"
        :index-of-parent-list="index"
        :parent-element="null"
      />
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Draggable from "vuedraggable/src/vuedraggable";
import ElementList from "../form-area/element";
import { FormDesignElementTyping } from "/@/types/form-design/index-typing";
export default defineComponent({
  name: "ElementDraggable",
  components: { Draggable, ...ElementList },
  props: {
    list: {
      type: Object,
      required: true,
    },
    central: {
      type: Object,
      default: () => {},
    },
    /**
     * 从一个数组拖拽到另外一个数组时触发的事件
     */
    add: Function,
    /**
     * 拖拽变换位置时触发的事件
     */
    update: Function,
  },
  setup() {
    const handleMoveElementClick = () => {
      return true;
    };
    /**
     * 获取组件列表
     */
    const getElementName = (element: FormDesignElementTyping) => {
      return `mt-${element.type}-element`;
    };
    return {
      handleMoveElementClick,
      getElementName,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../styles/common.less";
ul {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.ghost {
  width: 100% !important;
  content: "";
  font-size: 0;
  height: 4px !important;
  box-sizing: border-box;
  background: @primary-theme-color !important;
  border: 2px solid @primary-theme-color;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
  margin-bottom: 4px;
  z-index: 66;
}
</style>
