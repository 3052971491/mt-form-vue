<template>
  <a-tabs v-model:activeKey="elementActiveKey">
    <a-tab-pane :key="item.value" v-for="item in elementAreaList">
      <template #tab>
        <span>{{ t(item.label) }}</span>
      </template>
      <component :is="item.component" :central="central" :form-config="formConfig" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ElementLibrary from "./element-library.vue";
import TemplateLibrary from "./template-library.vue";
import ModalLibrary from "./modal-library.vue";
import GlobalCssLibrary from './global-css-library.vue';
import StructureTreeLibrary from "./structure-tree-library.vue";
import { t } from "/@/utils/i18n";
const props = defineProps({
  central: {
    type: Object,
    required: true,
  },
  formConfig: Object,
})
const elementActiveKey = ref("element-library");
const elementAreaList = [
  { label: "componentLib", value: "element-library", component: ElementLibrary },
  { label: "templateLib", value: "template-library", component: TemplateLibrary },
  { label: "globalCssLib", value: "global-css-library", component: GlobalCssLibrary },
  // { label: "modalLib", value: "modal-library", component: ModalLibrary },
  // { label: "componentHierarchyTree", value: "structure-tree-library", component: StructureTreeLibrary },
];
</script>
