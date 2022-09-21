<template>
  <a-form-item label="事件配置">
    <a-button @click="handleOpenConfigClick">配置</a-button>
  </a-form-item>
  <event-handler-drawer ref="eventRef" v-model:value="options.eventConfig.event"></event-handler-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue';
import { t } from "/@/utils/i18n";
import EventHandlerDrawer from "/@/mt-form-vue/form-design/src/components/popup-area/event-handler-drawer.vue";
export default defineComponent({
  name: 'TemplateButtonEventConfigEditor',
  components: { EventHandlerDrawer },
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
        return element.value.options;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    const eventRef = ref();
    function handleOpenConfigClick() {
      eventRef.value.onShow();
    }
    return {
      t,
      options,
      handleOpenConfigClick,
      eventRef,
    };
  },
});
</script>
