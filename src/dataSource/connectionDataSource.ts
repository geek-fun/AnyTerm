import { isTauri } from '../common';
import { connectionClient } from './clients/storeClient.ts';
import { Connection } from '../store';

const getConnections = async () => {
  if (isTauri()) {
    return connectionClient.values();
  }
};
const saveConnection = async (connection: Connection) => {
  if (isTauri()) {
    await connectionClient.set(`${connection.id}`, connection);

    await connectionClient.save();
  }
};

const removeConnection = async ({ id }: Connection) => {
  if (isTauri()) {
    await connectionClient.delete(`${id}`);

    await connectionClient.save();
  }
};

export const loadConnectionDataSource = () => ({
  getConnections,
  saveConnection,
  removeConnection,
});
