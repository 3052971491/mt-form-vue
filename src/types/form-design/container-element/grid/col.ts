export interface colTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** flex 布局填充 */
  flex: string | number | null;
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  offset: number;
  /** 栅格顺序，flex 布局模式下有效 */
  order: number;
  /** 栅格向左移动格数 */
  pull: number;
  /** 栅格向右移动格数 */
  push: number;
  /** 栅格占位格数，为 0 时相当于 display: none */
  span: number | null;
  /** ≥2000px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xxxl: number | object | null;
  /** <576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xs: number | object | null;
  /** ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  sm: number | object | null;
  /** ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  md: number | object | null;
  /** ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  lg: number | object | null;
  /** ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xl: number | object | null;
  /** ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xxl: number | object | null;
}
