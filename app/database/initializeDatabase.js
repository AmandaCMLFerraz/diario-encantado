import * as SQLite from 'expo-sqlite';

let db; // Definir a variável `db` no escopo global

export const initializeDatabase = async () => {
    db = await SQLite.openDatabaseAsync('databaseDiario'); // Usar a versão assíncrona

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            telefone TEXT,
            senha TEXT NOT NULL,
            confSenha TEXT NOT NULL
        );
    `);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS escolas (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
            nome TEXT NOT NULL,
            telefone TEXT,
            cep TEXT,
            rua TEXT,
            bairro TEXT,
            cidade TEXT, 
            estado TEXT
        );
    `);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
            nome TEXT NOT NULL,
            escola TEXT NOT NULL,
            turma TEXT NOT NULL,
            nomeResponsavel TEXT NOT NULL,
            telefoneResponsavel TEXT,
            cep TEXT,
            rua TEXT,
            bairro TEXT,
            cidade TEXT, 
            estado TEXT
        );
    `);
}

export function getDatabase() {
    if (!db) {
        throw new Error('Database has not been initialized. Call initializeDatabase first.');
    }
    return db;
}
