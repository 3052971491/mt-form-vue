<template>
  <a-drawer
    width="50%"
    placement="right"
    title="JSON预览"
    :closable="false"
    :visible="visible"
    destroy-on-close
    @close="onClose"
  >
    <a-spin :spinning="spinning">
      <mt-json-editor v-model:value="json" />
    </a-spin>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, toRefs } from "vue";
import MtJsonEditor from "/@/components/mt-json-editor.vue";
// import { cloneDeep } from 'lodash-es';
export default defineComponent({
  name: "JsonPreview",
  components: { MtJsonEditor },
  props: {
    central: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const { central } = toRefs(props);
    const visible = ref(false);
    const spinning = ref(false);
    /**
     * 打开
     */
    const onShow = () => {
      visible.value = true;
    };
    /**
     * 关闭
     */
    const onClose = () => {
      visible.value = false;
    };
    const json = computed(() => {
      return central.value.getStoredData();
    });
    return {
      visible,
      onShow,
      onClose,
      spinning,
      json,
    };
  },
});
</script>
