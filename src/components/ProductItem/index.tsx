import React from 'react';
import { Text, View } from 'react-native';
import { Product } from '../../interfaces/product.interface';
import storage from '../../repositories/storage';
import styles from './styles';

type Props = { product: Product }

export default function ProductItem({ product }: Props) {
    console.log(product);

    const [isOwner, setIsOwner] = React.useState(false);

    storage.get().then(({ user }) => {
        setIsOwner(product.id === user.id);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{product.name}</Text>
            { !isOwner && (<Text style={styles.owner}>{product.name}</Text>) }
        </View>
    );
}