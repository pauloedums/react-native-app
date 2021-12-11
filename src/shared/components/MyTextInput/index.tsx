import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import styles from './styles';

interface Props extends TextInputProps {
    title: string | number;
}

export default function MyInputText(props: Props) {
    return (
        <View>
            <Text style={styles.label}>{props.title}</Text>
            <TextInput style={styles.input} {...props} />
        </View>
    );
}