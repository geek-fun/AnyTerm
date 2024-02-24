<template>
  <div class="secret-list">
    <n-card
      v-for="secret in secrets"
      :key="secret.id"
      :title="secret.name"
      hoverable
      @click="editSecret(secret)"
    >
    </n-card>
    <new-key-dialog ref="editKeyDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { Secret, useSecretStore } from '../../../store';
import NewKeyDialog from './new-key-dialog.vue';

const secretStore = useSecretStore();

const { secrets } = toRefs(secretStore);

const editKeyDialogRef = ref();
const editSecret = (secret: Secret) => {
  editKeyDialogRef.value.showMedal(secret);
  // eslint-disable-next-line no-console
  console.log(secret);
};
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
