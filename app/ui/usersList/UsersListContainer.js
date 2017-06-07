import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    ListView
} from 'react-native'
import UsersListService from '../../data/UsersListService'
import styles from '../../styles/styles'

export default class UsersListContainer extends Component {

    static navigationOptions = {
        title: 'GitHub Repositories',
        headerStyle: {
            backgroundColor: "#FFFFFF"
        }
    };

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
        this.state = {
            searchNickName: '',
            isLoading: false,
            isLogoShown: true,
            isEmptyViewShown: false,
            isErrorViewShown: false,
            isUsersListShown: false,
            dataSource: dataSource
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
        const emptyView = this.state.isEmptyViewShown ?
            (<Text style={styles.description}>Пользователей не найдено.</Text>) :
            null;
        const errorView = this.state.isErrorViewShown ?
            (<Text style={styles.errorText}>Ошибка загрузки списка пользователей.</Text>) :
            null;
        const usersListView = this.state.isUsersListShown ?
            (<ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>) :
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
                {emptyView}
                {errorView}
                {usersListView}
            </View>
        )
    }

    renderRow(userData, sectionID, rowID) {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.userRootContainer}>
                        <Image
                            style={styles.avatar}
                            source={{uri: userData.avatar_url}}
                        />
                        <View/>
                        <View style={styles.userDescriptionContainer}>
                            <Text style={styles.userLogin}>{userData.login}</Text>
                        </View>
                    </View>
                    <View style={styles.border}/>
                </View>
            </TouchableHighlight>
        );
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
        let itemsExist = items.length !== 0;
        this.setState({
            isLoading: false,
            isEmptyViewShown: !itemsExist,
            dataSource: this.state.dataSource.cloneWithRows(items),
            isUsersListShown: itemsExist
        });
    }

    handleError(error) {
        this.setState({
            isLoading:false,
            isErrorViewShown:true
        });
        console.log(error);
    }

}