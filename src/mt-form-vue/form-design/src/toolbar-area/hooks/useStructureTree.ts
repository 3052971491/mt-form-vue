import { toRefs, ref } from "vue";

export default function () {
  const structureTreeRef = ref();
  /**
   * 显示组织层次架构树
   */
  function handleShowStructureTreeClick() {
    structureTreeRef.value.onShow();
  }
  return {
    structureTreeRef,
    handleShowStructureTreeClick,
  };
}
