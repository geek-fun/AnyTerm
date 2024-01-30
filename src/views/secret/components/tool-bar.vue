<template>
  <div class="tool-bar-container">
    <n-button class="add-secret-btn" @click="addSecret">{{ $t('secret.new') }}</n-button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['newSecretEmit']);

const addSecret = () => {
  emit('newSecretEmit');
};
</script>

<style lang="scss" scoped>
.tool-bar-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  .add-secret-btn {
    height: 30px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: #fff;
    background-color: var(--theme-color);
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: var(--theme-color-hover);
    }
  }
}
</style>
