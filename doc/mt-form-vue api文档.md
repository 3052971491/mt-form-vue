# mt-form-vue

## 表单渲染器

### API

| 方法名            | 参数                      | 描述             |
| ----------------- | ------------------------- | ---------------- |
| getFormConfig     | --                        | 获取表单配置     |
| getGolbalCss      | --                        | 获取全局CSS      |
| getGolbalFunction | --                        | 获取全局函数     |
| getDsv            | --                        | 获取数据源变量   |
| setDsv            | (key: string, value: any) | 设置数据源变量   |
| getGsv            | --                        | 获取全局变量     |
| setGsv            | (key: string, value: any) | 设置数据源变量   |
| getElementRef     | --                        | 获取组件实例列表 |
| getElementRefById | --                        | 获取组件实例     |
| getFormData       | --                        | 获取表单数据     |
| resetForm         | --                        | 重置表单         |
| clearValidate     | --                        | 清空表单         |
| setDisabledForm   | (val: boolean = false)    | 禁用/编辑表单    |

## 字段组件

### API

| 方法名                    | 参数                      | 描述                                 |
| ------------------------- | ------------------------- | ------------------------------------ |
| getElementRef             | --                        | 获取组件ref                          |
| setValue                  | (value: any)              | 设置组件数据                         |
| getValue                  | --                        | 获取组件数据                         |
| resetField                | --                        | 重置组件为默认值，并清除组件校验状态 |
| setDisabled               | (val: boolean)            | 设置组件是否禁用                     |
| getDisabled               | --                        | 获取组件是否禁用                     |
| setHidden                 | (val: boolean)            | 设置组件是否隐藏                     |
| getHidden                 | --                        | 获取组件是否隐藏                     |
| setRequired               | --                        | 设置组件是否必填                     |
| getRequired               | --                        | 获取组件是否必填                     |
| setLabel                  | (val: string)             | 设置组件标签文字（label）            |
| getLabel                  | --                        | 获取组件标签文字（label）            |
| formatOptions             | (data: any, alias: Alias) | 格式化数据来源合适，配合alias使用    |
| getElementRefList         | --                        | 获取组件ref列表                      |
| getElementRefById         |                           | 根据唯一标识获取组件ref              |
| getFormConfig             | --                        | 获取表单配置                         |
| getGolbalFunction         | --                        | 获取全局函数                         |
| getDsv                    | --                        | 获取数据源变量                       |
| getGsv                    | --                        | 获取全局变量                         |
| setDsv                    | (key: string, value: any) | 设置数据源变量                       |
| setGsv                    | (key: string, value: any) | 设置数据源变量                       |
| getInputNumberAddonBefore | --                        | 数值输入框 获取前缀                  |
| setInputNumberAddonBefore | (val: string)             | 数值输入框 设置前缀                  |
| getInputNumberAddonAfter  | --                        | 数值输入框 获取后缀                  |
| setInputNumberAddonAfter  | (val: string)             | 数值输入框 设置后缀                  |
