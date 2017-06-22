'use strict';
import {
    StackNavigator,
} from 'react-navigation';
import RepositoriesListComponent from './ui/usersList/UsersListContainer' //TODO: заменить UsersListContainer на UsersListContainer
import UserDetail from './ui/userDetail/UserDetail'

const AppStack = StackNavigator({
    RepositoriesList: { screen: RepositoriesListComponent },
    UserDetail: { screen: UserDetail }
});
export default AppStack;

