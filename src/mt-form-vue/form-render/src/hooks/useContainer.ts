import { toRefs, computed } from "vue";
import elementComponents from "/@/mt-form-vue/form-design/src/form-area/element";

export default function (props: any) {
    const hasRedact = computed(() => {
        return props.redactState.value;
    });
    const getElementName = (type: string) => {
        return `mt-${type}-element`;
    };
    return {
        elementComponents,
        hasRedact,
        getElementName,
    }
}