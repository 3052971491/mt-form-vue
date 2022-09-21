<template>
  <draggable
    :list="list"
    v-bind="{
      group: {
        name: 'mutou-form',
        pull: 'clone',
        put: false,
      },
      animation: 300,
      'component-data': { name: 'fade' },
      sort: false,
      'item-key': 'elementId',
      tag: 'ul',
      move: () => {
        return true;
      },
      clone: handleElementClone,
    }"
  >
    <template #item="{ element }">
      <li class="element-item" @dblclick="handleElementClick(element)">
        {{ title(element) }}
      </li>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import Draggable from "vuedraggable/src/vuedraggable";
import { FormDesignElementTyping } from "/@/types/form-design/index-typing";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "ElementDraggable",
  components: { Draggable },
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true,
    },
    central: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { central } = toRefs(props);
    /**
     * 双击添加组件
     */
    const handleElementClick = (element: FormDesignElementTyping) => {
      central.value.handleAddElement(element);
    };
    /**
     * 拖拽添加组件
     */
    const handleElementClone = (element: FormDesignElementTyping) => {
      return central.value.buildElement(element);
    };
    const title = computed(() => (element: FormDesignElementTyping) => {
      /** 时间类型组件特殊处理 */
      if (element.type == 'date') {
        return t(`${element.options.dateConfig.type}`)
      }
      return t(`${element.type}`)
    })
    return {
      t,
      title,
      handleElementClick,
      handleElementClone,
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 10px;

  .element-item {
    text-align: left;
    display: block;
    position: relative;
    float: left;
    left: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 8px;
    background: @primary-theme-bg;
    font-size: 12px;
    height: 36px;
    cursor: move;
    border: 1px dashed @primary-theme-bg;
    border-radius: 3px;
    color: @primary-font-color;
    line-height: 36px;

    &:hover {
      border: 1px dashed @primary-theme-color;
      color: @primary-theme-color;
    }
  }
}
.ghost {
  width: 100% !important;
  content: "";
  font-size: 0;
  height: 4px !important;
  box-sizing: border-box !important;
  background: @primary-theme-color !important;
  border: 2px solid @primary-theme-color;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
  margin-bottom: 4px !important;
  z-index: 66;
  float: none !important;
}
</style>
