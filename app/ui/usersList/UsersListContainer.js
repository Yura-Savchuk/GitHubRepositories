'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native'
import UsersListService from '../../data/UsersListService'
import styles from '../../styles/styles'
import UsersList from './UsersList'
import ActivityIndicator from '../../components/ActivityIndicator'
import GitHubLogo from '../../components/GitHubLogo'

export default class UsersListContainer extends Component {

    static navigationOptions = {
        title: 'GitHub Repositories',
        headerStyle: {
            backgroundColor: "#FFFFFF"
        }
    };

    constructor(props) {
        super(props);
        this.searchNickName = '';
        this.state = {
            isLoading: false,
            isLogoShown: true,
            isErrorViewShown: false,
            users: null
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Repositories by user!
                </Text>
                <Text style={styles.description}>
                    Search by user nickname.
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Search via nickname'
                        onChange={(event) => this.onSearchTextChanged(event)}
                    />
                    <TouchableHighlight style={styles.button}
                                        underlayColor='#24292e'
                                        onPress={() => this.onSearchButtonPressed()}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>
                <ActivityIndicator shown={this.state.isLoading}/>
                <GitHubLogo shown={this.state.isLogoShown}/>
                {this.renderUsersList()}
            </View>
        )
    }

    renderUsersList() {
        const users = this.state.users;
        const usersListEmpty = users === null || users.length === 0;
        if (this.state.isLogoShown || (this.state.isLoading && usersListEmpty)) {
            return null
        }

        if (this.state.isErrorViewShown) {
            return <Text style={styles.errorText}>Ошибка загрузки списка пользователей.</Text>
        }

        if (usersListEmpty) {
            return <Text style={styles.description}>Пользователей не найдено.</Text>
        }

        return <UsersList
                    items={this.state.users}
                    onPressItem={this.onPressUserItem.bind(this)}/>
    }

    //actions

    onSearchTextChanged(event) {
        this.searchNickName = event.nativeEvent.text;
    }

    onSearchButtonPressed() {
        this.setState({
            isLoading: true,
            isLogoShown: false,
            isErrorViewShown: false
        });
        UsersListService.getUsersByQuery(this.searchNickName)
            .then(items => this.handleResponse(items))
            .catch(error => this.handleError(error));
    }

    handleResponse(items) {
        this.setState({
            isLoading: false,
            users: items
        });
    }

    handleError(error) {
        this.setState({
            isLoading:false,
            isErrorViewShown:true
        });
        console.log(error);
    }

    onPressUserItem(rowData, rowID) {
        const { navigate } = this.props.navigation;
        navigate('UserDetail', { user: rowData })
    }

}
