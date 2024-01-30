import { defineStore } from 'pinia';

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
  actions: {},
});
