<template>
  <a-empty :image="imageValue" :class="!!!imageValue ? 'empty-image' : ''">
    <template #description>
      {{ props.description }}
    </template>
  </a-empty>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { Empty } from 'ant-design-vue';
import { t } from "/@/utils/i18n";
const props = defineProps({
  /** 描述 */
  description: {
    type: String,
    default: t('noData')
  },
  /** 
   * 图片 
   * Empty.PRESENTED_IMAGE_SIMPLE
   * Empty.PRESENTED_IMAGE_DEFAULT
   */
  image: {
    type: String,
  },
  hasShowImage: {
    type: Boolean,
    default: true,
  }
});

const imageValue = computed(() => {
  if (!props.hasShowImage) return false;
  if (!props.image) return Empty.PRESENTED_IMAGE_SIMPLE
  return props.image
})
</script>

<style lang="less" scoped>
  .empty-image {

    :deep(.ant-empty-image) {
      height: 0;
      margin-bottom: 0;
    }
    :deep(p) {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
</style>