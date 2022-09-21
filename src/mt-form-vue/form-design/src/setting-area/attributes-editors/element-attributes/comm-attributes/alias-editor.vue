<template>
  <a-form-item :label="t('字段规则')" name="alias">
    <a-button @click="handleConfigClick">{{t("config")}}</a-button>
    <alias-modal ref="aliasModal" v-model:element="element"></alias-modal>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
import AliasModal from "/@/mt-form-vue/form-design/src/components/modal-area/alias-modal.vue";
export default defineComponent({
  name: "AliasEditor",
  components: {
    AliasModal
  },
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
    const aliasModal = ref();
    const options = computed({
      get: () => {
        return element.value.options;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });

    function handleConfigClick() {
      aliasModal.value.handleOpen();
    };
    return {
      t,
      options,
      handleConfigClick,
      aliasModal
    };
  },
});
</script>
