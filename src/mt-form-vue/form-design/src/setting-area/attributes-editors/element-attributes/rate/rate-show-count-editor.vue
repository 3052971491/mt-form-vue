<template>
  <a-form-item label="是否允许半选" name="allowHalf">
    <a-switch v-model:checked="options.allowHalf" />
  </a-form-item>
</template>
<script lang="ts">
  import { defineComponent, computed, toRefs } from 'vue';
  export default defineComponent({
    name: 'RateAllowHalfEditor',
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
