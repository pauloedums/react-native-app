import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { Text, View } from 'react-native';
import { IProduct } from '../../../interfaces/product.interface';
import styles from './styles';

type Props = { product: IProduct }

export default function ProductItem({ product }: Props) {

    const numberFormat = 
        (value: number) => 
            new Intl.NumberFormat('pt-BR', 
                {
                    style: 'currency',
                    currency:  'BRL',
                    minimumFractionDigits: 2
                }
            ).format(value);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {product.name} - <Text style={styles.factory}>{product.factory.name}</Text>
            </Text>
            <Text style={styles.price}>{numberFormat(product.price)}</Text> 
            <Text style={styles.amount}>Quantidade disponível: {product.amount}</Text> 
        </View>
    );
}