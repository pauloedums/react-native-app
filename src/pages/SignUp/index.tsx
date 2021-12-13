import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Button, Center, ScrollView, View, VStack } from 'native-base';
import React from 'react';
import { ICustomer } from '../../interfaces/customer.interface';
import { TypeRoutes } from '../../routes';
import { userService } from '../../services/user.service';
import MyTextInput from '../../shared/components/MyTextInput';
import TitleSubtitle from './../../shared/components/TitleSubtitle';



export default function SignUp() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    React.useEffect(() => {
        navigation.setOptions({ 
            title: 'Novo Usuário'
        });
    }, []);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [age, setAge] = React.useState('');
    const [userPassword, setPassword] = React.useState('');
    const [confirmar, setConfirmar] = React.useState('');

    async function save() {
        if (!name || !email || !userPassword) {
            alert('Todos os campos são obrigatórios!');
            return;
        }
        if (userPassword !== confirmar) {
            alert('A senha não confere!');
            return;
        }
        
        const user: ICustomer = {
            email: email.toLowerCase(),
            name,
            address,
            age: parseInt(age),
            userPassword,
            
        };
        const savedUser = await userService.createUser(user);
        try {
            if (savedUser) {
                navigation.goBack();
            } else {
                alert('Usuário já existente!');
            }
        } catch (error) {
            console.error('Erro ao criar um novo usuário: ', error);
            alert('Ocorreu um erro não esperado!');
        }
    }

    return (
        <Center flex={1} _dark={{bg:'coolGray.800'}} _light={{bg:'warmGray.50'}}>
            <ScrollView p="10" py="5" w="100%">
                <Box safeArea p="2" py="10" pt="0" w="100%" maxW="100%">
                    <VStack space={3} mt="5" alignContent="center">
                        <TitleSubtitle title="Cadastro" subtitle="Informe os dados abaixo." />
                    
                        <MyTextInput title="Nome:" value={name} onChangeText={setName} />
                        <MyTextInput title="Email:" value={email} onChangeText={setEmail} />
                        <MyTextInput title="Endereço:" value={address} onChangeText={setAddress} />
                        <MyTextInput title="Idade:" value={age} onChangeText={setAge} />
                        <MyTextInput title="Senha:" value={userPassword} onChangeText={setPassword} secureTextEntry />
                        <MyTextInput title="Confirmar senha:" value={confirmar} onChangeText={setConfirmar} secureTextEntry />

                        <Button onPress={save} colorScheme="indigo" mt="5">Cadastrar</Button>
                    </VStack>
                </Box>
            </ScrollView>
        </Center>
    );
}