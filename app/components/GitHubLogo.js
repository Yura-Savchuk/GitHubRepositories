'use strict';
import React, {Component} from 'react'
import {
    Image,
    StyleSheet
} from 'react-native'

const LOGO_URL = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png';

export default class GitHubLogo extends Component {

    render() {
        if (!this.props.shown) return null;
        return <Image style={styles.image}
                      source={{uri: LOGO_URL}}
        />
    }

}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 52,
        alignSelf: 'center',
        marginTop: 50
    }
});