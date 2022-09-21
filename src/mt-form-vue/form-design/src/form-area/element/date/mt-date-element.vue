<template>
  <form-item-wrapper :element="element" :central="central" :redact-state="redactState" :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" :parent-element="parentElement" :rules="reactiveData.rules">
    <component 
      :is="componentName" 
      v-model:value="modelValue" 
      v-bind="{
        allowClear: options.allowClear,
        bordered: options.bordered,
        disabled: options.disabled,
        placeholder: timePlaceholder(options),
        size: size,
        format: options.dateFormat,
        valueFormat: options.dateValueFormat,
        showTime: options.showTime,
        showNow: options.showNow,
        showToday: options.showToday,
      }"
      :style="{
        width: '100%'
      }"
      @focus="handleFocusEvent"
      @blur="handleBlurEvent"
      @input="handleInputEvent"
      @change="handleChangeEvent(modelValue)"
    >
    </component>
  </form-item-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMixin from "../mixins/components-mixin";
import DateComponentMixin from "../mixins/date-component-mixin";
export default defineComponent({
  name: "MtDateElement",
  mixins: [ComponentsMixin, DateComponentMixin],
});
</script>