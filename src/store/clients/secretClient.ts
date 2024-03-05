import { Store } from 'tauri-plugin-store-api';
import { Secret } from '../secretStore.ts';
import { isTauri } from '../../common';

const store = new Store('.secrets.st');
const saveSecret = async (secret: Secret) => {
  if (isTauri()) {
    await store.set(`${secret.id}`, secret);

    await store.save();
  }
};
const removeSecret = async (secret: Secret) => {
  if (isTauri()) {
    await store.delete(`${secret.id}`);

    await store.save();
  }
};

const getSecrets = async () => {
  if (isTauri()) {
    return store.values();
  }
};

export const secretClient = { saveSecret, removeSecret, getSecrets };
