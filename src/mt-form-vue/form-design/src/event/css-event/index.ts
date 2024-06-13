
/**
 * 将全局CSS 插入html头部
 * @param css 全局CSS
 * @param formId 表单Id
 */
export const insertGlobalCssToHead = function (css: string | null, formId = '') {
    if (!css) return;
    let head = document.getElementsByTagName('head')[0];
    let oldStyle = document.getElementById('mt-form-vue-global-css');
    // 清除
    if (!!oldStyle) {
        head.removeChild(oldStyle);
    }
    if (!!formId) {
        oldStyle = document.getElementById('mt-form-vue-global-css' + '-' + formId);
        !!oldStyle && head.removeChild(oldStyle);
    }

    // 新增
    let newStyle = document.createElement('style') as any;
    newStyle.type = 'text/css';
    newStyle.rel = 'stylesheet';
    newStyle.id = !!formId ? 'mt-form-vue-global-css' + '-' + formId : 'mt-form-vue-global-css';
    try {
        newStyle.appendChild(document.createTextNode(css));
    } catch (ex) {
        newStyle.styleSheet.cssText = css;
    }
    head.appendChild(newStyle);
};

export const getGolbalCssList = function (css: string) {
    let cssList: any[] = [];
    let regExp = /\..*{/g;
    let result = css.match(regExp);
    let cssNameArray: string[] = [];

    if (!!result && result.length > 0) {
        result.forEach((rItem) => {
            let classArray = rItem.split(','); //切分逗号分割的多个class
            if (classArray.length > 0) {
                classArray.forEach((cItem) => {
                    let caItem = cItem.trim();
                    if (caItem.indexOf('.', 1) !== -1) {
                        //查找第二个.位置
                        let newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf('.', 1)); //仅截取第一、二个.号之间的class
                        if (!!newClass) {
                            cssNameArray.push(newClass.trim());
                        }
                    } else if (caItem.indexOf(' ') !== -1) {
                        //查找第一个空格位置
                        let newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf(' ')); //仅截取第一、二个.号之间的class
                        if (!!newClass) {
                            cssNameArray.push(newClass.trim());
                        }
                    } else {
                        if (caItem.indexOf('{') !== -1) {
                            //查找第一个{位置
                            let newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf('{'));
                            cssNameArray.push(newClass.trim());
                        } else {
                            let newClass = caItem.substring(caItem.indexOf('.') + 1);
                            cssNameArray.push(newClass.trim());
                        }
                    }
                });
            }
        });
    }
    cssList.splice(0, cssList.length); //清除数组必须用splice，length=0不会响应式更新！！
    cssList = Array.from(new Set(cssNameArray)); //数组去重
    return cssList;
};