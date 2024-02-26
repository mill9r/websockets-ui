type Row = Record<string, any>;

class Table {
  rows: Row[];

  constructor() {
    this.rows = [];
  }

  insert(row: Row) {
    this.rows.push(row);
  }

  update(predicate: (row: Row) => boolean, updates: Partial<Row>) {
    this.rows.forEach(row => {
      if (predicate(row)) {
        Object.assign(row, updates);
      }
    });
  }

  selectAll(): Row[] {
    return this.rows;
  }

  select(predicate: (row: Row) => boolean): Row[] {
    return this.rows.filter(predicate);
  }

  static join(tableA: Table, tableB: Table, keyA: string, keyB: string): Row[] {
    const joinedRows: Row[] = [];

    tableA.selectAll().forEach((rowA) => {
      tableB.selectAll().forEach((rowB) => {
        if (rowA[keyA] === rowB[keyB]) {
          joinedRows.push({ ...rowA, ...rowB });
        }
      });
    });

    return joinedRows;
  }
}

class Database {
  static tables: Record<string, Table> = {};

  static createTable(tableName: string) {
    this.tables[tableName] = new Table();
  }

  static getTable(tableName: string): Table {
    return this.tables[tableName];
  }
}

export { Database, Table };
