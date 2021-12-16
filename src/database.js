const { Pool } = require('pg');
const { database } = require('./config');

class Database {
  constructor(config) {
    this.pool = new Pool(config);
  }

  query(sql, values) {
    return this.pool.query(sql, values);
  }

  close() {
    this.pool.end();
  }
}

class DatabaseInstance {
  static getInstance(config) {
    if (!this.db) this.db = new Database(config);
    return this.db;
  }
}

module.exports = DatabaseInstance.getInstance(database);
