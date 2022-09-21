<template>
  <a-form-item label="是否自动换行" name="wrap">
    <a-switch v-model:checked="options.wrap" />
  </a-form-item>
</template>
<script lang="ts">
  import { defineComponent, computed, toRefs } from 'vue';
  export default defineComponent({
    name: 'RowWrapEditor',
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
