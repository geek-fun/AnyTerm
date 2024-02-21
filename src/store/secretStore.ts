import { defineStore } from 'pinia';
import { ulid } from 'ulidx';
export enum SecretType {
  SSH_KEY = 'SSH_KEY',
  PASSWORD = 'PASSWORD',
}
export type Secret = {
  id?: number;
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
    saveSecret(secret: Secret) {
      if (!secret.id) {
        secret.id = ulid();
        this.secrets.push(secret);
      } else {
        const index = this.secrets.findIndex(s => s.id === secret.id);
        this.secrets[index] = secret;
      }
    },
  },
});
