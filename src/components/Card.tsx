import {useTheme} from 'hooks';
import React, {} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import fonts from 'utils/constant/fonts';
import {dateFormat} from 'utils/date';
import type {TopStory} from 'utils/model';
import {useNavigation} from '@react-navigation/native';
import {getHostName} from 'utils';
import colors from 'utils/constant/colors';
import {IconTitle} from 'components';

type Props = {
  story: TopStory;
};

const Card: React.FC<Props> = ({story}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const onDetailsPress = () => {
    navigation.navigate('Details', {story});
  };
  const onUrlPress = () => {
    navigation.navigate('WebView', {story});
  };

  if (!story) return null;

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={onDetailsPress}>
          <Text style={styles.title}>{story.title}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <IconTitle
          textStyle={{
            textTransform: 'capitalize',
            color: colors.primary,
            fontFamily: fonts.medium,
          }}
          style={{
            opacity: 1,
          }}
          name={story.type}
        />
        <IconTitle name={dateFormat(story.time)} />
      </View>
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <IconTitle
            name={story.score}
            iconSize={16}
            iconName={'thumb-up-outline'}
          />
          <IconTitle
            style={{
              paddingHorizontal: 10,
            }}
            iconName={'account-outline'}
            iconSize={18}
            name={story.by}
          />
        </View>

        <IconTitle
          iconName={'share-outline'}
          iconSize={18}
          onPress={onUrlPress}
          name={getHostName(story.url)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 18,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 10,
  },

  titleContainer: {
    minHeight: 50,
  },
});

export default Card;
