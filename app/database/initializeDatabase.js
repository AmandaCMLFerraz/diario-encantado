import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {

    const db = await SQLite.openDatabaseSync('databaseDiario');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS escolas (
            id INTEGER PRIMARY KEY NOT NULL, 
            nome TEXT NOT NULL
            telefone VARCHAR(20),
            cep VARCHAR(10),
            rua TEXT,
            bairro TEXT,
            cidade TEXT, 
            estado TEXT, 
        );
    `);
}

export function getDatabase() {
    return db;
}