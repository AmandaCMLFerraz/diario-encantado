import { getDatabase } from './initializeDatabase'; // Corrija o caminho para o arquivo correto

export async function insertSchool(name, telephone, cep, street, neighborhood, city, uf) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            'INSERT INTO escolas (nome, telefone, cep, rua, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            name, telephone, cep, street, neighborhood, city, uf
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir escola:', error);
        throw error;
    }
}

export async function getSchools() {
    const db = getDatabase();
    try {
        const allRows = await db.getAllAsync('SELECT * FROM escolas');
        return allRows;
    } catch (error) {
        console.error('Erro ao buscar escolas:', error);
        throw error;
    }
}

export async function deleteSchools(id) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            `DELETE FROM escolas WHERE id = ? `,
            [id]
        );
        return result;
    } catch (error) {
        console.log('Erro ao excluir escola:', error);
        throw error;
    }
}

export async function updateSchool(id, name, telephone, cep, street, neighborhood, city, uf) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            'UPDATE escolas SET nome = ?, telefone = ?, cep = ?, rua = ?, bairro = ?, cidade = ?, estado = ? WHERE id = ?',
            name, telephone, cep, street, neighborhood, city, uf, id
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar escola:', error);
        throw error;
    }
}