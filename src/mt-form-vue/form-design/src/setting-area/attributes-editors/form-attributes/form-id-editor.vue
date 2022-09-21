<template>
  <a-form-item :label="t('id')" name="formId">
    <div class="flex-center">
      <span class="identification">{{ options.formId }}</span>
      <a-button type="text" @click="handleCopyClick" class="code-clipboard" :data-clipboard-text="options.formId">
        <copy-outlined />
      </a-button>
    </div>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
import { CopyOutlined } from "@ant-design/icons-vue";
import useClipboard from '/@/hooks/useClipboard'
export default defineComponent({
  name: "FormIdEditor",
  components: { CopyOutlined },
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
        return element.value;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    function handleCopyClick() {
      const { copy } = useClipboard();
      copy('code-clipboard')
    }
    return {
      t,
      options,
      handleCopyClick,
    };
  },
});
</script>
<style lang="less" scoped>
.flex-center {
  display: flex;
  align-items: center;
}

.identification {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
