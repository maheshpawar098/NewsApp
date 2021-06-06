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
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';
import {DrawerContent} from 'components';

const AppDrawer = createDrawerNavigator();

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
      <AppDrawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: colors.primary,
          activeBackgroundColor: colors.blue_chipe,
          labelStyle: {
            fontFamily: fonts.medium,
            fontSize: 16,
          },
          itemStyle: {marginVertical: 5},
        }}>
        <AppDrawer.Screen
          initialParams={{isFavorite: false}}
          name="Home"
          component={HomeContainer}
        />
        <AppDrawer.Screen
          initialParams={{isFavorite: true}}
          name="Favorites"
          component={HomeContainer}
        />
      </AppDrawer.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
