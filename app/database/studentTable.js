import { getDatabase } from './initializeDatabase'; // Corrija o caminho para o arquivo correto

export async function insertStudent(name, school, classe, responsibleName, responsibleTelephone, cep, street, neighborhood, city, uf) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            'INSERT INTO alunos (nome, escola, turma, nomeResponsavel, telefoneResponsavel, cep, rua, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            name, school, classe, responsibleName, responsibleTelephone, cep, street, neighborhood, city, uf
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir aluno:', error);
        throw error;
    }
}

export async function getStudent() {
    const db = getDatabase();
    try {
        const allRows = await db.getAllAsync('SELECT * FROM alunos');
        return allRows;
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        throw error;
    }
}

export async function deleteStudent(id) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            `DELETE FROM alunos WHERE id = ? `,
            [id]
        );
        return result;
    } catch (error) {
        console.log('Erro ao excluir aluno:', error);
        throw error;
    }
}

export async function updateStudent(name, school, classe, responsibleName, responsibleTelephone, cep, street, neighborhood, city, uf) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            'UPDATE alunos SET nome = ?, escola = ?, turma = ?, nomeResponsavel = ?, telefoneResponsavel = ?, cep = ?, rua = ?, bairro = ?, cidade = ?, estado = ?) WHERE id = ?',
            name, school, classe, responsibleName, responsibleTelephone, cep, street, neighborhood, city, uf
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar escola:', error);
        throw error;
    }
}
