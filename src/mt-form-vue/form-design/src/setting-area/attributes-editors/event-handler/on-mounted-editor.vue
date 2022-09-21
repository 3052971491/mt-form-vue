<template>
  <a-form-item class="event-handler-form-item" label="onMounted">
    <a-button shape="round" @click="handleClick">
      <template #icon>
        <edit-filled />
      </template>
      {{ t("editCode") }}</a-button
    >
    <event-handler-drawer
      ref="eventRef"
      v-model:value="options.onMounted"
    ></event-handler-drawer>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, ref } from "vue";
import { EditFilled } from "@ant-design/icons-vue";
import EventHandlerDrawer from "../../../components/popup-area/event-handler-drawer.vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "OnMountedEditor",
  components: { EditFilled, EventHandlerDrawer },
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
        // 解决当前tabs是表单设置时没有options
        if (element.value.hasOwnProperty("formId")) {
          return element.value;
        }
        return element.value.options;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    const eventRef = ref();
    function handleClick() {
      eventRef.value.onShow();
    }
    return {
      t,
      options,
      eventRef,
      handleClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../../../styles/index.less";
</style>
