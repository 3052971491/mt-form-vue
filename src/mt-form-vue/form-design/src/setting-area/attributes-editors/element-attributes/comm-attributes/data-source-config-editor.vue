<template>
  <a-form-item :label="t('源数据配置')" name="dataSourceConfig">
    <a-button @click="handleConfigClick">{{t("config")}}</a-button>
    <data-source-config-modal ref="dataSourceConfigModal" v-model:element="element" :central="central">
    </data-source-config-modal>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
import DataSourceConfigModal from "/@/mt-form-vue/form-design/src/components/modal-area/data-source-config-modal.vue";
export default defineComponent({
  name: "DataSourceConfigEditor",
  components: { DataSourceConfigModal },
  props: {
    central: {
      type: Object,
      required: true,
      default: () => { },
    },
    element: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  emits: ["update:element"],
  setup(props, { emit }) {
    const { element } = toRefs(props);
    const options = computed({
      get: () => {
        return element.value.options;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    const dataSourceConfigModal = ref()
    function handleConfigClick() {
      dataSourceConfigModal.value.handleOpen();
    };
    return {
      t,
      options,
      handleConfigClick,
      dataSourceConfigModal,
    };
  },
});
</script>
