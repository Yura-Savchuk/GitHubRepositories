'use strict';
import React, {Component} from 'react'
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native'

export default class _ActivityIndicator extends Component {

    render() {
        const props = this.props;
        if (!props.shown) return null;
        if (props.hideContent) {
            return _ActivityIndicator.renderHideContentIndicator();
        }
        return _ActivityIndicator.renderIndicator();
    }

    static renderHideContentIndicator() {
        return (
            <View style={componentStyles.container}>
                {_ActivityIndicator.renderIndicator()}
            </View>
        );
    }

    static renderIndicator() {
        return (
            <ActivityIndicator
                size='large'
            />
        );
    }

}

const componentStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        position: 'absolute'
    }
});