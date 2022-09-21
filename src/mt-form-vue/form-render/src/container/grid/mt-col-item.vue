<template>
  <a-col
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
  >
    <template v-for="(aa, index) in element.list" :key="index">
      <component
        :is="getElementName(aa.type)"
        :central="central"
        :element="aa"
        :parent-list="element.list"
        :index-of-parent-list="index"
        :parent-element="element"
        :config="config"
        :redactState="redactState"
      />
    </template>
  </a-col>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, nextTick } from "vue";
import elementComponents from "../../../../form-design/src/form-area/element";
export default defineComponent({
  name: "MtColItem",
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
