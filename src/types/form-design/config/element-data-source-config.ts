import { DataSourceType } from '/@/enums/form-design/element-enum';
/**
 * 组件数据源配置
 * 相关组件: 单选框，多选框，下拉选择，级联选择，树选择
 */
export interface ElementDataSourceConfig {
    /** 类型: 默认 default, 自定义数据源 custom */
    type: DataSourceType;
    /** 数据源接口来源api */
    api: string | number | null;
    /**  数据源接口配置 */
    options: Array<ElementDataSourceOptions>;
}

/** 组件数据源Option配置 */
export interface ElementDataSourceOptions {
    label: string | null;
    value: string | number | boolean | null;
    disabled: boolean | null;
    children?: Array<ElementDataSourceOptions>
}