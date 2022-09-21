/** 校验规则 */
export interface RuleConfig {
    /** 类型 */
    type: string | null;
    /** 正则 */
    pattern: RegExp | string | null;
    /** 提示信息 */
    message: string | null;
}