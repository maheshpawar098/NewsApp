import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';

type Props = {
  showTitle: boolean;
  showSearch: boolean;
};

const Header: React.FC<Props> = ({showTitle, showSearch}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.iconContainer}>
      <Icon onPress={navigation.toggleDrawer} size={28} name="menu" />
      {showTitle ? <Text style={styles.title}>News</Text> : <View style={styles.empty} />}
      {showSearch ? (
        <Icon onPress={navigation.toggleDrawer} size={28} name="magnify" />
      ) : (
        <View style={styles.empty} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.primary
  },
  empty: {
      padding: 15
  }
});

export default Header;
