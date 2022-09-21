/*
 * @Author: yuanjunjie
 * @Date: 2022-06-13 18:00:45
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-07-06 09:37:05
 */
/**
 * 此文件为mt-form-vue实现原理核心
 * 后续我将之此文件称为海克斯核心
 * Hex core
 */

import { buildUUID } from "/@/utils/common";
import { cloneDeep } from "lodash-es";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";
import { formConfig } from "../event/element-event/index";
import { formConfigTyping } from "/@/types/form-design/form/form-config-typing";
import { FormDesignElementTyping } from "/@/types/form-design/index-typing";
import { basicElement, businessElement, containerElement, otherElement } from "../event/element-event/index";
import {
  centralDataTyping,
  historyDataTypig,
  historyDataStepTypig,
} from "/@/types/form-design/central/central";
export function createFormcentral() {
  return {
    data: reactive({
      elementList: [],
      formConfig: {} as formConfigTyping,
      selectedId: "",
      selectedElement: null,
      linearElementList: [],
      historyData: {
        index: -1,
        maxStep: 30,
        steps: [],
      } as historyDataTypig,
      globalCss: [],
      globalFunctions: [],
    } as centralDataTyping),
    buildCentral() {
      this.data.elementList = [];
      this.data.formConfig = cloneDeep(formConfig);
    },
    /**
     * 获取需要保存的数据
     */
    getStoredData() {
      const data: historyDataStepTypig = {
        elementList: this.data.elementList,
        formConfig: this.data.formConfig as formConfigTyping,
      };
      return data;
    },
    /**
     * 生成组件方法
     * @param element 组件信息
     * @returns 组件信息
     */
    buildElement(element: FormDesignElementTyping) {
      if (!element) return null;
      const newElement = cloneDeep(element);
      newElement.elementId = buildUUID();
      if (newElement.type == "row") {
        if (!newElement.children) {
          newElement.children = [];
        }
        let newColElement: FormDesignElementTyping = cloneDeep(
          this.buildContainerElement("col")
        );
        newElement.children.push(newColElement);
        newColElement = cloneDeep(this.buildContainerElement("col"));
        newElement.children.push(newColElement);
      }
      if (newElement.type == "tabs") {
        if (!newElement.children) {
          newElement.children = [];
        }
        let newColElement: FormDesignElementTyping = cloneDeep(
          this.buildContainerElement("tab-pane")
        );
        newElement.children.push(newColElement);
        newColElement = cloneDeep(this.buildContainerElement("tab-pane"));
        newElement.children.push(newColElement);
      }
      if (newElement.type == "collapse") {
        if (!newElement.children) {
          newElement.children = [];
        }
        let newColElement: FormDesignElementTyping = cloneDeep(
          this.buildContainerElement("collapse-panel")
        );
        newElement.children.push(newColElement);
        newColElement = cloneDeep(this.buildContainerElement("collapse-panel"));
        newElement.children.push(newColElement);
      }
      return newElement;
    },
    /**
     * 生成组件
     */
     buildElementByType(type: string) {
      const allElement = [...basicElement, ...businessElement, ...containerElement, ...otherElement];
      const idx = allElement.findIndex((item: FormDesignElementTyping) => {
        return item.type == type;
      });
      const newElement: FormDesignElementTyping = cloneDeep(allElement[idx]);
      newElement.elementId = buildUUID();
      return newElement;
    },
    /**
     * 生成容器组件
     */
    buildContainerElement(type: string) {
      // 只需要容器组件
      const allElement = [...containerElement];
      const idx = allElement.findIndex((item: FormDesignElementTyping) => {
        return item.type == type;
      });
      const newElement: FormDesignElementTyping = cloneDeep(allElement[idx]);
      newElement.elementId = buildUUID();
      return newElement;
    },
    /**
     * 清空组件
     */
    clear() {
      this.data.selectedId = "";
      this.data.selectedElement = null;
      this.data.elementList = [];
      this.updateHistoryData();
    },
    /**
     * 选中
     * @param element 组件
     */
    selected(element: FormDesignElementTyping) {
      if (!element) {
        this.data.selectedId = "";
        this.data.selectedElement = null;
        return;
      }
      this.data.selectedId = element.elementId;
      this.data.selectedElement = element;
    },
    /**
     * 点击添加组件
     * @param element 组件信息
     */
    handleAddElement(element: FormDesignElementTyping) {
      const newElement = ref(this.buildElement(element));
      if (!newElement.value) {
        message.warn("新增失败");
        return;
      }
      this.data.elementList.push(newElement.value);
      this.selected(newElement.value);
      this.addLinearElement(newElement.value);
      this.updateHistoryData();
    },
    /**
     * 添加一维数组列表
     * 目的: 不需要递归取所有除容器组件外其他所有组件
     * @param element 组件
     */
    addLinearElement(element: FormDesignElementTyping) {
      const { type } = element;
      if (type != "container") return;
      this.data.linearElementList.push(element);
    },

    /********************************************************全局属性相关 开始位置************************************************************************* */

    /** 设置全局Css */
    setCssClassList(css: any) {
      this.data.globalCss = css;
    },

    /** 获取全局CSS列表 */
    getCssClassList() {
      return this.data.globalCss;
    },

    /** 设置全局方法 */
    setFunctionList(func: any) {
      this.data.globalFunctions = func;
    },

    /** 获取全局方法 */
    getFunctionList() {
      return this.data.globalFunctions;
    },

    /********************************************************全局属性相关 开始位置************************************************************************* */

    /********************************************************历史数据相关 开始位置************************************************************************* */
    /**
     * 初始化历史数据
     */
    buildHistoryData() {
      this.loadFormContentFromStorage();
      this.data.historyData.index++;
      this.data.historyData.steps[this.data.historyData.index] = {
        elementList: cloneDeep(this.data.elementList),
        formConfig: cloneDeep(this.data.formConfig) as formConfigTyping,
      };
    },
    /**
     * 更新历史数据
     */
    updateHistoryData() {
      if (this.data.historyData.index === this.data.historyData.maxStep - 1) {
        this.data.historyData.steps.shift();
      } else {
        this.data.historyData.index++;
      }
      this.data.historyData.steps[this.data.historyData.index] = {
        elementList: cloneDeep(this.data.elementList),
        formConfig: cloneDeep(this.data.formConfig) as formConfigTyping,
      };
      this.saveFormContentToStorage();
      if (
        this.data.historyData.index <
        this.data.historyData.steps.length - 1
      ) {
        this.data.historyData.steps = this.data.historyData.steps.slice(
          0,
          this.data.historyData.index + 1
        );
      }
    },
    undoHistoryStep() {
      if (this.data.historyData.index !== 0) {
        this.data.historyData.index--;
      }
      this.data.elementList = cloneDeep(
        this.data.historyData.steps[this.data.historyData.index].elementList
      ) as Array<FormDesignElementTyping>;;
      this.data.formConfig = cloneDeep(
        this.data.historyData.steps[this.data.historyData.index].formConfig
      ) as formConfigTyping;
    },

    redoHistoryStep() {
      if (
        this.data.historyData.index !==
        this.data.historyData.steps.length - 1
      ) {
        this.data.historyData.index++;
      }

      this.data.elementList = cloneDeep(
        this.data.historyData.steps[this.data.historyData.index].elementList
      ) as Array<FormDesignElementTyping>;
      this.data.formConfig = cloneDeep(
        this.data.historyData.steps[this.data.historyData.index].formConfig
      ) as formConfigTyping;
    },
    undoEnabled() {
      return !(
        this.data.historyData.index > 0 &&
        this.data.historyData.steps.length > 0
      );
    },

    redoEnabled() {
      return !(
        this.data.historyData.index <
        this.data.historyData.steps.length - 1
      );
    },
    saveCurrentHistoryStep() {
      this.data.historyData.steps[this.data.historyData.index] = cloneDeep({
        elementList: this.data.elementList,
        formConfig: this.data.formConfig,
      }) as historyDataStepTypig;

      this.saveFormContentToStorage();
    },
    saveFormContentToStorage() {
      window.localStorage.setItem(
        "mt__element__list__backup",
        JSON.stringify(this.data.elementList)
      );
      window.localStorage.setItem(
        "mt__form__config__backup",
        JSON.stringify(this.data.formConfig)
      );
    },
    loadFormContentFromStorage() {
      let elementListBackup = window.localStorage.getItem(
        "mt__element__list__backup"
      );
      if (!!elementListBackup) {
        this.data.elementList = JSON.parse(elementListBackup);
      }

      let formConfigBackup = window.localStorage.getItem(
        "mt__form__config__backup"
      );
      if (!!formConfigBackup) {
        this.data.formConfig = cloneDeep(JSON.parse(formConfigBackup));
      }
    },
    /********************************************************历史数据相关 结束位置************************************************************************* */
  };
}
