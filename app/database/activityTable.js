import { getDatabase } from './initializeDatabase'; // Corrija o caminho para o arquivo correto

export async function insertActivity({ student, date, description, imageUri }) {
    const db = getDatabase();
    try {
        await db.runAsync(
            'INSERT INTO atividades (nome, data, descricao, imagem) VALUES (?, ?, ?, ?)',
            [student, date, description, imageUri]
        );
    } catch (error) {
        console.error('Erro ao salvar atividade:', error);
        throw error;
    }
}

export async function getActivity() {
    const db = getDatabase();
    try {
        const allRows = await db.getAllAsync('SELECT * FROM atividades');
        return allRows;
    } catch (error) {
        console.error('Erro ao buscar atividades:', error);
        throw error;
    }
}

export async function deleteActivity(id) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            `DELETE FROM atividades WHERE id = ? `,
            [id]
        );
        return result;
    } catch (error) {
        console.log('Erro ao excluir atividades:', error);
        throw error;
    }
}