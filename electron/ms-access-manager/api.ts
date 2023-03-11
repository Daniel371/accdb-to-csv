import AccessToCSV from './ms-access-manager';

export const getTableNames = async (dbPath: string) => {
  const accessToCSV = new AccessToCSV(dbPath);
  return accessToCSV.getTableNames();
};

export const getTableColumns = async (dbPath: string, tableName: string) => {
  const accessToCSV = new AccessToCSV(dbPath);
  return accessToCSV.getTableColumns(tableName);
};
