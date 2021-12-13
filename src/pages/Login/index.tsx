import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Button, Center, Heading, HStack, Link, Text, VStack } from 'native-base';
import React from 'react';
import { ILogin } from '../../interfaces/login.interface';
import storage from '../../repositories/storage';
import { TypeRoutes } from '../../routes';
import { loginService } from '../../services/login.service';
import { userService } from '../../services/user.service';
import MyTextInput from '../../shared/components/MyTextInput';
import TitleSubtitle from '../../shared/components/TitleSubtitle';



export default function Login() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    const [login, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function goNewUser() {
        navigation.navigate('SignUp');
    }

    async function logged() {
        const loggedIn: ILogin = {
            login,
            password
        }
        const token: ILogin | string | null = await loginService.logged(loggedIn);
        if ( typeof token === 'string') {
            const user = await userService.getUser(token);
            await storage.save({ token, user });
            navigation.navigate('Home');
        } else {
            alert('Login inválido!');
        }
    }

    return (
        <Center flex={1} px="3" _dark={{bg:'coolGray.800'}} _light={{bg:'warmGray.50'}}>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <VStack space={3} mt="5">

                    <TitleSubtitle title="#MyPhonesList" subtitle="Entre para ver a sua lista personalizada." />

                    <MyTextInput title="E-mail:" value={login} onChangeText={setEmail} />   
                    <MyTextInput
                        title="Senha:"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                    <Button onPress={logged} colorScheme="indigo">Entrar</Button>
                </VStack>
                <HStack mt="6" justifyContent="center">
                    <Text
                        fontSize="sm"
                        color="coolGray.600"
                        _dark={{
                        color: "warmGray.200",
                        }}
                    >
                        Ainda não possui cadastro ?{" "}
                    </Text>
                    <Link
                        _text={{
                        color: "indigo.500",
                        fontWeight: "medium",
                        fontSize: "sm",
                        }}
                        onPress={goNewUser}
                    >
                        Cadastre-se
                    </Link>
                </HStack>
            </Box>
        </Center>
    );
}