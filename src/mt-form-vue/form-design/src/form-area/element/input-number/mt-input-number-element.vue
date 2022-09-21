<template>
  <form-item-wrapper :element="element" :central="central" :redact-state="redactState" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" :parent-element="parentElement" :rules="reactiveData.rules">
    <a-input-number style="width: 100%" v-model:value="modelValue" v-bind="{
  bordered: options.bordered,
  disabled: options.disabled,
  placeholder: options.placeholder,
  size: size,
  addonAfter: options.addonAfter,
  addonBefore: options.addonBefore,
  controls: options.controls,
  decimalSeparator: options.decimalSeparator,
  keyboard: options.keyboard,
  max: options.max,
  min: options.min,
  precision: options.precision,
  step: options.step,
      stringMode: options.stringMode,
    }" @focus="handleFocusEvent" @blur="handleBlurEvent" @input="handleInputEvent"
      @change="handleChangeEvent(modelValue)" />
  </form-item-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMixin from "../mixins/components-mixin";
export default defineComponent({
  name: "MtInputNumberElement",
  mixins: [ComponentsMixin],
});
</script>