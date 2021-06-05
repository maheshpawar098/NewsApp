import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Details} from 'container';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

const AppContainer: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
