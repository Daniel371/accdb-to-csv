export {};

declare global {
  interface Window {
    app: {
      getDatabases: () => Promise<unknow>;
      addDatabase: (name: string, path: string) => Promise<unknow>;
      deleteDatabase: (id: number) => Promise<unknow>;
      getTableNames: (dbPath: string) => Promise<unknow>;
      getTableColumns: (dbPath: string, tableName: string) => Promise<unknow>;
    };
  }
}
