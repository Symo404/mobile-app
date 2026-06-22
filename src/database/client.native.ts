import * as SQLite from 'expo-sqlite';
import { migrations } from './schema';

let database: SQLite.SQLiteDatabase | null = null;
export async function getDatabase() {
  if (!database) database = await SQLite.openDatabaseAsync('atelier-inventory.db');
  return database;
}
export async function migrateDatabase() {
  const db = await getDatabase();
  await db.withTransactionAsync(async () => {
    for (const sql of migrations) await db.execAsync(sql);
  });
}
