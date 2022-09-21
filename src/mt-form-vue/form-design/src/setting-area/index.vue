<template>
  <component :is="type" :central="central" :form-config="formConfig" />
</template>

<script lang="ts" setup>
import { formConfigTyping } from "/@/types/form-design/form/form-config-typing";
import { t } from "/@/utils/i18n";
const props = defineProps<{
  /** 类型 */
  type: Object,
  /** 海克斯核心 */
  central: Object,
  /** 表单配置 */
  formConfig: formConfigTyping,
}>();
</script>
