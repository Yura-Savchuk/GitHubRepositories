'use strict';
import React, {Component} from 'react'
import {
    TouchableHighlight,
    View,
    Image,
    Text
} from 'react-native'
import styles from '../../styles/styles'

export default class UserListItem extends Component {

    render() {
        const item = this.props.item;
        return (
            <TouchableHighlight
                underlayColor='#dddddd'
                onPress={this.props.onPress}>
                <View>
                    <View style={styles.userRootContainer}>
                        <Image
                            style={styles.avatar}
                            source={{uri: item.avatar_url}}
                        />
                        <View/>
                        <View style={styles.userDescriptionContainer}>
                            <Text style={styles.userLogin}>{item.login}</Text>
                        </View>
                    </View>
                    <View style={styles.border}/>
                </View>
            </TouchableHighlight>
        );
    }

}
