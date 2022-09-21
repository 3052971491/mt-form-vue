<template>
  <div><mt-empty :description="t('expect')" /></div>
</template>

<script lang="ts" setup>
import MtEmpty from "/@/components/mt-empty.vue";
import { t } from "/@/utils/i18n";
const props = defineProps({
  central: {
    type: Object,
    required: true,
  },
  formConfig: Object,
})
</script>