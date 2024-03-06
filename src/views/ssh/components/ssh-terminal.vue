<template>
  <div>
    <div ref="terminalContainer"></div>
  </div>
</template>

<script setup lang="ts">
import '@xterm/xterm/css/xterm.css';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from 'xterm-addon-fit';

const terminal = new Terminal({
  cursorBlink: true, // 光标闪烁
  cursorStyle: 'bar',
  cursorInactiveStyle: 'underline', // 光标样式
});
const fitAddon = new FitAddon();

const terminalContainer = ref();

// Handle the key event
terminal.onKey(e => {
  const code = e.domEvent.code.toLowerCase();
  const enter = () => terminal.write('\r\n');
  const backspace = () => terminal.write('\b \b');
  const write = (key: string) => terminal.write(key);
  const keyActions: { [key: string]: () => void } = {
    enter,
    backspace,
  };
  (keyActions[code] || (() => write(e.key)))();
});

onMounted(() => {
  terminal.loadAddon(fitAddon);
  // Attach the terminal to the container
  terminal.open(terminalContainer.value);
  fitAddon.fit();

  // Example: Write text to the terminal
  terminal.write('Welcome to the Vue 3 + xterm.js example!\r\n');

  // Optional: Add terminal handling logic, e.g., for executing commands
  // terminal.onData((data: string) => {
  //   terminal.write(data);
  //   console.log('terminal on data', data);
  // });
});
</script>

<style lang="scss" scoped></style>
