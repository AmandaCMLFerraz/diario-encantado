// import * as SQLite from 'expo-sqlite';
import { getDatabase } from './initializeDatabase';

const db = getDatabase;

export default function schoolTable() {
    async function insertSchool(id, nome, telefone, cep, rua, bairro, cidade, estado) {
        await db.runAsync(
            'INSERT INTO users (id, nome, telefone, cep, rua, bairro, cidade, estado) VALUES (?, ?)',
            id,
            nome,
            telefone,
            cep,
            rua,
            bairro,
            cidade,
            estado
        );
    }

    async function getSchools() {
        async function list() {
            const allRows = await db.getAllAsync(
                'SELECT * FROM test'
            );
            for (const row of allRows) {
                console.log(row.nome);
            }
        }
    await list();
    }

    return { insertSchool, getSchools }
}