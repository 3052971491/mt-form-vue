<template>
    <a-form-item :label="t('自定义样式')" name="customStyles">
        <a-select v-model:value="options.customStyles" :options="classNameOptions" mode="multiple" placeholder="请选择" allowClear show-search />
    </a-form-item>
</template>
<script lang="ts">
export default defineComponent({
    name: 'CustomStylesEditor'
})
</script>
<script lang="ts" setup>
import { defineComponent, computed, toRefs, onMounted, watch } from "vue";
import { t } from "/@/utils/i18n";
const props = defineProps({
    central: {
        type: Object,
        required: true,
        default: () => { },
    },
    element: {
        type: Object,
        required: true,
        default: () => { },
    },
})
const emit = defineEmits(["update:element"]);
const options = computed({
    get: () => {
        return props.element.options;
    },
    set: (value: any) => {
        emit("update:element", value);
    },
});
const classNameOptions = computed(() => {
    return props.central.getCssClassList().map((item: string) => {
        return {
            label: item,
            value: item,
        }
    })
});
</script>
