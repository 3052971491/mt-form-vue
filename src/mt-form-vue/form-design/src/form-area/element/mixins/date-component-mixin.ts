import { defineComponent } from "vue";
export default defineComponent({
    computed: {
        /**
         * 判断 日期控件、时间控件
         */
        dateType() {
            const time = ['time-picker', 'time-range-picker']
            const date = ['date-picker', 'range-picker']
            const type = this.options.dateConfig.type;
            if (time.includes(type)) {
                return 'time';
            }
            else if (date.includes(type)) {
                return 'date';
            } else {
                return null;
            }
        },
        /**
         * 当前组件名
         */
        componentName() {
            return 'a-' + this.options.dateConfig.type;
        },
        /**
         * 时间控件 提示文字
         */
         timePlaceholder() {
            return (item: any) => {
                if (item.dateConfig.type == 'time-range-picker' || item.dateConfig.type == 'range-picker') {
                    return [item.startPlaceholder, item.endPlaceholder]
                } else {
                    return item.placeholder;
                }
            }
         },
    }
})