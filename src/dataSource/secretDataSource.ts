import { Secret } from '../store';
import { isTauri } from '../common';
import { secretClient } from './clients/storeClient.ts';
const saveSecret = async (secret: Secret) => {
  if (isTauri()) {
    await secretClient.set(`${secret.id}`, secret);

    await secretClient.save();
  }
};
const removeSecret = async (secret: Secret) => {
  if (isTauri()) {
    await secretClient.delete(`${secret.id}`);

    await secretClient.save();
  }
};

const getSecrets = async () => {
  if (isTauri()) {
    return secretClient.values();
  }
};

export const loadSecretsDataSource = () => ({
  saveSecret,
  removeSecret,
  getSecrets,
});
