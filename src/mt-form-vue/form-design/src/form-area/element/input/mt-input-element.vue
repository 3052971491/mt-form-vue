<template>
  <form-item-wrapper 
    :element="element" 
    :central="central" 
    :redact-state="redactState" 
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" 
    :parent-element="parentElement" 
    :rules="reactiveData.rules"
  >
    <a-input 
      v-model:value="modelValue" 
      v-bind="{
        allowClear: options.allowClear,
        bordered: options.bordered,
        disabled: options.disabled,
        placeholder: options.placeholder,
        size: size,
        maxlength: options.maxlength,
        showCount: options.showCount,
      }" 
      @focus="handleFocusEvent" 
      @blur="handleBlurEvent" 
      @input="handleInputEvent"
      @change="handleChangeEvent(modelValue)" />
  </form-item-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMixin from "../mixins/components-mixin";
export default defineComponent({
  name: "MtInputElement",
  mixins: [ComponentsMixin],
});
</script>