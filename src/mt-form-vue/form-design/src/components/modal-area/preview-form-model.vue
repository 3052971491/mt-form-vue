<template>
  <div class="preview-form-model">
    <mt-modal
      v-model:visible="visible"
      title="表单预览"
      fullscreen
      wrap-class-name="full-modal"
      destroyOnClose
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="preview-container">
        <a-divider type="vertical" style="height: 100%" />
        <div class="preview-area">
          <form-render
            ref="mtFormRenderRef"
            :formJson="jsonData"
            :formData="{}"
          ></form-render>
        </div>
        <a-divider type="vertical" style="height: 100%" />
        <div class="operating-area">
          <a-alert
            message="更多API请参考xxx文档"
            type="warning"
            banner
            style="margin-bottom: 10px"
          />
          <a-row :gutter="[12, 12]" wrap>
            <a-col>
              <a-button @click="handleGetFormData">获取数据</a-button>
            </a-col>
            <a-col>
              <a-button @click="handleResetFields">重置表单</a-button>
            </a-col>
            <a-col>
              <a-button @click="handleDisableFields(true)">禁用编辑</a-button>
            </a-col>
            <a-col>
              <a-button @click="handleDisableFields(false)">恢复编辑</a-button>
            </a-col>
          </a-row>
          <mt-json-editor
            class="json-editor"
            v-model:value="jsonValue"
          ></mt-json-editor>
        </div>
      </div>
    </mt-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, computed } from "vue";
import MtModal from "/@/components/mt-modal.vue";
import MtCodemirrorEditor from "/@/components/codemirror/mt-codemirror-editor.vue";
import FormRender from "/@/mt-form-vue/form-render/src/form-render.vue";
import MtJsonEditor from "/@/components/mt-json-editor.vue";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  name: "PreviewFormModel",
  props: {
    central: {
      type: Object,
      required: true,
    },
  },
  components: { MtModal, MtCodemirrorEditor, FormRender, MtJsonEditor },
  setup(props) {
    const { central } = toRefs(props)
    const mtFormRenderRef = ref();
    const jsonValue = ref();
    const visible = ref(false);
    const jsonData = ref(null)
    const handleOpen = () => {
      visible.value = true;
      jsonData.value = cloneDeep(central.value.getStoredData())
    };
    const handleCancel = () => {
      visible.value = false;
    };
    const handleOk = () => {
      visible.value = false;
    };
    
    /**
     * 获取数据
     */
    function handleGetFormData() {
      mtFormRenderRef.value.getFormData().then((valid: any) => {
        jsonValue.value = valid;
      });
    }
    /**
     * 重置表单
     */
    function handleResetFields() {
      mtFormRenderRef.value.resetForm();
      jsonValue.value = null;
    }
    /**
     * 禁用表单
     */
    function handleDisableFields(val: boolean) {
      mtFormRenderRef.value.setDisabledForm(val);
    }
    return {
      jsonData,
      visible,
      handleOpen,
      handleCancel,
      handleOk,
      jsonValue,
      mtFormRenderRef,
      handleGetFormData,
      handleResetFields,
      handleDisableFields,
    };
  },
});
</script>
<style lang="less" scoped>
.preview-container {
  width: 100%;
  height: 100%;
  display: flex;

  .preview-area {
    flex: 1;
  }
  .operating-area {
    width: 400px;
    position: relative;

    .json-editor {
      margin-top: 12px;
    }
  }
}
</style>
