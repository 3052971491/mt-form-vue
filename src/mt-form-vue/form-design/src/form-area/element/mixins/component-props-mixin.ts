import { defineComponent } from "vue";

export default defineComponent({
  props: {
    element: {
      type: Object,
      default: () => { },
    },
    central: {
      type: Object,
      default: () => { },
    },
    redactState: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => { },
    },
    parentList: {
      type: Array,
      default: () => [],
    },
    indexOfParentList: Number,
    parentElement: Object,
  },
})