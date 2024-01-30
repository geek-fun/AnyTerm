<template>
  <div>
    <tool-bar @new-secret-emit="toolBarEmit" />
    <new-key-dialog ref="addKeyDialogRef" />
  </div>
</template>

<script setup lang="ts">
import ToolBar from './components/tool-bar.vue';
import NewKeyDialog from './components/new-key-dialog.vue';

const addKeyDialogRef = ref();
const toolBarEmit = () => {
  addKeyDialogRef.value.showMedal();
};
</script>

<style lang="scss" scoped></style>
