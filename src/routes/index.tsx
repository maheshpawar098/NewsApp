import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Details, Favorites, Filter, WebView} from 'container';
import {
  NavigationContainer,
  DefaultTheme,
  RouteProp,
} from '@react-navigation/native';

const Stack = createStackNavigator();

import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

type RootStackParamList = {
  HomeContainer: {isFavorite: boolean};
};

type HomeContainerScreenRouteProp = RouteProp<
  RootStackParamList,
  'HomeContainer'
>;

type Props = {
  route: HomeContainerScreenRouteProp;
};

const HomeContainer: React.FC<Props> = ({route}) => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen initialParams={route.params} name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="WebView" component={WebView} />
    </Stack.Navigator>
  );
};

const AppContainer: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen initialParams={{isFavorite: false}} name="Home" component={HomeContainer} />
        <Drawer.Screen
          initialParams={{isFavorite: true}}
          name="Favorites"
          component={HomeContainer}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
