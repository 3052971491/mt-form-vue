<template>
  <div class="datasource-container">
    <div v-if="hasDatasource" class="datasource-info-list">
      <a-list
        item-layout="horizontal"
        :data-source="formConfig.dataSources"
        itemLayout="vertical"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.requestURL">
              <template #title>
                {{ item.uniqueName }}
              </template>
            </a-list-item-meta>
            <template #actions>
              <a @click.prevent="handleDatasourceEditClick(item)">{{
                t("edit")
              }}</a>
              <a-popconfirm
                :title="t('isConfirmDeleteData')"
                :ok-text="t('yes')"
                :cancel-text="t('no')"
                @confirm="handleDatasourceDelClick(item)"
              >
                <a>{{ t("delete") }}</a>
              </a-popconfirm>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <mt-empty v-else :description="t('noDatasource')" />
    <div class="datasource-add-btn">
      <a-button shape="round" type="primary" @click="handleOpenDrawer">{{
        t("add") + t("datasource")
      }}</a-button>
      <a-button shape="round" type="text" @click="handleOpenModal">{{
        t("config") + t("variable")
      }}</a-button>
    </div>
    <datasource-drawer
      ref="datasourceDrawer"
      :central="central"
      v-model:formConfig="config"
    />
    <event-handler-drawer title="数据源变量" ref="settvarModal" v-model:value="config.DSV" :mode="MODE.JSON"></event-handler-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, nextTick } from "vue";
import DatasourceDrawer from "../components/popup-area//datasource-drawer.vue";
import MtEmpty from "/@/components/mt-empty.vue";
import { dataSourcesConfigTyping } from "../event/element-event/form/form-config-typing";
import { t } from "/@/utils/i18n";
import EventHandlerDrawer from '../components/popup-area/event-handler-drawer.vue';
import { MODE } from "/@/components/codemirror/typing";
export default defineComponent({
  name: "DatasourceSetting",
  components: { MtEmpty, DatasourceDrawer, EventHandlerDrawer },
  props: {
    central: Object,
    formConfig: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:formConfig"],
  setup(props, { emit }) {
    const { formConfig } = toRefs(props);
    const datasourceDrawer = ref();
    const settvarModal = ref();
    /**
     * 判断是否存在数据源
     */
    const hasDatasource = computed(() => {
      return (
        !!formConfig.value.dataSources &&
        formConfig.value.dataSources.length > 0
      );
    });
    const config = computed({
      get: () => formConfig.value,
      set: (value) => emit("update:formConfig", value),
    });
    const handleOpenDrawer = function () {
      datasourceDrawer.value.showDrawer();
    };
    /**
     * 编辑数据源
     */
    const handleDatasourceEditClick = function ({
      dataSourceId,
    }: dataSourcesConfigTyping) {
      datasourceDrawer.value.showDrawer(dataSourceId);
    };
    const handleDatasourceDelClick = function ({
      dataSourceId,
    }: dataSourcesConfigTyping) {
      const idx: number = config.value.dataSources.findIndex(
        (item: dataSourcesConfigTyping) => {
          return item.dataSourceId === dataSourceId;
        }
      );
      config.value.dataSources.splice(idx, 1);
    };
    /**
     * 编辑变量，打开弹框
     */
    const handleOpenModal = () => {
      nextTick(() => {
        settvarModal.value.onShow();
      });
    };
    return {
      t,
      MODE,
      config,
      hasDatasource,
      datasourceDrawer,
      handleOpenDrawer,
      handleDatasourceEditClick,
      handleDatasourceDelClick,
      settvarModal,
      handleOpenModal,
    };
  },
});
</script>

<style lang="less" scoped>
.datasource-container {
  .datasource-add-btn {
    text-align: center;
    margin: 12px 0;
  }
}
</style>
