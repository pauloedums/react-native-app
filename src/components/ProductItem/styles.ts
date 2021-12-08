import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'gray',
        width: Dimensions.get('window').width - 20,
    },

    text: {
        fontSize: 20,
        textAlign: 'justify'
    },

    owner: {
        color: 'gray',
        textAlign: 'right'
    }

});