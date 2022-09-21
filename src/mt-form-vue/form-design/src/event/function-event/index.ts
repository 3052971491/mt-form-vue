
export const insertGlobalFunctionsToHtml = function (func: string | null, formId = '') {
    if (!func) return;
    let bodyEle = document.getElementsByTagName('body')[0];
    let oldScriptEle = document.getElementById('mt-form-vue-global-functions');
    !!oldScriptEle && bodyEle.removeChild(oldScriptEle);
    if (!!formId) {
        oldScriptEle = document.getElementById('mt-form-vue-global-functions' + '-' + formId);
        !!oldScriptEle && bodyEle.removeChild(oldScriptEle);
    }

    let newScriptEle = document.createElement('script');
    newScriptEle.id = !!formId ?
        'mt-form-vue-global-functions' + '-' + formId :
        'mt-form-vue-global-functions';
    newScriptEle.type = 'text/javascript';
    newScriptEle.innerHTML = func;
    bodyEle.appendChild(newScriptEle);
};

export const getGlobalFunctions = function (func: string) {
    let funcList: any[] = [];
    let regExp = /function .* ()/g;
    let result = func.match(regExp)?.map((item) => {
        return item.replace('function', '').replace(/\s*/g,"").replace('()', '')
    });
    let funcNameArray: string[] = [];

    if (!!result && result.length > 0) {
        result.forEach((item) => {

        })
    }
    funcList = Array.from(new Set(result))
    return funcList;
}