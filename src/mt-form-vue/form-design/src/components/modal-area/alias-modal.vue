<template>
  <div class="modal">
    <mt-modal v-model:visible="visible" title="字段规则" @ok="handleOk">
      <a-form ref="form" autocomplete="off" :model="data.form" layout="vertical">
        <a-form-item label="label" name="label" :rules="[{ required: true, message: t('fieldCannotEmpty') }]">
          <a-input v-model:value="data.form.label" :placeholder="t('inputPlaceholder')" />
        </a-form-item>
        <a-form-item label="value" name="value" :rules="[{ required: true, message: t('fieldCannotEmpty') }]">
          <a-input v-model:value="data.form.value" :placeholder="t('inputPlaceholder')" />
        </a-form-item>
        <a-form-item label="disabled" name="disabled" :rules="[{ required: true, message: t('fieldCannotEmpty') }]">
          <a-input v-model:value="data.form.disabled" :placeholder="t('inputPlaceholder')" />
        </a-form-item>
        <a-form-item v-if="hasChildren" label="children" name="children" :rules="[{ required: true, message: t('fieldCannotEmpty') }]">
          <a-input v-model:value="data.form.children" :placeholder="t('inputPlaceholder')" />
        </a-form-item>
      </a-form>
    </mt-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed } from "vue";
import MtModal from "/@/components/mt-modal.vue";
import { cloneDeep } from "lodash-es";
import { alias } from '../../event/element-event/basic-element/index-typing';
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "AliasModal",
  components: {
    MtModal,
  },
  props: {
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
    const visible = ref(false);
    const form = ref();
    const data = reactive({
      form: {} as alias,
    });
    const hasChildren = computed(() => {
      const type = element.value.type;
      // 过滤组件
      const arr: string[] = [];
      return arr.includes(type)
    })
    /**
     * 打开弹框
     */
    const handleOpen = () => {
      visible.value = true;
      data.form = cloneDeep(options.value.alias);
    };
    /**
     * 关闭弹框
     */
    const handleCancel = () => {
      visible.value = false;
    };
    /**
     * 确认弹框
     */
    const handleOk = () => {
      form.value.validate().then((res: alias) => {
        options.value.alias = cloneDeep(res);
        handleCancel();
      });
    };
    return {
      t,
      form,
      visible,
      handleOpen,
      handleCancel,
      handleOk,
      data,
      hasChildren,
    };
  },
});
</script>
