import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

import { TypeRoutes } from '../../routes';
import storage from '../../repositories/storage';
import MyInputText from '../../components/MyTextInput';

import styles from './styles';
import { Customer } from '../../interfaces/customer.interface';
import { Product } from '../../interfaces/product.interface';

export default function ProductPage() {

    const [token, setToken] = React.useState('');
    const [owner, setOwner] = React.useState<Customer>();
    const [description, setDescription] = React.useState('');

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    React.useEffect(() => {
        storage.get().then(({ token, user }) => {
            if (token) setToken(token);
            if (user) setOwner(user);
        });
    }, [token]);

    async function save() {
        if (!owner) {
            alert('Sua sessão expirou!');
            navigation.navigate('Login');
        }
        if (description.trim() === '') {
            alert('O texto é obrigatório!');
            navigation.navigate('Login');
        }

        // const product: Product = {
        //     factory:{
        //         id: 1,
        //         name: 'teste'
        //     },
        //     price: 50,
        //     id: 1,
        //     amount,
        //     name,
        // };
        // await snService.createPost(token, post);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <MyInputText title="Texto" onChangeText={setDescription} />
            <Button title="Postar" onPress={save} />
        </View>
    );
}