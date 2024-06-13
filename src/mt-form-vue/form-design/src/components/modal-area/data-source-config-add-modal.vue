<template>
  <div class="modal">
    <mt-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <a-form ref="form" autocomplete="off" :model="element.option">
        <a-form-item name="label" label="选项名" :rules="[{ required: true, message: '该字段不能为空' }]">
          <a-input v-model:value="element.option.label" :placeholder="t('inputPlaceholder')" />
        </a-form-item>
        <a-form-item name="value" label="选项值" :rules="[{ required: true, message: '该字段不能为空' }]">
          <mt-input v-model:value="element.option.value" :placeholder="t('inputPlaceholder')"></mt-input>
        </a-form-item>
        <a-form-item name="disabled" label="是否禁用">
          <a-switch v-model:checked="element.option.disabled" />
        </a-form-item>
      </a-form>
    </mt-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed, watch } from "vue";
import MtModal from "/@/components/mt-modal.vue";
import MtInput from "/@/components/mt-input.vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "DataSourceConfigAddModal",
  components: {
    MtModal,
    MtInput,
  },
  props: {
    status: {
      type: String,
      required: true,
      default: 'add',
    },
    value: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  emits: ["update:value", 'save'],
  setup(props, { emit }) {
    const { value, status } = toRefs(props);
    const visible = ref(false);
    const form = ref();
    let element = reactive<any>({
      option: {
        label: null,
        value: undefined,
        disabled: false,
      }
    });
    watch(value, (val: any) => {
      element.option = val;
    })
    const title = computed(() => {
      return !value ? '新增' : '编辑'
    })

    /**
     * 打开弹框
     */
    const handleOpen = () => {
      visible.value = true;
      element.option = value.value;
    };
    /**
     * 关闭弹框
     */
    const handleCancel = () => {
      form.value.resetFields()
      element.option = {
        label: null,
        value: undefined,
        disabled: false,
      }
      visible.value = false;
    };
    /**
     * 确认弹框
     */
    const handleOk = () => {
      form.value.validate().then((res) => {
        emit('save', res)
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
      element,
      title,
    };
  },
});
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.justify-between {
  justify-content: space-between;
}
</style>
