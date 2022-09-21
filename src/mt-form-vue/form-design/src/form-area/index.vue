<template>
  <a-form
    v-bind="{
      layout: config.layout,
      'label-align': config.labelAlign,
      'hide-required-mark': config.hideRequiredMark,
      'label-col': {
        style: {
          width: config.labelWidth && config.labelWidth > 0 ? config.labelWidth + 'px' : 'auto',
        },
      },
    }"
    :class="[config.customStyles]"
  >
    <form-draggable
      :list="central.data.elementList"
      :central="central"
      :add="handleAddElementClick"
      :update="handleUpdateElementClick"
    />
  </a-form>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import FormDraggable from "../components/form-draggable.vue";
export default defineComponent({
  name: "FormArea",
  components: { FormDraggable },
  provide() {
    return {};
  },
  props: {
    central: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { central } = toRefs(props);
    /**
     * 表单配置
     */
    const config = computed(() => {
      return central.value.data.formConfig;
    });
    /**
     * 从一个数组拖拽到另外一个数组时触发的事件
     */
    const handleAddElementClick = ({newIndex: index}: {newIndex: number}) => {
      const newIndex = index;
      if (!!central.value.data.elementList[newIndex]) {
        central.value.selected(central.value.data.elementList[newIndex]);
      }
      central.value.updateHistoryData();
    };
    /**
     * 拖拽变换位置时触发的事件
     */
    const handleUpdateElementClick = () => {
      central.value.updateHistoryData();
    };
    return {
      config,
      handleAddElementClick,
      handleUpdateElementClick,
    };
  },
});
</script>
