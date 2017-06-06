'use strict'

import {
    StackNavigator,
} from 'react-navigation';
import RepositoriesListComponent from './ui/repositoriesList/RepositoriesListComponent'

const AppStack = StackNavigator({
    RepositoriesList: {screen: RepositoriesListComponent}
});
export default AppStack;

