import { LazyStore } from '@tauri-apps/plugin-store';

export const secretClient = new LazyStore('.secrets.st', { autoSave: false });
export const connectionClient = new LazyStore('.connections.st', { autoSave: false });
