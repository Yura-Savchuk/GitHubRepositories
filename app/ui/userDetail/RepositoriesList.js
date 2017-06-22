'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ListView
} from 'react-native'
import styles from '../../styles/styles'
import RepositoryItem from './RepositoryItem'

export default class RepositoriesList extends Component {

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    componentWillMount() {
        this.bindProps(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.bindProps(nextProps);
        return true
    }

    bindProps(props) {
        if (props.repositories) {
            this.dataSource = this.dataSource.cloneWithRows(props.repositories);
        }
    }

    render() {
        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                style={styles.listView}
                renderHeader={this.props.renderHeader}
                />
        );
    }

    renderRow(repositoryItem) {
        return (<RepositoryItem item={repositoryItem}/>);
    }

}
