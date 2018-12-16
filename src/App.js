import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './Home';
import DetailsScreen from './Details';

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(App);
