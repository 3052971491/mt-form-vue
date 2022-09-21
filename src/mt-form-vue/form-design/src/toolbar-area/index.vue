<template>
  <div class="toolbar-area-container">
    <!-- 左侧操作栏区域 -->
    <div class="left-area">
      <a-space>
        <a-tooltip :title="t('back')">
          <a-button
            @click="central.undoHistoryStep()"
            :disabled="central.undoEnabled()"
          >
            <undo-outlined />
          </a-button>
        </a-tooltip>
        <a-tooltip :title="t('forward')">
          <a-button
            @click="central.redoHistoryStep()"
            :disabled="central.redoEnabled()"
          >
            <redo-outlined />
          </a-button>
        </a-tooltip>
        <a-tooltip :title="t('archive')">
          <a-button @click="handeSaveClick">
            <cloud-upload-outlined />
          </a-button>
        </a-tooltip>
        <a-tooltip :title="t('componentHierarchyTree')">
          <a-button @click="handleShowStructureTreeClick">
            <partition-outlined />
          </a-button>
        </a-tooltip>
      </a-space>
      <structure-tree-drawer ref="structureTreeRef" :central="central" />
    </div>
    <!-- 右侧操作栏区域 -->
    <div class="right-area">
      <a-button type="link" size="small" @click="clear"> {{ t('clear') }} </a-button>
      <a-button type="link" size="small" @click="handlePreviewFormClick">
        {{ t('preview') }}
      </a-button>
      <a-button type="link" size="small" @click="handleJsonClick">
        {{ t('exportJSON') }}
      </a-button>
      <!-- <a-button type="link" size="small" @click="none"> {{ t('generateSFC') }} </a-button>
      <a-button type="link" size="small" @click="handleChangeLanguages"
        >切换语言</a-button
      > -->
      <json-preview ref="jsonPreview" :central="central" />
      <preview-form-model ref="previewFormRef" :central="central" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";
import {
  PartitionOutlined,
  UndoOutlined,
  RedoOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons-vue";
import JsonPreview from "../components/popup-area/json-preview.vue";
import StructureTreeDrawer from "../components/popup-area/structure-tree-drawer.vue";
import PreviewFormModel from "../components/modal-area/preview-form-model.vue";
import { message } from "ant-design-vue";
import useStructureTree from "./hooks/useStructureTree";
import usePreviewForm from "./hooks/usePreviewForm";
import { t, getLocale, automaticChangeLocale } from "/@/utils/i18n";
export default defineComponent({
  name: "ToolbarArea",
  components: {
    PartitionOutlined,
    UndoOutlined,
    RedoOutlined,
    CloudUploadOutlined,
    JsonPreview,
    StructureTreeDrawer,
    PreviewFormModel,
  },
  props: {
    central: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { central } = toRefs(props);
    const jsonPreview = ref();

    function none() {
      message.warn("暂未开放, 敬请期待");
    }
    /**
     * 清空组件
     */
    function clear() {
      central.value.clear();
    }
    /**
     * 导出/导入JSON
     * @param type 是否是导出还是导入
     */
    function handleJsonClick() {
      jsonPreview.value.onShow();
    }
    /**
     * 层次架构树hooks
     */
    const { structureTreeRef, handleShowStructureTreeClick } =
      useStructureTree();
    /**
     * 预览
     */
    const { previewFormRef, handlePreviewFormClick } = usePreviewForm();
    /**
     * 存档当前数据
     */
    function handeSaveClick() {
      central.value.saveCurrentHistoryStep();
      message.success("存档成功");
    }
    function handleChangeLanguages() {
      automaticChangeLocale();
    }
    return {
      none,
      clear,
      handleJsonClick,
      jsonPreview,
      structureTreeRef,
      handleShowStructureTreeClick,
      previewFormRef,
      handlePreviewFormClick,
      handeSaveClick,
      t,
      getLocale,
      handleChangeLanguages,
    };
  },
});
</script>

<style lang="less" scoped>
.toolbar-area-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-area {
  }

  .right-area {
  }
}
</style>
