<template>
  <n-float-button
    position="fixed"
    type="primary"
    menu-trigger="click"
    bottom="40px"
    right="40px"
    width="40px"
    height="40px"
  >
    <v-icon name="hi-solid-plus" scale="1.2" />
    <template #menu>
      <n-float-button @click="addSsh">
        <v-icon name="hi-solid-plus" />
        <template #description>Add SSH</template>
      </n-float-button>
      <n-float-button>
        <v-icon name="hi-solid-plus" />
      </n-float-button>
      <n-float-button>
        <v-icon name="hi-solid-plus" />
      </n-float-button>
    </template>
  </n-float-button>
</template>

<script setup lang="ts">
const emits = defineEmits(['add-ssh']);
const addSsh = () => {
  emits('add-ssh');
};
</script>

<style lang="scss" scoped></style>
