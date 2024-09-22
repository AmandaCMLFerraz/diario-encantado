import { getDatabase } from './initializeDatabase'; // Corrija o caminho para o arquivo correto

export async function insertUser(name, email, telephone, password, confirmPassword) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            'INSERT INTO users (nome, email, telefone, senha, confSenha) VALUES (?, ?, ?, ?, ?)',
            name, email, telephone, password, confirmPassword
        );
        return result;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
}

export async function getUser(email) {
    const db = getDatabase();
    try {
        const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ?', [email]);
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
}

export async function deleteUser(id) {
    const db = getDatabase();
    try {
        const result = await db.runAsync(
            `DELETE FROM users WHERE id = ? `,
            [id]
        );
        return result;
    } catch (error) {
        console.log('Erro ao excluir usuário:', error);
        throw error;
    }
}

// export async function updateStudent(name, school, classe, responsibleName, responsibleTelephone, cep, street, neighborhood, city, uf) {
//     const db = getDatabase();
//     try {
//         const result = await db.runAsync(
//             'UPDATE alunos SET nome = ?, escola = ?, turma = ?, nomeResponsavel = ?, telefoneResponsavel = ?, cep = ?, rua = ?, bairro = ?, cidade = ?, estado = ?) WHERE id = ?',
//             name, school, classe, responsibleName, responsibleTelephone, cep, street, neighborhood, city, uf
//         );
//         return result;
//     } catch (error) {
//         console.error('Erro ao atualizar escola:', error);
//         throw error;
//     }
// }
