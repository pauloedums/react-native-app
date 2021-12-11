import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { IProduct } from '../../interfaces/product.interface';
import storage from '../../repositories/storage';
import { TypeRoutes } from '../../routes';
import { productService } from '../../services/product.service';
import ProductItem from '../../shared/components/ProductItem';
import styles from './styles';


export default function Home() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    const [products, setProducts] = React.useState<IProduct[]>();
    const [ refreshing, setRefreshing ] = React.useState(false);

    React.useEffect(() => {

        fetchPosts();
    }, []);

    function fetchPosts() {
        setRefreshing(true);

        storage.get().then(userInfo => {
            const token = userInfo.token as string;
            if (token) {
                productService.getProducts(token).then(products => {
                    setRefreshing(false);
                    if (products) setProducts(products);
                    else alert('Ocorreu um erro ao recuperar as postagens!');
                });
            } else {
                setRefreshing(false);
                alert('Sessão expirada!');
                navigation.goBack();
            }
        });
    }

    if (!products) return <Text>Carregando...</Text>

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            <FlatList
                data={products}
                onRefresh={fetchPosts}
                refreshing={refreshing}
                renderItem={({ item }) => <ProductItem product={item} />}
                keyExtractor={item => item.id ? item.id.toString() : ''}
            />

        </View>
    );
}