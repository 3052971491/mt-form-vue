<template>
  <container-item-wrapper
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <a-tabs
      v-model:activeKey="activeKey"
      v-bind="{
        type: options.type,
        tabPosition: options.tabPosition,
        tabBarStyle: options.tabBarStyle,
        tabBarGutter: options.tabBarGutter,
        centered:options.centered,
        destroyInactiveTabPane: options.destroyInactiveTabPane,
        size: options.size,
      }"
      @click.stop="handleSelectedElementClick"
    >
      <a-tab-pane
        v-for="(tab, i) in element.children"
        :key="tab.elementId"
        :tab="tab.options.label"
        class="tab-pane-container"
      >
        <col-draggable
          :element="tab"
          :central="central"
          :redact-state="redactState"
          :config="config"
          :parent-list="tab.list"
          :index-of-parent-list="i"
          :parent-element="tab"
          itemKey="elementId"
          @add="(evt) => handleAddElementClick(evt, tab.list)"
          @update="handleUpdateElementClick"
        />
      </a-tab-pane>
    </a-tabs>
  </container-item-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, nextTick, ref } from "vue";
import ColDraggable from "../../../components/col-draggable.vue";
import { DeleteFilled, DragOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "MtTabsElement",
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
     * ?????????????????????
     */
    const hasRedact = computed(() => {
      return !!central.value && redactState.value;
    });
    /**
     * ??????????????????
     */
    const selected = computed(() => {
      if (!hasRedact.value) return false;
      return element.value.elementId == central.value.data.selectedId;
    });
    /**
     * ????????????
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
     * ??????????????????
     */
    const handleSelectedElementClick = () => {
      central.value.selected(element.value);
    };
    /**
     * ????????????
     */
    const handleUpdateElementClick = () => {
      return true;
    };

    const activeKey = ref("");
    activeKey.value = element.value.children[0].id;
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
