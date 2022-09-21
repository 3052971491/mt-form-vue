import { toRefs, ref } from "vue";
export default function () {
  const previewFormRef = ref();
  /**
   * 打开全屏弹框
   */
  function handlePreviewFormClick() {
    previewFormRef.value.handleOpen();
  }
  return {
    previewFormRef,
    handlePreviewFormClick,
  };
}
