import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'utils/constant/colors';
import fonts from 'utils/constant/fonts';

type Props = {};

const Header: React.FC<Props> = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <Icon size={28} name="menu" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>News</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.searchIcon} size={28} name="magnify" />
        <TextInput
          placeholderTextColor={colors.border}
          placeholder="Search by score, title, source"
          style={styles.textInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.medium,
  },
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  textInput: {
    paddingHorizontal: 10,
    flex: 1,
    color: colors.text,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    opacity: 0.8,
    // paddingVertical: 10
  },
  searchIcon: {
    opacity: 0.4,
  },
});

export default Header;
