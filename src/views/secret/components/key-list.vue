<template>
  <div class="secret-list">
    <n-card v-for="secret in secrets" :key="secret.id" :title="secret.name" hoverable> </n-card>
  </div>
</template>

<script setup lang="ts">
import { useSecretStore } from '../../../store';

const secretStore = useSecretStore();

const { secrets } = toRefs(secretStore);
</script>

<style lang="scss" scoped>
.secret-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}
.secret-list .n-card:hover {
  cursor: pointer;
}

.n-card {
  max-width: 300px;
}
</style>
