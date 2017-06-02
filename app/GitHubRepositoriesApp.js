'use strict'

import React, {Component} from 'react'
import {
    StyleSheet,
    NavigatorIOS
} from 'react-native'
import RepositoriesListComponent from './ui/repositoriesList/RepositoriesListComponent'

export default class GitHubRepositoriesApp extends Component {

    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'User Repositories',
                    component: RepositoriesListComponent
                }}
            />
        )
    }

}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80
    },
    container: {
        flex: 1
    }
});

