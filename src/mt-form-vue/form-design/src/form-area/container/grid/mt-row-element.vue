<template>
  <container-item-wrapper
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <a-row
      class="row-container"
      :gutter="options.gutter"
      :align="options.align"
      :justify="options.justify"
      :wrap="options.wrap"
    >
      <template v-for="(col, index) in element.children" :key="col.id">
        <mt-col-element
          :element="col"
          :central="central"
          :redact-state="redactState"
          :parent-list="element.children"
          :index-of-parent-list="index"
          :parent-element="element"
          :config="config"
        />
      </template>
    </a-row>
  </container-item-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import ContainerItemWrapper from "../components/container-item-wrapper.vue";
import MtColElement from "./mt-col-element.vue";

export default defineComponent({
  name: "MtRowElement",
  components: { ContainerItemWrapper, MtColElement },
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

<style lang="less" scoped>
@import "../../../styles/common.less";
.row-container {
  box-sizing: border-box;
  position: relative;
  margin: 0 !important;
  min-height: 38px !important;
}
</style>
