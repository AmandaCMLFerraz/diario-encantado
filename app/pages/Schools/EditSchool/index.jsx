import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/themed';

import Input from '../../../components/Input';
import ButtonWaterGreen from '../../../components/ButtonWaterGreen';

import { getSchools, updateSchool } from '../../../database/schoolTable';
import { initializeDatabase } from '../../../database/initializeDatabase';
import { useFocusEffect, useNavigation } from 'expo-router';
import ApiCep from '../../../services/apiCep';

const EditSchool = () => {

    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
    },
    title: {
        marginTop: 25,
        fontSize: 20,
    },
    containerForm: {
        marginTop: 25,
    },
    containerFormCEP: {
        flexDirection: 'row',
    },
    input: {
        height: 40,
        width: 150,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#3F3F3C",
        borderRadius: 20,
        fontSize: 18,
        marginRight: 25,
    },
    textInput: {
        fontSize: 18,
        marginLeft: 20,
    },
    button: {
        width: 80,
        height: 40,
        backgroundColor: "#51B59F",
        borderRadius: 20,
    },
    textButton: {
        fontSize: 18,
        fontWeight: 600,
    },
});

export default EditSchool