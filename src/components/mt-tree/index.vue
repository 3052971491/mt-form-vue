<template>
  <div class="mt-tree" :loading="loading">
    <template v-if="!!hasShowHeader">
      <div class="header">
        <div>
          <slot name="headerTitle">树</slot>
        </div>
        <div>
          <slot name="headerExtra"></slot>
        </div>
      </div>
      <a-divider style="margin: 12px 0" />
    </template>
    <a-tree v-if="hasEmpty" v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys" :tree-data="treeDataList" v-bind="getProps()" @check="check" @dragend="dragend"
      @dragenter="dragenter" @dragleave="dragleave" @dragover="dragover" @dragstart="dragstart" @drop="drop"
      @expand="expand" @load="load" @rightClick="rightClick" @select="select">
      <template #icon="icon">
        <slot name="icon" :icon="icon"></slot>
      </template>
      <template #title="node">
        <slot name="title" :node="node">{{ node }}</slot>
      </template>
    </a-tree>
    <mt-empty class="in-middle" v-else />
  </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { TreeProps } from 'ant-design-vue';
import {
  DownOutlined,
  CarryOutOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { Tree } from 'ant-design-vue';
import MtEmpty from '/@/components/mt-empty.vue'
const { selectedKeys, expandedKeys, checkedKeys, ...propsa } = Tree.props;
export default defineComponent({
  name: 'mt-tree',
  props: {
    ...propsa,
    /** 数据加载接口 */
    fetch: {
      type: Function,
      required: true,
      default: () => { }
    },
    hasShowHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /** 是否处于加载状态 */
      loading: false,
      /** （受控）展开指定的树节点 */
      expandedKeys: [],
      /** （受控）设置选中的树节点 */
      selectedKeys: [],
      /** （受控）选中复选框的树节点 */
      checkedKeys: [],
      /** mt-tree 数据 */
      treeDataList: [] as TreeProps['treeData'],
      /** mt-tree 配置对象 */
      treeProps: {} as any,
    };
  },
  emits: [
    'fetch-success',
    'fetch-error',
    'add-click',
    'check',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'expand',
    'load',
    'rightClick',
    'select',
  ],
  components: {
    DownOutlined,
    CarryOutOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    FileOutlined,
    MtEmpty
  },
  created() {
    this.initTreeProps();
  },
  mounted() {
    this.initTreeDataList();
  },
  watch: {},
  computed: {
    /** 是否有数据 */
    hasEmpty() {
      return !!this.getTreeDataList() && this.getTreeDataList().length > 0;
    },
  },
  methods: {
    /********************************************************** 组件外部实现使用方法 start ************************************************************************ */

    /** 获取 mt-tree loading 状态 */
    getLoading() {
      return this.loading;
    },
    /** 设置 mt-tree loading 状态 */
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    /** 获取 mt-tree 某个配置 */
    getProp(key: string) {
      return this.treeProps.hasOwnProperty(key) ? this.treeProps[key] : null;
    },
    /** 获取 mt-tree 配置对象 */
    getProps() {
      return { ...this.$slots, ...this.treeProps };
    },
    /** 设置 mt-tree 配置对象 某一项 */
    setProp(key: string, value: any) {
      this.treeProps[key] = value;
    },
    /** 设置 mt-tree 整个配置对象 */
    setProps(treeProps: any) {
      this.treeProps = treeProps;
    },
    /** 获取 mt-tree 数据 */
    getTreeDataList() {
      if (!this.treeDataList) return [];
      return this.treeDataList;
    },
    /** 设置 mt-tree 数据 */
    setTreeDataList(val: any) {
      this.treeDataList = val;
    },
    /** 刷新数据 */
    reload() {
      this.initTreeDataList();
    },
    /********************************************************** 组件外部实现使用方法 end ************************************************************************ */
    /********************************************************** 组件内部实现使用方法 start ************************************************************************ */

    /** 初始化 mt-tree 默认配置对象 */
    initTreeProps() {
      const obj = {
        /** 是否自动展开父节点 */
        autoExpandParent: false,
        /** 是否节点占据一行 */
        blockNode: true,
        /** 节点前添加 Checkbox 复选框 */
        checkable: false,
        /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
        checkStrictly: false,
        /** 默认展开所有树节点 */
        defaultExpandAll: false,
        /** 将树禁用 */
        disabled: false,
        /** 设置节点可拖拽 */
        draggable: true,
        /** 支持点选多个节点（节点本身） */
        multiple: false,
        /** 是否可选中 */
        selectable: true,
        /** 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 */
        showIcon: true,
        /** 是否展示连接线 */
        showLine: false,
        /** 设置 false 时关闭虚拟滚动 */
        virtual: true,
      };
      this.setProps(obj);
    },

    /** 初始化数据 */
    initTreeDataList() {
      if (!!this.fetch) {
        this.setLoading(true);
        this.fetch()
          .then((res: any) => {
            this.setTreeDataList(res);
            this.$emit('fetch-success', res);
          })
          .catch((error: any) => {
            this.$emit('fetch-error', error);
          })
          .finally(() => {
            this.setLoading(false);
          });
      }
    },

    /** 新增 */
    handleAddClick() { },

    /** 点击复选框触发 */
    check(checkedKeys: any, e: any) {
      this.$emit('check', checkedKeys, e);
    },

    /** dragend 触发时调用 */
    dragend({ event, node }: any) {
      this.$emit('dragend', { event, node });
    },

    /** dragenter 触发时调用 */
    dragenter({ event, node, expandedKeys }: any) {
      this.$emit('dragenter', { event, node, expandedKeys });
    },

    /** dragleave 触发时调用 */
    dragleave({ event, node }: any) {
      this.$emit('dragleave', { event, node });
    },

    /** dragover 触发时调用 */
    dragover({ event, node }: any) {
      this.$emit('dragover', { event, node });
    },

    /** 开始拖拽时调用 */
    dragstart({ event, node }: any) {
      this.$emit('dragstart', { event, node });
    },

    /** drop 触发时调用 */
    drop({ event, node, dragNode, dragNodesKeys }: any) {
      this.$emit('drop', { event, node, dragNode, dragNodesKeys });
    },

    /** 展开/收起节点时触发 */
    expand(expandedKeys: any, { expanded: bool, node }: any) {
      this.$emit('expand', expandedKeys, { expanded: bool, node });
    },

    /** 节点加载完毕时触发 */
    load(loadedKeys: any, { event, node }: any) {
      this.$emit('load', loadedKeys, { event, node });
    },

    /** 节点加载完毕时触发 */
    rightClick({ event, node }: any) {
      this.$emit('rightClick', { event, node });
    },

    /** 点击树节点触发 */
    select(selectedKeys: any, { selected: bool, selectedNodes, node, event }: any) {
      this.$emit('select', selectedKeys, { selected: bool, selectedNodes, node, event });
    },

    /********************************************************** 组件内部实现使用方法 end ************************************************************************ */
  },
})
</script>
<style lang="less" scoped>
.mt-tree {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.in-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

:deep(.ant-tree .ant-tree-node-content-wrapper) {
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #333;

  .ant-tree-iconEle,
  .ant-tree-title {
    height: 28px;
    line-height: 28px;
  }

  .ant-tree-title>div,
  .ant-tree-title>span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
}

:deep(.ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected) {
  background: rgba(0, 158, 247, 0.1);
}
</style>
