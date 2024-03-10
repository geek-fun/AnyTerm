import { defineStore } from 'pinia';
import { ulid } from 'ulidx';
import { loadSecretsDataSource } from '../dataSource';

const secretDataSource = loadSecretsDataSource();
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
  state: (): {
    secrets: Secret[];
  } => {
    return {
      secrets: [],
    };
  },
  persist: true,
  getters: {},
  actions: {
    async loadSecrets() {
      const secrets = (await secretDataSource.getSecrets()) || this.secrets;
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
      await secretDataSource.saveSecret(secret);
    },
    async removeSecret(secret: Secret) {
      const index = this.secrets.findIndex(s => s.id === secret.id);
      this.secrets.splice(index, 1);
      await secretDataSource.removeSecret(secret);
    },
    async getSecret(secretId: string) {
      return this.secrets.find(({ id }) => id === secretId);
    },
  },
});
