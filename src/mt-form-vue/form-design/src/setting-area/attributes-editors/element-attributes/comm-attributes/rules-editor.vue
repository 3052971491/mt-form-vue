<template>
  <a-form-item :label="t('validRules')" name="rules">
    <a-button @click="handleRuleConfigClick">{{t("config")}}</a-button>
    <rules-modal ref="rulesModal" :element="element"></rules-modal>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, ref } from "vue";
import RulesModal from "../../../../components/modal-area/rules-modal.vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "RulesEditor",
  components: { RulesModal },
  props: {
    central: {
      type: Object,
      required: true,
      default: () => {},
    },
    element: {
      type: Object,
      required: true,
      default: () => {},
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
    // 获取弹框dom
    const rulesModal = ref();
    //点击事件: 设置规则
    const handleRuleConfigClick = () => {
      rulesModal.value.handleOpen();
    };
    return {
      t,
      options,
      rulesModal,
      handleRuleConfigClick,
    };
  },
});
</script>
