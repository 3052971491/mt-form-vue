<template>
  <static-item-wrapper
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <div class="static-text-box">
      {{options.content}}
    </div>
  </static-item-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import StaticItemWrapper from '../components/static-item-wrapper.vue';
  import ComponentPropsMixin from "../mixins/component-props-mixin";
  import ComponentComputedMixin from "../mixins/component-computed-mixin";
  export default defineComponent({
    name: 'MtStaticTextElement',
    components: { StaticItemWrapper },
    mixins: [ComponentPropsMixin, ComponentComputedMixin],
  });
</script>
