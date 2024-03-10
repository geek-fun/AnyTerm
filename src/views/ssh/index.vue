<template>
  <n-tabs
    v-model:value="currentPanelName"
    type="card"
    :addable="addableRef"
    :closable="closableRef"
    class="ssh-tab-container"
    @close="handleClose"
    @add="handleAdd"
  >
    <n-tab-pane
      v-for="panel in panelsRef"
      :key="panel.id"
      :name="panel.name"
      class="tab-pane-container"
    >
      <ssh-terminal v-if="panel.terminal" :connect-ref="panel.terminal" />
      <ssh-list
        v-else
        class="ssh-list"
        @edit-connect="editSshHandler"
        @establish-connect="event => establishSshHandler(event, panel)"
      />
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
import { Connection } from '../../store';
type Panel = {
  id: number;
  name: string;
  terminal?: Connection;
};
// DOM
const sshModalRef = ref();

const panelsRef = ref<Array<Panel>>([{ id: 0, name: 'home' }]);

const addSsh = () => sshModalRef.value.showMedal();
const editSshHandler = (row: object) => {
  sshModalRef.value.showMedal(row);
};
const establishSshHandler = (row: Connection, panel: Panel) => {
  // eslint-disable-next-line no-console
  console.log('establish emit', row);
  const exists = panelsRef.value.filter(panel => panel.terminal?.id === row.id);
  const panelIndex = panelsRef.value.findIndex(({ id }) => id === panel.id);
  const panelName = !exists.length ? row.name : `${row.name}-${exists.length}`;

  if (panel.id === 0) {
    panelsRef.value.push({ id: panelsRef.value.length + 1, name: panelName, terminal: row });
  } else {
    panelsRef.value[panelIndex] = { id: panel.id, name: panelName, terminal: row };
  }

  currentPanelName.value = panelName;
};

const currentPanelName = ref('home');
const addableRef = computed(() => {
  return {
    disabled: panelsRef.value.length >= 10,
  };
});

const closableRef = computed(() => {
  return panelsRef.value.length > 1;
});
const handleAdd = () => {
  const exists = panelsRef.value.filter(panel => panel.name.startsWith('SSH List'));
  const name = !exists.length ? 'SSH List' : `SSH List-${exists.length}`;

  panelsRef.value.push({ id: panelsRef.value.length, name });
  currentPanelName.value = name;
};

const handleClose = (name: string) => {
  const { value: panels } = panelsRef;
  const nameIndex = panels.findIndex(({ name: panelName }) => panelName === name);
  if (!~nameIndex) return;
  panels.splice(nameIndex, 1);
  if (name === currentPanelName.value) {
    currentPanelName.value = panels[Math.min(nameIndex, panels.length - 1)].name;
  }
};
</script>

<style lang="scss" scoped>
.ssh-tab-container {
  width: 100%;
  height: 99%;
  .tab-pane-container {
    height: 100%;
    width: 100%;
  }
}
</style>
