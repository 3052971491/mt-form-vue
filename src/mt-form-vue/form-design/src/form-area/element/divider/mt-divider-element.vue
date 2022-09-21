<template>
  <container-item-wrapper
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <a-divider
      v-bind="{
        dashed: options.dashed,
        orientation: options.orientation,
        orientationMargin: options.orientationMargin,
        plain: options.plain,
        type: options.type
      }"
    >
      {{options.text}}
    </a-divider>
  </container-item-wrapper>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';

  export default defineComponent({
    name: 'MtDividerElement',
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

      return {
        options
      }
    },
  });
</script>
