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
    <a-rate  
      v-model:value="modelValue" 
      v-bind="{
        allowClear: options.allowClear,
        disabled: options.disabled,
        placeholder: options.placeholder,
        allowHalf: options.allowHalf,
        count: options.count,
        tooltips: options.tooltips,
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
  name: "MtRateElement",
  mixins: [ComponentsMixin],
});
</script>