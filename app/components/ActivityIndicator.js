'use strict';
import React, {Component} from 'react'
import {ActivityIndicator} from 'react-native'

export default class _ActivityIndicator extends Component {

    render() {
        if (!this.props.shown) return null;
        return <ActivityIndicator
            size='large'
        />
    }

}