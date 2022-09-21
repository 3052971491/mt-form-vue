<template>
  <div class="settvar-modal">
    <mt-modal v-model:visible="visible" title="数据源变量" @ok="handleOk">
      <a-form
        ref="rulesValidateForm"
        autocomplete="off"
        :model="data.rulesValidateForm"
      >
          <a-row
            v-for="(item, idx) in data.rulesValidateForm.rulesList"
            :key="idx"
            :gutter="8"
          >
            <a-col :span="5">
              <a-form-item
                label="类型"
                :name="['rulesList', idx, 'type']"
                :rules="[
                  {
                    required: true,
                    message: '该字段不能为空',
                  },
                ]"
                :label-width="0"
              >
                <a-select
                  v-model:value="item.type"
                  placeholder="请选择校验类型"
                  :options="ruleTypeList"
                  :fieldNames="{
                    label: 'content',
                    value: 'key',
                  }"
                  @change="handleChangeType($event, idx, item)"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" v-if="item.type != 'required'">
              <a-form-item
                label="表达式"
                :name="['rulesList', idx, 'pattern']"
                :rules="[
                  {
                    required: true,
                    message: '该字段不能为空',
                  },
                ]"
                :label-width="0"
              >
                <a-input
                  v-model:value="item.pattern"
                  placeholder="该字段不能为空"
                />
              </a-form-item>
              </a-col>
              <a-col :span="8">
              <a-form-item
                label="错误提示"
                :name="['rulesList', idx, 'message']"
                :rules="[
                  {
                    required: true,
                    message: '该字段不能为空',
                  },
                ]"
                :label-width="0"
              >
                <a-input
                  v-model:value="item.message"
                  placeholder="请输入校验提示"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-button @click="handleDelRuleClick(idx)"
                ><delete-outlined
              /></a-button>
            </a-col>
          </a-row>
          <a-row justify="center">
            <mt-empty
              v-if="data.rulesValidateForm.rulesList.length < 1"
            ></mt-empty>
            <a-col :span="24">
              <a-button type="dashed" block @click="handleAddRuleClick()">
                <plus-outlined />新增
              </a-button>
            </a-col>
          </a-row>
      </a-form>
    </mt-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed } from "vue";
import MtModal from "/@/components/mt-modal.vue";
import MtEmpty from "/@/components/mt-empty.vue";
import { cloneDeep } from "lodash-es";
import { ruleTyping } from '../../event/element-event/basic-element/index-typing';
import {
  DeleteOutlined,
  PlusOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";

interface ruleFormTyping {
  rulesList: ruleTyping[];
}
export default defineComponent({
  name: "RulesModal",
  components: {
    MtModal,
    MtEmpty,
    DeleteOutlined,
    PlusOutlined,
    CaretRightOutlined,
  },
  props: {
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
    const visible = ref(false);
    const rulesValidateForm = ref();
    const data = reactive({
      rulesValidateForm: {
        rulesList: [],
      } as ruleFormTyping,
    });
    const ruleTypeList = [
      { key: "required", content: "必填", hasValue: false },
      { key: "number", content: "数字", hasValue: true },
      { key: "sum", content: "金额", hasValue: true },
      { key: "phone", content: "联系方式", hasValue: true },
      { key: "email", content: "邮箱", hasValue: true },
      { key: "idcard", content: "身份证号码", hasValue: true },
      { key: "custom", content: "自定义", hasValue: true },
      
    ];
    /**
     * 打开弹框
     */
    const handleOpen = () => {
      visible.value = true;
      data.rulesValidateForm.rulesList = cloneDeep(options.value.rules);
    };
    /**
     * 关闭弹框
     */
    const handleCancel = () => {
      rulesValidateForm.value.resetFields()
      visible.value = false;
    };
    /**
     * 确认弹框
     */
    const handleOk = () => {
      if (data.rulesValidateForm.rulesList.length < 1) {
        rulesValidateForm.value.resetFields();
        options.value.rules = cloneDeep(data.rulesValidateForm.rulesList);
        visible.value = false;
        return;
      }
      //   visible.value = false;
      rulesValidateForm.value.validate().then((res: ruleFormTyping) => {
        options.value.rules = cloneDeep(res.rulesList);
        handleCancel();
      });
    };

    /**
     * 新增规则
     */
    const handleAddRuleClick = () => {
      const obj: ruleTyping = {
        type: null,
        pattern: null,
        message: null,
      };
      data.rulesValidateForm.rulesList.push(obj);
    };
    /**
     * 删除规则
     */
    const handleDelRuleClick = (index: number) => {
      data.rulesValidateForm.rulesList.splice(index, 1);
    };
    /**
     * 类型选择变化
     */
    function handleChangeType(val: string, idx: number, item: ruleTyping) {
      switch (val) {
        case 'required':
          item.message = '该字段不能为空';
          break;
        case 'number':
          item.pattern = '/^\d+$/';
          item.message = '请输入正确的数字';
          break;
        case 'sum':
          item.pattern = '/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/';
          item.message = '请输入正确的金额';
          break;
        case 'phone':
          item.pattern = '/^1[3456789]\d{9}$|^0\d{2,3}-?\d{7,8}$/';
          item.message = '请输入正确的联系方式';
          break;
        case 'email':
          item.pattern = '/^[a-z0-9]+([._\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/';
          item.message = '请输入正确的邮箱';
          break;
        case 'idcard':
          item.pattern = '/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/';
          item.message = '请输入正确的身份证号码';
          break;
        default:
          item.pattern = null;
          item.message = null;
          break;
      }
      // todo
      // 等待测试校验
      rulesValidateForm.value.validateFields(['rulesList', val, 'pattern']);
      rulesValidateForm.value.validateFields(['rulesList', val, 'message']);
    }
    return {
      rulesValidateForm,
      ruleTypeList,
      visible,
      handleOpen,
      handleCancel,
      handleOk,
      data,
      handleAddRuleClick,
      handleDelRuleClick,
      handleChangeType,
    };
  },
});
</script>
