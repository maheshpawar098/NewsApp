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

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
};

const NewsHeader: React.FC<Props> = ({setSearch, search}) => {
  const navigation = useNavigation<any>();

  const onClearPress = () => {
    setSearch('');
  };

  const onFilterPress = () => {
    navigation.navigate('Filter');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>News</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.searchIcon} size={28} name="magnify" />
        <TextInput
          placeholderTextColor={colors.border}
          placeholder="Search by score, title, source"
          style={styles.textInput}
          onChangeText={setSearch}
          value={search}
        />
        {search.length === 0 ? (
          <Icon
            onPress={onFilterPress}
            style={styles.searchIcon}
            size={28}
            name="filter"
          />
        ) : (
          <Icon
            onPress={onClearPress}
            style={styles.searchIcon}
            size={28}
            name="close"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.medium,
    color: colors.primary
  },
  titleContainer: {
    paddingBottom: 10
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
    marginVertical: 5
  },
  searchIcon: {
    opacity: 0.4,
  },
});

export default NewsHeader;
