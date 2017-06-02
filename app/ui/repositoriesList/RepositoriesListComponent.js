import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    ListView
} from 'react-native'
import UsersListService from '../../data/UsersListService'

export default class RepositoriesListComponent extends Component {

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
        }
    }

    render() {
        let activityIndicator = this.state.isLoading ?
            (<ActivityIndicator
                size='large'/>) :
            (<View/>);
        let logo = this.state.isLogoShown ?
            (<Image style={styles.image}
                     source={{uri: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png'}}/>) :
            (<View/>);
        let emptyView = this.state.isEmptyViewShown ?
            (<Text style={styles.description}>Пользователей не найдено.</Text>) :
            (<View/>);
        let errorView = this.state.isErrorViewShown ?
            (<Text style={styles.erorrText}>Ошибка загрузки списка пользователей.</Text>) :
            (<View/>);
        let usersListView = this.state.isUsersListShown ?
            (<ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>) :
            (<View/>);
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

const styles = StyleSheet.create({
    description: {
        marginBottom: 16,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },erorrText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#FF0000'
    },
    container: {
        padding: 16,
        marginTop: 65,
        flex: 1
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#24292e',
        borderRadius: 8,
        color: '#24292e'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#24292e',
        borderColor: '#24292e',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    image: {
        width: 200,
        height: 52,
        alignSelf: 'center',
        marginTop: 50
    },
    listView: {
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    userRootContainer: {
        flexDirection: 'row',
        paddingTop: 10
    },
    userDescriptionContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'center'
    },
    userLogin: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    border: {
        height: 1,
        backgroundColor: "#C4C4C4",
        marginLeft: 10,
        marginTop: 10
    }
});
