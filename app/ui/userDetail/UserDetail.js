'use strict';
import React, {Component} from 'react'
import {
    View
} from 'react-native'
import styles from '../../styles/styles'
import ActivityIndicator from '../../components/ActivityIndicator'
import RepositoriesList from './RepositoriesList'
import RepositoriesService from '../../data/RepositoriesService'
import UserInfo from './UserInfo'

export default class UserDetail extends Component {

    constructor(props) {
        super(props);
        const params = props.navigation.state.params;
        this.state = {
            user: params.user,
            isLoading: false,
            isErrorViewShown: false,
            repositories: null
        }
    }

    componentWillMount() {
        this.setupRepositories();
    }

    setupRepositories() {
        if (this.state.repositories !== null) {
            return null
        }
        this.state.isLoading = true;
        RepositoriesService.getRepositoriesByUser(this.state.user.login)
            .then(repositories => this.handleResponse(repositories))
            .catch(error => this.handleError(error));
    }

    handleResponse(repositories) {
        console.log("Handle items: ");
        console.log(repositories);
        this.setState({
            isLoading: false,
            repositories: repositories
        });
    }

    handleError(error) {
        console.log("Handle error: ");
        console.log(error);
        this.setState({
            isLoading: false,
            isErrorViewShown: true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <RepositoriesList
                    repositories={this.state.repositories}
                    renderHeader={() => <UserInfo user={this.state.user} />}/>
                <ActivityIndicator
                    shown={this.state.isLoading}
                    hideContent={true}
                />
            </View>
        );
    }

}
