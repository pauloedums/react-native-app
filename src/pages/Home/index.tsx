import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Center, Heading, Spinner, VStack, FlatList, View, useToast } from 'native-base';
import React from 'react';
import { IProduct } from '../../interfaces/product.interface';
import storage from '../../repositories/storage';
import { TypeRoutes } from '../../routes';
import { productService } from '../../services/product.service';
import ProductItem from '../../shared/components/ProductItem';


export default function Home() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    const toast = useToast();
    const idToastInvalid = "invalid-toast";
    const idToastError = "error-toast";

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
                    else {
                        if(!toast.isActive(idToastError)) {
                            toast.show({
                                id: idToastError,
                                title: "Ocorreu um erro!",
                                status: "error",
                                description: "Ao recuperar os celulares, não retornou nenhum, tente novamente!",
                                isClosable: false,
                            });
                        }
                    }
                });
            } else {
                setRefreshing(false);

                if(!toast.isActive(idToastInvalid)) {
                    toast.show({
                        id: idToastInvalid,
                        title: "Sessão expirada!",
                        status: "warning",
                        isClosable: false,
                    });
                }
                navigation.goBack();
            }
        });
    }

    return (
        <Center flex={1} _dark={{bg:'coolGray.800'}} _light={{bg:'warmGray.50'}}>
            { !products ?
                <VStack space={4} alignItems="center">
                    <Heading textAlign="center" mb="10">
                        Carregando celulares
                    </Heading>
                    <Spinner size="lg" />
                </VStack> :
                <VStack space={4} p="10" alignContent="center">
                    <View alignItems="center">
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
            }   
        </Center>
    );
}