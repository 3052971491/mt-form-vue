/** 静态文本配置 */
export interface StaticTextTyping {
  /** 是否隐藏 */
  hidden: boolean;
  /** 自定义样式 */
  customStyles: Array<string>,
  /** 内容 */
  content: string;
  /** 创建时 */
  onCreated: string | null;
  /** 挂载时 */
  onMounted: string | null;
}
