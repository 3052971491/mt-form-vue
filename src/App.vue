<template>
  <div style="height: 100%">
    <mt-form-design ref="design"></mt-form-design>
    <!-- <a-button @click="fieldNameValidate">fieldNameValidate</a-button> -->
    <!-- <a-button @click="showDesignRef">获取设计器ref</a-button>
    <a-button @click="disableda(true)">禁用某一组件</a-button>
    <a-button @click="disableda(false)">取消禁用某一组件</a-button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const design = ref();

function showDesignRef() {
    console.log(design.value);
}
function disableda(val: boolean) {
  design.value.getElementRef('0ac19a11d29b4e95a5d2862cb40b0830').setDisabled(val)
}

function fieldNameValidate() {
  design.value.fieldNameValidate();
}
</script>

