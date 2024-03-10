<template>
  <n-tabs
    v-model:value="valueRef"
    type="card"
    :addable="addableRef"
    :closable="closableRef"
    tab-style="min-width: 80px;"
    @close="handleClose"
    @add="handleAdd"
  >
    <n-tab-pane v-for="panel in panelsRef" :key="panel" :name="panel">
      <div class="ssh-list">
        <ssh-terminal v-if="terminalRef" />
        <ssh-list v-else @edit-connect="editSshHandler" />
      </div>
    </n-tab-pane>
  </n-tabs>
  <ssh-float-menu @add-ssh="addSsh" />
  <ssh-modal ref="sshModalRef" />
</template>

<script setup lang="ts">
import sshModal from './components/ssh-dialog.vue';
import sshList from './components/ssh-list.vue';
import sshTerminal from './components/ssh-terminal.vue';
import SshFloatMenu from './components/ssh-float-menu.vue';

// DOM
const sshModalRef = ref();

const terminalRef = ref(false);

const addSsh = () => sshModalRef.value.showMedal();

const editSshHandler = (row: object) => {
  sshModalRef.value.showMedal(row);
};

const valueRef = ref('home');
const panelsRef = ref(['home', '2', '3', '4', '5']);

const addableRef = computed(() => {
  return {
    disabled: panelsRef.value.length >= 10,
  };
});

const closableRef = computed(() => {
  return panelsRef.value.length > 1;
});
const handleAdd = () => {
  const newValue = `${panelsRef.value.length + 1}`;
  panelsRef.value.push(newValue);
  valueRef.value = newValue;
};

const handleClose = (name: string) => {
  const { value: panels } = panelsRef;
  const nameIndex = panels.findIndex(panelName => panelName === name);
  if (!~nameIndex) return;
  panels.splice(nameIndex, 1);
  if (name === valueRef.value) {
    valueRef.value = panels[Math.min(nameIndex, panels.length - 1)];
  }
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
    .editor-container {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
