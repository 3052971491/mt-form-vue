<template>
  <form-item-wrapper :element="element" :central="central" :redact-state="redactState" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" :parent-element="parentElement" :rules="reactiveData.rules">
    <a-radio-group v-model:value="modelValue" v-bind="{
      disabled: options.disabled,
      size: size,
      buttonStyle: options.buttonStyle,
      optionType: options.optionType,
      options: optionList,
    }" @focus="handleFocusEvent" @blur="handleBlurEvent" @click="handleInputEvent"
      @change="handleChangeEvent(modelValue)" />
  </form-item-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMixin from "../mixins/components-mixin";
import OptionsMixin from "../mixins/options-mixin";
export default defineComponent({
  name: "MtRadioElement",
  mixins: [ComponentsMixin, OptionsMixin],
});
</script>

<style lang="less" scoped>
</style>
