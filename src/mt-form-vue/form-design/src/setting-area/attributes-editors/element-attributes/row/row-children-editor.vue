<template>
  <a-form-item label="当前栅格列" name="children">
    <a-row
      v-for="(item, index) in el.children"
      :key="index"
      justify="space-between"
      align="middle"
      :gutter="6"
      class="m-b-6"
    >
      <a-col :span="6"> 栅格{{ index + 1 }} </a-col>
      <a-col :span="14">
        <a-input-number
          v-model:value="item.options.span"
          placeholder="请输入"
          style="width: 100%"
          :min="0"
        />
      </a-col>
      <a-col :span="4">
        <a-button @click="handleDelClick(index)"
          ><delete-outlined
        /></a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-button @click="handleAddClick"> <plus-outlined />增加栅格 </a-button>
    </a-row>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "RowChildrenEditor",
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
     * 新增栅格col组件
     */
    function handleAddClick() {
      const newEl = central.value.buildContainerElement("col");
      el.value.children.push(newEl);
    }
    /**
     * 删除栅格col组件
     */
    function handleDelClick(index: number) {
      el.value.children.splice(index, 1);
    }
    return {
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
