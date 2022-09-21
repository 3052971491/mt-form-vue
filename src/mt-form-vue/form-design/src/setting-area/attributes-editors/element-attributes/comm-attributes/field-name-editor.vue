<template>
  <a-form-item :label="t('fieldName')" name="__fieldName__">
    <!-- <a-select v-model:value="options.__fieldName__" placeholder="请选择" allowClear show-search /> -->
    <a-input v-model:value="options.__fieldName__"></a-input>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs, onMounted, watch } from "vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "FieldNameEditor",
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
        return element.value.options;
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
