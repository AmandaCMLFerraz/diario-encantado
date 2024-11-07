import { getDatabase } from './initializeDatabase'; // Corrija o caminho para o arquivo correto

export async function insertClasse(classe, school) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            'INSERT INTO turmas (turma, escola) VALUES (?, ?)',
            classe, school
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir turma:', error);
        throw error;
    }
}

export async function getClasse() {
    const db = getDatabase();
    try {
        const allRows = await db.getAllAsync('SELECT * FROM turmas');
        return allRows;
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        throw error;
    }
}

export async function deleteClasse(id) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            `DELETE FROM turmas WHERE id = ? `,
            [id]
        );
        return result;
    } catch (error) {
        console.log('Erro ao excluir turma:', error);
        throw error;
    }
}

export async function updateClasse(classe, school, classeId) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            'UPDATE turmas SET turma = ?, escola = ? WHERE id = ?',
            classe, school, classeId
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        throw error;
    }
}

