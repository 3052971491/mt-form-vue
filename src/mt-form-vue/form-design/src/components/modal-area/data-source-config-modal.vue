<template>
  <div class="modal">
    <mt-modal v-model:visible="visible" title="字段规则" @ok="handleOk">
      <a-form ref="form" autocomplete="off" :model="data.form">
        <!-- 字段类型 -->
        <a-form-item label="类型" name="type" :rules="[{ required: true, message: t('fieldCannotEmpty') }]">
          <a-radio-group v-model:value="data.form.type" @change="handleTypeChangeClick">
            <a-radio-button value="default">Default</a-radio-button>
            <a-radio-button value="custom">Custom</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!-- 默认 -->
        <template v-if="data.form.type == 'default'">
          <mt-tree ref="tree" :fetch="fetchTreeData"
            :fieldNames="{ children: 'children', title: 'label', key: 'value', disabled: 'disabled' }"
            :selectable="false">
            <template #headerTitle>自定义数据</template>
            <template #headerExtra>
              <a-space>
                <a @click="handleAddClick">
                  新增
                </a>
              </a-space>
            </template>
            <template #title="{ node }">
              <div class="flex justify-between">
                <span class="flex-1">{{ node.label }}</span>
                <a-space>
                  <!-- <a key="Add" @click="addSubUnit(node)">
                    新增子节点
                  </a> -->
                  <a key="Edit" @click="editUnit(node)">
                    编辑
                  </a>
                  <a key="Delete" @click="handleDelClick(node.value)">
                    删除
                  </a>
                </a-space>
              </div>
            </template>
          </mt-tree>
        </template>
        <!-- 自定义接口 -->
        <a-form-item v-if="data.form.type == 'custom'" label="api" name="api"
          :rules="[{ required: true, message: t('fieldCannotEmpty') }]">
          <a-select v-model:value="data.form.api" :options="config.dataSources"
            :field-names="{ label: 'uniqueName', value: 'dataSourceId' }" allowClear
            :placeholder="t('selectPlaceholder')">
          </a-select>
        </a-form-item>
      </a-form>
      <data-source-config-add-modal ref="dataSourceConfigAddModal" :status="data.status"
        v-model:value="data.dataSourceConfig" @save="save">
      </data-source-config-add-modal>
    </mt-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed } from "vue";
import MtModal from "/@/components/mt-modal.vue";
import MtEmpty from "/@/components/mt-empty.vue";
import MtInput from "/@/components/mt-input.vue";
import MtTree from "/@/components/mt-tree/index.vue";
import { cloneDeep } from "lodash-es";
import {
  DeleteOutlined,
  PlusOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";
import { ElementDataSourceConfig, ElementDataSourceOptions } from '/@/types/form-design/config/element-data-source-config'
import { t } from "/@/utils/i18n";
import DataSourceConfigAddModal from "./data-source-config-add-modal.vue";
export default defineComponent({
  name: "DataSourceConfigModal",
  components: {
    MtModal,
    MtEmpty,
    MtInput,
    MtTree,
    DeleteOutlined,
    PlusOutlined,
    CaretRightOutlined,
    DataSourceConfigAddModal
  },
  props: {
    element: {
      type: Object,
      required: true,
      default: () => { },
    },
    central: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  emits: ["update:element"],
  setup(props, { emit }) {
    const { element, central } = toRefs(props);
    const options = computed({
      get: () => {
        return element.value.options;
      },
      set: (value: any) => {
        emit("update:element", value);
      },
    });
    const config = computed(() => {
      return central.value.data.formConfig
    });
    const visible = ref(false);
    const form = ref();
    const data = reactive({
      form: {} as ElementDataSourceConfig,
      dataSourceConfig: {},
      status: 'add'
    });
    const tree = ref();
    const dataSourceConfigAddModal = ref()
    /**
     * 打开弹框
     */
    const handleOpen = () => {
      visible.value = true;
      data.form = cloneDeep(options.value.dataSourceConfig);
      data.form.options = cloneDeep(options.value.dataSourceConfig.options);
      if (!!tree.value) {
        tree.value.reload();
      }
    };
    /**
     * 关闭弹框
     */
    const handleCancel = () => {
      visible.value = false;
    };
    /**
     * 确认弹框
     */
    const handleOk = () => {
      form.value.validate().then(() => {
        options.value.dataSourceConfig = cloneDeep(data.form);
        handleCancel();
      });
    };
    /**
     * 字段类型切换
     */
    function handleTypeChangeClick() { };
    /**
     * 删除 option
     * @param index 下表
     */
    function handleDelClick(index: number) {
      console.log(data.form.options);

      const idx = data.form.options.findIndex((item: { value: any; }) => {
        return item.value == index
      })
      if (idx != -1) {
        data.form.options.splice(idx, 1)
        tree.value.reload();
      }
    }
    function fetchTreeData() {
      return new Promise((resolve) => {
        resolve(data.form.options)
      })
    };

    /**
     * 新增 option
     */
    function handleAddClick() {
      data.dataSourceConfig = {};
      data.status = 'add';
      dataSourceConfigAddModal.value.handleOpen();
    };
    function addSubUnit(node: any) {
      data.dataSourceConfig = {};
      data.status = 'addSubUnit';
      dataSourceConfigAddModal.value.handleOpen();
    };
    function editUnit(node: any) {
      data.status = 'update';
      data.dataSourceConfig = node.data;
      dataSourceConfigAddModal.value.handleOpen();
    };
    function save(params: any) {
      const idx = data.form.options.findIndex((item: { value: any; }) => {
        return item.value == params.value
      })
      if (idx != -1) {
        data.form.options[idx] = params
      } else {
        data.form.options.push(params);
      }

      tree.value.reload();
    }
    // function searchOption(option: any, arr: any, status?: 'update' | 'delete', spliceOption?: any) {
    //   for (let s = 0; s < arr.length; s++) {
    //     if (arr[s].value === option.value) {
    //       if (status == 'update') {
    //         Object.assign(arr[s], spliceOption);
    //       } else {
    //         arr.splice(s, 1);
    //       }
    //       break;
    //     } else if (arr[s].children && arr[s].children.length > 0) {
    //       searchOption(option, arr[s].children, status, spliceOption);
    //     } else {
    //       continue;
    //     }
    //   }
    // };
    return {
      t,
      form,
      visible,
      handleOpen,
      handleCancel,
      handleOk,
      data,
      options,
      config,
      handleTypeChangeClick,
      handleAddClick,
      handleDelClick,
      fetchTreeData,
      addSubUnit,
      editUnit,
      dataSourceConfigAddModal,
      save,
      tree,
    };
  },
});
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.justify-between {
  justify-content: space-between;
}
</style>
