import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Box, Center, ScrollView, VStack } from 'native-base';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { IProduct } from '../../interfaces/product.interface';
import storage from '../../repositories/storage';
import { TypeRoutes } from '../../routes';
import { imageService } from '../../services/image.service';
import { productService } from '../../services/product.service';
import ProductItem from '../../shared/components/ProductItem';


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
                    if (products) {
                        setProducts(products);
                    }
                    else alert('Ocorreu um erro ao recuperar os celulares!');
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
        <Center _dark={{bg:'coolGray.800'}} _light={{bg:'warmGray.50'}}>
            {/* <ScrollView p="10" py="5" w="100%"> */}
                {/* <Box safeArea p="2" py="10" pt="0" w="100%" maxW="100%"> */}
                    <VStack space={3} mt="5" alignContent="center">
                        <View>
                            <StatusBar style="auto" />
                            
                            <FlatList
                                data={products}
                                onRefresh={fetchPosts}
                                refreshing={refreshing}
                                renderItem={({ item }) => 
                                <ProductItem product={item} />}
                                keyExtractor={item => item.id ? item.id.toString() : ''}
                            />
                            </View>
                    </VStack>
                {/* </Box> */}
            {/* </ScrollView> */}
        </Center>
    );
}