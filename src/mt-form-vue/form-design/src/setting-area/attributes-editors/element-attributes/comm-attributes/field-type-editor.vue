<template>
  <a-form-item label="字段类型" name="__fieldType__">
    <a-radio-group v-model:value="options.__fieldType__">
      <a-radio-button value="default">Default</a-radio-button>
      <a-radio-button value="custom">Custom</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>
<script lang="ts">
  import { defineComponent, computed, toRefs } from 'vue';
  export default defineComponent({
    name: 'FieldTypeEditor',
    components: {},
    props: {
      central: {
        type: Object,
        required: true,
        default: () => {},
      },
      element: {
        type: Object,
        required: true,
        default: () => {},
      },
    },
    emits: ['update:element'],
    setup(props, { emit }) {
      const { element } = toRefs(props);
      const options = computed({
        get: () => {
          return element.value.options;
        },
        set: (value: any) => {
          emit('update:element', value);
        },
      });
      return {
        options,
      };
    },
  });
</script>
