'use strict';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    description: {
        marginBottom: 16,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
    },errorText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#FF0000'
    },
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#24292e',
        borderRadius: 8,
        color: '#24292e'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#24292e',
        borderColor: '#24292e',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    image: {
        width: 200,
        height: 52,
        alignSelf: 'center',
        marginTop: 50
    },
    listView: {
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    userRootContainer: {
        flexDirection: 'row',
        paddingTop: 10
    },
    userDescriptionContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'center'
    },
    userLogin: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    border: {
        height: 1,
        backgroundColor: "#C4C4C4",
        marginLeft: 10,
        marginTop: 10
    }
});

export default styles;