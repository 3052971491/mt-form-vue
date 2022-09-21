/** 时间组件配置 */
export interface DateConfig {
  /** 
    * 时间选择 time-picker
    * 时间范围选择 time-range-picker
    * 日期选择 date-picker
    * 日期范围选择 range-picker
    */
  type: 'time-picker' | 'time-range-picker' | 'date-picker' | 'range-picker',
}