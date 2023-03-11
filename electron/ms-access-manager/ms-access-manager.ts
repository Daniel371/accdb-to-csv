import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';

import ADODB from 'node-adodb';

const DATA_TYPES = {
  2: 'Short',
  3: 'Long',
  4: 'Single',
  5: 'Double',
  6: 'Currency',
  7: 'DateTime',
  11: 'YesNo',
  17: 'Byte',
  72: 'GUID',
  130: 'Memo',
  131: 'ReplicationID',
  205: 'OLEObject',
  128: 'BigInt',
  203: 'VarBinary',
  201: 'LongVarBinary',
  200: 'LongVarWChar',
  202: 'VarWChar',
  129: 'VarNumeric',
  135: 'Decimal',
};

class AccessToCSV {
  dbName: string;

  dbPath: string;

  outputFolder: string;

  DB_EXTENSIONS: string[];

  connectionString: string;

  ext: string;

  params: [string, boolean?];

  connection: ReturnType<typeof ADODB.open>;

  constructor(dbPath: string, dbName?: string, outputFolder?: string) {
    this.dbPath = dbPath;
    this.dbName = dbName;
    this.outputFolder = outputFolder;
    this.DB_EXTENSIONS = ['.accdb', '.mdb'];
    this.ext = path.extname(this.dbPath).toLowerCase();
    this.params = this.getConnectionParams();
    this.connection = ADODB.open(...this.params);
  }

  // Function to generate output file path
  generateOutputFilePath(tbName: string) {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const sec = `0${date.getSeconds()}`.slice(-2);
    const mili = `000${date.getMilliseconds()}`.slice(-3);
    const formattedDate = `${year}_${month}_${day}_${sec}_${mili}`;
    const outputFileName = `${this.dbName}_${tbName}-${formattedDate}.csv`;
    let outputFilePath = path.join(this.outputFolder, outputFileName);

    // Check if output file exists in the output folder
    // If it exists, regenerate the output file path
    if (existsSync(outputFilePath)) {
      outputFilePath = this.generateOutputFilePath(tbName);
    }
    return outputFilePath;
  }

  getConnectionParams(): [string, boolean?] {
    if (this.ext === '.mdb') {
      return [`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${this.dbPath};`];
    }
    return [
      `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${this.dbPath};`,
      true,
    ];
  }

  // Function to get table names from Access database
  async getTableNames() {
    // TABLE, LINK, ACCESS TABLE, SYSTEM TABLE, VIEW
    let result: Array<string> = [];
    let errorMsg: string | null = null;

    try {
      const schema: Array<Record<string, unknown>> =
        await this.connection.schema(20);
      result = schema.reduce(
        (acc, table) =>
          table.TABLE_TYPE === 'TABLE' ? [...acc, table.TABLE_NAME] : acc,
        []
      );
    } catch (error) {
      errorMsg = JSON.stringify(error);
    }

    return new Promise((resolve, reject) => {
      if (errorMsg) {
        reject(errorMsg);
      } else {
        resolve(result);
      }
    });
  }

  async getTableColumns(tableName: string) {
    let result: Array<{ name: string; type: string }> = [];
    let errorMsg: string | null = null;

    try {
      const schema: Array<Record<string, string>> =
        await this.connection.schema(4, [null, null, tableName]);
      result = schema.map((column) => {
        return {
          name: column.COLUMN_NAME,
          type: `Data Type - ${DATA_TYPES[column.DATA_TYPE]}`,
        };
      });
    } catch (error) {
      errorMsg = JSON.stringify(error);
    }

    return new Promise((resolve, reject) => {
      if (errorMsg) {
        reject(errorMsg);
      } else {
        resolve(result);
      }
    });
  }
}

export default AccessToCSV;

// Function to write Access database tables to CSV
// async writeTablesToCSV(database_paths: string[]) {
// try {
// Loop through each database
// database_paths.forEach((path) => {
//   const buffer = readFileSync(path);
//     const reader = new MDBReader(buffer);
//     const tableNames = reader.getTableNames();
//     // Loop through each table
//     tableNames.forEach(async (tableName) => {
//       const table = reader.getTable(tableName);
//       const columnNames = table.getColumnNames();
//       const outputData = table.getData();
//       // Generate CSV column names for csv-writer
//       const csvColumnNames = columnNames.map((columnName) => ({
//         id: columnName,
//         title: columnName,
//       }));
//       const outputFilePath = this.generateOutputFilePath(tableName);
//       // Write to CSV
//       const csvWriter = createObjectCsvWriter({
//         path: outputFilePath,
//         header: csvColumnNames,
//       });
//       await csvWriter.writeRecords(outputData);
//       console.log('CSV file written successfully.');
//     });
//   });
// } catch (err) {
//   console.log(err);
// }
// }
