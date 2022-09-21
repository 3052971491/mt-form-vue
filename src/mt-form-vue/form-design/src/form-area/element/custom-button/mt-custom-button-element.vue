<template>
  <static-item-wrapper
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <a-row>
      <a-col span="24" :style="formatJustify(options.position)">
        <div v-if="redactState && element.children.length < 1">
          <mt-empty ></mt-empty>
        </div>
        <button-template
          v-for="(item, index) in element.children"
          :element="item"
          :central="central"
          :key="item.elementId"
          :parent-list="item.list"
          :index-of-parent-list="index"
          :parent-element="null"
          :redact-state="redactState"
          :class="redactState ? 'z-index-9' : ''"
        >
        </button-template>
      </a-col>
    </a-row>
  </static-item-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentPropsMixin from "../mixins/component-props-mixin";
import ComponentComputedMixin from "../mixins/component-computed-mixin";
import { Position2 } from '/@/enums/form-design/element-enum';
import ButtonTemplate from './button-template.vue';
import MtEmpty from "/@/components/mt-empty.vue";
import StaticItemWrapper from '../components/static-item-wrapper.vue'
export default defineComponent({
  name: "MtCustomButtonElement",
  mixins: [ComponentPropsMixin, ComponentComputedMixin],
  components: {StaticItemWrapper,ButtonTemplate, MtEmpty},
  computed: {
      formatJustify() {
        return (justify: Position2) => {
          if (this.element.children.length < 1) {
            return 'center'
          }
          const style = {
            display: 'flex',
            justifyContent: justify
          }
          return style
        };
      },
    },
});
</script>
<style lang="less" scoped>
  .z-index-9 {
    z-index: 9;
  }
</style>