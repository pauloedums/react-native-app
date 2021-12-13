import { Heading } from 'native-base';
import React from 'react';
import { TextInputProps } from 'react-native';


interface Props extends TextInputProps {
    title: string;
    subtitle: string;
}

export default function TitleSubtitle(props: Props) {
    return (
        <><Heading
            size="lg"
            color="coolGray.800"
            _dark={{
                color: "warmGray.50",
            }}
            fontWeight="semibold">{ props.title }</Heading><Heading mt="1" mb="5"
                color="coolGray.600"
                _dark={{
                    color: "warmGray.200",
                }}
                fontWeight="medium"
                size="xs"
            >{ props.subtitle }</Heading></>
    );
}