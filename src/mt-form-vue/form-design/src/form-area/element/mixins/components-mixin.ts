import { defineComponent } from "vue";
import FormItemWrapper from "../components/form-item-wrapper.vue";
import ElementMixin from "../mixins/element-mixin";
import useExposeElementApi from "../mixins/useExposeElementApi";
import ComponentPropsMixin from "../mixins/component-props-mixin";
import ComponentComputedMixin from "../mixins/component-computed-mixin";
export default defineComponent({
    components: { FormItemWrapper },
    mixins: [ComponentPropsMixin, ComponentComputedMixin, ElementMixin, useExposeElementApi],
    created() {
        if (this.redactState) return;
        this.buildField();
        this.buildRule();
        this.buildEvent();
        this.buildOnCreated();
    },
    mounted() {
        if (this.redactState) return;
        this.buildRef();
        this.buildOnMounted();
    },
    beforeUnmount() {
        if (this.redactState) return;
        this.unregisterRef();
    },
})