<template>
  <div class="settvar-modal">
    <mt-modal v-model:visible="visible" title="数据源变量" @ok="handleOk">
      <mt-codemirror-editor v-model:value="code" @change="handleChange"></mt-codemirror-editor>
    </mt-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, toRefs } from "vue";
import MtModal from "/@/components/mt-modal.vue";
import MtCodemirrorEditor from "/@/components/codemirror/mt-codemirror-editor.vue";
export default defineComponent({
  name: "SettvarModal",
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
  },
  components: { MtModal, MtCodemirrorEditor },
  emits: ["update:formConfig"],
  setup(props, { emit }) {
    const { formConfig } = toRefs(props);
    const config = computed({
      get: () => formConfig.value,
      set: (value) => emit("update:formConfig", value),
    });
    const str = JSON.stringify(config.value.DSV, null, 2)
    const code = ref(str);
    const visible = ref(false);
    const handleOpen = () => {
      visible.value = true;
      const str = JSON.stringify(config.value.DSV, null, 2);
      code.value = str;
    };
    const handlecancel = () => {
      visible.value = false;
    };
    const handleOk = () => {
      try {
        config.value.DSV = JSON.parse(code.value);
        visible.value = false;
      } catch (error) {
        if (!code.value) {
          config.value.DSV = {}
          visible.value = false;
          return
        }
        config.value.DSV = code.value
        visible.value = false;
      }
    };
    function handleChange(val: string) {
      code.value = val;
    }
    return {
      visible,
      handleOpen,
      handlecancel,
      handleOk,
      config,
      code,
      handleChange,
    };
  },
});
</script>
