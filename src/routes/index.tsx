import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Details, Favorites, Filter, WebView} from 'container';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const HomeContainer: React.FC<{}> = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
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
        <Drawer.Screen name="Home" component={HomeContainer} />
        <Drawer.Screen name="Favorites" component={Favorites} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
