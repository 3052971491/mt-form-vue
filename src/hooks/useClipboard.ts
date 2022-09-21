import { nextTick } from "vue";
import ClipboardJS from 'clipboard';
import { message } from 'ant-design-vue';
export default function () {
    /**
     * 对应组件需添加此属性
     * :data-clipboard-text="待复制值"
     */
    let ClipboardJSObj = null as any;
    function copy(className: string) {
        if (!className) return;
        if (ClipboardJSObj) {
            ClipboardJSObj.destroy();
        }
        ClipboardJSObj = new ClipboardJS(`.${className}`);
        nextTick(() => {
            ClipboardJSObj.on('success', function (e: { clearSelection: () => void; }) {
                message['success']('成功复制到剪切板，可粘贴。');
                e.clearSelection();
                if (ClipboardJSObj) {
                    ClipboardJSObj.destroy();
                }
            });
        });
    }
    return {
        copy
    }
}