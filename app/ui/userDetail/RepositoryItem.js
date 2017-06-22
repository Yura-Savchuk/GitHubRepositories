'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import styles from '../../styles/styles'

export default class RepositoryItem extends Component {

    render() {
        const item = this.props.item;
        return (
            <View style={compStyles.container}>
                <Text style={compStyles.title}>{item.name}</Text>
                <Text style={compStyles.description}>{item.description}</Text>
                <View style={compStyles.statisticContainer}>
                    <View style={compStyles.languageImg} />
                    <Text>{item.language}</Text>
                </View>
                <View style={styles.border}/>
            </View>
        );
    }

}

const compStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0366d7'
    },
    description: {
        fontSize: 16,
        color: '#727272'
    },
    statisticContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    languageImg: {
        width: 12,
        height: 12,
        backgroundColor: '#b07219',
        borderRadius: 6,
        marginRight: 4
    }
});