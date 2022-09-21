<template>
  <a-drawer
    width="30%"
    placement="left"
    :title="t('componentHierarchyTree')"
    :closable="false"
    :visible="visible"
    destroy-on-close
    @close="onClose"
  >
    <a-spin :spinning="loading">
      <a-input
        v-model:value="searchValue"
        style="margin-bottom: 8px"
        :placeholder="t('namePlaceholder')"
      />
      <mt-empty v-if="data.structureTree.length < 1"></mt-empty>
      <a-tree
        :tree-data="data.structureTree"
        showLine
        defaultExpandAll
        showIcon
        @select="handleSelect"
      >
        <template #title="{ node, title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ node.elementId + ' - ' + title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ node.elementId+ ' - ' + title }}</span>
        </template>
      </a-tree>
    </a-spin>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import MtEmpty from "/@/components/mt-empty.vue";
import {} from "@ant-design/icons-vue";
import type { TreeProps } from "ant-design-vue";
import { t } from "/@/utils/i18n";
export default defineComponent({
  name: "StructureTreeDrawer",
  components: { MtEmpty },
  props: {
    central: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const { central } = toRefs(props);
    const loading = ref(false);
    const visible = ref(false);
    let data = reactive({
      structureTree: [],
    });
    /**
     * 打开
     */
    const onShow = () => {
      visible.value = true;
      buildTreeNode(central.value.data.elementList, data.structureTree);
    };
    /**
     * 关闭
     */
    const onClose = () => {
      data.structureTree = [];
      searchValue.value = "";
      visible.value = false;
    };
    /**
     * 递归生成树结构
     * tudo
     * 待维护剩余容器组件
     */
    function buildTreeNode(list: any, data: TreeProps["treeData"]) {
      list.map((item: any) => {
        if (item.type == "row") {
          const obj = {
            title: item.options.label || item.name,
            key: item.elementId,
            node: item,
            children: [],
          };
          buildTreeNode(item.children, obj.children);
          data.push(obj);
        } else if (item.type == "col") {
          const obj = {
            title: item.options.label || item.name,
            key: item.elementId,
            node: item,
            children: [],
          };
          buildTreeNode(item.list, obj.children);
          data.push(obj);
        } else if (item.type == "card") {
          const obj = {
            title: item.options.label || item.name,
            key: item.elementId,
            node: item,
            children: [],
          };
          buildTreeNode(item.list, obj.children);
          data.push(obj);
        } else {
          const obj = {
            title: item.options.label || item.name,
            key: item.elementId,
            node: item,
          };
          data.push(obj);
        }
      });
    }
    /**
     * 搜索
     */
    const searchValue = ref("");
    function handleSelect(selectedKeys, { node }) {
      central.value.selected(node.node);
    }
    return {
      t,
      loading,
      visible,
      onClose,
      onShow,
      data,
      searchValue,
      handleSelect,
    };
  },
});
</script>
