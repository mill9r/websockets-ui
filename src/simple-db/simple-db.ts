type Row = Record<string, any>;

class Table {
  private rows: Row[] = [];

  constructor(public name: string) {}

  insert(row: Row): void {
    this.rows.push(row);
  }

  remove(predicate: (row: Row) => boolean) {
    this.rows = this.rows.filter((row) => !predicate(row));
  }

  update(predicate: (row: Row) => boolean, updates: Partial<Row>) {
    this.rows.forEach((row) => {
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
  static tables: Map<string, Table> = new Map();

  static createTable(tableName: string) {
    const table = new Table(tableName);
    this.tables.set(tableName, table);
    return table;
  }

  static getTable(tableName: string): Table {
    const table = this.tables.get(tableName);
    if (table) {
      return table;
    }

    throw new Error(`Table ${tableName} does not exist`);
  }

  static innerJoin(tables: string[], keys: string[]): Row[] {
    if (
      tables.length < 2 ||
      keys.length < 1 ||
      tables.length - 1 !== keys.length
    ) {
      throw new Error('Invalid number of tables or keys for inner join');
    }

    let currentJoinResults = this.tables.get(tables[0])?.selectAll() || [];
    for (let i = 1; i < tables.length; i++) {
      const nextTableRows = this.tables.get(tables[i])?.selectAll() || [];
      const joinKey = keys[i - 1];

      currentJoinResults = currentJoinResults.flatMap((rowA) => {
        return nextTableRows
          .filter((rowB) => rowA[joinKey] === rowB[joinKey])
          .map((rowB) => ({ ...rowA, ...rowB }));
      });
    }

    return currentJoinResults;
  }
}

export { Database, Table };
