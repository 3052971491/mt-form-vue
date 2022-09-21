<template>
  <a-button
    v-if="redactState ? true : !options.hidden"
    v-bind="{
      block: options.block,
      danger: options.danger,
      ghost: options.ghost,
      shape: options.shape,
      type: options.type,
      size: options.size,
      disabled: redactState ? false : options.disabled,
      loading: options.loading,
    }"
    @click.stop="handleBtnClick(element)"
    class="button-template"
    >{{ options.label }}</a-button
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentPropsMixin from "../mixins/component-props-mixin";
import ComponentComputedMixin from "../mixins/component-computed-mixin";
import { Position2 } from '/@/enums/form-design/element-enum';
import { CustomButtonTyping } from "/@/types/form-design/other-element/custom-button";
export default defineComponent({
  name: "ButtonTemplate",
  mixins: [ComponentPropsMixin, ComponentComputedMixin],
  computed: {
      formatJustify() {
        return (justify: string) => {
          switch (justify) {
            case Position2.LEFT:
              return 'start';
            case Position2.RIGHT:
              return 'end';
            default:
              return justify;
          }
        };
      },
    },
    methods: {
      handleBtnClick(element: CustomButtonTyping) {
        if (this.redactState && !!this.central) {
          // 编辑状态选中
          this.central.selected(element);
        } else {
          // 预览状态执行点击回调
          const { eventConfig } = this.element.options;
          switch (eventConfig.mode) {
            case 'system':
              // 系统行为
              if (!!eventConfig.systemAction) {
              }
              break;
            case 'custom':
              // 自定义事件
              if (!!eventConfig.event) {
                const fn = new Function(eventConfig.event);
                fn.call(this);
              }
              break;
            default:
              break;
          }
        }
      },
    },
});
</script>
<style lang="less">
  .button-template {
    margin-right: 6px;
  }
</style>