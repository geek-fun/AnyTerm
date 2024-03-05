<template>
  <div class="ssh-container">
    <div v-if="isPannelOpen" class="ssh-list">
      <div class="add-ssh" @click="addSsh">
        <v-icon name="md-add" />
        <span>{{ $t('ssh.new') }}</span>
      </div>
      <ssh-list @edit-connect="editSshHandler" />
    </div>
    <div class="ssh-body">
      <div class="table-select">
        <ssh-selector />
      </div>
      <div class="editor-container"></div>
    </div>
  </div>
  <ssh-modal ref="sshModalRef" />
</template>

<script setup lang="ts">
import sshModal from './components/ssh-dialog.vue';
import sshList from './components/ssh-list.vue';
import sshSelector from './components/ssh-selector.vue';
import { useAppStore } from '../../store';

const appStore = useAppStore();
// DOM
const sshModalRef = ref();

const isPannelOpen = computed(() => {
  return appStore.connectPannel;
});

onMounted(() => {
  if (!appStore.connectPannel) {
    appStore.setConnectPannel();
  }
});
const addSsh = () => sshModalRef.value.showMedal();

const editSshHandler = (row: object) => {
  sshModalRef.value.showMedal(row);
};
</script>

<style lang="scss" scoped>
.ssh-container {
  height: 100%;
  width: 100%;
  display: flex;
  .ssh-list {
    width: 200px;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    .add-ssh {
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
  .ssh-body {
    flex: 1;
    width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .table-select {
      height: 40px;
      border-bottom: 1px solid var(--border-color);
    }
    .editor-container {
      flex: 1;
      height: 0;
    }
  }
}
</style>
