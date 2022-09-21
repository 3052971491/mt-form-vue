import { defineComponent } from "vue";
import { IBsicElementOption } from '/@/types/form-design/basic-element/index-typing';
import { ElementDataSourceOptions } from '/@/types/form-design/config/element-data-source-config';
import { http, getDataSourceByApi } from '/@/utils/http/http-cilent'
/**
 * 相关组件: 单选框，多选框，下拉选择，级联选择，树选择
 */
export default defineComponent({
  data() {
    return {
      optionList: [] as Array<ElementDataSourceOptions>,
    };
  },
  mounted() {
    this.initOptions();
  },
  methods: {
    /**
     * 加载自定义接口
     * TODO
     * 待完善
     */
    initOptions() {
      const { dataSourceConfig, alias }: IBsicElementOption = this.options;
        switch (dataSourceConfig.type) {
          case 'default':
            this.optionList = this.formatOptions(dataSourceConfig.options, alias);
            break;
          case 'custom':
            this.optionList = [];
            if (this.redactState) {
              return;
            }
            const dataSources = getDataSourceByApi(dataSourceConfig.api, this.config.dataSources)
            if (!!dataSources) {
              http(dataSources, this.config.DSV, this.config.GSV).then((res: any) => {
                this.optionList = this.formatOptions(res, alias);
              });
            }
            break;
          default:
            break;
        }
    },
  },
});
