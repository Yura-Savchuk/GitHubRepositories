'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import styles from '../../styles/styles'

export default class UserInfo extends Component {

    render() {
        const user = this.props.user;
        return (
            <View>
                <View style={screenStyles.headerContainer}>
                    <Image
                        style={screenStyles.avatar}
                        source={{uri: user.avatar_url}}
                    />
                </View>
                <View style={screenStyles.userDescriptionContainer}>
                    <Text style={styles.userLogin}>{user.login}</Text>
                </View>
            </View>
        );
    }

}

const screenStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center'
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    userDescriptionContainer: {
        marginTop: 16,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});