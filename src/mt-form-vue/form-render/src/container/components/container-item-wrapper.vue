<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, nextTick } from "vue";
export default defineComponent({
  name: "ContainerItemWrapperRender",
  components: {},
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
      return redactState.value;
    });
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
      label,
      config,
    };
  },
});
</script>
