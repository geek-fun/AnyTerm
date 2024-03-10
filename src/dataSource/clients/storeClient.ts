import { Store } from 'tauri-plugin-store-api';

export const secretClient = new Store('.secrets.st');
export const connectionClient = new Store('.connections.st');
