<template>
  <a-drawer
    width="50%"
    placement="right"
    title="数据源设置"
    :closable="false"
    :visible="visible"
    destroy-on-close
    @close="onClose"
  >
    <template #extra>
      <a-button @click="test">测试连接</a-button>
    </template>
    <a-spin :spinning="datasourceLoading">
      <a-form
        ref="datasourceForm"
        :model="datasourceInfo"
        autocomplete="off"
        label-align="right"
        :label-col="{ style: { width: '100px' } }"
      >
        <a-form-item
          label="唯一名称"
          name="uniqueName"
          :rules="[
            {
              required: true,
              validator: checkUniqueName,
            },
          ]"
        >
          <a-input
            v-model:value="datasourceInfo.uniqueName"
            :maxlength="20"
            showCount
          />
        </a-form-item>
        <a-row>
          <a-col span="18">
            <a-form-item
              label="请求地址"
              name="requestURL"
              :rules="[
                {
                  required: true,
                  message: '请求地址不能为空',
                },
              ]"
            >
              <a-input v-model:value="datasourceInfo.requestURL"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="6">
            <a-form-item label="" name="requestURLType">
              <a-select
                v-model:value="datasourceInfo.requestURLType"
                :options="requestURLTypeList"
                placeholder="请选择"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="描述信息" name="description">
          <a-textarea
            v-model:value="datasourceInfo.description"
            :auto-size="{ minRows: 3, maxRows: 3 }"
            :maxlength="100"
            showCount
          />
        </a-form-item>
        <a-form-item
          label="请求方法"
          name="requestMethod"
          :rules="[
            {
              required: true,
              message: '请求方法不能为空',
            },
          ]"
        >
          <a-radio-group v-model:value="datasourceInfo.requestMethod">
            <a-radio-button
              v-for="item in requestMethodList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label="i.title"
          v-for="(i, j) in requestParamsList"
          :key="'requestParams' + j"
        >
          <a-row
            v-for="(item, idx) in datasourceInfo[i.value]"
            :key="idx"
            :gutter="8"
          >
            <a-col :span="8">
              <a-form-item
                :name="[i.value, idx, 'label']"
                :rules="[
                  {
                    required: true,
                    message: '名称不能为空',
                  },
                ]"
                :label-width="0"
              >
                <a-input
                  v-model:value="item.label"
                  placeholder="名称"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item :name="[i.value, idx, 'type']" :label-width="0">
                <a-select
                  v-model:value="item.type"
                  :options="requestParamsTypeList"
                  placeholder="请选择"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :name="[i.value, idx, 'value']"
                :rules="[
                  {
                    required: true,
                    validator: checkvalue,
                  },
                ]"
                :label-width="0"
              >
                <a-input
                  v-model:value="item.value"
                  placeholder="名称"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-button @click="handleDelClick(i.value, idx)"
                ><delete-outlined
              /></a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-button @click="handleAddClick(i.value)">
                <plus-outlined />新增{{ i.title }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-collapse :bordered="false">
          <template #expandIcon="{ isActive }">
            <caret-right-outlined :rotate="isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="请求配置">
            <mt-codemirror-editor
              v-model:value="datasourceInfo.configHandlerCode"
              height="300"
            />
          </a-collapse-panel>
          <a-collapse-panel header="数据处理">
            <mt-codemirror-editor
              v-model:value="datasourceInfo.dataHandlerCode"
              height="300"
            />
          </a-collapse-panel>
          <a-collapse-panel header="错误处理">
            <mt-codemirror-editor
              v-model:value="datasourceInfo.errorHandlerCode"
              height="300"
            />
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </a-spin>
    <template #footer>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onSave" :loading="datasourceLoading"
          >保存</a-button
        >
      </a-space>
    </template>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { defaultDataSourcesConfig } from "../../event/element-event/form/index";
import {
  DeleteOutlined,
  PlusOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";
import { http } from "/@/utils/http/http-cilent";
import type { Rule } from "ant-design-vue/es/form";
import MtCodemirrorEditor from "/@/components/codemirror/mt-codemirror-editor.vue";
export default defineComponent({
  name: "DatasourceDrawer",
  components: {
    DeleteOutlined,
    PlusOutlined,
    CaretRightOutlined,
    MtCodemirrorEditor,
  },
  props: {
    central: {
      type: Object,
      required: true,
      default: () => {},
    },
    formConfig: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  emits: ["update:formConfig"],
  data() {
    let checkUniqueName = async (_rule, value: string) => {
      if (!value) {
        return Promise.reject("唯一名称不能为空");
      } else {
        const idx = this.formConfig.dataSources.findIndex(
          (item: any) => {
            return item.uniqueName == value && this.id != item.dataSourceId;
          }
        );
        if (idx != -1) {
          return Promise.reject("唯一名称已存在");
        } else {
          return Promise.resolve();
        }
      }
    };
    /**
     * 校验请求头，参数，发送数据的值
     */
    let checkvalue = async (_rule: any, value: any) => {
      if (!value) {
        return Promise.reject("值不能为空");
      } else {
        let ruleField = _rule.field;
        let fieldType = ruleField.substring(0, ruleField.indexOf("."));
        let fieldIdx = Number(
          ruleField.substring(
            ruleField.indexOf(".") + 1,
            ruleField.lastIndexOf(".")
          )
        );
        let valueType = this.datasourceInfo[fieldType][fieldIdx].type;
        if (valueType === "Number") {
          if (isNaN(value)) {
            return Promise.reject("数值类型值错误");
          } else {
            Promise.resolve();
          }
        } else if (valueType === "Boolean") {
          if (
            value.toLowerCase() === "true" ||
            value.toLowerCase() === "false" ||
            value.toLowerCase() === "null" ||
            value === "1" ||
            value === "0"
          ) {
            Promise.resolve();
          } else {
            return Promise.reject("布尔类型值错误");
          }
        } else {
          Promise.resolve();
        }
        Promise.resolve();
      }
    };
    return {
      id: "",
      visible: false,
      datasourceLoading: false,
      datasourceInfo: {} as any,
      requestMethodList: [
        { label: "get", value: "get" },
        { label: "post", value: "post" },
        { label: "put", value: "put" },
        { label: "delete", value: "delete" },
      ],
      requestParamsList: [
        { label: "headers", value: "headers", title: "请求头" },
        { label: "params", value: "params", title: "参数" },
        { label: "data", value: "data", title: "发送数据" },
      ],
      requestParamsTypeList: [
        { label: "字符串类型", value: "String" },
        { label: "数值类型", value: "Number" },
        { label: "布尔类型", value: "Boolean" },
        { label: "变量或表达式", value: "Variable" },
      ],
      requestURLTypeList: [
        { label: "固定字符串", value: "String" },
        { label: "变量或表达式", value: "Variable" },
      ],
      checkUniqueName: checkUniqueName,
      checkvalue: checkvalue,
      activeKey: 1,
    };
  },
  computed: {
    config: {
      get() {
        return this.formConfig;
      },
      set(value: any) {
        this.$emit("update:formConfig", value);
      },
    },
  },
  mounted() {},
  methods: {
    /**
     * 初始化
     */
    init() {
      this.datasourceLoading = true;
      if (!!this.id) {
        const info = this.config.dataSources.find(
          (item: any) => {
            return item.dataSourceId === this.id;
          }
        );
        this.datasourceInfo = reactive(cloneDeep(info));
      } else {
        this.datasourceInfo = reactive(cloneDeep(defaultDataSourcesConfig));
      }
      this.datasourceLoading = false;
    },
    /**
     * 打开
     */
    showDrawer(id: string) {
      this.visible = true;
      if (!!id) {
        this.id = id;
      }
      this.init();
      console.log(this.datasourceInfo);
    },
    /**
     * 关闭
     */
    onClose() {
      (this.$refs.datasourceForm as any).resetFields();
      this.id = "";
      this.datasourceInfo.headers = [];
      this.datasourceInfo.params = [];
      this.datasourceInfo.data = [];
      this.datasourceLoading = false;
      console.log(this.datasourceInfo);
      this.visible = false;
    },
    /**
     * 测试连接
     */
    test() {
      (this.$refs.datasourceForm as any).validate().then(() => {
        if (!!this.id) {
          const idx = this.config.dataSources.findIndex(
            (item: any) => {
              return item.dataSourceId === this.id;
            }
          );
          http(this.config.dataSources[idx], this.formConfig.DSV, '');
        }
      });
    },
    /**
     * 保存
     */
    onSave() {
      (this.$refs.datasourceForm as any)
        .validate()
        .then(() => {
          this.datasourceLoading = true;
          if (!!this.id) {
            const idx = this.config.dataSources.findIndex(
              (item: any) => {
                return item.dataSourceId === this.id;
              }
            );
            this.config.dataSources[idx] = cloneDeep(this.datasourceInfo);
          } else {
            this.config.dataSources.push(cloneDeep(this.datasourceInfo));
          }
          this.onClose();
        })
        .catch(() => {
          this.datasourceLoading = false;
          // abp.notify.warn('数据源设置存在错误，请修改');
        });
    },
    /**
     * 增加
     */
    handleAddClick(type: string) {
      const obj = {
        label: null,
        type: "String",
        value: null,
      };
      this.datasourceInfo[type].push(obj);
    },
    /**
     * 删除
     */
    handleDelClick(type: string, idx: number) {
      this.datasourceInfo[type].splice(idx, 1);
    },
  },
});
</script>
