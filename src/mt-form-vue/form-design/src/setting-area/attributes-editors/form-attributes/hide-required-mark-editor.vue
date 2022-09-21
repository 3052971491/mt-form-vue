<template>
  <a-form-item :label="t('hiddenFormMandatoryTag')" name="size">
    <a-switch v-model:checked="options.hideRequiredMark" />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "HideRequiredMarkEditor",
  components: {},
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
        return element.value;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    return {
      t,
      options,
    };
  },
});
</script>
