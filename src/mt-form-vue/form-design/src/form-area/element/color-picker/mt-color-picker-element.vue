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
    <input  
      type="color"
      v-model="modelValue" 
      v-bind="{
        disabled: options.disabled,
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
  name: "MtColorPickerElement",
  mixins: [ComponentsMixin],
});
</script>