import { defineStore } from 'pinia';
import { loadHttpClient } from '../common/httpClient';

export type Connection = {
  id?: number;
  name: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  queryParameters?: string;
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

const buildPath = (index: string | undefined, path: string | undefined) => {
  return index &&
    !['_nodes', '_cluster', '_cat', '_bulk', '_aliases', '_analyze'].includes(
      path?.split('/')[0] ?? '',
    )
    ? `/${index}/${path}`
    : `/${path}`;
};

export const useConnectionStore = defineStore('connectionStore', {
  state(): {
    connections: Connection[];
    established: Established;
  } {
    return {
      connections: [],
      established: null,
    };
  },
  getters: {
    establishedIndexNames(state) {
      return state.established?.indices.map(({ index }) => index) ?? [];
    },
  },
  actions: {
    async fetchConnections() {
      this.connections = [];
    },
    async testConnection(con: Connection) {
      const client = loadHttpClient(con);

      return await client.get(undefined, 'format=json');
    },
    saveConnection(connection: Connection) {
      const index = this.connections.findIndex(item => item.id === connection.id);
      if (index >= 0) {
        this.connections[index] = connection;
      } else {
        this.connections.push({ ...connection, id: this.connections.length + 1 });
      }
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
    async searchQDSL({
      method,
      path,
      index,
      qdsl,
    }: {
      method: string;
      path: string;
      index?: string;
      qdsl?: string;
    }) {
      if (!this.established) throw new Error('no connection established');
      const client = loadHttpClient(this.established);

      const reqPath = buildPath(index, path);
      const body = qdsl ? JSON.parse(qdsl) : undefined;

      // eslint-disable-next-line no-console
      console.log('before req', { index, qdsl, method, path });
      const dispatch: { [method: string]: () => Promise<unknown> } = {
        POST: async () => client.post(reqPath, undefined, body),
        PUT: async () => client.put(reqPath, undefined, body),
        DELETE: async () => client.delete(reqPath, undefined, body),
        GET: async () =>
          body ? client.post(reqPath, undefined, body) : client.get(reqPath, 'format=json'),
      };
      return dispatch[method]();
    },
  },
});