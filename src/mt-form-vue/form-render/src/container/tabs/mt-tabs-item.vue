<template>
  <a-tabs
    v-bind="{
      type: options.type,
      tabPosition: options.tabPosition,
      tabBarStyle: options.tabBarStyle,
      tabBarGutter: options.tabBarGutter,
      centered: options.centered,
      destroyInactiveTabPane: options.destroyInactiveTabPane,
      size: options.size,
    }"
  >
    <a-tab-pane
      v-for="(tabs, index) in element.children"
      :key="index"
      :tab="tabs.options.label"
    >
      <template v-for="(item, i) in tabs.list" :key="i">
        <component
          :is="getElementName(item.type)"
          :central="central"
          :element="item"
          :parent-list="tabs.list"
          :index-of-parent-list="i"
          :parent-element="tabs"
          :config="config"
          :redactState="redactState"
        />
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, nextTick } from "vue";
import elementComponents from "../../../../form-design/src/form-area/element";
export default defineComponent({
  name: "MtTabsItem",
  components: { ...elementComponents },
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
      return redactState.value;
    });
    const getElementName = (type: string) => {
      return `mt-${type}-element`;
    };
    return {
      hasRedact,
      options,
      getElementName,
    };
  },
});
</script>
