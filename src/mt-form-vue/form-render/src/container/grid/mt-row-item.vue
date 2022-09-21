<template>
  <container-item-wrapper-render
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <a-row
      :gutter="options.gutter"
      :align="options.align"
      :justify="options.justify"
      :wrap="options.wrap"
    >
      <template v-for="(col, index) in element.children" :key="col.id">
        <mt-col-item
          :element="col"
          :central="central"
          :parent-list="element.children"
          :index-of-parent-list="index"
          :parent-element="element"
          :config="config"
          :redactState="redactState"
        />
      </template>
    </a-row>
  </container-item-wrapper-render>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import ContainerItemWrapperRender from "../components/container-item-wrapper.vue";
import MtColElement from "./mt-col-item.vue";

export default defineComponent({
  name: "MtRowItem",
  components: { ContainerItemWrapperRender, MtColElement },
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
    indexOfParentList: Number,
    parentElement: Object,
  },
  setup(props) {
    const { element } = toRefs(props);
    const options = element.value.options;
    return {
      options,
    };
  },
});
</script>

<style lang="less" scoped></style>
