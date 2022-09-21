<template>
  <div class="element-list">
    <div class="element-container" v-for="(item, index) in elementList" :key="index">
      <div class="element-title">{{ title(item) }}</div>
      <mt-draggable v-if="item.list.length > 0" :list="item.list" :central="central" />
      <mt-empty v-else :description="t('noData')" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import {
  basicElement,
  businessElement,
  containerElement,
  otherElement,
} from "../event/element-event/index";
import { FormDesignElementTyping } from "/@/types/form-design/index-typing";
import MtDraggable from "../components/element-draggable.vue";
import MtEmpty from "/@/components/mt-empty.vue";
import { t } from "/@/utils/i18n";
interface elementListTyping {
  /** 组件类型名称 */
  label: string;
  /** 组件列表 */
  list: Array<FormDesignElementTyping>;
}
const props = defineProps({
  central: {
    type: Object,
    required: true,
  },
  formConfig: Object,
})
/**
  * 组件库
  * 过滤不需要展示的容器组件
  */
const elementList: elementListTyping[] = [
  { label: "basicsComponent", list: basicElement },
  { label: "businessComponent", list: businessElement },
  {
    label: "containerComponent",
    list: containerElement.filter((item) => {
      return !item.internal;
    }),
  },
  { label: 'otherComponent', list: otherElement.filter((item) => {
      return !item.internal;
    }),}
];
const title = computed(() => (item: elementListTyping) => {
  return t(item.label)
})
</script>

<style lang="less" scoped>
@import "../styles/common.less";

.element-list {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;

  .element-container {
    // background: @white;
    border-radius: 4px;
    margin-bottom: 18px;

    .element-title {
      font-size: 14px;
      color: @primary-font-color;
      line-height: 30px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
