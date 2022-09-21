<template>
  <a-collapse
    v-bind="{
      accordion: options.accordion,
      destroyInactivePanel: options.destroyInactivePanel,
      expandIconPosition: options.expandIconPosition,
      ghost: options.ghost,
    }"
  >
    <a-collapse-panel
      v-for="(el, index) in element.children"
      :key="index"
      v-bind="{
        header: el.options.label,
        forceRender: el.options.forceRender,
        showArrow: el.options.showArrow,
      }"
    >
      <template v-for="(item, i) in el.list" :key="i">
        <component
          :is="getElementName(item.type)"
          :central="central"
          :element="item"
          :parent-list="el.list"
          :index-of-parent-list="i"
          :parent-element="el"
          :config="config"
          :redactState="redactState"
        />
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, nextTick } from "vue";
import elementComponents from "../../../../form-design/src/form-area/element";
export default defineComponent({
  name: "MtCollapseItem",
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
