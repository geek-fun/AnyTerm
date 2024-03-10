<template>
  <div class="ssh-list-body">
    <n-card
      v-for="connection in connections"
      :key="connection.id"
      :title="connection.name"
      hoverable
    >
      <template #header-extra>
        <div class="operation" @click.stop="">
          <n-dropdown
            trigger="click"
            :options="options"
            @select="(args: number) => handleSelect(args, connection)"
          >
            <n-icon size="20">
              <v-icon name="md-morehoriz" />
            </n-icon>
          </n-dropdown>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLang } from '../../../lang';
import { Connection, useConnectionStore } from '../../../store';

const emits = defineEmits(['edit-connect', 'establish-connect']);

const dialog = useDialog();
const message = useMessage();
const lang = useLang();

const options = reactive([
  { key: 1, label: lang.t('ssh.operations.connect') },
  { key: 2, label: lang.t('ssh.operations.edit') },
  { key: 3, label: lang.t('ssh.operations.remove') },
]);
const connectionStore = useConnectionStore();
const { fetchConnections, removeConnection } = connectionStore;
const { connections } = storeToRefs(connectionStore);
fetchConnections();

const handleSelect = (key: number, connection: Connection) => {
  switch (key) {
    case 1:
      establishConnect(connection);
      break;
    case 2:
      editConnect(connection);
      break;
    case 3:
      removeConnect(connection);
      break;
  }
};

const establishConnect = async (connection: Connection) => {
  emits('establish-connect', connection);
};

// edit connect info
const editConnect = (connection: Connection) => {
  emits('edit-connect', connection);
};
const removeConnect = (connection: Connection) => {
  dialog.warning({
    title: lang.t('dialogOps.warning'),
    content: lang.t('dialogOps.removeNotice'),
    positiveText: lang.t('dialogOps.confirm'),
    negativeText: lang.t('dialogOps.cancel'),
    onPositiveClick: () => {
      removeConnection(connection);
      message.success(lang.t('dialogOps.removeSuccess'));
    },
  });
};
</script>

<style lang="scss" scoped>
.ssh-list-body {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}
.n-card {
  max-width: 300px;
}

.ssh-list-body .n-card:hover {
  cursor: pointer;
}
</style>
