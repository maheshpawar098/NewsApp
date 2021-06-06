import {useNavigation} from '@react-navigation/native';
import {useStore} from 'hooks';
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
  title: string;
  isFavorite: boolean;
};

const NewsHeader = React.forwardRef<TextInput, Props>(
  ({setSearch, search, title = 'News', isFavorite}, ref) => {
    const navigation = useNavigation<any>();
    const {selectedAuthor, newsScore, newNewsCount} = useStore();

    let badgeCount = 0;
    if (selectedAuthor !== 'all') {
      badgeCount++;
    }

    if (newsScore !== -1) {
      badgeCount++;
    }

    const onClearPress = () => {
      setSearch('');
    };

    const onFilterPress = () => {
      navigation.navigate('Filter');
    };

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {newNewsCount && !isFavorite ? <Text style={styles.subTitle}>{`${newNewsCount} new stories` }</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} size={28} name="magnify" />
          <TextInput
            placeholderTextColor={colors.border}
            placeholder="Search by score, title, source"
            style={styles.textInput}
            onChangeText={setSearch}
            value={search}
            ref={ref}
          />
          {search.length === 0 && !isFavorite ? (
            <TouchableOpacity onPress={onFilterPress}>
              <Icon
                style={styles.searchIcon}
                size={28}
                color={badgeCount !== 0 ? colors.primary : colors.secondary}
                name="filter"
              />
              {badgeCount !== 0 ? (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badge}>{badgeCount}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ) : null}
          {search.length !== 0 ? (
            <Icon
              onPress={onClearPress}
              style={styles.searchIcon}
              size={28}
              name="close"
            />
          ) : null}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  titleContainer: {
    paddingBottom: 10,
  },
  textInput: {
    paddingHorizontal: 10,
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.whitesmoke,
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    opacity: 0.8,
    marginVertical: 5,
  },
  searchIcon: {
    opacity: 0.6,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    backgroundColor: colors.blue_chipe,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
  },
  badge: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.primary,
  },
  subTitle:{
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
  }
});

export default NewsHeader;
