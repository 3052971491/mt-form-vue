<template>
  <form-item-wrapper 
    :element="element" 
    :central="central" 
    :redact-state="redactState" 
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList" 
    :parent-element="parentElement" 
    :rules="reactiveData.rules"
  >
  <a-image-preview-group>
      <a-image
        v-for="(item, index) in imageList"
        :key="index"
        :width="options.width + options.widthUnit"
        :height="options.height + options.heightUnit"
        :alt="options.alt"
        :fallback="fallbackImage(options.fallback)"
        :src="item"
      />
    </a-image-preview-group>
  </form-item-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ComponentsMixin from "../mixins/components-mixin";
import { isNil } from 'lodash-es';
import { httpFactory } from '/@/implements/service-proxies';
export default defineComponent({
  name: "MtImageElement",
  mixins: [ComponentsMixin],
  computed: {
      formartUrl() {
        return (url: string) => {
          return httpFactory.getRemoteServiceBaseUrl() + '/' + url;
        };
      },
      imageList(): Array<string> {
        if (isNil(this.modelValue)) return [];
        if (Array.isArray(this.modelValue)) {
          return (this.modelValue as any).map((item: string) => {
            return this.formartUrl(item);
          });
        } else {
          return [this.formartUrl(this.modelValue)];
        }
      },
      fallbackImage() {
        return (item: string | null) => {
          if (!item) return '';
          return this.formartUrl(item);
        };
      },
    },
});
</script>