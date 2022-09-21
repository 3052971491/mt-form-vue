<template>
  <container-item-wrapper
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <a-collapse
      v-model:activeKey="activeKey"
      v-bind="{
        accordion: options.accordion,
        destroyInactivePanel: options.destroyInactivePanel,
        expandIconPosition: options.expandIconPosition,
        ghost: options.ghost,
      }"
      @click.stop="handleSelectedElementClick"
    >
      <a-collapse-panel
        v-for="(item, i) in element.children"
        :key="item.elementId"
        v-bind="{
          header: item.options.label,
          forceRender: item.options.forceRender,
          showArrow: item.options.showArrow,
        }"
        class="tab-pane-container"
      >
        <col-draggable
          :element="item"
          :central="central"
          :redact-state="redactState"
          :config="config"
          :parent-list="item.list"
          :index-of-parent-list="i"
          :parent-element="item"
          itemKey="elementId"
          @add="(evt) => handleAddElementClick(evt, item.list)"
          @update="handleUpdateElementClick"
        />
      </a-collapse-panel>
    </a-collapse>
  </container-item-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, nextTick, ref } from "vue";
import ColDraggable from "../../../components/col-draggable.vue";
import { DeleteFilled, DragOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "MtCollapseElement",
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
    const handleAddElementClick = (
      evt: { newIndex: any },
      list: { [x: string]: any }
    ) => {
      const newIndex = evt.newIndex;
      if (!!list[newIndex]) {
        central.value.selected(list[newIndex]);
      }
    };
    /**
     * 选中当前组件
     */
    const handleSelectedElementClick = () => {
      central.value.selected(element.value);
    };
    /**
     * 移动组件
     */
    const handleUpdateElementClick = () => {
      return true;
    };

    const activeKey = ref("");
    if (element.value.children.length > 0) {
      activeKey.value = element.value.children[0].elementId;
    }

    return {
      activeKey,
      hasRedact,
      selected,
      handleSelectedElementClick,
      options,
      handleAddElementClick,
      handleUpdateElementClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../../../styles/common.less";

.tab-pane-container {
  min-height: 38px !important;
  box-sizing: border-box;
  position: relative;
}
</style>
