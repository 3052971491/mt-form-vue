/** Html文本配置 */
export interface HtmlTextTyping {
  /** 表名 */
  __tableName__: string | null;
  /** 字段名 */
  __fieldName__: string | null;
  /** 是否隐藏 */
  hidden: boolean;
  /** 默认值 */
  defaultValue: string | null;
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
}