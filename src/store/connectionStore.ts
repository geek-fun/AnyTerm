import { defineStore } from 'pinia';
import { loadHttpClient } from '../common/httpClient';
import { loadConnectionDataSource } from '../dataSource';
import { ulid } from 'ulidx';

export type Connection = {
  id?: string;
  name: string;
  host: string;
  port: number;
  username: string;
  secretId: string;
};
export type ConnectionIndex = {
  health: string;
  status: string;
  index: string;
  uuid: string;
  docs: {
    count: number;
    deleted: number;
  };
  store: {
    size: string;
  };
  pri: {
    store: {
      size: string;
    };
  };
};

type Established =
  | (Connection & { indices: Array<ConnectionIndex>; activeIndex?: ConnectionIndex })
  | null;

const connectionDataSource = loadConnectionDataSource();

export const useConnectionStore = defineStore('connectionStore', {
  state: (): {
    connections: Connection[];
    established: Established;
  } => {
    return {
      connections: [],
      established: null,
    };
  },
  persist: true,
  getters: {
    establishedIndexNames(state) {
      return state.established?.indices.map(({ index }) => index) ?? [];
    },
  },
  actions: {
    async fetchConnections() {
      const connections = (await connectionDataSource.getConnections()) || this.connections;
      this.connections = connections as Connection[];
    },
    async testConnection(con: Connection) {
      const client = loadHttpClient(con);

      return await client.get(undefined, 'format=json');
    },
    async saveConnection(connection: Connection) {
      if (!connection.id) {
        connection.id = ulid();
        this.connections.push(connection);
      } else {
        const index = this.connections.findIndex(({ id }) => id === connection.id);
        this.connections[index] = connection;
      }
      await connectionDataSource.saveConnection(connection);
    },
    removeConnection(connection: Connection) {
      this.connections = this.connections.filter(item => item.id !== connection.id);
    },
    async establishConnection(connection: Connection) {
      await this.testConnection(connection);
      const client = loadHttpClient(connection);

      const data = await client.get('/_cat/indices', 'format=json');
      const indices = data.map((index: { [key: string]: string }) => ({
        ...index,
        docs: {
          count: parseInt(index['docs.count'], 10),
          deleted: parseInt(index['docs.deleted'], 10),
        },
        store: { size: index['store.size'] },
      }));
      this.established = { ...connection, indices };
    },
    selectIndex(indexName: string) {
      this.established = {
        ...this.established,
        activeIndex: this.established?.indices.find(({ index }) => index === indexName),
      } as Established;
    },
  },
});
