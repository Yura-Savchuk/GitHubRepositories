import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    ActivityIndicator
} from 'react-native'
import UsersListService from '../../data/UsersListService'
import styles from '../../styles/styles'
import UsersList from './UsersList'

export default class UsersListContainer extends Component {

    static navigationOptions = {
        title: 'GitHub Repositories',
        headerStyle: {
            backgroundColor: "#FFFFFF"
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            searchNickName: '',
            isLoading: false,
            isLogoShown: true,
            isErrorViewShown: false,
            users: null
        };
    }

    render() {
        const activityIndicator = this.state.isLoading ?
            (<ActivityIndicator
                size='large'/>) :
            null;
        const logo = this.state.isLogoShown ?
            (<Image style={styles.image}
                     source={{uri: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png'}}/>) :
            null;
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
                        value={this.state.searchNickName}
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
                {logo}
                {activityIndicator}
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
                    onPressItem={this.openUser.bind(this)}/>
    }

    //actions

    onSearchTextChanged(event) {
        this.setState({ searchNickName: event.nativeEvent.text});
    }

    onSearchButtonPressed() {
        this.setState({
            isLoading: true,
            isLogoShown: false,
            isErrorViewShown: false,
            isEmptyViewShown: false,
            isUsersListShown: false
        });
        UsersListService.getUsersByQuery(this.state.searchNickName)
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

    openUser(rowData, rowID) {
        console.log(this);
        alert("Press on user: " + rowData.login);
    }

}
