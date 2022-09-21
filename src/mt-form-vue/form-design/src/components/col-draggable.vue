<template>
  <draggable
    :item-key="itemKey"
    class="draggable-container"
    :list="element.list"
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
  >
    <template #item="{ element: aa, index }">
      <component
        :is="getElementName(aa)"
        :central="central"
        :element="aa"
        :parent-list="element.list"
        :index-of-parent-list="index"
        :parent-element="element"
        :key="aa.elementId"
        :redact-state="true"
        :config="config"
      />
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Draggable from "vuedraggable/src/vuedraggable";
import ElementList from "../form-area/element";
import { FormDesignElementTyping } from "/@/types/form-design/index-typing";
export default defineComponent({
  name: "ColDraggable",
  components: { Draggable, ...ElementList },
  props: {
    ...Draggable.props,
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
    indexOfParentList: Number,
    parentElement: Object,
  },
  setup(props) {
    const { central } = toRefs(props);
    /**
     * 获取组件列表
     */
    const getElementName = (element: FormDesignElementTyping) => {
      return `mt-${element.type}-element`;
    };
    const handleMoveElementClick = () => {
      return true;
    };
    return {
      getElementName,
      handleMoveElementClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../styles/common.less";
.draggable-container {
  display: flex;
  flex-direction: column;
  min-height: 28px;
}
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
