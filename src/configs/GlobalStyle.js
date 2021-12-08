import { StyleSheet } from 'react-native';
import { Colors } from './GlobalConfig';

const GlobalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    containerBackground: {
        flex: 1,
        backgroundColor: `${Colors.BACKGROUND}44`
    },
    containerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerButtonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: 16,
        alignSelf: 'center'
    }
});

export default GlobalStyle;