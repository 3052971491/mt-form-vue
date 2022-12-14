<template>
  <container-item-wrapper
    :element="element"
    :central="central"
    :redact-state="redactState"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :parent-element="parentElement"
  >
    <a-card
      v-bind="{
        title: options.label,
        bordered: options.bordered,
        hoverable: options.hoverable,
        size: options.size,
        type: options.type,
        headStyle: options.headStyle,
        bodyStyle: options.bodyStyle,
      }"
      @click.stop="handleSelectedElementClick"
    >
      <col-draggable
        :element="element"
        :central="central"
        :redact-state="redactState"
        :config="config"
        :parent-list="parentList"
        :index-of-parent-list="indexOfParentList"
        :parent-element="parentElement"
        itemKey="elementId"
        @add="(evt) => handleAddElementClick(evt, element.list)"
        @update="handleUpdateElementClick"
      />
    </a-card>
  </container-item-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, nextTick } from "vue";
import ColDraggable from "../../../components/col-draggable.vue";
import ContainerItemWrapper from "../components/container-item-wrapper.vue";
import { DeleteFilled, DragOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "MtCardElement",
  components: {
    ColDraggable,
    DeleteFilled,
    DragOutlined,
    ContainerItemWrapper,
  },
  props: {
    element: {
      type: Object,
      default: () => {},
    },
    central: {
      type: Object,
      default: () => {},
    },
    redactState: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {},
    },
    parentList: {
      type: Array,
      default: () => [],
    },
    indexOfParentList: {
      type: Number,
      default: -1,
    },
    parentElement: Object,
  },
  setup(props, { emit }) {
    const {
      element,
      central,
      parentList,
      indexOfParentList,
      parentElement,
      redactState,
    } = toRefs(props);
    const options = element.value.options;
    /**
     * ?????????????????????
     */
    const hasRedact = computed(() => {
      return !!central.value && redactState.value;
    });
    /**
     * ??????????????????
     */
    const selected = computed(() => {
      if (!hasRedact.value) return false;
      return element.value.elementId == central.value.data.selectedId;
    });
    /**
     * ????????????
     */
    const handleAddElementClick = (
      evt: { newIndex: any },
      list: { [x: string]: any }
    ) => {
      // debugger;
      const newIndex = evt.newIndex;
      if (!!list[newIndex]) {
        central.value.selected(list[newIndex]);
      }
    };
    /**
     * ??????????????????
     */
    const handleSelectedElementClick = () => {
      central.value.selected(element.value);
    };
    /**
     * ??????????????????
     */
    const handleDelElementClick = () => {
      if (parentList.value.length > 0) {
        let nextSelectedElement: any;
        if (parentList.value.length == 1) {
          if (!!parentElement.value) {
            nextSelectedElement = parentElement.value;
          }
        } else if (parentList.value.length == indexOfParentList.value + 1) {
          nextSelectedElement = parentList.value[indexOfParentList.value - 1];
        } else {
          nextSelectedElement = parentList.value[indexOfParentList.value + 1];
        }
        nextTick(() => {
          const arr = parentList.value;
          arr.splice(indexOfParentList.value, 1);
          emit("update: parentList", arr);
          central.value.selected(nextSelectedElement);
        });
      }
    };
    /**
     * ????????????
     */
    const handleUpdateElementClick = () => {
      return true;
    };
    return {
      hasRedact,
      selected,
      handleSelectedElementClick,
      handleDelElementClick,
      options,
      handleAddElementClick,
      handleUpdateElementClick,
    };
  },
});
</script>

<style lang="less" scoped></style>
