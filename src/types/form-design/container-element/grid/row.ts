import { Align, Justify } from '/@/enums/form-design/row-enum';
export interface rowTyping {
  /** 自定义样式 */
  customStyles: Array<string>,
  /** flex 布局下的垂直对齐方式：top middle bottom */
  align: Align;
  /** 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]（1.5.0 后支持）。 */
  gutter: number | object | Array<any>;
  /** flex 布局下的水平排列方式：start end center space-around space-between */
  justify: Justify;
  /** 是否自动换行 */
  wrap: boolean;
}
