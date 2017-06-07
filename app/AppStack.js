'use strict'

import {
    StackNavigator,
} from 'react-navigation';
import RepositoriesListComponent from './ui/usersList/UsersListContainer'

const AppStack = StackNavigator({
    RepositoriesList: {screen: RepositoriesListComponent}
});
export default AppStack;

