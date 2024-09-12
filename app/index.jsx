import React, { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';

import Routes from './routes/index';

export default function Index() {

    return (
        <>
            <StatusBar hidden={true} />
            <Routes />
        </>
    )
}