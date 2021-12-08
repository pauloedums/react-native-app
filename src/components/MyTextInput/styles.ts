import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    label: {
        fontSize: 20
    },

    input: {
        height: 50,
        fontSize: 20,
        borderWidth: 1,
        marginBottom: 20,
        width: Dimensions.get('window').width - 40,
    }

});