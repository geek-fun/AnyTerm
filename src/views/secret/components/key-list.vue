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
.n-card {
  max-width: 300px;
}
</style>
