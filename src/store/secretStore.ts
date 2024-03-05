import { defineStore } from 'pinia';
import { ulid } from 'ulidx';
import { secretClient } from './clients/secretClient.ts';
export enum SecretType {
  SSH_KEY = 'SSH_KEY',
  PASSWORD = 'PASSWORD',
}
export type Secret = {
  id?: string;
  name: string;
  type: SecretType;
  priKey?: string;
  pubKey?: string;
  username?: string;
  password?: string;
};
export const useSecretStore = defineStore('secretStore', {
  state(): {
    secrets: Secret[];
  } {
    return {
      secrets: [],
    };
  },
  getters: {},
  actions: {
    async loadSecrets() {
      const secrets = (await secretClient.getSecrets()) || [];
      this.secrets = secrets as Secret[];
    },
    async saveSecret(secret: Secret) {
      if (!secret.id) {
        secret.id = ulid();
        this.secrets.push(secret);
      } else {
        const index = this.secrets.findIndex(s => s.id === secret.id);
        this.secrets[index] = secret;
      }
      await secretClient.saveSecret(secret);
    },
    async removeSecret(secret: Secret) {
      const index = this.secrets.findIndex(s => s.id === secret.id);
      this.secrets.splice(index, 1);
      await secretClient.removeSecret(secret);
    },
  },
});
