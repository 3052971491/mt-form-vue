<template>
  <form-item-wrapper
    :element="element" 
    :central="central" 
    :redact-state="redactState" 
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" 
    :parent-element="parentElement" 
    :rules="[]"
  >
    <div class="html-text-box" v-html="modelValue"></div>
  </form-item-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import StaticItemWrapper from '../components/static-item-wrapper.vue';
  import ComponentsMixin from "../mixins/components-mixin";
  export default defineComponent({
    name: 'MtHtmlTextElement',
    components: { StaticItemWrapper },
    mixins: [ComponentsMixin],
  });
</script>
<style lang="less" scoped>
  :deep(.ant-form-item) {
    margin-bottom: 0;
  }
</style>
