import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import { ILogin } from '../../interfaces/login.interface';
import storage from '../../repositories/storage';
import { TypeRoutes } from '../../routes';
import { loginService } from '../../services/login.service';
import { userService } from '../../services/user.service';
import MyTextInput from '../../shared/components/MyTextInput';
import styles from './styles';



export default function Login() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    const [login, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="add-circle-outline" size={28} color="blue" onPress={goNewUser}
                />
            )
        });

    }, []);

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
        <View style={styles.container}>
            <MyTextInput title="E-mail:" value={login} onChangeText={setEmail} />
            
            <MyTextInput
                title="Senha:"
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
            />

            <Button title="Entrar" onPress={logged} />
        </View>
    );
}