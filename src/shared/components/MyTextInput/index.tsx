import { FormControl, Input } from 'native-base';
import React from 'react';
import { TextInputProps } from 'react-native';


interface Props extends TextInputProps {
    title: string | number;
}

export default function MyInputText(props: Props) {
    return (
        <FormControl>
          <FormControl.Label>{props.title}</FormControl.Label>
          <Input {...props} />
        </FormControl>
    );
}