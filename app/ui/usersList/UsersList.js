'use strict';
import React, {Component} from 'react'
import {
    ListView
} from 'react-native'
import styles from '../../styles/styles'
import UserListItem from './UserListItem'

export default class UsersList extends Component {

    componentWillMount() {
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    render() {
        const dataSource = this.dataSource.cloneWithRows(this.props.items);
        return (
            <ListView
                dataSource={dataSource}
                renderRow={(rowData, sectionID, rowID) =>
                    <UserListItem item={rowData}
                                  onPress={() => this.props.onPressItem(rowData, rowID)} />
                }
                style={styles.listView}/>
        );
    }

}
