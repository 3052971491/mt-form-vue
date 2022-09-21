<template>
  <form-item-wrapper :element="element" :central="central" :redact-state="redactState" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" :parent-element="parentElement" :rules="reactiveData.rules">
    <a-switch v-model:checked="modelValue" v-bind="{
  disabled: options.disabled,
  size: size,
  checkedChildren: options.checkedChildren,
  checkedValue: options.checkedValue,
      unCheckedChildren: options.unCheckedChildren,
      unCheckedValue: options.unCheckedValue,
    }" @focus="handleFocusEvent" @blur="handleBlurEvent" @click="handleInputEvent"
      @change="handleChangeEvent(modelValue)" />
  </form-item-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMixin from "../mixins/components-mixin";
export default defineComponent({
  name: "MtSwitchElement",
  mixins: [ComponentsMixin],
});
</script>