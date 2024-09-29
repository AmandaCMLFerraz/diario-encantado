import React, { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';

import { initializeDatabase } from './database/initializeDatabase';

import Routes from './routes/index';

export default function Index() {

    useEffect(() => {
        async function initializeDB() {
            try {
                await initializeDatabase();
                console.log('Banco de dados inicializado');
            } catch (error) {
                console.error('Erro ao inicializar o banco de dados:', error);
            }
        }

        initializeDB();  // Chama a função para inicializar o banco de dados
    }, []);  // O array vazio [] garante que o DB será inicializado apenas uma vez, quando o app for carregado

    return (
        <>
            <StatusBar hidden={true} />
            <Routes />
        </>
    )
}