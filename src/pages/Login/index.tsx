import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Button, Center, Heading, HStack, Link, Spinner, Text, useToast, VStack } from 'native-base';
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

    const toast = useToast();
    const idToastInvalid = "invalid-toast";
    const idToastError = "error-toast";

    const [islogged, setLogged] = React.useState(false);
    const [login, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function goNewUser() {
        navigation.navigate('SignUp');
    }

    async function logged() {
        setLogged(true);
        if(!login || !password) {
            setLogged(false);
            if(!toast.isActive(idToastInvalid)) {
                toast.show({
                    id: idToastInvalid,
                    title: "Dados inválidos",
                    status: "warning",
                    description: "Por favor, preencha todos os campos.",
                });
            }
            return;
        }
        const loggedIn: ILogin = {
            login,
            password
        }
        const token: ILogin | string | null = await loginService.logged(loggedIn);
        if ( typeof token === 'string') {
            toast.show({
                title: "Conta verificada",
                status: "success",
                description: "Obrigado por estar sempre conosco.",
                isClosable: false,
            })
            const user = await userService.getUser(token);
            await storage.save({ token, user });
            navigation.navigate('Home');
            setLogged(false);
        } else {
            setLogged(false);

            if(!toast.isActive(idToastError)) {
                toast.show({
                    id: idToastError,
                    title: "Login inválido!",
                    status: "error",
                    description: "Por favor, verifique todos os campos e tente novamente.",
                    isClosable: false,
                });
            }
            return;
        }
    }

    return (
        <Center flex={1} _dark={{bg:'coolGray.800'}} _light={{bg:'warmGray.50'}}>
            { islogged ?  
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <VStack space={4} alignItems="center">
                        <Heading textAlign="center" mb="10">
                            Carregando celulares
                        </Heading>
                        <Spinner size="lg" />
                    </VStack>
                </Box> : 
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
            }
        </Center>
    );
}