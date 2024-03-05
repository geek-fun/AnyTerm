<template>
  <div class="secret-list">
    <n-card
      v-for="secret in secrets"
      :key="secret.id"
      :title="secret.name"
      hoverable
      @click="editSecret(secret)"
    >
      <template #header-extra>
        <div class="operation" @click.stop="">
          <n-dropdown
            trigger="click"
            :options="options"
            @select="(args: number) => handleSelect(args, secret)"
          >
            <n-icon size="20">
              <v-icon name="md-morehoriz" />
            </n-icon>
          </n-dropdown>
        </div>
      </template>
    </n-card>
    <new-key-dialog ref="editKeyDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { Secret, useSecretStore } from '../../../store';
import NewKeyDialog from './new-key-dialog.vue';
import { useLang } from '../../../lang';

const lang = useLang();
const secretStore = useSecretStore();

const { secrets } = toRefs(secretStore);

const editKeyDialogRef = ref();
const editSecret = (secret: Secret) => {
  editKeyDialogRef.value.showMedal(secret);
};
const options = reactive([{ key: 1, label: lang.t('secret.operations.remove') }]);
const handleSelect = (key: number, secret: Secret) => {
  switch (key) {
    case 1:
      deleteSecret(secret);
      break;
  }
};
const deleteSecret = (secret: Secret) => {
  secretStore.removeSecret(secret);
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
