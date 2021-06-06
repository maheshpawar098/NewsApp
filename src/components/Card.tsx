import {useTheme} from 'hooks';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import fonts from 'utils/constant/fonts';
import {dateFormat} from 'utils/date';
import type {TopStory} from 'utils/model';
import {useNavigation} from '@react-navigation/native';
import {getHostName} from 'utils';
import colors from 'utils/constant/colors';
import {IconTitle} from 'components';
import Shimmer from 'react-native-shimmer';

type Props = {
  story: TopStory;
  isFavorite: boolean;
};

const Card: React.FC<Props> = ({story, isFavorite}) => {
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
        <TouchableOpacity style={styles.labelTitleContainer} onPress={onDetailsPress}>
          <Text style={styles.title}>
            {story.title} <NewLabel isRead={story.read || isFavorite } />
          </Text>
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

type NewLabelProps = {
  isRead: boolean
}

const NewLabel: React.FC<NewLabelProps> = ({isRead}) => {

  if(isRead) return null

  return (
    <Shimmer style={styles.labelContainer} tilt={45} opacity={1} animationOpacity={0.5}>
      <View >
        <Text style={styles.new}>New</Text>
      </View>
    </Shimmer>
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
    fontSize: 16,
    justifyContent: 'center'
  },
  new: {
    color: colors.primary,
    bottom: -5
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 10,
  },
  labelContainer: {
  },
  labelTitleContainer:{
    
  },

  titleContainer: {
    minHeight: 50,
  },
});

export default Card;
