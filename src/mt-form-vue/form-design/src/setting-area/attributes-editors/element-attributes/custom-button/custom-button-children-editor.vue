<template>
  <a-form-item :label="t('当前按钮组')" name="children">
    <a-row
      v-for="(item, index) in el.children"
      :key="index"
      justify="space-between"
      align="middle"
      :gutter="6"
      class="m-b-6"
    >
      <a-col :span="20">
        <a-input
          v-model:value="item.options.label"
          :placeholder="t('inputPlaceholder')"
          style="width: 100%"
        />
      </a-col>
      <a-col :span="4">
        <a-button @click="handleDelClick(index)"><delete-outlined /></a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-button @click="handleAddClick">
        <plus-outlined />
        {{ t("增加自定义按钮") }}
      </a-button>
    </a-row>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "CustomButtonChildrenEditor",
  components: { DeleteOutlined, PlusOutlined },
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
    const { element, central } = toRefs(props);
    const el = computed({
      get: () => {
        return element.value;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    /**
     * 新增
     */
    function handleAddClick() {
      const newEl = central.value.buildElementByType("template-button");
      el.value.children.push(newEl);
    }
    /**
     * 删除
     */
    function handleDelClick(index: number) {
      if (el.value.children.length < 1) {
        // message.warning(t("deleteCollapseErrorMsg"));
        return;
      }
      el.value.children.splice(index, 1);
    }
    return {
      t,
      el,
      handleAddClick,
      handleDelClick,
    };
  },
});
</script>

<style lang="less" scoped>
.m-b-6 {
  margin-bottom: 6px;
}
</style>
