<template>
  <a-form-item label="高度" >
    <a-input-group>
    <a-row>
      <a-col :span="17">
        <a-input v-model:value="options.height" placeholder="请输入" :maxlength="100" />
      </a-col>
      <a-col :span="7">
        <a-select v-model:value="options.heightUnit" placeholder="请输入" :options="selectOptions" style="width: 100% !important" />
      </a-col>
    </a-row>
  </a-input-group>
</a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { t } from "/@/utils/i18n";
import { PixelUnitEnum } from "/@/enums/form-design/element-enum";
export default defineComponent({
  name: "HeightEditor",
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
    const selectOptions = [
      { label: 'PX', value: PixelUnitEnum.PIXEL },
      { label: '%', value: PixelUnitEnum.PERCENTAGE },
    ]
    return {
      t,
      options,
      selectOptions,
    };
  },
});
</script>
