<template>
  <div ref="terminalContainer" class="terminal-container"></div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri';
import '@xterm/xterm/css/xterm.css';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from 'xterm-addon-fit';
import { defineProps } from 'vue';
import { Connection, useSecretStore } from '../../../store';

const props = defineProps({
  connectRef: {
    type: Object as () => Connection,
    required: true,
  },
});

const secretStore = useSecretStore();
const { getSecret, loadSecrets } = secretStore;

const terminal = new Terminal({
  cursorBlink: true, // 光标闪烁
  cursorStyle: 'bar',
  cursorInactiveStyle: 'underline', // 光标样式
  convertEol: true, // 回车换行
});
const fitAddon = new FitAddon();

const terminalContainer = ref();

const sequenceMap: { [key: string]: string } = {
  enter: '\r\n',
  backspace: '\b \b',
};
const commands: Array<string> = [];
let command = '';
// Handle the key event
terminal.onKey(e => {
  const code = e.domEvent.code.toLowerCase();

  const sequence = sequenceMap[code];

  if (code === 'enter') {
    commands.push(command);
    terminal.write(sequence);
    exec(command);
    command = '';
  } else if (code === 'backspace') {
    command = command.slice(0, -1);
    terminal.write(sequence);
  } else {
    terminal.write(e.key);
    command += e.key;
  }
});

const exec = (command: string) => {
  invoke('execute_ssh_command', { command })
    .then(res => {
      // eslint-disable-next-line
      console.log(`exec res ${res}`);
      terminal.writeln(res as string);
      terminal.writeln('');
    })
    .catch(e => {
      terminal.writeln(e);
      terminal.writeln('');
    });
};

onMounted(async () => {
  await loadSecrets();
  terminal.loadAddon(fitAddon);
  // Attach the terminal to the container
  terminal.open(terminalContainer.value);
  fitAddon.fit();
  terminal.focus();

  // Example: Write text to the terminal
  terminal.write('Welcome to AnyTerm!\r\n');
  // Optional: Add terminal handling logic, e.g., for executing commands
  // terminal.onData((data: string) => {
  //   terminal.write(data);
  //   console.log('terminal on data', data);
  // });
  const { host, port, secretId } = props.connectRef;
  const secret = await getSecret(secretId);
  // Invoke the command
  invoke('connect_ssh', { host, port, username: secret?.username, password: secret?.password })
    // eslint-disable-next-line no-console
    .then(res => console.log(`ssh connect res: ${res}`))
    // eslint-disable-next-line no-console
    .catch(e => console.error(`ssh connect err: ${e}`));
});
</script>

<style lang="scss" scoped>
.terminal-container {
  width: 100%;
  height: 100%;
}
</style>
